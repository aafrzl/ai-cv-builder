import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import useOrigin from "@/hooks/use-origin";
import { toast } from "@/hooks/use-toast";
import { StatusType } from "@/types/resume.type";
import { Check, Copy, Globe, Loader, Share2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Share() {
  const [isCopied, setIsCopied] = useState(false);

  const param = useParams();

  const documentId = param.documentId;

  const { resumeInfo, onUpdate, isLoading } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const origin = useOrigin();
  const url = `${origin}/preview/${documentId}/resume`;

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleClick = async (status: StatusType) => {
    if (!resumeInfo) return;

    await mutateAsync(
      {
        status: status,
      },
      {
        onSuccess: () => {
          onUpdate({
            ...resumeInfo,
            status: status,
          });

          toast({
            title: "Success",
            description: `Status set to ${status} successfully`,
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: `Failed to set status to ${status}`,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={
            isLoading || resumeInfo?.status === "archived" ? true : false
          }
          variant={"secondary"}
          className="bg-white border gap-1 p-2 w-9 lg:w-auto flex items-center"
          title="Share"
        >
          <Share2Icon className="size-4" />
          <span className="hidden lg:flex">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background"
        align="end"
        alignOffset={0}
        forceMount
      >
        {resumeInfo?.status === "public" ? (
          <div className="space-y-3">
            <div className="flex gap-x-2 items-center">
              <Globe className="size-6 stroke-primary animate-pulse" />
              <p className="font-medium text-xs text-primary">
                This resume is shareable, copy the link to share with others.
              </p>
            </div>

            <div className="flex items-center">
              <Input
                className="flex-1 px-2 text-xs rounded-r-none h-8 truncate focus-visible:ring-0 focus-visible:ring-offset-0"
                value={url}
              />
              <Button
                disabled={isCopied}
                onClick={onCopy}
                className="h-8 rounded-l-none"
              >
                {isCopied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <Globe className="size-10 text-muted-foreground" />
            <div className="text-center mb-2">
              <h5 className="font-semibold text-sm">Set to public</h5>
              <p className="text-xs text-muted-foreground">
                To share it with others, make it public.
              </p>
            </div>
            <Button
              className="w-full h-8 text-xs gap-1 font-semibold"
              disabled={isPending}
              onClick={() => handleClick("public")}
              type="button"
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              <span>Make Public</span>
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
