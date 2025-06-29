import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  PythonIcon,
  ReactIcon,
  PyTorchIcon,
  ScikitLearnIcon,
  TensorFlowIcon,
  NextJsIcon,
  DockerIcon,
  KubernetesIcon
} from '@/components/icons';
import { Bot, Cpu, Database, Cloud, Code, LinkIcon } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

type Skill = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const skillCategories: { title: string; icon: ComponentType<SVGProps<SVGSVGElement>>, skills: Skill[] }[] = [
  {
    title: "AI & Machine Learning",
    icon: Bot,
    skills: [
      { name: "PyTorch", icon: PyTorchIcon },
      { name: "TensorFlow", icon: TensorFlowIcon },
      { name: "Scikit-learn", icon: ScikitLearnIcon },
      { name: "OpenAI API", icon: Bot },
      { name: "NLP", icon: Bot },
      { name: "Mistral-7B", icon: Bot },
    ]
  },
  {
    title: "Frontend Development",
    icon: Code,
    skills: [
      { name: "React", icon: ReactIcon },
      { name: "Next.js", icon: NextJsIcon },
      { name: "HTML5 & CSS3", icon: Code },
      { name: "TypeScript", icon: Code },
    ]
  },
  {
    title: "Backend & Databases",
    icon: Database,
    skills: [
      { name: "Python", icon: PythonIcon },
      { name: "Node.js", icon: Code },
      { name: "Flask", icon: Code },
      { name: "Firebase", icon: Cloud },
    ]
  },
   {
    title: "Blockchain & Web3",
    icon: LinkIcon,
    skills: [
      { name: "Solana", icon: Code },
      { name: "Metaplex", icon: Code },
      { name: "NFTs", icon: Code },
      { name: "Smart Contracts", icon: Code },
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    skills: [
      { name: "Docker", icon: DockerIcon },
      { name: "Kubernetes", icon: KubernetesIcon },
      { name: "GCP", icon: Cloud },
      { name: "AWS", icon: Cloud },
    ]
  },
  {
    title: "Embedded Systems",
    icon: Cpu,
    skills: [
      { name: "C/C++", icon: Code },
      { name: "Linux", icon: Code },
      { name: "Raspberry Pi", icon: Cpu },
      { name: "IoT", icon: Cpu },
    ]
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-3">
                      <skill.icon className="h-6 w-6 text-accent" />
                      <span className="text-muted-foreground">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
