import { type Block } from 'payload'

export const RichText: Block = {
  slug: 'RichText',
  interfaceName: 'RichTextType',
  fields: [
    {
      name: 'richText',
      label: 'Rich Text',
      type: 'richText',
    },
  ],
}
