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
      {/* vine line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
        <div className="timeline-line w-full h-full rounded-full bg-gradient-to-b from-green-400 to-emerald-700 origin-top" />
      </div>

      <div className="relative max-w-5xl mx-auto">

        <div className="flex flex-col gap-y-24">
          {timelineData.map((item) => {
            const isLeft = item.side === "left"
            return (
              <div
                key={item.id}
                className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-center gap-x-4"
                aria-hidden={false}
              >
               {/* md: left cards */}
                <div className="hidden md:flex md:justify-end lg:pr-4">
                  {isLeft && (
                    <div className="leaf-wrapper hidden md:block w-full max-w-sm md:max-w-md" data-id={item.id} data-side={item.side}>
                      <div className="leaf-card bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 border border-green-400/20 rounded-2xl shadow-[0_6px_24px_rgba(16,185,129,0.15)] backdrop-blur-sm overflow-hidden p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-200 mb-2">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-green-100/70 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  )}
                </div>

               
                <div className="flex items-center justify-center px-1 sm:px-2">
                  <div className="node flex items-center flex-col">
                    <div className="node-dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-300 shadow-[0_0_10px_rgba(16,185,129,0.35)]"></div>

                    {/* connector on desktop md */}
                    <div
                      className={`connector ${isLeft ? "connector-left" : ""} hidden md:block w-16 md:w-20 h-0.5 bg-green-400/70 rounded-full -translate-y-1.5`}
                      data-side={item.side}
                    />
                  </div>
                </div>

                
                <div className="flex items-center justify-start pl-2 sm:pl-4">
                  {/* Mobile: all card as right*/}
                  <div className="leaf-wrapper flex md:hidden w-full max-w-lg" data-id={item.id} data-side={item.side}>
                    <div className="leaf-card bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 border border-green-400/20 rounded-2xl shadow-[0_6px_24px_rgba(16,185,129,0.15)] backdrop-blur-sm overflow-hidden p-4">
                      <h3 className="text-lg font-semibold text-green-200 mb-2">{item.title}</h3>
                      <p className="text-xs text-green-100/70 leading-relaxed">{item.text}</p>
                    </div>
                  </div>

                  {/* Desktop right card (hidden on mobile) */}
                  {!isLeft && (
                    <div className="leaf-wrapper hidden md:block w-full max-w-sm md:max-w-md" data-id={item.id} data-side={item.side}>
                      <div className="leaf-card bg-gradient-to-br from-emerald-900/60 to-emerald-800/30 border border-green-400/20 rounded-2xl shadow-[0_6px_24px_rgba(16,185,129,0.15)] backdrop-blur-sm overflow-hidden p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-green-200 mb-2">{item.title}</h3>
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
