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

    // Low engine rumble
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = 55;
    const gain1 = ctx.createGain();
    gain1.gain.value = 0.3;
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start();

    // Sub-bass throb
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 30;
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.4;
    osc2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start();

    // Engine modulation LFO
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 2.5;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start();

    // High-freq static/radio crackle
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.08;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 3000;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start();

    oscillatorsRef.current = [osc1, osc2, lfo];
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
      <span>Radio</span>
      {/* Active indicator */}
      {isPlaying && (
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rockport radio-active" />
      )}
    </button>
  );
}
