import React, { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, Route, Switch, useLocation } from "wouter";

import SaasVideoPage from "./pages/saas-video";
import ServicePage from "./pages/service-page";
import PortfolioPage from "./pages/portfolio";
import AdminPage from "./pages/admin";
import NotFound from "./pages/not-found";
import CaseStudyTrimmic from "./pages/case-study-trimmic";
import SocialContentPage from "./pages/social-content";
import LogoAnimationPage from "./pages/logo-animation";
import ContactPage from "./pages/contact";
import work1 from "@assets/work-1_1781021356324.jpg";
import work2 from "@assets/work-2_1781021356324.jpg";
import work3 from "@assets/work-3_1781021356324.jpg";
import work4 from "@assets/work-4_1781021356324.jpg";
import { Nav, LogoBlack, LogoWhite } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  history.scrollRestoration = "manual";

  const origPush = history.pushState.bind(history);
  history.pushState = (...args: Parameters<typeof history.pushState>) => {
    origPush(...args);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  window.addEventListener("popstate", () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function ScrollToTop() {
  const [location] = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // Double rAF: first frame resets after any pending paint work,
    // second frame resets after GSAP ScrollTrigger setups settle.
    const id = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    });
    return () => cancelAnimationFrame(id);
  }, [location]);
  return null;
}

const services = [
  { n: "01", t: "SaaS Videos",            slug: "saas-videos",            d: "Product demos, feature walkthroughs, and onboarding videos that convert trials into customers." },
  { n: "02", t: "Shorts",                  slug: "shorts",                  d: "TikTok, Reels, and Shorts engineered for scroll-stopping hooks and algorithmic growth." },
  { n: "03", t: "UGC",                     slug: "ugc",                     d: "Raw, authentic, user-generated content that feels organic and converts like paid media." },
  { n: "04", t: "YouTube Videos",          slug: "youtube-videos",          d: "Long-form content, thumbnails, and pacing that builds subscribers and watch time." },
  { n: "05", t: "Digital Marketing",       slug: "digital-marketing",       d: "Paid creative, ad variants, and funnel content that turns impressions into revenue." },
  { n: "06", t: "Content Creation",        slug: "content-creation",        d: "Everything from brand blogs to LinkedIn carousels to pitch decks. All on-brand." },
  { n: "07", t: "Social Media Management", slug: "social-media-management", d: "Posting calendars, engagement strategy, and community building that keeps your brand alive." },
  { n: "08", t: "Branding",               slug: "branding",                d: "Identities that don't blend in. Logos, systems, and stories with a pulse." },
  { n: "09", t: "Explainer Videos",        slug: "explainer-videos",        d: "Complex ideas, simply told. Animated, narrated, and impossible to ignore." },
  { n: "10", t: "Motion Graphics",         slug: "motion-graphics",         d: "Type that dances, shapes that swing. Motion that earns the rewind." },
];

const marqueeWords = ["SaaS Videos", "★", "Shorts", "★", "UGC", "★", "YouTube Videos", "★", "Digital Marketing", "★", "Content Creation", "★", "Social Media Management", "★", "Branding", "★", "Explainer Videos", "★", "Motion Graphics", "★"];


