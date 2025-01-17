import { type Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'Hero',
  interfaceName: 'HeroType',
  fields: [
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      required: true,
    },
  ],
}
