import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import CertificationsSection from "@/components/certifications-section";
import AiDescriptionGenerator from "@/components/ai-description-generator";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <AiDescriptionGenerator />
      </main>
      <Footer />
    </div>
  );
}
