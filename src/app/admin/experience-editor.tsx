
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  logo: string;
  logoHint: string;
  tags: string[];
}

interface ExperienceEditorProps {
  data: Experience[];
  setData: React.Dispatch<React.SetStateAction<Experience[]>>;
}

export default function ExperienceEditor({ data, setData }: ExperienceEditorProps) {
  const handleUpdate = (index: number, field: keyof Experience, value: string | string[]) => {
    const newData = [...data];
    // @ts-ignore
    newData[index][field] = value;
    setData(newData);
  };

  const handleAdd = () => {
    setData([
      ...data,
      {
        role: "New Role",
        company: "New Company",
        duration: "Month Year - Present",
        description: "",
        logo: "https://placehold.co/100x100.png",
        logoHint: "company logo",
        tags: [],
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Experience Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((exp, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={exp.role} onChange={(e) => handleUpdate(index, 'role', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={exp.company} onChange={(e) => handleUpdate(index, 'company', e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Duration</Label>
                <Input value={exp.duration} onChange={(e) => handleUpdate(index, 'duration', e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description</Label>
                <Textarea value={exp.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label>Logo URL</Label>
                <Input value={exp.logo} onChange={(e) => handleUpdate(index, 'logo', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Logo AI Hint</Label>
                <Input value={exp.logoHint} onChange={(e) => handleUpdate(index, 'logoHint', e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Tags (comma separated)</Label>
                <Input value={exp.tags.join(', ')} onChange={(e) => handleUpdate(index, 'tags', e.target.value.split(',').map(t => t.trim()))} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
            </div>
          </Card>
        ))}
        <Button onClick={handleAdd}>Add Experience</Button>
      </CardContent>
    </Card>
  );
}
