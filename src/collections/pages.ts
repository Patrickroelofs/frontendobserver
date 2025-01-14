import { type CollectionConfig } from 'payload'
import { SimpleText } from '@/blocks/simpleText'
import { slugField } from '@/fields/slug'

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
    slugField(),
    {
      name: 'blocks',
      label: 'Blocks',
      type: 'blocks',
      blocks: [SimpleText],
    },
  ],
}
