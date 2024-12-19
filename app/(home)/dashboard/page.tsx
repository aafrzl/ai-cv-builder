import { Button } from "@/components/ui/button";
import AddResume from "../_components/add-resume";
import ResumeList from "../_components/resume-list";
import TrashListBox from "../_components/trash-list-box";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-7xl py-5 px-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Resume Builder</h1>
            <p className="text-base text-muted-foreground">
              Create your own resume with AI to help you get your dream job.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <TrashListBox />
          </div>
        </div>
        <div className="w-full pt-11">
          <h5 className="text-xl font-semibold mb-3">All Resume</h5>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2 items-center">
            <AddResume />
            <ResumeList />
          </div>
        </div>
      </div>
    </div>
  );
}
