"use client";

import { Card } from "@/components/ui/card";
import { useResumeContext } from "@/context/resume-info-provider";
import Educationpreview from "../preview/education-preview";
import ExperiencePreview from "../preview/experience-preview";
import PersonalInfo from "../preview/personal-info";
import SkillsPreview from "../preview/skills-preview";
import SummaryPreview from "../preview/summary-preview";

export default function ResumePreview() {
  const { resumeInfo, isLoading } = useResumeContext();

  return (
    <Card
      id="resume-preview-id"
      className="w-full h-full bg-white p-10 flex-1 rounded-sm "
      style={{
        borderTop: `10px solid ${resumeInfo?.themeColor}`,
      }}
    >
      {/* Personal Info */}
      <PersonalInfo
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />
      {/* Summary */}
      <SummaryPreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />
      {/* Work Experience */}
      <ExperiencePreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />
      {/* Education */}
      <Educationpreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />
      {/* Skills */}
      <SkillsPreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />
    </Card>
  );
}
