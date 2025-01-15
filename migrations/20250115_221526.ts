import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" ADD COLUMN "cover_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "authors" ADD CONSTRAINT "authors_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "authors_cover_image_idx" ON "authors" USING btree ("cover_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" DROP CONSTRAINT "authors_cover_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "authors_cover_image_idx";
  ALTER TABLE "authors" DROP COLUMN IF EXISTS "cover_image_id";`)
}
