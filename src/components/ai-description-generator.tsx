"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { handleGenerateDescription } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Bot, Loader2 } from "lucide-react";

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required."),
  projectDetails: z.string().min(10, "Please provide more details about your project."),
  desiredTone: z.string().min(1, "Please select a tone."),
  pastExperience: z.string().min(1, "Past experience is required."),
});

type FormValues = z.infer<typeof formSchema>;

const pastExperienceSummary = `
- Senior AI Engineer at Araby.ai: Led development of NLP and computer vision models using PyTorch and TensorFlow. Deployed on Kubernetes/GCP.
- Full Stack Developer at Technowave Group: Built applications with React, Node.js, and PostgreSQL. Managed deployments with Docker on AWS.
- Projects: Real-Time Object Detection (YOLOv8), AI Code Assistant (LLM), Embedded Weather Station (IoT).
`;

export default function AiDescriptionGenerator() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(handleGenerateDescription, {
    projectDescription: "",
    error: "",
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectDetails: "",
      desiredTone: "professional",
      pastExperience: pastExperienceSummary.trim(),
    },
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, toast]);

  useEffect(() => {
    if (state.projectDescription) {
      form.setValue("projectDetails", state.projectDescription);
    }
  }, [state.projectDescription, form]);
  
  // A simple pending state check based on form submission status
  const isPending = form.formState.isSubmitting;

  return (
    <section id="ai-generator" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
          AI Project Description Writer
        </h2>
        <Card className="max-w-4xl mx-auto shadow-lg">
          <Form {...form}>
            <form action={formAction}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bot className="h-6 w-6 text-primary" />
                  <span>Generate a Project Description</span>
                </CardTitle>
                <CardDescription>
                  Use AI to craft the perfect description for your next project. Fill in the details, select a tone, and let the AI work its magic based on my experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'Smart Shopping Assistant'" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="desiredTone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual & Fun</SelectItem>
                            <SelectItem value="technical">Highly Technical</SelectItem>
                            <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pastExperience"
                    render={({ field }) => (
                      <FormItem className="hidden">
                        <FormLabel>My Past Experience (Context for AI)</FormLabel>
                        <FormControl>
                          <Textarea rows={6} {...field} readOnly/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Project Details / Generated Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your project's features and technologies. The AI will refine this, or write a new description if left blank."
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : "Generate with AI"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
