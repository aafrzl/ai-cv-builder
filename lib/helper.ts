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

export const listColors: string[] = [
  // Reds
  "#FF0000", // Red
  "#DC143C", // Crimson
  "#B22222", // Firebrick
  "#FF4500", // OrangeRed
  "#FF6347", // Tomato

  // Oranges
  "#FFA500", // Orange
  "#FF5722", // Deep Orange
  "#FF7F50", // Coral
  "#FF8C00", // Dark Orange
  "#FF9800", // Material Orange

  // Yellows
  "#FFFF00", // Yellow
  "#FFD700", // Gold
  "#FFF700", // Bright Yellow
  "#FFDE03", // Vivid Yellow

  // Greens
  "#00FF00", // Green
  "#32CD32", // Lime Green
  "#228B22", // Forest Green
  "#008000", // Dark Green
  "#00FF7F", // Spring Green

  // Blues
  "#0000FF", // Blue
  "#1E90FF", // Dodger Blue
  "#4169E1", // Royal Blue
  "#00BFFF", // Deep Sky Blue
  "#87CEEB", // Sky Blue

  // Purples
  "#800080", // Purple
  "#8A2BE2", // Blue Violet
  "#9932CC", // Dark Orchid
  "#BA55D3", // Medium Orchid
  "#DA70D6", // Orchid

  // Pinks
  "#FFC0CB", // Pink
  "#FF69B4", // Hot Pink
  "#FF1493", // Deep Pink
  "#DB7093", // Pale Violet Red

  // Browns
  "#A52A2A", // Brown
  "#8B4513", // Saddle Brown
  "#D2691E", // Chocolate
  "#CD853F", // Peru

  // Grays
  "#808080", // Gray
  "#A9A9A9", // Dark Gray
  "#D3D3D3", // Light Gray
];
