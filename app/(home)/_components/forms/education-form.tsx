"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { Loader, Plus, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  handleNext: () => void;
}

const inititalState = {
  id: undefined,
  docId: undefined,
  universityName: "",
  startDate: "",
  endDate: "",
  degree: "",
  major: "",
  description: "",
};

export default function EducationForm({ handleNext }: Props) {
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [educationList, setEducationList] = useState(() => {
    return resumeInfo?.education?.length
      ? resumeInfo.education
      : [inititalState];
  });

  useEffect(() => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resumeInfo) return;

    const thumbnail = resumeInfo?.thumbnail;
    const currentNo = resumeInfo?.currentPosition
      ? resumeInfo?.currentPosition + 1
      : 1;

    await mutateAsync(
      {
        currentPosition: currentNo,
        thumbnail,
        education: educationList,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success to save education",
            description: "Education has been saved successfully",
          });
          handleNext();
        },
        onError: () => {
          toast({
            title: "Failed to save education",
            description: "Failed to save education to database",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setEducationList((prev) => {
      const newEducationList = [...prev];

      newEducationList[index] = {
        ...newEducationList[index],
        [name]: value,
      };

      return newEducationList;
    });
  };

  const addNewEducation = () => {
    setEducationList([...educationList, inititalState]);
  };

  const removeEducation = (index: number) => {
    const updatedEducationList = [...educationList];
    updatedEducationList.splice(index, 1);
    setEducationList(updatedEducationList);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-lg px-3 pb-4 my-5">
          {educationList.map((education, index) => (
            <div key={index}>
              <div className="relative grid grid-cols-2 mb-2 pt-4 gap-3">
                {educationList.length > 1 && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    size={"icon"}
                    className="absolute -top-4 -right-3 size-8"
                    onClick={() => removeEducation(index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  >
                    <XIcon className="size-8" />
                  </Button>
                )}

                <div className="col-span-2">
                  <Label className="text-sm">University Name</Label>
                  <Input
                    name="universityName"
                    required
                    value={education.universityName || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  />
                </div>
                <div>
                  <Label className="text-sm">Degree</Label>
                  <Input
                    name="degree"
                    required
                    value={education.degree || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  />
                </div>
                <div>
                  <Label className="text-sm">Major</Label>
                  <Input
                    name="major"
                    required
                    value={education.major || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  />
                </div>
                <div>
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    name="startDate"
                    type="date"
                    required
                    value={education.startDate || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  />
                </div>
                <div>
                  <Label className="text-sm">End Date</Label>
                  <Input
                    name="endDate"
                    type="date"
                    required
                    value={education.endDate || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  />
                </div>
                <div className="col-span-2 mb-4">
                  <Label className="text-sm">Description (optional)</Label>
                  <Textarea
                    name="description"
                    value={education.description || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  />
                </div>

                {index === educationList.length - 1 &&
                  educationList.length < 5 && (
                    <Button
                      className="gap-1 mt-1 text-primary border-primary/50 col-span-2"
                      variant={"outline"}
                      type="button"
                      onClick={addNewEducation}
                      disabled={resumeInfo?.status === "archived" || isPending}
                    >
                      <Plus className="size-4" />
                      <span>Add Education</span>
                    </Button>
                  )}
              </div>
            </div>
          ))}
        </div>
        <Button
          className="mt-4"
          type="submit"
          disabled={isPending || resumeInfo?.status === "archived"}
        >
          {isPending && <Loader className="mr-2 animate-spin" />}
          <span>Save Changes</span>
        </Button>
      </form>
    </div>
  );
}
