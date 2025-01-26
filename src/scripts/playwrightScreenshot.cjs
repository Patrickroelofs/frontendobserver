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
    const buffer = await page.screenshot({
      path: `./${url.hostname}.png`,
      type: 'png',
      fullPage: true,
    })

    console.log('Screenshot successful, length: ', buffer.byteLength)
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await browser.close()
  }
})()
