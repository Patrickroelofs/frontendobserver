import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_blog_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_id" integer
  );
  
  DROP TABLE "authors_socials" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_blog_list" ADD CONSTRAINT "pages_blocks_blog_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_blog_list_order_idx" ON "pages_blocks_blog_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_blog_list_parent_id_idx" ON "pages_blocks_blog_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_blog_list_path_idx" ON "pages_blocks_blog_list" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_blog_id_idx" ON "pages_rels" USING btree ("blog_id");
  ALTER TABLE "authors" DROP COLUMN IF EXISTS "bio";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "excerpt";
  DROP TYPE "public"."enum_authors_socials_platform";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_authors_socials_platform" AS ENUM('website', 'linkedin', 'youtube', 'github');
  CREATE TABLE IF NOT EXISTS "authors_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_authors_socials_platform",
  	"url" varchar
  );
  
  DROP TABLE "pages_blocks_blog_list" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  ALTER TABLE "authors" ADD COLUMN "bio" jsonb;
  ALTER TABLE "footer" ADD COLUMN "excerpt" varchar NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "authors_socials" ADD CONSTRAINT "authors_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "authors_socials_order_idx" ON "authors_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "authors_socials_parent_id_idx" ON "authors_socials" USING btree ("_parent_id");`)
}
