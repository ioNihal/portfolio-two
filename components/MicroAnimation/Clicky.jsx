import { useId, useState } from "react";

/** Click to take a sip; the sixth click refills. */
export function CoffeeSip({ className = "text-foreground" }) {
    const [sips, setSips] = useState(0);
    const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const caption = ["filter coffee, still hot", "mm.", "good stuff", "last sip…", "empty. refill?"][sips];
    const cup = "M4 10h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z";

    return (
        <button
            type="button"
            onClick={() => setSips((s) => (s + 1) % 5)}
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