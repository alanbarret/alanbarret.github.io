
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
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center aurora-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container z-10 mx-auto px-4 md:px-6 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Badge variant="secondary" className="mb-4 text-sm font-headline tracking-wider bg-primary/10 text-primary border border-primary/20">
              {badge}
            </Badge>
        </motion.div>
        
        <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-400 to-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
          {headline}
        </motion.h1>

        <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {tags.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="text-sm md:text-base px-4 py-2 bg-background/10 backdrop-blur-sm border-border hover:bg-background/20"
              >
                {tag}
              </Badge>
            </motion.div>
          ))}
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center"
        >
          <Button variant="ghost" size="icon" asChild className="animate-bounce mt-8">
            <a href="#experience" aria-label="Scroll to experience">
              <ArrowDown className="h-6 w-6" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
