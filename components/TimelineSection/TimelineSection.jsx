import IntersectionObserverClient from './IntersectionObserverClient';
import Image from 'next/image';



const timelineData = [
  {
    id: 1,
    year: "2026 - PRESENT",
    title: "Full-Stack Developer",
    place: "Dgymbook",
    text: "Yeah I work on a monorepo, so my job is to adapt and move along"
  },
  {
    id: 2,
    year: "2025 - 2026",
    title: "Frontend Developer Intern",
    place: "Warewe Consultancy Pvt Ltd",
    text: "Built responsive web interfaces using React, Next.js, Tailwind CSS, and integrated APIs for modern frontend applications. Also worked on Fullstack project."
  },
  {
    id: 3,
    year: "2022 - 2025",
    title: "BCA Software & Web Development",
    place: " Srinivas University Manglore",
    text: "Graduated in 2025 with a Bachelor of Computer Applications, focusing on software development, web technologies, and practical project experience."
  },
  {
    id: 4,
    year: "2020 - 2022",
    title: "HSE Computer Science",
    place: "CJHSS Chemnad Kasaragod",
    text: "Completed Higher Secondary Education in Computer Science from Chemnad, Kasaragod in 2022, building a solid foundation in programming and digital literacy."
  },
]

export default function TimelineSection() {


  return (
    <section className="min-h-screen w-full bg-background relative px-4 py-16 sm:px-6 sm:py-20 overflow-hidden
    text-foreground isolate grid place-items-center" id='experience'>
      <div className="flex flex-col items-center justify-center max-w-lg  m-auto">
        {timelineData.map((t) => {
          const direction = (t.id === 1 || t.id === 3) ? "first" : "second";
          return (
            <article
              key={t.id}
              className="timeline-item py-3 border-emerald-500/30 dark:border-emerald-400/50 border-b flex flex-col text-lg space-y-1"
              data-direction={direction}
            >
              <h4 className="text-sm text-subtle font-mono">{t.year}</h4>
              <h5 className="text-4xl text-emerald-600 dark:text-emerald-400">{t.title}</h5>
              <h6 className="text-xs text-subtle font-sans">{t.place}</h6>
              <p className="font-serif italic text-justify text-muted">{t.text}</p>
            </article>
          );
        })}
      </div>
      <div className="bg-cover absolute inset-0 -z-1">
        <Image
          src={"/assets/exp.svg"}
          alt="Experience timeline background pattern"
          width={1000}
          height={1000}
          loading="lazy"
          className='h-full w-full object-cover animate-wiggle opacity-[0.04]'
          priority={false}
        />
      </div>
      <IntersectionObserverClient />
    </section>
  )
}
