import { type TaskConfig } from 'payload'
import { webkit } from 'playwright'

const createScreenshotTask = {
  slug: 'create-screenshot',
  inputSchema: [
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
  outputSchema: [
    {
      name: 'base64',
      type: 'text',
      required: true,
    },
  ],
  handler: async ({ input, job, req }) => {
    const { url } = input

    try {
      const validatedUrl = new URL(url)

      const browser = await webkit.launch()
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(validatedUrl.href)

      const buffer = await page.screenshot({
        fullPage: true,
        type: 'png',
      })
      await browser.close()

      return {
        output: {
          base64: buffer.toString('base64'),
        },
      }
    } catch (e) {
      throw new Error('Invalid URL')
    }
  },
} as TaskConfig<'create-screenshot'>

export { createScreenshotTask }
