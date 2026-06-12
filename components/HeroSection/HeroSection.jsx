import HeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full bg-background text-foreground isolate
      flex lg:items-center justify-center"
    >
      {/* Background grid */}
      <div className="absolute -z-1 inset-0 bg-radial" />

    
      <div className="px-4 py-12 lg:py-16 lg:px-10 max-w-6xl">
        <HeroContent />
      </div>
    </section>
  );
}
