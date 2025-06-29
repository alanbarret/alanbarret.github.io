import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    name: "TradeGPT: AI Financial Analyst",
    description: "An AI-powered platform for financial analysis, cryptocurrency market understanding, and real-time predictive analytics using OpenAI's assistant APIs.",
    image: "https://placehold.co/600x400.png",
    imageHint: "financial charts graphs",
    tags: ["AI", "Predictive Analytics", "OpenAI", "Python", "Crypto"],
    github: "#",
    demo: "#",
  },
  {
    name: "AI Website Generator",
    description: "A tool that automates web development using AI. It processes user input to generate and structure JSON for website content, integrating OpenAI for content creation.",
    image: "https://placehold.co/600x400.png",
    imageHint: "website builder interface",
    tags: ["AI", "Web Development", "JSON", "OpenAI", "Automation"],
    github: "#",
    demo: "#",
  },
  {
    name: "Health Kingdom: AI Telemedicine",
    description: "A digital healthcare platform utilizing embedded systems and AI for real-time diagnostics. Integrated sensor data with machine learning models for preliminary analysis.",
    image: "https://placehold.co/600x400.png",
    imageHint: "telemedicine doctor patient",
    tags: ["Embedded Systems", "IoT", "AI", "Python", "Computer Vision"],
    github: "#",
    demo: "#",
  },
  {
    name: "NFT-Plus.me Marketplace",
    description: "A decentralized NFT marketplace on the Solana blockchain, integrating the Metaplex framework. Features auction systems for NFTs and other digital assets.",
    image: "https://placehold.co/600x400.png",
    imageHint: "nft marketplace art",
    tags: ["Blockchain", "Solana", "NFT", "Metaplex", "dApps"],
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
