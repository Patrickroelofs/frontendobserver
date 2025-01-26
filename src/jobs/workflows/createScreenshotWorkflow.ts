import { type WorkflowConfig } from 'payload'

const createScreenshotWorkflow = {
  slug: 'createScreenshotWorkflow',

  inputSchema: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'filename',
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
    const { buffer } = await tasks.screenshotWebpageTask('1', {
      input: {
        url: job.input.url,
      },
    })

    const { media } = await tasks.createMediaCollectionTask('2', {
      input: {
        filename: job.input.filename,
        buffer,
      },
    })

    await tasks.updateMediaCollectionTask('3', {
      input: {
        mediaItem: media,
        showcaseId: job.input.showcaseID,
      },
    })
  },
} as WorkflowConfig<'createScreenshotWorkflow'>

export { createScreenshotWorkflow }
