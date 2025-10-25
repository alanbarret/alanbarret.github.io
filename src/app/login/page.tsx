
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    const auth = useAuth();
    const { user, isUserLoading } = useUser();

    useEffect(() => {
        // If user is already logged in, redirect to admin
        if (!isUserLoading && user) {
            router.replace('/admin');
        }
    }, [user, isUserLoading, router]);


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signInAnonymously(auth);
            toast({
                title: 'Login Successful',
                description: 'Welcome to the admin panel!',
            });
            router.push('/admin');
        } catch (error) {
             const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            toast({
                title: 'Login Failed',
                description: `Could not sign in anonymously. ${errorMessage}`,
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    if (isUserLoading || user) {
        // Show a loading state or nothing while redirecting
        return (
             <div className="flex min-h-screen items-center justify-center bg-secondary/30">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary/30">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <BrainCircuit className="h-8 w-8 text-primary" />
                        <CardTitle className="text-2xl">Admin Login</CardTitle>
                    </div>
                    <CardDescription>Click below to sign in and manage your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In Anonymously'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
