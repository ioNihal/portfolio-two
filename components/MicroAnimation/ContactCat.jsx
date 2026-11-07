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
    const tone =
        mood === "oops" || mood === "sad"
            ? "text-red-600 dark:text-red-400"
            : mood === "happy"
                ? "text-accent"
                : "text-muted";

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