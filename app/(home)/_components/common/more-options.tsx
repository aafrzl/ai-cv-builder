"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { StatusType } from "@/types/resume.type";
import { Loader, MoreHorizontal, Redo2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MoreOptions() {
  const router = useRouter();
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const handleClick = async (status: StatusType) => {
    if (!resumeInfo) return;
    await mutateAsync(
      {
        status: status,
      },
      {
        onSuccess: () => {
          onUpdate({ ...resumeInfo, status });
          router.replace("/dashboard");
          toast({
            title: "Success",
            description: `Resume ${
              status === "archived" ? "archived" : "restored"
            } successfully`,
          });
        },
        onError() {
          toast({
            title: "Error",
            description: `Failed to ${
              status === "archived" ? "archive" : "restore"
            } the resume`,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="bg-white border"
          title="More options"
          disabled={isLoading}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          {resumeInfo?.status === "archived" ? (
            <Button
              variant={"ghost"}
              className="py-2 w-full"
              disabled={isPending}
              onClick={() => handleClick("private")}
            >
              {isPending ? (
                <Loader className="size-4 mr-2 animate-spin" />
              ) : (
                <Redo2 className="size-4" />
              )}
              Restore
            </Button>
          ) : (
            <Button
              variant={"ghost"}
              className="py-2 text-destructive w-full"
              disabled={isPending}
              onClick={() => handleClick("archived")}
            >
              {isPending ? (
                <Loader className="size-4 mr-2 animate-spin" />
              ) : (
                <Trash className="size-4" />
              )}
              Archive
            </Button>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
