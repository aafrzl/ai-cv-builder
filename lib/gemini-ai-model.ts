"use server";
import {
  GenerationConfig,
  GoogleGenerativeAI,
  ResponseSchema,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_URL as string;
const genAI = new GoogleGenerativeAI(apiKey);

export const AIGenerate = async (prompt: string, type: string) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    systemInstruction:
      type === "summary"
        ? "Job Title: {JobTitle}. Based on the job title, please generate concise \nand complete summaries for my resume in JSON format, incorporating the following experience\nlevels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines,\nreflecting a personal tone and showcasing specific relevant programming languages, technologies,\nframeworks, and methodologies without any placeholders or gaps. Ensure that the summaries are\nengaging and tailored to highlight unique strengths, aspirations, and contributions to collaborative\nprojects, demonstrating a clear understanding of the role and industry standards."
        : 'Given the job title "{jobTitle}", create 6-7 concise and personal bullet points in HTML stringify format that highlight my key skills, relevant technologies, and significant contributions in that role. Do not include the job title itself in the output. Provide only the bullet points inside an unordered list.',
  });

  let generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: type === "summary" ? "application/json" : "text/plain",
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
