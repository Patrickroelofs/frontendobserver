import { BlogTemplate } from "@/app/(frontend)/blog/[slug]/page.template";
import type { Blog, Media } from "@/payload-types";
import { payload } from "@/util/getPayloadConfig";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactElement } from "react";

async function Page({
  params,
}: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;

  let page: Blog | null = null;

  try {
    page = await payload
      .find({
        collection: "blog",
        draft,
        where: {
          slug: {
            equals: slug,
          },
        },
        limit: 1,
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null;
        }

        return result.docs[0] ?? null;
      });

    if (!page) return <p>404</p>;

    return <BlogTemplate page={page} />;
  } catch (error) {
    return <p>500</p>;
  }
}

export async function generateStaticParams() {
  try {
    const pages = await payload
      .find({
        collection: "blog",
        where: {
          _status: {
            equals: "published",
          },
        },
      })
      .then((result) => {
        if (result.docs.length === 0) {
          return null;
        }

        return result.docs;
      });

    if (!pages) {
      return [];
    }

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const page = await payload
    .find({
      collection: "blog",
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: "published",
        },
      },
      limit: 1,
    })
    .then((result) => {
      if (result.docs.length === 0) {
        return null;
      }

      return result.docs[0] ?? null;
    });

  if (!page) {
    return {};
  }

  const coverImage = page.coverImage as Media;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      images: [
        {
          url: coverImage.url ?? "",
          alt: coverImage.alt,
        },
      ],
    },
  };
}

export default Page;
