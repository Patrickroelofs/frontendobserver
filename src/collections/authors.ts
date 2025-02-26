import { slugField } from "@/fields/slug";
import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

const AuthorsCollection: CollectionConfig = {
  slug: "authors",
  admin: {
    group: "Content",
    useAsTitle: "name",
    description: "Authors of articles, blog posts, etc.",
    defaultColumns: ["name", "isCompany"],
  },
  fields: [
    slugField({
      trackingField: "name",
    }),
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "shortBio",
      type: "textarea",
      required: true,
      defaultValue: "I'm an author on this site.",
    },
    {
      name: "bio",
      type: "richText",
      required: false,
    },
  ],
  hooks: {
    afterChange: [
      ({
        doc,
      }: {
        doc: {
          slug: string;
        };
      }) => {
        if (doc.slug) {
          revalidatePath("/", "layout");
        }
      },
    ],
  },
};

export { AuthorsCollection };
