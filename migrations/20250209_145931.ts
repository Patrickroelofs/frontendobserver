import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE IF EXISTS "third_party" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "third_party" CASCADE;

  DROP INDEX IF EXISTS "_pages_v_autosave_idx";
  DROP INDEX IF EXISTS "_showcase_v_autosave_idx";
  DROP INDEX IF EXISTS "_blog_v_autosave_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_third_party_id_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_third_party_id_idx";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "autosave";
  ALTER TABLE "_showcase_v" DROP COLUMN IF EXISTS "autosave";
  ALTER TABLE "_blog_v" DROP COLUMN IF EXISTS "autosave";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "third_party_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN IF EXISTS "third_party_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "third_party" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  ALTER TABLE "_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_showcase_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_blog_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "third_party_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "third_party_id" integer;
  CREATE INDEX IF NOT EXISTS "third_party_updated_at_idx" ON "third_party" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "third_party_created_at_idx" ON "third_party" USING btree ("created_at");
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
  
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_showcase_v_autosave_idx" ON "_showcase_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_v_autosave_idx" ON "_blog_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_third_party_id_idx" ON "payload_locked_documents_rels" USING btree ("third_party_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_third_party_id_idx" ON "payload_preferences_rels" USING btree ("third_party_id");`)
}
