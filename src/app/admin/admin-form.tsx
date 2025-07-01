
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
import { savePortfolioData } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download } from "lucide-react";
import type { RawPortfolioData, RawHero, RawExperience, RawProject, RawSkillCategory } from "@/lib/types";


export default function AdminForm({ initialData }: { initialData: RawPortfolioData }) {
  const [heroData, setHeroData] = useState<RawHero>(initialData.hero);
  const [experiences, setExperiences] = useState<RawExperience[]>(initialData.experiences);
  const [projects, setProjects] = useState<RawProject[]>(initialData.projects);
  const [skills, setSkills] = useState<RawSkillCategory[]>(initialData.skills);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const fullData = {
      hero: heroData,
      experiences: experiences,
      projects: projects,
      skills: skills,
    };

    const result = await savePortfolioData(fullData);

    if (result.success) {
      toast({
        title: "Success!",
        description: "Your portfolio has been updated.",
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong.",
        variant: "destructive",
      });
    }
    setIsSaving(false);
  };

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
            description: "Portfolio data loaded. Don't forget to save.",
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

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
        <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <Button variant="outline" onClick={handleImportClick}>
                <Download className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline" onClick={handleExport}>
                <Upload className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save All Changes"}
            </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-8">
        Welcome to the admin panel. Here you can edit the content of your portfolio. Remember to save your changes to make them live.
      </p>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
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
