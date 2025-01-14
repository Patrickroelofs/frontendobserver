import { type Block } from 'payload'

export const SimpleText: Block = {
  slug: 'SimpleText',
  interfaceName: 'SimpleTextType',
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'text',
    },
  ],
}
