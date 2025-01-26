import { getPayload, type TaskConfig } from 'payload'
import { webkit } from 'playwright'
import config from '@payload-config'

const ScreenshotTask = {
  slug: 'screenshot',
  inputSchema: [
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'showcaseID',
      type: 'number',
      required: true,
    },
  ],

  handler: async ({ input, req }) => {
    const { url, filename } = input

    // TODO: I wish to use the getPayload function from the util folder, but its causing webpack to error.
    const payload = await getPayload({
      config,
    })

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

      const mediaItem = await payload.create({
        req,
        collection: 'media',
        file: {
          name: `screenshot/${filename}.png`,
          data: buffer,
          size: buffer.byteLength,
          mimetype: 'image/png',
        },
        data: {
          filename,
          alt: 'Hello World...',
        },
      })

      await payload.update({
        req,
        collection: 'showcase',
        id: Number(input.showcaseID),
        data: {
          details: {
            screenshot: mediaItem,
          },
        },
      })

      return {}
    } catch (e) {
      console.error(e)
      throw new Error('Failed to take screenshot')
    }
  },
} as TaskConfig<'screenshot'>

export { ScreenshotTask }
