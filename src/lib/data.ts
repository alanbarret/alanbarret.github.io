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
import { Bot, Cpu, Database, Cloud, Code, LinkIcon, Eye } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export const heroData = {
  badge: "Alan Barret",
  headline: "AI Developer",
  description: "Dedicated AI Developer creating intelligent solutions with expertise in machine learning, natural language processing, and computer vision.",
  tags: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Python"],
};

export const experiencesData = [
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

export const projectsData = [
  {
    name: "TradeGPT: AI Financial Analyst",
    description: "An AI-powered platform for financial analysis, cryptocurrency market understanding, and real-time predictive analytics using OpenAI's assistant APIs.",
    image: "https://placehold.co/600x400.png",
    imageHint: "financial charts graphs",
    tags: ["AI", "Predictive Analytics", "OpenAI", "Python", "Crypto"],
    github: "https://github.com/fallanangel2305/TradeGPT",
    demo: "#",
  },
  {
    name: "AI Website Generator",
    description: "A tool that automates web development using AI. It processes user input to generate and structure JSON for website content, integrating OpenAI for content creation.",
    image: "https://placehold.co/600x400.png",
    imageHint: "website builder interface",
    tags: ["AI", "Web Development", "JSON", "OpenAI", "Automation"],
    github: "https://github.com/fallanangel2305/AI-Website-Generator",
    demo: "#",
  },
  {
    name: "Health Kingdom: AI Telemedicine",
    description: "A digital healthcare platform utilizing embedded systems and AI for real-time diagnostics. Integrated sensor data with machine learning models for preliminary analysis.",
    image: "https://placehold.co/600x400.png",
    imageHint: "telemedicine doctor patient",
    tags: ["Embedded Systems", "IoT", "AI", "Python", "Computer Vision"],
    github: "https://github.com/fallanangel2305/Health-Kingdom-AI-Telemedicine-and-Embedded-System",
    demo: "#",
  },
  {
    name: "NFT-Plus.me Marketplace",
    description: "A decentralized NFT marketplace on the Solana blockchain, integrating the Metaplex framework. Features auction systems for NFTs and other digital assets.",
    image: "https://placehold.co/600x400.png",
    imageHint: "nft marketplace art",
    tags: ["Blockchain", "Solana", "NFT", "Metaplex", "dApps"],
    github: "https://github.com/fallanangel2305/NFT-Plus.me-Marketplace-for-Digital-Collectibles",
    demo: "#",
  },
];

type Skill = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type SkillCategory = { 
  title: string; 
  icon: ComponentType<SVGProps<SVGSVGElement>>, 
  skills: Skill[] 
};

export const skillsData: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: Bot,
    skills: [
      { name: "PyTorch", icon: PyTorchIcon },
      { name: "TensorFlow", icon: TensorFlowIcon },
      { name: "Scikit-learn", icon: ScikitLearnIcon },
      { name: "OpenAI API", icon: Bot },
      { name: "NLP", icon: Bot },
      { name: "LLMs", icon: Bot },
      { name: "LangChain", icon: LinkIcon },
      { name: "Computer Vision", icon: Eye },
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
