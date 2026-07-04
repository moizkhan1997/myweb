import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";
import { useSEO, useJsonLd, useBreadcrumbJsonLd } from "@/lib/seo";
import { getPostBySlug, urlFor, type BlogPost, type Block, type Span } from "@/lib/sanity";
import { getPost as getStaticPost } from "@/blog/index";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderBlock(block: Block, index: number): React.ReactNode {
  if (block._type === "image") {
    return (
      <figure key={block._key ?? index} className="my-10">
        <img
          src={urlFor(block as any).width(900).url()}
          alt={block.alt ?? ""}
          className="w-full rounded-2xl object-cover"
        />
        {block.alt && (
          <figcaption className="mt-3 text-center text-sm text-foreground/40">{block.alt}</figcaption>
        )}
      </figure>
    );
  }

  if (block._type !== "block" || !block.children) return null;

  const text = block.children.map((span: Span, i: number) => {
    let content: React.ReactNode = span.text;
    if (span.marks?.includes("strong")) content = <strong key={i}>{content}</strong>;
    if (span.marks?.includes("em")) content = <em key={i}>{content}</em>;
    if (span.marks?.includes("code")) content = <code key={i} className="bg-ink/5 px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>;

    const linkMark = span.marks?.find((m) =>
      block.markDefs?.some((d) => d._key === m && d._type === "link")
    );
    if (linkMark) {
      const def = block.markDefs?.find((d) => d._key === linkMark);
      if (def?.href) {
        content = (
          <a key={i} href={def.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink transition">
            {content}
          </a>
        );
      }
    }
    return <span key={i}>{content}</span>;
  });

  const key = block._key ?? index;

  switch (block.style) {
    case "h2":
      return <h2 key={key} className="font-display text-2xl md:text-3xl font-semibold text-ink mt-10 mb-4">{text}</h2>;
    case "h3":
      return <h3 key={key} className="font-display text-xl font-semibold text-ink mt-8 mb-3">{text}</h3>;
    case "h4":
      return <h4 key={key} className="font-display text-lg font-semibold text-ink mt-6 mb-2">{text}</h4>;
    case "blockquote":
      return (
        <blockquote key={key} className="my-8 border-l-4 border-ink/20 pl-6 italic text-foreground/60 text-lg leading-relaxed">
          {text}
        </blockquote>
      );
    default:
      return (
        <p key={key} className="my-5 leading-[1.85] text-foreground/75 text-[1.0625rem]">
          {text}
        </p>
      );
  }
}

function PostContent({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Check static posts as a fallback
  const staticPost = getStaticPost(slug);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPostBySlug(slug)
      .then((data) => { if (data) setPost(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const resolvedTitle = post?.title ?? staticPost?.meta.title ?? "";
  const resolvedDescription = post?.excerpt ?? staticPost?.meta.description ?? "Trimmic blog post.";
  const resolvedDate = post?.publishedAt ?? staticPost?.meta.date ?? "";

  useSEO({
    title: resolvedTitle ? `${resolvedTitle} | Trimmic Blog` : loading ? "Loading… | Trimmic Blog" : "Post Not Found | Trimmic Blog",
    description: resolvedDescription,
    path: `/blog/${slug}`,
  });

  useJsonLd(resolvedTitle ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: resolvedTitle,
    description: resolvedDescription,
    datePublished: resolvedDate,
    author: { "@type": "Organization", name: "Trimmic", url: "https://www.trimmic.com" },
    publisher: { "@type": "Organization", name: "Trimmic", url: "https://www.trimmic.com" },
    url: `https://www.trimmic.com/blog/${slug}`,
  } : { "@context": "https://schema.org", "@type": "WebPage" });

  useBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: resolvedTitle || "Post", path: `/blog/${slug}` },
  ]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-4 pt-40 px-6 max-w-2xl mx-auto w-full">
        <div className="h-8 bg-ink/5 rounded-xl animate-pulse w-3/4" />
        <div className="h-5 bg-ink/5 rounded-xl animate-pulse w-1/2" />
        <div className="h-48 bg-ink/5 rounded-2xl animate-pulse mt-6" />
      </div>
    );
  }

  // If found in Sanity, render Sanity post
  if (post) {
    const readTimeStr = post.readTime && post.readTime > 0 ? `${post.readTime} min read` : "";
    const category = post.categories?.[0]?.title ?? "Article";
    return (
      <>
        <section className="pt-40 pb-12 px-6">
          <div className="max-w-2xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-ink transition mb-8">← Blog</Link>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-ink/5 text-ink/60">{category}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1] mb-6">{post.title}</h1>
            {post.excerpt && <p className="text-lg text-foreground/55 leading-relaxed mb-6">{post.excerpt}</p>}
            <div className="flex items-center gap-3 text-sm text-foreground/40">
              {post.author?.name && <><span>{post.author.name}</span><span>·</span></>}
              <span>{formatDate(post.publishedAt)}</span>
              {readTimeStr && <><span>·</span><span>{readTimeStr}</span></>}
            </div>
          </div>
        </section>
        {post.mainImage ? (
          <div className="px-6 mb-12">
            <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl">
              <img src={urlFor(post.mainImage).width(900).height(480).fit("crop").url()} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          </div>
        ) : (
          <div className="px-6 mb-12">
            <div className="max-w-2xl mx-auto h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
          </div>
        )}
        <article className="px-6 pb-24">
          <div className="max-w-2xl mx-auto blog-prose">
            {post.body?.map((block, i) => renderBlock(block, i))}
          </div>
        </article>
        <CtaBlock />
      </>
    );
  }

  // Fallback: static post (preserves existing ranked URLs)
  if (staticPost) {
    const { meta, Content } = staticPost;
    return (
      <>
        <section className="pt-40 pb-12 px-6">
          <div className="max-w-2xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-ink transition mb-8">← Blog</Link>
            <div className="flex flex-wrap gap-2 mb-5">
              {meta.tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-ink/5 text-ink/60">{tag}</span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1] mb-6">{meta.title}</h1>
            {meta.description && <p className="text-lg text-foreground/55 leading-relaxed mb-6">{meta.description}</p>}
            <div className="flex items-center gap-3 text-sm text-foreground/40">
              <span>{formatDate(meta.date)}</span>
              <span>·</span>
              <span>{meta.readTime}</span>
            </div>
          </div>
        </section>
        <div className="px-6 mb-12">
          <div className={`max-w-2xl mx-auto h-1.5 rounded-full bg-gradient-to-r ${meta.coverGradient}`} />
        </div>
        <article className="px-6 pb-24">
          <div className="max-w-2xl mx-auto blog-prose">
            <Content />
          </div>
        </article>
        <CtaBlock />
      </>
    );
  }

  // Not found in either source
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6 py-40">
      <h1 className="font-display text-4xl font-semibold text-ink">Post not found</h1>
      <Link href="/blog" className="text-sm underline text-foreground/60 hover:text-ink transition">← Back to blog</Link>
    </div>
  );
}

function CtaBlock() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl bg-ink text-cream p-10 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-cream/40 mb-3">Work with Trimmic</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">Ready to bring your brand to life?</h2>
          <p className="text-cream/60 text-sm mb-6 max-w-sm mx-auto">Book a free kick-off call and let's figure out exactly what you need.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-6 py-3 text-sm font-medium hover:bg-cream/90 transition">
            Book a free call <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <PostContent slug={params.slug} />
      <Footer />
    </div>
  );
}
