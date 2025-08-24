"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function useGSAPScroll() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Stem growth (vine-like, with organic ease)
    gsap.fromTo(".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 80%",
          end: "bottom bottom",
          scrub: true,
        }
      }
    )

    // Connectors sprout outwards
    gsap.utils.toArray(".connector").forEach((c) => {
      const origin = c.classList.contains("connector-left") ? "100% 50%" : "0% 50%"
      gsap.set(c, { scaleX: 0, transformOrigin: origin })
      gsap.to(c, {
        scaleX: 1,
        duration: 1.2,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: c,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Leaves sprouting
    gsap.utils.toArray(".leaf-wrapper").forEach((leaf, i) => {
      const tilt = leaf.closest(".flex")?.classList.contains("justify-end") ? -15 : 15

      gsap.set(leaf, {
        scale: 0,
        rotateZ: tilt,
        opacity: 0,
        filter: "blur(6px)",
        transformOrigin: "center",
      })

      gsap.to(leaf, {
        scale: 1,
        rotateZ: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: leaf,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => {
          // breathing effect
          gsap.to(leaf, {
            scale: 1.03,
            duration: 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 1,
          })
        }
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  })
}
