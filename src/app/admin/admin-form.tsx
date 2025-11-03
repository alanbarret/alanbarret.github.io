
"use client";

import React, { useState, useEffect } from "react";
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
import ContactEditor from "./contact-editor";
import EducationEditor from "./education-editor";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, LogOut, Save, Database } from "lucide-react";
import type { RawPortfolioData, RawHero, RawExperience, RawProject, RawSkillCategory, RawContact, RawEducation } from "@/lib/types";
import { useAuth, useFirebase, errorEmitter, FirestorePermissionError, type SecurityRuleContext } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";


const emptyData: RawPortfolioData = {
  hero: { badge: '', headline: '', description: '', tags: [] },
  experiences: [],
  projects: [],
  skills: [],
  education: [],
  contact: { email: '', github: '', linkedin: '' },
};

export default function AdminForm({ initialData }: { initialData: RawPortfolioData | null }) {
  const [heroData, setHeroData] = useState<RawHero>(initialData?.hero || emptyData.hero);
  const [experiences, setExperiences] = useState<RawExperience[]>(initialData?.experiences || emptyData.experiences);
  const [projects, setProjects] = useState<RawProject[]>(initialData?.projects || emptyData.projects);
  const [skills, setSkills] = useState<RawSkillCategory[]>(initialData?.skills || emptyData.skills);
  const [education, setEducation] = useState<RawEducation[]>(initialData?.education || emptyData.education);
  const [contactData, setContactData] = useState<RawContact>(initialData?.contact || emptyData.contact);
  const [isSaving, setIsSaving] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { firestore } = useFirebase();
  const auth = useAuth();
  
  useEffect(() => {
    if (initialData) {
      // Ensure all parts of initialData exist before setting state
      setHeroData(initialData.hero || emptyData.hero);
      setExperiences(initialData.experiences || emptyData.experiences);
      setProjects(initialData.projects || emptyData.projects);
      setSkills(initialData.skills || emptyData.skills);
      setEducation(initialData.education || emptyData.education);
      setContactData(initialData.contact || emptyData.contact);
      setIsDataReady(true);
    } else {
      // Still set ready to true, form will just use empty data
      setIsDataReady(true);
    }
  }, [initialData]);


  const handleSaveChanges = async () => {
    setIsSaving(true);
    const fullData: RawPortfolioData = {
      hero: heroData,
      experiences: experiences,
      projects: projects,
      skills: skills,
      education: education,
      contact: contactData,
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
        });
        
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
            title: "Save Failed",
            description: "You don't have permission to save these changes.",
            variant: "destructive",
        });
        setIsSaving(false);
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
  
  if (!isDataReady) {
    return (
        <div className="container mx-auto py-10">
            <div className="space-y-4">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-8 w-1/2" />
                <div className="mt-8 space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">
            Edit your portfolio content below. Changes are saved to the cloud.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button className="w-full sm:w-auto" onClick={handleSaveChanges} disabled={isSaving}>
                <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save to Cloud"}
            </Button>
            <Button className="w-full sm:w-auto" variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 h-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
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
        <TabsContent value="education">
          <EducationEditor data={education} setData={setEducation} />
        </TabsContent>
        <TabsContent value="contact">
          <ContactEditor data={contactData} setData={setContactData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
