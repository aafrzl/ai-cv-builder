import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";
import documentRoute from "./document";
import aiRoute from "./ai";

export const runtime = "edge";

const app = new Hono();

app.use("*", logger());

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: "Internal Server Error" }, 500);
});

const routes = app
  .basePath("/api")
  .route("/document", documentRoute)
  .route("/ai", aiRoute);

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

export type AppType = typeof routes;

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
