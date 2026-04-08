import Link from "next/link";



const projectsMock = [
    {
        id: 0,
        title: "Inventory Management System",
        desc: "Built a MERN stack web app featuring real time inventory tracking, offline order & payment processing, and an admin mediated order workflow.",
        tech: ["ReactJS", "ExpressJS", "MongoDB"],
        repo: "https://github.com/ioNihal/sims-dashboard-front",
        preview: null,
    },
    {
        id: 1,
        title: "2D Stickman Game",
        desc: "Developed a challenging and fun stickman style 1v1 fighting game using HTML Canvas, CSS, Vanilla JS.",
        tech: ["HTML5 Canvas", "Javascript", "CSS"],
        repo: "https://github.com/ioNihal/Game2D",
        preview: "https://ionihal.github.io/game2dsite",
    },
    {
        id: 2,
        title: "RenderCard",
        desc: "Built a dynamic Open Graph image generator API that creates customizable social preview cards using URL parameters, powered by Next.js Edge Runtime for fast, on-demand image rendering.",
        tech: ["Next.js", "Edge Runtime", "API Routes", "Image Generation"],
        repo: null,
        preview: "https://rendercard.vercel.app",
    },
    {
        id: 3,
        title: "React WIP UI System",
        desc: "Built a composable React UI library for marking work-in-progress features using badges, banners, overlays, and status indicators, with scalable component architecture and seamless Next.js integration.",
        tech: ["Next.js", "React", "Component Architecture"],
        repo: "https://github.com/ioNihal/react-wip-ui",
        preview: "https://react-wip-ui.vercel.app",
    },
    {
        id: 5,
        title: "Formcord",
        desc: "Built a zero-dependency notification layer that sends form submissions and system events to Discord, designed to run seamlessly across Edge, serverless, and Node runtimes using Web APIs.",
        tech: ["Next.js", "Edge Runtime", "Node.js", "Web APIs", "Discord API"],
        repo: "https://github.com/ioNihal/formcord",
        preview: "https://formcord.vercel.app",
    }
]

export default function ProjectSection() {
    return (
        <section id="projects" aria-labelledby="projects-heading" className="relative w-full bg-slate-950 py-24">
            <div className="mx-auto mb-16 max-w-7xl px-6 text-center">
                <h2 id="projects-heading"
                    className="font-digital text-2xl tracking-widest text-violet-500 sm:text-3xl">
                    PROJECTS
                </h2>
                <p className="mt-4 text-sm text-white/60">
                    Selected work showcasing systems, interfaces, and experiments.
                    More projects live on{" "}
                    <Link href="https://tomatoweb.site" className="text-white underline-offset-2 hover:underline"
                        target="_blank" rel="noopener noreferrer" >
                        TomatoWeb
                    </Link>
                    .
                </p>
            </div>

            <ul aria-label="Project list" className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
                {projectsMock.map((project) => (
                    <li key={project.id} className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-4 transition
                       hover:border-indigo-500/40 hover:bg-white/10 focus-within:border-indigo-500/40">

                        <h3 className="text-xl font-semibold text-white">
                            {project.title}
                        </h3>

                        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                            {project.desc}
                        </p>

                        <div className="mt-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Tech Stack
                            </span>
                            <ul className="mt-2 flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <li key={t}
                                        className="rounded-full bg-indigo-500/15 px-3 py-1 text-[10px] font-digital font-medium text-indigo-300">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-3 flex gap-3">
                            {project.repo && (
                                <Link href={project.repo} aria-label={`View ${project.title} repository on GitHub`}
                                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white
                                transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-indigo-400">
                                    Repository
                                </Link>
                            )}

                            {project.preview && (
                                <Link href={project.preview} aria-label={`View live preview of ${project.title}`}
                                    className="inline-flex items-center justify-center rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-white
                                    transition hover:bg-white/20 focus-visible:outline focus-visible:outline-indigo-400">
                                    Live Preview
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
