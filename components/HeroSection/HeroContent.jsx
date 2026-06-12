import Link from "next/link";
import Title from "./Title";
import ViewWorksBtn from "./ViewWorksBtn";

export default function HeroContent() {
    return (
        <div className="grid grid-cols-1 border border-border-main lg:grid-cols-12">
            <div className="col-span-1 flex flex-col justify-between border-b border-border-main lg:col-span-7 lg:border-b-0 lg:border-r lg:border-border-main">
                <div className="p-6 lg:p-10">
                    <span className="text-xs tracking-widest text-subtle font-mono">
                        IDENTIFIER // 001
                    </span>

                    <h1 className="mt-6 font-future text-4xl sm:text-5xl font-semibold md:text-6xl lg:text-7xl">
                        NIHAL K
                        <span className="ml-1 text-indigo-500">_</span>
                    </h1>

                    <h2 className="mt-4 sm:text-lg font-digital font-semibold text-muted md:text-2xl">
                        I&apos;m a{" "}
                        <Title />
                    </h2>

                </div>

                <div className="flex font-digital flex-col lg:flex-row lg:items-center gap-6 border-y border-border-main px-6 lg:px-10 py-6">
                    <p className=" text-sm leading-relaxed text-muted">
                        Interfaces built with intent, engineered for modern systems.
                    </p>

                    <div className="shrink-0 flex flex-wrap lg:justify-end gap-3">
                        <ViewWorksBtn />
                        <Link
                            href={'/blog'}
                            className="border border-btn-border bg-btn-sec px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-btn-sec-hover"
                        >
                            Blog
                        </Link>
                        <Link
                            prefetch={false}
                            href={'/docs/resume.pdf'}
                            target="_blank"
                            className="border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 transition hover:bg-indigo-500/20"
                        >
                            Resume
                        </Link>
                    </div>
                </div>
            </div>


            <div className="col-span-1 grid grid-cols-1 lg:col-span-5">
                {[
                    ["DESIGNATION // 002", "Full-Stack Developer"],
                    ["CORE // 003", "React / Next.js, TypeScript, Node.js"],
                    ["STYLE // 004", "CSS3, Tailwind CSS"],
                    ["STATUS // 007", "Available for next-gen projects"],
                ].map(([label, value], i) => (
                    <div
                        key={i}
                        className="border-t border-border-main p-6 lg:border-t-0 lg:border-l lg:border-b lg:border-border-main"
                    >
                        <div className="text-xs tracking-widest text-subtle font-mono">
                            {label}
                        </div>
                        <div
                            className={`mt-2 ${label.startsWith("STATUS") ? "text-emerald-600 dark:text-emerald-400 text-sm font-digital font-semibold" :
                                label.startsWith("DESIGNATION") ? "text-indigo-600 dark:text-indigo-400 text-2xl font-condensed tracking-wider" :
                                    "text-foreground text-sm font-digital font-semibold"}`}>
                            {value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
