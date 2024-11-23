"use client";
import useCreateDocument from "@/features/document/use-create-document";
import { FileText, Loader, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";

export default function AddResume() {
  const router = useRouter();
  const { mutate, isPending } = useCreateDocument();

  const onCreate = () => {
    mutate(
      {
        title: "Untitled Resume",
      },
      {
        onSuccess: (response) => {
          router.push(`/dashboard/documents/${response.data.documentId}/edit`);
        },
      }
    );
  };

  return (
    <Fragment>
      <div
        role="button"
        className="w-full cursor-pointer"
        onClick={onCreate}
      >
        <div className="py-24 h-[197px] flex flex-col rounded-lg gap-2 w-full items-center justify-center border bg-white hover:border-dashed hover:border-primary transition hover:shadow-sm">
          <span>
            <PlusCircle className="size-8" />
          </span>
          <p className="text-sm font-semibold">Blank Resume</p>
        </div>
        {isPending && (
          <div className="fixed top-0 left-0 z-[9999] right-0 flex flex-col gap-2 items-center justify-center h-full w-full backdrop-blur-sm bg-black/30 text-white">
            <Loader className="animate-spin size-8" />
            <div className="flex items-center gap-2">
              <FileText className="size-5" />
              <p>Create Resume...</p>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
