"use client";

export default function ViewWorksBtn() {
    const handleScroll = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <button onClick={handleScroll}
            className="border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
            View Works
        </button>
    )
}
