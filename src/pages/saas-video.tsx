import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Nav } from "@/components/nav";
import agencyPromoUrl from "@assets/agency-promo.mp4?url";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type CmsItem = {
  id: number; title: string; client: string; category: string;
  tall: boolean; imageUrl: string | null; videoUrl: string; description: string;
};

function getYouTubeId(url: string) {
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
  return m ? m[1] : null;
}

const WHY_US: { n: string; title: string; body: string }[] = [
  { n: "01", title: "Story Before Script", body: "We start with your product, your users, and your goals. Every video begins with strategy, not a blank timeline." },
  { n: "02", title: "End-to-End Production", body: "Scriptwriting, storyboarding, animation, voiceover, sound design. One team. Zero handoff chaos." },
  { n: "03", title: "Flexible Packages", body: "One-off launch video or ongoing monthly content, built around your roadmap, not ours." },
  { n: "04", title: "SaaS-Native Visuals", body: "We know dashboards, UI flows, and feature walkthroughs. Our animations feel native, not like a generic template." },
  { n: "05", title: "Revision-Friendly Process", body: "Feedback rounds are built into every stage. We don't stop until you love every frame." },
  { n: "06", title: "Fast Turnaround", body: "Most projects delivered in 7–14 business days. Because your launch window won't wait." },
];

type Plan = { title: string; price: string; desc: string; features: string[]; popular?: boolean; accent: string };
const PLANS: Plan[] = [
  {
    title: "Starter Video", price: "$499", accent: "var(--brand-yellow)",
    desc: "Perfect for early-stage SaaS teams who need one sharp, conversion-focused video.",
    features: [
      "60–90 second animated video",
      "Script & storyboard included",
      "Professional voiceover",
      "Background music & sound design",
      "2 revision rounds",
      "HD delivery (MP4)",
    ],
  },
  {
    title: "Growth Package", price: "$1,200", popular: true, accent: "var(--brand-pink)",
    desc: "For growing SaaS teams who need a full video suite: hero, onboarding, and feature highlights.",
    features: [
      "Up to 3 videos (60–90 sec each)",
      "Script & storyboard for all",
      "Custom motion graphics",
      "Professional voiceover",
      "Unlimited revisions",
      "HD + web-optimised delivery",
      "Slack support throughout",
    ],
  },
  {
    title: "Monthly Retainer", price: "$2,500/mo", accent: "var(--brand-green)",
    desc: "An embedded video production partner, without the cost of hiring in-house.",
    features: [
      "4 videos per month",
      "Dedicated motion designer",
      "Scripts, voiceovers & animations",
      "Weekly async check-ins",
      "Slack + Notion project tracking",
      "Priority turnaround",
      "Monthly performance review",
    ],
  },
];

const WORK: { title: string; cat: string; tint: string }[] = [
  { title: "Notion-style Explainer", cat: "SaaS Explainer · Motion Graphics", tint: "var(--brand-yellow)" },
  { title: "E-commerce Product Launch", cat: "Product Video · 2D Animation", tint: "var(--brand-pink)" },
  { title: "FinTech Onboarding Flow", cat: "Onboarding · Screen Recording", tint: "var(--brand-green)" },
  { title: "HR Platform Feature Reel", cat: "Feature Video · Motion Graphics", tint: "var(--brand-turquoise)" },
  { title: "AI Tool Launch Video", cat: "Launch Video · 2D Animation", tint: "var(--brand-yellow)" },
  { title: "SaaS Dashboard Walkthrough", cat: "Explainer · Screen Motion", tint: "var(--brand-pink)" },
];

