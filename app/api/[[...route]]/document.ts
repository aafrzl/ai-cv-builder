import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  createDocumentTableSchema,
  DocumentSchema,
  documentTable,
  updateCombinedSchema,
  UpdateDocumentSchema,
} from "@/db/schema/document";
import { getAuthUser } from "@/lib/kinde";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/db";
import { and, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import {
  educationTable,
  experienceTable,
  personalInfoTable,
  skillsTable,
} from "@/db/schema";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", createDocumentTableSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { title } = c.req.valid("json") as DocumentSchema;
        const userId = user.id;
        const authorName = `${user.given_name} ${user.family_name}`;
        const authorEmail = user.email as string;
        const documentId = generateDocUUID();

        const newDoc = {
          title: title,
          userId: userId,
          documentId: documentId,
          authorName: authorName,
          authorEmail: authorEmail,
        };

        const [data] = await db
          .insert(documentTable)
          .values(newDoc)
          .returning();

        return c.json(
          {
            success: "ok",
            data: data,
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return c.json(
          { success: false, message: "Internal Server Error", error: error },
          500
        );
      }
    }
  )
  .patch(
    "/update/:documentId",
    getAuthUser,
    zValidator("param", z.object({ documentId: z.string() })),
    zValidator("json", updateCombinedSchema),
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");

        const {
          title,
          status,
          summary,
          thumbnail,
          themeColor,
          currentPosition,
          personalInfo,
          education,
          experience,
          skills,
        } = c.req.valid("json");

        const userId = user.id;

        if (!documentId) {
          return c.json({ error: "Document ID is required" }, 400);
        }

        await db.transaction(async (trx) => {
          const [existingDocument] = await trx
            .select()
            .from(documentTable)
            .where(
              and(
                eq(documentTable.documentId, documentId),
                eq(documentTable.userId, userId)
              )
            );

          if (!existingDocument) {
            return c.json({ error: "Document not found" }, 404);
          }

          const resumeUpdate = {} as UpdateDocumentSchema;

          if (title) resumeUpdate.title = title;
          if (thumbnail) resumeUpdate.thumbnail = thumbnail;
          if (summary) resumeUpdate.summary = summary;
          if (themeColor) resumeUpdate.themeColor = themeColor;
          if (status) resumeUpdate.status = status;
          if (currentPosition)
            resumeUpdate.currentPosition = currentPosition || 1;

          if (Object.keys(resumeUpdate)?.length > 0) {
            await trx
              .update(documentTable)
              .set(resumeUpdate)
              .where(
                and(
                  eq(documentTable.documentId, documentId),
                  eq(documentTable.userId, userId)
                )
              )
              .returning();
          }

          if (personalInfo) {
            if (!personalInfo?.firstName && !personalInfo.lastName) {
              return;
            }

            const exists = await trx
              .select()
              .from(personalInfoTable)
              .where(eq(personalInfoTable.docId, existingDocument.id))
              .limit(1);

            if (exists.length > 0) {
              await trx
                .update(personalInfoTable)
                .set(personalInfo)
                .where(eq(personalInfoTable.docId, existingDocument.id));
            } else {
              await trx.insert(personalInfoTable).values({
                docId: existingDocument.id,
                ...personalInfo,
              });
            }
          }

          if (experience && Array.isArray(experience)) {
            const existingExperience = await trx
              .select()
              .from(experienceTable)
              .where(eq(experienceTable.docId, existingDocument.id));

            // Create a map of existing experience
            const existingExperienceMap = new Set(
              existingExperience.map((exp) => exp.id)
            );

            // Loop through the new experience
            for (const exp of experience) {
              const { id, ...data } = exp;
              if (id !== undefined && existingExperienceMap.has(id)) {
                await trx
                  .update(experienceTable)
                  .set(data)
                  .where(
                    and(
                      eq(experienceTable.docId, existingDocument.id),
                      eq(experienceTable.id, id)
                    )
                  );
              } else {
                await trx.insert(experienceTable).values({
                  docId: existingDocument.id,
                  ...data,
                });
              }
            }
          }

          if (education && Array.isArray(education)) {
            const existingEducation = await trx
              .select()
              .from(educationTable)
              .where(eq(educationTable.docId, existingDocument.id));

            // Create a map of existing education
            const existingEducationMap = new Set(
              existingEducation.map((exp) => exp.id)
            );

            // Loop through the new education
            for (const edu of education) {
              const { id, ...data } = edu;
              if (id !== undefined && existingEducationMap.has(id)) {
                await trx
                  .update(educationTable)
                  .set(data)
                  .where(
                    and(
                      eq(educationTable.docId, existingDocument.id),
                      eq(educationTable.id, id)
                    )
                  );
              } else {
                await trx.insert(educationTable).values({
                  docId: existingDocument.id,
                  ...data,
                });
              }
            }
          }

          if (skills && Array.isArray(skills)) {
            const existingSkills = await trx
              .select()
              .from(skillsTable)
              .where(eq(skillsTable.docId, existingDocument.id));

            const exsistingSkillsMap = new Set(
              existingSkills.map((skill) => skill.id)
            );

            for (const skill of skills) {
              const { id, ...data } = skill;
              if (id !== undefined && exsistingSkillsMap.has(id)) {
                await trx
                  .update(skillsTable)
                  .set(data)
                  .where(
                    and(
                      eq(skillsTable.docId, existingDocument.id),
                      eq(skillsTable.id, id)
                    )
                  );
              } else {
                await trx.insert(skillsTable).values({
                  docId: existingDocument.id,
                  ...data,
                });
              }
            }
          }
        });

        return c.json({ success: true, message: "Updated successfully" });
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
  )
  .get("all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      const documents = await db
        .select()
        .from(documentTable)
        .orderBy(desc(documentTable.createdAt))
        .where(
          and(
            eq(documentTable.userId, userId),
            ne(documentTable.status, "archived")
          )
        );

      return c.json({
        success: true,
        data: documents,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Internal Server Error",
          error: error,
        },
        500
      );
    }
  })
  .get(
    "/:documentId",
    zValidator("param", z.object({ documentId: z.string() })),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");

        const userId = user.id;
        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.documentId, documentId),
            eq(documentTable.userId, userId)
          ),
          with: {
            personalInfo: true,
            experience: true,
            education: true,
            skills: true,
          },
        });

        return c.json({
          success: true,
          data: documentData,
        });
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

export default documentRoute;
