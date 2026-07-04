import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "lf864b5r",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage?: SanityImageSource;
  categories?: { title: string }[];
  author?: { name: string; image?: SanityImageSource };
  publishedAt: string;
  body?: Block[];
  readTime?: number;
}

export interface Block {
  _type: string;
  _key: string;
  style?: string;
  children?: Span[];
  markDefs?: MarkDef[];
  asset?: SanityImageSource;
  alt?: string;
}

export interface Span {
  _type: string;
  _key: string;
  text: string;
  marks?: string[];
}

export interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories[]->{ title },
      author->{ name, image },
      publishedAt,
      "readTime": round(length(pt::text(body)) / 5 / 180)
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      categories[]->{ title },
      author->{ name, image },
      publishedAt,
      body,
      "readTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { slug }
  );
}
