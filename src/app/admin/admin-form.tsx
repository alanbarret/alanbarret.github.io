
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
import { UploadCloud, LogOut, Save } from "lucide-react";
import type { RawPortfolioData, RawHero, RawExperience, RawProject, RawSkillCategory } from "@/lib/types";
import { useAuth, useFirebase } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


export default function AdminForm({ initialData }: { initialData: RawPortfolioData }) {
  const [heroData, setHeroData] = useState<RawHero>(initialData.hero);
  const [experiences, setExperiences] = useState<RawExperience[]>(initialData.experiences);
  const [projects, setProjects] = useState<RawProject[]>(initialData.projects);
  const [skills, setSkills] = useState<RawSkillCategory[]>(initialData.skills);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { firestore } = useFirebase();
  const auth = useAuth();

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const fullData = {
      hero: heroData,
      experiences: experiences,
      projects: projects,
      skills: skills,
    };

    try {
        if (!firestore) throw new Error("Firestore not initialized");
        const docRef = doc(firestore, "portfolio", "main");
        await setDoc(docRef, fullData, { merge: true });
        toast({
            title: "Success!",
            description: "Your portfolio has been saved to the cloud.",
        });
    } catch (error) {
        console.error("Error saving data:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        toast({
            title: "Save Failed",
            description: `Could not save data to Firebase. ${errorMessage}`,
            variant: "destructive",
        });
    } finally {
        setIsSaving(false);
    }
  };
  
  const handleLogout = async () => {
    try {
        await signOut(auth);
        router.push("/login");
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
    } catch (error) {
         toast({
            title: "Logout Failed",
            description: "There was an error logging you out.",
            variant: "destructive",
        });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            Edit your portfolio content below. Changes are saved to the cloud.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button className="w-full sm:w-auto" onClick={handleSaveChanges} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save to Cloud"}
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
