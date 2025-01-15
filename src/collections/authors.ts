import { type CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { slugField } from '@/fields/slug'

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isCompany'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'isCompany',
      type: 'checkbox',
      label: 'This author is a company.',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      trackingField: 'name',
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
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
          console.warn(`Page revalidating at: /author/${doc.slug}`)
          revalidatePath(`/author/${doc.slug}`)
        }
      },
    ],
  },
}

export { Authors }
