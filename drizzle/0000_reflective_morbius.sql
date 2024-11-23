CREATE TYPE "public"."status" AS ENUM('archived', 'private', 'public');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "document" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"summary" text,
	"theme_color" varchar(7) NOT NULL,
	"thumbnail" text,
	"current_position" integer DEFAULT 1 NOT NULL,
	"status" "status" DEFAULT 'private' NOT NULL,
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "document_document_id_unique" UNIQUE("document_id")
);
