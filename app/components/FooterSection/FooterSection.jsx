

import Image from 'next/image';
import LinkList from './LinkList';
import { FooterLottie } from './FooterLottie';


const linksArr = ["Home", "Skills", "Projects", "Experience", "About", "Contact"];
const socials = [
  { name: "Instagram", url: "https://instagram.com/io.nihal" },
  { name: "LinkedIn", url: "https://linkedin.com/in/n1hal" },
  { name: "Github", url: "https://github.com/ionihal" },
  { name: "TwitterX", url: "https://x.com/n1haaaal" },
]

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <section
      className="h-auto w-full bg-black border-t border-gray-600 relative px-4 sm:px-6 
            text-white isolate flex flex-col items-center justify-center"
      style={{ fontFamily: "var(--urbanist)" }}
    >
      <div className='w-full 2xl:w-7/10  px-6 lg:px-10 pt-10 lg:pt-8 pb-10 flex flex-col-reverse lg:flex-row gap-10 lg:gap-30'>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl lg:text-7xl font-semibold tracking-widest">ioNihal</h1>

          <div className=" text-slate-400 flex flex-col gap-1">
            <p className="flex items-center gap-2 text-md lg:text-lg">
              Designed and Developed with
              <Image
                src="/appleEmoticon.webp"
                alt="emoticon"
                height={48}
                width={48}
                className="inline-block w-5 h-5 lg:w-7 lg:h-7"
              />
            </p>
            <p className='text-xs'>ioNihal &copy; {currentYear}.</p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 z-0">
            <FooterLottie />
          </div>
          <div className="relative z-10 flex-1 flex gap-20 *:flex *:flex-col *:gap-1 backdrop-blur-[3px]">
            <LinkList links={linksArr} action={"navigation"} />
            <LinkList links={socials} action={"social"} />
          </div>
        </div>

      </div>
    </section>
  )
}
