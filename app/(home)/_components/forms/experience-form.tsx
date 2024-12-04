import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "@/context/resume-info-provider";
import { Loader, PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useUpdateDocument from "@/features/document/use-update-document";
import RichTextEditor from "@/components/rich-text-editor";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface Props {
  handleNext: () => void;
}

const initialState = {
  id: undefined,
  docId: undefined,
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
  currentlyWorking: false,
};

export default function ExperienceForm({ handleNext }: Props) {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [experienceList, setExperienceList] = useState(() => {
    return resumeInfo?.experience?.length
      ? resumeInfo.experience
      : [initialState];
  });

  useEffect(() => {
    if (!resumeInfo) return;
    onUpdate({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  const handleChange = (
    e: { target: { name: string; value: string | boolean } },
    index: number
  ) => {
    const { name, value } = e.target;

    setExperienceList((prev) => {
      const newExperienceList = [...prev];

      if (name === "currentlyWorking") {
        newExperienceList[index].currentlyWorking = value as boolean;
      } else {
        newExperienceList[index] = {
          ...newExperienceList[index],
          [name]: value,
        };
      }

      return newExperienceList;
    });
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, initialState]);
  };

  const removeExperience = (index: number) => {
    const updatedExperienceList = [...experienceList];
    updatedExperienceList.splice(index, 1);
    setExperienceList(updatedExperienceList);
  };

  const handleTextEditor = (value: string, name: string, index: number) => {
    setExperienceList((prevState) => {
      const newExperienceList = [...prevState];
      newExperienceList[index] = {
        ...newExperienceList[index],
        [name]: value,
      };
      return newExperienceList;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const thumbnail = resumeInfo?.thumbnail;
    const currentNo = resumeInfo?.currentPosition
      ? resumeInfo?.currentPosition + 1
      : 1;

    await mutateAsync(
      {
        currentPosition: currentNo,
        thumbnail,
        experience: experienceList,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success to save experience",
            description: "Experience has been saved successfully",
          });

          handleNext();
        },
        onError: () => {
          toast({
            title: "Failed to save experience",
            description: "Failed to save experience to database",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="border w-full h-auto divide-y-[1px] rounded-lg px-3 pb-4 my-5">
          {experienceList.map((item, index) => (
            <div
              key={index}
              className="space-y-2"
            >
              <div className="relative grid grid-cols-2 mb-5 pt-4 gap-3">
                {experienceList.length > 1 && (
                  <Button
                    variant={"secondary"}
                    type="button"
                    size={"icon"}
                    className="absolute -top-4 -right-3 size-8"
                    onClick={() => removeExperience(index)}
                    disabled={resumeInfo?.status === "archived" || isPending}
                  >
                    <XIcon className="size-8" />
                  </Button>
                )}
                <div className="space-y-1">
                  <Label className="text-sm">Position title</Label>
                  <Input
                    name="title"
                    required
                    value={item.title || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Company name</Label>
                  <Input
                    name="companyName"
                    required
                    value={item.companyName || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">City</Label>
                  <Input
                    name="city"
                    required
                    value={item.city || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">State</Label>
                  <Input
                    name="state"
                    required
                    value={item.state || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm">Start Date</Label>
                  <Input
                    name="startDate"
                    type="date"
                    required
                    value={item.startDate || ""}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-sm">End Date</Label>
                  <Input
                    name="endDate"
                    type="date"
                    required
                    value={item.endDate || ""}
                    onChange={(e) => handleChange(e, index)}
                    disabled={item?.currentlyWorking}
                  />
                </div>

                <div className="inline-flex gap-x-2 items-center">
                  <Label className="text-sm">Currently Working</Label>
                  <Checkbox
                    name="currentlyWorking"
                    checked={item.currentlyWorking}
                    onCheckedChange={(value) =>
                      handleChange(
                        {
                          target: { name: "currentlyWorking", value },
                        },
                        index
                      )
                    }
                  />
                </div>

                <div className="col-span-2 mt-1">
                  <RichTextEditor
                    jobTitle={item.title || ""}
                    initialValue={item.workSummary || ""}
                    onEditorChange={(value) =>
                      handleTextEditor(value, "workSummary", index)
                    }
                  />
                </div>

                {index === experienceList.length - 1 && (
                  <Button
                    type="button"
                    variant={"outline"}
                    className="gap-1 mt-1 text-primary border-primary/50 col-span-2"
                    onClick={addNewExperience}
                  >
                    <PlusIcon className="size-4" />
                    <span>Add More Experience</span>
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
