import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" ADD COLUMN "short_bio" varchar NOT NULL DEFAULT 'I''m an author on this site.';
  ALTER TABLE "authors" ADD COLUMN "bio" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" DROP COLUMN IF EXISTS "short_bio";
  ALTER TABLE "authors" DROP COLUMN IF EXISTS "bio";`)
}
