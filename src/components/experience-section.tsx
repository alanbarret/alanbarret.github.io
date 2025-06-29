import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    role: "Senior AI Engineer",
    company: "Araby.ai",
    duration: "Jan 2022 - Present",
    description: "Led the development of NLP and computer vision models for flagship products. Optimized deployment pipelines, resulting in a 40% reduction in inference time. Mentored junior engineers and contributed to the company's open-source initiatives.",
    logo: "https://placehold.co/100x100.png",
    logoHint: "AI technology",
    tags: ["PyTorch", "TensorFlow", "Kubernetes", "GCP", "LLMs"],
  },
  {
    role: "Full Stack Developer",
    company: "Technowave Group",
    duration: "Jun 2019 - Dec 2021",
    description: "Developed and maintained full-stack applications for enterprise clients using React and Node.js. Built and integrated RESTful APIs, managed databases, and ensured application scalability and security.",
    logo: "https://placehold.co/100x100.png",
    logoHint: "software development",
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "AWS"],
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Professional Experience
        </h2>
        <div className="relative max-w-3xl mx-auto pl-8">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-12">
              <div className="absolute left-[-8px] top-1.5 h-4 w-4 rounded-full bg-primary ring-8 ring-background"></div>
              <Card className="ml-8 shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                    <Badge variant="outline" className="w-fit">{exp.duration}</Badge>
                  </div>
                  <CardDescription className="text-lg font-semibold text-primary">{exp.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
