

export default function HeroContent() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-[1.5em]">
            <h1 className="text-white text-7xl font-extrabold">Nihal K</h1>
            <h2 className="text-3xl text-white/70 font-semibold">I'm a <span className="text-indigo-500">Fronted Developer</span></h2>
            <p className="opacity-60 text-xl font-medium max-w-lg text-center">Passionate about building modern, responsive and beautifull web applications</p>
            <div className="flex justify-between gap-[1em] *:py-3 *:px-6 *:text-lg *:font-bold *:rounded-lg *:cursor-pointer *:transition-colors *:duration-500 *:ease-in-out">
                <button className="bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg/50 shadow-fuchsia-500">View Works</button>
                <button className="bg-gray-500 hover:bg-gray-600 shadow-lg/50 shadow-gray-500 hover:shadow-gray-600">Resume</button>
            </div>
        </div>
    )
}