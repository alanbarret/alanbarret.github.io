import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { skillsData } from '@/lib/data';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category) => (
            <Card key={category.title} className="shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center gap-4">
                <category.icon className="h-8 w-8 text-primary" />
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center gap-3 p-1 -m-1 rounded-lg transition-colors hover:bg-secondary">
                      <skill.icon className="h-6 w-6 text-accent" />
                      <span className="text-muted-foreground">{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
