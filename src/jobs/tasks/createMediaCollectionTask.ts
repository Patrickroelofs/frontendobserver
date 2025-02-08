import { getPayload, type TaskConfig } from 'payload'
import config from '@payload-config'

const CreateMediaCollectionTask = {
  slug: 'createMediaCollectionTask',
  inputSchema: [
    {
      name: 'screenshot',
      type: 'text',
      required: true,
    },
  ],
  outputSchema: [
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
  handler: async ({ input, req }) => {
    const { screenshot } = input

    const convertedBuffer = Buffer.from(String(screenshot), 'base64')

    const payload = await getPayload({
      config,
    })

    const uuid = crypto.randomUUID()

    try {
      const media = await payload.create({
        req,
        collection: 'media',
        file: {
          name: `screenshot/${uuid}.png`,
          data: convertedBuffer,
          size: convertedBuffer.byteLength,
          mimetype: 'image/png',
        },
        data: {
          filename: uuid,
          alt: 'Hello World...',
        },
      })

      return {
        output: {
          media,
        },
      }
    } catch (e) {
      throw new Error('Failed to create media collection item')
    }
  },
} as TaskConfig<'createMediaCollectionTask'>

export { CreateMediaCollectionTask }
