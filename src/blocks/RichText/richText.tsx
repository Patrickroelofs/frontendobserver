import type { RichTextType } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { ReactElement } from "react";

function RichText(props: RichTextType): ReactElement {
  return (
    <LexicalRichText
      data={props.richText as SerializedEditorState}
      className="prose prose-base w-full mx-auto break-words"
    />
  );
}

export { RichText };
