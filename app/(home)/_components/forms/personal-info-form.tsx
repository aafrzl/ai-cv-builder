"use client";

import PersonalSkeletonLoader from "@/components/loading-skeleton/personal-skeleton-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { generateThumbnail } from "@/lib/helper";
import { PersonalInfoType } from "@/types/resume.type";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  handleNext: () => void;
}

const initialData = {
  firstName: "",
  lastName: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
};

export default function PersonalInfoForm({ handleNext }: Props) {
  const { resumeInfo, onUpdate, isLoading } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfoType>(initialData);

  useEffect(() => {
    if (!resumeInfo) return;

    if (resumeInfo.personalInfo) {
      setPersonalInfo(resumeInfo?.personalInfo || initialData);
    }
  }, [resumeInfo?.personalInfo]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });

    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      personalInfo: {
        ...personalInfo,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const thumbnail = await generateThumbnail();
    const currentNo = resumeInfo?.currentPosition
      ? resumeInfo.currentPosition
      : 1;

    await mutateAsync(
      {
        currentPosition: currentNo + 1,
        thumbnail: thumbnail,
        personalInfo: personalInfo,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Personal info updated successfully",
          });
          handleNext();
        },
      }
    );
  };

  if (isLoading) return <PersonalSkeletonLoader />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <Label className="text-sm">First Name</Label>
            <Input
              name="firstName"
              required
              autoComplete="off"
              value={personalInfo.firstName || ""}
              disabled={isPending || resumeInfo?.status === "archived"}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm">Last Name</Label>
            <Input
              name="lastName"
              required
              autoComplete="off"
              value={personalInfo.lastName || ""}
              disabled={isPending || resumeInfo?.status === "archived"}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm">Job Title</Label>
            <Input
              name="jobTitle"
              required
              autoComplete="off"
              value={personalInfo.jobTitle || ""}
              disabled={isPending || resumeInfo?.status === "archived"}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm">Email</Label>
            <Input
              name="email"
              type="email"
              required
              autoComplete="off"
              value={personalInfo.email || ""}
              disabled={isPending || resumeInfo?.status === "archived"}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-sm">Phone number</Label>
            <Input
              name="phone"
              type="tel"
              required
              autoComplete="off"
              value={personalInfo.phone || ""}
              disabled={isPending || resumeInfo?.status === "archived"}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm">Address</Label>
            <Textarea
              name="address"
              required
              autoComplete="off"
              value={personalInfo.address || ""}
              disabled={isPending || resumeInfo?.status === "archived"}
              onChange={handleChange}
            />
          </div>
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
