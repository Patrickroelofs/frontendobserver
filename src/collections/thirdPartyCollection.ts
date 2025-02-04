import type { CollectionConfig } from 'payload'

export const ThirdPartyCollection: CollectionConfig = {
  slug: 'third-party',
  access: {
    create: () => true,
    delete: () => true,
    update: () => true,
    read: () => true,
  },
  auth: {
    loginWithUsername: true,
    useAPIKey: true,
  },
  admin: {
    group: 'Administration',
  },
  fields: [],
}
