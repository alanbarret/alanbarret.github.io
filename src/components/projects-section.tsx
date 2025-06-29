import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    name: "Real-Time Object Detection",
    description: "A high-performance object detection system using YOLOv8, capable of real-time processing on edge devices.",
    image: "https://placehold.co/600x400.png",
    imageHint: "object detection",
    tags: ["Python", "PyTorch", "YOLOv8", "OpenCV"],
    github: "#",
    demo: "#",
  },
  {
    name: "AI-Powered Code Assistant",
    description: "A VS Code extension that provides intelligent code suggestions and auto-completion using a fine-tuned language model.",
    image: "https://placehold.co/600x400.png",
    imageHint: "code assistant",
    tags: ["TypeScript", "LLM", "Next.js", "AI"],
    github: "#",
    demo: "#",
  },
  {
    name: "Portfolio Website",
    description: "My personal portfolio website built with Next.js, Tailwind CSS, and featuring a GenAI-powered description generator.",
    image: "https://placehold.co/600x400.png",
    imageHint: "developer portfolio",
    tags: ["Next.js", "React", "Tailwind CSS", "GenAI"],
    github: "#",
    demo: "#",
  },
  {
    name: "Embedded Weather Station",
    description: "An IoT weather station built with Raspberry Pi and various sensors, sending real-time data to a cloud dashboard.",
    image: "https://placehold.co/600x400.png",
    imageHint: "weather station",
    tags: ["Python", "Raspberry Pi", "IoT", "Firebase"],
    github: "#",
    demo: "#",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.name} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  data-ai-hint={project.imageHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-bold mb-2">{project.name}</CardTitle>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                <Button asChild variant="outline">
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github />
                    GitHub
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    Live Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
