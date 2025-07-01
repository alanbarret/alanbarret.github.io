
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  image: string;
  imageHint: string;
  tags: string[];
  github: string;
  demo: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
};


export default function ProjectsSection({ data }: { data: Project[] }) {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-secondary/30 overflow-hidden">
      <div className="section-container">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-headline text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.map((project) => (
            <motion.div key={project.name} variants={itemVariants} className="h-full">
              <Card className="overflow-hidden shadow-md transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 group flex flex-col h-full bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-0 border-b aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="text-xl font-bold mb-2">{project.name}</CardTitle>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center gap-4">
                  {project.github && project.github !== '#' && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github />
                        Source
                      </Link>
                    </Button>
                  )}
                  {project.demo && project.demo !== '#' && (
                    <Button asChild size="sm">
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
