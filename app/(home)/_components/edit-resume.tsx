import React from "react";
import TopSection from "./common/top-section";
import ResumePreview from "./common/resume-preview";
import ResumeForm from "./resume-form";

export default function EditResume() {
  return (
    <div className="relative w-full">
      <div className="w-full mx-auto max-w-7xl py-4 px-5">
        <TopSection />
        <div className="w-full mt-1">
          <div className="flex w-full flex-col lg:flex-row items-start py-3 gap-6">
            {/* Section Resume Form */}
            <ResumeForm />
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
}
