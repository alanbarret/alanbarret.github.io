"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, PlusCircle } from "lucide-react";
import type { SkillCategory } from "@/lib/data";

interface SkillsEditorProps {
  data: SkillCategory[];
  setData: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
}

// NOTE: Editing icons is not supported in this simple editor.
// They are hardcoded in lib/data.ts and will be lost if a skill is deleted and re-added.

export default function SkillsEditor({ data, setData }: SkillsEditorProps) {

  const handleCategoryTitleChange = (catIndex: number, newTitle: string) => {
    const newData = [...data];
    newData[catIndex].title = newTitle;
    setData(newData);
  };
  
  const handleDeleteCategory = (catIndex: number) => {
    setData(data.filter((_, i) => i !== catIndex));
  };
  
  const handleSkillChange = (catIndex: number, skillIndex: number, newName: string) => {
    const newData = [...data];
    newData[catIndex].skills[skillIndex].name = newName;
    setData(newData);
  };

  const handleAddSkill = (catIndex: number) => {
    const newData = [...data];
    // A placeholder icon is needed. This functionality is limited.
    const CodeIcon = (props: any) => <svg {...props}><path d="M0 0h24v24H0z" fill="none"/></svg>;
    newData[catIndex].skills.push({ name: "New Skill", icon: CodeIcon });
    setData(newData);
  };
  
  const handleDeleteSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...data];
    newData[catIndex].skills = newData[catIndex].skills.filter((_, i) => i !== skillIndex);
    setData(newData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skills Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Note: Skill icons cannot be edited here. Deleting and re-adding a skill will result in a lost icon.
        </p>
        <div className="space-y-4">
          {data.map((category, catIndex) => (
            <Card key={catIndex} className="p-4 bg-secondary/50">
              <div className="flex justify-between items-center mb-4">
                 <Input 
                   className="text-lg font-bold" 
                   value={category.title}
                   onChange={(e) => handleCategoryTitleChange(catIndex, e.target.value)}
                 />
                 <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(catIndex)}>
                   <Trash className="h-4 w-4 text-destructive" />
                 </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-accent" />
                    <Input 
                       value={skill.name}
                       onChange={(e) => handleSkillChange(catIndex, skillIndex, e.target.value)}
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(catIndex, skillIndex)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
               <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleAddSkill(catIndex)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Skill to {category.title}
                  </Button>
               </div>
            </Card>
          ))}
        </div>
        {/* Functionality to add a new category is complex due to icons and can be added later */}
      </CardContent>
    </Card>
  );
}
