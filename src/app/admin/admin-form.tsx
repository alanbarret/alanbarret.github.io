
"use client";

import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, LogOut } from "lucide-react";
import type { RawPortfolioData, RawHero, RawExperience, RawProject, RawSkillCategory } from "@/lib/types";
import { useRouter } from "next/navigation";


export default function AdminForm({ initialData }: { initialData: RawPortfolioData }) {
  const [heroData, setHeroData] = useState<RawHero>(initialData.hero);
  const [experiences, setExperiences] = useState<RawExperience[]>(initialData.experiences);
  const [projects, setProjects] = useState<RawProject[]>(initialData.projects);
  const [skills, setSkills] = useState<RawSkillCategory[]>(initialData.skills);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleExport = () => {
    const fullData = {
      hero: heroData,
      experiences: experiences,
      projects: projects,
      skills: skills,
    };
    const jsonString = JSON.stringify(fullData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Export Successful",
      description: "portfolio-data.json has been downloaded.",
    });
  };
  
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
            throw new Error("File is not readable");
        }
        const importedData = JSON.parse(text);

        if (importedData.hero && importedData.experiences && importedData.projects && importedData.skills) {
          setHeroData(importedData.hero);
          setExperiences(importedData.experiences);
          setProjects(importedData.projects);
          setSkills(importedData.skills);
          toast({
            title: "Import Successful",
            description: "Portfolio data has been loaded from the file.",
          });
        } else {
          throw new Error("Invalid JSON structure.");
        }
      } catch (error) {
        toast({
          title: "Import Failed",
          description: error instanceof Error ? error.message : "Could not parse the file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };
  
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portfolio-admin-auth");
      router.push("/login");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            Edit your portfolio content below. Use Export to save your changes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <Button className="w-full sm:w-auto" variant="outline" onClick={handleImportClick}>
                <Download className="mr-2 h-4 w-4" /> Import JSON
            </Button>
            <Button className="w-full sm:w-auto" onClick={handleExport}>
                <Upload className="mr-2 h-4 w-4" /> Export JSON
            </Button>
            <Button className="w-full sm:w-auto" variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="hero">Hero</TabsTrigger>
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
