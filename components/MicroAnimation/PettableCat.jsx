"use client";

import { useEffect, useRef, useState } from "react";

export default function PettableCat({ className = "" }) {
    const [hearts, setHearts] = useState([]);
    const [purring, setPurring] = useState(false);
    const nextId = useRef(0);
    const purrTimer = useRef(null);
    const audio = useRef(null);
    const purrNodes = useRef([]);

    useEffect(() => () => {
        clearTimeout(purrTimer.current);
        purrNodes.current.forEach((node) => {
            try {
                node.stop();
            } catch { }
        });
        audio.current?.close();
        audio.current = null;
    }, []);

    function stopPurrSound() {
        purrNodes.current.forEach((node) => {
            try {
                node.stop();
            } catch { }
        });
        purrNodes.current = [];
    }

    async function playPurrSound() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        try {
            if (!audio.current || audio.current.state === "closed") {
                audio.current = new AudioContextClass();
            }
            if (audio.current.state === "suspended") await audio.current.resume();
        } catch {
            return;
        }

        const context = audio.current;
        if (!context || context.state !== "running") return;

        stopPurrSound();

        const duration = 0.9;
        const start = context.currentTime;
        const noiseBuffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
        const noise = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noise.length; i++) noise[i] = Math.random() * 2 - 1;

        const source = context.createBufferSource();
        const filter = context.createBiquadFilter();
        const pulse = context.createOscillator();
        const pulseDepth = context.createGain();
        const purrGain = context.createGain();
        const envelope = context.createGain();
        const chirp = context.createOscillator();
        const chirpGain = context.createGain();

        source.buffer = noiseBuffer;
        source.loop = true;
        filter.type = "lowpass";
        filter.frequency.value = 600;
        purrGain.gain.value = 0.04;
        pulse.type = "sine";
        pulse.frequency.value = 26;
        pulseDepth.gain.value = 0.025;
        envelope.gain.setValueAtTime(0.0001, start);
        envelope.gain.exponentialRampToValueAtTime(0.12, start + 0.05);
        envelope.gain.setValueAtTime(0.12, start + duration - 0.1);
        envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        chirp.type = "sine";
        chirp.frequency.setValueAtTime(520 + Math.random() * 80, start);
        chirp.frequency.exponentialRampToValueAtTime(900 + Math.random() * 100, start + 0.1);
        chirp.frequency.exponentialRampToValueAtTime(680, start + 0.28);
        chirpGain.gain.setValueAtTime(0.0001, start);
        chirpGain.gain.exponentialRampToValueAtTime(0.035, start + 0.025);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);

        source.connect(filter).connect(purrGain).connect(envelope).connect(context.destination);
        pulse.connect(pulseDepth).connect(purrGain.gain);
        chirp.connect(chirpGain).connect(context.destination);
        source.start(start);
        pulse.start(start);
        chirp.start(start);
        source.stop(start + duration);
        pulse.stop(start + duration);
        chirp.stop(start + 0.3);
        purrNodes.current = [source, pulse, chirp];
    }

    function pet() {
        const id = nextId.current++;
        const dx = Math.round(Math.random() * 20 - 10);

        playPurrSound();
        setHearts((h) => [...h.slice(-5), { id, dx }]);
        setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 1200);

        setPurring(true);
        clearTimeout(purrTimer.current);
        purrTimer.current = setTimeout(() => setPurring(false), 900);
    }

    return (
        <button
            type="button"
            onClick={pet}
            aria-label="Pet the cat"
            className={`cursor-pointer select-none font-mono transition-colors hover:text-accent focus-visible:outline-0 focus-visible:text-accent ${className}`}
        >
            <span className="relative inline-block">
                <span className={`inline-block ${purring ? "doodle-purr" : ""}`}>
                    {purring ? "=^w^=" : "=^.^="}
                </span>

                {hearts.map(({ id, dx }) => (
                    <span
                        key={id}
                        aria-hidden="true"
                        style={{ "--dx": `${dx}px` }}
                        className="doodle-heart pointer-events-none absolute left-1/2 top-0 text-accent"
                    >
                        ♥
                    </span>
                ))}
            </span>
        </button>
    );
}