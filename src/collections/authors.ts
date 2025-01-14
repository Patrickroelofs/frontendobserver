import { type CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isCompany'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'isCompany',
      type: 'checkbox',
      label: 'This author is a company.',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField({
      trackingField: 'name',
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      label: 'Author information',
      type: 'collapsible',
      fields: [
        {
          name: 'socials',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Website', value: 'website' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'GitHub', value: 'github' },
              ],
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
        {
          name: 'bio',
          type: 'richText',
        },
      ],
    },
  ],
}

export { Authors }
