import { type WorkflowConfig } from 'payload'

const CreateScreenshotAndUpdateMediaWorkflow = {
  slug: 'createScreenshotAndUpdateMediaWorkflow',
  inputSchema: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'showcaseID',
      type: 'number',
      required: true,
    },
  ],
  handler: async ({ job, tasks }) => {
    const { showcaseID, url } = job.input

    try {
      const { screenshot } = await tasks.screenshotWebpageTask('1', {
        input: {
          url: String(url),
        },
      })

      const { media } = await tasks.createMediaCollectionTask('2', {
        input: {
          screenshot: String(screenshot),
        },
      })

      await tasks.updateMediaCollectionTask('3', {
        input: {
          media,
          showcaseID: Number(showcaseID),
        },
      })
    } catch (e) {
      throw new Error('Failed to update or create media')
    }
  },
} as WorkflowConfig<'createScreenshotAndUpdateMediaWorkflow'>

export { CreateScreenshotAndUpdateMediaWorkflow }
