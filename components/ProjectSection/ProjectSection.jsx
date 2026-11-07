import Link from "next/link";
import { Walker } from "../MicroAnimation/Retro";

const projects = [
    {
        title: "Explore Kasaragod",
        desc: "an ad-free local directory of eateries, places and services",
        href: "https://explorekasaragod.org",
    },
    {
        title: "2D Stickman Game",
        desc: "a 1v1 stickman fighter in plain canvas and vanilla JS",
        href: "https://ionihal.github.io/game2dsite",
    },
    {
        title: "RenderCard",
        desc: "an edge-rendered API that turns URL params into social preview cards",
        href: "https://rendercard.vercel.app",
    },
    {
        title: "Formcord",
        desc: "a zero-dependency bridge from form submissions to Discord",
        href: "https://formcord.vercel.app",
    },
    {
        title: "React WIP UI System",
        desc: "a React kit of badges, banners and overlays for unfinished features",
        href: "https://react-wip-ui.vercel.app",
    },
    {
        title: "Inventory Management System",
        desc: "a MERN app for real-time stock, offline orders and admin-approved payments",
        href: "https://github.com/ioNihal/sims-dashboard-front",
    },
];

function AccentLink({ href, children }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-[1.5em] text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline focus-visible:underline"
        >
            {children}
        </Link>
    );
}

export default function ProjectSection() {
    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            className="w-full bg-background px-6 py-24"
        >
            <div className="mx-auto max-w-4xl">
                <h2
                    id="projects-heading"
                    className="mb-12 text-center font-mono text-[13px] font-normal text-muted"
                >
                    Projects
                </h2>
                <Walker className="text-subtle" />

                <p className="text-balance text-center text-lg leading-[1.9] tracking-[0.02em] text-foreground/80 [word-spacing:0.12em] sm:text-xl sm:tracking-[0.03em] md:text-2xl lg:tracking-[0.04em] lg:[word-spacing:0.18em]">
                    {projects.map(({ title, desc, href }) => (
                        <span key={title}>
                            <AccentLink href={href}>{title}</AccentLink>, {desc}.{" "}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}