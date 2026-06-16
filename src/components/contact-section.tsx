import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[340px] text-center gap-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand text-ink text-3xl">✓</div>
        <h3 className="font-display text-3xl">Message received!</h3>
        <p className="text-muted-foreground max-w-xs">We'll be in touch within 24 hours. Check your inbox, or WhatsApp us if you can't wait.</p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name: "", email: "", service: "", budget: "", message: "" }); }}
          className="mt-2 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputCls = "w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ink/20 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="rounded-2xl bg-red-50 text-red-700 px-4 py-3 text-sm border border-red-200">
          Something went wrong. Please try again or{" "}
          <a href="https://wa.me/923472551975" target="_blank" rel="noopener noreferrer" className="underline">WhatsApp us directly</a>.
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-widests text-muted-foreground mb-2">Your name *</label>
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
      <button
        type="submit"
        disabled={status === "sending"}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-cream px-7 py-4 text-base font-medium hover:bg-ink/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending…" : "Start a Project"}
        {status !== "sending" && <span className="inline-block transition group-hover:translate-x-1">→</span>}
      </button>
    </form>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const whatsapp = "923472551975";
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Trimmic! I'd like to discuss a project.")}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".g-cta-left", {
        scrollTrigger: { trigger: ".g-cta-left", start: "top 82%", once: true },
        opacity: 0, x: -40, duration: 0.9, ease: "power3.out",
      });
      gsap.from(".g-cta-right", {
        scrollTrigger: { trigger: ".g-cta-right", start: "top 82%", once: true },
        opacity: 0, x: 40, duration: 0.9, ease: "power3.out", delay: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
        <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-40" />
        <div aria-hidden className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-brand opacity-20 blur-3xl" />

        <div className="relative px-8 md:px-14 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">

            <div className="g-cta-left lg:col-span-5 flex flex-col justify-between gap-12">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Let's talk</span>
                <h2 className="font-display mt-4 text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
                  Got an idea worth
                  <span
                    className="font-serif-italic font-normal block leading-[1.1]"
                    style={{
                      backgroundImage: "linear-gradient(120deg, #febe41 0%, #e17eb3 35%, #8cc86c 70%, #4bbfae 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      paddingBottom: "0.5em",
                    }}
                  >
                    making weird?
                  </span>
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

            <div className="g-cta-right lg:col-span-7">
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
