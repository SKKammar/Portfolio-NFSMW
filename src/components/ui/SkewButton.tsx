'use client';

import { ReactNode } from 'react';

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
  const base =
    'skew-btn inline-flex items-center px-6 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-all duration-200';

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
      <a href={href} className={classes} target={target} rel={rel}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      <span>{children}</span>
    </button>
  );
}
