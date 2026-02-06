import { NextResponse } from "next/server";
import { formcord } from "formcord";

export const runtime = "edge";

function shortId() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function POST(req) {
  try {
    const { subject, email, message } = await req.json();

    // basic validation
    if (!subject || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const id = shortId();

    await formcord.contact({
      token: process.env.DISCORD_BOT_TOKEN,
      channelId: process.env.DISCORD_CHANNEL_ID,
      subject: String(subject),
      email: String(email),
      message: String(message),
      content: "You received a new contact form submission.",
      theme: {
        title: "📩 New Portfolio Message",
        author: { name: `Anonymous User · ${id}` },
        color: 0x5865f2,
        footer: { text: `Email: ${email}` },
        timestamp: new Date().toISOString(),
      },
      throwOnError: true,
    });

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("Contact API error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
