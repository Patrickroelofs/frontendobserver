import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { AuthorsCollection } from "@/collections/authors";
import { BlogCollection } from "@/collections/blog";
import { MediaCollection } from "@/collections/media";
import { PagesCollection } from "@/collections/pages";
import { UsersCollection } from "@/collections/users";
import { SiteSettings } from "@/globals/siteSettings";
import type { Blog, Page } from "@/payload-types";
import { seoPlugin } from "@payloadcms/plugin-seo";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    PagesCollection,
    BlogCollection,
    AuthorsCollection,
    UsersCollection,
    MediaCollection,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  graphQL: {
    disable: true,
    disablePlaygroundInProduction: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.IS_BUILD === "true"
          ? process.env.DATABASE_PUBLIC_URL
          : process.env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: [PagesCollection.slug, BlogCollection.slug],
      uploadsCollection: MediaCollection.slug,
      interfaceName: "SeoType",
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const { title } = doc as Page | Blog;

        return `${String(title)} | Frontend Observer`;
      },
      generateDescription: ({ doc }) => {
        const { description } = doc as Page | Blog;

        return String(description);
      },
    }),
  ],
});
