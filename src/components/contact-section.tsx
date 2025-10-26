
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send } from 'lucide-react';
import type { RawContact } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";


export default function ContactSection({ data }: { data: RawContact | null }) {
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.email) {
       toast({
        title: "Error",
        description: "Recipient email is not configured.",
        variant: "destructive",
      });
      return;
    }

    const subject = encodeURIComponent(`New message from ${name} via your portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`);
    
    // This will open the user's default email client
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;

    toast({
        title: "Ready to Send!",
        description: "Your email client has been opened to send the message.",
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-32">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-4">
          Contact Me
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.
        </p>

        <Card className="max-w-2xl mx-auto shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Your message will be sent directly to my inbox.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input 
                                id="name" 
                                type="text"
                                placeholder="John Doe" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input 
                                id="email" 
                                type="email"
                                placeholder="john@example.com" 
                                value={senderEmail}
                                onChange={(e) => setSenderEmail(e.target.value)}
                                required 
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                            id="message" 
                            placeholder="Your message here..." 
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-right">
                        <Button type="submit">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
