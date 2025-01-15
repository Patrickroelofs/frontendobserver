import { type CollectionConfig, type CollectionSlug, type Field, type Tab } from 'payload'
import { slugField } from '@/fields/slug'
import { Media } from '@/collections/media'
import { RichText } from '@/blocks/richText'
import { Authors } from '@/collections/authors'

const Content: Tab = {
  name: 'content',
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [RichText],
    },
  ],
}

const Details: Tab = {
  name: 'details',
  fields: [
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: Media.slug as CollectionSlug,
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
    relationTo: Authors.slug as CollectionSlug,
    required: true,
    hasMany: true,
  },
]

const Showcase: CollectionConfig = {
  slug: 'showcase',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
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

export { Showcase }
