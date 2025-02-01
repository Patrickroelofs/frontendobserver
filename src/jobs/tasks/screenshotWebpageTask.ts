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

      const response = await fetch(
        `https://api.github.com/repos/patrickroelofs/frontendobserver/dispatches`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${String(process.env.GITHUB_TOKEN)}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'screenshot',
            client_payload: {
              url: validatedUrl.href,
              showcaseID: Number(showcaseID),
              API_SECRET: process.env.API_SECRET,
            },
          }),
        },
      )
        .catch((e) => {
          throw new Error('Failed to take screenshot', e)
        })
        .finally(() => {
          console.log('Screenshot action triggered', response)
        })

      return {}
    } catch (e) {
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshotWebpageTask'>

export { ScreenshotWebpageTask }
