
'use client';
import { useState, useEffect }_from_'react';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import type { RawPortfolioData } from '@/lib/types';

// Initialize Firebase on the client
const { firestore } = initializeFirebase();

const emptyData: RawPortfolioData = {
  hero: { badge: '', headline: '', description: '', tags: [] },
  experiences: [],
  projects: [],
  skills: [],
};

/**
 * Custom hook to subscribe to portfolio data from Firestore.
 */
export function usePortfolioData() {
  const [data, setData] = useState<RawPortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore) {
      setError(new Error("Firestore is not initialized."));
      setIsLoading(false);
      return;
    }
    
    const docRef = doc(firestore, 'portfolio', 'main');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as RawPortfolioData);
      } else {
        // If the document doesn't exist, we can use empty data.
        setData(emptyData);
      }
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching portfolio data:", err);
      setError(err);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
}
