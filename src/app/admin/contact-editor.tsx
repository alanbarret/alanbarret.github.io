
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactData {
  email: string;
  github: string;
  linkedin: string;
}

interface ContactEditorProps {
  data: ContactData;
  setData: React.Dispatch<React.SetStateAction<ContactData>>;
}

export default function ContactEditor({ data, setData }: ContactEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-github">GitHub URL</Label>
          <Input
            id="contact-github"
            type="url"
            value={data.github}
            onChange={(e) => setData({ ...data, github: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-linkedin">LinkedIn URL</Label>
          <Input
            id="contact-linkedin"
            type="url"
            value={data.linkedin}
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
