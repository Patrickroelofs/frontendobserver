import { type CollectionConfig, type CollectionSlug, type Field, type Tab } from 'payload'
import { slugField } from '@/fields/slug'
import { MediaCollection } from '@/collections/mediaCollection'
import { RichTextBlock } from '@/blocks/RichText/richTextBlock'
import { AuthorsCollection } from '@/collections/AuthorsCollection'
import { isAdmin } from '@/util/permissionsHandler'

const Content: Tab = {
  name: 'content',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [RichTextBlock],
    },
  ],
}

const Details: Tab = {
  name: 'details',
  fields: [
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: MediaCollection.slug as CollectionSlug,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Blog', value: 'blog' },
      ],
    },
  ],
}

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
    relationTo: AuthorsCollection.slug as CollectionSlug,
    required: true,
    hasMany: true,
  },
]

const ShowcaseCollection: CollectionConfig = {
  slug: 'showcase',
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: () => true,
  },
  admin: {
    group: 'Content',
    description: 'A showcase page, awesome websites to check out',
    useAsTitle: 'name',
  },
  fields: [
    ...Sidebar,
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            width: '65%',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [Content, Details],
    },
  ],
}

export { ShowcaseCollection }
