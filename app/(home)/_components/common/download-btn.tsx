import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatFileName } from "@/lib/helper";
import { StatusType } from "@/types/resume.type";
import html2canvas from "html2canvas";
import { DownloadCloud, Loader } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";

interface DownloadBtnProps {
  title: string;
  status: StatusType;
  isLoading: boolean;
}

export default function DownloadBtn({
  title,
  status,
  isLoading,
}: DownloadBtnProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const resumeElement = document.getElementById("resume-preview-id");
    if (!resumeElement) {
      toast({
        title: "Error",
        description: "Failed to download the resume",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const fileName = formatFileName(title);

    try {
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to download the resume", error);
      toast({
        title: "Error",
        description: "Error generating PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={"secondary"}
      className="bg-white border gap-1 p-2 w-9 lg:w-auto flex items-center"
      disabled={isLoading || status === "archived" ? true : false}
      title="Download Resume"
      onClick={handleDownload}
    >
      {loading ? (
        <Loader className="size-5 animate-spin" />
      ) : (
        <DownloadCloud className="size-5" />
      )}
      <span className="hidden lg:flex">
        {loading ? "Generating PDF..." : "Download Resume"}
      </span>
    </Button>
  );
}
