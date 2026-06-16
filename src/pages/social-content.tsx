import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { Nav } from "@/components/nav";
import { useSEO } from "@/lib/seo";

const sp = (file: string) => `/work/social-posts/${file}`;

const row1 = [
  "1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg",
  "8.jpeg","9.jpeg","10.jpeg","11.jpeg","12.jpeg","13.jpeg",
];
const row2 = [
  "14.jpeg","15.jpeg","16.jpeg","17.jpeg","18.jpeg","19.jpeg","20.jpeg",
  "21.jpeg","22.jpeg","23.jpeg","24.jpeg","25.jpeg","social-main.jpg",
];
const row3 = [
  "delivery-1.jpg","delivery-3.jpg","dinner-1.png","dinner-2.jpg",
  "dinner-3.png","lunch-1.jpg","lunch-2.png","lunch-2b.jpg",
  "web-delivery-2.png","web-delivery-3.png","s2b.png","led-2b.png",
  "delivery-1.jpg",
];

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden select-none">
      <div className={`flex gap-3 ${reverse ? "marquee-rev" : "marquee-fwd"}`} style={{ width: "max-content" }}>
        {doubled.map((img, i) => (
          <div key={i} className="flex-none w-52 h-52 rounded-2xl overflow-hidden bg-white/5">
            <img
              src={sp(img)}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const services = [
  {
    title: "Feed Posts",
    desc: "Scroll-stopping visuals designed for your grid. From brand photography to graphic composites, every post earns its place.",
    color: "#FCBA3F",
    icon: "◻",
  },
  {
    title: "Stories & Reels",
    desc: "Vertical-first content built for fast attention. We hook in 3 seconds and deliver value in the next 12.",
    color: "#F07DB0",
    icon: "▷",
  },
  {
    title: "Campaign Drops",
    desc: "Coordinated launch content across every channel, dropping with precision, timing, and maximum impact.",
    color: "#85CC6A",
    icon: "⬡",
  },
];

const stats = [
  { k: "200+", v: "Posts Created" },
  { k: "500K+", v: "Monthly Reach" },
  { k: "15+",  v: "Active Brands" },
  { k: "3×",   v: "Avg Engagement Lift" },
];

const featured = [
  { file: "social-main.jpg", cls: "md:col-span-2 md:row-span-2" },
  { file: "led-2b.png",      cls: "" },
  { file: "s2b.png",         cls: "" },
  { file: "web-delivery-2.png", cls: "md:col-span-2" },
  { file: "dinner-3.png",    cls: "" },
];

export default function SocialContentPage() {
  useSEO({
    title: "Social Media Content Creation Services | Trimmic",
    description: "Scroll-stopping feed posts, Stories, Reels, and campaign content designed to build brands and drive engagement. See Trimmic's social media work.",
    path: "/social-content",
  });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.from(root.querySelectorAll(".sc-hero-line"), {
      yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.1,
    });
    gsap.from(root.querySelectorAll(".sc-hero-sub"), {
      opacity: 0, y: 20, duration: 0.9, ease: "power3.out", delay: 0.75,
    });

    const observers: IntersectionObserver[] = [];
    const reveal = (selector: string, from: gsap.TweenVars, dur = 0.85) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        gsap.set(el, from);
        const obs = new IntersectionObserver(([e]) => {
          if (!e.isIntersecting) return;
          gsap.to(el, { opacity: 1, y: 0, x: 0, scale: 1, duration: dur, ease: "power3.out",
            onComplete: () => gsap.set(el, { clearProps: "opacity,transform" }),
          });
          obs.disconnect();
        }, { threshold: 0.12 });
        obs.observe(el);
        observers.push(obs);
      });
    };

    reveal(".sc-fade",  { opacity: 0, y: 40 });
    reveal(".sc-left",  { opacity: 0, x: -40 });
    reveal(".sc-scale", { opacity: 0, scale: 0.96 }, 0.9);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div ref={rootRef} className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-center min-h-[75vh] px-8 md:px-14 lg:px-20 pt-36 pb-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#FCBA3F]/6 blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#F07DB0]/4 blur-[100px]" />
        </div>

        <div className="relative max-w-5xl">
          <span className="sc-hero-sub block text-xs font-medium uppercase tracking-[0.3em] text-white/40 mb-10">
            Social Media Content · Feed · Stories · Campaigns
          </span>
          <h1 className="font-display text-[clamp(3.5rem,8.5vw,9.5rem)] leading-[0.88] tracking-tight">
            <span className="overflow-hidden block pb-3">
              <span className="sc-hero-line block">Content that</span>
            </span>
            <span className="overflow-hidden block pb-3">
              <span className="sc-hero-line block font-serif-italic font-normal" style={{ color: "#FCBA3F" }}>
                stops the scroll.
              </span>
            </span>
          </h1>
          <p className="sc-hero-sub mt-10 text-white/50 text-lg md:text-xl max-w-xl leading-relaxed">
            From concept to publish, we create social content that builds brands, drives engagement, and makes your audience stop mid-swipe.
          </p>
          <div className="sc-hero-sub mt-10 flex gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-black rounded-full px-7 py-3.5 text-sm font-semibold hover:bg-[#FCBA3F] transition-colors duration-200">
              Start a project →
            </Link>
            <a href="#work" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-7 py-3.5 text-sm text-white/70 hover:border-white/50 hover:text-white transition-colors duration-200">
              See our work
            </a>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIPS ── */}
      <section className="py-8 space-y-3">
        <MarqueeRow images={row1} />
        <MarqueeRow images={row2} reverse />
        <MarqueeRow images={row3} />
      </section>

      {/* ── WHAT WE CREATE ── */}
      <section className="px-8 md:px-14 lg:px-20 py-28 md:py-36">
        <div className="max-w-2xl mb-16 sc-fade">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">What We Create</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.93]">
            Every post is a<br />
            <span className="font-serif-italic font-normal" style={{ color: "#F07DB0" }}>
              brand moment.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((card, i) => (
            <div
              key={i}
              className="sc-fade rounded-3xl p-8 border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
            >
              <div className="text-3xl mb-8" style={{ color: card.color }}>{card.icon}</div>
              <h3 className="font-display text-2xl mb-4">{card.title}</h3>
              <p className="text-white/50 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="border-t border-white/[0.07]">
        <div className="px-8 md:px-14 lg:px-20 py-20 grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <div key={s.k} className="sc-fade">
              <div className="font-display text-5xl md:text-6xl leading-none text-white">{s.k}</div>
              <div className="text-white/40 text-xs mt-3 uppercase tracking-[0.2em]">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED GRID ── */}
      <section id="work" className="px-8 md:px-14 lg:px-20 py-16">
        <div className="sc-fade mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-5">Featured Work</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.93]">
            Recent campaigns<br />
            <span className="font-serif-italic font-normal" style={{ color: "#4BBFAE" }}>
              fresh off the feed.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[260px] gap-4">
          {featured.map((item, i) => (
            <div
              key={i}
              className={`sc-scale rounded-2xl overflow-hidden bg-white/5 ${item.cls}`}
            >
              <img
                src={sp(item.file)}
                alt=""
                className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FULL GRID ── */}
      <section className="px-8 md:px-14 lg:px-20 py-8 pb-16">
        <div className="sc-fade mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">All Posts</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {[...row1, ...row2, ...row3.slice(0, 12)].map((file, i) => (
            <div key={i} className="sc-scale aspect-square rounded-xl overflow-hidden bg-white/5">
              <img
                src={sp(file)}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-14 lg:px-20 py-36 border-t border-white/[0.07]">
        <div className="sc-fade">
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.88] mb-12">
            Ready to own<br />
            <span className="font-serif-italic font-normal" style={{ color: "#FCBA3F" }}>
              your feed?
            </span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-black rounded-full px-10 py-5 text-base font-semibold hover:bg-[#FCBA3F] transition-colors duration-200"
            >
              Start a project →
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 border border-white/20 rounded-full px-10 py-5 text-base text-white/70 hover:border-white/50 hover:text-white transition-colors duration-200"
            >
              View full portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
