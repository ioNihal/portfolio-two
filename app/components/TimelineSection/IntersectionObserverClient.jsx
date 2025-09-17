"use client";

import { useEffect } from "react";

export default function IntersectionObserverClient() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".timeline-item"));
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const dir = el.dataset.direction || "first";
        if (entry.isIntersecting) {
          el.classList.remove(`leave-${dir}`);
          void el.offsetWidth; 
          el.classList.add(`enter-${dir}`);
        } else {
          el.classList.remove(`enter-${dir}`);
          void el.offsetWidth;
          el.classList.add(`leave-${dir}`);
        }
      });
    }, { threshold: 0.50 });

    items.forEach((i) => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return null;
}
