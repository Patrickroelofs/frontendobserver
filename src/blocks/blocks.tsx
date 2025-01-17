import { type ComponentType, type ReactElement } from 'react'
import {
  type BlogListType,
  type CodeType,
  type ContainerType,
  type HeroType,
  type RichTextType,
} from '@/payload-types'
import { RichText } from '@/blocks/RichText/richText'
import { BlogList } from '@/blocks/BlogList/blogList'
import { Code } from '@/blocks/Code/code'
import { Hero } from '@/blocks/Hero/hero'
import { Container } from '@/blocks/Container/container'

interface BlocksProps {
  blocks: (RichTextType | ContainerType | BlogListType | CodeType | HeroType)[] | null | undefined
}

const blockComponents = {
  RichText,
  Container,
  BlogList,
  Code,
  Hero,
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
