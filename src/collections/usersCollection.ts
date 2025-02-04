import type { CollectionConfig } from 'payload'

export const UsersCollection: CollectionConfig = {
  slug: 'users',
  access: {
    create: () => true,
    delete: () => true,
    update: () => true,
    read: () => true,
  },
  auth: true,
  admin: {
    group: 'Administration',
    description: 'User accounts on the site.',
  },
  fields: [],
}
