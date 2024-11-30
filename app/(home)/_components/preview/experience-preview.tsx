import SkeletonLoader from "@/components/loading-skeleton/skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { INITIAL_COLOR_THEME } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface ExperiencePreviewProps {
  isLoading: boolean;
  resumeInfo: ResumeDataType | undefined;
}

export default function ExperiencePreview({
  isLoading,
  resumeInfo,
}: ExperiencePreviewProps) {
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
        Professional Experience
      </h5>

      <Separator
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />

      <div className="flex flex-col gap-2 min-h-10">
        {resumeInfo?.experience?.length === 0 && (
          <p className="text-[13px] leading-4 text-justify italic">
            Add your professional experience. You can also generate description
            professional experience with our AI feature.
          </p>
        )}
        {resumeInfo?.experience?.map((experience, index) => (
          <div key={index}>
            <h5
              className="text-base font-semibold"
              style={{
                color: themeColor,
              }}
            >
              {experience.title}
            </h5>
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-[13px]">
                {experience.companyName}
                {experience.companyName && experience.city && ", "}
                {experience.city}
                {experience.city && experience.state && ", "}
                {experience.state}
              </h5>
              <span className="text-[13px]">
                {experience.startDate}
                {" - "}
                {experience.currentlyWorking ? "Present" : experience.endDate}
              </span>
            </div>
            <div
              style={{ fontSize: "13px" }}
              className="exp-preview leading-[14.6px]"
              dangerouslySetInnerHTML={{
                __html: experience?.workSummary || "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
