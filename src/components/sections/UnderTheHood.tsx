'use client';

import { motion } from 'framer-motion';

const skillGroups = [
  {
    label: 'Engine',
    subtitle: 'Languages',
    color: '#e5c158',
    items: [
      { name: 'Java', context: 'Production backends & Spring Boot' },
      { name: 'Python', context: 'ML pipelines, FastAPI, CV scripts' },
      { name: 'TypeScript', context: 'Type-safe React & Next.js' },
      { name: 'SQL', context: 'Relational schema design & optimization' },
    ],
  },
  {
    label: 'Transmission',
    subtitle: 'Backend',
    color: '#d4a017',
    items: [
      { name: 'Spring Boot', context: 'REST APIs, JWT auth, RBAC' },
      { name: 'FastAPI', context: 'High-performance ML & API serving' },
      { name: 'Next.js API Routes', context: 'Serverless edge functions' },
    ],
  },
  {
    label: 'Chassis',
    subtitle: 'Frontend',
    color: '#c4a35a',
    items: [
      { name: 'Next.js 15', context: 'App Router & SSR' },
      { name: 'React', context: 'Component architecture' },
      { name: 'Tailwind CSS', context: 'Utility-first styling' },
    ],
  },
  {
    label: 'Fuel System',
    subtitle: 'Database',
    color: '#c0392b',
    items: [
      { name: 'MySQL', context: 'ACID transactions' },
      { name: 'PostgreSQL', context: 'Advanced queries & RLS' },
      { name: 'Supabase', context: 'BaaS, Auth & Realtime' },
      { name: 'pgvector', context: 'Vector similarity search' },
    ],
  },
  {
    label: 'Turbo',
    subtitle: 'AI / ML',
    color: '#b8972e',
    items: [
      { name: 'PyTorch', context: 'Deep learning & CV research' },
      { name: 'scikit-learn', context: 'Classical ML models' },
      { name: 'Pandas', context: 'Data wrangling & EDA' },
      { name: 'ArcFace / ONNX', context: 'Biometric embedding & inference' },
    ],
  },
  {
    label: 'Garage',
    subtitle: 'Tools',
    color: '#8c8c8c',
    items: [
      { name: 'Git', context: 'Version control' },
      { name: 'Docker', context: 'Containerization' },
      { name: 'GitHub Actions', context: 'CI/CD automation' },
      { name: 'Gemini API', context: 'AI generation & code review' },
    ],
  },
];

export function UnderTheHood() {
  return (
    <section
      id="under-the-hood"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-12"
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl font-bold uppercase italic tracking-wider text-rockport md:text-4xl">
          Under The Hood
        </h2>
        <p className="mt-3 text-sm text-exhaust">
          Performance tuning — the technologies and tools powering the machine.
        </p>
        <div className="mt-2 h-1 w-20 bg-rockport" />
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative border-2 border-industrial-light bg-carbon p-6 clip-angular glitch-hover"
            style={{
              borderLeftColor: group.color,
              borderLeftWidth: '4px',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.05] pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${group.color}, transparent 80%)`,
              }}
            />

            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3">
                <h3
                  className="font-heading text-xl font-bold uppercase tracking-wider"
                  style={{ color: group.color }}
                >
                  {group.label}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-fog">
                  {group.subtitle}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <span className="text-sm font-semibold text-sepia">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-fog">{item.context}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="tire-mark mt-16" />
    </section>
  );
}
