import type { ReactElement } from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { type SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type RichTextType } from '@/payload-types'

function RichText(props: RichTextType): ReactElement {
  const { richText } = props as {
    richText: SerializedEditorState
  }

  return <LexicalRichText data={richText} className="prose prose-lg prose-percy w-full" />
}

export { RichText }
