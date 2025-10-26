
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useFirebase } from '@/firebase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const { toast } = useToast();
    const auth = useAuth();
    const { firestore } = useFirebase();
    const { user, isUserLoading } = useUser();

    useEffect(() => {
        // If user is already logged in, redirect to admin
        if (!isUserLoading && user) {
            router.replace('/admin');
        }
    }, [user, isUserLoading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            toast({
                title: 'Missing Fields',
                description: 'Please enter both email and password.',
                variant: 'destructive'
            });
            setIsLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                toast({
                    title: 'Login Successful',
                    description: 'Welcome back!',
                });
                router.push('/admin');
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const newUser = userCredential.user;
                await updateProfile(newUser, { displayName: email.split('@')[0] });
                
                // Create user profile in Firestore
                if (firestore) {
                  const userDocRef = doc(firestore, "users", newUser.uid);
                  await setDoc(userDocRef, {
                    uid: newUser.uid,
                    email: newUser.email,
                    displayName: newUser.email.split('@')[0],
                    createdAt: new Date()
                  });
                }
                
                toast({
                    title: 'Account Created',
                    description: 'You have been successfully registered and logged in.',
                });
                router.push('/admin');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            toast({
                title: isLogin ? 'Login Failed' : 'Sign Up Failed',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
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
                        <CardTitle className="text-2xl">{isLogin ? 'Admin Login' : 'Create Account'}</CardTitle>
                    </div>
                    <CardDescription>Enter your credentials below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                     <p className="text-sm text-muted-foreground">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="px-1">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </Button>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
