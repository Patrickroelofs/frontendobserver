import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateBlurData } from "@/util/generateBlurData";
import type { CollectionConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const MediaCollection: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Media",
    description: "Media files",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "blurData",
      type: "text",
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
  },
  hooks: {
    beforeValidate: [generateBlurData],
  },
};
