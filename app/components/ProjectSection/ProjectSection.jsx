
const projectsMock = [
    {
        id: 0,
        title: "Toolight",
        desc: "A light and color based fun & serious utility tools web app, helping designers and boring humans find something useless.",
        tech: ["ReactJS", "CSS Modules", "React Router"],
        repo: "repoLink",
        preview: "previewLink",
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
        title: "Inventory Management System",
        desc: "Built a MERN stack web app featuring real time inventory tracking, offline order & payment processing, and an admin mediated order workflow.",
        tech: ["ReactJS", "ExpressJS", "MongoDB"],
        repo: "https://github.com/ioNihal/sims-dashboard-front",
        preview: null,
    },
    {
        id: 3,
        title: "Project Lyrics",
        desc: "Project Lyrics has 3 preloaded song which users can play and control.",
        tech: ["HTML5", "JavaScript", "CSS3"],
        repo: "https://github.com/ioNihal/project-lyric",
        preview: "https://ionihal.github.io/project-lyric",
    },
    {
        id: 4,
        title: "Splitter",
        desc: "Splitter is a Website built on ReactJS for calculating and splitting group expenses.",
        tech: ["ReactJS", "CSS", "LocalStorage"],
        repo: "https://github.com/ioNihal/budget-splitter",
        preview: "https://budget-splitter.vercel.app",
    },
]


export default function ProjectSection() {
    return (
        <section id="workSection" className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 relative">
            <h2 className="absolute top-0 left-1/2  -translate-x-1/2  rotate-0 text-violet-600  text-lg lg:text-3xl flex gap-7 sm:gap-10 lg:gap-20 font-[family-name:--urbanist] " style={{fontFamily: "var(--urbanist)"}}><span>P</span><span>R</span><span>O</span><span>J</span><span>E</span><span>C</span><span>T</span><span>S</span></h2>
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5">
                    {projectsMock.map((project) => (
                        <div key={project.id} className="project-item group">
                            <h2 className=" py-2 text-3xl md:text-5xl lg:text-6xl font-[family-name:--anton] text-center text-white/80 transition-colors duration-300 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-600 cursor-pointer" style={{ fontFamily: 'var(--font-anton)' }}>
                                {project?.title?.toUpperCase()}
                            </h2>
                            <div className="project-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-1/2 lg:w-1/3 h-auto flex flex-col items-start gap-[0.5em] transition-all duration-300 ease-in-out cursor-pointer
                            rounded-2xl p-3 shadow-2xl border border-white/10">
                                <h3 className="text-xl font-bold text-white">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-300">
                                    {project.desc}
                                </p>
                                <div className="flex items-center gap-[1em] w-full text-xs">
                                    <span className="font-semibold text-white">Tech&nbsp;Stack:</span>
                                    <div className="flex gap-[0.5em]">
                                        {project?.tech.map((t, i) => (
                                            <span key={i} className="bg-indigo-500/20 text-indigo-300 font-medium py-1 px-3 rounded-full">{t}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 *:cursor-pointer urbanist" style={{ fontFamily: 'var(--urbanist)' }}>
                                    <a className="inline-block  bg-violet-600 hover:bg-violet-700 text-white  py-1 px-3 rounded-md transition-colors duration-300" href={project.repo}>Repository</a>
                                    {project?.preview && (<a className="inline-block bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded-md transition-colors duration-300" href={project.preview}>Live Preview</a>)}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