function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // — Masked line reveal for h1
      gsap.from(".g-hero-line", {
        yPercent: 115,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
      });

      // — Fade-up for paragraph, buttons, avatar row
      gsap.from(".g-hero-sub", {
        opacity: 0,
        y: 28,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.45,
      });

      // — Right image tiles: scale + fade stagger
      gsap.from(".g-hero-tile", {
        opacity: 0,
        scale: 0.88,
        y: 24,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden flex flex-col lg:flex-row min-h-screen">
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-70 pointer-events-none" />
      <div aria-hidden className="absolute -top-32 left-0 h-[700px] w-[700px] rounded-full bg-gradient-brand opacity-20 blur-3xl pointer-events-none" />

      {/* Left — text */}
      <div className="relative z-10 flex flex-col w-full lg:w-[52%] px-8 md:px-14 lg:px-20 pt-32 pb-16 lg:pt-36 lg:pb-20">
        <h1 className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.95]">
          <span className="block overflow-hidden pb-1">
            <span className="g-hero-line block">We don't just make videos.</span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="g-hero-line block">
              We make{" "}
              <span className="font-serif-italic font-normal text-gradient-brand">'damn'</span>{" "}
              good ones.
            </span>
          </span>
        </h1>
        <p className="g-hero-sub mt-7 max-w-lg text-lg text-muted-foreground leading-relaxed">
          We don't just edit videos. We breathe life into them. Motion graphics, SaaS videos, and 2D animation that stops the scroll and starts the sale.
        </p>
        <div className="g-hero-sub mt-9 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-4 text-base font-medium hover:bg-ink/90 transition">
            Start a Project <span>→</span>
          </Link>
          <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-background/60 backdrop-blur px-7 py-4 text-base font-medium hover:bg-ink/5 transition">
            See the Work
          </a>
        </div>
        <div className="g-hero-sub mt-10 flex items-center gap-5">
          <div className="flex -space-x-2">
            {[work1, work3, work4].map((s, i) => (
              <img key={i} src={s} alt="" className="h-10 w-10 rounded-full object-cover border-2 border-background" />
            ))}
          </div>
          <div className="text-sm">
            <div className="font-display text-lg">200+ damn-good projects</div>
            <div className="text-muted-foreground">shipped for brands worldwide</div>
          </div>
        </div>
      </div>

      {/* Right — image mosaic */}
      <div className="relative flex-1 min-h-[520px] lg:min-h-screen">
        <div
          className="absolute inset-0 pl-3 pr-8 md:pr-14 lg:pr-20 pt-32 pb-16 lg:pt-36 lg:pb-20 grid gap-3"
          style={{ gridTemplateColumns: "3fr 2fr", gridTemplateRows: "repeat(3, 1fr)" }}
        >
          <div className="g-hero-tile row-span-2 relative rounded-2xl overflow-hidden bg-ink">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/Chrag.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-cream">
              <span className="font-display text-base leading-tight">Magic that feels<br />like tomorrow.</span>
              <span className="text-xs opacity-60">↗</span>
            </div>
          </div>
          <div className="g-hero-tile relative rounded-2xl overflow-hidden">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="/videos/Crypto.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="g-hero-tile relative rounded-2xl overflow-hidden">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="/videos/Jeremy.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="g-hero-tile relative rounded-2xl overflow-hidden">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="/videos/NextChatbot.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="g-hero-tile relative rounded-2xl overflow-hidden">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/travel-booster.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-brand opacity-60" />
            <div className="relative h-full p-5 flex flex-col justify-between text-ink">
              <span className="font-display text-2xl leading-none">Loud.<br />Playful.<br />Bold.</span>
              <span className="text-xs font-medium uppercase tracking-widest">Est. Trimmic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeBand() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section aria-hidden className="border-y border-ink/10 bg-ink text-cream py-6 overflow-hidden pt-[16px] pb-[16px]">
      <div className="marquee gap-10 font-display text-3xl md:text-5xl whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className={`px-5 ${i % 2 === 1 ? "text-gradient-brand" : ""}`}>{w}</span>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word reveal
      gsap.from(".g-services-heading .g-word", {
        scrollTrigger: { trigger: ".g-services-heading", start: "top 85%", once: true },
        yPercent: 110,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.06,
      });

      // Cards scroll-stagger reveal
      gsap.from(".g-service-card", {
        scrollTrigger: { trigger: ".g-services-grid", start: "top 80%", once: true },
        opacity: 0,
        y: 55,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32">
      <div className="px-8 md:px-14 lg:px-20">
        <div className="g-services-heading flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">What we do</span>
            <h2 className="font-display mt-3 text-5xl md:text-7xl leading-[0.95]">
              <span className="inline-block overflow-hidden align-bottom mr-3">
                <span className="g-word inline-block">Services</span>
              </span>
              <span className="inline-block overflow-hidden align-bottom mr-3">
                <span className="g-word inline-block">that</span>
              </span>
              <span className="inline-block overflow-hidden align-bottom">
                <span className="g-word font-serif-italic font-normal text-gradient-brand inline-block">slap.</span>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-lg">
            Ten disciplines, one studio, zero predictability. Pick a lane. Or let us drive.
          </p>
        </div>

        <div className="g-services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Link key={s.t} href={`/service/${s.slug}`} className="block g-service-card">
              <article className="group relative rounded-3xl border border-border bg-card p-7 overflow-hidden transition hover:-translate-y-1 hover:shadow-soft h-full">
                <div aria-hidden className="absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60" />
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-sm text-muted-foreground">{s.n}</span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-base transition group-hover:bg-ink group-hover:text-cream group-hover:border-ink">↗</span>
                </div>
                <h3 className="font-display relative mt-12 text-3xl">{s.t}</h3>
                <p className="relative mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
                <div className="relative mt-8 h-px w-full bg-gradient-brand opacity-30" />
                <div className="relative mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  0{i + 1} / 0{services.length}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const items = [
    { src: "/work/trimmic-branding/Trimmic-12.png", title: "Trimmic Studio",   tag: "Brand Identity · Visual System", span: "md:col-span-2 md:row-span-2", href: "/case-study/trimmic-branding" },
    { src: "/work/logo-animations/logo-novus-digital.mp4", title: "Logo Animation", tag: "Motion Identity · Brand Motion",  span: "md:col-span-2",                 href: "/logo-animation", isVideo: true },
    { src: "/work/social-posts/social-main.jpg",       title: "Social Media",     tag: "Content · Campaigns · Feed",     span: "",                              href: "/social-content" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".g-showcase-heading", {
        scrollTrigger: { trigger: ".g-showcase-heading", start: "top 85%", once: true },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
      });

      // Work item cards: stagger from below
      gsap.from(".g-work-item", {
        scrollTrigger: { trigger: ".g-work-grid", start: "top 80%", once: true },
        opacity: 0,
        y: 50,
        scale: 0.97,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Parallax: inner images move at 70% scroll speed
      document.querySelectorAll<HTMLElement>(".g-work-item img").forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement!,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-24 md:py-32 bg-ink text-cream relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-20" />
      <div className="relative px-8 md:px-14 lg:px-20">
        <div className="g-showcase-heading flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/60">Selected work</span>
            <h2 className="font-display mt-3 text-5xl md:text-7xl leading-[0.95]">
              We make ideas <span className="text-gradient-brand">dance, pop</span>{" "}
              <span className="font-serif-italic font-normal">&amp; come alive.</span>
            </h2>
          </div>
          <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-3 text-sm font-medium hover:bg-cream hover:text-ink transition">
            View Portfolio →
          </Link>
        </div>

        <div className="g-work-grid grid md:grid-cols-4 md:auto-rows-[220px] gap-4">
          {items.map((it, i) => (
            <a key={i} href={it.href} className={`g-work-item group relative rounded-3xl overflow-hidden ${it.span || ""}`}>
              {(it as any).isVideo ? (
                <video autoPlay muted loop playsInline className="h-full w-full object-cover will-change-transform" src={it.src} />
              ) : (
                <img src={it.src} alt={it.title} className={`h-full w-full object-cover will-change-transform${i === 0 ? " scale-[1.15]" : ""}`} loading="lazy" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-ink/0" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-cream/70">{it.tag}</div>
                  <div className="font-display text-2xl mt-1">{it.title}</div>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream text-ink opacity-0 group-hover:opacity-100 transition">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const principles = [
    { n: "01", t: "Strategy first", d: "Every pixel earns its place. We design from the brief, not the mood board." },
    { n: "02", t: "Craft obsessed", d: "Kerning, timing, easing. The small stuff is the whole stuff." },
    { n: "03", t: "Brave by default", d: "Safe is forgettable. We ship work that makes people stop scrolling." },
    { n: "04", t: "Partners, not vendors", d: "We build with you, not for you. Honest, fast, allergic to fluff." },
  ];

  const stats = [
    { k: "12", suffix: "+", v: "Years in the game" },
    { k: "60", suffix: "+", v: "Brands shipped" },
    { k: "14", suffix: "",  v: "Awards on the shelf" },
    { k: "∞",  suffix: "",  v: "Cups of espresso" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big h2 word-by-word reveal
      gsap.from(".g-manifesto-word", {
        scrollTrigger: { trigger: ".g-manifesto-h2", start: "top 80%", once: true },
        yPercent: 110,
        duration: 0.75,
        ease: "power4.out",
        stagger: 0.055,
      });

      // Principles cards fan in
      gsap.from(".g-principle", {
        scrollTrigger: { trigger: ".g-principles-grid", start: "top 82%", once: true },
        opacity: 0,
        x: -30,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Stats count-up
      document.querySelectorAll<HTMLElement>(".g-stat-num").forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const suffix = el.dataset.suffix || "";
        if (isNaN(target)) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="studio" className="relative overflow-hidden bg-ink text-cream py-24 md:py-32">
      <div aria-hidden className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-pink opacity-20 blur-3xl" />

      <div className="relative px-8 md:px-14 lg:px-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-cream/40" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-cream/60">The studio · Est. since forever</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="g-manifesto-h2 font-display text-6xl md:text-8xl leading-[0.9] tracking-tight">
              {/* Line 1 */}
              {["A", "small", "studio"].map((w) => (
                <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                  <span className="g-manifesto-word inline-block">{w}</span>
                </span>
              ))}
              <br />
              {/* Line 2 */}
              {["with"].map((w) => (
                <span key={w} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                  <span className="g-manifesto-word inline-block">{w}</span>
                </span>
              ))}
              <span className="inline-block overflow-hidden align-bottom mr-[0.22em]">
                <span className="g-manifesto-word font-serif-italic font-normal text-brand-yellow inline-block">loud</span>
              </span>
              {["ideas."].map((w) => (
                <span key={w} className="inline-block overflow-hidden align-bottom">
                  <span className="g-manifesto-word inline-block">{w}</span>
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-lg text-cream/70 leading-relaxed">
              Trimmic is a tight crew of strategists, designers and motion nerds.
              We build brands that pick a fight with boring. And win.
            </p>
          </div>
        </div>

        <div className="g-principles-grid mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10 border border-cream/10 rounded-3xl overflow-hidden">
          {principles.map((p) => (
            <div key={p.n} className="g-principle bg-ink p-8 hover:bg-cream/[0.04] transition-colors group">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl text-cream/30 group-hover:text-brand-yellow transition-colors">{p.n}</span>
                <span className="h-2 w-2 rounded-full bg-brand-green" />
              </div>
              <h3 className="mt-10 font-display text-2xl">{p.t}</h3>
              <p className="mt-3 text-sm text-cream/60 leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-t border-cream/10 pt-10">
          {stats.map((s) => (
            <div key={s.v}>
              {s.k === "∞" ? (
                <div className="font-display text-5xl md:text-6xl text-cream">∞</div>
              ) : (
                <div
                  className="g-stat-num font-display text-5xl md:text-6xl text-cream"
                  data-target={s.k}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </div>
              )}
              <div className="text-xs uppercase tracking-[0.2em] text-cream/50 mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Billboard() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".g-billboard-inner", {
        scrollTrigger: { trigger: ".g-billboard-inner", start: "top 85%", once: true },
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
      });

      gsap.from(".g-billboard-text", {
        scrollTrigger: { trigger: ".g-billboard-inner", start: "top 75%", once: true },
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="px-8 md:px-14 lg:px-20">
        <div className="g-billboard-inner relative rounded-[2rem] overflow-hidden bg-ink p-10 md:p-16 text-cream">
          <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-30" />
          <div className="relative">
            <span className="g-billboard-text text-xs font-medium uppercase tracking-[0.2em] text-cream/60">No. 08 / Studio Note</span>
            <p className="g-billboard-text font-display mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-5xl">
              Let's make magic that{" "}
              <span className="font-serif-italic font-normal text-gradient-brand">feels like tomorrow.</span>
            </p>
            <p className="g-billboard-text mt-6 max-w-2xl text-cream/70 text-lg">
              Warning: working with us may cause design addiction, sudden bursts of confidence,
              and a permanent allergy to boring brand decks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [location] = useLocation();

  if (location.startsWith("/admin")) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Nav />
      <Switch key={location}>
        <Route path="/portfolio" component={PortfolioPage} />
        <Route path="/case-study/trimmic-branding" component={CaseStudyTrimmic} />
        <Route path="/social-content" component={SocialContentPage} />
        <Route path="/logo-animation" component={LogoAnimationPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/service/saas-videos" component={SaasVideoPage} />
        <Route path="/service/:slug" component={ServicePage} />
        <Route path="/">
          <Home />
        </Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <MarqueeBand />
      <Services />
      <Showcase />
      <Manifesto />
      <Billboard />
      <ContactSection />
      <Footer />
    </>
  );
}
