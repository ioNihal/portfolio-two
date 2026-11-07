"use client";

import { useEffect, useRef, useState } from "react";

export default function PettableCat({ className = "" }) {
    const [hearts, setHearts] = useState([]);
    const [purring, setPurring] = useState(false);
    const nextId = useRef(0);
    const purrTimer = useRef(null);

    useEffect(() => () => clearTimeout(purrTimer.current), []);

    function pet() {
        const id = nextId.current++;
        const dx = Math.round(Math.random() * 20 - 10);

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