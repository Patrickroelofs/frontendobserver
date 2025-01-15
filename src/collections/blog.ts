import { type CollectionConfig, type CollectionSlug, type Field } from 'payload'
import { revalidatePath } from 'next/cache'
import { slugField } from '@/fields/slug'
import { Authors } from '@/collections/authors'
import { RichText } from '@/blocks/richText'

const Sidebar: Field[] = [
  {
    name: 'featured',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      position: 'sidebar',
      description: 'This will be featured on the homepage',
    },
  },
  slugField({
    trackingField: 'name',
  }),
  {
    name: 'authors',
    type: 'relationship',
    relationTo: Authors.slug as CollectionSlug,
    required: true,
    hasMany: true,
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
  },
]

const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    ...Sidebar,
    {
      name: 'name',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [RichText],
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
          console.warn(`Page revalidating at: /blog/${doc.slug}`)
          revalidatePath(`/blog/${doc.slug}`)
        }
      },
    ],
  },
}

export { Blog }
