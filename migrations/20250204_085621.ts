import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "third_party" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar,
  	"username" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "third_party_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "third_party_id" integer;
  CREATE INDEX IF NOT EXISTS "third_party_updated_at_idx" ON "third_party" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "third_party_created_at_idx" ON "third_party" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "third_party_username_idx" ON "third_party" USING btree ("username");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_third_party_fk" FOREIGN KEY ("third_party_id") REFERENCES "public"."third_party"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_third_party_fk" FOREIGN KEY ("third_party_id") REFERENCES "public"."third_party"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_third_party_id_idx" ON "payload_locked_documents_rels" USING btree ("third_party_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_third_party_id_idx" ON "payload_preferences_rels" USING btree ("third_party_id");
  ALTER TABLE "users" DROP COLUMN IF EXISTS "permissions";
  DROP TYPE "public"."enum_users_permissions";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_permissions" AS ENUM('readonly', 'admin');
  ALTER TABLE "third_party" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "third_party" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_third_party_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_third_party_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_third_party_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_third_party_id_idx";
  ALTER TABLE "users" ADD COLUMN "permissions" "enum_users_permissions" DEFAULT 'readonly' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "third_party_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN IF EXISTS "third_party_id";`)
}
