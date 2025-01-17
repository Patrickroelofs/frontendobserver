import { type Block } from 'payload'

export const Hero: Block = {
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
