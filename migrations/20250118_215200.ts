import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_v_blocks_code_spacing" AS ENUM('py-4', 'py-8', 'py-16', 'py-24', 'py-32', 'py-48', 'py-64', '');
  CREATE TYPE "public"."enum__blog_v_blocks_code_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'polar', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig');
  CREATE TYPE "public"."enum__blog_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About',
  	"content" jsonb,
  	"show_button" boolean DEFAULT false,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_blog_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"only_featured" boolean DEFAULT false,
  	"limit" numeric DEFAULT 0,
  	"paginate" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_title_with_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"show_button" boolean DEFAULT false,
  	"button_text" varchar,
  	"button_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"spacing" "enum__blog_v_blocks_code_spacing" DEFAULT '',
  	"code_language" "enum__blog_v_blocks_code_code_language",
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_slug" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_name" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__blog_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_blog_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"authors_id" integer
  );
  
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "pages_blocks_blog_posts" ALTER COLUMN "only_featured" DROP NOT NULL;
  ALTER TABLE "pages_blocks_blog_posts" ALTER COLUMN "limit" DROP NOT NULL;
  ALTER TABLE "pages_blocks_title_with_blocks" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "blog_blocks_code" ALTER COLUMN "spacing" DROP NOT NULL;
  ALTER TABLE "blog_blocks_code" ALTER COLUMN "code_language" DROP NOT NULL;
  ALTER TABLE "blog_blocks_code" ALTER COLUMN "code" DROP NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "date" DROP NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "excerpt" DROP NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "cover_image_id" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "blog" ADD COLUMN "_status" "enum_blog_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_about_section" ADD CONSTRAINT "_pages_v_blocks_about_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_blog_posts" ADD CONSTRAINT "_pages_v_blocks_blog_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_title_with_blocks" ADD CONSTRAINT "_pages_v_blocks_title_with_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v_blocks_rich_text" ADD CONSTRAINT "_blog_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v_blocks_code" ADD CONSTRAINT "_blog_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_parent_id_blog_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v" ADD CONSTRAINT "_blog_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_v_rels" ADD CONSTRAINT "_blog_v_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_section_order_idx" ON "_pages_v_blocks_about_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_section_parent_id_idx" ON "_pages_v_blocks_about_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_section_path_idx" ON "_pages_v_blocks_about_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_blog_posts_order_idx" ON "_pages_v_blocks_blog_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_blog_posts_parent_id_idx" ON "_pages_v_blocks_blog_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_blog_posts_path_idx" ON "_pages_v_blocks_blog_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_with_blocks_order_idx" ON "_pages_v_blocks_title_with_blocks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_with_blocks_parent_id_idx" ON "_pages_v_blocks_title_with_blocks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_title_with_blocks_path_idx" ON "_pages_v_blocks_title_with_blocks" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_v_blocks_rich_text_order_idx" ON "_blog_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_v_blocks_rich_text_parent_id_idx" ON "_blog_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_v_blocks_rich_text_path_idx" ON "_blog_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_v_blocks_code_order_idx" ON "_blog_v_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_v_blocks_code_parent_id_idx" ON "_blog_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_v_blocks_code_path_idx" ON "_blog_v_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blog_v_parent_idx" ON "_blog_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_v_version_version_slug_idx" ON "_blog_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_blog_v_version_version_cover_image_idx" ON "_blog_v" USING btree ("version_cover_image_id");
  CREATE INDEX IF NOT EXISTS "_blog_v_version_version_updated_at_idx" ON "_blog_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_v_version_version_created_at_idx" ON "_blog_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_blog_v_version_version__status_idx" ON "_blog_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_blog_v_created_at_idx" ON "_blog_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_blog_v_updated_at_idx" ON "_blog_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_v_latest_idx" ON "_blog_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_blog_v_autosave_idx" ON "_blog_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_blog_v_rels_order_idx" ON "_blog_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_blog_v_rels_parent_idx" ON "_blog_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_v_rels_path_idx" ON "_blog_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_blog_v_rels_authors_id_idx" ON "_blog_v_rels" USING btree ("authors_id");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "blog__status_idx" ON "blog" USING btree ("_status");
  ALTER TABLE "blog" DROP COLUMN IF EXISTS "state";
  DROP TYPE "public"."enum_blog_state";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_state" AS ENUM('draft', 'published');
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_blog_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_title_with_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blog_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_about_section" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_title_with_blocks" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_blog_v_blocks_rich_text" CASCADE;
  DROP TABLE "_blog_v_blocks_code" CASCADE;
  DROP TABLE "_blog_v" CASCADE;
  DROP TABLE "_blog_v_rels" CASCADE;
  DROP INDEX IF EXISTS "pages__status_idx";
  DROP INDEX IF EXISTS "blog__status_idx";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_about_section" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "pages_blocks_blog_posts" ALTER COLUMN "only_featured" SET NOT NULL;
  ALTER TABLE "pages_blocks_blog_posts" ALTER COLUMN "limit" SET NOT NULL;
  ALTER TABLE "pages_blocks_title_with_blocks" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "blog_blocks_code" ALTER COLUMN "spacing" SET NOT NULL;
  ALTER TABLE "blog_blocks_code" ALTER COLUMN "code_language" SET NOT NULL;
  ALTER TABLE "blog_blocks_code" ALTER COLUMN "code" SET NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "date" SET NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "excerpt" SET NOT NULL;
  ALTER TABLE "blog" ALTER COLUMN "cover_image_id" SET NOT NULL;
  ALTER TABLE "blog" ADD COLUMN "state" "enum_blog_state" DEFAULT 'draft' NOT NULL;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "blog" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum__blog_v_blocks_code_spacing";
  DROP TYPE "public"."enum__blog_v_blocks_code_code_language";
  DROP TYPE "public"."enum__blog_v_version_status";`)
}
