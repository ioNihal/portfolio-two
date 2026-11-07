import Link from "next/link";
import { LazyPettableCat } from "../MicroAnimation";

const link =
  "text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline";

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh w-full items-center bg-background px-6 py-24 text-foreground"
    >
      <div className="absolute inset-0 -z-10 bg-radial" />
      <div className="mx-auto w-full max-w-4xl">
        <h1
          id="hero-heading"
          className="font-serif text-6xl leading-[1.05] tracking-tight text-balance sm:text-7xl md:text-8xl"
        >
          Nihal <span className="relative"><LazyPettableCat className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-subtle md:text-lg" />K</span>
        </h1>

        <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-foreground/80 text-pretty sm:text-3xl">
          <span className="text-accent">Full-stack developer</span> building
          interfaces with intent, engineered for modern systems.
        </p>

        <nav
          aria-label="Primary"
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm"
        >
          <a href="#projects" className={link}>projects</a>
          <Link href="/blog" className={link}>blog</Link>
          <Link
            href="/docs/Nihal_K_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className={link}
          >
            resume ↗
          </Link>
        </nav>
      </div>
    </section>
  );
}