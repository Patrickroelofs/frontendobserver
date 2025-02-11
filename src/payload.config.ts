import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { SiteSettings } from '@/globals/siteSettings'
import { UsersCollection } from '@/collections/users'
import { PagesCollection } from '@/collections/pages'
import { BlogCollection } from '@/collections/blog'
import { AuthorsCollection } from '@/collections/authors'
import { MediaCollection } from '@/collections/media'
import { type Blog, type Page } from '@/payload-types'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
  secret: process.env.PAYLOAD_SECRET ?? '',
  graphQL: {
    disable: true,
    disablePlaygroundInProduction: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL ?? '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN ?? '',
    }),
    seoPlugin({
      collections: [PagesCollection.slug, BlogCollection.slug],
      uploadsCollection: MediaCollection.slug,
      interfaceName: 'SeoType',
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const { title } = doc as Page | Blog

        return `${String(title)} | Frontend Observer`
      },
      generateDescription: ({ doc }) => {
        const { description } = doc as Page | Blog

        return String(description)
      },
    }),
  ],
})
