'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * NFS MW 2005 Intro Splash — plays police siren on click, then fades out.
 * Uses Web Audio API to synthesize the authentic wailing siren sound.
 */
export function IntroSplash({ onEnter }: { onEnter: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const playSiren = useCallback(() => {
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(ctx.destination);

    // --- Wailing siren (oscillating frequency) ---
    const siren = ctx.createOscillator();
    siren.type = 'sawtooth';
    const sirenGain = ctx.createGain();
    sirenGain.gain.value = 0.5;

    // Bandpass filter to shape the siren tone
    const sirenFilter = ctx.createBiquadFilter();
    sirenFilter.type = 'bandpass';
    sirenFilter.frequency.value = 800;
    sirenFilter.Q.value = 2;

    siren.connect(sirenFilter);
    sirenFilter.connect(sirenGain);
    sirenGain.connect(masterGain);

    // Wailing effect — frequency sweeps up and down
    const now = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const t = now + i * 0.5;
      siren.frequency.setValueAtTime(600, t);
      siren.frequency.linearRampToValueAtTime(1200, t + 0.25);
      siren.frequency.linearRampToValueAtTime(600, t + 0.5);
    }

    siren.start(now);
    siren.stop(now + 3);

    // --- Second siren layer (yelp — faster) ---
    const yelp = ctx.createOscillator();
    yelp.type = 'square';
    const yelpGain = ctx.createGain();
    yelpGain.gain.value = 0.15;

    const yelpFilter = ctx.createBiquadFilter();
    yelpFilter.type = 'bandpass';
    yelpFilter.frequency.value = 1000;
    yelpFilter.Q.value = 3;

    yelp.connect(yelpFilter);
    yelpFilter.connect(yelpGain);
    yelpGain.connect(masterGain);

    for (let i = 0; i < 12; i++) {
      const t = now + i * 0.25;
      yelp.frequency.setValueAtTime(800, t);
      yelp.frequency.linearRampToValueAtTime(1400, t + 0.12);
      yelp.frequency.linearRampToValueAtTime(800, t + 0.25);
    }

    yelp.start(now);
    yelp.stop(now + 3);

    // Fade out the siren
    masterGain.gain.setValueAtTime(0.15, now + 2);
    masterGain.gain.linearRampToValueAtTime(0, now + 3);

    // Cleanup
    setTimeout(() => {
      ctx.close();
    }, 3500);
  }, []);

  const handleEnter = () => {
    document.body.style.overflow = '';
    playSiren();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-asphalt transition-opacity duration-700 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Police light flash background */}
      <div className="absolute inset-0 siren-bg opacity-30" />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* NFS MW Logo text */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-heading text-xs font-bold uppercase tracking-[0.5em] text-exhaust">
            Need for Speed
          </span>
          <h1 className="font-heading text-5xl font-bold uppercase italic tracking-wider text-rockport md:text-7xl lg:text-8xl">
            Most Wanted
          </h1>
          <span className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-rockport-dim">
            Portfolio Edition — 2005
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-rockport-dark to-transparent" />

        {/* Player name */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-fog">
            Player
          </span>
          <span className="font-heading text-xl font-bold uppercase tracking-wider text-white">
            Santosh K Kammar
          </span>
        </div>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          className="group mt-4 skew-btn border-2 border-rockport bg-rockport/10 px-10 py-4 transition-all duration-200 hover:bg-rockport hover:shadow-[0_0_30px_rgba(212,160,23,0.3)]"
        >
          <span className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-rockport transition-colors group-hover:text-asphalt">
            Click to Enter Rockport
          </span>
        </button>

        {/* Subtitle */}
        <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-smoke">
          Audio will play — Use headphones for best experience
        </p>
      </div>

      {/* Corner police lights */}
      <div className="absolute top-4 left-4 h-3 w-3 rounded-full bg-pursuit-red animate-pulse" />
      <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-pursuit-blue animate-pulse" style={{ animationDelay: '0.3s' }} />
      <div className="absolute bottom-4 left-4 h-3 w-3 rounded-full bg-pursuit-blue animate-pulse" style={{ animationDelay: '0.6s' }} />
      <div className="absolute bottom-4 right-4 h-3 w-3 rounded-full bg-pursuit-red animate-pulse" style={{ animationDelay: '0.9s' }} />
    </div>
  );
}
