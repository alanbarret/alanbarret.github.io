
'use client';
import { usePortfolioData } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone, Linkedin, Github, ExternalLink, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ResumeSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold font-headline text-primary border-b-2 border-primary pb-2 mb-4">
      {title}
    </h2>
    <div className="space-y-6">
      {children}
    </div>
  </section>
);

export default function ResumePage() {
  const { data, isLoading } = usePortfolioData();

  if (isLoading || !data) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 bg-background print:bg-white text-foreground print:text-black">
        <div className="space-y-8">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    )
  }

  const { hero, experiences, projects, skills, education, contact } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12 bg-background print:bg-white text-foreground print:text-black font-body">
      <div className="flex justify-between items-center mb-10 no-print">
          <h1 className="text-4xl font-bold font-headline">Resume</h1>
           <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print to PDF
          </Button>
      </div>
      
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold font-headline">Alan Barret</h1>
        <p className="text-xl text-muted-foreground print:text-gray-600 mt-2">{hero.badge}</p>
        <div className="flex justify-center items-center gap-6 mt-4 text-muted-foreground print:text-gray-600 text-sm">
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4" />
            {contact.email}
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </header>

      <ResumeSection title="Summary">
        <p className="text-base leading-relaxed">{hero.description}</p>
      </ResumeSection>

      {education && education.length > 0 && (
          <ResumeSection title="Education">
              {education.map((edu, index) => (
                  <div key={index}>
                      <div className="flex justify-between items-baseline">
                          <h3 className="text-lg font-bold">{edu.degree}</h3>
                          <span className="text-sm text-muted-foreground print:text-gray-500">{edu.duration}</span>
                      </div>
                      <p className="text-md font-semibold text-primary mb-2">{edu.institution}</p>
                      {edu.description && <p className="text-base text-muted-foreground print:text-gray-700 leading-relaxed">{edu.description}</p>}
                  </div>
              ))}
          </ResumeSection>
      )}

      <ResumeSection title="Professional Experience">
        {experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-bold">{exp.role}</h3>
              <span className="text-sm text-muted-foreground print:text-gray-500">{exp.duration}</span>
            </div>
            <p className="text-md font-semibold text-primary mb-2">{exp.company}</p>
            <p className="text-base text-muted-foreground print:text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Featured Projects">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="flex items-center gap-4 mb-1">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <div className="flex items-center gap-3">
                {project.github && project.github !== '#' && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:text-primary text-muted-foreground print:text-gray-600">
                    <Github className="h-4 w-4" /> Source
                  </a>
                )}
                {project.demo && project.demo !== '#' && (
                   <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:text-primary text-muted-foreground print:text-gray-600">
                     <ExternalLink className="h-4 w-4" /> Demo
                   </a>
                )}
              </div>
            </div>
            <p className="text-base text-muted-foreground print:text-gray-700 leading-relaxed">{project.description}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Technical Skills">
        <div className="space-y-3">
          {skills.map((category) => (
            <div key={category.title} className="flex items-start">
              <h4 className="font-bold w-40 shrink-0">{category.title}:</h4>
              <p className="text-muted-foreground print:text-gray-700">
                {category.skills.map(skill => skill.name).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </ResumeSection>
    </div>
  );
}
