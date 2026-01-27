import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

function shortId() {
  return crypto.randomBytes(4).toString("hex");
}

export async function POST(req) {
  try {
    const { subject, email, message } = await req.json();

    // basic validation
    if (!subject || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message too long" },
        { status: 400 }
      );
    }

    const id = shortId();

    // Discord embed
    const embed = {
      title: "📩 New Portfolio Message",
      author: { name: `Anonymous User · ${id}` },
      color: 0x5865f2, // Discord purple
      fields: [
        {
          name: "Subject",
          value: String(subject).slice(0, 1024),
        },
        {
          name: "Message",
          value: String(message).slice(0, 1024),
        },
      ],
      footer: {
        text: `Email: ${email}`,
      },
      timestamp: new Date().toISOString(),
    };


    const payload = {
      content: "You received a new contact form submission.",
      embeds: [embed],
    };

    const res = await fetch(
      `https://discord.com/api/v10/channels/${process.env.DISCORD_CHANNEL_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Discord API error:", text);

      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id,
    });
  } catch (err) {
    console.error("Contact API error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
