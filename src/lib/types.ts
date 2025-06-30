export interface RawSkill {
  name: string;
  icon: string;
}

export interface RawSkillCategory {
  title: string;
  icon: string;
  skills: RawSkill[];
}

export interface RawProject {
  name: string;
  description: string;
  image: string;
  imageHint: string;
  tags: string[];
  github: string;
  demo: string;
}

export interface RawExperience {
  role: string;
  company: string;
  duration: string;
  description: string;
  logo: string;
  logoHint: string;
  tags: string[];
}

export interface RawHero {
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
