
import HeroSection from "./components/HeroSection/HeroSection";
import SkillSection from "./components/SkilllSection/SkillSection";


export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden">
      <HeroSection />
      <SkillSection />
    </div>
  );
}
