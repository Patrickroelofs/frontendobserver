import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" ALTER COLUMN "short_bio" SET DEFAULT 'I''''m an author on this site.';`)

  await db.execute(sql`
    UPDATE "authors" SET "short_bio" = 'I''m an author on this site.' WHERE "short_bio" IS NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" ALTER COLUMN "short_bio" DROP DEFAULT;`)
}
