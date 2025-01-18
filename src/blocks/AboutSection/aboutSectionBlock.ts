import { type Block } from 'payload'

export const AboutSectionBlock: Block = {
  slug: 'AboutSection',
  interfaceName: 'AboutSectionType',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'About',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      label: 'button',
      type: 'collapsible',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
