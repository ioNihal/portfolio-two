"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Cassette, EqBars } from "./Retro";

const LEAD = [523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33];
const BASS = [130.81, 110, 98, 110];
const STEP_MS = 170;
const AUTO_STOP_MS = 15000;

/** Chiptune cassette: plays on mouse hover, toggles on tap/keyboard, shows a "now playing" label. */
export function SoundCassette({ className = "text-foreground" }) {
    const [on, setOn] = useState(false);
    const [mode, setMode] = useState("hover"); // "hover" | "tap"
    const ctx = useRef(null);
    const master = useRef(null);
    const timer = useRef(null);
    const autoStop = useRef(null);
    const step = useRef(0);
    const wanted = useRef(false);
    const pointer = useRef("key");

    function stop() {
        wanted.current = false;
        clearInterval(timer.current);
        clearTimeout(autoStop.current);
        timer.current = null;
        setOn(false);

        const ac = ctx.current;
        if (!ac || !master.current) return;
        const g = master.current.gain;
        g.cancelScheduledValues(ac.currentTime);
        g.setValueAtTime(g.value, ac.currentTime);
        g.linearRampToValueAtTime(0.0001, ac.currentTime + 0.1);
    }

    useEffect(() => {
        const onHide = () => document.hidden && stop();
        document.addEventListener("visibilitychange", onHide);
        return () => {
            document.removeEventListener("visibilitychange", onHide);
            clearInterval(timer.current);
            clearTimeout(autoStop.current);
            ctx.current?.close();
        };
    }, []);

    useEffect(() => {
        if (!on) return;
        const onKey = (e) => e.key === "Escape" && stop();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [on]);

    function tone(freq, dur, type, vol) {
        const ac = ctx.current;
        const osc = ac.createOscillator();
        const g = ac.createGain();
        const t = ac.currentTime;

        osc.type = type;
        osc.frequency.value = freq;
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc.connect(g).connect(master.current);
        osc.start(t);
        osc.stop(t + dur);
    }

    async function play(how) {
        wanted.current = true;
        if (timer.current) return;

        // Autoplay policy: stay silent until the visitor has interacted with the page.
        if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;

        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;

        if (!ctx.current) {
            ctx.current = new AC();
            master.current = ctx.current.createGain();
            master.current.connect(ctx.current.destination);
        }
        const ac = ctx.current;

        if (ac.state !== "running") await ac.resume().catch(() => { });
        if (!wanted.current || timer.current || ac.state !== "running") return;

        master.current.gain.cancelScheduledValues(ac.currentTime);
        master.current.gain.setValueAtTime(1, ac.currentTime);

        const next = () => {
            const i = step.current++;
            tone(LEAD[i % LEAD.length], 0.14, "square", 0.035);
            if (i % 2 === 0) tone(BASS[((i / 2) | 0) % BASS.length], 0.3, "triangle", 0.06);
        };

        next();
        timer.current = setInterval(next, STEP_MS);
        setMode(how);
        setOn(true);
    }

    return (
        <>
            <button
                type="button"
                aria-label="Play the cassette"
                aria-pressed={on}
                onPointerDown={(e) => (pointer.current = e.pointerType)}
                onPointerEnter={(e) => e.pointerType === "mouse" && play("hover")}
                onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
                onClick={() => {
                    const type = pointer.current;
                    pointer.current = "key";
                    if (type === "mouse") return; // mouse is handled by hover
                    if (timer.current) return stop();
                    play("tap");
                    clearTimeout(autoStop.current);
                    autoStop.current = setTimeout(stop, AUTO_STOP_MS);
                }}
                onBlur={stop}
                className="cursor-pointer"
            >
                <Cassette className={className} />
            </button>

            {on &&
                createPortal(
                    <div
                        role="status"
                        className="fixed bottom-6 right-6 z-50 mb-[env(safe-area-inset-bottom)] flex items-center gap-3 border border-border-main bg-background px-3 py-2 font-mono text-xs text-muted"
                    >
                        <EqBars className="text-accent" />
                        <span>now playing</span>
                        {mode === "hover" ? (
                            <span className="text-subtle">· move away to stop</span>
                        ) : (
                            <button
                                type="button"
                                onClick={stop}
                                className="cursor-pointer text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline"
                            >
                                stop
                            </button>
                        )}
                    </div>,
                    document.body
                )}
        </>
    );
}