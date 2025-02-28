import { BlogCard } from "@/components/blogCard";
import type { Blog, Media } from "@/payload-types";
import type { PaginatedDocs } from "payload";
import type { ReactElement } from "react";

function BlogPostsClient(props: PaginatedDocs<Blog>): ReactElement {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {props.docs.map((post) => {
        const { coverImage } = post as {
          coverImage: Media;
        };

        return (
          <BlogCard
            key={post.id}
            coverImage={coverImage}
            slug={post.slug}
            excerpt={post.description}
            name={post.title}
          />
        );
      })}
    </div>
  );
}

export { BlogPostsClient };
