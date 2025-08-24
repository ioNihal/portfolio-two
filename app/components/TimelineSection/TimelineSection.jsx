"use client"

import ForestLottie from "./ForestLottie"
import useGSAPScroll from "./useGSAPScroll"

const timelineData = [
  { 
    id: 1, 
    side: "left", 
    title: "HSE Computer Science, Chemnad Kasaragod", 
    text: "Completed Higher Secondary Education in Computer Science from Chemnad, Kasaragod in 2022, building a solid foundation in programming and digital literacy." 
  },
  { 
    id: 2, 
    side: "right", 
    title: "BCA Software & Web Development, Srinivas University", 
    text: "Graduated in 2025 with a Bachelor of Computer Applications, focusing on software development, web technologies, and practical project experience." 
  },
  { 
    id: 3, 
    side: "left", 
    title: "Frontend Developer Intern, Warewee Consultancy Ltd", 
    text: "Currently working as a frontend developer intern, creating user-friendly interfaces and delivering polished, accessible web experiences." 
  },
]

export default function TimelineSection() {
  useGSAPScroll()

  return (
    <section className="min-h-screen w-full bg-slate-950 relative px-4 py-16 sm:px-6 sm:py-20 overflow-hidden">
      {/* Center vine */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1">
        <div className="timeline-line w-full h-full rounded-full bg-gradient-to-b from-green-400 to-emerald-700 origin-top" />
      </div>

      {/* Timeline grid */}
      <div className="relative max-w-5xl mx-auto hidden md:block">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-y-16 sm:gap-y-24">
          {timelineData.map((item) => {
            const isLeft = item.side === "left"
            return (
              <div key={item.id} className="contents">
                {/* LEFT CELL */}
                <div className={`flex items-center justify-${isLeft ? "end" : "start"} px-2 sm:px-4`}>
                  {isLeft && (
                    <div className="leaf-wrapper w-full max-w-sm sm:max-w-md transform-gpu will-change-transform" data-id={item.id}>
                      <div className="leaf-card timeline-card relative bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 border border-green-400/20 rounded-2xl shadow-[0_6px_24px_rgba(16,185,129,0.15)] backdrop-blur-sm overflow-hidden p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-200 mb-1 sm:mb-2">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-green-100/70 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CENTER CONNECTOR */}
                <div className="flex items-center justify-center relative px-1 sm:px-2">
                  <div className="node flex items-center flex-col">
                    <div className="node-dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-300 shadow-[0_0_10px_rgba(16,185,129,0.35)]"></div>
                    <div
                      className={`connector ${isLeft ? 'connector-left' : ""} w-16 sm:w-20 h-0.5 bg-green-400/70 rounded-full -translate-y-1.5`}
                    />
                  </div>
                </div>

                {/* RIGHT CELL */}
                <div className={`flex items-center justify-${isLeft ? "start" : "end"} px-2 sm:px-4`}>
                  {!isLeft && (
                    <div className="leaf-wrapper w-full max-w-sm sm:max-w-md transform-gpu will-change-transform" data-id={item.id}>
                      <div className="leaf-card timeline-card relative bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 border border-green-400/20 rounded-2xl shadow-[0_6px_24px_rgba(16,185,129,0.15)] backdrop-blur-sm overflow-hidden p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-200 mb-1 sm:mb-2">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-green-100/70 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
