import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";

function CalBooking() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".g-cal-head", {
        scrollTrigger: { trigger: ".g-cal-head", start: "top 85%", once: true },
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      });
      gsap.from(".g-cal-widget", {
        scrollTrigger: { trigger: ".g-cal-widget", start: "top 88%", once: true },
        opacity: 0, y: 40, scale: 0.98, duration: 0.9, ease: "power3.out", delay: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ns = "kick-off-call";
    const w = window as any;

    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...ar: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function (...args: any[]) { p(api, args); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(w, "https://app.cal.com/embed/embed.js", "init");

    w.Cal("init", ns, { origin: "https://cal.com" });
    w.Cal.ns[ns]("inline", {
      elementOrSelector: "#trimmic-cal-inline",
      config: { layout: "month_view", theme: "light" },
      calLink: "muhammad-moiz-khan-4ywv3s/kick-off-call",
    });
    w.Cal.ns[ns]("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <section ref={sectionRef} className="pt-36 pb-20 md:pt-44 md:pb-28 relative overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 bg-gradient-brand-soft opacity-25" />
      <div aria-hidden className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-gradient-brand opacity-15 blur-[110px]" />
      <div className="relative px-8 md:px-14 lg:px-20 text-center">
        <div className="g-cal-head max-w-2xl mx-auto">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Talk to us live</span>
          <h2 className="font-display mt-4 text-4xl md:text-5xl lg:text-6xl leading-[0.95]">Book an Intro Call</h2>
          <p className="mt-4 text-lg text-muted-foreground">Pick a time that suits you and chat with our team live.</p>
          <svg width="50" height="104" viewBox="0 0 50 104" fill="none" className="mx-auto mt-7">
            <path
              d="M25 2
                 C 41 10, 11 22, 27 32
                 C 41 41, 9 50, 25 60
                 C 36 67, 16 74, 25 84"
              stroke="url(#calArrow)" strokeWidth="2.25" strokeLinecap="round" fill="none"
            />
            <path d="M14 76 L25 90 L34 75" stroke="url(#calArrow)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <defs>
              <linearGradient id="calArrow" x1="0" y1="0" x2="50" y2="104" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FCBA3F" />
                <stop offset="50%" stopColor="#F07DB0" />
                <stop offset="100%" stopColor="#85CC6A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="g-cal-widget max-w-4xl mx-auto mt-2">
          <div
            id="trimmic-cal-inline"
            style={{ width: "100%", minHeight: "650px" }}
            className="rounded-[2rem] border border-black/5 bg-white overflow-hidden shadow-[0_50px_120px_-40px_rgba(20,16,8,0.35)]"
          />
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <CalBooking />
      <ContactSection />
      <Footer />
    </div>
  );
}
