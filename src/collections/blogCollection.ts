import { type CollectionConfig, type CollectionSlug, type Field } from 'payload'
import { revalidatePath } from 'next/cache'
import { slugField } from '@/fields/slug'
import { AuthorsCollection } from '@/collections/authorsCollection'
import { RichTextBlock } from '@/blocks/RichText/richTextBlock'
import { CodeBlock } from '@/blocks/Code/codeBlock'

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
    trackingField: 'title',
  }),
  {
    name: 'authors',
    type: 'relationship',
    relationTo: AuthorsCollection.slug as CollectionSlug,
    required: true,
    hasMany: true,
  },
  {
    name: 'date',
    label: 'Date',
    type: 'date',
    required: true,
    admin: {
      position: 'sidebar',
    },
  },
]

const BlogCollection: CollectionConfig = {
  slug: 'blog',
  access: {
    create: () => true,
    delete: () => true,
    update: () => true,
    read: () => true,
  },
  admin: {
    group: 'Content',
    description: 'Blog posts',
    useAsTitle: 'title',
  },
  fields: [
    ...Sidebar,
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
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
      blocks: [RichTextBlock, CodeBlock],
    },
  ],
  versions: {
    drafts: true,
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
          console.warn(`Page revalidating at: /blog/${doc.slug}`)
          revalidatePath(`/blog/${doc.slug}`)
        }
      },
    ],
  },
}

export { BlogCollection }
