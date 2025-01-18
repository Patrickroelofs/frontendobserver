import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_featured_blog_posts" RENAME TO "pages_blocks_blog_posts";
  ALTER TABLE "pages_blocks_blog_posts" DROP CONSTRAINT "pages_blocks_featured_blog_posts_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_featured_blog_posts_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_featured_blog_posts_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_featured_blog_posts_path_idx";
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "button_text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "button_link" DROP NOT NULL;
  ALTER TABLE "pages_blocks_blog_posts" ALTER COLUMN "limit" SET DEFAULT 0;
  ALTER TABLE "pages_blocks_blog_posts" ALTER COLUMN "limit" SET NOT NULL;
  ALTER TABLE "pages_blocks_title_with_blocks" ALTER COLUMN "button_text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_title_with_blocks" ALTER COLUMN "button_link" DROP NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "show_button" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_blog_posts" ADD COLUMN "only_featured" boolean DEFAULT false NOT NULL;
  ALTER TABLE "pages_blocks_blog_posts" ADD COLUMN "paginate" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_title_with_blocks" ADD COLUMN "show_button" boolean DEFAULT false;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_blog_posts" ADD CONSTRAINT "pages_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_blog_posts_order_idx" ON "pages_blocks_blog_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_blog_posts_parent_id_idx" ON "pages_blocks_blog_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_blog_posts_path_idx" ON "pages_blocks_blog_posts" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_posts" RENAME TO "pages_blocks_featured_blog_posts";
  ALTER TABLE "pages_blocks_featured_blog_posts" DROP CONSTRAINT "pages_blocks_blog_posts_parent_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_blog_posts_order_idx";
  DROP INDEX IF EXISTS "pages_blocks_blog_posts_parent_id_idx";
  DROP INDEX IF EXISTS "pages_blocks_blog_posts_path_idx";
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "button_text" SET NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "button_link" SET NOT NULL;
  ALTER TABLE "pages_blocks_featured_blog_posts" ALTER COLUMN "limit" SET DEFAULT 3;
  ALTER TABLE "pages_blocks_featured_blog_posts" ALTER COLUMN "limit" DROP NOT NULL;
  ALTER TABLE "pages_blocks_title_with_blocks" ALTER COLUMN "button_text" SET NOT NULL;
  ALTER TABLE "pages_blocks_title_with_blocks" ALTER COLUMN "button_link" SET NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_featured_blog_posts" ADD CONSTRAINT "pages_blocks_featured_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_posts_order_idx" ON "pages_blocks_featured_blog_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_posts_parent_id_idx" ON "pages_blocks_featured_blog_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_featured_blog_posts_path_idx" ON "pages_blocks_featured_blog_posts" USING btree ("_path");
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN IF EXISTS "show_button";
  ALTER TABLE "pages_blocks_featured_blog_posts" DROP COLUMN IF EXISTS "only_featured";
  ALTER TABLE "pages_blocks_featured_blog_posts" DROP COLUMN IF EXISTS "paginate";
  ALTER TABLE "pages_blocks_title_with_blocks" DROP COLUMN IF EXISTS "show_button";`)
}
