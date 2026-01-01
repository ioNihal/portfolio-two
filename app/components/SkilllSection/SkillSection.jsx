import {
    SiHtml5,
    SiJavascript,
    SiCplusplus,
    SiMongodb,
    SiExpress,
    SiNodedotjs,
    SiTypescript,
    SiTailwindcss,
    SiCss3,
    SiGit,
    SiFigma,
    SiBlender,
} from "react-icons/si";
import { BirdsLottie } from "./BirdsLottie";

const icons = [
    { name: "HTML", img: SiHtml5 },
    { name: "JavaScript", img: SiJavascript },
    { name: "CSS", img: SiCss3 },
    { name: "Node.js", img: SiNodedotjs },
    { name: "TypeScript", img: SiTypescript },
    { name: "Tailwind CSS", img: SiTailwindcss },
    { name: "Express.js", img: SiExpress },
    { name: "MongoDB", img: SiMongodb },
    { name: "C++", img: SiCplusplus },
    { name: "Git", img: SiGit },
    { name: "Figma", img: SiFigma },
    { name: "Blender", img: SiBlender },
];

export default function SkillSection() {
    return (
        <section className="h-auto lg:h-screen w-full flex flex-col items-center justify-center px-6 py-16 relative bg-slate-950" id="skills">
            <h2 className="text-3xl font-bold text-white mb-4">
                Tools and Tech's
            </h2>
            <p className="text-gray-400 text-center max-w-xl mb-10">
                A showcase of the technologies and tools I'm proficient in. Hover over each skill to see its name.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 bg-transparent backdrop-blur-xs p-6 rounded-xl ring ring-slate-700">
                {icons.map((i, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center group"
                    >
                        <div className="w-16 h-16 flex items-center justify-center rounded-full cursor-pointer 
                        border border-cyan-500/40 bg-black/30 hover:bg-cyan-500/20 transition duration-300 
                        ease-in-out animate-[spin_3s_linear_infinite]
                        hover:animate-none hover:scale-110">
                            <i.img
                                size={28}
                                className="text-cyan-400"
                                title={i.name}
                                aria-label={i.name}
                            />
                        </div>
                        <span className="text-xs text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition">
                            {i.name}
                        </span>
                    </div>
                ))}
            </div>
            {/* <div className="bg-cover absolute inset-0 -z-1 bg-slate-950 ">
                <BirdsLottie />
            </div> */}
        </section>
    );
}
