import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { SiteSettings } from '@/globals/siteSettings'
import { type Blog, type Page } from '@/payload-types'
import { PagesCollection } from '@/collections/pagesCollection'
import { ShowcaseCollection } from '@/collections/showcaseCollection'
import { BlogCollection } from '@/collections/blogCollection'
import { AuthorsCollection } from '@/collections/authorsCollection'
import { UsersCollection } from '@/collections/usersCollection'
import { MediaCollection } from '@/collections/mediaCollection'
import { UpdateMediaCollectionTask } from '@/jobs/tasks/updateMediaCollectionTask'
import { CreateMediaCollectionTask } from '@/jobs/tasks/createMediaCollectionTask'
import { ScreenshotWebpageTask } from '@/jobs/tasks/screenshotWebpageTask'
import { CreateScreenshotAndUpdateMediaWorkflow } from '@/jobs/workflows/createScreenshotAndUpdateMediaWorkflow'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // livePreview: {
    //   collections: [PagesCollection.slug, BlogCollection.slug],
    //   url: async ({ data, collectionConfig, req }) => {
    //     if (typeof collectionConfig === 'undefined') {
    //       throw new Error(
    //         'Collection config is undefined, something went wrong setting up the live preview',
    //       )
    //     }
    //
    //     const draft = await draftMode()
    //     draft.enable()
    //
    //     const httpProtocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
    //     const collectionPath = collectionConfig.slug === 'pages' ? '' : `/${collectionConfig.slug}`
    //     const dataPath = data.slug === 'home' ? '' : `/${String(data.slug)}`
    //
    //     return `${httpProtocol}${req.host}${collectionPath}${dataPath}`
    //   },
    // },
  },
  jobs: {
    tasks: [ScreenshotWebpageTask, UpdateMediaCollectionTask, CreateMediaCollectionTask],
    workflows: [CreateScreenshotAndUpdateMediaWorkflow],
  },
  collections: [
    PagesCollection,
    ShowcaseCollection,
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
      collections: ['pages', 'blog'],
      uploadsCollection: 'media',
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
