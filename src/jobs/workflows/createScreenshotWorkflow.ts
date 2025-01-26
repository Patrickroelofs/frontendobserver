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
    await tasks.screenshot('createScreenshotJobID', {
      input: {
        url: job.input.url,
        filename: job.input.filename,
        showcaseID: job.input.showcaseID,
      },
    })
  },
} as WorkflowConfig<'createScreenshotWorkflow'>

export { createScreenshotWorkflow }
