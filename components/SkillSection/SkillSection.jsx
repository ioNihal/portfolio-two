const skills = [
    {
        label: "Frontend",
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
        label: "Backend",
        items: ["Node.js", "Express.js", "GraphQL", "Prisma"],
    },
    {
        label: "Data",
        items: ["PostgreSQL", "MongoDB"],
    },
    {
        label: "Tools",
        items: ["Git", "Figma", "Blender", "WordPress", "C++"],
    },
];

export default function SkillSection() {
    return (
        <section
            id="skills"
            aria-labelledby="skills-heading"
            className="w-full bg-background px-6 py-24"
        >
            <div className="mx-auto max-w-4xl">
                <h2
                    id="skills-heading"
                    className="mb-16 font-mono text-[13px] font-normal text-muted"
                >
                    Tools and technologies
                </h2>

                <dl className="space-y-10">
                    {skills.map(({ label, items }) => (
                        <div key={label} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8">
                            <dt className="mb-2 font-mono text-xs text-subtle sm:mb-0 sm:pt-2">
                                {label}
                            </dt>
                            <dd className="font-serif text-2xl leading-snug text-foreground/80 text-pretty sm:text-3xl">
                                {items.join(", ")}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}