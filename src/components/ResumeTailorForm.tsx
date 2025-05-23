
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resumeTailor, type ResumeTailorInput, type ResumeTailorOutput } from '@/ai/flows/resume-tailor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileText, Sparkles, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  resumeFile: z.any().refine(fileList => fileList && fileList.length === 1, 'Resume file is required.'),
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
});

type FormValues = z.infer<typeof FormSchema>;

export function ResumeTailorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    setError(null);

    try {
      const resumeDataUrl = await readFileAsDataURL(data.resumeFile[0]);
      const input: ResumeTailorInput = {
        resume: resumeDataUrl,
        jobDescription: data.jobDescription,
      };
      
      const result: ResumeTailorOutput = await resumeTailor(input);
      setSuggestions(result.suggestions);
      toast({
        title: "Suggestions Generated!",
        description: "AI has provided tailored suggestions for your resume.",
      });
      reset(); 
    } catch (err) {
      console.error("Error tailoring resume:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to get suggestions: ${errorMessage}`);
      toast({
        title: "Error",
        description: `Failed to get suggestions: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group rounded-lg p-0.5 hover:bg-gradient-to-br hover:from-primary hover:via-accent hover:to-secondary transition-all duration-300 ease-in-out transform motion-safe:group-hover:scale-[1.02] shadow-lg hover:shadow-xl">
      <Card className="bg-card rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-semibold">AI Resume Tailor</CardTitle>
          </div>
          <CardDescription>
            Upload your resume and paste a job description to get AI-powered suggestions on how to tailor your portfolio content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="resumeFile" className="flex items-center gap-2 mb-2 text-sm font-medium">
                <Upload className="h-4 w-4" /> Your Resume (PDF, DOCX)
              </Label>
              <Input
                id="resumeFile"
                type="file"
                accept=".pdf,.doc,.docx"
                {...register('resumeFile')}
                className={errors.resumeFile ? 'border-destructive' : ''}
              />
              {errors.resumeFile && <p className="text-sm text-destructive mt-1">{errors.resumeFile.message as string}</p>}
            </div>

            <div>
              <Label htmlFor="jobDescription" className="flex items-center gap-2 mb-2 text-sm font-medium">
                <FileText className="h-4 w-4" /> Job Description
              </Label>
              <Textarea
                id="jobDescription"
                rows={8}
                placeholder="Paste the job description here..."
                {...register('jobDescription')}
                className={errors.jobDescription ? 'border-destructive' : ''}
              />
              {errors.jobDescription && <p className="text-sm text-destructive mt-1">{errors.jobDescription.message}</p>}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transform transition-transform hover:scale-105">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Suggestions...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Get AI Suggestions
                </>
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {suggestions && (
            <div className="mt-8 p-6 border rounded-md bg-secondary">
              <h3 className="text-xl font-semibold mb-3 text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Tailored Suggestions:
              </h3>
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
                {suggestions}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
