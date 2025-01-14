import { deepMerge, type Field } from 'payload'

type Slug = (options?: { trackingField?: string }, overrides?: Partial<Field>) => Field

const slugField: Slug = ({ trackingField = 'title' } = {}, overrides = {}) =>
  deepMerge(
    {
      label: 'Slug',
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      required: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: {
            path: 'src/fields/ui/slug.tsx',
            exportName: 'SlugInput',
            clientProps: {
              trackingField,
            },
          },
        },
      },
      validate: (value: string) => {
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

        if (slugRegex.test(value)) {
          return true
        }

        return 'Invalid slug. Must be kebab-case (lowercase, words separated by hyphens)'
      },
    },
    overrides,
  )

export { slugField }
