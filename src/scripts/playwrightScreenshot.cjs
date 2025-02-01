const { randomUUID } = require('node:crypto')
const { chromium } = require('playwright')
const fetch = require('node-fetch')

;(async function () {
  try {
    if (!process.env.URL) {
      throw new Error('URL is required')
    }

    const url = new URL(process.env.URL)
    const browser = await chromium.launch()
    const page = await browser.newPage({
      screen: {
        width: 1920,
        height: 1080,
      },
    })

    console.log(`Navigating to ${url}`)
    await page.goto(url.href)

    console.log('Taking screenshot...')
    const screenshot = await page.screenshot({
      type: 'png',
      quality: 100,
    })

    console.log(
      `Screenshot successful for ${process.env.SHOWCASE_ID}, length: ${screenshot.byteLength}`,
    )

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
        showcaseID: process.env.SHOWCASE_ID,
      }),
    }).catch((error) => {
      console.error('Error:', error)
    })

    if (!response.ok) {
      throw new Error('Failed to upload screenshot')
    }

    console.log('Screenshot routed successfully towards', response.url)
    await browser.close()
  } catch (error) {
    console.error('Error:', error.message)
  }
})()
