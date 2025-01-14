import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'author');
  CREATE TABLE IF NOT EXISTS "pages_blocks_simple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "image_id" integer NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_simple_text" ADD CONSTRAINT "pages_blocks_simple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_order_idx" ON "pages_blocks_simple_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_parent_id_idx" ON "pages_blocks_simple_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_path_idx" ON "pages_blocks_simple_text" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_image_idx" ON "users" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_simple_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_simple_text" CASCADE;
  DROP TABLE "pages" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX IF EXISTS "users_image_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";
  DROP TYPE "public"."enum_users_role";`)
}
