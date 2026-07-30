'use client';

import { motion } from 'framer-motion';
import { Mail, Radio } from 'lucide-react';

function GithubIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactChannels = [
  {
    name: 'Email',
    value: 'santoshkkammar16@gmail.com',
    href: 'mailto:santoshkkammar16@gmail.com',
    icon: Mail,
    accentColor: '#c0392b',
    hoverBorder: 'hover:border-pursuit-red',
    hoverText: 'hover:text-pursuit-red',
  },
  {
    name: 'GitHub',
    value: '@SKKammar',
    href: 'https://github.com/SKKammar',
    icon: GithubIcon,
    accentColor: '#e5c158',
    hoverBorder: 'hover:border-rockport',
    hoverText: 'hover:text-rockport',
  },
  {
    name: 'LinkedIn',
    value: 'Santosh K Kammar',
    href: 'https://www.linkedin.com/in/santosh-k-kammar-skk162005',
    icon: LinkedinIcon,
    accentColor: '#1a3a6b',
    hoverBorder: 'hover:border-pursuit-blue',
    hoverText: 'hover:text-sepia',
  },
];

export function Dispatch() {
  return (
    <section
      id="dispatch"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-12"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl font-bold uppercase italic tracking-wider text-rockport md:text-4xl">
          Dispatch
        </h2>
        <div className="mt-2 h-1 w-20 bg-rockport" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-10 max-w-4xl"
      >
        {/* Calling All Units Header */}
        <div className="mb-8 flex items-center gap-4">
          <Radio className="h-6 w-6 text-pursuit-red animate-pulse" />
          <h3 className="font-heading text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
            Calling All Units
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-exhaust max-w-xl">
          Currently seeking new contracts, software engineering opportunities,
          internships, and exciting projects where I can contribute while
          continuing to grow as an engineer. All channels open.
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {contactChannels.map((channel, i) => (
          <motion.a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, x: 3 }}
            className={`group relative flex flex-col items-center justify-center gap-4 border-2 border-industrial-light bg-gritty p-8 clip-angular glitch-hover ${channel.hoverBorder}`}
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
              style={{ backgroundColor: channel.accentColor }}
            />

            {/* Icon */}
            <div
              className={`flex h-14 w-14 items-center justify-center border-2 border-industrial-light bg-asphalt/60 transition-all duration-300 ${channel.hoverText}`}
            >
              <channel.icon
                size={24}
                className={`text-exhaust transition-colors duration-300 ${channel.hoverText}`}
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
                {channel.name}
              </h4>
              <p className="mt-1 text-xs text-fog break-all">{channel.value}</p>
            </div>

            {/* Channel frequency label */}
            <span className="text-[9px] font-heading uppercase tracking-[0.3em] text-smoke">
              Channel Open
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
