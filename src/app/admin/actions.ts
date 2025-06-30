
'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function savePortfolioData(data: object) {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'lib', 'portfolio-data.json');
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
    
    // Revalidate the home page to show the new data
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to save portfolio data:', error);
    return { success: false, error: 'Failed to save data.' };
  }
}
