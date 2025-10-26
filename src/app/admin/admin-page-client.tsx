
'use client';
import { useState, useEffect } from 'react';
import AdminForm from './admin-form';
import type { RawPortfolioData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/firebase';
import { usePortfolioData } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function AdminPageClient() {
    const { user, isUserLoading } = useUser();
    const { data: initialData, isLoading: isDataLoading } = usePortfolioData();
    const router = useRouter();

    useEffect(() => {
        // Redirect to login if auth check is done and there's no user
        if (!isUserLoading && !user) {
            router.replace('/login');
        }
    }, [user, isUserLoading, router]);

    // Show loading skeleton only while checking authentication
    if (isUserLoading) {
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
    
    // Once auth is checked, if there's a user, show the form.
    // The form itself can handle the case where initialData is loading or null.
    if (user) {
         // Pass the potentially null initialData to the form
        return <AdminForm initialData={initialData} />;
    }

    // If no user and not loading, it's about to redirect, so show nothing or a minimal loader.
    return null;
}
