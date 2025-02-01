import { getPayload, type TaskConfig } from 'payload'
import config from '@payload-config'
import { type Media } from '@/payload-types'

const UpdateMediaCollectionTask = {
  slug: 'updateMediaCollectionTask',
  inputSchema: [
    {
      name: 'showcaseID',
      type: 'number',
      required: true,
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],

  handler: async ({ input, req }) => {
    const { showcaseID, media } = input

    // TODO: I wish to use the getPayload function from the util folder, but its causing webpack to error.
    const payload = await getPayload({
      config,
    })

    try {
      await payload.update({
        req,
        collection: 'showcase',
        draft: true,
        id: showcaseID,
        data: {
          image: media as Media,
        },
      })

      return {}
    } catch (e) {
      console.error(e)
      throw new Error('Failed to update media collection item')
    }
  },
} as TaskConfig<'updateMediaCollectionTask'>

export { UpdateMediaCollectionTask }
