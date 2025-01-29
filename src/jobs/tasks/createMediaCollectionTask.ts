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

    console.log('convertedBuffer', convertedBuffer.byteLength)
    const randomUUID = crypto.randomUUID()

    // TODO: I wish to use the getPayload function from the util folder, but its causing webpack to error.
    const payload = await getPayload({
      config,
    })

    try {
      const media = await payload.create({
        req,
        collection: 'media',
        file: {
          name: String(randomUUID),
          data: convertedBuffer,
          size: convertedBuffer.byteLength,
          mimetype: 'image/png',
        },
        data: {
          alt: ' ',
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
