import { Link } from "wouter";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { useSEO, useJsonLd } from "@/lib/seo";
import { getPost } from "@/blog/index";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function PostContent({ slug }: { slug: string }) {
  const post = getPost(slug);

  useSEO({
    title: post ? `${post.meta.title} | Trimmic Blog` : "Post Not Found | Trimmic Blog",
    description: post?.meta.description ?? "Trimmic blog post.",
    path: `/blog/${slug}`,
  });

  useJsonLd(post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Organization", name: "Trimmic", url: "https://www.trimmic.com" },
    publisher: { "@type": "Organization", name: "Trimmic", url: "https://www.trimmic.com" },
    url: `https://www.trimmic.com/blog/${post.meta.slug}`,
  } : { "@context": "https://schema.org", "@type": "WebPage" });

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6 py-40">
        <h1 className="font-display text-4xl font-semibold text-ink">Post not found</h1>
        <Link href="/blog" className="text-sm underline text-foreground/60 hover:text-ink transition">
          ← Back to blog
        </Link>
      </div>
    );
  }

  const { meta, Content } = post;

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-ink transition mb-8">
            ← Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {meta.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-ink/5 text-ink/60">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1] mb-6">
            {meta.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-foreground/40">
            <span>{formatDate(meta.date)}</span>
            <span>·</span>
            <span>{meta.readTime}</span>
          </div>
        </div>
      </section>

      {/* Gradient rule */}
      <div className="px-6 mb-12">
        <div className={`max-w-2xl mx-auto h-1.5 rounded-full bg-gradient-to-r ${meta.coverGradient}`} />
      </div>

      {/* Article */}
      <article className="px-6 pb-24">
        <div className="max-w-2xl mx-auto blog-prose">
          <Content />
        </div>
      </article>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-ink text-cream p-10 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-cream/40 mb-3">Work with Trimmic</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Ready to bring your brand to life?
            </h2>
            <p className="text-cream/60 text-sm mb-6 max-w-sm mx-auto">
              Book a free kick-off call and let's figure out exactly what you need.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-6 py-3 text-sm font-medium hover:bg-cream/90 transition"
            >
              Book a free call <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <PostContent slug={params.slug} />
      <Footer />
    </div>
  );
}
