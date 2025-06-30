
import 'server-only';
import fs from 'fs/promises';
import path from 'path';

import type { ComponentType, SVGProps } from 'react';
import { Code } from 'lucide-react';
import { iconMap } from './icon-map';

// Raw data types from JSON file
interface RawSkill {
  name: string;
  icon: string;
}
interface RawSkillCategory {
  title: string;
  icon: string;
  skills: RawSkill[];
}
interface RawProject {
  name: string;
  description: string;
  image: string;
  imageHint: string;
  tags: string[];
  github: string;
  demo: string;
}
interface RawExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
  logo: string;
  logoHint: string;
  tags: string[];
}
interface RawHero {
  badge: string;
  headline: string;
  description: string;
  tags: string[];
}
export interface RawPortfolioData {
  hero: RawHero;
  experiences: RawExperience[];
  projects: RawProject[];
  skills: RawSkillCategory[];
}

// Processed data types with React Icon components
export type Skill = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type SkillCategory = {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  skills: Skill[];
};

export interface PortfolioData {
  hero: RawHero;
  experiences: RawExperience[];
  projects: RawProject[];
  skills: SkillCategory[];
}

const dataPath = path.join(process.cwd(), 'src', 'lib', 'portfolio-data.json');

async function getRawPortfolioData(): Promise<RawPortfolioData> {
  try {
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    // Return a default/empty structure if the file is missing or corrupt
    return {
      hero: { badge: '', headline: '', description: '', tags: [] },
      experiences: [],
      projects: [],
      skills: [],
    };
  }
}

/**
 * Fetches and processes portfolio data for display on the public-facing site.
 * It replaces string icon identifiers with actual React components.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const rawData = await getRawPortfolioData();

  const processedSkillsData = rawData.skills.map((category) => ({
    ...category,
    icon: iconMap[category.icon] || Code,
    skills: category.skills.map((skill) => ({
      ...skill,
      icon: iconMap[skill.icon] || Code,
    })),
  }));

  return {
    hero: rawData.hero,
    experiences: rawData.experiences,
    projects: rawData.projects,
    skills: processedSkillsData,
  };
}

/**
 * Fetches the raw, unprocessed portfolio data, suitable for initializing the admin panel.
 */
export async function getRawDataForAdmin(): Promise<RawPortfolioData> {
  return await getRawPortfolioData();
}
