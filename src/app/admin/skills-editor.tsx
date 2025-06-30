
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, PlusCircle } from "lucide-react";

// Local types for the admin panel, with icons as strings
interface Skill {
    name: string;
    icon: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

interface SkillsEditorProps {
  data: SkillCategory[];
  setData: React.Dispatch<React.SetStateAction<SkillCategory[]>>;
}


export default function SkillsEditor({ data, setData }: SkillsEditorProps) {

  const handleCategoryChange = (catIndex: number, field: 'title' | 'icon', value: string) => {
    const newData = [...data];
    newData[catIndex][field] = value;
    setData(newData);
  };
  
  const handleDeleteCategory = (catIndex: number) => {
    setData(data.filter((_, i) => i !== catIndex));
  };
  
  const handleSkillChange = (catIndex: number, skillIndex: number, field: 'name' | 'icon', value: string) => {
    const newData = [...data];
    newData[catIndex].skills[skillIndex][field] = value;
    setData(newData);
  };

  const handleAddSkill = (catIndex: number) => {
    const newData = [...data];
    newData[catIndex].skills.push({ name: "New Skill", icon: "Code" });
    setData(newData);
  };
  
  const handleDeleteSkill = (catIndex: number, skillIndex: number) => {
    const newData = [...data];
    newData[catIndex].skills = newData[catIndex].skills.filter((_, i) => i !== skillIndex);
    setData(newData);
  };
  
  const handleAddCategory = () => {
    setData([
        ...data,
        { title: "New Category", icon: "Code", skills: [] }
    ]);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skills Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Enter the name of a Lucide icon (e.g., 'Bot', 'Cloud') or a custom icon (e.g., 'ReactIcon', 'PythonIcon'). Casing matters.
        </p>
        <div className="space-y-4">
          {data.map((category, catIndex) => (
            <Card key={catIndex} className="p-4 bg-secondary/50">
              <div className="flex justify-between items-center mb-4 gap-4">
                 <div className="grid grid-cols-2 gap-4 flex-grow">
                    <div className="space-y-2">
                        <Label>Category Title</Label>
                        <Input 
                            value={category.title}
                            onChange={(e) => handleCategoryChange(catIndex, 'title', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Category Icon</Label>
                        <Input 
                            value={category.icon}
                            onChange={(e) => handleCategoryChange(catIndex, 'icon', e.target.value)}
                        />
                    </div>
                 </div>
                 <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(catIndex)}>
                   <Trash className="h-4 w-4 text-destructive" />
                 </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                    <Input 
                       value={skill.name}
                       placeholder="Skill Name"
                       onChange={(e) => handleSkillChange(catIndex, skillIndex, 'name', e.target.value)}
                    />
                     <Input 
                       value={skill.icon}
                       placeholder="Icon Name"
                       onChange={(e) => handleSkillChange(catIndex, skillIndex, 'icon', e.target.value)}
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
        <Button onClick={handleAddCategory}>Add Category</Button>
      </CardContent>
    </Card>
  );
}
