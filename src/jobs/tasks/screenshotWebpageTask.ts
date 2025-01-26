import { type TaskConfig } from 'payload'
import { webkit } from 'playwright'

const ScreenshotWebpageTask = {
  slug: 'screenshotWebpageTask',
  inputSchema: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
  outputSchema: [
    {
      name: 'buffer',
      type: 'json',
      required: true,
    },
  ],
  handler: async ({ input }) => {
    const { url } = input

    try {
      const validatedUrl = new URL(url)

      const browser = await webkit.launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(validatedUrl.href)

      const buffer = await page.screenshot({
        type: 'png',
        fullPage: true,
      })

      await browser.close()

      return {
        output: {
          buffer: buffer.toString('base64'),
        },
      }
    } catch (e) {
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshotWebpageTask'>

export { ScreenshotWebpageTask }
