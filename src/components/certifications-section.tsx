import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

const certifications = [
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2023",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2022",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "The Linux Foundation",
    year: "2022",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera & deeplearning.ai",
    year: "2021",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          Certifications
        </h2>
        <Card className="max-w-3xl mx-auto shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Award className="h-6 w-6 text-primary" />
              <span>My Credentials</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-3 rounded-md hover:bg-muted">
                  <div>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Badge variant="secondary">{cert.year}</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
