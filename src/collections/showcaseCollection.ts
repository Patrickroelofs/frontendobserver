import { type CollectionConfig, type CollectionSlug, getPayload } from 'payload'
import { slugField } from '@/fields/slug'
import { MediaCollection } from '@/collections/mediaCollection'
import { RichTextBlock } from '@/blocks/RichText/richTextBlock'
import config from '@payload-config'
import { type Showcase } from '@/payload-types'

const ShowcaseCollection: CollectionConfig = {
  slug: 'showcase',
  access: {
    create: () => true,
    delete: () => true,
    update: () => true,
    read: () => true,
  },
  admin: {
    group: 'Content',
    description: 'A showcase page, awesome websites to check out.',
    useAsTitle: 'title',
  },
  fields: [
    slugField(),
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      relationTo: MediaCollection.slug as CollectionSlug,
      type: 'upload',
      admin: {
        readOnly: true,
        description:
          'Screenshot is automatically generated based on URL, more fields will become available when job is done.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          name: 'content',
          fields: [
            {
              name: 'blocks',
              type: 'blocks',
              blocks: [RichTextBlock],
            },
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  hooks: {
    afterChange: [
      async ({ operation, doc, previousDoc }) => {
        const { url, id } = doc as Showcase
        const { url: previousUrl } = previousDoc as Showcase

        if (operation === 'update' && url !== previousUrl) {
          const payload = await getPayload({
            config,
          })

          const createdJob = await payload.jobs.queue({
            workflow: 'createAndUpdateMediaWorkflow',
            input: {
              showcaseID: id,
              url,
            },
          })

          await payload.jobs.runByID({
            id: createdJob.id,
          })
        }
      },
    ],
  },
}

export { ShowcaseCollection }
