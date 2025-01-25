import { type WorkflowConfig } from 'payload'

const createScreenshotWorkflow = {
  slug: 'create-screenshot-workflow',

  inputSchema: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],

  handler: async ({ job, tasks }) => {
    const data = await tasks['create-screenshot']('1', {
      input: {
        url: job.input.url,
      },
    })
  },
} as WorkflowConfig<'create-screenshot-workflow'>

export { createScreenshotWorkflow }
