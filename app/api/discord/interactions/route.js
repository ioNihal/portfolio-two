import nacl from "tweetnacl";
import { TextEncoder } from "util";
import nodemailer from "nodemailer";

async function verifySignature(signature, timestamp, body, publicKeyHex) {
  const message = new TextEncoder().encode(timestamp + body);
  const signatureBuf = Buffer.from(signature, "hex");
  const publicKeyBuf = Buffer.from(publicKeyHex, "hex");
  return nacl.sign.detached.verify(new Uint8Array(message), new Uint8Array(signatureBuf), new Uint8Array(publicKeyBuf));
}

async function sendEmail(to, subject, text) {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error('Missing email configuration!');
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.verify();
  } catch (err) {
    console.error('Email configuration error:', err);
    throw new Error(`Email configuration error: ${err.message}`);
  }

  // Send the email
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    });
  } catch (err) {
    console.error('Email sending error:', err);
    throw new Error(`Failed to send email: ${err.message}`);
  }
}

export async function POST(req) {
  const signature = req.headers.get("x-signature-ed25519") || req.headers.get("x-signature");
  const timestamp = req.headers.get("x-signature-timestamp");
  const body = await req.text();

  if (!signature || !timestamp) {
    return new Response("Missing signature", { status: 401 });
  }

  const verified = await verifySignature(signature, timestamp, body, process.env.DISCORD_PUBLIC_KEY);
  if (!verified) {
    return new Response("Invalid request signature", { status: 401 });
  }

  const interaction = JSON.parse(body);

  // PING
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), { headers: { "Content-Type": "application/json" } });
  }

  if (interaction.type === 2 && interaction.data?.name === "ping") {
    const pingResponse = {
      type: 4,
      data: {
        content: "Pong! 🏓",
        flags: 64
      }
    };
    return new Response(JSON.stringify(pingResponse), { headers: { "Content-Type": "application/json" } });
  }

  // Type 2 for Reply Command & data.type === 3 for message
  if (interaction.type === 2 && interaction.data?.type === 3) {
    const targetMessageId = interaction.data.target_id;
    const modal = {
      type: 9, // MODAL
      data: {
        custom_id: `reply_modal|${targetMessageId}`,
        title: "Respond to the Message",
        components: [
          {
            type: 1, // ACTION_ROW
            components: [
              {
                type: 4, // TEXT_INPUT
                custom_id: "reply_text",
                style: 2, // PARAGRAPH
                label: "Response Body",
                placeholder: "Write a response message to the submitter!",
                required: true,
                min_length: 1,
                max_length: 2000
              }
            ]
          }
        ]
      }
    };

    return new Response(JSON.stringify(modal), { headers: { "Content-Type": "application/json" } });
  }

  // MODAL SUBMIT - type 5
  if (interaction.type === 5) {
    const customId = interaction.data.custom_id || "";
    if (!customId.startsWith("reply_modal|")) {
      console.error("Invalid custom_id:", customId);
      return new Response("Unknown modal", { status: 400 });
    }

    const targetMessageId = customId.split("|")[1];


    // extract response text from modal components
    const replyText = interaction.data.components?.[0]?.components?.[0]?.value || "";

    // fetch the original message to get the embed footer email
    const channelId = process.env.DISCORD_CHANNEL_ID;

    try {
      const msgRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${targetMessageId}`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      });

      if (!msgRes.ok) {
        const errorText = await msgRes.text();
        console.error("Failed to fetch message:", {
          status: msgRes.status,
          statusText: msgRes.statusText,
          error: errorText
        });
        const resp = { type: 4, data: { content: "Failed to fetch original message. Please check the bot permissions and channel ID.", flags: 64 } };
        return new Response(JSON.stringify(resp), { headers: { "Content-Type": "application/json" } });
      }

      const msg = await msgRes.json();

      let email = null;
      if (msg.embeds && msg.embeds[0] && msg.embeds[0].footer?.text) {
        const ft = msg.embeds[0].footer.text;
        const m = ft.match(/Email:(.+)/);
        if (m) email = m[1].trim();
      }

      if (!email) {
        console.error("No email found in message footer");
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: "Could not find email address in the message. Make sure the message has an embed with the email in the footer.",
            flags: 64
          }
        }), { headers: { "Content-Type": "application/json" } });
      }


      // Send an immediate acknowledgment to prevent form timeout
      const response = {
        type: 4,
        data: {
          content: "Processing your reply...",
          flags: 64
        }
      };

      // Get webhook URL for followup messages
      const webhookUrl = `https://discord.com/api/v10/webhooks/${process.env.DISCORD_APP_ID}/${interaction.token}/messages/@original`;

      // Start the email sending process in the background
      (async () => {
        try {
          const subject = `Here is a response from ioNihal`;
          await sendEmail(email, subject, replyText);

          // Update the original response with success message
          await fetch(webhookUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: `✅ Email sent successfully to ${email.replace(/^(.{3})(.*)(@.*)$/, '$1***$3')}`,
              flags: 64
            })
          });
        } catch (err) {
          console.error("Email sending failed:", err);
          await fetch(webhookUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: `❌ Failed to send email: ${err.message}`,
              flags: 64
            })
          });
        }
      })().catch(console.error);

      // Return the immediate acknowledgment
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error("Discord API error:", {
        error: err.message,
        stack: err.stack
      });
      const resp = { type: 4, data: { content: "An error occurred while processing your request. Please try again.", flags: 64 } };
      return new Response(JSON.stringify(resp), { headers: { "Content-Type": "application/json" } });
    }
  }

  return new Response("Unhandled interaction", { status: 400 });
}


/*
Customization Options:
Email Customization:
   - Change email subject line
   - Add HTML formatting
   - Add attachments
   - Use different email service

Response Messages:
   - Customize success/error messages
   - Add rich embeds
   - Change message flags

Add Features:
   - Store reply history
   - Add templates for replies

Example Modal Customization:
modal = {
    type: 9,
    data: {
        custom_id: `reply_modal|${targetMessageId}`,
        title: "Respond to Contact",
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 4,
                        custom_id: "reply_text",
                        style: 2,
                        label: "Your Response",
                        placeholder: "Type your message here...",
                        required: true,
                        min_length: 10,
                        max_length: 4000
                    }
                ]
            }
        ]
    }
}
*/