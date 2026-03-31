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
    SiReact,
    SiNextdotjs,
    SiPrisma,
    SiPostgresql,
    SiGraphql,
    SiWordpress,
} from "react-icons/si";


const icons = [
    { name: "HTML", img: SiHtml5 },
    { name: "JavaScript", img: SiJavascript },
    { name: "CSS", img: SiCss3 },
    { name: "Node.js", img: SiNodedotjs },
    { name: "TypeScript", img: SiTypescript },
    { name: "ReactJS", img: SiReact },
    { name: "Next.js", img: SiNextdotjs },
    { name: "Prisma", img: SiPrisma },
    { name: "PostgresSQL", img: SiPostgresql },
    { name: "GraphQL", img: SiGraphql },
    { name: "Wordpress", img: SiWordpress },
    { name: "Tailwind CSS", img: SiTailwindcss },
    { name: "Express.js", img: SiExpress },
    { name: "MongoDB", img: SiMongodb },
    { name: "C++", img: SiCplusplus },
    { name: "Git", img: SiGit },
    { name: "Figma", img: SiFigma },
    { name: "Blender", img: SiBlender },
];

function SkillCard({ name, Icon }) {
    return (
        <li>
            <article className="group flex h-full items-center gap-3 rounded-2xl border border-slate-800/90 bg-slate-950/70 px-4 py-4 transition-colors duration-300 hover:border-cyan-500/40 hover:bg-slate-900/90 sm:gap-4 sm:px-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 transition-colors duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/15 group-hover:text-cyan-300 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={28} title={name} aria-label={name} />
                </div>

                <div className="min-w-0">
                    <h3 className="truncate font-digital text-sm text-white sm:text-[15px]">
                        {name}
                    </h3>
                </div>
            </article>
        </li>
    );
}

export default function SkillSection() {
    return (
        <section
            className="bg-slate-950 px-4 py-16 sm:px-6 lg:min-h-screen lg:px-10 lg:py-20"
            id="skills"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">

                <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4 text-center">
                    <h2 className="font-digital text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                        Tools and Technologies
                    </h2>
                    <p className="max-w-2xl font-mono text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                        A curated stack of tools I use to design, build, and ship
                        polished digital experiences with performance and clarity in
                        mind.
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-800/80 bg-slate-900/35 p-3 shadow-[0_0_0_1px_rgba(15,23,42,0.32)] sm:p-5 lg:p-6">
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {icons.map(({ name, img: Icon }) => (
                            <SkillCard key={name} name={name} Icon={Icon} />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
