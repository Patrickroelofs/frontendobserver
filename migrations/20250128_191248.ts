import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "showcase_details_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "showcase_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_showcase_v_version_details_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_showcase_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "showcase_details_categories" CASCADE;
  DROP TABLE "showcase_rels" CASCADE;
  DROP TABLE "_showcase_v_version_details_categories" CASCADE;
  DROP TABLE "_showcase_v_rels" CASCADE;
  ALTER TABLE "showcase" RENAME COLUMN "name" TO "title";
  ALTER TABLE "showcase" RENAME COLUMN "details_screenshot_id" TO "image_id";
  ALTER TABLE "_showcase_v" RENAME COLUMN "version_name" TO "version_title";
  ALTER TABLE "_showcase_v" RENAME COLUMN "version_details_screenshot_id" TO "version_image_id";
  ALTER TABLE "showcase" DROP CONSTRAINT "showcase_details_screenshot_id_media_id_fk";
  
  ALTER TABLE "_showcase_v" DROP CONSTRAINT "_showcase_v_version_details_screenshot_id_media_id_fk";
  
  DROP INDEX IF EXISTS "showcase_details_details_screenshot_idx";
  DROP INDEX IF EXISTS "_showcase_v_version_details_version_details_screenshot_idx";
  DO $$ BEGIN
   ALTER TABLE "showcase" ADD CONSTRAINT "showcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v" ADD CONSTRAINT "_showcase_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "showcase_image_idx" ON "showcase" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_version_image_idx" ON "_showcase_v" USING btree ("version_image_id");
  ALTER TABLE "showcase" DROP COLUMN IF EXISTS "details_description";
  ALTER TABLE "_showcase_v" DROP COLUMN IF EXISTS "version_details_description";
  DROP TYPE "public"."enum_showcase_details_categories";
  DROP TYPE "public"."enum__showcase_v_version_details_categories";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_showcase_details_categories" AS ENUM('portfolio', 'blog');
  CREATE TYPE "public"."enum__showcase_v_version_details_categories" AS ENUM('portfolio', 'blog');
  CREATE TABLE IF NOT EXISTS "showcase_details_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_showcase_details_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "showcase_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_showcase_v_version_details_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__showcase_v_version_details_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_showcase_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  ALTER TABLE "showcase" RENAME COLUMN "title" TO "name";
  ALTER TABLE "showcase" RENAME COLUMN "image_id" TO "details_screenshot_id";
  ALTER TABLE "_showcase_v" RENAME COLUMN "version_title" TO "version_name";
  ALTER TABLE "_showcase_v" RENAME COLUMN "version_image_id" TO "version_details_screenshot_id";
  ALTER TABLE "showcase" DROP CONSTRAINT "showcase_image_id_media_id_fk";
  
  ALTER TABLE "_showcase_v" DROP CONSTRAINT "_showcase_v_version_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "showcase_image_idx";
  DROP INDEX IF EXISTS "_showcase_v_version_version_image_idx";
  ALTER TABLE "showcase" ADD COLUMN "details_description" varchar;
  ALTER TABLE "_showcase_v" ADD COLUMN "version_details_description" varchar;
  DO $$ BEGIN
   ALTER TABLE "showcase_details_categories" ADD CONSTRAINT "showcase_details_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase_rels" ADD CONSTRAINT "showcase_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase_rels" ADD CONSTRAINT "showcase_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v_version_details_categories" ADD CONSTRAINT "_showcase_v_version_details_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_showcase_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v_rels" ADD CONSTRAINT "_showcase_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_showcase_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v_rels" ADD CONSTRAINT "_showcase_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "showcase_details_categories_order_idx" ON "showcase_details_categories" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "showcase_details_categories_parent_idx" ON "showcase_details_categories" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_rels_order_idx" ON "showcase_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "showcase_rels_parent_idx" ON "showcase_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_rels_path_idx" ON "showcase_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "showcase_rels_authors_id_idx" ON "showcase_rels" USING btree ("authors_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_details_categories_order_idx" ON "_showcase_v_version_details_categories" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_details_categories_parent_idx" ON "_showcase_v_version_details_categories" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_rels_order_idx" ON "_showcase_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_showcase_v_rels_parent_idx" ON "_showcase_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_rels_path_idx" ON "_showcase_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_showcase_v_rels_authors_id_idx" ON "_showcase_v_rels" USING btree ("authors_id");
  DO $$ BEGIN
   ALTER TABLE "showcase" ADD CONSTRAINT "showcase_details_screenshot_id_media_id_fk" FOREIGN KEY ("details_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_showcase_v" ADD CONSTRAINT "_showcase_v_version_details_screenshot_id_media_id_fk" FOREIGN KEY ("version_details_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "showcase_details_details_screenshot_idx" ON "showcase" USING btree ("details_screenshot_id");
  CREATE INDEX IF NOT EXISTS "_showcase_v_version_details_version_details_screenshot_idx" ON "_showcase_v" USING btree ("version_details_screenshot_id");`)
}
