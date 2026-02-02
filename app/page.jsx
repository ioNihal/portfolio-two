import AboutSection from "@/components/AboutSection/AboutSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import FooterSection from "@/components/FooterSection/FooterSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProjectSection from "@/components/ProjectSection/ProjectSection";
import SkillSection from "@/components/SkillSection/SkillSection";
import TimelineSection from "@/components/TimelineSection/TimelineSection";



export default function Home() {
  return (
    <main className="w-screen overflow-x-hidden">
      <HeroSection />
      <SkillSection />
      <ProjectSection />
      <TimelineSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
