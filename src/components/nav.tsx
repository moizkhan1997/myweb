import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoBlack from "@assets/Trimmic_Black_1781021962708.svg";
import logoWhite from "@assets/Trimmic_White_1781021962708.svg";

export function LogoBlack() {
  return <img src={logoBlack} alt="Trimmic" className="h-8 w-auto" />;
}

export function LogoWhite() {
  return <img src={logoWhite} alt="Trimmic" className="h-10 w-auto" />;
}

const NAV_LINKS: { label: string; href: string; route: boolean }[] = [
  { label: "Work",      href: "/#work",      route: false },
  { label: "Portfolio", href: "/portfolio",   route: true  },
  { label: "Services",  href: "/#services",  route: false },
  { label: "Studio",    href: "/#studio",    route: false },
  { label: "Blog",      href: "/blog",        route: true  },
  { label: "Contact",   href: "/contact",     route: true  },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  // Close on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50">
        <nav className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-[oklch(0.97_0.015_80/0.96)] px-3 py-2 pl-5 backdrop-blur-xl shadow-soft">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <LogoBlack />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.route
                  ? <Link href={link.href} className="hover:text-foreground/60 transition">{link.label}</Link>
                  : <a href={link.href} className="hover:text-foreground/60 transition">{link.label}</a>
                }
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition"
            >
              Let's Talk
              <span className="inline-block transition group-hover:translate-x-0.5">→</span>
            </Link>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full border border-ink/15 bg-background/60 gap-[5.5px]"
            >
              <span className={`block h-[1.5px] w-[18px] bg-ink rounded-full transition-all duration-300 origin-center ${open ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-[18px] bg-ink rounded-full transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-[1.5px] w-[18px] bg-ink rounded-full transition-all duration-300 origin-center ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-ink flex flex-col md:hidden transition-opacity duration-500 ease-in-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Decorative orbs */}
        <div aria-hidden className="absolute -top-32 -right-32 h-[360px] w-[360px] rounded-full bg-gradient-brand opacity-20 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-32 -left-32 h-[280px] w-[280px] rounded-full bg-brand-pink opacity-15 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col h-full px-8 pt-28 pb-10 overflow-y-auto">
          {/* Nav links */}
          <ul className="flex-1 flex flex-col justify-center gap-0 -mt-6">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.label}
                className={`transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
              >
                {link.route ? (
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between font-display text-[2.5rem] leading-none text-cream py-4 border-b border-cream/10 hover:pl-2 transition-all duration-200"
                  >
                    <span className="group-hover:text-cream/60 transition-colors">{link.label}</span>
                    <span className="text-cream/20 text-2xl group-hover:text-cream/50 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between font-display text-[2.5rem] leading-none text-cream py-4 border-b border-cream/10 hover:pl-2 transition-all duration-200"
                  >
                    <span className="group-hover:text-cream/60 transition-colors">{link.label}</span>
                    <span className="text-cream/20 text-2xl group-hover:text-cream/50 group-hover:translate-x-1 transition-all">→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Bottom — CTA + socials */}
          <div
            className={`mt-10 space-y-5 transition-all duration-500 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: open ? "430ms" : "0ms" }}
          >
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-7 py-4 text-base font-medium hover:bg-cream/90 transition"
            >
              Start a Project →
            </Link>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-cream/40">
              <a href="https://www.instagram.com/trimmic.creative/" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition">Instagram</a>
              <a href="https://www.linkedin.com/company/trimmicc" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition">LinkedIn</a>
              <a href="mailto:hello@trimmic.com" className="hover:text-cream transition">hello@trimmic.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
