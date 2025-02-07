import { type WorkflowConfig } from 'payload'

const CreateAndUpdateMediaWorkflow = {
  slug: 'createAndUpdateMediaWorkflow',
  inputSchema: [
    {
      name: 'showcaseID',
      type: 'text',
      required: true,
    },
    {
      name: 'buffer',
      type: 'text',
      required: true,
    },
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({ job, tasks }) => {
    const { showcaseID, buffer, filename } = job.input

    console.error('showcaseID', showcaseID)
    console.error('buffer', buffer)
    console.error('filename', filename)

    try {
      const { media } = await tasks.createMediaCollectionTask('1', {
        input: {
          buffer: String(buffer),
          filename: String(filename),
        },
      })

      await tasks.updateMediaCollectionTask('2', {
        input: {
          media,
          showcaseID,
        },
      })
    } catch (e) {
      throw new Error('Failed to update or create media')
    }
  },
} as WorkflowConfig<'createAndUpdateMediaWorkflow'>

export { CreateAndUpdateMediaWorkflow }
