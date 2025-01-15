import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "showcase_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_simple_text" CASCADE;
  DROP TABLE "showcase_blocks_simple_text" CASCADE;
  ALTER TABLE "media" ADD COLUMN "blur_data" varchar;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase_blocks_rich_text" ADD CONSTRAINT "showcase_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_blocks_rich_text" ADD CONSTRAINT "blog_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_rich_text_order_idx" ON "showcase_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_rich_text_parent_id_idx" ON "showcase_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_rich_text_path_idx" ON "showcase_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_blocks_rich_text_order_idx" ON "blog_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_blocks_rich_text_parent_id_idx" ON "blog_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_blocks_rich_text_path_idx" ON "blog_blocks_rich_text" USING btree ("_path");
  ALTER TABLE "blog" DROP COLUMN IF EXISTS "content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_simple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "showcase_blocks_simple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "showcase_blocks_rich_text" CASCADE;
  DROP TABLE "blog_blocks_rich_text" CASCADE;
  ALTER TABLE "blog" ADD COLUMN "content" jsonb NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_simple_text" ADD CONSTRAINT "pages_blocks_simple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase_blocks_simple_text" ADD CONSTRAINT "showcase_blocks_simple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_order_idx" ON "pages_blocks_simple_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_parent_id_idx" ON "pages_blocks_simple_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_path_idx" ON "pages_blocks_simple_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_simple_text_order_idx" ON "showcase_blocks_simple_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_simple_text_parent_id_idx" ON "showcase_blocks_simple_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_simple_text_path_idx" ON "showcase_blocks_simple_text" USING btree ("_path");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "blur_data";`)
}
