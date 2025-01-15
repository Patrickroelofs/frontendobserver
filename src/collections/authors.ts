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
  ],
}

export { Authors }
