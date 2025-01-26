const { randomUUID } = require('node:crypto')
const { chromium } = require('playwright')

;(async () => {
  const url = new URL(process.env.URL)

  if (!url) {
    throw new Error('URL is required')
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    console.log(`Navigating to ${url}`)
    await page.goto(url.href)

    console.log('Taking screenshot...')
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: true,
    })

    console.log('Screenshot successful, length: ', screenshot.byteLength)

    if (!process.env.SCREENSHOT_API_ENDPOINT) {
      throw new Error('Screenshot API endpoint is required')
    }

    const response = await fetch(process.env.SCREENSHOT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: screenshot.toString('base64'),
        filename: randomUUID().toString(),
        showcaseId: process.env.SHOWCASE_ID,
      }),
    }).catch((error) => {
      console.error('Error:', error)
    })

    if (!response.ok) {
      throw new Error('Failed to upload screenshot')
    }

    console.log('Screenshot routed successfully')
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await browser.close()
  }
})()
