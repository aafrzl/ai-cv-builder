"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDocuments from "@/features/document/use-get-documents";
import { RotateCw } from "lucide-react";
import { Fragment } from "react";
import ResumeItem from "./common/resume-item";

export default function ResumeList() {
  const { data, isLoading, isError, refetch, error } = useGetDocuments();
  const resumes = data?.data ?? [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-[197px] max-w-full"
          />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <div className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center h-full w-full backdrop-blur-sm bg-black/30 text-white">
        <p className="font-medium">
          {error?.message ?? "Failed to get documents"}
        </p>
        <Button onClick={() => refetch()}>
          <RotateCw className="size-5" />
          <span>Retry</span>
        </Button>
      </div>
    );
  }

  return (
    <Fragment>
      {resumes.map((resume) => (
        <ResumeItem
          key={resume.documentId}
          documentId={resume.documentId}
          title={resume.title}
          status={resume.status}
          thumbnail={resume.thumbnail}
          updatedAt={resume.updatedAt}
        />
      ))}
    </Fragment>
  );
}
