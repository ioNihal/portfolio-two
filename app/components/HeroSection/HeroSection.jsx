import HeroContent from "./HeroContent";

export default function HeroSection() {

  return (
    <section className="h-[60vh] lg:h-screen w-full relative" id="home">
      <div className="absolute -z-1 inset-0 bg-grid bg-indigo-950/35 " />
      <div className="absolute -top-10 lg:top-10 -left-5 lg:left-10 2xl:left-[10%] 2xl:top-[15%] w-auto h-auto animate-wiggle p-2 lg:p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-2xl md:block">
        <pre><code className="language-javascript text-[0.6rem] lg:text-xs 2xl:text-xl text-cyan-300"><span className="text-purple-400">const</span> <span className="text-yellow-300">component</span> = () =&gt; (<br />
          <span className="text-gray-500">  &lt;</span><span className="text-green-400">div</span> <span className="text-red-400">className</span>=<span className="text-yellow-300">"awesome"</span><span className="text-gray-500">&gt;<br /></span>
          <span className="text-gray-500">    &lt;</span><span className="text-green-400">h1</span><span className="text-gray-500">&gt;</span>Hello, World!<span className="text-gray-500">&lt;/</span><span className="text-green-400">h1</span><span className="text-gray-500">&gt;<br /></span>
          <span className="text-gray-500">  &lt;/</span><span className="text-green-400">div</span><span className="text-gray-500">&gt;<br /></span>
          );</code></pre>
      </div>
      {/* <Image className="absolute top-10 left-10 w-[250px] h-auto animate-wiggle" src={code01Webp} width={200} height={180} alt="code01svg" /> */}
      <div className="absolute -bottom-10 lg:bottom-10 -right-20 lg:-right-15 2xl:bottom-[15%] 2xl:right-[10%] w-auto h-auto animate-wiggle p-2 lg:p-4 bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-2xl md:block">
        <pre><code className="language-css text-[0.6rem] lg:text-xs xl:text-sm text-cyan-300">.<span className="text-yellow-300">hero</span>&nbsp;&#123;<br />
          <span className="text-blue-400">  background</span>: <span className="text-purple-400">linear-gradient</span>(45deg, #8A42F5, #00E0C7);<br />
          <span className="text-blue-400">  color</span>: <span className="text-yellow-300">#fff</span>;<br />
          &#125;</code></pre>
      </div>
      {/* <Image className="absolute bottom-10 right-10 w-sm h-auto animate-wiggle" src={code02Webp} width={200} height={180} alt="code02svg" /> */}


      <HeroContent />
    </section>
  )
}
