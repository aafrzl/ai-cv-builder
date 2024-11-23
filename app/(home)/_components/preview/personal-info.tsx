import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { INITIAL_COLOR_THEME } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface PersonalInfoProps {
  isLoading: boolean;
  resumeInfo: ResumeDataType | undefined;
}

export default function PersonalInfo({
  isLoading,
  resumeInfo,
}: PersonalInfoProps) {
  const themeColor = resumeInfo?.themeColor || INITIAL_COLOR_THEME;

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full min-h-14">
      <h2
        className="font-bold text-xl text-center"
        style={{ color: themeColor }}
      >
        {resumeInfo?.personalInfo?.firstName || "First Name"}{" "}
        {resumeInfo?.personalInfo?.lastName || "Last Name"}
      </h2>
      <h5 className="text-center text-sm font-medium">
        {resumeInfo?.personalInfo?.jobTitle || "Job Title"}
      </h5>
      <p className="text-center font-normal text-[13px]">
        {resumeInfo?.personalInfo?.address || "Home Address"}
      </p>

      <div className="flex items-center justify-between pt-3">
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.phone || "Phone number"}
        </h5>
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.email || "Email address"}
        </h5>
      </div>

      <Separator
        className="my-2 border-[1.5px]"
        style={{ borderColor: themeColor }}
      />
    </div>
  );
}

const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-14">
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <div className="flex justify-between pt-3">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <Skeleton className="h-[1.5px] w-full my-2" />
    </div>
  );
};
