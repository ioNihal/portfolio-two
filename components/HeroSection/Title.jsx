"use client";

import { useEffect, useRef, useState } from "react";

const titles = [
    "Frontend Developer",
    "Backend Developer",
    "Humble Hoooooooman",
    "Freshhhh Graduate",
];

export default function Title() {
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

    return (
        <span ref={titleRef}
            className="inline-block font-mono text-indigo-400 transition-all duration-300">
            {title}
        </span>
    )
}
