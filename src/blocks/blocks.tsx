import { type ComponentType, type ReactElement } from 'react'
import {
  type AboutSectionType,
  type BlogPostsType,
  type CarouselType,
  type CodeType,
  type HeroType,
  type RichTextType,
  type TitleWithBlocksType,
} from '@/payload-types'
import { RichText } from '@/blocks/RichText/richText'
import { Code } from '@/blocks/Code/code'
import { Hero } from '@/blocks/Hero/hero'
import { AboutSection } from '@/blocks/AboutSection/aboutSection'
import { TitleWithBlocks } from '@/blocks/TitleWithBlocks/titleWithBlocks'
import { BlogPosts } from '@/blocks/BlogPosts/blogPosts'
import { Carousel } from '@/blocks/Carousel/carousel'

interface BlocksProps {
  blocks:
    | (
        | RichTextType
        | CodeType
        | HeroType
        | AboutSectionType
        | TitleWithBlocksType
        | BlogPostsType
        | CarouselType
      )[]
    | null
    | undefined
}

const blockComponents = {
  RichText,
  Code,
  Hero,
  AboutSection,
  TitleWithBlocks,
  BlogPosts,
  Carousel,
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
