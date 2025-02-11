import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "showcase_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_showcase_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_showcase_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "showcase_blocks_rich_text" CASCADE;
  DROP TABLE "showcase" CASCADE;
  DROP TABLE "_showcase_v_blocks_rich_text" CASCADE;
  DROP TABLE "_showcase_v" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TYPE "public"."enum_showcase_status";
  DROP TYPE "public"."enum__showcase_v_version_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_workflow_slug";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_showcase_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__showcase_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'screenshotWebpageTask', 'updateMediaCollectionTask', 'createMediaCollectionTask');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_workflow_slug" AS ENUM('createScreenshotAndUpdateMediaWorkflow');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'screenshotWebpageTask', 'updateMediaCollectionTask', 'createMediaCollectionTask');
  CREATE TABLE IF NOT EXISTS "showcase_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "showcase" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"url" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_showcase_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_showcase_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_showcase_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_url" varchar,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__showcase_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"workflow_slug" "enum_payload_jobs_workflow_slug",
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "showcase_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  DO $$ BEGIN
   ALTER TABLE "showcase_blocks_rich_text" ADD CONSTRAINT "showcase_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase" ADD CONSTRAINT "showcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v_blocks_rich_text" ADD CONSTRAINT "_showcase_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_showcase_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v" ADD CONSTRAINT "_showcase_v_parent_id_showcase_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."showcase"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v" ADD CONSTRAINT "_showcase_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "showcase_blocks_rich_text_order_idx" ON "showcase_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_rich_text_parent_id_idx" ON "showcase_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_rich_text_path_idx" ON "showcase_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "showcase_slug_idx" ON "showcase" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "showcase_image_idx" ON "showcase" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "showcase_updated_at_idx" ON "showcase" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "showcase_created_at_idx" ON "showcase" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "showcase__status_idx" ON "showcase" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_showcase_v_blocks_rich_text_order_idx" ON "_showcase_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_showcase_v_blocks_rich_text_parent_id_idx" ON "_showcase_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_blocks_rich_text_path_idx" ON "_showcase_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_showcase_v_parent_idx" ON "_showcase_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_version_slug_idx" ON "_showcase_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_version_image_idx" ON "_showcase_v" USING btree ("version_image_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_version_updated_at_idx" ON "_showcase_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_version_created_at_idx" ON "_showcase_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_version__status_idx" ON "_showcase_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_showcase_v_created_at_idx" ON "_showcase_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_showcase_v_updated_at_idx" ON "_showcase_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_showcase_v_latest_idx" ON "_showcase_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX IF NOT EXISTS "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX IF NOT EXISTS "payload_jobs_workflow_slug_idx" ON "payload_jobs" USING btree ("workflow_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX IF NOT EXISTS "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX IF NOT EXISTS "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX IF NOT EXISTS "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX IF NOT EXISTS "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_showcase_fk" FOREIGN KEY ("showcase_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_showcase_id_idx" ON "payload_locked_documents_rels" USING btree ("showcase_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");`)
}
