import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/util/permissionsHandler'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: () => true,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email'],
  },
  auth: true,
  fields: [
    {
      name: 'permissions',
      type: 'select',
      options: [
        { label: 'Readonly', value: 'readonly' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'readonly',
      required: true,
      hasMany: false,
    },
  ],
}
