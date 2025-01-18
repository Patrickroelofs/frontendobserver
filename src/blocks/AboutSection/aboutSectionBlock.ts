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
          name: 'showButton',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'buttonText',
          type: 'text',
          required: false,
          admin: {
            condition: (
              _,
              siblingData: Partial<{
                showButton: boolean
              }>,
            ): boolean => {
              return siblingData.showButton ?? false
            },
          },
        },
        {
          name: 'buttonLink',
          type: 'text',
          required: false,
          admin: {
            condition: (
              _,
              siblingData: Partial<{
                showButton: boolean
              }>,
            ): boolean => {
              return siblingData.showButton ?? false
            },
          },
        },
      ],
    },
  ],
}
