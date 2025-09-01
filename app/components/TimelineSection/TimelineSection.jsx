
import Image from 'next/image';
import ExpSVG from '../../assets/exp.svg';


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
    text-white isolate grid place-items-center"
      style={{ fontFamily: "var(--staatliches)" }}>
      {/* <h2 className="text-xl font-bold uppercase  mb-5">My Journey</h2> */}
      <div className="flex flex-col items-center justify-center overflow-hidden lg:overflow-visible max-w-lg  m-auto">
        {timelineData.map((t) => (
          <div key={t.id} className={` py-5 border-emerald-400 border-b
          flex flex-col text-lg
          ${t.id === 1 ? "zoomFirst" : t.id === 2 ? "zoomSecond" : "zoomThird"}`}>
            <div>
              <h6 className="text-gray-400 text-sm font-mono">{t.year}</h6>
              <h5 className="text-4xl text-emerald-400">{t.title}</h5>
              <h6 className="text-xs text-gray-400 font-sans">{t.place}</h6>
            </div>
            <p className="font-serif italic flex-2 text-justify text-indigo-100">{t.text}</p>
          </div>
        ))}
      </div>
      <div className="bg-cover absolute inset-0 -z-1">
        <Image src={ExpSVG} alt="exp-svg" width={1000} height={1000} className='h-full w-full object-cover animate-wiggle opacity-[0.04]' />
      </div>
    </section>
  )
}
