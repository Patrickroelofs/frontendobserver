import type { ReactElement } from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { type SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type RichTextType } from '@/payload-types'

function RichText(props: RichTextType): ReactElement {
  const { richText } = props as {
    richText: SerializedEditorState
  }

  return (
    <LexicalRichText
      data={richText}
      className="prose prose-base prose-percy w-full mx-auto break-words"
    />
  )
}

export { RichText }
