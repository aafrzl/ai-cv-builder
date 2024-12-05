"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "@/context/resume-info-provider";
import { Loader, MinusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import useUpdateDocument from "@/features/document/use-update-document";
import { generateThumbnail } from "@/lib/helper";
import { toast } from "@/hooks/use-toast";

import "@smastrom/react-rating/style.css";

const initialState = {
  id: undefined,
  docId: undefined,
  name: "",
  rating: 0,
};

export default function SkillForm() {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [skillList, setSkillList] = useState(
    resumeInfo?.skills?.length ? resumeInfo.skills : [initialState]
  );

  useEffect(() => {
    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      skills: skillList,
    });
  }, [skillList]);

  const handleChange = (
    value: string | number,
    name: string,
    index: number
  ) => {
    setSkillList((prev) => {
      const newSkillList = [...prev];
      newSkillList[index] = {
        ...newSkillList[index],
        [name]: value,
      };
      return newSkillList;
    });
  };

  const addNewSkill = () => {
    setSkillList([...skillList, initialState]);
  };

  const removeSkill = (index: number) => {
    const updatedSkillList = [...skillList];
    updatedSkillList.splice(index, 1);
    setSkillList(updatedSkillList);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const thumbnail = await generateThumbnail();

    await mutateAsync(
      {
        currentPosition: 1,
        thumbnail,
        skills: skillList,
      },
      {
        onSuccess: () => {
          toast({
            title: "Skill updated successfully",
            description: "Your skill has been updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Failed to update skill",
            description: "Please try again later.",
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
          {skillList.map((skill, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-between mb-5 pt-5 gap-3">
                <Button
                  variant={"secondary"}
                  type="button"
                  size={"icon"}
                  className="absolute -top-4 -right-3 size-8"
                  onClick={() => removeSkill(index)}
                >
                  <MinusIcon className="size-6" />
                </Button>

                <div className="flex-1">
                  <Label className="text-sm">Name</Label>
                  <Input
                    name="name"
                    required
                    value={skill.name || ""}
                    disabled={isPending}
                    autoComplete="off"
                    onChange={(e) =>
                      handleChange(e.target.value, "name", index)
                    }
                  />
                </div>

                <div className="shrink-0 pt-5">
                  <Rating
                    className="max-w-32"
                    isDisabled={!skill.name || isPending}
                    value={skill.rating || 0}
                    onChange={(value: number) =>
                      handleChange(value, "rating", index)
                    }
                  />
                </div>
              </div>

              {index === skillList.length - 1 && skillList.length < 6 && (
                <Button
                  className="gap-1 text-primary border-primary/30 w-full"
                  variant={"outline"}
                  type="button"
                  disabled={isPending}
                  onClick={addNewSkill}
                >
                  <PlusIcon className="size-4" />
                  <span>Add more skill</span>
                </Button>
              )}
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
