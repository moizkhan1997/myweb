import { Link } from "wouter";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { useSEO } from "@/lib/seo";
import { posts } from "@/blog/index";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  useSEO({
    title: "Blog — SaaS Video, Branding & Motion Design Insights | Trimmic",
    description: "Expert guides on SaaS explainer videos, logo animation, motion graphics, and brand strategy from Trimmic's creative team.",
    path: "/blog",
  });

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-foreground/40 uppercase tracking-widest mb-4">The Trimmic Blog</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] text-ink mb-6">
            Ideas worth<br />
            <span className="italic font-normal">reading.</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-xl">
            Guides on SaaS video, motion design, branding, and the creative decisions that actually move the needle.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto grid gap-6">
          {posts.map((post) => (
            <Link key={post.meta.slug} href={`/blog/${post.meta.slug}`} className="group block">
              <article className="rounded-2xl border border-border/60 bg-white/60 p-8 hover:shadow-[0_8px_40px_-12px_rgba(20,16,8,0.15)] transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Color swatch */}
                  <div
                    className={`shrink-0 w-full md:w-24 h-24 rounded-xl bg-gradient-to-br ${post.meta.coverGradient} opacity-90`}
                  />
                  <div className="flex-1 min-w-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.meta.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-ink/5 text-ink/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-semibold text-ink leading-snug mb-2 group-hover:text-ink/80 transition-colors">
                      {post.meta.title}
                    </h2>
                    <p className="text-foreground/55 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.meta.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-foreground/40">
                        <span>{formatDate(post.meta.date)}</span>
                        <span>·</span>
                        <span>{post.meta.readTime}</span>
                      </div>
                      <span className="text-sm font-medium text-ink flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
