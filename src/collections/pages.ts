import { type CollectionConfig } from 'payload'
import { SimpleText } from '@/blocks/simpleText'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [SimpleText],
    },
  ],
}
