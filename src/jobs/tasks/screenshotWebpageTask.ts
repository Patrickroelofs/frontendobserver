import { type TaskConfig } from 'payload'
import { launchChromium } from 'playwright-aws-lambda'

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

      console.log('Taking screenshot of', validatedUrl)

      const browser = await launchChromium({ headless: true })
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(url)
      const screenshot = await page.screenshot({ type: 'png' })
      await browser.close()

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
