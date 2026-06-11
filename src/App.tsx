import React, { useState } from "react";
import { useCreateContact } from "@workspace/api-client-react";
import heroBlob from "@assets/hero-blob_1781021356323.jpg";
import work1 from "@assets/work-1_1781021356324.jpg";
import work2 from "@assets/work-2_1781021356324.jpg";
import work3 from "@assets/work-3_1781021356324.jpg";
import work4 from "@assets/work-4_1781021356324.jpg";
import logoBlack from "@assets/Trimmic_Black_1781021962708.svg";
import logoWhite from "@assets/Trimmic_White_1781021962708.svg";

const services = [
  { n: "01", t: "SaaS Videos", d: "Product demos, feature walkthroughs, and onboarding videos that convert trials into customers." },
  { n: "02", t: "Shorts", d: "TikTok, Reels, and Shorts engineered for scroll-stopping hook — and algorithmic growth." },
  { n: "03", t: "UGC", d: "Raw, authentic, user-generated content that feels organic and converts like paid media." },
  { n: "04", t: "YouTube Videos", d: "Long-form content, thumbnails, and pacing that builds subscribers and watch time." },
  { n: "05", t: "Digital Marketing", d: "Paid creative, ad variants, and funnel content that turns impressions into revenue." },
  { n: "06", t: "Content Creation", d: "Everything from brand blogs to LinkedIn carousels to pitch decks — all on-brand." },
  { n: "07", t: "Social Media Management", d: "Posting calendars, engagement strategy, and community building that keeps your brand alive." },
  { n: "08", t: "Branding", d: "Identities that don't blend in. Logos, systems, and stories with a pulse." },
  { n: "09", t: "Explainer Videos", d: "Complex ideas, simply told — animated, narrated, and impossible to ignore." },
  { n: "10", t: "Motion Graphics", d: "Type that dances, shapes that swing. Motion that earns the rewind." },
];

const marqueeWords = ["SaaS Videos", "★", "Shorts", "★", "UGC", "★", "YouTube Videos", "★", "Digital Marketing", "★", "Content Creation", "★", "Social Media Management", "★", "Branding", "★", "Explainer Videos", "★", "Motion Graphics", "★"];

function LogoBlack() {
  return <img src={logoBlack} alt="Trimmic" className="h-8 w-auto" />;
}

function LogoWhite() {
  return <img src={logoWhite} alt="Trimmic" className="h-10 w-auto" />;
}

function Nav() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-background/70 px-3 py-2 pl-5 backdrop-blur-xl shadow-soft">
        <a href="#top" className="flex items-center gap-2">
          <LogoBlack />
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
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-70" />
      <div aria-hidden className="absolute -top-32 -right-40 h-[640px] w-[640px] rounded-full bg-gradient-brand opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-display mt-6 text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95]">
              We don't just make videos.
              <br />
              We make{" "}
              <span className="font-serif-italic font-normal text-gradient-brand">'damn'</span>{" "}
              good ones.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
              We don't just edit videos — we breathe life into them. Motion graphics, SaaS videos, and 2D animation that stops the scroll and starts the sale.
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
            Ten disciplines, one studio, zero predictability. Pick a lane — or let us drive.
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
              we make ideas <span className="text-gradient-brand">dance, pop</span>{" "}
              <span className="font-serif-italic font-normal">&amp; come alive.</span>
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
              Let's make magic that{" "}
              <span className="font-serif-italic font-normal text-gradient-brand">feels like tomorrow.</span>
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

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const mutation = useCreateContact();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      data: {
        name: form.name,
        email: form.email,
        service: form.service || undefined,
        budget: form.budget || undefined,
        message: form.message,
      },
    });
  }

  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[340px] text-center gap-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-ink text-3xl">✓</div>
        <h3 className="font-display text-3xl">Message received!</h3>
        <p className="text-muted-foreground max-w-xs">We'll be in touch within 24 hours. Check your inbox — or WhatsApp us if you can't wait.</p>
        <button onClick={() => { mutation.reset(); setForm({ name: "", email: "", service: "", budget: "", message: "" }); }}
          className="mt-2 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition">
          Send another message
        </button>
      </div>
    );
  }

  const inputCls = "w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ink/20 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mutation.isError && (
        <div className="rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm border border-red-200">
          Something went wrong. Please try again or WhatsApp us directly.
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Your name *</label>
          <input required name="name" value={form.name} onChange={handleChange} placeholder="Alex Johnson" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Email *</label>
          <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="alex@company.com" className={inputCls} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Service needed</label>
          <select name="service" value={form.service} onChange={handleChange} className={inputCls}>
            <option value="">Pick a service…</option>
            <option>SaaS Videos</option>
            <option>Shorts</option>
            <option>UGC</option>
            <option>YouTube Videos</option>
            <option>Digital Marketing</option>
            <option>Content Creation</option>
            <option>Social Media Management</option>
            <option>Branding</option>
            <option>Explainer Videos</option>
            <option>Motion Graphics</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Budget range</label>
          <select name="budget" value={form.budget} onChange={handleChange} className={inputCls}>
            <option value="">Select range…</option>
            <option>Under $1,000</option>
            <option>$1,000 – $5,000</option>
            <option>$5,000 – $15,000</option>
            <option>$15,000+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">Tell us about your project *</label>
        <textarea required name="message" value={form.message} onChange={handleChange} rows={5}
          placeholder="What are you building? What makes it weird? What would make it damn good?"
          className={`${inputCls} resize-none`} />
      </div>
      <button type="submit" disabled={mutation.isPending}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-7 py-4 text-base font-medium hover:bg-ink/90 transition disabled:opacity-50 disabled:cursor-not-allowed">
        {mutation.isPending ? "Sending..." : "Send it over"}
        <span className="inline-block transition group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}

