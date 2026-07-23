-- Bootstrap messages table for Vercel Postgres
DO $$ BEGIN
  CREATE TYPE "public"."message_status" AS ENUM('unread', 'read');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "first_name" text NOT NULL,
  "last_name" text DEFAULT '' NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "subject" text NOT NULL,
  "body" text NOT NULL,
  "status" "public"."message_status" DEFAULT 'unread' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);
