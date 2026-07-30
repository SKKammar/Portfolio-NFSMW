'use client';

import { ReactNode } from 'react';
import { useUIAudio } from '@/hooks/useUIAudio';

interface SkewButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'danger';
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export function SkewButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  target,
  rel,
}: SkewButtonProps) {
  const { playMenuClank } = useUIAudio();

  const handleClick = (e: React.MouseEvent) => {
    playMenuClank();
    if (onClick) onClick();
  };

  const base =
    'group inline-flex items-center px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-none -skew-x-[4deg]';

  const variants = {
    primary:
      'bg-rockport text-asphalt hover:bg-white hover:shadow-[0_0_20px_rgba(229,193,88,0.3)]',
    outline:
      'border-2 border-rockport text-rockport hover:bg-rockport hover:text-asphalt',
    danger:
      'bg-pursuit-red text-white hover:bg-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={handleClick}>
        <span className="skew-x-[4deg] flex items-center gap-2">
          <span className="text-rockport-dim opacity-50">[</span>
          {children}
          <span className="text-rockport-dim opacity-50">]</span>
        </span>
      </a>
    );
  }

  return (
    <button onClick={handleClick} className={classes}>
      <span className="skew-x-[4deg] flex items-center gap-2">
        <span className="text-rockport-dim opacity-50">[</span>
        {children}
        <span className="text-rockport-dim opacity-50">]</span>
      </span>
    </button>
  );
}
