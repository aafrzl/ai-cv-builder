"use client";
import { useResumeContext } from "@/context/resume-info-provider";
import { AlertCircle } from "lucide-react";
import React from "react";
import ResumeTitle from "./resume-title";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import ThemeColor from "./theme-color";
import PreviewModal from "../preview-modal";
import DownloadBtn from "./download-btn";
import Share from "./share";
import MoreOptions from "./more-options";

export default function TopSection() {
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const handleChangeTitle = async (title: string) => {
    if (title === "Untitled Resume" && !title) return;

    if (resumeInfo) {
      onUpdate({ ...resumeInfo, title });
    }

    mutateAsync(
      {
        title: title,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Resume title updated successfully",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update resume title",
            variant: "destructive",
          });
        },
      }
    );
  };

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
            isLoading={isLoading || isPending}
            status={resumeInfo?.status}
            onSave={(value) => handleChangeTitle(value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <ThemeColor />
          <PreviewModal />
          <DownloadBtn
            title={resumeInfo?.title || "Untitled Resume"}
            status={resumeInfo?.status}
            isLoading={isLoading}
          />
          <Share />
          <MoreOptions />
        </div>
      </div>
    </>
  );
}
