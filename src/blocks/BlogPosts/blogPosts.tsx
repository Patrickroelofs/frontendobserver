import { BlogPostsClient } from "@/blocks/BlogPosts/blogPostsClient";
import type { BlogPostsType } from "@/payload-types";
import { payload } from "@/util/getPayloadConfig";
import type { ReactElement } from "react";

async function BlogPosts(props: BlogPostsType): Promise<ReactElement> {
  const blogPosts = await payload.find({
    collection: "blog",
    limit: props.limit === 0 ? undefined : props.limit,
    where: {
      featured: {
        equals: true,
      },
      _status: {
        equals: "published",
      },
    },
  });

  return <BlogPostsClient {...blogPosts} />;
}

export { BlogPosts };
