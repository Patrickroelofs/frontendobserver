import { type ReactElement } from 'react'
import { codeToHtml } from 'shiki'
import { cva } from 'class-variance-authority'
import { type CodeType } from '@/payload-types'

const codeStyling = cva([''], {
  variants: {
    spacing: {
      '': '',
      'py-4': 'py-4',
      'py-8': 'py-8',
      'py-16': 'py-16',
      'py-24': 'py-24',
      'py-32': 'py-32',
      'py-48': 'py-48',
      'py-64': 'py-64',
    },
  },
})

async function Code(props: CodeType): Promise<ReactElement> {
  const { code, codeLanguage, spacing } = props

  const html = await codeToHtml(code, {
    lang: codeLanguage,
    theme: 'dark-plus',
  })

  return (
    <div
      className={codeStyling({
        spacing,
      })}
    >
      <div
        className="p-4 bg-[#1E1E1E] text-sm"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  )
}

export { Code }
