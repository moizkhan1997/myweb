import { Link } from "wouter";
import logoBlack from "@assets/Trimmic_Black_1781021962708.svg";
import logoWhite from "@assets/Trimmic_White_1781021962708.svg";

export function LogoBlack() {
  return <img src={logoBlack} alt="Trimmic" className="h-8 w-auto" />;
}

export function LogoWhite() {
  return <img src={logoWhite} alt="Trimmic" className="h-10 w-auto" />;
}

export function Nav() {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-border/60 bg-[oklch(0.97_0.015_80/0.96)] px-3 py-2 pl-5 backdrop-blur-xl shadow-soft">
        <Link href="/" className="flex items-center gap-2">
          <LogoBlack />
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium">
          <li><a href="/#work" className="hover:text-foreground/60 transition">Work</a></li>
          <li><Link href="/portfolio" className="hover:text-foreground/60 transition">Portfolio</Link></li>
          <li><a href="/#services" className="hover:text-foreground/60 transition">Services</a></li>
          <li><a href="/#studio" className="hover:text-foreground/60 transition">Studio</a></li>
          <li><Link href="/contact" className="hover:text-foreground/60 transition">Contact</Link></li>
        </ul>
        <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 text-sm font-medium hover:bg-ink/90 transition">
          Let's Talk
          <span className="inline-block transition group-hover:translate-x-0.5">→</span>
        </Link>
      </nav>
    </header>
  );
}
