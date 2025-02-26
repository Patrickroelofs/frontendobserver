import { iconField } from "@/fields/icons";
import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  admin: {
    description: "Site Settings",
    group: "Administration",
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "social",
          fields: [
            {
              name: "socialMedia",
              type: "array",
              fields: [
                iconField(),
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
                {
                  name: "link",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          name: "navigation",
          fields: [
            {
              name: "links",
              type: "array",
              required: true,
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "link",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "footer",
          fields: [
            {
              name: "text",
              type: "richText",
            },
            {
              name: "links",
              type: "array",
              required: true,
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                    {
                      name: "link",
                      type: "text",
                      required: true,
                      admin: {
                        width: "50%",
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
