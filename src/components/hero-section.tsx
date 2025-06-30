
"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroData {
  badge: string;
  headline: string;
  description: string;
  tags: string[];
}

export default function HeroSection({ data }: { data: HeroData }) {
  const { badge, headline, description, tags } = data;
  return (
    <motion.section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge variant="secondary" className="mb-4 font-headline tracking-wider">
          {badge}
        </Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-4 text-primary">
          {headline}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          {description}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {tags.map((tag, i) => (
            <div
              key={tag}
              className="animate-tag-entry opacity-0"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Badge
                variant="default"
                className="text-sm md:text-base px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {tag}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" asChild className="animate-bounce">
            <a href="#experience" aria-label="Scroll to experience">
              <ArrowDown className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
