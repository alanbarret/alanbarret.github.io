
'use client';
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import Footer from "@/components/footer";
import { usePortfolioData } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: portfolioData, isLoading } = usePortfolioData();

  if (isLoading || !portfolioData) {
    return (
       <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-16 w-3/4 md:w-1/2" />
            <Skeleton className="h-8 w-full max-w-2xl" />
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <div className="py-20 lg:py-32 space-y-16">
             <Skeleton className="h-64 w-full" />
             <Skeleton className="h-64 w-full" />
             <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { hero, experiences, projects, skills } = portfolioData;

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
