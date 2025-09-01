export default function ContactSection() {
    return (
        <section
            className="min-h-screen w-full bg-gray-950 relative px-4 sm:px-6 
            text-white isolate flex flex-col items-center justify-center"
            style={{ fontFamily: "var(--urbanist)" }}
        >
            <div className="w-full 2xl:w-7/10 m-auto font-bold px-6 lg:px-10">
                <h2 className="text-4xl md:text-6xl lg:text-8xl leading-snug">
                    Got a project in mind?<br />Let's talk.
                </h2>
            </div>

            <form
                action="mailto:nihal04x@gmail.com"
                method="get"
                encType="text/plain"
                className="mt-1 w-full 2xl:w-7/10 m-auto px-6 lg:px-10
                    grid grid-cols-1 gap-5 lg:grid-cols-5 lg:grid-rows-2"
            >
               
                <div className="flex flex-col gap-3 order-1 lg:order-none lg:col-start-4 lg:row-start-1">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                        className="w-full border border-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300 p-3"
                    />
                </div>

               
                <div className="flex flex-col gap-3 order-2 lg:order-none lg:col-start-5 lg:row-start-1">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className="w-full border border-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300 p-3"
                    />
                </div>

                
                <div className="flex flex-col gap-3 order-3 lg:order-none lg:col-start-1 lg:row-start-1 lg:col-span-3 lg:row-span-2">
                    <label htmlFor="body">Message</label>
                    <textarea
                        id="body"
                        name="body"
                        rows="5"
                        placeholder="Your Message"
                        required
                        className="w-full border border-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-300 p-3 rounded-md h-[200px] resize-none"
                    />
                </div>

               
                <button
                    type="submit"
                    aria-label="Send message to Nihal"
                    className="order-4 lg:order-none lg:col-start-4 lg:col-end-6 lg:row-start-2
                        bg-white text-black rounded-full text-3xl cursor-pointer hover:opacity-90 transition-opacity duration-300 w-full py-3"
                >
                    Message Nihal
                </button>
            </form>
        </section>
    )
}
