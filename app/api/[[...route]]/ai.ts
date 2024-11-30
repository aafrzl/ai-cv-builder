import { AIGenerate } from "@/lib/gemini-ai-model";
import { getAuthUser } from "@/lib/kinde";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const aiRoute = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      prompt: z.string().min(1),
      type: z.enum(["summary", "experience"]),
    })
  ),
  getAuthUser,
  async (c) => {
    try {
      const { prompt, type } = c.req.valid("json") as {
        prompt: string;
        type: string;
      };

      if (!prompt) {
        return c.json(
          {
            success: false,
            message: "Prompt is required",
          },
          400
        );
      }

      if (!type || !["summary", "experience"].includes(type)) {
        return c.json(
          {
            success: false,
            message:
              "Type is required and must be either 'summary' or 'experience'",
          },
          400
        );
      }

      const response = await AIGenerate(prompt, type);

      return c.json({ success: true, data: response }, { status: 200 });
    } catch (error) {
      console.error(error);
      return c.json(
        {
          success: false,
          message: "Internal Server Error",
          error: error,
        },
        500
      );
    }
  }
);

export default aiRoute;
