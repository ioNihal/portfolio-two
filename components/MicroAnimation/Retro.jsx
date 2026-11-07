const CAT = [
    ["#.......#..#", "#.......####", "#.......####", "############", ".###########", ".#######....", ".#..#...#..#", ".#..#...#..#"],
    ["#.......#..#", "#.......####", "#.......####", "############", ".###########", ".#######....", "..#..#.#..#.", "..#..#.#..#."],
];

const HEART = [
    ".##...##.", "####.####", "#########", "#########",
    ".#######.", "..#####..", "...###...", "....#....",
];

function Sprite({ rows, className }) {
    return (
        <g className={className}>
            {rows.flatMap((row, y) =>
                [...row].map((c, x) =>
                    c === "#" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null
                )
            )}
        </g>
    );
}

/** Pac-style chomper eating a row of pellets. */
export function Chomper({ className = "text-accent" }) {
    const t = { "--t": "0.4s" };
    return (
        <span aria-hidden="true" className={`inline-flex items-center ${className}`}>
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5">
                <path className="rt-toggle" style={t} d="M8 8L14.06 4.5A7 7 0 1 0 14.06 11.5Z" />
                <circle className="rt-toggle rt-toggle-b" style={t} cx="8" cy="8" r="7" />
            </svg>
            <span className="ml-1 block h-5 w-16 overflow-hidden text-foreground/50">
                <span
                    className="rt-pellets block h-full w-[calc(100%+12px)]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 6px 50%, currentColor 1.5px, transparent 2px)",
                        backgroundSize: "12px 100%",
                    }}
                />
            </span>
        </span>
    );
}

/** Cassette with spinning reels. */
export function Cassette({ className = "text-foreground" }) {
    const reel = (cx) => (
        <g className="rt-reel">
            <circle cx={cx} cy="8" r="2.6" />
            <path d={`M${cx} 5.4v5.2M${cx - 2.6} 8h5.2`} />
        </g>
    );
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 32 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`rt-svg ${className} transition-colors hover:text-accent`}
        >
            <rect x="1" y="1" width="30" height="20" rx="2.5" />
            <rect x="5" y="4" width="22" height="8" rx="1.5" />
            {reel(10)}
            {reel(22)}
            <path d="M8 21l2-4h12l2 4" />
        </svg>
    );
}

/** Five-bar equalizer. */
export function EqBars({ className = "text-accent" }) {
    const bars = [55, 85, 40, 100, 70];
    return (
        <span aria-hidden="true" className={`inline-flex h-5 items-end gap-0.5 ${className}`}>
            {bars.map((h, i) => (
                <span
                    key={i}
                    className="rt-eq block w-1 bg-current"
                    style={{
                        height: `${h}%`,
                        animationDelay: `${-i * 0.23}s`,
                        animationDuration: `${0.8 + (i % 3) * 0.25}s`,
                    }}
                />
            ))}
        </span>
    );
}

/** Beating pixel heart. */
export function PixelHeart({ className = "text-accent" }) {
    return (
        <span aria-hidden="true" className={`rt-beat inline-block ${className}`}>
            <svg viewBox="0 0 9 8" fill="currentColor" shapeRendering="crispEdges" className="h-5 w-auto">
                <Sprite rows={HEART} />
            </svg>
        </span>
    );
}

/** Three twinkling stars. */
export function Sparkles({ className = "text-accent" }) {
    const stars = [["✦", "text-base", "0s"], ["✧", "text-xs", "-0.8s"], ["✦", "text-[10px]", "-1.5s"]];
    return (
        <span aria-hidden="true" className={`inline-flex items-end gap-1 ${className}`}>
            {stars.map(([ch, size, delay], i) => (
                <span key={i} className={`rt-twinkle inline-block ${size}`} style={{ animationDelay: delay }}>
                    {ch}
                </span>
            ))}
        </span>
    );
}

/** Terminal prompt with a blinking block cursor. */
export function Prompt({ user = "visitor", host = "nihalu", className = "text-muted" }) {
    return (
        <span aria-hidden="true" className={`font-mono text-sm ${className}`}>
            <span className="text-accent">{user}@{host}</span>:~${" "}
            <span className="rt-caret inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-current" />
        </span>
    );
}

/** Pixel cat that paces across the full width of its parent. */
export function Walker({ className = "text-foreground/70" }) {
    const t = { "--t": "0.35s" };
    return (
        <span aria-hidden="true" className={`block w-full @container ${className}`}>
            <span className="rt-walk block w-fit">
                <span className="rt-face block">
                    <svg viewBox="0 0 12 8" fill="currentColor" shapeRendering="crispEdges" className="h-5 w-auto">
                        <Sprite rows={CAT[0]} className="rt-toggle" />
                        <Sprite rows={CAT[1]} className="rt-toggle rt-toggle-b" />
                    </svg>
                </span>
            </span>
        </span>
    );
}