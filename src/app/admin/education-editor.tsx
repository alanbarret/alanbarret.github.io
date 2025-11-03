
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import type { RawEducation } from "@/lib/types";

interface EducationEditorProps {
  data: RawEducation[];
  setData: React.Dispatch<React.SetStateAction<RawEducation[]>>;
}

export default function EducationEditor({ data, setData }: EducationEditorProps) {
  const handleUpdate = (index: number, field: keyof RawEducation, value: string) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleAdd = () => {
    setData([
      ...data,
      {
        degree: "New Degree",
        institution: "University Name",
        duration: "Year - Year",
        description: "",
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Education Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((edu, index) => (
          <Card key={index} className="p-4 bg-secondary/30">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input value={edu.degree} onChange={(e) => handleUpdate(index, 'degree', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input value={edu.institution} onChange={(e) => handleUpdate(index, 'institution', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={edu.duration} onChange={(e) => handleUpdate(index, 'duration', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea value={edu.description} onChange={(e) => handleUpdate(index, 'description', e.target.value)} />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="destructive" size="sm" onClick={() => handleDelete(index)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </Card>
        ))}
        <Button onClick={handleAdd}>Add Education</Button>
      </CardContent>
    </Card>
  );
}
