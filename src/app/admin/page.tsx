"use client";

import { useState } from "react";
import {
  heroData as initialHeroData,
  experiencesData as initialExperiencesData,
  projectsData as initialProjectsData,
  skillsData as initialSkillsData,
  SkillCategory,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import HeroEditor from "./hero-editor";
import ExperienceEditor from "./experience-editor";
import ProjectsEditor from "./projects-editor";
import SkillsEditor from "./skills-editor";

export default function AdminPage() {
  const [heroData, setHeroData] = useState(initialHeroData);
  const [experiences, setExperiences] = useState(initialExperiencesData);
  const [projects, setProjects] = useState(initialProjectsData);
  const [skills, setSkills] = useState<SkillCategory[]>(initialSkillsData);

  const handleSaveChanges = () => {
    console.log("Saving changes...", {
      heroData,
      experiences,
      projects,
      skills,
    });
    alert("Changes saved to console! Check the developer tools.");
    // In a real application, you would send this data to your backend/database.
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        <Button onClick={handleSaveChanges}>Save All Changes</Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Welcome to the admin panel. Here you can edit the content of your portfolio. Remember to save your changes.
      </p>

      <Tabs defaultValue="hero">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="hero">
          <HeroEditor data={heroData} setData={setHeroData} />
        </TabsContent>
        <TabsContent value="experience">
          <ExperienceEditor data={experiences} setData={setExperiences} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsEditor data={projects} setData={setProjects} />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsEditor data={skills} setData={setSkills} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
