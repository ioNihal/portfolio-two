"use client";

import { useEffect, useRef } from "react";

const FACES = {
    idle: "=^.^=",
    curious: "=o.o=",
    waiting: "=^_^=",
    happy: "=^w^=",
    oops: "=>.<=",
    sad: "=T.T=",
};
const MOTION = { waiting: "tap-bob", oops: "tap-shake", happy: "tap-hop" };
const HEARTS = [-20, 0, 20];

export function ContactCat({ mood = "idle", className = "" }) {
    const previousMood = useRef(mood);
    const audio = useRef(null);
    const tone =
        mood === "oops" || mood === "sad"
            ? "text-red-600 dark:text-red-400"
            : mood === "happy"
                ? "text-accent"
                : "text-muted";

    useEffect(() => () => {
        audio.current?.close();
        audio.current = null;
    }, []);

    useEffect(() => {
        const changed = previousMood.current !== mood;
        previousMood.current = mood;
        if (!changed) return;

        const cues = {
            waiting: [{ frequency: 520, endFrequency: 590, delay: 0 }],
            happy: [
                { frequency: 660, endFrequency: 790, delay: 0 },
                { frequency: 790, endFrequency: 990, delay: 0.1 },
            ],
            oops: [{ frequency: 620, endFrequency: 390, delay: 0 }],
            sad: [{ frequency: 420, endFrequency: 330, delay: 0 }],
        };
        const notes = cues[mood];
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!notes || !AudioContextClass) return;

        try {
            if (!audio.current || audio.current.state === "closed") {
                audio.current = new AudioContextClass();
            }
        } catch {
            return;
        }

        const context = audio.current;
        const play = () => {
            if (context.state !== "running") return;
            for (const note of notes) {
                const start = context.currentTime + note.delay;
                const oscillator = context.createOscillator();
                const gain = context.createGain();

                oscillator.type = "sine";
                oscillator.frequency.setValueAtTime(note.frequency, start);
                oscillator.frequency.exponentialRampToValueAtTime(note.endFrequency, start + 0.16);
                gain.gain.setValueAtTime(0.0001, start);
                gain.gain.exponentialRampToValueAtTime(0.025, start + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
                oscillator.connect(gain).connect(context.destination);
                oscillator.start(start);
                oscillator.stop(start + 0.18);
            }
        };

        if (context.state === "suspended") {
            context.resume().then(play).catch(() => { });
        } else {
            play();
        }
    }, [mood]);

    return (
        <span aria-hidden="true" className={`relative inline-block font-mono text-lg transition-colors ${tone} ${className}`}>
            <span key={mood} className={`inline-block ${MOTION[mood] ?? ""}`}>
                {FACES[mood]}
            </span>

            {mood === "happy" &&
                HEARTS.map((dx, i) => (
                    <span
                        key={i}
                        style={{ "--dx": `${dx}px`, animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}
                        className="doodle-heart pointer-events-none absolute left-1/2 top-0 text-accent motion-reduce:hidden"
                    >
                        ♥
                    </span>
                ))}
        </span>
    );
}