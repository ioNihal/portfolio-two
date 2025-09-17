import nacl from "tweetnacl";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

async function verifySignature(signature, timestamp, body, publicKeyHex) {
  try {
    console.log("[verifySignature] start");
    const message = new TextEncoder().encode(timestamp + body);
    const signatureBuf = Buffer.from(signature, "hex");
    const publicKeyBuf = Buffer.from(publicKeyHex, "hex");
    const ok = nacl.sign.detached.verify(
      new Uint8Array(message),
      new Uint8Array(signatureBuf),
      new Uint8Array(publicKeyBuf)
    );
    console.log("[verifySignature] result:", ok);
    return ok;
  } catch (err) {
    console.error("[verifySignature] error:", err);
    return false;
  }
}

async function sendEmail(to, subject, text) {
  console.log("[sendEmail] preparing to send", { to, subject });

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.error("[sendEmail] Missing MAIL_USER or MAIL_PASS env vars");
    throw new Error("Missing email configuration!");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    console.log("[sendEmail] verifying transporter...");
    await transporter.verify();
    console.log("[sendEmail] transporter verified OK");
  } catch (err) {
    console.error("[sendEmail] transporter verification failed:", err);
    throw new Error(`Email configuration error: ${err.message}`);
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    });
    console.log("[sendEmail] sendMail success:", info);
    return info;
  } catch (err) {
    console.error("[sendEmail] sendMail failed:", err);
    throw new Error(`Failed to send email: ${err.message}`);
  }
}

