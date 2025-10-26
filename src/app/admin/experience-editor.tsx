
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import React, { useState } from 'react';
import { useFirebaseStorage } from '@/firebase/storage';
import { useUser } from '@/firebase';
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

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
  const fileInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const { user } = useUser();
  const { uploadFile } = useFirebaseStorage();
  const { toast } = useToast();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

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
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file && user) {
      setUploadingIndex(index);
      try {
        const path = `portfolio-assets/${user.uid}/${Date.now()}-${file.name}`;
        const downloadURL = await uploadFile(path, file);
        handleUpdate(index, 'logo', downloadURL);
         toast({
          title: "Upload Successful",
          description: "Your image has been uploaded.",
        });
      } catch (error: any) {
        toast({
          title: "Upload Failed",
          description: error.message || "Could not upload the image.",
          variant: "destructive",
        });
      } finally {
        setUploadingIndex(null);
      }
    }
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
              <div className="space-y-2 col-span-1 md:col-span-1">
                <Label>Role</Label>
                <Input value={exp.role} onChange={(e) => handleUpdate(index, 'role', e.target.value)} />
              </div>
              <div className="space-y-2 col-span-1 md:col-span-1">
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
               <div className="space-y-2 col-span-2 sm:col-span-1">
                 <Label>Company Logo</Label>
                 <div className="flex items-center gap-4">
                   <Image src={exp.logo} alt="Company Logo" width={40} height={40} className="rounded-md bg-muted object-cover" />
                   <Button type="button" variant="outline" size="sm" onClick={() => fileInputRefs.current[index]?.click()} disabled={uploadingIndex === index}>
                     {uploadingIndex === index ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
                     {uploadingIndex === index ? 'Uploading...' : 'Upload'}
                   </Button>
                   <input
                     type="file"
                     ref={el => { fileInputRefs.current[index] = el; }}
                     onChange={(e) => handleFileChange(e, index)}
                     className="hidden"
                     accept="image/*"
                   />
                 </div>
               </div>
              <div className="space-y-2 col-span-2 sm:col-span-1">
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
