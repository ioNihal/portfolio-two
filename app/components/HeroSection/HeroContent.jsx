"use client"

import { useEffect, useRef, useState } from "react"

const titles = ['Frontend Developer', 'Backend Developer', 'Humble Hoooooooman', 'Freshhhh Graduate']

export default function HeroContent() {
    const [title, setTitle] = useState("Frontend Developer");
    const titleRef = useRef(null);

    useEffect(() => {
        if (title.length > 0) {
            let step = 0;
            const id = setInterval(() => {
                if (titleRef.current) {
                    titleRef.current.classList.add("slideOut");

                    setTimeout(() => {
                        setTitle(titles[step]);
                        titleRef.current.classList.remove("slideOut");
                        titleRef.current.classList.add("slideIn");


                        setTimeout(() => {
                            titleRef.current.classList.remove("slideIn");
                        }, 500);
                    }, 500);
                    step = step === titles.length - 1 ? 0 : step + 1;
                }
            }, 3000)
        }

        return () => clearInterval(id);
    }, []);


    const handleCTA = (mode) => {
        if (mode === "works") {
            const target = document.getElementById("workSection");
            target?.scrollIntoView({ behavior: "smooth" });
        } else if (mode === "resume") {
            window.open("/docs/resume.pdf", "_blank");
        }
    };


    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-[0.8em] lg:gap-[1.5em]">
            <h1 className="dark:text-white text-gray-800 text-4xl lg:text-7xl font-extrabold">Nihal K</h1>
            <h2 className="text-md lg:text-3xl dark:text-white/70 text-gray-900 font-semibold">I'm a <span ref={titleRef} className="text-indigo-500 inline-block font-mono w-[18ch]">{title}</span></h2>
            <p className="opacity-60 text-xs lg:text-xl font-medium max-w-xs lg:max-w-lg text-center">Passionate about building modern, responsive and beautifull web applications</p>
            <div className="flex justify-between gap-[1em] *:py-2 lg:*:py-3 *:px-3 lg:*:px-6  *:text-xs lg:*:text-lg *:font-bold *:rounded-sm lg:*:rounded-lg *:cursor-pointer *:transition-colors *:duration-500 *:ease-in-out">
                <button className="text-amber-50 bg-indigo-500 hover:bg-indigo-600 shadow-lg/50 shadow-indigo-500 hover:shadow-indigo-600"
                    onClick={() => handleCTA("works")}>View Works</button>
                <button className="text-amber-50 bg-gray-500 hover:bg-gray-600 shadow-lg/50 shadow-gray-500 hover:shadow-gray-600"
                    onClick={() => handleCTA("resume")}>Resume</button>
            </div>
        </div>
    )
}