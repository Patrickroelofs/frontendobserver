import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "third_party_username_idx";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "email";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "username";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "reset_password_token";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "reset_password_expiration";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "salt";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "hash";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "login_attempts";
  ALTER TABLE "third_party" DROP COLUMN IF EXISTS "lock_until";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "third_party" ADD COLUMN "email" varchar;
  ALTER TABLE "third_party" ADD COLUMN "username" varchar NOT NULL;
  ALTER TABLE "third_party" ADD COLUMN "reset_password_token" varchar;
  ALTER TABLE "third_party" ADD COLUMN "reset_password_expiration" timestamp(3) with time zone;
  ALTER TABLE "third_party" ADD COLUMN "salt" varchar;
  ALTER TABLE "third_party" ADD COLUMN "hash" varchar;
  ALTER TABLE "third_party" ADD COLUMN "login_attempts" numeric DEFAULT 0;
  ALTER TABLE "third_party" ADD COLUMN "lock_until" timestamp(3) with time zone;
  CREATE UNIQUE INDEX IF NOT EXISTS "third_party_username_idx" ON "third_party" USING btree ("username");`)
}