export async function POST(req) {
  console.log("[POST] incoming request");
  const signature = req.headers.get("x-signature-ed25519") || req.headers.get("x-signature");
  const timestamp = req.headers.get("x-signature-timestamp");
  let body;
  try {
    body = await req.text();
  } catch (err) {
    console.error("[POST] failed to read body:", err);
    return new Response("Bad request body", { status: 400 });
  }

  console.log("[POST] headers:", {
    hasSignature: !!signature,
    hasTimestamp: !!timestamp,
  });

  if (!signature || !timestamp) {
    console.warn("[POST] missing signature or timestamp");
    return new Response("Missing signature", { status: 401 });
  }

  let verified = false;
  try {
    verified = await verifySignature(signature, timestamp, body, process.env.DISCORD_PUBLIC_KEY);
  } catch (err) {
    console.error("[POST] verifySignature threw:", err);
    verified = false;
  }

  if (!verified) {
    console.warn("[POST] signature verification failed");
    return new Response("Invalid request signature", { status: 401 });
  }

  let interaction;
  try {
    interaction = JSON.parse(body);
  } catch (err) {
    console.error("[POST] JSON parse failed:", err);
    return new Response("Bad JSON", { status: 400 });
  }

  console.log("[POST] interaction.type:", interaction.type);

  // PING
  if (interaction.type === 1) {
    console.log("[POST] PING -> returning 1");
    return new Response(JSON.stringify({ type: 1 }), { headers: { "Content-Type": "application/json" } });
  }

  // simple slash command "ping"
  if (interaction.type === 2 && interaction.data?.name === "ping") {
    console.log("[POST] slash ping -> replying");
    const pingResponse = {
      type: 4,
      data: {
        content: "Pong! 🏓",
        flags: 64
      }
    };
    return new Response(JSON.stringify(pingResponse), { headers: { "Content-Type": "application/json" } });
  }

  // show modal for reply
  if (interaction.type === 2 && interaction.data?.type === 3) {
    console.log("[POST] building modal for reply command");
    const targetMessageId = interaction.data.target_id;
    const modal = {
      type: 9,
      data: {
        custom_id: `reply_modal|${targetMessageId}`,
        title: "Respond to the Message",
        components: [
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "reply_text",
                style: 2,
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
    console.log("[POST] modal submit received");
    const customId = interaction.data.custom_id || "";
    if (!customId.startsWith("reply_modal|")) {
      console.error("[POST] invalid custom_id:", customId);
      return new Response("Unknown modal", { status: 400 });
    }

    const targetMessageId = customId.split("|")[1];
    console.log("[POST] targetMessageId:", targetMessageId);

    const replyText = interaction.data.components?.[0]?.components?.[0]?.value || "";
    console.log("[POST] replyText length:", replyText.length);

    const channelId = process.env.DISCORD_CHANNEL_ID;
    if (!channelId) {
      console.error("[POST] Missing DISCORD_CHANNEL_ID env var");
      return new Response("Server misconfigured", { status: 500 });
    }

    try {
      console.log("[POST] fetching original message", { channelId, targetMessageId });
      const msgRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${targetMessageId}`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
      });

      console.log("[POST] message fetch status:", msgRes.status, msgRes.statusText);

      if (!msgRes.ok) {
        const errorText = await msgRes.text();
        console.error("[POST] Failed to fetch message:", {
          status: msgRes.status,
          statusText: msgRes.statusText,
          error: errorText
        });
        const resp = { type: 4, data: { content: "Failed to fetch original message. Please check the bot permissions and channel ID.", flags: 64 } };
        return new Response(JSON.stringify(resp), { headers: { "Content-Type": "application/json" } });
      }

      const msg = await msgRes.json();
      console.log("[POST] fetched message payload:", {
        embedsCount: Array.isArray(msg.embeds) ? msg.embeds.length : 0,
        footer: msg.embeds?.[0]?.footer?.text
      });

      let email = null;
      if (msg.embeds && msg.embeds[0] && msg.embeds[0].footer?.text) {
        const ft = msg.embeds[0].footer.text;
        console.log("[POST] footer text:", ft);
        const m = ft.match(/Email:(.+)/);
        if (m) email = m[1].trim();
      }

      if (!email) {
        console.error("[POST] No email found in message footer");
        return new Response(JSON.stringify({
          type: 4,
          data: {
            content: "Could not find email address in the message. Make sure the message has an embed with the email in the footer.",
            flags: 64
          }
        }), { headers: { "Content-Type": "application/json" } });
      }

      console.log("[POST] got email:", email);

      // Immediate ack so Discord UI doesn't time out
      const response = {
        type: 4,
        data: {
          content: "Processing your reply...",
          flags: 64
        }
      };

      const webhookUrl = `https://discord.com/api/v10/webhooks/${process.env.DISCORD_APP_ID}/${interaction.token}/messages/@original`;
      console.log("[POST] webhookUrl prepared");

      // ======== START: Background task (may be killed on Vercel) =========
      (async () => {
        try {
          console.log("[BG] sendEmail start");
          const subject = `Here is a response from ioNihal`;
          await sendEmail(email, subject, replyText);
          console.log("[BG] sendEmail finished");

          console.log("[BG] PATCHing webhook with success");
          const patchRes = await fetch(webhookUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content: `✅ Email sent successfully to ${email.replace(/^(.{3})(.*)(@.*)$/, '$1***$3')}`,
              flags: 64
            })
          });
          console.log("[BG] webhook patch status:", patchRes.status, patchRes.statusText);
        } catch (err) {
          console.error("[BG] Email sending failed:", err);
          try {
            const failRes = await fetch(webhookUrl, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                content: `❌ Failed to send email: ${err.message}`,
                flags: 64
              })
            });
            console.log("[BG] failure patch status:", failRes.status, failRes.statusText);
          } catch (patchErr) {
            console.error("[BG] failed to patch webhook after email error:", patchErr);
          }
        }
      })().catch((bgErr) => {
        console.error("[BG] background IIFE threw:", bgErr);
      });
      // ======== END background =========

      console.log("[POST] returning immediate ack");
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error("[POST] Discord API error:", {
        error: err.message,
        stack: err.stack
      });
      const resp = { type: 4, data: { content: "An error occurred while processing your request. Please try again.", flags: 64 } };
      return new Response(JSON.stringify(resp), { headers: { "Content-Type": "application/json" } });
    }
  }

  console.warn("[POST] Unhandled interaction");
  return new Response("Unhandled interaction", { status: 400 });
}
