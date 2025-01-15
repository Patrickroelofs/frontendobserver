import { type ReactElement } from 'react'
import { codeToHtml } from 'shiki'
import { type CodeType } from '@/payload-types'

async function Code(props: CodeType): Promise<ReactElement> {
  const { code, codeLanguage } = props

  const html = await codeToHtml(code, {
    lang: codeLanguage,
    theme: 'dark-plus',
  })

  return (
    <div className="p-4 border-2 border-black">
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </div>
  )
}

export { Code }
