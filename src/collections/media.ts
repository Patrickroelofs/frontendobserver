import type { CollectionConfig } from 'payload'
import { generateBlurData } from '@/util/generateBlurData'
import { isAdmin } from '@/util/permissionsHandler'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurData',
      type: 'text',
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  upload: true,
  hooks: {
    beforeValidate: [generateBlurData],
  },
}
