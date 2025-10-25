
'use client';
import { useState, useEffect } from 'react';
import AdminForm from './admin-form';
import type { RawPortfolioData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';
import { usePortfolioData } from '@/lib/data';

export default function AdminPageClient() {
    const { user, isUserLoading } = useUser();
    const { data: initialData, isLoading: isDataLoading } = usePortfolioData();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // We consider the user authenticated if the Firebase user object exists.
        if (!isUserLoading) {
            setIsAuthenticated(!!user);
        }
    }, [user, isUserLoading]);

    if (isUserLoading || isDataLoading || !isAuthenticated) {
        return (
            <div className="container mx-auto py-10">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-1/3" />
                    <Skeleton className="h-8 w-1/2" />
                    <div className="mt-8 space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {initialData ? (
                <AdminForm initialData={initialData} />
            ) : (
                 <div className="container mx-auto py-10">
                    <div className="text-center">
                        <p>Could not load portfolio data. Please try again later.</p>
                    </div>
                </div>
            )}
        </>
    );
}
