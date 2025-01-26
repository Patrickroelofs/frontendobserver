import { getPayload, type TaskConfig } from 'payload'
import config from '@payload-config'

const UpdateMediaCollectionTask = {
  slug: 'updateMediaCollectionTask',
  inputSchema: [
    {
      name: 'showcaseId',
      type: 'number',
      required: true,
    },
    {
      name: 'mediaItem',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],

  handler: async ({ input, req }) => {
    const { showcaseId, mediaItem } = input

    // TODO: I wish to use the getPayload function from the util folder, but its causing webpack to error.
    const payload = await getPayload({
      config,
    })

    try {
      await payload.update({
        req,
        collection: 'showcase',
        id: Number(showcaseId),
        data: {
          details: {
            screenshot: mediaItem,
          },
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
