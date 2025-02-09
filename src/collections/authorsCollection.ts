import { type CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { slugField } from '@/fields/slug'

const AuthorsCollection: CollectionConfig = {
  slug: 'authors',
  access: {
    create: () => true,
    delete: () => true,
    update: () => true,
    read: () => true,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    description: 'Authors of articles, blog posts, etc.',
    defaultColumns: ['name', 'isCompany'],
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
    {
      name: 'shortBio',
      type: 'textarea',
      required: true,
      defaultValue: "I'm an author on this site.",
    },
    {
      name: 'bio',
      type: 'richText',
      required: false,
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
          revalidatePath('/', 'layout')
        }
      },
    ],
  },
}

export { AuthorsCollection }
