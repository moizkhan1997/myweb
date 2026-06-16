import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { Nav } from "@/components/nav";

const la = (file: string) => `/work/logo-animations/${file}`;

// Extend JSX for the lottie-player web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string; background?: string; speed?: string; loop?: boolean; autoplay?: boolean; style?: React.CSSProperties;
      };
    }
  }
}

type LogoEntry = {
  file: string;
  client: string;
  tag: string;
  span: string;
  type: "video" | "lottie";
};

const logos: LogoEntry[] = [
  { file: "logo-novus-digital.mp4",     client: "Novus Digital",          tag: "Tech Brand",       span: "col-span-2 row-span-2", type: "video"  },
  { file: "logo-breez.mp4",             client: "Breez",                  tag: "Lifestyle",        span: "",                     type: "video"  },
  { file: "logo-elective.mp4",          client: "Elective",               tag: "Education",        span: "",                     type: "video"  },
  { file: "logo-turbolaw.mp4",          client: "Turbolaw",               tag: "Legal Tech",       span: "",                     type: "video"  },
  { file: "logo-always-get-1.mp4",      client: "Always Get",             tag: "Consumer Brand",   span: "",                     type: "video"  },
  { file: "lottie-angelina.json",       client: "Angelina",               tag: "Personal Brand",   span: "",                     type: "lottie" },
  { file: "logo-ensoh-1.mp4",           client: "Ensoh",                  tag: "Corporate",        span: "",                     type: "video"  },
  { file: "logo-found-money-hound.mp4", client: "Found Money Hound",      tag: "Finance",          span: "",                     type: "video"  },
  { file: "logo-sasta-sauna.mp4",       client: "SastaSauna",             tag: "Wellness",         span: "",                     type: "video"  },
  { file: "lottie-isabelle.json",       client: "Isabelle",               tag: "Personal Brand",   span: "",                     type: "lottie" },
  { file: "logo-neighbour-hood.mp4",    client: "Neighbour Hood Naas",    tag: "Community",        span: "",                     type: "video"  },
  { file: "logo-abdul-wahid.mp4",       client: "Abdul Wahid Bin Shabib", tag: "Personal Brand",   span: "",                     type: "video"  },
  { file: "logo-ensoh-2.mp4",           client: "Ensoh (Alt)",            tag: "Corporate",        span: "",                     type: "video"  },
  { file: "logo-always-get-2.mp4",      client: "Always Get (Alt)",       tag: "Consumer Brand",   span: "",                     type: "video"  },
];

