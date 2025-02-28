import { AboutSectionBlock } from "@/blocks/AboutSection/aboutSectionBlock";
import { CarouselBlock } from "@/blocks/Carousel/carouselBlock";
import { HeroBlock } from "@/blocks/Hero/heroBlock";
import { TitleWithBlocksBlock } from "@/blocks/TitleWithBlocks/titleWithBlocksBlock";
import { slugField } from "@/fields/slug";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const PagesCollection: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Content",
    description: "A page on the website",
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    slugField({
      trackingField: "title",
    }),
    {
      name: "blocks",
      label: "Blocks",
      type: "blocks",
      blocks: [
        HeroBlock,
        AboutSectionBlock,
        TitleWithBlocksBlock,
        CarouselBlock,
      ],
    },
  ],
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      ({
        doc,
      }: {
        doc: {
          slug: string;
          _status: string;
        };
      }) => {
        if (doc.slug && doc._status === "published") {
          revalidatePath("/", "layout");
        }
      },
    ],
  },
};
