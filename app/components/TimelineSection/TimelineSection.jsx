"use client"


const timelineData = [
  {
    id: 1,
    year: "2025 - PRESENT",
    title: "Frontend Developer Intern",
    place: "Warewee Consultancy Ltd",
    text: "Currently working as a frontend developer intern, creating user-friendly interfaces and delivering polished, accessible web experiences."
  },
  {
    id: 2,
    year: "2022 - 2025",
    title: "BCA Software & Web Development",
    place: " Srinivas University",
    text: "Graduated in 2025 with a Bachelor of Computer Applications, focusing on software development, web technologies, and practical project experience."
  },
  {
    id: 3,
    year: "2020 - 2022",
    title: "HSE Computer Science",
    place: "Chemnad Kasaragod",
    text: "Completed Higher Secondary Education in Computer Science from Chemnad, Kasaragod in 2022, building a solid foundation in programming and digital literacy."
  },
]

export default function TimelineSection() {


  return (
    <section className="min-h-screen w-full bg-slate-950 relative px-4 py-16 sm:px-6 sm:py-20 overflow-hidden
    text-white"
      style={{ fontFamily: "var(--staatliches)" }}>
      {/* <h2 className="text-xl font-bold uppercase  mb-5">My Journey</h2> */}
      <div className="flex flex-col items-center justify-center
      relative before:absolute before:w-[1px] before:h-[200%] before:bg-emerald-400/20
      before:-z-1 z-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2
      after:absolute after:w-3 after:h-3 after:bg-emerald-400 after:rounded-full after:-top-20 ">
        {timelineData.map((t) => (
          <div key={t.id} className={`max-w-lg py-5 border-emerald-400 border-b
          flex flex-col text-lg
          first:-translate-x-2 lg:first:-translate-x-20  first:-translate-y-5 first:-rotate-3 lg:first:-rotate-5 ${t.id === 1 ? "swingFirst" : t.id === 2 ? "swingSecond" : "swingThird"}
          even:translate-x-3 lg:even:translate-x-30 even:rotate-3
          last:-translate-x-0
          z-0`}>
            <div>
              <h6 className="text-gray-400 text-sm font-mono">{t.year}</h6>
              <h5 className="text-4xl text-emerald-400">{t.title}</h5>
              <h6 className="text-xs text-gray-400 font-sans">{t.place}</h6>
            </div>
            <p className="font-serif italic flex-2 text-justify text-indigo-100">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
