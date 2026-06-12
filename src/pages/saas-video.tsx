import React from "react";
import Footer from "@/components/footer";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-[0.22em] text-cream/60 mb-4">{children}</div>;
}

function StickyNav() {
  const links = [
    { label: "Viral Hits", href: "#viral-hits" },
    { label: "Our Process", href: "#our-process" },
    { label: "Pricing", href: "#Pricing" },
    { label: "Previous Work", href: "#Previous-Work" },
    { label: "Testimonials", href: "#Testimonials" },
    { label: "FAQ", href: "#FAQS" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="font-display text-xl text-cream">Trimmic</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-cream md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-gradient-brand">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream px-5 py-3 text-sm font-semibold text-ink transition hover:bg-cream/90">
          Book a Call
        </a>
      </div>
    </header>
  );
}

export default function SaasVideoPage() {
  return (
    <div className="min-h-screen bg-ink text-cream font-sans">
      <StickyNav />

      <main>
        <section className="relative min-h-screen overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="/agency-promo.mp4"
          />
          <div className="absolute inset-0 bg-ink/60" />
          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-6 pb-20 pt-24">
            <div className="space-y-6 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cream/60">SaaS Video</p>
              <h1 className="font-display text-5xl md:text-7xl leading-tight text-cream">
                SaaS Videos That Turn Signups Into Sales
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-cream/80">
                Whether you're launching a product, onboarding users, or pitching investors — our SaaS videos make complex software impossible to ignore.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-cream/80">
              <span className="flex h-4 w-4 animate-pulse rounded-full bg-rose-500" />
              <span>Check out the offer</span>
            </div>
          </div>
        </section>

        <section className="border-t border-cream/10 bg-ink py-10">
          <div className="mx-auto max-w-7xl overflow-hidden px-6">
            <div className="marquee gap-10 text-sm uppercase tracking-[0.2em] text-cream">
              {Array.from({ length: 12 }).map((_, index) => (
                <span key={index} className="inline-flex items-center gap-3">
                  <div className="h-10 w-24 rounded-2xl bg-cream/10" />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="viral-hits" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
              <div className="space-y-6">
                <SectionLabel>SaaS Video in Action</SectionLabel>
                <h2 className="font-display text-5xl leading-tight text-cream">SaaS Video in Action</h2>
                <p className="max-w-2xl text-lg leading-relaxed text-cream/80">
                  We work with SaaS founders and marketing teams to create videos that explain fast, engage deep, and convert hard.
                </p>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-cream/5">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                  src="/agency-promo.mp4"
                />
                <div className="absolute inset-0 bg-ink/40" />
                <button className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream/50 bg-cream/10 p-5 text-cream transition hover:bg-cream/20">
                  ▶
                </button>
              </div>
            </div>
            <div className="mt-6 text-sm uppercase tracking-[0.2em] text-cream/60">Showreel 2025</div>
          </div>
        </section>

        <section id="our-process" className="border-t border-cream/10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionLabel>Why Us?</SectionLabel>
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-display text-5xl leading-tight text-cream">Sharp. Story-led. Built to Convert.</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  {
                    number: "01",
                    title: "Story Before Script",
                    description:
                      "We dig into your product, your users, and your goals before a single frame is planned. Every video starts with strategy, not guesswork.",
                  },
                  {
                    number: "02",
                    title: "End-to-End Production",
                    description:
                      "From scriptwriting and storyboarding to animation, voiceover, and sound design — we handle everything under one roof.",
                  },
                  {
                    number: "03",
                    title: "Flexible Packages",
                    description:
                      "One-off launch videos, ongoing content, or monthly retainers — built around your roadmap, not ours.",
                  },
                  {
                    number: "04",
                    title: "SaaS-Native Visuals",
                    description:
                      "We know dashboards, flows, and UI. Our animations feel native to your product — not like a generic explainer template.",
                  },
                  {
                    number: "05",
                    title: "Revision-Friendly Process",
                    description:
                      "Feedback rounds are built in at every stage so you always get exactly what you envisioned.",
                  },
                  {
                    number: "06",
                    title: "Fast Turnaround",
                    description:
                      "Most projects delivered in 7–14 days. Because your launch can't wait for a slow creative agency.",
                  },
                ].map((item) => (
                  <div key={item.number} className="rounded-3xl border border-cream/10 bg-cream/5 p-8">
                    <div className="text-3xl font-display text-gradient-brand">{item.number}</div>
                    <h3 className="mt-4 text-2xl font-semibold text-cream">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="Pricing" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionLabel>Pricing</SectionLabel>
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-display text-5xl leading-tight text-cream">Flexible Plans for Every Stage</h2>
              <div className="grid gap-6 lg:grid-cols-3 mt-10">
                {[
                  {
                    title: "Starter Video",
                    price: "$499",
                    description: "Perfect for early-stage SaaS teams who need one sharp video.",
                    features: [
                      "60–90 sec animated video",
                      "Script & storyboard",
                      "Professional voiceover",
                      "Background music & sound design",
                      "2 revision rounds",
                      "HD delivery (MP4)",
                    ],
                    badge: null,
                  },
                  {
                    title: "Growth Package",
                    price: "$1,200",
                    description: "For growing SaaS teams who need a full video suite.",
                    features: [
                      "Up to 3 videos (60–90 sec each)",
                      "Script & storyboard for all",
                      "Custom motion graphics",
                      "Professional voiceover",
                      "Unlimited revisions",
                      "HD + web-optimised delivery",
                      "Slack support throughout",
                    ],
                    badge: "Most Popular",
                  },
                  {
                    title: "Monthly Retainer",
                    price: "$2,500/month",
                    description: "An embedded video production partner — without hiring in-house.",
                    features: [
                      "4 videos per month",
                      "Dedicated motion designer",
                      "Scripts, voiceovers, animations",
                      "Weekly async check-ins",
                      "Slack + Notion project tracking",
                      "Priority turnaround",
                      "Monthly performance review",
                    ],
                    badge: null,
                  },
                ].map((plan) => (
                  <div key={plan.title} className="rounded-3xl border border-cream/10 bg-cream/5 p-8">
                    {plan.badge ? (
                      <span className="inline-flex rounded-full bg-gradient-brand/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cream">
                        {plan.badge}
                      </span>
                    ) : null}
                    <div className="mt-6">
                      <div className="text-3xl font-display text-cream">{plan.title}</div>
                      <div className="mt-2 text-4xl font-semibold text-cream">{plan.price}</div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-cream/80">{plan.description}</p>
                    <ul className="mt-6 space-y-3 text-sm text-cream/80">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-gradient-brand" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-cream px-6 py-4 text-sm font-semibold text-ink transition hover:bg-cream/90">
                      Book a Call
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="Previous-Work" className="border-t border-cream/10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionLabel>Case Studies</SectionLabel>
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-display text-5xl leading-tight text-cream">How we do anything is how we do everything.</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="overflow-hidden rounded-3xl bg-cream/5">
                    <div className="group relative overflow-hidden">
                      <div className="h-64 bg-slate-900" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </div>
                    <div className="space-y-3 p-6">
                      <div className="text-xs uppercase tracking-[0.2em] text-cream/60">SaaS Explainer · Motion</div>
                      <div className="font-display text-2xl text-cream">Product Launch Film</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="Testimonials" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionLabel>Testimonials</SectionLabel>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                "100% Client Satisfaction",
                "50+ Videos Delivered",
                "4.9/5.0 Rating",
              ].map((stat) => (
                <div key={stat} className="rounded-3xl border border-cream/10 bg-cream/5 p-8 text-center">
                  <div className="text-3xl font-display text-gradient-brand">{stat.split(" ")[0]}</div>
                  <p className="mt-4 text-sm text-cream/70">{stat}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl border border-cream/10 bg-cream/5 p-6">
              <div className="marquee gap-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="min-w-[320px] rounded-3xl border border-cream/10 bg-ink/70 p-6">
                    <p className="text-lg leading-relaxed text-cream/90">“Trimmic turned our product story into a video that actually converts — with the speed and creativity we needed.”</p>
                    <p className="mt-6 text-sm uppercase tracking-[0.2em] text-cream/60">Maya R., SaaS Founder</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="FAQS" className="border-t border-cream/10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <SectionLabel>Frequently Asked Questions</SectionLabel>
            <h2 className="font-display text-5xl leading-tight text-cream">Frequently Asked Questions</h2>
            <div className="mt-10 space-y-4">
              {[
                {
                  q: "What types of SaaS videos do you make?",
                  a: "We cover everything: product explainers, onboarding walkthroughs, feature announcements, investor pitch videos, social media cuts, and homepage hero videos.",
                },
                {
                  q: "Do you write the script too?",
                  a: "Yes — always. Every project starts with a strategy call, then we craft the script and storyboard before any animation begins.",
                },
                {
                  q: "How long does a video take?",
                  a: "Most single videos are delivered within 7–14 business days. Rush delivery available.",
                },
                {
                  q: "Can I provide my own script or voiceover?",
                  a: "Absolutely. We can work with your script, voiceover artist, or existing brand assets.",
                },
                {
                  q: "What format will I receive the final video in?",
                  a: "HD MP4 optimised for web, plus social media cuts (16:9, 9:16, 1:1) if needed.",
                },
                {
                  q: "Do you offer revisions?",
                  a: "Yes — revision rounds are built into every package. We don't stop until you're happy.",
                },
                {
                  q: "Can I pause or cancel the retainer?",
                  a: "No long-term contracts. Pause or cancel before your next billing cycle.",
                },
              ].map((item) => (
                <details key={item.q} className="rounded-3xl border border-cream/10 bg-cream/5 p-6">
                  <summary className="cursor-pointer text-lg font-semibold text-cream">{item.q}</summary>
                  <p className="mt-4 text-sm leading-relaxed text-cream/80">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="font-display text-5xl leading-tight text-cream">Got a Product Worth Showing Off?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
              Tell us what your SaaS does. We'll find the story inside it and turn it into a video your users actually watch till the end.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-cream px-8 py-4 text-sm font-semibold text-ink transition hover:bg-cream/90">
                Start a Project →
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-cream/20 bg-ink/90 px-8 py-4 text-sm font-semibold text-cream transition hover:bg-cream/10">
                Book a Discovery Call
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
