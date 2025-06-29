import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 md:px-6">
        <p className="text-sm">
          © {currentYear} Alan Barret. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
