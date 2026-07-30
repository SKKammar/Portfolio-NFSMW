'use client';

import { useEffect, useState, useRef } from 'react';

export function usePursuitRadar(targetRef: React.RefObject<HTMLElement | null>, isAudioEnabled: boolean = false) {
  const [intensity, setIntensity] = useState(0); // 0 (far) to 1 (close)
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextBeepTimeRef = useRef<number>(0);
  const lastIntensityRef = useRef<number>(0);

  // Initialize or teardown audio context based on toggle
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (isAudioEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    } else if (!isAudioEnabled && audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, [isAudioEnabled]);

  // Track cursor distance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!targetRef.current) return;
      
      const rect = targetRef.current.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      
      const dx = e.clientX - targetX;
      const dy = e.clientY - targetY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const maxDistance = 600; // Track within 600px
      const rawIntensity = Math.max(0, 1 - distance / maxDistance);
      
      // Use easing to make the intensity feel more aggressive as it gets closer
      const easedIntensity = Math.pow(rawIntensity, 2);
      
      setIntensity(easedIntensity);
      lastIntensityRef.current = easedIntensity;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [targetRef]);

  // Audio Radar Loop
  useEffect(() => {
    let animationFrameId: number;
    
    const playBeep = () => {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      // Pitch increases from 800Hz to 1200Hz as cursor gets closer
      osc.frequency.setValueAtTime(800 + lastIntensityRef.current * 400, ctx.currentTime); 
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    };

    const loop = () => {
      if (isAudioEnabled && audioContextRef.current) {
        const now = audioContextRef.current.currentTime;
        
        // Interval between beeps drops from 1s to 0.1s based on intensity
        const interval = 1.0 - (lastIntensityRef.current * 0.9);
        
        if (now >= nextBeepTimeRef.current) {
           if (lastIntensityRef.current > 0.01) {
             playBeep();
           }
           nextBeepTimeRef.current = now + Math.max(0.1, interval);
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAudioEnabled]);

  return { intensity };
}
