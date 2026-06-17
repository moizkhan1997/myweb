import type React from "react";
import * as post1 from "./posts/saas-explainer-video-cost";
import * as post2 from "./posts/logo-animation-styles";
import * as post3 from "./posts/why-saas-needs-motion-graphics";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  coverGradient: string;
};

export type Post = {
  meta: PostMeta;
  Content: React.ComponentType;
};

export const posts: Post[] = [
  { meta: post1.meta, Content: post1.default },
  { meta: post2.meta, Content: post2.default },
  { meta: post3.meta, Content: post3.default },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.meta.slug === slug);
}
