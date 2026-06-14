import { createFileRoute } from "@tanstack/react-router";
import logoBlack from "@/assets/trimmic-black.svg.asset.json";
import logoWhite from "@/assets/trimmic-white.svg.asset.json";
import heroBlob from "@/assets/hero-blob.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trimmic — A creative studio with a rebel soul" },
      { name: "description", content: "We turn 'meh' brands into 'damn' brands. Branding, motion, explainer videos, and UI/UX from a studio that refuses to be boring." },
    ],
  }),
  component: Index,
});

const services = [
  { n: "01", t: "Branding", d: "Identities that don't blend in. Logos, systems, and stories with a pulse." },
  { n: "02", t: "Explainer Videos", d: "Complex ideas, simply told — animated, narrated, and impossible to ignore." },
  { n: "03", t: "Motion Graphics", d: "Type that dances, shapes that swing. Motion that earns the rewind." },
  { n: "04", t: "Video Editing", d: "Cuts that hit. Pacing that breathes. Edits with a point of view." },
  { n: "05", t: "UI / UX Design", d: "Interfaces that feel obvious — and look like nothing else." },
  { n: "06", t: "Creative Direction", d: "End-to-end campaigns with one bold, unmistakable voice." },
];

const marqueeWords = ["Branding", "★", "Motion", "★", "Explainer Video", "★", "UI / UX", "★", "Video Editing", "★", "Creative Direction", "★"];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Showcase />
      <Manifesto />
      <Billboard />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-background/70 px-3 py-2 pl-5 backdrop-blur-xl shadow-soft">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoBlack.url} alt="Trimmic" className="h-7 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium">
          <li><a href="#work" className="hover:text-foreground/60 transition">Work</a></li>
          <li><a href="#services" className="hover:text-foreground/60 transition">Services</a></li>
          <li><a href="#studio" className="hover:text-foreground/60 transition">Studio</a></li>
          <li><a href="#contact" className="hover:text-foreground/60 transition">Contact</a></li>
        </ul>
        <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition">
          Let's Talk
          <span className="inline-block transition group-hover:translate-x-0.5">→</span>
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* gradient backdrop */}
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-70" />
      <div aria-hidden className="absolute -top-32 -right-40 h-[640px] w-[640px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-display mt-6 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95]">
              We turn <span className="font-serif-italic font-normal">'meh'</span> brands
              <br />
              into{" "}
              <span className="text-gradient-brand">'damn'</span>{" "}
              brands.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
              At Trimmic, we don't whisper creativity — we shout it in style.
              Branding, motion, and product design that's loud, playful, and unapologetically bold.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-4 text-base font-medium hover:bg-ink/90 transition">
                Start a Project
                <span>→</span>
              </a>
              <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-background/60 backdrop-blur px-7 py-4 text-base font-medium hover:bg-ink/5 transition">
                See the Work
              </a>
            </div>
            <div className="mt-10 flex items-center gap-5">
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

          {/* Bento hero gallery */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[560px] md:h-[620px]">
              <div className="col-span-4 row-span-3 relative rounded-3xl overflow-hidden bg-ink">
                <img src={heroBlob} alt="Liquid gradient blob" className="absolute inset-0 h-full w-full object-cover animate-float-y" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-cream">
                  <span className="font-display text-sm leading-tight">Magic that feels<br />like tomorrow.</span>
                  <span className="text-xs opacity-70">↗</span>
                </div>
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden">
                <img src={work2} alt="POP gradient typography" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden">
                <img src={work1} alt="Designer at work" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl overflow-hidden">
                <img src={work3} alt="Creative team" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 row-span-3 rounded-3xl bg-gradient-brand p-5 flex flex-col justify-between text-ink">
                <span className="font-display text-2xl leading-none">Loud.<br />Playful.<br />Bold.</span>
                <span className="text-xs font-medium uppercase tracking-widest">Est. Trimmic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section aria-hidden className="border-y border-ink/10 bg-ink text-cream py-6 overflow-hidden">
      <div className="marquee gap-10 font-display text-3xl md:text-5xl whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className={i % 2 === 1 ? "text-gradient-brand" : ""}>{w}</span>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">What we do</span>
            <h2 className="font-display mt-3 text-5xl md:text-7xl leading-[0.95]">
              Services that <span className="font-serif-italic font-normal text-gradient-brand">slap.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-lg">
            Six disciplines, one studio, zero predictability. Pick a lane — or let us drive.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <article
              key={s.t}
              className="group relative rounded-3xl border border-border bg-card p-7 overflow-hidden transition hover:-translate-y-1 hover:shadow-soft"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const items = [
    { src: work1, title: "Nova Studios", tag: "Branding · Motion", span: "md:col-span-2 md:row-span-2" },
    { src: work2, title: "Pop Beverage Co.", tag: "Campaign", span: "md:col-span-2" },
    { src: work4, title: "Folio Atelier", tag: "Identity System", span: "" },
    { src: work3, title: "Boomerang FM", tag: "UI / UX", span: "" },
  ];
  return (
    <section id="work" className="py-24 md:py-32 bg-ink text-cream relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/60">Selected work</span>
            <h2 className="font-display mt-3 text-5xl md:text-7xl leading-[0.95]">
              We don't just create —<br />
              we make ideas <span className="text-gradient-brand">dance, pop</span> <span className="font-serif-italic font-normal">&amp; come alive.</span>
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-3 text-sm font-medium hover:bg-cream hover:text-ink transition">
            View Portfolio →
          </a>
        </div>

        <div className="grid md:grid-cols-4 md:auto-rows-[220px] gap-4">
          {items.map((it, i) => (
            <a key={i} href="#" className={`group relative rounded-3xl overflow-hidden ${it.span || ""}`}>
              <img src={it.src} alt={it.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
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
  const principles = [
    { n: "01", t: "Strategy first", d: "Every pixel earns its place. We design from the brief, not the mood board." },
    { n: "02", t: "Craft obsessed", d: "Kerning, timing, easing — the small stuff is the whole stuff." },
    { n: "03", t: "Brave by default", d: "Safe is forgettable. We ship work that makes people stop scrolling." },
    { n: "04", t: "Partners, not vendors", d: "We build with you, not for you. Honest, fast, allergic to fluff." },
  ];
  return (
    <section id="studio" className="relative overflow-hidden bg-ink text-cream py-24 md:py-32">
      <div aria-hidden className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-pink opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-cream/40" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-cream/60">The studio · Est. since forever</span>
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tight">
              A small studio
              <br />
              with <span className="font-serif-italic font-normal text-brand-yellow">loud</span> ideas.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-lg text-cream/70 leading-relaxed">
              Trimmic is a tight crew of strategists, designers and motion nerds.
              We build brands that pick a fight with boring — and win.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10 border border-cream/10 rounded-3xl overflow-hidden">
          {principles.map((p) => (
            <div key={p.n} className="bg-ink p-8 hover:bg-cream/[0.04] transition-colors group">
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
          {[
            { k: "12+", v: "Years in the game" },
            { k: "60+", v: "Brands shipped" },
            { k: "14", v: "Awards on the shelf" },
            { k: "∞", v: "Cups of espresso" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-5xl md:text-6xl text-cream">{s.k}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-cream/50 mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Billboard() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-[2rem] overflow-hidden bg-ink p-10 md:p-16 text-cream">
          <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-30" />
          <div className="relative">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream/60">No. 08 / Studio Note</span>
            <p className="font-display mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-5xl">
              Let's make magic that <span className="font-serif-italic font-normal text-gradient-brand">feels like tomorrow.</span>
            </p>
            <p className="mt-6 max-w-2xl text-cream/70 text-lg">
              Warning: working with us may cause design addiction, sudden bursts of confidence,
              and a permanent allergy to boring brand decks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Let's talk</span>
        <h2 className="font-display mt-4 text-5xl md:text-7xl leading-[0.95]">
          Got an idea worth <span className="font-serif-italic font-normal text-gradient-brand">making weird?</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          Tell us what you're building. We'll bring the colors, the chaos, and the espresso.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:hello@trimmic.com" className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-4 text-base font-medium hover:bg-ink/90 transition">
            hello@trimmic.com →
          </a>
          <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-background/60 backdrop-blur px-7 py-4 text-base font-medium hover:bg-ink/5 transition">
            Book a discovery call
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <img src={logoWhite.url} alt="Trimmic" className="h-10 w-auto" />
            <p className="mt-6 max-w-sm text-cream/70">
              A creative studio with a rebel soul. Born to make brands that don't sit quietly in the corner.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Studio</div>
            <ul className="space-y-2.5">
              <li><a href="#studio" className="hover:text-cream/70">About</a></li>
              <li><a href="#work" className="hover:text-cream/70">Work</a></li>
              <li><a href="#services" className="hover:text-cream/70">Services</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Social</div>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-cream/70">Instagram</a></li>
              <li><a href="#" className="hover:text-cream/70">Behance</a></li>
              <li><a href="#" className="hover:text-cream/70">Dribbble</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Say hi</div>
            <a href="mailto:hello@trimmic.com" className="font-display text-2xl text-gradient-brand">hello@trimmic.com</a>
            <p className="mt-3 text-cream/70 text-sm">+62 4538 7139</p>
          </div>
        </div>
        <div className="mt-16 pt-6 border-t border-cream/10 flex flex-wrap items-center justify-between gap-4 text-sm text-cream/60">
          <p>© {new Date().getFullYear()} Trimmic Studio. All rights reserved.</p>
          <p className="font-serif-italic">Wearing this site may cause design addiction.</p>
        </div>
      </div>
    </footer>
  );
}
