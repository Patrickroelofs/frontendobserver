const { chromium } = require('playwright')
const { runAxe } = require('axe-playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  const urls = [
    'https://www.frontendobserver.com/',
    'https://www.frontendobserver.com/blog/how-to-create-a-generic-fully-typed-icon-field-in-payload-cms',
    'https://www.frontendobserver.com/blog/how-to-create-a-generic-automatically-generating-slug-field-for-payload-cms',
  ]

  for (const url of urls) {
    await page.goto(url)
    const results = await runAxe(page)
    console.log(`Accessibility scan results for ${url}:`, results)
  }

  await browser.close()
})()
