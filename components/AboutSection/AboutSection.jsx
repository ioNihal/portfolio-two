import Image from 'next/image';

export default function AboutSection() {
    return (
        <section className="min-h-screen w-full bg-slate-950 relative px-4 sm:px-6 
    text-white isolate grid place-items-center" id='about' aria-label="About Me">
            <article className='flex justify-between flex-col-reverse lg:flex-row
            gap-10 lg:gap-0 items-center ' style={{ fontFamily: "var(--urbanist)" }}>
                <h2 className="sr-only">About Me</h2>
                <div className='lg:text-2xl 2xl:text-4xl 
                flex-1 p-4 lg:pl-10 xl:p-20 2xl:p-30 text-justify'>
                    I'm Nihal from Kasaragod, Kerala. I hold a Bachelor's degree in Computer Applications (BCA) from Srinivas University&nbsp;-&nbsp;ICIS in Mangalore, Karnataka, with specialization in Software Development and Web Design.
                    My education at Srinivas University has equipped me with a strong foundation in both front-end and back-end development.
                    I build modern web applications with React and Next.js, focusing on clean design and intuitive user experiences.
                    I enjoy crafting polished interactions, experimenting with visuals, and transforming complex ideas into user-friendly solutions.
                    When I'm not coding, you'll find me exploring Kasaragod's beautiful coastline, sketching UI ideas, or enjoying a cup of filter coffee while learning new technologies.
                </div>
                <div className='flex-1'>
                    <Image width={500} height={600} src={"/assets/halftone.svg"} alt='Nihal K profile illustration' loading='lazy'
                        className='w-[200px] lg:w-xs 2xl:w-md h-auto aspect-3/4 object-cover
                         border-8 border-indigo-900/40 rounded-full
                        m-auto float select-none' />
                </div>
            </article>
        </section>
    )
}
