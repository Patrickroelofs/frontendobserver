import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About' NOT NULL,
  	"content" jsonb NOT NULL,
  	"button_text" varchar NOT NULL,
  	"button_link" varchar NOT NULL,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_about_section" ADD CONSTRAINT "pages_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_section_order_idx" ON "pages_blocks_about_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_section_parent_id_idx" ON "pages_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_section_path_idx" ON "pages_blocks_about_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_about_section" CASCADE;`)
}
