import { cn } from "@/lib/utils";
import { FileText, Globe, Lock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ResumeTitleProps {
  initialTitle: string;
  isLoading: boolean;
  status?: "archived" | "private" | "public" | null;
  onSave: (value: string) => void;
}

export default function ResumeTitle({
  initialTitle,
  isLoading,
  status,
  onSave,
}: ResumeTitleProps) {
  const [title, setTitle] = useState("Untitled Resume");

  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
  }, [initialTitle]);

  const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    const newTitle = e.target.innerText;
    setTitle(newTitle);
    if (onSave && typeof onSave === "function") {
      onSave(newTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center gap-1 pr-4">
      <FileText className="size-5 stroke-primary" />
      <h5
        className={cn(
          "text-lg px-3 text-muted-foreground font-semibold opacity-100 rounded-lg focus:outline-1 focus-visible:outline-primary",
          {
            "!opacity-70 !pointer-events-none":
              isLoading === true || status === "archived",
          }
        )}
        contentEditable={isLoading || status === "archived" ? false : true}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      >
        {title}
      </h5>
      <span>
        {status === "private" ? (
          <Lock size={14} />
        ) : status === "public" ? (
          <Globe size={14} />
        ) : status === "archived" ? (
          <Trash2 size={14} />
        ) : null}
      </span>
    </div>
  );
}
