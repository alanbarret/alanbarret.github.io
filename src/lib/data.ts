
import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import type { RawPortfolioData } from '@/lib/types';


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
 * Fetches portfolio data.
 * The components are responsible for interpreting the data (e.g. icon strings).
 * This data is serializable and safe to pass from Server to Client Components.
 */
export async function getPortfolioData(): Promise<RawPortfolioData> {
  return getRawPortfolioData();
}

/**
 * Fetches the raw, unprocessed portfolio data, suitable for initializing the admin panel.
 */
export async function getRawDataForAdmin(): Promise<RawPortfolioData> {
  return getRawPortfolioData();
}
