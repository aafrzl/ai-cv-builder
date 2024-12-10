import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useResumeContext } from "@/context/resume-info-provider";
import { EyeIcon, FileTextIcon } from "lucide-react";
import { Fragment } from "react";
import ResumePreview from "./common/resume-preview";

export default function PreviewModal() {
  const { resumeInfo, isLoading } = useResumeContext();

  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={
              isLoading || resumeInfo?.status === "archived" ? true : false
            }
            variant={"secondary"}
            className="bg-white border gap-1 p-2 w-9 lg:w-auto flex items-center"
            title="Preview"
          >
            <EyeIcon className="size-4" />
            <span>Preview</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-4xl p-0 w-full max-h-[90vh] lg:max-h-[95vh] overflow-auto">
          <DialogHeader className="sticky top-0 backdrop-blur bg-white z-10">
            <DialogTitle className="flex items-center text-center gap-1 text-base pt-2 px-3 font-semibold">
              <FileTextIcon className="size-5 stroke-primary" />
              {resumeInfo?.title} Preview
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-full px-4 pb-4">
            <ResumePreview />
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}