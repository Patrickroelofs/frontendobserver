import type { ReactElement } from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import { type SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { type RichTextType } from '@/payload-types'

function RichText(props: RichTextType): ReactElement {
  return (
    <LexicalRichText
      data={props.richText as SerializedEditorState}
      className="prose prose-base w-full mx-auto break-words"
    />
  )
}

export { RichText }
