
"use client";

import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { iconMap } from '@/lib/icon-map';
import { Code } from 'lucide-react';
import type { RawSkillCategory, RawSkill } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const Devicon = ({ skill }: { skill: RawSkill }) => {
  const [imgError, setImgError] = useState(false);

  const specialNames: { [key: string]: string } = {
      'node.js': 'nodejs',
      'next.js / react': 'nextjs',
      'next.js': 'nextjs',
      'react': 'react',
      'scikit-learn': 'scikitlearn',
  };

  const deviconName = (specialNames[skill.name.toLowerCase()] || skill.name.toLowerCase())
    .replace(/\./g, 'dot')
    .replace(/\+/g, 'plus');

  const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconName}/${deviconName}-original.svg`;
  
  const FallbackIcon = iconMap[skill.icon] || Code;

  if (imgError) {
    return <FallbackIcon className="h-5 w-5 text-accent-foreground" />;
  }

  return (
    <Image
      src={iconUrl}
      alt={`${skill.name} icon`}
      width={20}
      height={20}
      className="h-5 w-5 text-accent-foreground"
      onError={() => setImgError(true)}
      unoptimized // Required for external SVGs in Next.js export
    />
  );
};


export default function SkillsSection({ data }: { data: RawSkillCategory[] }) {
  return (
    <section id="skills" className="py-20 lg:py-32 overflow-hidden">
      <div className="section-container">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-headline text-center mb-16"
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
          {data.map((category) => {
            const CategoryIcon = iconMap[category.icon] || Code;
            return (
              <motion.div key={category.title} variants={itemVariants}>
                <Card className="shadow-md transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 h-full bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="p-2 bg-accent rounded-lg">
                        <CategoryIcon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-4">
                      {category.skills.map((skill) => {
                        return (
                          <motion.li 
                            key={skill.name} 
                            className="flex items-center gap-3 p-2 -m-1 rounded-lg transition-colors hover:bg-secondary"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Devicon skill={skill} />
                            <span className="text-muted-foreground text-sm">{skill.name}</span>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}