function SoundBars() {
  return (
    <div className="flex gap-[2px] items-end h-3">
      {[40, 100, 60, 80, 50].map((h, i) => (
        <span
          key={i}
          className="w-[2px] bg-white rounded-full"
          style={{
            height: `${h}%`,
            animation: `soundbar 0.6s ease-in-out infinite alternate`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

function VideoCard({ logo, index }: { logo: LogoEntry; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  // Ensure video plays — some browsers need explicit play() call
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {/* autoplay blocked — silent fail */});
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.35;
    }
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) videoRef.current.muted = true;
  };

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-black cursor-pointer aspect-square md:aspect-auto ${logo.span}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      >
        <source src={la(logo.file)} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-4 left-4 font-mono text-xs text-white/20 group-hover:opacity-0 transition-opacity duration-200">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1">{logo.tag}</div>
        <div className="font-display text-xl text-white leading-tight">{logo.client}</div>
      </div>
      {hovered && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
          <SoundBars />
          <span className="text-[10px] text-white/70 font-medium ml-1">Sound</span>
        </div>
      )}
    </div>
  );
}

function LottieCard({ logo, index }: { logo: LogoEntry; index: number }) {
  return (
    <div className={`group relative rounded-2xl overflow-hidden bg-black cursor-pointer aspect-square md:aspect-auto ${logo.span}`}>
      {/* @ts-ignore — lottie-player is a web component loaded from CDN */}
      <lottie-player
        src={la(logo.file)}
        background="transparent"
        speed="1"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-4 left-4 font-mono text-xs text-white/20 group-hover:opacity-0 transition-opacity duration-200">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-1">{logo.tag}</div>
        <div className="font-display text-xl text-white leading-tight">{logo.client}</div>
      </div>
    </div>
  );
}

const steps = [
  { n: "01", title: "Discovery",  desc: "We study the brand, its values, personality, and the emotion the logo needs to carry." },
  { n: "02", title: "Storyboard", desc: "Every frame is mapped. Timing, easing curves, and the exact moment of reveal are designed before a single keyframe is set." },
  { n: "03", title: "Animation",  desc: "Frame-by-frame motion crafted in After Effects, then exported in every format you need: MP4, WebM, GIF, Lottie." },
  { n: "04", title: "Delivery",   desc: "Final files sized and optimised for web, app, social, and broadcast. Wherever your logo needs to live and move." },
];

export default function LogoAnimationPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.from(root.querySelectorAll(".la-hero-line"), {
      yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.1, delay: 0.1,
    });
    gsap.from(root.querySelectorAll(".la-hero-sub"), {
      opacity: 0, y: 20, duration: 0.9, ease: "power3.out", delay: 0.75,
    });

    const observers: IntersectionObserver[] = [];
    const reveal = (selector: string, from: gsap.TweenVars, dur = 0.85) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        gsap.set(el, from);
        const obs = new IntersectionObserver(([e]) => {
          if (!e.isIntersecting) return;
          gsap.to(el, {
            opacity: 1, y: 0, x: 0, scale: 1, duration: dur, ease: "power3.out",
            onComplete: () => gsap.set(el, { clearProps: "opacity,transform" }),
          });
          obs.disconnect();
        }, { threshold: 0.1 });
        obs.observe(el);
        observers.push(obs);
      });
    };

    // Only animate text/section elements — NOT video cards (opacity:0 blocks autoplay)
    reveal(".la-fade",  { opacity: 0, y: 40 });
    reveal(".la-scale", { opacity: 0, scale: 0.96 }, 0.9);

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div ref={rootRef} className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
      <Nav />

      {/* ── HERO ── */}
      <section className="relative flex flex-col justify-center min-h-[75vh] px-8 md:px-14 lg:px-20 pt-36 pb-16">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[400px] rounded-full bg-[#85CC6A]/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full bg-[#4BBFAE]/4 blur-[100px]" />
        </div>

        <div className="relative max-w-5xl">
          <span className="la-hero-sub block text-xs font-medium uppercase tracking-[0.3em] text-white/40 mb-10">
            Motion Identity · Logo Animation · Brand Motion
          </span>
          <h1 className="font-display text-[clamp(3.5rem,8.5vw,9.5rem)] leading-[0.88] tracking-tight">
            <span className="overflow-hidden block pb-3">
              <span className="la-hero-line block">Logos that</span>
            </span>
            <span className="overflow-hidden block pb-3">
              <span className="la-hero-line block font-serif-italic font-normal" style={{ color: "#85CC6A" }}>
                come alive.
              </span>
            </span>
          </h1>
          <p className="la-hero-sub mt-10 text-white/50 text-lg md:text-xl max-w-xl leading-relaxed">
            A static logo tells people who you are. An animated logo makes them feel it. We craft motion identities that turn brand marks into unforgettable moments.
          </p>
          <div className="la-hero-sub mt-10 flex gap-4 flex-wrap">
            <a href="/#contact" className="inline-flex items-center gap-2 bg-white text-black rounded-full px-7 py-3.5 text-sm font-semibold hover:bg-[#85CC6A] transition-colors duration-200">
              Animate your logo →
            </a>
            <a href="#work" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-7 py-3.5 text-sm text-white/70 hover:border-white/50 hover:text-white transition-colors duration-200">
              See the reel ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── LOGO GRID ── */}
      <section id="work" className="px-8 md:px-14 lg:px-20 py-16">
        <div className="la-fade mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-5">Logo Animations</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.93]">
              {logos.length} brands.<br />
              <span className="font-serif-italic font-normal" style={{ color: "#4BBFAE" }}>
                {logos.length} stories in motion.
              </span>
            </h2>
          </div>
          <p className="la-fade hidden md:block text-white/40 text-sm max-w-xs leading-relaxed">
            Hover any card to hear the motion. Each animation includes a bespoke sound design.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[240px] gap-3">
          {logos.map((logo, i) =>
            logo.type === "lottie"
              ? <LottieCard key={logo.file} logo={logo} index={i} />
              : <VideoCard  key={logo.file} logo={logo} index={i} />
          )}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="px-8 md:px-14 lg:px-20 py-28 md:py-36">
        <div className="la-fade mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6">How It Works</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.93]">
            From still mark<br />
            <span className="font-serif-italic font-normal" style={{ color: "#FCBA3F" }}>
              to living brand.
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 border-t border-white/[0.07] pt-12">
          {steps.map((step) => (
            <div key={step.n} className="la-fade">
              <div className="font-mono text-xs text-white/25 mb-6">{step.n}</div>
              <h3 className="font-display text-2xl mb-4">{step.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMATS ── */}
      <div className="border-t border-white/[0.07]">
        <div className="px-8 md:px-14 lg:px-20 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { fmt: "MP4",    desc: "Web & Social" },
            { fmt: "WebM",   desc: "Browser Optimised" },
            { fmt: "GIF",    desc: "Email & Docs" },
            { fmt: "Lottie", desc: "App & Interactive" },
          ].map((f) => (
            <div key={f.fmt} className="la-fade">
              <div className="font-display text-3xl md:text-4xl text-white">{f.fmt}</div>
              <div className="text-white/40 text-xs mt-2 uppercase tracking-[0.2em]">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="px-8 md:px-14 lg:px-20 py-36 border-t border-white/[0.07]">
        <div className="la-fade">
          <h2 className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.88] mb-12">
            Your logo,<br />
            <span className="font-serif-italic font-normal" style={{ color: "#85CC6A" }}>
              in motion.
            </span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <a href="/#contact" className="inline-flex items-center gap-3 bg-white text-black rounded-full px-10 py-5 text-base font-semibold hover:bg-[#85CC6A] transition-colors duration-200">
              Start a project →
            </a>
            <Link href="/portfolio" className="inline-flex items-center gap-3 border border-white/20 rounded-full px-10 py-5 text-base text-white/70 hover:border-white/50 hover:text-white transition-colors duration-200">
              View full portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
