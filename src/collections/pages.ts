import { type CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { Container } from '@/blocks/container'

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
      blocks: [Container],
    },
  ],
}
