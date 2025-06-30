import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import Footer from "@/components/footer";
import { getPortfolioData } from "@/lib/data";

export default async function Home() {
  const { hero, experiences, projects, skills } = await getPortfolioData();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection data={hero} />
        <ExperienceSection data={experiences} />
        <ProjectsSection data={projects} />
        <SkillsSection data={skills} />
      </main>
      <Footer />
    </div>
  );
}
