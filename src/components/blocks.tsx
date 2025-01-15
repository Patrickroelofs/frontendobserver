import { type ComponentType, type ReactElement } from 'react'
import {
  type BlogListType,
  type CodeType,
  type ContainerType,
  type RichTextType,
} from '@/payload-types'
import { Container } from '@/components/container'
import { RichText } from '@/components/richText'
import { BlogList } from '@/components/blogList'
import { Code } from '@/components/code'

interface BlocksProps {
  blocks: (RichTextType | ContainerType | BlogListType | CodeType)[] | null | undefined
}

const blockComponents = {
  RichText,
  Container,
  BlogList,
  Code,
}

function Blocks({ blocks }: BlocksProps): ReactElement | null {
  if (blocks === null || blocks === undefined) {
    return null
  }

  return (
    <>
      {blocks.map((block) => {
        const { blockType } = block

        if (blockType in blockComponents) {
          const BlockComponent = blockComponents[blockType] as ComponentType

          return <BlockComponent key={block.id} {...block} />
        }

        return null
      })}
    </>
  )
}

export { Blocks }
