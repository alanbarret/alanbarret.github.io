
"use client";

import type { ComponentType, SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Prop Types
export type Skill = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
export type SkillCategory = { 
  title: string; 
  icon: ComponentType<SVGProps<SVGSVGElement>>; 
  skills: Skill[]; 
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function SkillsSection({ data }: { data: SkillCategory[] }) {
  return (
    <section id="skills" className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-headline text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <category.icon className="h-8 w-8 text-primary" />
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center gap-3 p-1 -m-1 rounded-lg transition-colors hover:bg-secondary">
                        <skill.icon className="h-6 w-6 text-accent" />
                        <span className="text-muted-foreground">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
