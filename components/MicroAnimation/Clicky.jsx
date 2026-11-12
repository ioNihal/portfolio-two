"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Click to take a sip; the sixth click refills. */
export function CoffeeSip({ className = "text-foreground" }) {
    const [sips, setSips] = useState(0);
    const audio = useRef(null);
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const caption = ["filter coffee, still hot", "mm.", "good stuff", "last sip…", "empty. refill?"][sips];
    const cup = "M4 10h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z";

    useEffect(() => () => {
        audio.current?.close();
        audio.current = null;
    }, []);

    async function playSipSound(refill) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        if (!audio.current || audio.current.state === "closed") {
            audio.current = new AudioContext();
        }

        const context = audio.current;
        if (context.state === "suspended") {
            try {
                await context.resume();
            } catch {
                return;
            }
        }
        if (context.state !== "running") return;

        const notes = refill ? [
            { frequency: 220, endFrequency: 300, delay: 0 },
            { frequency: 280, endFrequency: 390, delay: 0.09 },
            { frequency: 360, endFrequency: 480, delay: 0.18 },
        ] : [
            { frequency: 300, endFrequency: 220, delay: 0 },
            { frequency: 250, endFrequency: 185, delay: 0.1 },
        ];

        for (const note of notes) {
            const start = context.currentTime + note.delay;
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            const duration = refill ? 0.12 : 0.16;

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(note.frequency, start);
            oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, start + duration);
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(refill ? 0.022 : 0.016, start + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
            oscillator.connect(gain).connect(context.destination);
            oscillator.start(start);
            oscillator.stop(start + duration);
        }
    }

    return (
        <button
            type="button"
            onClick={() => {
                playSipSound(sips === 4);
                setSips((s) => (s + 1) % 5);
            }}
            aria-label="Take a sip of coffee"
            className={`group inline-flex cursor-pointer select-none items-end gap-3 ${className}`}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rt-svg transition-colors group-hover:text-accent"
            >
                <defs>
                    <clipPath id={id}>
                        <path d={cup} />
                    </clipPath>
                </defs>
                <g clipPath={`url(#${id})`}>
                    <rect
                        x="4" y="11" width="13" height="9"
                        fill="currentColor" stroke="none" opacity="0.3"
                        className="rt-liquid"
                        style={{ transform: `translateY(${sips * 25}%)` }}
                    />
                </g>
                <g className={sips < 3 ? "" : "hidden"}>
                    <path className="rt-steam" d="M7 7c-1-1.5 1-2.5 0-4" />
                    <path className="rt-steam" style={{ animationDelay: "0.8s" }} d="M10.5 7c-1-1.5 1-2.5 0-4" />
                    <path className="rt-steam" style={{ animationDelay: "1.6s" }} d="M14 7c-1-1.5 1-2.5 0-4" />
                </g>
                <path d={cup} />
                <path d="M17 12h1.5a2.5 2.5 0 0 1 0 5H17" />
                <path d="M3 22h16" />
            </svg>
            <span aria-live="polite" className="font-mono text-xs text-subtle">{caption}</span>
        </button>
    );
}