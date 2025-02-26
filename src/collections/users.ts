import type { CollectionConfig } from "payload";

export const UsersCollection: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    group: "Administration",
    description: "User accounts on the site.",
  },
  fields: [],
};
