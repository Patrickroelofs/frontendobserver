const { chromium } = require('playwright')

;(async () => {
  const url = process.env.URL

  if (!url) {
    throw new Error('URL is required')
  }

  const browser = await chromium.launch()
  const page = await browser.newPage()

  try {
    console.log(`Navigating to ${url}`)
    await page.goto(url)

    console.log('Taking screenshot...')
    const buffer = await page.screenshot({
      type: 'png',
      fullPage: true,
    })

    console.log('Screenshot successfully sent to webhook.', buffer)
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await browser.close()
  }
})()
