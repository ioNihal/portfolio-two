import nacl from "tweetnacl";

export const runtime = "nodejs";

async function verifySignature(signature, timestamp, body, publicKeyHex) {
  try {
    const message = new TextEncoder().encode(timestamp + body);
    const signatureBuf = Buffer.from(signature, "hex");
    const publicKeyBuf = Buffer.from(publicKeyHex, "hex");
    return nacl.sign.detached.verify(
      new Uint8Array(message),
      new Uint8Array(signatureBuf),
      new Uint8Array(publicKeyBuf)
    );
  } catch (err) {
    console.error("[verifySignature] error:", err);
    return false;
  }
}

export async function POST(req) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const rawBody = await req.text();

  if (!signature || !timestamp) return new Response("Missing signature", { status: 401 });

  const ok = await verifySignature(signature, timestamp, rawBody, process.env.DISCORD_PUBLIC_KEY);
  if (!ok) return new Response("Invalid signature", { status: 401 });

  let interaction;
  try {
    interaction = JSON.parse(rawBody);
  } catch (err) {
    console.error("Bad JSON", err);
    return new Response("Bad JSON", { status: 400 });
  }

  // PING
  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), { headers: { "Content-Type": "application/json" } });
  }

  // MESSAGE_COMPONENT interactions
  if (interaction.type === 3 && interaction.data?.custom_id) {
    const customId = interaction.data.custom_id;
    const channelId = interaction.channel_id || interaction.message?.channel_id;
    const messageId = interaction.message?.id;

    if (!channelId || !messageId) {
      return new Response(JSON.stringify({
        type: 4,
        data: { content: "Could not find message context.", flags: 64 }
      }), { headers: { "Content-Type": "application/json" } });
    }

    // Extract email from embed footer
    let email = null;
    try {
      const embedFooter = interaction.message?.embeds?.[0]?.footer?.text;
      if (embedFooter) {
        const m = embedFooter.match(/Email:\s*(.+)/i);
        if (m) email = m[1].trim();
      }
    } catch {}

    // Helper to edit message (remove buttons)
    const removeButtons = async () => {
      try {
        await fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ components: [] }),
        });
      } catch (err) {
        console.error("Failed to remove buttons:", err);
      }
    };

    // Helper to add reaction
    const addReaction = async (emoji) => {
      try {
        const emojiEncoded = encodeURIComponent(emoji);
        await fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}/reactions/${emojiEncoded}/@me`, {
          method: "PUT",
          headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
        });
      } catch (err) {
        console.error("Failed to add reaction:", err);
      }
    };

    // IGNORE
    if (customId === "ignore_btn") {
      await addReaction("❌");
      await removeButtons();
      return new Response(JSON.stringify({
        type: 4,
        data: { content: "Message ignored and marked ❌.", flags: 64 }
      }), { headers: { "Content-Type": "application/json" } });
    }

    // REPLY
    if (customId === "reply_btn") {
      const subject = "reply from Nihal K";
      const encodedSubject = encodeURIComponent(subject);
      const mailto = email ? `mailto:${email}?subject=${encodedSubject}&body=` : null;

      const components = mailto ? [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5, // LINK button
              label: "Open Email Client",
              url: mailto
            }
          ]
        }
      ] : [];

      const content = mailto
        ? `Click below to open your email client, or use this link: <${mailto}>.\n\nSubject is prefilled as "${subject}".`
        : "No email address found in message footer.";

      return new Response(JSON.stringify({
        type: 4,
        data: { content, flags: 64, components }
      }), { headers: { "Content-Type": "application/json" } });
    }

    // fallback
    return new Response(JSON.stringify({
      type: 4,
      data: { content: "Unknown action.", flags: 64 }
    }), { headers: { "Content-Type": "application/json" } });
  }

  return new Response("Unhandled interaction", { status: 400 });
}
