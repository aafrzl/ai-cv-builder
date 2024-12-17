import Educationpreview from "@/app/(home)/_components/preview/education-preview";
import ExperiencePreview from "@/app/(home)/_components/preview/experience-preview";
import PersonalInfo from "@/app/(home)/_components/preview/personal-info";
import SkillsPreview from "@/app/(home)/_components/preview/skills-preview";
import SummaryPreview from "@/app/(home)/_components/preview/summary-preview";
import { INITIAL_COLOR_THEME } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface PreviewResumePublicProps {
  isLoading: boolean;
  resumeInfo: ResumeDataType;
}

export default function PreviewResumePublic({
  isLoading,
  resumeInfo,
}: PreviewResumePublicProps) {
  const themeColor = resumeInfo?.themeColor || INITIAL_COLOR_THEME;

  return (
    <div
      className="w-full h-full shadow-md bg-white p-10 flex-[1.02] rounded !font-open-sans"
      style={{ borderTop: `10px solid ${themeColor}` }}
    >
      <PersonalInfo
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />

      <SummaryPreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />

      <ExperiencePreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />

      <Educationpreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />

      <SkillsPreview
        isLoading={isLoading}
        resumeInfo={resumeInfo}
      />
    </div>
  );
}
