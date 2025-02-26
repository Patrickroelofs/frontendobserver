import type { Block } from "payload";

export const CarouselBlock: Block = {
  slug: "Carousel",
  interfaceName: "CarouselType",
  labels: {
    singular: "Carousel",
    plural: "Carousels",
  },
  fields: [
    {
      name: "images",
      type: "array",
      label: "Carousel Images",
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
          required: false,
        },
      ],
    },
  ],
};
