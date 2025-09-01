
import HeroSection from "./components/HeroSection/HeroSection";
import ProjectSection from "./components/ProjectSection/ProjectSection";
import SkillSection from "./components/SkilllSection/SkillSection";
import TimelineSection from "./components/TimelineSection/TimelineSection";
import AboutSection from "./components/AboutSection/AboutSection"
import ContactSection from "./components/ContactSection/ContactSection";


export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden">
      <HeroSection />
      <SkillSection />
      <ProjectSection />
      <TimelineSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
