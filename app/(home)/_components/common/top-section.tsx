"use client";
import { useResumeContext } from "@/context/resume-info-provider";
import { AlertCircle } from "lucide-react";
import React from "react";
import ResumeTitle from "./resume-title";

export default function TopSection() {
  const { resumeInfo } = useResumeContext();

  return (
    <>
      {resumeInfo?.status === "archived" && (
        <div className="absolute z-[9] inset-0 h-6 top-0 bg-destructive text-center p-2 text-white flex items-center justify-center gap-x-2 font-medium">
          <AlertCircle className="size-4" />
          <span>
            This resume is in the trash bin cannot be edited. Please restore it
            to edit.
          </span>
        </div>
      )}
      <div className="w-full flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <ResumeTitle
            initialTitle={resumeInfo?.title || ""}
            isLoading={false}
            status={resumeInfo?.status}
            onSave={(value) => console.log(value)}
          />
        </div>
      </div>
    </>
  );
}
