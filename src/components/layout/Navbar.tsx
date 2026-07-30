'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Radar } from 'lucide-react';
import { RadioPlayer } from '@/components/RadioPlayer';
import { useUIAudio } from '@/hooks/useUIAudio';

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
  const [radarOn, setRadarOn] = useState(false);
  const { playMenuClank } = useUIAudio();

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
          className="font-heading text-lg font-bold uppercase tracking-wider text-rockport hover:text-white transition-colors mr-8 lg:mr-12"
        >
          SK<span className="text-white">K</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => playMenuClank()}
              className={`relative flex items-center font-heading text-sm font-semibold uppercase tracking-[0.2em] transition-none ${
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

          {/* Heat Level */}
          <div className="ml-4 border-l border-industrial-light pl-4 flex items-center gap-2" title="Condition 5 Pursuit / Actively Hunting for Roles">
            <span className="font-heading text-[10px] font-bold text-pursuit-red tracking-[0.2em] uppercase hidden lg:block">
              Heat Level 5
            </span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pursuit-red opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pursuit-red shadow-[0_0_8px_rgba(192,57,43,1)]" />
            </span>
          </div>

          {/* Radar Toggle */}
          <div className="ml-4 border-l border-industrial-light pl-4 flex items-center">
            <button
              onClick={() => {
                playMenuClank();
                const newState = !radarOn;
                setRadarOn(newState);
                window.dispatchEvent(new CustomEvent('radar-audio-toggle', { detail: newState }));
              }}
              className="relative flex items-center gap-2 px-3 py-1.5 text-xs font-heading uppercase tracking-widest text-exhaust transition-none snappy-hover"
              title="Toggle Pursuit Radar Audio"
            >
              <Radar size={16} className={radarOn ? "text-rockport animate-pulse" : ""} />
              <span className="mt-[2px] hidden lg:block">Comm Link</span>
              {radarOn && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rockport radio-active" />
              )}
            </button>
          </div>

          {/* EA Trax / Radio */}
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
                onClick={() => {
                  playMenuClank();
                  setMobileOpen(false);
                }}
                className={`py-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] transition-none border-l-2 pl-4 ${
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
