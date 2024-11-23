import { Skeleton } from "@/components/ui/skeleton";
import { ResumeDataType } from "@/types/resume.type";

interface PersonalInfoProps {
  isLoading: boolean;
  resumeInfo: ResumeDataType | undefined;
}

export default function SummaryPreview({
  isLoading,
  resumeInfo,
}: PersonalInfoProps) {
  return (
    <div className="w-full min-h-10">
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <p className="text-[13px] leading-4 text-justify">
          {resumeInfo?.summary ||
            "A summary is a brief statement or account of the main points of something."}
        </p>
      )}
    </div>
  );
}
