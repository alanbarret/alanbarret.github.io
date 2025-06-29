import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    role: "AI Developer",
    company: "Araby.ai",
    duration: "Dec 2021 - Present",
    description: "Led the development of cutting-edge AI solutions, including financial analysis with TradeGPT and automated content generation. Specialized in applying NLP and machine learning models to solve complex business problems.",
    logo: "https://placehold.co/100x100.png",
    logoHint: "AI technology",
    tags: ["AI/ML", "NLP", "Python", "OpenAI API", "LLMs"],
  },
  {
    role: "Technical Support Engineer",
    company: "Technowave Group",
    duration: "Sep 2018 - May 2020",
    description: "Provided expert technical support for ID card printers, RFID tracking systems, and barcode printers. Proficient in installation, maintenance, and troubleshooting to ensure optimal operational efficiency and customer satisfaction.",
    logo: "https://placehold.co/100x100.png",
    logoHint: "technology solutions",
    tags: ["Technical Support", "RFID", "Hardware Troubleshooting", "Customer Service"],
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
