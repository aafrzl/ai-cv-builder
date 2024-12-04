import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import { format } from "date-fns";

export const INITIAL_COLOR_THEME = "#7c3aed";

export const generateDocUUID = (): string => {
  const uuid = uuidv4().replace(/-/g, "");
  return `doc-${uuid.substring(0, 16)}`;
};

export const generateThumbnail = async () => {
  const resumeElement = document.getElementById(
    "resume-preview-id"
  ) as HTMLElement;

  if (!resumeElement) {
    console.error("Resume preview element not found");
    return;
  }

  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 0.5,
    });
    const thumbnailImage = canvas.toDataURL("image/png");
    return thumbnailImage;
  } catch (error) {
    console.error("Thumbnail generate failed", error);
  }
};

export function cleanAIOutput(data: string): string {
  const lines = data.trim().split("\n");
  if (lines[0].startsWith("```html") && lines[lines.length - 1] === "```") {
    return lines.slice(1, -1).join("\n");
  }
  return data;
}

// function format date in resume preview (e.g 2022-01-01 to 24 Jan 2022)
export function formatDate(date: string): string {
  if (!date) return "";

  return format(new Date(date), "dd MMM yyyy");
}
