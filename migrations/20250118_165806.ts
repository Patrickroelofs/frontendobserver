import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_state" AS ENUM('draft', 'published');
  ALTER TABLE "blog" ADD COLUMN "state" "enum_blog_state" DEFAULT 'draft' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog" DROP COLUMN IF EXISTS "state";
  DROP TYPE "public"."enum_blog_state";`)
}
