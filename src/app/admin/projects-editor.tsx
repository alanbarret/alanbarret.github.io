"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  name: string;
  description: string;
  image: string;
  imageHint: string;
  tags: string[];
  github: string;
  demo: string;
}

interface ProjectsEditorProps {
  data: Project[];
  setData: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function ProjectsEditor({ data, setData }: ProjectsEditorProps) {
  const handleUpdate = (index: number, field: keyof Project, value: string | string[]) => {
    const newData = [...data];
    // @ts-ignore
    newData[index][field] = value;
    setData(newData);
  };

  const handleAdd = () => {
    setData([
      ...data,
      {
        name: "New Project",
        description: "",
        image: "https://placehold.co/600x400.png",
        imageHint: "new project",
        tags: [],
        github: "#",
        demo: "#",
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Projects Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((project, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Project Name</Label>
                <Input value={project.name} onChange={(e) => handleUpdate(index, 'name', e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description</Label>
                <Textarea value={project.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={project.image} onChange={(e) => handleUpdate(index, 'image', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Image AI Hint</Label>
                <Input value={project.imageHint} onChange={(e) => handleUpdate(index, 'imageHint', e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input value={project.github} onChange={(e) => handleUpdate(index, 'github', e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label>Live Demo URL</Label>
                <Input value={project.demo} onChange={(e) => handleUpdate(index, 'demo', e.target.value)} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Tags (comma separated)</Label>
                <Input value={project.tags.join(', ')} onChange={(e) => handleUpdate(index, 'tags', e.target.value.split(',').map(t => t.trim()))} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
            </div>
          </Card>
        ))}
        <Button onClick={handleAdd}>Add Project</Button>
      </CardContent>
    </Card>
  );
}
