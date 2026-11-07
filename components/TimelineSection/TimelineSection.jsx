import { Prompt } from "../MicroAnimation/Retro";

const timeline = [
  {
    year: "2026 - present",
    title: "Full-Stack Developer",
    place: "Dgymbook",
    text: "I work on a monorepo, so my job is to adapt and move along.",
  },
  {
    year: "2025 - 2026",
    title: "Frontend Developer Intern",
    place: "Warewe Consultancy Pvt Ltd",
    text: "Built responsive interfaces with React, Next.js and Tailwind CSS, integrated APIs, and worked on a full-stack project.",
  },
  {
    year: "2022 - 2025",
    title: "BCA, Software & Web Development",
    place: "Srinivas University, Mangalore",
    text: "Graduated in 2025, focusing on software development, web technologies and hands-on projects.",
  },
  {
    year: "2020 - 2022",
    title: "HSE, Computer Science",
    place: "CJHSS Chemnad, Kasaragod",
    text: "Built a foundation in programming and digital literacy.",
  },
];

export default function TimelineSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="experience-heading"
          className="mb-16 font-mono text-[13px] font-normal text-muted"
        >
          <Prompt className="mt-10 block" user="experience" />
        </h2>

        <ol className="space-y-14">
          {timeline.map(({ year, title, place, text }) => (
            <li
              key={title}
              className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-8"
            >
              <p className="mb-1 font-mono text-xs text-subtle sm:mb-0 sm:pt-2">
                {year}
              </p>
              <div>
                <h3 className="font-serif text-3xl leading-tight text-foreground text-balance">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-muted">{place}</p>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-muted text-pretty">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}