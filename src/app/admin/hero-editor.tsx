"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

interface HeroData {
  badge: string;
  headline: string;
  description: string;
  tags: string[];
}

interface HeroEditorProps {
  data: HeroData;
  setData: React.Dispatch<React.SetStateAction<HeroData>>;
}

export default function HeroEditor({ data, setData }: HeroEditorProps) {
  const [newTag, setNewTag] = useState("");

  const handleTagAdd = () => {
    if (newTag && !data.tags.includes(newTag)) {
      setData({ ...data, tags: [...data.tags, newTag] });
      setNewTag("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setData({ ...data, tags: data.tags.filter((tag) => tag !== tagToRemove) });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="hero-badge">Badge</Label>
          <Input
            id="hero-badge"
            value={data.badge}
            onChange={(e) => setData({ ...data, badge: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-headline">Headline</Label>
          <Input
            id="hero-headline"
            value={data.headline}
            onChange={(e) => setData({ ...data, headline: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-description">Description</Label>
          <Textarea
            id="hero-description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={4}
          />
        </div>
        <div className="space-y-4">
          <Label>Tech Tags</Label>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button onClick={() => handleTagRemove(tag)} className="rounded-full hover:bg-muted-foreground/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a new tag"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleTagAdd(); }}}
            />
            <Button onClick={handleTagAdd}>Add Tag</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
