import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";


function shortId() {
    return crypto.randomBytes(4).toString("hex");
}

export async function POST(req) {
    try {
        const { subject, email, message } = await req.json();
        if (!subject || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const id = shortId();

        // build embed with email stored in footer
        const embed = {
            title: "New Message from Portfolio!",
            author: { name: `Anonymous User: ${id}` },
            color: 0x00ff00,
            fields: [
                { name: "Subject", value: subject.slice(0, 1024), inline: true },
                { name: "Message", value: message.slice(0, 1024) },
            ],
            footer: { text: `Email:${email}` },
            timestamp: new Date().toISOString(),
        };

        const res = await fetch(`https://discord.com/api/v10/channels/${process.env.DISCORD_CHANNEL_ID}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: JSON.stringify({
                    content: `New Message submission`,
                    embeds: [embed],
                    components: [
                        {
                            type: 1, 
                            components: [
                                {
                                    type: 2,      
                                    style: 1,              
                                    label: "Reply",
                                    custom_id: "reply_btn" 
                                },
                                {
                                    type: 2,
                                    style: 4,              
                                    label: "Ignore",
                                    custom_id: "ignore_btn"
                                }
                            ]
                        }
                    ]
                })

            }),
        });

        if (!res.ok) {
            const txt = await res.text();
            console.error("Discord post error:", txt);
            return NextResponse.json({ error: "Failed to post to Discord" }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json({ ok: true, id, discordMessageId: data.id });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

