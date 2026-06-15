import React, { useState, useEffect, useCallback } from "react";
import { LogoWhite } from "@/components/nav";
import work1 from "@assets/work-1_1781021356324.jpg";
import work2 from "@assets/work-2_1781021356324.jpg";
import work3 from "@assets/work-3_1781021356324.jpg";
import work4 from "@assets/work-4_1781021356324.jpg";

const portfolioItems = [
  { id: 1,  src: work1, title: "Nova Studios",     client: "B2B SaaS",           category: "SaaS Videos",    tall: true  },
  { id: 2,  src: work2, title: "Pop Beverage Co.", client: "Consumer Brand",      category: "Branding",       tall: false },
  { id: 3,  src: work3, title: "Boomerang FM",     client: "Media Network",       category: "Shorts",         tall: false },
  { id: 4,  src: work4, title: "Folio Atelier",    client: "Creative Agency",     category: "YouTube Videos", tall: true  },
  { id: 5,  src: work2, title: "Pulse Health",     client: "HealthTech App",      category: "SaaS Videos",    tall: false },
  { id: 6,  src: work1, title: "Drift Finance",    client: "Fintech Brand",       category: "Motion Graphics",tall: true  },
  { id: 7,  src: work4, title: "Urban Bites",      client: "F&B Chain",           category: "UGC",            tall: false },
  { id: 8,  src: work3, title: "Atlas Ventures",   client: "Venture Capital",     category: "Branding",       tall: true  },
  { id: 9,  src: work1, title: "Kura Learning",    client: "EdTech Platform",     category: "Shorts",         tall: false },
  { id: 10, src: work2, title: "Sonder Studio",    client: "Creative House",      category: "Motion Graphics",tall: false },
  { id: 11, src: work4, title: "Mint Social",      client: "Social Platform",     category: "YouTube Videos", tall: true  },
  { id: 12, src: work3, title: "GreenLeaf Co.",    client: "Sustainability Brand", category: "UGC",           tall: false },
];

const testimonials = [
  {
    quote: "Trimmic delivered our SaaS demo in record time — our trial-to-paid conversion jumped 38% in the first month.",
    name: "Sarah Chen",
    role: "Head of Marketing, Pulse Health",
  },
  {
    quote: "They got our brand voice on the first try. The motion work made our product launch feel like a cultural moment.",
    name: "Marcus Rivera",
    role: "CEO, Nova Studios",
  },
  {
    quote: "Trimmic doesn't just execute — they think. The fastest, most reliable creative team we've ever worked with.",
    name: "Aisha Patel",
    role: "Brand Director, Atlas Ventures",
  },
];

type CmsItem = {
  id: number;
  title: string;
  client: string;
  category: string;
  tall: boolean;
  imageUrl: string | null;
  videoUrl: string;
  description: string;
};

function VideoModal({ item, onClose }: { item: CmsItem; onClose: () => void }) {
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const isDirectVideo = item.videoUrl && /\.(mp4|mov|webm)$/i.test(item.videoUrl);
  const isUploadedVideo = item.imageUrl && /\.(mp4|mov|webm)$/i.test(item.imageUrl);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center text-xl z-10"
      >
        ✕
      </button>
      <div
        className="relative w-full max-w-5xl"
        style={{ aspectRatio: "16/9" }}
        onClick={e => e.stopPropagation()}
      >
        {ytId ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            className="h-full w-full rounded-2xl"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : isDirectVideo ? (
          <video src={item.videoUrl} className="h-full w-full rounded-2xl" controls autoPlay />
        ) : isUploadedVideo ? (
          <video src={item.imageUrl!} className="h-full w-full rounded-2xl" controls autoPlay />
        ) : (
          <div className="h-full w-full rounded-2xl bg-ink flex items-center justify-center text-cream/40 text-lg">
            No video available
          </div>
        )}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="font-display text-xl text-white">{item.title}</p>
        <p className="text-sm text-white/50 mt-1">{item.client}</p>
      </div>
    </div>
  );
}

function getYouTubeId(url: string) {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return m ? m[1] : null;
}

