import Image from "next/image";
import { LazyCoffeeSip } from "../MicroAnimation";

export default function AboutSection() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="w-full bg-background px-6 py-24"
        >
            <div className="mx-auto max-w-4xl">
                <h2
                    id="about-heading"
                    className="mb-12 font-mono text-[13px] font-normal text-muted"
                >
                    About
                </h2>

                <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
                    <div className="space-y-6 font-serif text-xl leading-relaxed text-foreground/80 text-pretty sm:text-2xl md:flex-1">
                        <p>
                            I&apos;m Nihal from Kasaragod, Kerala. I build modern full-stack
                            web applications with React, Next.js and Node.js, focusing on
                            performance, clean design and database integrity.
                        </p>
                        <p>
                            I enjoy polished interactions, experimenting with visuals and
                            turning complex ideas into simple tools. Away from the keyboard,
                            you&apos;ll find me by Kasaragod&apos;s coastline, sketching UI
                            ideas, or with a cup of filter coffee while learning something
                            new.
                        </p>
                        <LazyCoffeeSip className="text-muted [&_svg]:h-8" />
                    </div>

                    <Image
                        src="/assets/halftone.svg"
                        alt="Nihal K profile illustration"
                        width={500}
                        height={600}
                        className="h-auto w-40 shrink-0 select-none sm:w-48 md:w-56 [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)]"
                    />
                </div>
            </div>
        </section>
    );
}