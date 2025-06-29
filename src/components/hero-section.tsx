import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown } from 'lucide-react';

const techTags = ["Artificial Intelligence", "Blockchain Development", "Embedded Systems", "Full Stack Development"];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge variant="secondary" className="mb-4 font-headline tracking-wider">
          Alan Barret
        </Badge>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter mb-4 text-primary">
          R&D Engineer
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Innovative R&D Engineer skilled in AI, blockchain, embedded systems, and full-stack development, creating impactful solutions that drive industry advancements.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
          {techTags.map((tag, i) => (
            <div
              key={tag}
              className="animate-tag-entry opacity-0"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <Badge
                variant="default"
                className="text-sm md:text-base px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {tag}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" asChild className="animate-bounce">
            <a href="#experience" aria-label="Scroll to experience">
              <ArrowDown className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
