
const projectsMock = [
    {
        id: 0,
        title: "Blog Platform",
        desc: " A blog platform with features for creating, editing, and publishing blog posts, as well as user comments and categories.",
        tech: ["Gatsby", "GraphQL", "Contentful"],
        repo: "repoLink",
        preview: "previewLink",
    },
    {
        id: 1,
        title: "E-commerce Platform",
        desc: "A full-featured e-commerce platform with user authentication product catalog, shopping cart, and checkout process.",
        tech: ["React", "Node.js", "MongoDB"],
        repo: "repoLink",
        preview: "previewLink",
    },
    {
        id: 2,
        title: "Personal Portfolio Website",
        desc: " A personal portfolio website showcasing my skills, projects, and experience as a frontend developer.",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        repo: "repoLink",
        preview: "previewLink",
    },
    {
        id: 3,
        title: "Social Media Dashboard",
        desc: "A dashboard for managing social media accounts, scheduling posts, and tracking engagement metrics.",
        tech: ["Vue.js", "Firebase", "Chart.js"],
        repo: "repoLink",
        preview: "previewLink",
    },
    {
        id: 4,
        title: "Task Management App",
        desc: "A task management application with features for creating, organizing, and tracking tasks and projects.",
        tech: ["Angular", "NgRx", "TypeScript"],
        repo: "repoLink",
        preview: "previewLink",
    },
]


export default function ProjectSection() {
    return (
        <section className="h-screen w-full flex flex-col items-center justify-center relative bg-slate-950/20">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-5">
                    {projectsMock.map((project) => (
                        <div key={project.id} className="project-item group">
                            <h2 className=" py-2 text-4xl md:text-7xl lg:text-6xl staatliches text-center text-white/80 transition-colors duration-300 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-600 cursor-pointer" style={{ fontFamily: 'var(--font-staatliches)' }}>
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
                                <div className="flex gap-2 *:cursor-pointer urbanist" style={{fontFamily: 'var(--urbanist)'}}>
                                    <a className="inline-block  bg-violet-600 hover:bg-violet-700 text-white  py-1 px-3 rounded-md transition-colors duration-300" href="#">Repository</a>
                                    <a className="inline-block bg-white/10 hover:bg-white/20 text-white py-1 px-3 rounded-md transition-colors duration-300" href="#">Live Preview</a>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
