import rawPortfolioData from './portfolio-data.json';
import { iconMap } from './icon-map';
import { Code } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

// Keep existing type exports for compatibility with UI components
export type Skill = {
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type SkillCategory = { 
  title: string; 
  icon: ComponentType<SVGProps<SVGSVGElement>>, 
  skills: Skill[] 
};

// Process raw data to inject icon components
const processedSkillsData = rawPortfolioData.skills.map((category) => ({
  ...category,
  icon: iconMap[category.icon] || Code,
  skills: category.skills.map((skill) => ({
    ...skill,
    icon: iconMap[skill.icon] || Code,
  })),
}));

// Export data for public-facing pages
export const heroData = rawPortfolioData.hero;
export const experiencesData = rawPortfolioData.experiences;
export const projectsData = rawPortfolioData.projects;
export const skillsData: SkillCategory[] = processedSkillsData;

// Export raw data for the admin panel
export const portfolioData = rawPortfolioData;
