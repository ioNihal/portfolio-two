import nacl from "tweetnacl";

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
      // fetch original message to extract email
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
      let email = null;
      if (msg.embeds && msg.embeds[0] && msg.embeds[0].footer?.text) {
        const ft = msg.embeds[0].footer.text;
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

      // Build mailto URL (subject + body template)
      const subject = `Reply from Nihal K}`;
      const body = replyText;
      const mailtoUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Mark the original message with a ✅ reaction synchronously (so it's 'ticked' after modal)
      try {
        const emoji = encodeURIComponent("✅"); // becomes %E2%9C%85
        const reactRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${targetMessageId}/reactions/${emoji}/@me`, {
          method: "PUT",
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        });
        console.log("[POST] reaction add status:", reactRes.status, reactRes.statusText);
        if (!reactRes.ok) {
          const txt = await reactRes.text().catch(() => null);
          console.warn("[POST] reaction add failed:", reactRes.status, reactRes.statusText, txt);
        }
      } catch (reactErr) {
        console.error("[POST] failed to add reaction:", reactErr);
        // Not fatal — still continue to respond to interaction
      }

      // Immediate ephemeral ack with a Link button to open user's email client
      const response = {
        type: 4,
        data: {
          content: "Click the button to open your email client and send the reply. The message has been marked ✅.",
          flags: 64, // ephemeral
          components: [
            {
              type: 1,
              components: [
                {
                  type: 2,
                  style: 5, // Link button
                  label: "Open Email Client",
                  url: mailtoUrl
                }
              ]
            }
          ]
        }
      };

      console.log("[POST] returning immediate ack with mailto button");
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
