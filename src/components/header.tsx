"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code2 } from 'lucide-react';

const navLinks = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#ai-generator', label: 'AI' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-sm border-b' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <Code2 className="h-6 w-6 text-primary" />
          <span>Alan Barret</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild>
            <a href="/alan-barret-cv.pdf" download>Download CV</a>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg" onClick={closeSheet}>
                  <Code2 className="h-6 w-6 text-primary" />
                  <span>Alan Barret</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="hover:text-primary transition-colors" onClick={closeSheet}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild>
                  <a href="/alan-barret-cv.pdf" download>Download CV</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
