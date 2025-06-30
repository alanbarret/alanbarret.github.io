
"use client";

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
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
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-headline text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h2>
        <motion.div 
          className="relative max-w-3xl mx-auto pl-8"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          {data.map((exp, index) => (
            <motion.div key={index} className="relative mb-12" variants={itemVariants}>
              <div className="absolute left-[-8px] top-1.5 h-4 w-4 rounded-full bg-primary ring-8 ring-background z-10"></div>
              <div className="absolute left-[-8px] top-1.5 h-4 w-4 rounded-full bg-primary animate-pulse-ring"></div>
              <Card className="ml-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
