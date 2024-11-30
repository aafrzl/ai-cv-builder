import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useGenerateAI from "@/features/ai/use-generate-ai";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import { useState } from "react";

interface Props {
  handleNext: () => void;
}

type ReponseGenerateSummary = {
  experienceLevel: string;
  summary: string;
};

interface GeneratesSummaryType {
  data: ReponseGenerateSummary[];
}

export default function SummaryForm({ handleNext }: Props) {
  const [aiGenerateSummary, setAiGenerateSummary] =
    useState<GeneratesSummaryType | null>(null);

  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutate: generateAI, isPending: isPendingGenerate } = useGenerateAI();

  const { mutateAsync, isPending } = useUpdateDocument();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedResumeInfo = {
      ...resumeDataInfo,
      summary: value,
    };

    onUpdate(updatedResumeInfo);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeInfo) return;

    const thumbnail = resumeInfo?.thumbnail;
    const currentNo = resumeInfo?.currentPosition
      ? resumeInfo?.currentPosition + 1
      : 1;

    await mutateAsync(
      {
        currentPosition: currentNo,
        thumbnail,
        summary: resumeInfo?.summary,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success to save summary",
            description: "Summary has been saved successfully",
          });
          handleNext();
        },
        onError: () => {
          toast({
            title: "Failed to save summary",
            description: "Failed to save summary to database",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleSelectSuggestion = (summary: string) => {
    const resumeDataInfo = resumeInfo as ResumeDataType;
    if (!resumeDataInfo) return;

    const updatedResumeInfo = {
      ...resumeDataInfo,
      summary,
    };

    onUpdate(updatedResumeInfo);
  };

  const handleGenerateSummary = () => {
    try {
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;
      if (!jobTitle) {
        throw new Error("Job title required to generate summary with AI");
      }

      generateAI(
        {
          prompt: jobTitle,
          type: "summary",
        },
        {
          onSuccess: ({ data }) => {
            setAiGenerateSummary(JSON.parse(data));
          },
        }
      );
    } catch (error) {
      toast({
        title: "Failed to generate summary",
        description: "Failed to generate summary with AI",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4">
      <form
        className="space-x-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-end justify-between">
          <Label>Add Summary</Label>
          <Button
            type="button"
            variant={"outline"}
            className="gap-2 text-violet-500"
            size={"sm"}
            onClick={handleGenerateSummary}
            disabled={isPendingGenerate || resumeInfo?.status === "archived"}
          >
            {isPendingGenerate ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            <span>
              {isPendingGenerate ? "Generating..." : "Generate with AI"}
            </span>
          </Button>
        </div>

        <Textarea
          value={resumeInfo?.summary || ""}
          placeholder="Write a summary about yourself..."
          onChange={handleChange}
          className="w-full mt-5 min-h-36"
          required
        />

        {aiGenerateSummary && (
          <div className="space-x-2">
            <h5 className="font-bold text-base my-4">Suggestion from AI</h5>
            {aiGenerateSummary.data.map((item, index) => (
              <Card
                role="button"
                key={index}
                className={cn(
                  "my-4 bg-primary/5 shadow-none hover:border-primary transition",
                  resumeInfo?.summary === item.summary &&
                    "border-primary bg-white"
                )}
                onClick={() => handleSelectSuggestion(item.summary)}
              >
                <CardHeader className="py-2">
                  <CardTitle className="font-semibold text-base">
                    {item.experienceLevel.charAt(0).toUpperCase() +
                      item.experienceLevel.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm !pb-2">
                  <p className="text-sm leading-2 text-justify">
                    {item.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Button
          className="mt-4"
          type="submit"
          disabled={isPending || resumeInfo?.status === "archived"}
        >
          {isPending && <Loader className="mr-2 animate-spin" />}
          <span>Save Changes</span>
        </Button>
      </form>
    </div>
  );
}
