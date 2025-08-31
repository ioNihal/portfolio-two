"use client"


const timelineData = [
  {
    id: 1,
    year: "2020 - 2022",
    title: "HSE Computer Science",
    place: "Chemnad Kasaragod",
    text: "Completed Higher Secondary Education in Computer Science from Chemnad, Kasaragod in 2022, building a solid foundation in programming and digital literacy."
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
    year: "2025 - PRESENT",
    title: "Frontend Developer Intern",
    place: "Warewee Consultancy Ltd",
    text: "Currently working as a frontend developer intern, creating user-friendly interfaces and delivering polished, accessible web experiences."
  },
]

export default function TimelineSection() {


  return (
    <section className="h-screen w-full bg-slate-950 relative px-4 py-16 sm:px-6 sm:py-20 overflow-hidden
    text-white"
    style={{fontFamily: "var(--staatliches)"}}>
      {/* <h2 className="text-xl font-bold uppercase  mb-5">My Journey</h2> */}
      <div className="flex flex-col items-center justify-center p-4
      relative before:absolute before:w-[1px] before:h-full before:bg-emerald-400
      before:-top-[87%] before:left-1/2 before:-translate-x-59

      after:absolute after:w-[1px] after:h-full after:bg-emerald-400
      after:-bottom-[87%] after:left-1/2 after:-translate-x-59
      ">
        {timelineData.map((t) => (
          <div key={t.id} className="max-w-md p-5 border-emerald-400
          border-t-0 border-r-0 border rounded-xl rounded-br-none rounded-tl-none
          even:border-r even:border-l-0 even:rounded-br-xl even:rounded-bl-none
          last:rounded-tl-xl last:border-b-0 last:rounded-bl-none

          first:mr-6 last:mr-6

          relative
          before:absolute before:w-2 before:h-2 before:rounded-full before:bg-emerald-400 
          before:top-0 
          first:before:-left-1
          even:before:right-1 even:before:-top-1
          last:before:left-1 last:before:-top-1
          
          flex text-lg">
            {/* <div className="flex-2">
              <h4 className="text-2xl font-semibold" style={{fontFamily: "var(--urbanist)"}}>
                <span className="block text-4xl font-extrabold">{t.year}</span>
                {t.title}
              </h4>
            </div> */}
            {/* <p className="flex-1">{t.place}</p> */}
            <p className="flex-2 text-justify text-indigo-100">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
