"use client";
import {
  BtnUndo,
  BtnRedo,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { toast } from "@/hooks/use-toast";
import useGenerateAI from "@/features/ai/use-generate-ai";
import { useState } from "react";
import { Loader, Sparkles } from "lucide-react";
import { cleanAIOutput } from "@/lib/helper";

interface RichTextEditorProps {
  jobTitle: string | null;
  initialValue: string;
  onEditorChange: (e: any) => void;
}

export default function RichTextEditor({
  jobTitle,
  initialValue,
  onEditorChange,
}: RichTextEditorProps) {
  const { mutate, isPending } = useGenerateAI();
  const [value, setValue] = useState(initialValue || "");

  const handleGenerateAI = async () => {
    try {
      if (!jobTitle) {
        toast({
          title: "Must provide job title",
          variant: "destructive",
        });
        return;
      }

      mutate(
        {
          prompt: jobTitle,
          type: "experience",
        },
        {
          onSuccess: ({ data }) => {
            setValue(cleanAIOutput(data));
            onEditorChange(cleanAIOutput(data));
          },
        }
      );
    } catch (error) {
      toast({
        title: "Failed to generate Work Summary",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <Label>Work Summary</Label>
        <Button
          type="button"
          variant={"outline"}
          className="gap-2 text-violet-500"
          size={"sm"}
          onClick={handleGenerateAI}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="mr-2 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          <span>{isPending ? "Generating..." : "Generate with AI"}</span>
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onEditorChange(e.target.value);
          }}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "14px",
            },
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}
