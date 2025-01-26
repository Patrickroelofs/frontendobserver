import { type TaskConfig } from 'payload'

const ScreenshotWebpageTask = {
  slug: 'screenshotWebpageTask',
  inputSchema: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({ input }) => {
    const { url } = input

    try {
      const validatedUrl = new URL(url)

      // fetch
      const response = await fetch('/api/screenshot/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'screenshot-request',
          client_payload: {
            url: validatedUrl.href,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to take screenshot')
      }

      return {}
    } catch (e) {
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshotWebpageTask'>

export { ScreenshotWebpageTask }
