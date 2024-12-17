"use client";

import ResumePreview from "@/app/(home)/_components/common/resume-preview";
import PreviewResumePublic from "@/app/(public)/_components/preview-resume-public";
import useGetDocumentById from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import { FileText } from "lucide-react";
import { notFound, useParams } from "next/navigation";

export default function PublicResumePage() {
  const param = useParams();
  const documentId = param.documentId as string;

  const { data, isSuccess, isLoading } = useGetDocumentById(documentId, true);
  const resumeInfo = data?.data ?? ({} as ResumeDataType);

  if (!isLoading && !isSuccess) {
    return notFound();
  }

  return (
    <div className="w-full min-h-screen h-auto bg-background">
      <nav className="w-full px-8 border sticky top-0 border-gray-500 h-12 bg-black/50 py-2">
        <div className="flex items-center gap-1">
          <FileText className="size-6 text-gray-300" />
          <h5 className="text-lg px-1 text-gray-300 font-semibold">
            {resumeInfo.title || "Untitled Resume"}.pdf
          </h5>
        </div>
      </nav>
      <div
        className="w-full flex-1 flex items-center justify-center py-8"
      >
        <div className="max-w-[90%] mx-auto lg:max-w-[50%] w-full bg-white">
          {/* Preview resume */}
          <PreviewResumePublic isLoading={isLoading} resumeInfo={resumeInfo} />
        </div>
      </div>
    </div>
  );
}
