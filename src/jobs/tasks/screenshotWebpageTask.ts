import { type TaskConfig } from 'payload'
import { chromium as playwright } from 'playwright-core'
import chromium from '@sparticuz/chromium'

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

      const browser = await playwright.launch({
        args: chromium.args,
        headless: Boolean(chromium.headless),
        executablePath: await chromium.executablePath(),
      })
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(url)
      const screenshotBuffer = await page.screenshot({ type: 'png' })
      await browser.close()

      const screenshotBase64 = screenshotBuffer.toString('base64')

      return {
        output: {
          screenshot: screenshotBase64,
        },
      }
    } catch (e) {
      console.error('Failed to take screenshot', e)
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshotWebpageTask'>

export { ScreenshotWebpageTask }
