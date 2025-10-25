
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminForm from './admin-form';
import { getRawDataForAdmin } from '@/lib/data';
import type { RawPortfolioData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const authStatus = localStorage.getItem('portfolio-admin-auth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        } else {
            router.replace('/login');
        }
    }, [router]);

    if (isAuthenticated === null) {
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

    return <>{children}</>;
}


export default function AdminPage() {
    const [initialData, setInitialData] = useState<RawPortfolioData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const data = await getRawDataForAdmin();
            setInitialData(data);
            setIsLoading(false);
        }
        loadData();
    }, []);

    return (
        <AdminAuthWrapper>
            {isLoading || !initialData ? (
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
            ) : (
                <AdminForm initialData={initialData} />
            )}
        </AdminAuthWrapper>
    );
}

