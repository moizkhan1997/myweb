import React from "react";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display text-2xl">Trimmic</div>
            <p className="mt-6 max-w-sm text-cream/70">
              A creative studio with a rebel soul. Born to make brands that don't sit quietly in the corner.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-widest text-cream/50 mb-4">Studio</div>
            <ul className="space-y-2.5">
              <li><a href="/#studio" className="hover:text-cream/70 transition">About</a></li>
              <li><a href="/#work" className="hover:text-cream/70 transition">Work</a></li>
              <li><a href="/#services" className="hover:text-cream/70 transition">Services</a></li>
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
