import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { Nav } from "@/components/nav";
import { useSEO } from "@/lib/seo";

const imgs = (n: number) => `/work/trimmic-branding/Trimmic-0${n < 10 ? n : ""}.png`.replace("0", n < 10 ? "0" : "");
const img = (n: number) => `/work/trimmic-branding/Trimmic-${String(n).padStart(2, "0")}.png`;

const results = [
  { k: "20+", v: "Brand assets delivered" },
  { k: "5",   v: "Color system tokens" },
  { k: "3",   v: "Logo variants" },
  { k: "100%", v: "In-house designed" },
];

export default function CaseStudyTrimmic() {
  useSEO({
    title: "Trimmic Brand Identity Case Study — Visual System & Branding",
    description: "Inside the Trimmic brand identity project: logo system, color palette, typography, and motion guidelines built from scratch for a creative studio.",
    path: "/case-study/trimmic-branding",
  });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Hero text reveal
    gsap.from(root.querySelectorAll(".cs-hero-line"), {
      yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.1,
    });
    gsap.from(root.querySelectorAll(".cs-hero-meta"), {
      opacity: 0, y: 20, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.65,
    });

    // Scroll reveals
    const observers: IntersectionObserver[] = [];
    const onScroll = (selector: string, vars: gsap.TweenVars) => {
      const { duration, ease, delay, ...fromProps } = vars as any;
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        gsap.set(el, fromProps);
        const obs = new IntersectionObserver(([e]) => {
          if (!e.isIntersecting) return;
          gsap.to(el, {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: duration ?? 0.8,
            ease: ease ?? "power3.out",
            delay: delay ?? 0,
            onComplete: () => gsap.set(el, { clearProps: "opacity,transform" }),
          });
          obs.disconnect();
        }, { threshold: 0.1 });
        obs.observe(el);
        observers.push(obs);
      });
    };

    onScroll(".cs-fade",       { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" });
    onScroll(".cs-img-left",   { opacity: 0, x: -50, duration: 0.9, ease: "power3.out" });
    onScroll(".cs-img-right",  { opacity: 0, x: 50,  duration: 0.9, ease: "power3.out" });
    onScroll(".cs-scale",      { opacity: 0, scale: 0.95, duration: 0.9, ease: "power3.out" });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div ref={rootRef} className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-14 lg:px-20 pb-16 pt-36 overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <img src={img(3)} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/20" />
        </div>

        <div className="relative">
          <p className="cs-hero-meta text-xs font-medium uppercase tracking-[0.3em] text-white/50 mb-8">
            Case Study · Brand Identity · 2024
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-tight">
            <span className="block overflow-hidden pb-2">
              <span className="cs-hero-line block">Trimmic</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="cs-hero-line block font-serif-italic font-normal" style={{ color: "oklch(0.86 0.16 85)" }}>
                Brand Identity
              </span>
            </span>
          </h1>

          {/* Project meta row */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
            {[
              { label: "Client",      value: "Trimmic Studio" },
              { label: "Year",        value: "2024" },
              { label: "Services",    value: "Brand Identity · Visual System · Collateral" },
              { label: "Deliverables", value: "Logo · Colors · Typography · 20+ Assets" },
            ].map((m) => (
              <div key={m.label} className="cs-hero-meta">
                <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">{m.label}</div>
                <div className="text-sm font-medium text-white/90 leading-relaxed">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="px-8 md:px-14 lg:px-20 py-24 md:py-32">
        <div className="max-w-3xl cs-fade">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">Overview</p>
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-white/90">
            When Trimmic decided to brand itself, the brief was simple:{" "}
            <span className="font-serif-italic font-normal" style={{ color: "oklch(0.74 0.13 0)" }}>
              build something impossible to ignore.
            </span>
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-4xl">
          <p className="cs-fade text-white/60 text-lg leading-relaxed">
            Creative studios often fall into the trap of looking like every other creative studio: safe palettes, generic marks, forgettable typography. Trimmic needed an identity that embodied what it actually does: make brands that don't sit quietly in the corner.
          </p>
          <p className="cs-fade text-white/60 text-lg leading-relaxed">
            The result is a visual system built around energy, confidence, and play. A brand that's as bold on a 30-foot billboard as it is on a business card. Unmistakably, unapologetically Trimmic.
          </p>
        </div>
      </section>

      {/* ── FULL BLEED: Logo on gradient ── */}
      <div className="cs-scale px-8 md:px-14 lg:px-20 pb-4">
        <div className="rounded-3xl overflow-hidden">
          <img src={img(3)} alt="Trimmic logo on gradient" className="w-full object-cover" />
        </div>
      </div>

      {/* ── LOGO SYSTEM ── */}
      <section className="px-8 md:px-14 lg:px-20 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="cs-fade">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">01 · The Mark</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] mb-8">
              A mark that moves<br />
              <span className="font-serif-italic font-normal" style={{ color: "oklch(0.82 0.16 145)" }}>
                before you do.
              </span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              The Trimmic 'T' mark is a fluid, forward-leaning symbol, built on precision but designed to feel alive. The letterform suggests momentum: always moving, always creating, never static.
            </p>
            <p className="text-white/60 text-lg leading-relaxed">
              Three logo variants (on white, on black, on gradient) give the brand total flexibility across every surface and context, from digital screens to physical environments.
            </p>
          </div>
          <div className="cs-img-right rounded-2xl overflow-hidden">
            <img src={img(4)} alt="Logo construction grid" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── LOGO VARIANTS 3-UP ── */}
      <div className="px-8 md:px-14 lg:px-20 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cs-fade rounded-2xl overflow-hidden">
          <img src={img(1)} alt="Logo on white" className="w-full object-cover" />
        </div>
        <div className="cs-fade rounded-2xl overflow-hidden">
          <img src={img(2)} alt="Logo on black" className="w-full object-cover" />
        </div>
        <div className="cs-fade rounded-2xl overflow-hidden">
          <img src={img(3)} alt="Logo on gradient" className="w-full object-cover" />
        </div>
      </div>

      {/* ── COLOR SYSTEM ── */}
      <section className="px-8 md:px-14 lg:px-20 py-24 md:py-32">
        <div className="cs-fade mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">02 · Color System</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">
            Four colors.<br />
            <span className="font-serif-italic font-normal" style={{ color: "oklch(0.86 0.16 85)" }}>
              Infinite combinations.
            </span>
          </h2>
        </div>
        <div className="cs-scale rounded-2xl overflow-hidden mb-8">
          <img src={img(5)} alt="Color palette" className="w-full object-cover" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Golden Yellow", hex: "#FCBA3F" },
            { name: "Bright Pink",   hex: "#F07DB0" },
            { name: "Pastel Green",  hex: "#85CC6A" },
            { name: "Turquoise",     hex: "#4BBFAE" },
          ].map((c) => (
            <div key={c.name} className="cs-fade rounded-2xl p-6" style={{ backgroundColor: c.hex }}>
              <div className="text-xs font-semibold uppercase tracking-widest text-black/70 mb-1">{c.name}</div>
              <div className="text-sm font-mono text-black/60">{c.hex}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TYPOGRAPHY ── */}
      <div className="px-8 md:px-14 lg:px-20 pb-4">
        <div className="cs-scale rounded-3xl overflow-hidden">
          <img src={img(6)} alt="Typography system" className="w-full object-cover" />
        </div>
      </div>

      <section className="px-8 md:px-14 lg:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          <div className="cs-fade">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">03 · Typography</p>
            <h2 className="font-display text-3xl md:text-4xl leading-[0.95] mb-6">
              Type that<br />
              <span className="font-serif-italic font-normal" style={{ color: "oklch(0.78 0.10 190)" }}>speaks volumes.</span>
            </h2>
          </div>
          <p className="cs-fade text-white/60 text-lg leading-relaxed self-end">
            Clash Display anchors the brand's voice: geometric, confident, unapologetically bold. Paired with Instrument Serif for moments of personality, the typographic system handles everything from a tiny label to a 10-metre billboard headline.
          </p>
        </div>
      </section>

      {/* ── DIGITAL PRESENCE 2-UP ── */}
      <div className="px-8 md:px-14 lg:px-20 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="cs-img-left rounded-2xl overflow-hidden">
          <img src={img(7)} alt="UI mockup" className="w-full object-cover" />
        </div>
        <div className="cs-img-right rounded-2xl overflow-hidden">
          <img src={img(8)} alt="Brand swirl element" className="w-full object-cover" />
        </div>
      </div>

      {/* ── FULL BLEED: Website mockup ── */}
      <div className="px-8 md:px-14 lg:px-20 py-4">
        <div className="cs-scale rounded-3xl overflow-hidden">
          <img src={img(9)} alt="Website mockup" className="w-full object-cover" />
        </div>
      </div>

      {/* ── COLLATERAL ── */}
      <section className="px-8 md:px-14 lg:px-20 py-24 md:py-32">
        <div className="cs-fade mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">04 · Brand Collateral</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">
            Every touchpoint,<br />
            <span className="font-serif-italic font-normal" style={{ color: "oklch(0.74 0.13 0)" }}>
              unmistakably Trimmic.
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="cs-img-left rounded-2xl overflow-hidden">
            <img src={img(10)} alt="Business cards" className="w-full object-cover" />
          </div>
          <div className="cs-img-right rounded-2xl overflow-hidden">
            <img src={img(11)} alt="Wall signage" className="w-full object-cover" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="cs-img-left rounded-2xl overflow-hidden">
            <img src={img(12)} alt="Merchandise — tote bag and ID" className="w-full object-cover" />
          </div>
          <div className="cs-img-right rounded-2xl overflow-hidden">
            <img src={img(13)} alt="LED screen display" className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── IN THE WILD ── */}
      <section className="px-8 md:px-14 lg:px-20 pb-24 md:pb-32">
        <div className="cs-fade mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">05 · In the Wild</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">
            Built for the real world.<br />
            <span className="font-serif-italic font-normal" style={{ color: "oklch(0.82 0.16 145)" }}>
              Designed to own it.
            </span>
          </h2>
        </div>

        {/* Full bleed */}
        <div className="cs-scale rounded-3xl overflow-hidden mb-4">
          <img src={img(14)} alt="Street poster" className="w-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2 cs-img-left rounded-2xl overflow-hidden">
            <img src={img(15)} alt="Billboard — brand message" className="w-full object-cover" />
          </div>
          <div className="cs-img-right rounded-2xl overflow-hidden">
            <img src={img(16)} alt="Brand posters" className="w-full object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="cs-img-left rounded-2xl overflow-hidden">
            <img src={img(17)} alt="Large outdoor billboard" className="w-full object-cover" />
          </div>
          <div className="cs-img-right rounded-2xl overflow-hidden">
            <img src={img(18)} alt="Hoodie mockup" className="w-full object-cover" />
          </div>
        </div>

        <div className="cs-scale rounded-3xl overflow-hidden">
          <img src={img(19)} alt="Creative movement billboard" className="w-full object-cover" />
        </div>
      </section>

      {/* ── Full brand collage ── */}
      <div className="px-8 md:px-14 lg:px-20 pb-4">
        <div className="cs-scale rounded-3xl overflow-hidden">
          <img src={img(20)} alt="Brand moodboard collage" className="w-full object-cover" />
        </div>
      </div>

      {/* ── RESULTS ── */}
      <section className="px-8 md:px-14 lg:px-20 py-24 md:py-32">
        <div className="cs-fade mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">06 · Results</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95]">
            A brand that works<br />
            <span className="font-serif-italic font-normal" style={{ color: "oklch(0.86 0.16 85)" }}>
              as hard as we do.
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12 mb-16">
          {results.map((r) => (
            <div key={r.v} className="cs-fade">
              <div className="font-display text-5xl md:text-6xl mb-3" style={{ color: "oklch(0.86 0.16 85)" }}>{r.k}</div>
              <div className="text-sm text-white/50 uppercase tracking-[0.15em]">{r.v}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          <p className="cs-fade text-white/60 text-lg leading-relaxed">
            The Trimmic brand identity launched across all digital and physical touchpoints simultaneously: website, social media, business stationery, signage, and merchandise. The system scaled from a favicon to a 30-foot LED screen without missing a beat.
          </p>
          <p className="cs-fade text-white/60 text-lg leading-relaxed">
            More importantly, it gave the studio a voice that actually sounds like it. Not a brand that plays it safe. A brand that plays to win. Bold, cohesive, and ready for whatever comes next.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-14 lg:px-20 py-24 md:py-32 border-t border-white/10">
        <div className="cs-fade flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">Want a brand this bold?</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95]">
              Let's make yours<br />
              <span className="font-serif-italic font-normal" style={{ color: "oklch(0.86 0.16 85)" }}>
                impossible to ignore.
              </span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-base font-medium hover:bg-white/90 transition">
              Start a Project →
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium hover:bg-white/5 transition text-center justify-center">
              View More Work
            </Link>
          </div>
        </div>
      </section>

      {/* Footer line */}
      <div className="px-8 md:px-14 lg:px-20 pb-10 flex items-center justify-between text-xs text-white/30 border-t border-white/10 pt-8">
        <span>© 2024 Trimmic Studio</span>
        <Link href="/" className="hover:text-white/60 transition">← Back to Home</Link>
      </div>
    </div>
  );
}
