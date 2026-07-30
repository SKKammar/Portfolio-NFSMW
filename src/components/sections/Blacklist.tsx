'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { blacklistProjects } from '@/data/projects';

export function Blacklist() {
  const sorted = [...blacklistProjects].sort(
    (a, b) => b.blacklistRank - a.blacklistRank
  );

  return (
    <section
      id="blacklist"
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
          The Blacklist
        </h2>
        <p className="mt-3 text-sm text-exhaust">
          Projects ranked from the streets of Rockport. Work your way to #1.
        </p>
        <div className="mt-2 h-1 w-20 bg-rockport" />
      </motion.div>

      {/* Project Cards */}
      <div className="mt-12 flex flex-col gap-6">
        {sorted.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative border-2 border-industrial-light bg-carbon clip-angular glitch-hover"
          >
            {/* Yellow left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-rockport transition-all duration-300 group-hover:w-1.5 group-hover:bg-rockport" />

            <div className="p-6 pl-8 md:p-8 md:pl-10">
              {/* Top row: Rank + Category + Metric */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <span className="font-heading text-4xl font-bold italic text-rockport/20 md:text-5xl">
                    #{String(project.blacklistRank).padStart(2, '0')}
                  </span>

                  <div className="flex flex-col">
                    {project.year && (
                      <span className="text-[10px] uppercase tracking-[0.2em] text-fog">
                        {project.year}
                      </span>
                    )}
                    {project.category && (
                      <span className="mt-1 border border-industrial-light px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-fog">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>

                {project.topMetric && (
                  <div className="border-2 border-industrial-light bg-asphalt/60 px-3 py-1.5 shrink-0">
                    <span className="font-heading text-base font-bold text-rockport">
                      {project.topMetric.value}
                    </span>
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-fog">
                      {project.topMetric.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="mt-2 text-sm text-fog">{project.subtitle}</p>
              )}

              {project.description && (
                <p className="mt-4 text-sm leading-relaxed text-exhaust max-w-3xl">
                  {project.description}
                </p>
              )}

              {/* Tech tags */}
              {project.technologies.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="skew-btn border border-industrial-light bg-asphalt/80 px-3 py-1 text-[10px] font-heading uppercase tracking-[0.15em] text-exhaust transition-colors hover:border-rockport/50 hover:text-rockport"
                    >
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="mt-6 flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider text-exhaust transition-colors hover:text-rockport"
                  >
                    <GithubIcon size={14} />
                    Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wider text-exhaust transition-colors hover:text-rockport"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Police-light hover glow */}
            <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-pursuit-red/3 via-transparent to-pursuit-blue/3" />
          </motion.div>
        ))}
      </div>

      {/* Tire mark divider */}
      <div className="tire-mark mt-16" />
    </section>
  );
}
