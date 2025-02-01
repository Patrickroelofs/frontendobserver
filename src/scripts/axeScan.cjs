const fs = require('node:fs')
const { chromium } = require('playwright')
const AxeBuilder = require('@axe-core/playwright')

async function runAccessibilityScan(url) {
  console.log(`Starting accessibility scan for ${url}`)

  const browser = await chromium.launch()
  const context = await browser.newContext({
    userAgent: 'AccessibilityScanBot/1.0 (+https://github.com/patrickroelofs/frontendobserver)',
  })
  const page = await context.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle' })
    console.log('Page loaded successfully')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    let markdown = `# Accessibility Scan Results for ${url}\n\n`
    markdown += `Scan completed at: ${new Date().toISOString()}\n\n`

    // Add summary section
    markdown += '## Summary\n\n'
    markdown += `- Total violations: ${results.violations.length}\n`
    markdown += `- Total passes: ${results.passes.length}\n`
    markdown += `- Total incomplete: ${results.incomplete.length}\n\n`

    // Add violations section
    if (results.violations.length > 0) {
      markdown += '## :warning: Violations\n\n'
      results.violations.forEach((violation, index) => {
        markdown += `### ${index + 1}. ${violation.help}\n\n`
        markdown += `- **Impact**: ${violation.impact}\n`
        markdown += `- **Description**: ${violation.description}\n`
        markdown += `- **WCAG Criteria**: ${violation.tags.filter((tag) => tag.startsWith('wcag')).join(', ')}\n`
        markdown += `- **How to fix**: ${violation.helpUrl}\n\n`
        markdown += '#### Affected Elements:\n'
        violation.nodes.forEach((node) => {
          markdown += `\
\
\`\`\`html\n${node.html}\n\`\`\`\n`
          if (node.failureSummary) {
            markdown += `Fix: ${node.failureSummary}\n`
          }
          markdown += '\n'
        })
        markdown += '---\n\n'
      })
    } else {
      markdown += '## :white_check_mark: No accessibility violations found\n\n'
    }

    fs.writeFileSync('accessibility-report.md', markdown)
    console.log('Report generated successfully')

    return results
  } catch (error) {
    console.error('Error during scan:', error)
    throw error
  } finally {
    await browser.close()
  }
}

const url = process.env.URL || 'https://frontendobserver.com'

runAccessibilityScan(url)
  .then((results) => {
    if (results.violations.length > 0) {
      process.exit(1)
    }
  })
  .catch((error) => {
    console.error('Error running accessibility scan:', error)
    process.exit(1)
  })
