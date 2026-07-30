'use client';

import { useState, useRef, useCallback } from 'react';

export function RadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  const startAudio = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.06;
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // EA Trax Nu-Metal/Synth Distorted Chug
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 55; // Low A1

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    
    // Heavy Distortion
    const distortion = ctx.createWaveShaper();
    const curve = new Float32Array(400);
    for (let i = 0; i < 400; ++i) {
      const x = (i * 2) / 400 - 1;
      curve[i] = ((3 + 50) * x * 20 * (Math.PI / 180)) / (Math.PI + 50 * Math.abs(x));
    }
    distortion.curve = curve;
    distortion.oversample = '4x';

    // Rhythmic LFO to create the "chug"
    const lfo = ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.value = 4.2; // BPM roughly 126 
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 800;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain1 = ctx.createGain();
    gain1.gain.value = 0.6;

    osc1.connect(distortion);
    distortion.connect(filter);
    filter.connect(gain1);
    gain1.connect(masterGain);
    
    osc1.start();
    lfo.start();
    
    // High-freq synth lead (Shapeshifter/Celldweller style)
    const lead = ctx.createOscillator();
    lead.type = 'square';
    lead.frequency.value = 220; // A3
    
    const leadLfo = ctx.createOscillator();
    leadLfo.type = 'sine';
    leadLfo.frequency.value = 0.5;
    const leadLfoGain = ctx.createGain();
    leadLfoGain.gain.value = 30;
    leadLfo.connect(leadLfoGain);
    leadLfoGain.connect(lead.frequency);
    
    const leadFilter = ctx.createBiquadFilter();
    leadFilter.type = 'bandpass';
    leadFilter.frequency.value = 1500;
    
    const leadGain = ctx.createGain();
    leadGain.gain.value = 0.05;
    
    lead.connect(leadFilter);
    leadFilter.connect(leadGain);
    leadGain.connect(masterGain);
    
    lead.start();
    leadLfo.start();

    oscillatorsRef.current = [osc1, lfo, lead, leadLfo];
  }, []);

  const stopAudio = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch {}
    });
    oscillatorsRef.current = [];
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    gainRef.current = null;
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-2 px-3 py-1.5 text-xs font-heading uppercase tracking-widest text-exhaust transition-colors hover:text-rockport"
      aria-label={isPlaying ? 'Turn off radio' : 'Turn on radio'}
      title="Rockport City Radio"
    >
      {/* Radio icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
        <circle cx="12" cy="12" r="2" />
        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
      </svg>
      <span className="mt-[2px]">EA Trax</span>
      {/* Active indicator */}
      {isPlaying && (
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rockport radio-active" />
      )}
    </button>
  );
}
