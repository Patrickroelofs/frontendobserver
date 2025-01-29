import { type TaskConfig } from 'payload'
import { chromium } from 'playwright'

export const maxDuration = 90

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
      name: 'screenshot',
      type: 'text',
      required: true,
    },
  ],

  handler: async ({ input }) => {
    const { url } = input

    try {
      const validatedUrl = new URL(url)

      const browser = await chromium.launch()
      const page = await browser.newPage({
        screen: {
          width: 1920,
          height: 1080,
        },
      })

      await page.goto(validatedUrl.href)

      const screenshot = await page.screenshot({
        type: 'png',
        quality: 100,
      })

      return {
        output: {
          screenshot: screenshot.toString('base64'),
        },
      }
    } catch (e) {
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshotWebpageTask'>

export { ScreenshotWebpageTask }
