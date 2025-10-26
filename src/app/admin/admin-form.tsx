
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
import { UploadCloud, LogOut, Save, Database } from "lucide-react";
import type { RawPortfolioData, RawHero, RawExperience, RawProject, RawSkillCategory } from "@/lib/types";
import { useAuth, useFirebase, errorEmitter, FirestorePermissionError, type SecurityRuleContext } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import initialJsonData from '@/lib/portfolio-data.json';


export default function AdminForm({ initialData }: { initialData: RawPortfolioData }) {
  const [heroData, setHeroData] = useState<RawHero>(initialData.hero);
  const [experiences, setExperiences] = useState<RawExperience[]>(initialData.experiences);
  const [projects, setProjects] = useState<RawProject[]>(initialData.projects);
  const [skills, setSkills] = useState<RawSkillCategory[]>(initialData.skills);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
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

    if (!firestore) {
      toast({
        title: "Save Failed",
        description: "Firestore not initialized.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    const docRef = doc(firestore, "portfolio", "main");
    
    setDoc(docRef, fullData, { merge: true })
      .then(() => {
        toast({
          title: "Success!",
          description: "Your portfolio has been saved to the cloud.",
        });
        setIsSaving(false);
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: fullData,
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
            title: "Save Failed",
            description: "You don't have permission to save these changes.",
            variant: "destructive",
        });
        setIsSaving(false);
      });
  };
  
  const handleSeedDatabase = async () => {
    setIsSeeding(true);
     if (!firestore) {
      toast({
        title: "Seed Failed",
        description: "Firestore not initialized.",
        variant: "destructive",
      });
      setIsSeeding(false);
      return;
    }

    const docRef = doc(firestore, "portfolio", "main");
    
    setDoc(docRef, initialJsonData, { merge: true })
      .then(() => {
        // Manually update state after seeding to reflect changes immediately
        setHeroData(initialJsonData.hero);
        setExperiences(initialJsonData.experiences);
        setProjects(initialJsonData.projects);
        setSkills(initialJsonData.skills);
        toast({
          title: "Database Seeded!",
          description: "Initial portfolio data has been saved to the cloud.",
        });
        setIsSeeding(false);
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'create',
            requestResourceData: initialJsonData,
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
            title: "Seed Failed",
            description: "You don't have permission to perform this action.",
            variant: "destructive",
        });
        setIsSeeding(false);
      });
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
            <Button className="w-full sm:w-auto" variant="outline" onClick={handleSeedDatabase} disabled={isSeeding}>
                <Database className="mr-2 h-4 w-4" /> {isSeeding ? "Seeding..." : "Seed Database"}
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
