import { type Block } from 'payload'

export const RichTextBlock: Block = {
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
