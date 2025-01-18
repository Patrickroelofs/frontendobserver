import { type CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { draftMode } from 'next/headers'
import { slugField } from '@/fields/slug'
import { isAdmin } from '@/util/permissionsHandler'
import { HeroBlock } from '@/blocks/Hero/heroBlock'
import { AboutSectionBlock } from '@/blocks/AboutSection/aboutSectionBlock'
import { TitleWithBlocksBlock } from '@/blocks/TitleWithBlocks/titleWithBlocksBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: () => true,
  },
  admin: {
    group: 'Content',
    description: 'A page on the website',
    useAsTitle: 'title',
    livePreview: {
      url: async ({ data }) => {
        const draft = await draftMode()
        draft.enable()

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- This is a template string
        return `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}${data.slug !== 'home' ? `/${data.slug ?? ''}` : '/'}`
      },
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    slugField({
      trackingField: 'title',
    }),
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [HeroBlock, AboutSectionBlock, TitleWithBlocksBlock],
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
  hooks: {
    afterChange: [
      ({
        doc,
      }: {
        doc: {
          slug: string
        }
      }) => {
        if (doc.slug) {
          console.warn(`Page revalidating at: /${doc.slug}`)
          if (doc.slug === 'home') {
            revalidatePath('/')
          } else {
            revalidatePath(`/${doc.slug}`)
          }
        }
      },
    ],
  },
}
