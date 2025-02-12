import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_blocks_code" ALTER COLUMN "spacing" SET DEFAULT 'py-4';
  ALTER TABLE "_blog_v_blocks_code" ALTER COLUMN "spacing" SET DEFAULT 'py-4';
  ALTER TABLE "authors" DROP COLUMN IF EXISTS "is_company";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_blocks_code" ALTER COLUMN "spacing" SET DEFAULT '';
  ALTER TABLE "_blog_v_blocks_code" ALTER COLUMN "spacing" SET DEFAULT '';
  ALTER TABLE "authors" ADD COLUMN "is_company" boolean DEFAULT false;`)
}
