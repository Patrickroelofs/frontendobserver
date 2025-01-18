import { type CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
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
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [HeroBlock, AboutSectionBlock, TitleWithBlocksBlock],
    },
  ],
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