const TESTIMONIALS: { quote: string; name: string; loc: string }[] = [
  { quote: "Trimmic took our boring product tour and turned it into something we're proud to put on our homepage. Conversions went up 34% in the first month.", name: "Sarah K., Founder", loc: "Austin, TX" },
  { quote: "We needed a video fast for our Product Hunt launch. They delivered in 5 days and it looked better than anything we'd seen from bigger agencies.", name: "James R., Head of Marketing", loc: "London, UK" },
  { quote: "Finally a team that actually understands SaaS. They didn't just animate our UI. They told our story. Our investors loved it.", name: "Priya M., CEO", loc: "Singapore" },
  { quote: "The script they wrote was better than what our copywriter came up with. End-to-end service, zero stress.", name: "Tom W., Product Lead", loc: "Berlin, Germany" },
  { quote: "We've worked with 3 video agencies before Trimmic. None of them came close. These guys just get it.", name: "Ali H., CMO", loc: "Dubai, UAE" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What types of SaaS videos do you make?", a: "We cover everything: product explainers, onboarding walkthroughs, feature announcements, investor pitch videos, social media cuts, and homepage hero videos." },
  { q: "Do you write the script too?", a: "Yes, always. Every project starts with a strategy call, then we craft the script and storyboard before any animation begins. Your input shapes every word." },
  { q: "How long does a video take?", a: "Most single videos are delivered within 7–14 business days. Rush delivery is available on request." },
  { q: "Can I provide my own script or voiceover?", a: "Absolutely. We adapt to your workflow: your script, your voiceover artist, your existing brand assets. We just make it shine." },
  { q: "What format will I receive the final video in?", a: "HD MP4 optimised for web. We also include social cuts (16:9, 9:16, 1:1) in Growth and Retainer packages." },
  { q: "Do you offer revisions?", a: "Yes, revision rounds are built into every package. We don't consider a project done until you're genuinely happy." },
  { q: "Can I pause or cancel the monthly retainer?", a: "No long-term contracts. Pause or cancel before your next billing cycle. No questions asked." },
];

const SUB_NAV_LINKS = [
  { label: "Viral Hits",    href: "#viral-hits",     color: "var(--brand-yellow)" },
  { label: "Our Process",   href: "#our-process",    color: "var(--brand-pink)" },
  { label: "Pricing",       href: "#pricing",         color: "var(--brand-green)" },
  { label: "Previous Work", href: "#previous-work",  color: "var(--brand-turquoise)" },
  { label: "Testimonials",  href: "#testimonials",   color: "var(--brand-yellow)" },
  { label: "FAQ",           href: "#faq",             color: "var(--brand-pink)" },
];

function SubNav() {
  return (
    <div className="fixed top-[76px] left-1/2 -translate-x-1/2 z-40">
      <nav className="flex items-center divide-x divide-border/50 overflow-hidden rounded-full border border-border/50 bg-background/90 shadow-soft backdrop-blur-xl">
        {SUB_NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group relative flex items-center gap-2 px-5 py-2.5 transition hover:bg-black/[0.04]"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-150"
              style={{ backgroundColor: link.color }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--ink)]/55 transition group-hover:text-[color:var(--ink)]">
              {link.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function SaasVideosPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const tweens: gsap.core.Tween[] = [];
    const observers: IntersectionObserver[] = [];

    // Hero — staggered entry with clip reveal on h1
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-badge"), {
      opacity: 0, scale: 0.85, duration: 0.6, ease: "back.out(1.7)", delay: 0.2,
    }));
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-h1"), {
      yPercent: 110, duration: 1.1, ease: "power4.out", delay: 0.45,
    }));
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-sub"), {
      opacity: 0, y: 24, duration: 0.8, ease: "power3.out", delay: 0.75,
    }));
    tweens.push(gsap.from(root.querySelectorAll(".g-sp-hero-btns > *"), {
      opacity: 0, y: 16, duration: 0.65, ease: "power3.out", delay: 0.9, stagger: 0.1,
    }));

    const onScroll = (triggerSel: string, targetSel: string, vars: gsap.TweenVars) => {
      const trigger = root.querySelector(triggerSel);
      const targets = Array.from(root.querySelectorAll(targetSel));
      if (!trigger || !targets.length) return;
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          tweens.push(gsap.from(targets, vars));
          obs.disconnect();
        }
      }, { threshold: 0.12 });
      obs.observe(trigger);
      observers.push(obs);
    };

    // Showreel — left/right slide
    onScroll(".g-sp-showreel-left",  ".g-sp-showreel-left",  { x: -60, duration: 1, ease: "power3.out" });
    onScroll(".g-sp-showreel-right", ".g-sp-showreel-right", { x: 60,  duration: 1, ease: "power3.out" });

    // Section headings — badge fades, h2 clips up from below
    onScroll(".g-sp-why-heading",     ".g-sp-why-badge",     { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-why-heading",     ".g-sp-why-h2",        { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-pricing-heading", ".g-sp-pricing-badge", { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-pricing-heading", ".g-sp-pricing-h2",    { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-work-heading",    ".g-sp-work-badge",    { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-work-heading",    ".g-sp-work-h2",       { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-test-heading",    ".g-sp-test-badge",    { opacity: 0, y: 10, duration: 0.45, ease: "power2.out" });
    onScroll(".g-sp-test-heading",    ".g-sp-test-h2",       { yPercent: 105, duration: 0.95, ease: "power4.out", delay: 0.08 });
    onScroll(".g-sp-faq-heading",     ".g-sp-faq-h2",        { yPercent: 105, duration: 0.95, ease: "power4.out" });

    // Section content
    onScroll(".g-sp-why-grid",   ".g-sp-why-item",   { opacity: 0, y: 50, duration: 0.7,  ease: "power3.out", stagger: 0.06 });
    onScroll(".g-sp-plans-grid", ".g-sp-plan",       { opacity: 0, y: 55, duration: 0.8,  ease: "expo.out" });
    onScroll(".g-sp-work-grid",  ".g-sp-work-card",  { opacity: 0, y: 45, scale: 0.96, duration: 0.7, ease: "power3.out", stagger: 0.08 });
    onScroll(".g-sp-test-stats", ".g-sp-test-stat",  { opacity: 0, x: -18, duration: 0.5, ease: "power3.out", stagger: 0.07 });
    onScroll(".g-sp-faq-list",   ".g-sp-faq-item",   { opacity: 0, x: -28, duration: 0.6, ease: "power3.out", stagger: 0.05 });
    onScroll(".g-sp-cta-content",".g-sp-cta-content",{ opacity: 0, y: 55, scale: 0.97, duration: 0.9, ease: "expo.out" });

    return () => {
      tweens.forEach(t => t.kill());
      observers.forEach(o => o.disconnect());
    };
  }, []);

  return (
    <div ref={pageRef} className="bg-[color:var(--cream)] text-[color:var(--ink)]">
      <Nav />
      <SubNav />
      <main>

        <Hero />
        <Showreel />
        <WhyUs />
        <Pricing />
        <PreviousWork />
        <Testimonials />
        <FAQ />
        <ClosingCTA />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section id="viral-hits" className="relative min-h-[100svh] w-full overflow-hidden bg-[#08090d] text-white">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={agencyPromoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(255,215,110,0.16), transparent 24%), radial-gradient(circle at 80% 20%, rgba(236,121,208,0.15), transparent 20%), linear-gradient(90deg, rgba(8,9,13,0.95), rgba(8,9,13,0.7) 40%, rgba(8,9,13,0.25) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute left-10 top-24 h-1 w-40 rounded-full bg-[#f9c946]/40 blur-2xl" aria-hidden />
        <div className="absolute right-10 top-44 h-1 w-56 rounded-full bg-[#e16fb3]/30 blur-2xl" aria-hidden />
        <div className="absolute left-1/2 top-56 h-1 w-64 -translate-x-1/2 rounded-full bg-[#4bbfae]/30 blur-2xl" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-8 md:px-14 lg:px-20 pt-32 pb-20">
        <div className="g-sp-hero-content max-w-3xl">
          <p className="g-sp-hero-badge text-xs uppercase tracking-[0.35em] text-white/50">SaaS video production</p>
          <div className="mt-6 overflow-hidden pb-2">
            <h1 className="g-sp-hero-h1 font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
              SaaS Videos That{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-yellow)]">Turn</span>{" "}
              Signups Into Sales
            </h1>
          </div>
          <p className="g-sp-hero-sub mt-6 max-w-2xl text-base text-white/75 sm:text-lg">
            Whether you're launching a product, onboarding users, or pitching investors, our SaaS videos make complex software impossible to ignore.
          </p>
          <div className="g-sp-hero-btns mt-10 flex flex-wrap gap-4">
            <a href="#pricing" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#090b10] transition hover:opacity-90">
              View Pricing →
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              Book a Call →
            </a>
          </div>
        </div>
      </div>

      <a
        href="#our-process"
        className="absolute bottom-10 left-6 z-10 flex items-center gap-3 text-white/90 sm:left-16"
      >
        <span className="relative inline-flex h-4 w-4 items-center justify-center">
          <span className="pulse-ring relative inline-block h-3 w-3 rounded-full bg-[color:var(--brand-yellow)]" />
        </span>
        <span className="text-sm">Check out the offer</span>
      </a>
    </section>
  );
}

function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="our-process" className="px-8 md:px-14 lg:px-20 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div className="g-sp-showreel-left">
          <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            SaaS Video in Action
          </span>
          <h2 className="font-display mt-6 text-5xl leading-[0.95] sm:text-6xl md:text-7xl text-[color:var(--ink)]">
            We make your product{" "}
            <span className="font-serif-italic font-normal text-[color:var(--brand-pink)]">impossible</span>{" "}
            to scroll past.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-[color:var(--ink)]/75">
            We work with SaaS founders and marketing teams to craft videos that explain fast,
            engage deep, and convert hard. From first frame to final cut. Every second earns its place.
          </p>
        </div>
        <div className="g-sp-showreel-right">
          <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-soft">
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#0a0c11]">
              <video
                ref={videoRef}
                src={agencyPromoUrl}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                onClick={toggle}
              />
            </div>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Pause showreel" : "Play showreel"}
              className={`absolute inset-0 flex items-center justify-center transition ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-[color:var(--ink)] shadow-xl transition hover:scale-105">
                {playing ? (
                  <span className="flex gap-1.5">
                    <span className="block h-6 w-1.5 bg-[color:var(--ink)]" />
                    <span className="block h-6 w-1.5 bg-[color:var(--ink)]" />
                  </span>
                ) : (
                  <span className="ml-1 block h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-[color:var(--ink)]" />
                )}
              </span>
            </button>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--ink)]/60">
            Showreel 2025
          </p>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-why-heading">
          <span className="g-sp-why-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Why Us?
          </span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-why-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              Sharp.{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-green)]">Story-led.</span>
              <br />
              Built to Convert.
            </h2>
          </div>
        </div>
        <div className="g-sp-why-grid mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {WHY_US.map((it) => (
            <div key={it.n} className="g-sp-why-item border-t border-black/15 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl text-[color:var(--ink)]/40">{it.n}</span>
                <h3 className="font-display text-2xl">{it.title}</h3>
              </div>
              <p className="mt-3 max-w-md text-[color:var(--ink)]/75">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-pricing-heading">
          <span className="g-sp-pricing-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Pricing
          </span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-pricing-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              Flexible Plans for <br />
              Every{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-turquoise)]">Stage</span>{" "}
              of Growth
            </h2>
          </div>
        </div>
        <div className="g-sp-plans-grid mt-14 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.title}
              className={`g-sp-plan relative flex flex-col rounded-3xl border bg-white p-8 transition hover:-translate-y-1 hover:shadow-2xl ${
                p.popular ? "border-[color:var(--ink)] shadow-xl ring-2 ring-[color:var(--ink)]" : "border-black/10"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--ink)] px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}
              <span className="inline-block h-2 w-12 rounded-full" style={{ backgroundColor: p.accent }} />
              <h3 className="font-display mt-5 text-3xl">{p.title}</h3>
              <p className="font-display mt-3 text-5xl">{p.price}</p>
              <p className="mt-3 text-sm text-[color:var(--ink)]/70">{p.desc}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex justify-center rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Book a Call
              </a>
              <ul className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-0.5 text-[color:var(--brand-green)]">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviousWork() {
  const [cmsItems, setCmsItems] = useState<CmsItem[]>([]);

  useEffect(() => {
    fetch("/portfolio-data.json?" + Date.now())
      .then(r => r.json())
      .then(d => {
        const filtered = (d.items || []).filter((i: CmsItem) => i.category === "SaaS Videos");
        setCmsItems(filtered);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="previous-work" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-work-heading">
          <span className="g-sp-work-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Previous Work
          </span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-work-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              How we do anything is <br />
              how we do{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-yellow)]">everything.</span>
            </h2>
          </div>
        </div>
        <div className="g-sp-work-grid mt-14 grid gap-6 md:grid-cols-2">
          {cmsItems.length > 0
            ? cmsItems.map((item) => <CmsWorkCard key={item.id} item={item} />)
            : WORK.map((w) => <WorkCard key={w.title} {...w} />)
          }
        </div>
      </div>
    </section>
  );
}

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center text-xl z-10">✕</button>
      <div className="relative w-full max-w-5xl" style={{ aspectRatio: "16/9" }} onClick={e => e.stopPropagation()}>
        {ytId ? (
          <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`} className="h-full w-full rounded-2xl" allow="autoplay; fullscreen" allowFullScreen />
        ) : isDirectVideo ? (
          <video src={item.videoUrl} className="h-full w-full rounded-2xl" controls autoPlay />
        ) : isUploadedVideo ? (
          <video src={item.imageUrl!} className="h-full w-full rounded-2xl" controls autoPlay />
        ) : (
          <div className="h-full w-full rounded-2xl bg-black flex items-center justify-center text-white/40">No video available</div>
        )}
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="font-display text-xl text-white">{item.title}</p>
        {item.client && <p className="text-sm text-white/50 mt-1">{item.client}</p>}
      </div>
    </div>
  );
}

function CmsWorkCard({ item }: { item: CmsItem }) {
  const [open, setOpen] = useState(false);
  const ytId = item.videoUrl ? getYouTubeId(item.videoUrl) : null;
  const thumb = item.imageUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);
  return (
    <>
      {open && <VideoModal item={item} onClose={() => setOpen(false)} />}
      <div
        className="g-sp-work-card group relative aspect-video overflow-hidden rounded-3xl cursor-pointer"
        style={!thumb ? { backgroundImage: "linear-gradient(135deg,var(--brand-yellow) 0%,#1a1a1a 100%)" } : undefined}
        onClick={() => setOpen(true)}
      >
        {thumb && (
          /\.(mp4|mov|webm)$/i.test(thumb)
            ? <video src={thumb} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline autoPlay />
            : <img src={thumb} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div>
            <h3 className="font-display text-2xl text-white sm:text-3xl">{item.title}</h3>
            {item.client && <p className="text-sm text-white/50 mt-0.5">{item.client}</p>}
          </div>
          <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">{item.category}</span>
        </div>
        <div className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition text-sm">▶</div>
      </div>
    </>
  );
}

function WorkCard({ title, cat, tint }: { title: string; cat: string; tint: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <div
      className="g-sp-work-card group relative aspect-video overflow-hidden rounded-3xl"
      style={{ backgroundImage: `linear-gradient(135deg, ${tint} 0%, #1a1a1a 100%)` }}
      onMouseEnter={() => ref.current?.play().catch(() => {})}
      onMouseLeave={() => { const v = ref.current; if (v) { v.pause(); v.currentTime = 0; } }}
    >
      <video ref={ref} muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-0 transition group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <h3 className="font-display text-2xl text-white sm:text-3xl">{title}</h3>
        <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {cat}
        </span>
      </div>
    </div>
  );
}

function Testimonials() {
  const stats = ["50+ Videos Delivered", "100% Client Satisfaction", "4.9/5.0 Average Rating"];
  const card = (t: (typeof TESTIMONIALS)[number], i: number) => (
    <div key={i} className="w-[360px] shrink-0 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:w-[420px]">
      <div className="flex gap-1 text-[color:var(--brand-yellow)]">{"★★★★★".split("").map((s, k) => <span key={k}>{s}</span>)}</div>
      <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--ink)]/85">"{t.quote}"</p>
      <div className="mt-5 border-t border-black/10 pt-4">
        <p className="text-sm font-bold">{t.name}</p>
        <p className="text-xs text-[color:var(--ink)]/60">{t.loc}</p>
      </div>
    </div>
  );

  return (
    <section id="testimonials" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="w-full">
        <div className="g-sp-test-heading">
          <span className="g-sp-test-badge inline-block rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Testimonials
          </span>
          <div className="mt-6 overflow-hidden pb-2">
            <h2 className="g-sp-test-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              Trusted by founders, <br />
              loved by{" "}
              <span className="font-serif-italic font-normal text-[color:var(--brand-pink)]">results.</span>
            </h2>
          </div>
        </div>
        <div className="g-sp-test-stats mt-10 flex flex-wrap gap-3">
          {stats.map((s) => (
            <span key={s} className="g-sp-test-stat rounded-full border border-black/15 bg-white px-5 py-2 text-sm font-semibold">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="marquee-pause mt-14 flex overflow-hidden">
        <div className="marquee gap-6 pr-6">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => card(t, i))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-8 md:px-14 lg:px-20 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="g-sp-faq-heading overflow-hidden pb-2">
          <h2 className="g-sp-faq-h2 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Frequently Asked{" "}
            <span className="font-serif-italic font-normal text-[color:var(--brand-green)]">Questions</span>
          </h2>
        </div>
        <div className="g-sp-faq-list mt-12 divide-y divide-black/15 border-y border-black/15">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="g-sp-faq-item">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl sm:text-2xl">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/20 text-xl transition ${isOpen ? "rotate-45 bg-[color:var(--ink)] text-white" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="pb-6 pr-12 text-[color:var(--ink)]/75">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section id="contact" className="px-4 py-28 sm:px-10 sm:py-36">
      <div className="g-sp-cta-content mx-auto max-w-5xl text-center">
        <h2 className="font-display text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
          Got a Product <br />
          Worth{" "}
          <span className="font-serif-italic font-normal text-[color:var(--brand-yellow)]">Showing Off?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[color:var(--ink)]/75">
          Tell us what your SaaS does. We'll find the story inside it and turn it into a video your
          users actually watch till the end.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="rounded-full bg-[color:var(--ink)] px-7 py-4 text-base font-semibold text-white transition hover:opacity-90"
          >
            Start a Project →
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-[color:var(--ink)] px-7 py-4 text-base font-semibold text-[color:var(--ink)] transition hover:bg-[color:var(--ink)] hover:text-white"
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
