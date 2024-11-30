"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useResumeContext } from "@/context/resume-info-provider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import PersonalInfoForm from "./forms/personal-info-form";
import SummaryForm from "./forms/summary-form";
import EducationForm from "./forms/education-form";

const LISTTITLE = [
  {
    title: "Personal Information",
    description: "Get started by telling us a bit about yourself.",
  },
  {
    title: "Summary",
    description:
      "Tell us a bit about your professional background. You can also generate a summary with our AI feature.",
  },
  {
    title: "Professional Experience",
    description:
      "Add your professional experience. You can also generate description professional experience with our AI feature.",
  },
  {
    title: "Education",
    description: "Add your educational background.",
  },
  {
    title: "Skills",
    description: "Add your skills.",
  },
];

export default function ResumeForm() {
  const { resumeInfo } = useResumeContext();
  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    const newIndex = activeIndex + 1;
    setActiveIndex(newIndex);
  };

  return (
    <div className="flex-1 w-full lg:sticky lg:top-20">
      <Card className="w-full h-full bg-white p-10 border-t-primary border-t-4">
        <div className="flex items-center justify-between border-b py-2 min-h-10">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold">
              {LISTTITLE[activeIndex - 1].title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {LISTTITLE[activeIndex - 1].description}
            </p>
          </div>
          <div className="flex items-center gap-1 justify-end ">
            {activeIndex > 1 && (
              <Button
                variant={"outline"}
                className="px-2 py-1 h-auto"
                onClick={() => setActiveIndex(activeIndex - 1)}
              >
                <ArrowLeft className="size-4" />
                <span>Previous</span>
              </Button>
            )}
            <Button
              variant={"outline"}
              className="px-2 py-1 h-auto"
              onClick={handleNext}
              disabled={
                activeIndex === 5 || resumeInfo?.status === "archived"
                  ? true
                  : false
              }
            >
              <ArrowRight className="size-4" />
              <span>Next</span>
            </Button>
          </div>
        </div>
        <div className="px-5 py-3 pb-5">
          {/* TODO: Make each form component for user can input information resume or CV */}
          {activeIndex === 1 && <PersonalInfoForm handleNext={handleNext} />}
          {activeIndex === 2 && <SummaryForm handleNext={handleNext} />}
          {activeIndex === 3 && <div>Professional Experience</div>}
          {activeIndex === 4 && <EducationForm handleNext={handleNext} />}
          {activeIndex === 5 && <div>Skills Form</div>}
        </div>
      </Card>
    </div>
  );
}
