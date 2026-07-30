'use client';

import { useCallback } from 'react';

export function useUIAudio() {
  const playMenuClank = useCallback(() => {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    
    // Low mechanical thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Metallic high-pass noise burst
    const bufferSize = ctx.sampleRate * 0.1; // 100ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    osc.start();
    noise.start();
    osc.stop(ctx.currentTime + 0.2);
    noise.stop(ctx.currentTime + 0.2);
  }, []);

  const playCrossShout = useCallback(() => {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Distorted loud shout (EVERYONE!)
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
    
    const distortion = ctx.createWaveShaper();
    const curve = new Float32Array(400);
    for (let i = 0; i < 400; ++i) {
      const x = (i * 2) / 400 - 1;
      curve[i] = ((3 + 50) * x * 20 * (Math.PI / 180)) / (Math.PI + 50 * Math.abs(x));
    }
    distortion.curve = curve;
    distortion.oversample = '4x';

    gain.gain.setValueAtTime(1.0, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    osc.connect(distortion);
    distortion.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);

    // Screen flash effect
    const flash = document.createElement('div');
    flash.className = 'fixed inset-0 z-[9999] bg-pursuit-red pointer-events-none opacity-80 mix-blend-color-burn';
    flash.style.transition = 'opacity 0.5s ease-out';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 500);
    }, 50);
  }, []);

  return { playMenuClank, playCrossShout };
}
