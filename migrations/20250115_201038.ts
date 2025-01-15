import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_code_spacing" AS ENUM('py-4', 'py-8', 'py-16', 'py-24', 'py-32', 'py-48', 'py-64', '');
  CREATE TYPE "public"."enum_pages_blocks_code_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'polar', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig');
  CREATE TYPE "public"."enum_blog_blocks_code_spacing" AS ENUM('py-4', 'py-8', 'py-16', 'py-24', 'py-32', 'py-48', 'py-64', '');
  CREATE TYPE "public"."enum_blog_blocks_code_code_language" AS ENUM('abap', 'actionscript-3', 'ada', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bat', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'clarity', 'clojure', 'cmake', 'cobol', 'codeowners', 'codeql', 'coffee', 'common-lisp', 'coq', 'cpp', 'crystal', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dotenv', 'dream-maker', 'edge', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erlang', 'fennel', 'fish', 'fluent', 'fortran-fixed-form', 'fortran-free-form', 'fsharp', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'graphql', 'groovy', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hcl', 'hjson', 'hlsl', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'java', 'javascript', 'jinja', 'jison', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kusto', 'latex', 'lean', 'less', 'liquid', 'log', 'logo', 'lua', 'luau', 'make', 'markdown', 'marko', 'matlab', 'mdc', 'mdx', 'mermaid', 'mipsasm', 'mojo', 'move', 'narrat', 'nextflow', 'nginx', 'nim', 'nix', 'nushell', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'php', 'plsql', 'po', 'polar', 'postcss', 'powerquery', 'powershell', 'prisma', 'prolog', 'proto', 'pug', 'puppet', 'purescript', 'python', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'reg', 'regexp', 'rel', 'riscv', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'shaderlab', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'splunk', 'sql', 'ssh-config', 'stata', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'toml', 'ts-tags', 'tsv', 'tsx', 'turtle', 'twig', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'viml', 'vue', 'vue-html', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wikitext', 'wolfram', 'xml', 'xsl', 'yaml', 'zenscript', 'zig');
  CREATE TABLE IF NOT EXISTS "pages_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_pages_blocks_code_spacing" DEFAULT '' NOT NULL,
  	"code_language" "enum_pages_blocks_code_code_language" NOT NULL,
  	"code" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"spacing" "enum_blog_blocks_code_spacing" DEFAULT '' NOT NULL,
  	"code_language" "enum_blog_blocks_code_code_language" NOT NULL,
  	"code" varchar NOT NULL,
  	"block_name" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code" ADD CONSTRAINT "pages_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_blocks_code" ADD CONSTRAINT "blog_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_order_idx" ON "pages_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_parent_id_idx" ON "pages_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_path_idx" ON "pages_blocks_code" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_blocks_code_order_idx" ON "blog_blocks_code" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_blocks_code_parent_id_idx" ON "blog_blocks_code" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_blocks_code_path_idx" ON "blog_blocks_code" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_code" CASCADE;
  DROP TABLE "blog_blocks_code" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_code_spacing";
  DROP TYPE "public"."enum_pages_blocks_code_code_language";
  DROP TYPE "public"."enum_blog_blocks_code_spacing";
  DROP TYPE "public"."enum_blog_blocks_code_code_language";`)
}
