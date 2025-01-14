import type { CollectionConfig, CollectionSlug } from 'payload'
import { Media } from '@/collections/media'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'updatedAt'],
  },
  auth: true,
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: Media.slug as CollectionSlug,
      required: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Author',
          value: 'author',
        },
      ],
    },
  ],
}
