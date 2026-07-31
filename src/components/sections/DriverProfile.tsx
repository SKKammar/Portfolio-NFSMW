'use client';

import { motion } from 'framer-motion';

export function DriverProfile() {
  return (
    <section
      id="driver-profile"
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
          Driver Profile
        </h2>
        <div className="mt-2 h-1 w-20 bg-rockport" />
      </motion.div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="font-heading text-2xl font-medium uppercase leading-relaxed tracking-wide text-white md:text-3xl">
            A Computer Science student focused on building production-ready
            software that combines thoughtful engineering, clean architecture,
            and modern user experiences.
          </p>

          <ul className="mt-8 space-y-4 max-w-2xl text-sm leading-relaxed text-exhaust">
            {[
              { tag: 'Status', value: 'Final Year CS Student' },
              { tag: 'Specialty', value: 'Java, Python, TypeScript, Next.js' },
              { tag: 'Objective', value: 'Backend and Full-Stack Engineering roles' },
            ].map((item) => (
              <li key={item.tag} className="flex gap-3 items-start">
                <span className="mt-1 h-2 w-2 shrink-0 bg-rockport rotate-45" />
                <span>
                  <strong className="text-rockport font-heading uppercase tracking-wider">
                    {item.tag}:
                  </strong>{' '}
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Case File Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="grunge-border border-2 border-industrial-light bg-gritty p-8 clip-angular">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 bg-pursuit-red" />
              <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-fog">
                Case File
              </span>
            </div>

            <div className="space-y-8">
              {[
                {
                  label: 'Racing History',
                  title: 'Bachelor of Engineering in Computer Science',
                  detail: 'Final Year Student',
                },
                {
                  label: 'Specialization',
                  title: 'Backend Engineering, Full Stack Development',
                  detail: 'Artificial Intelligence Applications',
                },
                {
                  label: 'Current Objective',
                  title: 'Building industry-level projects',
                  detail: 'Preparing for software engineering roles',
                },
              ].map((section) => (
                <div key={section.label}>
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-rockport-dim">
                    {section.label}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold uppercase tracking-wide text-white">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-xs text-exhaust">{section.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tire mark divider */}
      <div className="tire-mark mt-16" />
    </section>
  );
}
