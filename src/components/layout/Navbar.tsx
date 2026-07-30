'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { RadioPlayer } from '@/components/RadioPlayer';

const links = [
  { href: '#driver-profile', label: 'Driver Profile', id: 'driver-profile' },
  { href: '#blacklist', label: 'The Blacklist', id: 'blacklist' },
  { href: '#under-the-hood', label: 'Under The Hood', id: 'under-the-hood' },
  { href: '#dispatch', label: 'Dispatch', id: 'dispatch' },
];

export function Navbar() {
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-asphalt/90 border-b-2 border-rockport/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <a
          href="#"
          className="font-heading text-lg font-bold uppercase tracking-wider text-rockport hover:text-white transition-colors"
        >
          SK<span className="text-white">K</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative flex items-center font-heading text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
                active === link.id
                  ? 'text-rockport'
                  : 'text-exhaust hover:text-rockport'
              }`}
            >
              {active === link.id && (
                <span className="animate-pulse mr-2 font-bold">{'>>'}</span>
              )}
              {link.label}
            </a>
          ))}

          {/* Radio Easter Egg */}
          <div className="ml-4 border-l border-industrial-light pl-4">
            <RadioPlayer />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="p-2 text-rockport md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t-2 border-rockport/30 bg-asphalt/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] transition-colors border-l-2 pl-4 ${
                  active === link.id
                    ? 'text-rockport border-rockport'
                    : 'text-exhaust border-transparent hover:text-rockport hover:border-rockport-dim'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-industrial-light">
              <RadioPlayer />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
