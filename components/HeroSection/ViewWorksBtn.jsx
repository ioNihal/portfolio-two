"use client";

export default function ViewWorksBtn() {
    const handleScroll = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <button onClick={handleScroll}
            className="border border-btn-border bg-btn-sec px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-btn-sec-hover cursor-pointer">
            View Works
        </button>
    )
}
