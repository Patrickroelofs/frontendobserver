import { type TaskConfig } from 'payload'

const ScreenshotWebpageTask = {
  slug: 'screenshotWebpageTask',
  inputSchema: [
    {
      name: 'showcaseID',
      type: 'number',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({ input }) => {
    const { url, showcaseID } = input

    try {
      const validatedUrl = new URL(url)

      // fetch
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/api/screenshot/action`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'screenshot-request',
            client_payload: {
              url: validatedUrl.href,
              showcaseID,
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to take screenshot')
      }

      console.log('Screenshot action triggered', response)

      return {}
    } catch (e) {
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshotWebpageTask'>

export { ScreenshotWebpageTask }
