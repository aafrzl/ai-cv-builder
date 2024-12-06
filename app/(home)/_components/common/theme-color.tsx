"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import useDebounce from "@/hooks/use-debounce";
import { toast } from "@/hooks/use-toast";
import {
  generateThumbnail,
  INITIAL_COLOR_THEME,
  listColors,
} from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function ThemeColor() {
  const { resumeInfo, onUpdate } = useResumeContext();
  const { mutateAsync } = useUpdateDocument();

  const [selectedColor, setSelectedColor] = useState(INITIAL_COLOR_THEME);

  const debounceColor = useDebounce<string>(selectedColor, 1000);

  useEffect(() => {
    if (debounceColor) onSave();
  }, [debounceColor]);

  const onSave = useCallback(async () => {
    if (!selectedColor) return;
    if (selectedColor === INITIAL_COLOR_THEME) return;

    const thumbnail = await generateThumbnail();

    await mutateAsync(
      {
        themeColor: selectedColor,
        thumbnail,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Theme color updated successfully",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update theme color",
            variant: "destructive",
          });
        },
      }
    );
  }, [selectedColor]);

  const onColorChange = (color: string) => {
    setSelectedColor(color);

    if (!resumeInfo) return;

    onUpdate({
      ...resumeInfo,
      themeColor: color,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={resumeInfo?.status === "archived" ? true : false}
          variant="secondary"
          className="bg-white border gap-1 !p-2 lg:w-auto lg:p-4"
          title="Change theme color"
        >
          <div className="inline-flex items-center gap-1">
            <Palette className="size-4" />
            <span className="hidden lg:block">Theme Color</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="bg-background"
      >
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-2">
          {listColors.map((color, index) => (
            <div
              role="button"
              key={index}
              onClick={() => onColorChange(color)}
              className={cn(
                "h-5 w-8 rounded-[5px] hover:border hover:border-black",
                selectedColor === color && "border border-black"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
