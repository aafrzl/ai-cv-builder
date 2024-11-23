import SkeletonLoader from "@/components/loading-skeleton/skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { INITIAL_COLOR_THEME } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface EducationPreviewProps {
  isLoading: boolean;
  resumeInfo: ResumeDataType | undefined;
}

export default function Educationpreview({
  isLoading,
  resumeInfo,
}: EducationPreviewProps) {
  const themeColor = resumeInfo?.themeColor || INITIAL_COLOR_THEME;

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full my-5">
      <h5
        className="text-center font-bold mb-2"
        style={{ color: themeColor }}
      >
        Education
      </h5>

      <Separator
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />

      <div className="flex flex-col gap-2 min-h-10">
        {resumeInfo?.educations?.map((education, index) => (
          <div key={index}>
            <h5
              className="text-base font-semibold"
              style={{
                color: themeColor,
              }}
            >
              {education.universityName}
            </h5>
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-[13px]">
                {education.degree}
                {education.degree && education.major && " in "}
                {education.major}
              </h5>
              <span className="text-[13px]">
                {education.startDate}
                {" - "}
                {education.endDate}
              </span>
            </div>
            <p className="text-[13px] my-2 leading-4">
              {education.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
