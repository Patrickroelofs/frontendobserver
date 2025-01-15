import { type CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { slugField } from '@/fields/slug'
import { Container } from '@/blocks/container'
import { isAdmin } from '@/util/permissionsHandler'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: () => true,
  },
  admin: {
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
      blocks: [Container],
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
