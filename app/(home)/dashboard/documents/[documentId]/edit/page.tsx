import EditResume from "@/app/(home)/_components/edit-resume";
import { ResumeInfoProvider } from "@/context/resume-info-provider";

export default function DocumentEditPage() {
  return (
    <ResumeInfoProvider>
      <EditResume />
    </ResumeInfoProvider>
  );
}
