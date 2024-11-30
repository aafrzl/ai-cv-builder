"use server";
import {
  GoogleGenerativeAI,
  GenerationConfig,
  ResponseSchema,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_URL as string;
const genAI = new GoogleGenerativeAI(apiKey);

export const AIGenerate = async (prompt: string, type: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      type === "summary"
        ? "Job Title: {JobTitle}. Based on the job title, please generate concise and complete summaries for my resume in JSON format, incorporating the following experience\nlevels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines, reflecting a personal tone and showcasing specific programming langguages, technologies, and methodologies without any placeholders or gaps. Ensure that the summaries are engaging and tailored to hightlight unique strengths, aspirations, and contributions to collaborative projects, demonstrating a clear understanding of the role and industry standards."
        : "Given the {JobTitle}, create 6-7 concise and personal bullet points in HTML stringify format that hightlight any skills, relevant technologies, and significant contributions in that role. Do not include the job title itself in the output. Provide only the bullet points inside a unordered list.",
  });

  let generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  if (type === "summary") {
    generationConfig = {
      ...generationConfig,
      responseSchema: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                experienceLevel: {
                  type: "string",
                },
                summary: {
                  type: "string",
                },
              },
            },
          },
        },
      } as ResponseSchema,
    };
  }

  const response = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await response.sendMessage(prompt);
  return result.response.text();
};
