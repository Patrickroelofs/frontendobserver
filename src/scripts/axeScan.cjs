const { AxeBuilder } = require('@axe-core/playwright')
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()

  const urls = [
    'https://www.frontendobserver.com/',
    'https://www.frontendobserver.com/blog/how-to-create-a-generic-fully-typed-icon-field-in-payload-cms',
    'https://www.frontendobserver.com/blog/how-to-create-a-generic-automatically-generating-slug-field-for-payload-cms',
  ]

  for (const url of urls) {
    await page.goto(url)
    const results = await new AxeBuilder({ page }).analyze()
    console.log(results)
  }

  await browser.close()
})()