function CTA() {
  const whatsapp = "923472551975";
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Trimmic! I'd like to discuss a project.")}`;

  return (
    <>
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-background">
        <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-40" />
        <div aria-hidden className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">

            {/* Left — info */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-12">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Let's talk</span>
                <h2 className="font-display mt-4 text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
                  Got an idea worth{" "}
                  <span className="font-serif-italic font-normal text-gradient-brand inline-block" style={{ paddingBottom: "0.25em" }}>making weird?</span>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  Tell us what you're building. We'll bring the colors, the chaos, and the espresso.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-cream text-lg">✉</span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email us</div>
                    <a href="mailto:hello@trimmic.com" className="font-display text-xl hover:text-gradient-brand transition">hello@trimmic.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white text-lg">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">WhatsApp</div>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-display text-xl hover:text-[#25D366] transition">+92 347 255 1975</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-cream text-lg">⊙</span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Response time</div>
                    <div className="font-display text-xl">Within 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Follow the studio</div>
                <div className="flex items-center gap-3">
                  {["Instagram", "Behance", "Dribbble"].map((s) => (
                    <a key={s} href="#" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-ink hover:text-cream hover:border-ink transition">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-card/60 backdrop-blur p-8 md:p-10">
                <div className="mb-8">
                  <h3 className="font-display text-3xl">Start a project</h3>
                  <p className="text-muted-foreground mt-2">Fill in the brief below and we'll get back to you fast.</p>
                </div>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating WhatsApp button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-3 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 pl-4 pr-5 py-3"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-semibold">Chat on WhatsApp</span>
      </a>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-10">
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
            <ul className="space-y-2.5">
              <li><a href="#studio" className="hover:text-cream/70 transition">About</a></li>
              <li><a href="#work" className="hover:text-cream/70 transition">Work</a></li>
              <li><a href="#services" className="hover:text-cream/70 transition">Services</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Social</div>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-cream/70 transition">Instagram</a></li>
              <li><a href="#" className="hover:text-cream/70 transition">Behance</a></li>
              <li><a href="#" className="hover:text-cream/70 transition">Dribbble</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Say hi</div>
            <a href="mailto:hello@trimmic.com" className="font-display text-2xl text-gradient-brand">hello@trimmic.com</a>
            <p className="mt-3 text-cream/70 text-sm">+92 347 255 1975</p>
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

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <MarqueeBand />
      <Services />
      <Showcase />
      <Manifesto />
      <Billboard />
      <CTA />
      <Footer />
    </div>
  );
}
