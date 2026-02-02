"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const titles = [
    "Frontend Developer",
    "Backend Developer",
    "Humble Hoooooooman",
    "Freshhhh Graduate",
];

export default function HeroContent() {
    const [title, setTitle] = useState(titles[0]);
    const titleRef = useRef(null);

    useEffect(() => {
        let step = 0;
        const id = setInterval(() => {
            if (!titleRef.current) return;

            titleRef.current.classList.add("opacity-0", "translate-y-2");

            setTimeout(() => {
                step = step === titles.length - 1 ? 0 : step + 1;
                setTitle(titles[step]);
                titleRef.current?.classList.remove("opacity-0", "translate-y-2");
            }, 300);
        }, 3000);

        return () => clearInterval(id);
    }, []);

    const handleScroll = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="grid grid-cols-1 border border-white/10 lg:grid-cols-12">
            <div className="col-span-1 flex flex-col justify-between border-b border-white/10 lg:col-span-7 lg:border-b-0 lg:border-r">
                <div className="p-6 lg:p-10">
                    <span className="text-xs tracking-widest text-white/40 font-mono">
                        IDENTIFIER // 001
                    </span>

                    <h1 className="mt-6 font-future text-5xl font-semibold sm:text-6xl lg:text-7xl">
                        NIHAL K
                        <span className="ml-1 text-indigo-500">_</span>
                    </h1>

                    <h2 className="mt-4 text-lg font-digital font-semibold text-white/70 sm:text-2xl">
                        I&apos;m a{" "}
                        <span
                            ref={titleRef}
                            className="inline-block font-mono text-indigo-400 transition-all duration-300"
                        >
                            {title}
                        </span>
                    </h2>

                </div>

                <div className="flex font-digital flex-col lg:flex-row lg:items-center gap-6 border-y border-white/15 px-6 lg:px-10 py-6">
                    <p className=" text-sm leading-relaxed text-white/60">
                        Interfaces built with intent, engineered for modern systems.
                    </p>

                    <div className="shrink-0 flex flex-wrap lg:justify-end gap-3">
                        <button
                            onClick={handleScroll}
                            className="border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
                        >
                            View Works
                        </button>

                        <Link
                            href={'/blog'}
                            className="border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
                        >
                            Blogs
                        </Link>
                        <Link
                            href={'/docs/resume.pdf'}
                            target="_blank"
                            className="border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 transition hover:bg-indigo-500/20"
                        >
                            Resume
                        </Link>
                    </div>
                </div>
            </div>


            <div className="col-span-1 grid grid-cols-1 lg:col-span-5">
                {[
                    ["DESIGNATION // 002", "Frontend Developer Intern"],
                    ["CORE // 003", "React / Next.js, TypeScript"],
                    ["STYLE // 004", "CSS3, Tailwind CSS"],
                    ["STATUS // 007", "Available for next-gen projects"],
                ].map(([label, value], i) => (
                    <div
                        key={i}
                        className="border-t border-white/10 p-6 lg:border-t-0 lg:border-l lg:border-b"
                    >
                        <div className="text-xs tracking-widest text-white/40 font-mono">
                            {label}
                        </div>
                        <div
                            className={`mt-2 ${label.startsWith("STATUS") ? "text-green-400 text-sm font-digital font-semibold" :
                                label.startsWith("DESIGNATION") ? "text-indigo-400 text-2xl font-condensed tracking-wider" :
                                    "text-white text-sm font-digital font-semibold"}`}>
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
