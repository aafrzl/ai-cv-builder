import { Separator } from "@/components/ui/separator";
import { Dot, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

interface ResumeItemProps {
  documentId: string;
  title: string;
  status: "archived" | "private" | "public";
  thumbnail: string | null;
  updatedAt: string;
}

export default function ResumeItem({
  documentId,
  title,
  status,
  thumbnail,
  updatedAt,
}: ResumeItemProps) {
  const router = useRouter();

  const gotoDoc = () => {
    router.push(`/dashboard/documents/${documentId}/edit`);
  };

  return (
    <div
      role="button"
      className="w-full h-[197px] cursor-pointer border rounded-lg transition ease-in-out hover:shadow-sm shadow-primary hover:border-primary"
      onClick={gotoDoc}
    >
      <div className="flex flex-col w-full h-full items-center rounded-lg justify-center bg-card">
        <div className="w-full flex flex-1 p-1">
          <div className="w-full flex flex-1 bg-white rounded-t-lg justify-center items-center">
            {thumbnail ? (
              <div className="relative w-full h-full rounded-t-lg overflow-hidden">
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="w-full h-full object-cover object-top rounded-t-lg"
                />
              </div>
            ) : (
              <FileText className="size-8 text-muted-foreground" />
            )}
          </div>
        </div>
        <Separator />
        <div className="shrink w-full pt-2 pb-2 px-2">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-sm truncate block w-[200px] mb-1">
              {title}
            </h5>
          </div>
          <div className="flex flex-col gap-1 items-start text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1">
              {status === "private" ? (
                <>
                  <Lock className="size-3" />
                  Private
                </>
              ) : (
                <>
                  <Globe className="size-3 text-primary" />
                  Public
                </>
              )}
            </span>
            <span className="text-xs">
              {formatDistanceToNow(new Date(updatedAt), {
                addSuffix: false,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
