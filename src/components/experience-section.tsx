
"use client";

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  logo: string;
  logoHint: string;
  tags: string[];
}

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ExperienceSection({ data }: { data: Experience[] }) {
  return (
    <section id="experience" className="py-20 lg:py-32 overflow-hidden">
      <div className="section-container">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-headline text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>
        <motion.div 
          className="relative max-w-3xl mx-auto"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
          {data.map((exp, index) => (
            <motion.div key={index} className="relative pl-12 mb-12" variants={itemVariants}>
              <div className="absolute left-4 top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background -translate-x-1/2 z-10 animate-pulse-dot"></div>
              <div className="absolute left-4 top-1 h-4 w-4 rounded-full bg-primary/50 -translate-x-1/2 animate-pulse-ring"></div>
              <Card className="shadow-md transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-start gap-4">
                      <Image 
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          width={40}
                          height={40}
                          className="rounded-lg bg-muted object-cover mt-1"
                          data-ai-hint={exp.logoHint}
                      />
                      <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-y-1 mb-1">
                            <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                            <Badge variant="outline" className="w-fit text-sm">{exp.duration}</Badge>
                          </div>
                          <CardDescription className="text-lg font-semibold text-primary">{exp.company}</CardDescription>
                      </div>
                  </div>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
