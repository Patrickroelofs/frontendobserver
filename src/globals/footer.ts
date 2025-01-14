import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
  ],
}
