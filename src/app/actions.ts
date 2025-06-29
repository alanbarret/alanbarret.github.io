"use server";

import { generateProjectDescription, type GenerateProjectDescriptionInput } from "@/ai/flows/generate-project-description";
import { z } from "zod";

const formSchema = z.object({
  projectName: z.string(),
  projectDetails: z.string(),
  desiredTone: z.string(),
  pastExperience: z.string(),
});

type State = {
  projectDescription: string;
  error: string;
};

export async function handleGenerateDescription(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedFields = formSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        ...prevState,
        error: "Invalid form data. Please check your inputs.",
      };
    }

    const input: GenerateProjectDescriptionInput = validatedFields.data;

    const result = await generateProjectDescription(input);

    if (result && result.projectDescription) {
      return {
        projectDescription: result.projectDescription,
        error: "",
      };
    } else {
      throw new Error("The AI did not return a description.");
    }
  } catch (error) {
    console.error("Error generating project description:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      ...prevState,
      error: `Failed to generate description: ${errorMessage}`,
    };
  }
}
