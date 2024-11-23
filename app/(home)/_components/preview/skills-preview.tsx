import SkeletonLoader from "@/components/loading-skeleton/skeleton-loader";
import { Separator } from "@/components/ui/separator";
import { INITIAL_COLOR_THEME } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface SkillsPreviewProps {
  isLoading: boolean;
  resumeInfo: ResumeDataType | undefined;
}

export default function SkillsPreview({
  isLoading,
  resumeInfo,
}: SkillsPreviewProps) {
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
        Skills
      </h5>

      <Separator
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />

      <div className="grid grid-cols-2 gap-3 pt-3 my-1 min-h-10">
        {resumeInfo?.skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
          >
            <h5 className="text-[13px]">{skill.name}</h5>
            {skill.rating && skill.name ? (
              <div className="bg-gray-200 w-[120px]">
                <div
                  className="h-2 rounded-lg"
                  style={{
                    width: `${skill.rating * 20}%`,
                    background: themeColor,
                  }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
