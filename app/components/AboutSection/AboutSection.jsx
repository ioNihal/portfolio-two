import Image from 'next/image';
import HalftoneSVG from '../../assets/halftone_1756709950.svg';

export default function AboutSection() {
    return (
        <section className="min-h-screen w-full bg-slate-950 relative px-4 sm:px-6 
    text-white isolate grid place-items-center" id='about'>
            <div className='flex justify-between flex-col-reverse lg:flex-row
            gap-10 lg:gap-0 items-center ' style={{ fontFamily: "var(--urbanist)" }}>
                <p className='lg:text-2xl 2xl:text-4xl 
                flex-1 p-4 lg:pl-10 xl:p-20 2xl:p-30 text-justify'>
                    I'm Nihal from Kasaragod, Kerala. A BCA graduate who cares about clean design and the small moments that make apps feel human.
                    I build front-end interfaces with React and Next.js, but I don't let tech be the whole story.
                    I enjoy polishing tiny interactions, experimenting with visuals, and turning fuzzy ideas into clear, useful experiences.
                    Outside of work I love wandering Kasaragod's coast, sketching UI ideas, and learning new things over strong filter coffee.
                </p>
                <div className='flex-1'>
                    <Image width={500} height={600} src={HalftoneSVG} alt='halftone-svg' loading='lazy'
                        className='w-[200px] lg:w-xs 2xl:w-md h-auto aspect-3/4 object-cover
                         border-8 border-indigo-900/40 rounded-full
                        m-auto float select-none ' />
                </div>
            </div>
        </section>
    )
}