function ItemMedia({ item }: { item: CmsItem }) {
  if (item.imageUrl) {
    if (/\.(mp4|mov|webm)$/i.test(item.imageUrl)) {
      return <video src={item.imageUrl} className="h-full w-full object-cover" muted loop playsInline autoPlay />;
    }
    return <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />;
  }
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  if (ytId) {
    return <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />;
  }
  return (
    <div className="h-full w-full flex items-center justify-center text-4xl font-bold text-white"
      style={{ background: "linear-gradient(120deg,#febe41,#e17eb3,#8cc86c,#4bbfae)" }}>
      {item.title?.[0] ?? "T"}
    </div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cmsItems, setCmsItems] = useState<CmsItem[] | null>(null);
  const [modalItem, setModalItem] = useState<CmsItem | null>(null);
  const closeModal = useCallback(() => setModalItem(null), []);

  useEffect(() => {
    fetch("/portfolio-data.json?" + Date.now())
      .then(r => r.json())
      .then(d => { if (Array.isArray(d.items) && d.items.length > 0) setCmsItems(d.items); })
      .catch(() => {});
  }, []);

  const staticAsCms: CmsItem[] = portfolioItems.map(i => ({
    id: i.id,
    title: i.title,
    client: i.client,
    category: i.category,
    tall: i.tall,
    imageUrl: i.src,
    videoUrl: "",
    description: "",
  }));

  const allItems = cmsItems ?? staticAsCms;
  const categories = ["All", ...Array.from(new Set(allItems.map(i => i.category)))];

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((it) => it.category === activeCategory);

  return (
    <div className="bg-ink text-cream">
      {modalItem && <VideoModal item={modalItem} onClose={closeModal} />}
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-[0.12]" />
        <div aria-hidden className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-gradient-brand opacity-15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-brand-green" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-cream/50">
              The stream · 200+ projects
            </span>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
            A never-ending stream
            <br />
            of{" "}
            <span className="font-serif-italic font-normal text-gradient-brand">damn-good</span>{" "}
            work.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-cream/60 leading-relaxed">
            Every project here was built to stop the scroll, move the needle, and leave a mark. Dig in.
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-40 bg-ink/95 backdrop-blur-xl border-b border-cream/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-2 py-4 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-gradient-brand text-ink"
                    : "border border-cream/20 text-cream/70 hover:border-cream/40 hover:text-cream"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          {filtered.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="group relative mb-5 block break-inside-avoid overflow-hidden rounded-[1.5rem] cursor-pointer"
                  style={{ height: item.tall ? "440px" : "280px" }}
                  onClick={() => setModalItem(item)}
                >
                  <ItemMedia item={item} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-60 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="translate-y-2 group-hover:translate-y-0 transition duration-300">
                      <span className="text-xs uppercase tracking-[0.2em] text-cream/50">{item.category}</span>
                      <h3 className="font-display text-2xl text-cream mt-1">{item.title}</h3>
                      <p className="text-sm text-cream/50 mt-0.5">{item.client}</p>
                      {item.description && (
                        <p className="text-xs text-cream/40 mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition duration-300 text-sm">
                    ▶
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-4xl text-cream/30">Nothing here yet.</p>
              <p className="mt-3 text-cream/40 text-sm">We ship fast — check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-cream/10 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { k: "200+", v: "Projects shipped" },
              { k: "60+",  v: "Brands served" },
              { k: "10",   v: "Creative disciplines" },
              { k: "14",   v: "Awards on the shelf" },
            ].map((s) => (
              <div key={s.v} className="text-center">
                <div className="font-display text-5xl md:text-6xl text-cream">{s.k}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-cream/40 mt-2">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-cream/50">What clients say</span>
            <h2 className="font-display mt-4 text-5xl md:text-6xl leading-[0.95]">
              Don't take our word{" "}
              <span className="font-serif-italic font-normal text-gradient-brand">for it.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-3xl border border-cream/10 bg-cream/[0.04] p-8 hover:bg-cream/[0.07] transition"
              >
                <span className="font-serif-italic text-4xl text-brand-yellow leading-none">"</span>
                <p className="mt-3 text-cream/80 leading-relaxed">{t.quote}</p>
                <div className="mt-6 border-t border-cream/10 pt-6">
                  <div className="font-display text-lg text-cream">{t.name}</div>
                  <div className="text-sm text-cream/40 mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-12 md:p-20 text-ink">
            <div aria-hidden className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/20 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-ink/50">
                Ready to join this stream?
              </span>
              <h2 className="font-display mt-4 text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
                Add your project
                <br />
                <span className="font-serif-italic font-normal">to the stream.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-ink/70 leading-relaxed">
                Tell us what you're building. We'll make it look like it belongs here — and then some.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-8 py-4 text-base font-medium hover:bg-ink/90 transition"
                >
                  Start a Project →
                </a>
                <a
                  href="/#services"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-ink/5 px-8 py-4 text-base font-medium hover:bg-ink/10 transition"
                >
                  See Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream/10 pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <LogoWhite />
              <p className="mt-6 max-w-sm text-cream/70">
                A creative studio with a rebel soul. Born to make brands that don't sit quietly in the corner.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Studio</div>
              <ul className="space-y-2.5 text-sm">
                <li><a href="/#studio" className="hover:text-cream/70 transition">About</a></li>
                <li><a href="/#work" className="hover:text-cream/70 transition">Work</a></li>
                <li><a href="/#services" className="hover:text-cream/70 transition">Services</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Social</div>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="hover:text-cream/70 transition">Instagram</a></li>
                <li><a href="#" className="hover:text-cream/70 transition">Behance</a></li>
                <li><a href="#" className="hover:text-cream/70 transition">Dribbble</a></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="text-xs uppercase tracking-widests text-cream/50 mb-4">Say hi</div>
              <a href="mailto:hello@trimmic.com" className="font-display text-2xl text-gradient-brand">
                hello@trimmic.com
              </a>
              <p className="mt-3 text-cream/70 text-sm">+92 347 255 1975</p>
            </div>
          </div>
          <div className="mt-16 pt-6 border-t border-cream/10 flex flex-wrap items-center justify-between gap-4 text-sm text-cream/60">
            <p>© {new Date().getFullYear()} Trimmic Studio. All rights reserved.</p>
            <p className="font-serif-italic">Wearing this site may cause design addiction.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
