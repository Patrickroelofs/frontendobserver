import { AboutSection } from "@/blocks/AboutSection/aboutSection";
import { BlogPosts } from "@/blocks/BlogPosts/blogPosts";
import { Carousel } from "@/blocks/Carousel/carousel";
import { Code } from "@/blocks/Code/code";
import { Hero } from "@/blocks/Hero/hero";
import { RichText } from "@/blocks/RichText/richText";
import { TitleWithBlocks } from "@/blocks/TitleWithBlocks/titleWithBlocks";
import type {
  AboutSectionType,
  BlogPostsType,
  CarouselType,
  CodeType,
  HeroType,
  RichTextType,
  TitleWithBlocksType,
} from "@/payload-types";
import type { ComponentType, ReactElement } from "react";

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
    | undefined;
}

const blockComponents = {
  RichText,
  Code,
  Hero,
  AboutSection,
  TitleWithBlocks,
  BlogPosts,
  Carousel,
};

function Blocks({ blocks }: BlocksProps): ReactElement | null {
  if (blocks === null || blocks === undefined) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const { blockType } = block;

        if (blockType in blockComponents) {
          const BlockComponent = blockComponents[blockType] as ComponentType;

          return <BlockComponent key={block.id} {...block} />;
        }

        return null;
      })}
    </>
  );
}

export { Blocks };
