import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_container_spacing" AS ENUM('py-4', 'py-8', 'py-16', 'py-24', 'py-32', 'py-48', 'py-64', '');
  CREATE TYPE "public"."enum_showcase_details_categories" AS ENUM('portfolio', 'blog');
  CREATE TYPE "public"."enum_authors_socials_platform" AS ENUM('website', 'linkedin', 'youtube', 'github');
  CREATE TABLE IF NOT EXISTS "pages_blocks_simple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_container" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_pages_blocks_container_spacing" DEFAULT '' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "showcase_blocks_simple_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "showcase_details_categories" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_showcase_details_categories",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "showcase" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured" boolean DEFAULT false,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"details_screenshot_id" integer,
  	"details_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "showcase_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"featured" boolean DEFAULT false,
  	"slug" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"name" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "authors_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_authors_socials_platform",
  	"url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_company" boolean DEFAULT false,
  	"slug" varchar NOT NULL,
  	"image_id" integer,
  	"name" varchar NOT NULL,
  	"bio" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"showcase_id" integer,
  	"blog_id" integer,
  	"authors_id" integer,
  	"users_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_simple_text" ADD CONSTRAINT "pages_blocks_simple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_container" ADD CONSTRAINT "pages_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase_blocks_simple_text" ADD CONSTRAINT "showcase_blocks_simple_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase_details_categories" ADD CONSTRAINT "showcase_details_categories_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "showcase" ADD CONSTRAINT "showcase_details_screenshot_id_media_id_fk" FOREIGN KEY ("details_screenshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "blog" ADD CONSTRAINT "blog_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_rels" ADD CONSTRAINT "blog_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "authors_socials" ADD CONSTRAINT "authors_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "authors" ADD CONSTRAINT "authors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_showcase_fk" FOREIGN KEY ("showcase_id") REFERENCES "public"."showcase"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_order_idx" ON "pages_blocks_simple_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_parent_id_idx" ON "pages_blocks_simple_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_simple_text_path_idx" ON "pages_blocks_simple_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_container_order_idx" ON "pages_blocks_container" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_container_parent_id_idx" ON "pages_blocks_container" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_container_path_idx" ON "pages_blocks_container" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_simple_text_order_idx" ON "showcase_blocks_simple_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_simple_text_parent_id_idx" ON "showcase_blocks_simple_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_blocks_simple_text_path_idx" ON "showcase_blocks_simple_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "showcase_details_categories_order_idx" ON "showcase_details_categories" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "showcase_details_categories_parent_idx" ON "showcase_details_categories" USING btree ("parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "showcase_slug_idx" ON "showcase" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "showcase_details_details_screenshot_idx" ON "showcase" USING btree ("details_screenshot_id");
  CREATE INDEX IF NOT EXISTS "showcase_updated_at_idx" ON "showcase" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "showcase_created_at_idx" ON "showcase" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "showcase_rels_order_idx" ON "showcase_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "showcase_rels_parent_idx" ON "showcase_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "showcase_rels_path_idx" ON "showcase_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "showcase_rels_authors_id_idx" ON "showcase_rels" USING btree ("authors_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_cover_image_idx" ON "blog" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_rels_order_idx" ON "blog_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_rels_parent_idx" ON "blog_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_rels_path_idx" ON "blog_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_rels_authors_id_idx" ON "blog_rels" USING btree ("authors_id");
  CREATE INDEX IF NOT EXISTS "authors_socials_order_idx" ON "authors_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "authors_socials_parent_id_idx" ON "authors_socials" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "authors_slug_idx" ON "authors" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "authors_image_idx" ON "authors" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_showcase_id_idx" ON "payload_locked_documents_rels" USING btree ("showcase_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "navigation_items_link_idx" ON "navigation_items" USING btree ("link_id");
  CREATE INDEX IF NOT EXISTS "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "footer_links_link_idx" ON "footer_links" USING btree ("link_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_simple_text" CASCADE;
  DROP TABLE "pages_blocks_container" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "showcase_blocks_simple_text" CASCADE;
  DROP TABLE "showcase_details_categories" CASCADE;
  DROP TABLE "showcase" CASCADE;
  DROP TABLE "showcase_rels" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "blog_rels" CASCADE;
  DROP TABLE "authors_socials" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_container_spacing";
  DROP TYPE "public"."enum_showcase_details_categories";
  DROP TYPE "public"."enum_authors_socials_platform";`)
}
