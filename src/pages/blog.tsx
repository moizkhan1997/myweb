import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Footer } from "@/components/footer";
import { useSEO, useBreadcrumbJsonLd } from "@/lib/seo";
import { getAllPosts, urlFor, type BlogPost } from "@/lib/sanity";
import { posts as staticPosts } from "@/blog/index";
import gsap from "gsap";

const CATEGORY_GRADIENTS: Record<string, string> = {
  "SaaS Videos": "from-violet-500 to-indigo-500",
  "Motion Graphics": "from-pink-500 to-rose-400",
  "Branding": "from-amber-400 to-orange-500",
  "Shorts": "from-sky-400 to-cyan-400",
  "YouTube": "from-red-500 to-rose-500",
  "UGC": "from-green-400 to-emerald-500",
  "Digital Marketing": "from-blue-500 to-violet-500",
  "Content Creation": "from-fuchsia-500 to-pink-500",
};
const DEFAULT_GRADIENT = "from-ink to-ink/70";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getCoverGradient(post: BlogPost) {
  const cat = post.categories?.[0]?.title ?? "";
  return CATEGORY_GRADIENTS[cat] ?? DEFAULT_GRADIENT;
}

export default function Blog() {
  useSEO({
    title: "Blog — SaaS Video, Branding & Motion Design Insights | Trimmic",
    description: "Expert guides on SaaS explainer videos, logo animation, motion graphics, and brand strategy from Trimmic's creative team.",
    path: "/blog",
  });
  useBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  const rootRef = useRef<HTMLDivElement>(null);
  const [sanityPosts, setSanityPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts()
      .then(setSanityPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Merge Sanity posts + static posts, dedupe by slug, sort newest first
  const sanityslugs = new Set(sanityPosts.map((p) => p.slug.current));
  const filteredStatic = staticPosts.filter((p) => !sanityslugs.has(p.meta.slug));
  type MergedPost =
    | { kind: "sanity"; post: BlogPost }
    | { kind: "static"; post: (typeof staticPosts)[0] };
  const merged: MergedPost[] = [
    ...sanityPosts.map((p) => ({ kind: "sanity" as const, post: p })),
    ...filteredStatic.map((p) => ({ kind: "static" as const, post: p })),
  ].sort((a, b) => {
    const dateA = a.kind === "sanity" ? a.post.publishedAt : a.post.meta.date;
    const dateB = b.kind === "sanity" ? b.post.publishedAt : b.post.meta.date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".g-blog-hero-label", {
        opacity: 0, y: 16, duration: 0.8, ease: "power2.out",
      });
      gsap.from(".g-blog-hero-h1", {
        opacity: 0, y: 28, duration: 1.1, ease: "power2.out", delay: 0.15,
      });
      gsap.from(".g-blog-hero-sub", {
        opacity: 0, y: 24, duration: 1, ease: "power2.out", delay: 0.4,
      });

      const cards = root.querySelectorAll(".g-blog-card");
      if (cards.length) {
        const obs = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            gsap.from(cards, { opacity: 0, y: 35, duration: 0.8, ease: "power2.out", stagger: 0.12 });
            obs.disconnect();
          }
        }, { threshold: 0.1 });
        obs.observe(cards[0]);
        return () => obs.disconnect();
      }
    }, root);
    return () => ctx.revert();
  }, [merged.length]);

  return (
    <div ref={rootRef} className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="g-blog-hero-label text-sm font-medium text-foreground/40 uppercase tracking-widest mb-4">The Trimmic Blog</p>
          <h1 className="g-blog-hero-h1 font-display text-5xl md:text-6xl font-semibold leading-[1.05] text-ink mb-6">
            Ideas worth<br />
            <span className="italic font-normal">reading.</span>
          </h1>
          <p className="g-blog-hero-sub text-lg text-foreground/60 max-w-xl">
            Guides on SaaS video, motion design, branding, and the creative decisions that actually move the needle.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto grid gap-6">
          {loading && (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-white/60 p-8 animate-pulse h-40" />
              ))}
            </>
          )}

          {!loading && merged.length === 0 && (
            <div className="py-20 text-center text-foreground/40">
              <p className="font-display text-3xl mb-2">No posts yet.</p>
              <p className="text-sm">Check back soon — we're working on something worth reading.</p>
            </div>
          )}

          {!loading && merged.map((item) => {
            const slug = item.kind === "sanity" ? item.post.slug.current : item.post.meta.slug;
            const title = item.kind === "sanity" ? item.post.title : item.post.meta.title;
            const description = item.kind === "sanity" ? item.post.excerpt : item.post.meta.description;
            const date = item.kind === "sanity" ? item.post.publishedAt : item.post.meta.date;
            const readTimeStr = item.kind === "sanity"
              ? (item.post.readTime && item.post.readTime > 0 ? `${item.post.readTime} min read` : "")
              : item.post.meta.readTime;
            const tags = item.kind === "sanity"
              ? (item.post.categories?.map((c) => c.title) ?? ["Article"])
              : item.post.meta.tags;
            const gradient = item.kind === "sanity"
              ? getCoverGradient(item.post)
              : item.post.meta.coverGradient;

            return (
              <Link key={slug} href={`/blog/${slug}`} className="g-blog-card group block">
                <article className="rounded-2xl border border-border/60 bg-white/60 p-8 hover:shadow-[0_8px_40px_-12px_rgba(20,16,8,0.15)] transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Cover image or gradient swatch */}
                    {item.kind === "sanity" && item.post.mainImage ? (
                      <div className="shrink-0 w-full md:w-24 h-24 rounded-xl overflow-hidden">
                        <img
                          src={urlFor(item.post.mainImage).width(192).height(192).fit("crop").url()}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`shrink-0 w-full md:w-24 h-24 rounded-xl bg-gradient-to-br ${gradient} opacity-90`} />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-ink/5 text-ink/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-ink leading-snug mb-2 group-hover:text-ink/80 transition-colors">
                        {title}
                      </h2>
                      {description && (
                        <p className="text-foreground/55 text-sm leading-relaxed mb-4 line-clamp-2">
                          {description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-foreground/40">
                          <span>{formatDate(date)}</span>
                          {readTimeStr && <><span>·</span><span>{readTimeStr}</span></>}
                        </div>
                        <span className="text-sm font-medium text-ink flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                          Read <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
