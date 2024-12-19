"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDocuments from "@/features/document/use-get-documents";
import useRestoreDocument from "@/features/document/use-restore-document";
import { format } from "date-fns";
import { FileText, Loader, SearchIcon, Trash2, Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrashListBox() {
  const router = useRouter();
  const { data: resumes, isLoading } = useGetDocuments(true);
  const { mutateAsync, isPending } = useRestoreDocument();
  const [search, setSearch] = useState<string>("");

  const filteredResumes = resumes?.data.filter((resume) => {
    return resume.title
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase());
  });

  const onClick = (docId: string) => {
    router.push(`/dashboard/documents/${docId}/edit`);
  };

  const onRestore = async (
    docId: string,
    status: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();

    mutateAsync({
      documentId: docId,
      status: status,
    });
  };

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button
          className="text-base gap-2 items-center"
          variant={"outline"}
        >
          <Trash2 className="size-4" />
          <span>All Trash</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background w-[22rem] !px-2"
        align="end"
        alignOffset={0}
        forceMount
      >
        {isLoading ? (
          <div className="w-full flex flex-col gap-2 pt-3">
            (
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-6"
              />
            ))}
            )
          </div>
        ) : (
          <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2 relative">
              <SearchIcon className="size-5 absolute top-3 left-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 px-2 bg-secondary pl-8"
                placeholder="Search by resume title"
              />
            </div>
            <div className="mt-2 px-1 pb-1">
              <p className="hidden last:block text-xs text-center text-muted-foreground">
                No resumes found in trash
              </p>
              {filteredResumes?.map((resume) => (
                <div
                  key={resume.id}
                  role="button"
                  onClick={() => onClick(resume.documentId)}
                  className="text-sm w-full hover:bg-primary/5 rounded py-1 px-1 flex items-center justify-between"
                >
                  <div className="flex items-start gap-1">
                    <FileText className="size-4 mr-1" />
                    <div className="flex flex-col">
                      <h5 className="font-semibold truncate block w-[200px]">
                        {resume.title} -{" "}
                        <span className="items-center">
                          {resume.updatedAt &&
                            format(resume.updatedAt, "MMM dd, yyyy")}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div>
                    <div
                      role="button"
                      onClick={(e) =>
                        onRestore(resume.documentId, resume.status, e)
                      }
                      className="rounded-sm hover:bg-neutral-200 size-6 flex items-center justify-center"
                    >
                      {isPending ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <Undo className="size-4" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
