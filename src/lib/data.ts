
'use client';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { initializeFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import type { RawPortfolioData } from '@/lib/types';

// Initialize Firebase on the client
const { firestore } = initializeFirebase();

const emptyData: RawPortfolioData = {
  hero: { badge: '', headline: '', description: '', tags: [] },
  experiences: [],
  projects: [],
  skills: [],
  education: [],
  contact: { email: '', github: '', linkedin: '' },
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
        const portfolioData = docSnap.data() as RawPortfolioData;
        // Ensure education is an array, even if it's missing from Firestore
        if (!portfolioData.education) {
          portfolioData.education = [];
        }
        setData(portfolioData);
      } else {
        // If the document doesn't exist, we can use empty data.
        setData(emptyData);
      }
      setIsLoading(false);
    }, (err) => {
      const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
      });
      
      // Emit the contextual error
      errorEmitter.emit('permission-error', permissionError);
      
      // Also set local error state for UI feedback if needed
      setError(permissionError);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { data, isLoading, error };
}
