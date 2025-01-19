import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog" RENAME COLUMN "name" TO "title";
  ALTER TABLE "blog" RENAME COLUMN "excerpt" TO "description";
  ALTER TABLE "_blog_v" RENAME COLUMN "version_name" TO "version_title";
  ALTER TABLE "_blog_v" RENAME COLUMN "version_excerpt" TO "version_description";
  ALTER TABLE "pages" ADD COLUMN "description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "blog" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "blog" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "blog" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "_blog_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_blog_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "_blog_v" ADD COLUMN "version_meta_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog" ADD CONSTRAINT "blog_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX IF NOT EXISTS "blog_meta_meta_image_idx" ON "blog" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_v_version_meta_version_meta_image_idx" ON "_blog_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog" RENAME COLUMN "title" TO "name";
  ALTER TABLE "blog" RENAME COLUMN "description" TO "excerpt";
  ALTER TABLE "_blog_v" RENAME COLUMN "version_title" TO "version_name";
  ALTER TABLE "_blog_v" RENAME COLUMN "version_description" TO "version_excerpt";
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "blog" DROP CONSTRAINT "blog_meta_image_id_media_id_fk";
  
  ALTER TABLE "_blog_v" DROP CONSTRAINT "_blog_v_version_meta_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "blog_meta_meta_image_idx";
  DROP INDEX IF EXISTS "_blog_v_version_meta_version_meta_image_idx";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_image_id";
  ALTER TABLE "blog" DROP COLUMN IF EXISTS "meta_title";
  ALTER TABLE "blog" DROP COLUMN IF EXISTS "meta_description";
  ALTER TABLE "blog" DROP COLUMN IF EXISTS "meta_image_id";
  ALTER TABLE "_blog_v" DROP COLUMN IF EXISTS "version_meta_title";
  ALTER TABLE "_blog_v" DROP COLUMN IF EXISTS "version_meta_description";
  ALTER TABLE "_blog_v" DROP COLUMN IF EXISTS "version_meta_image_id";`)
}
