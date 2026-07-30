'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Download, ArrowRight, Shield } from 'lucide-react';
import { SkewButton } from '@/components/ui/SkewButton';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 md:px-12">
      {/* Ambient sepia glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-[30rem] w-[30rem] rounded-full bg-rockport/5 blur-[150px]" />
        <div className="absolute -right-20 bottom-20 h-[20rem] w-[20rem] rounded-full bg-pursuit-red/5 blur-[120px]" />
        <div className="absolute right-1/3 top-1/2 h-[15rem] w-[15rem] rounded-full bg-rockport-dark/5 blur-[100px]" />
      </div>

      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col pt-24"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {/* Most Wanted Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="police-glow inline-flex items-center gap-3 border-2 border-rockport/40 bg-carbon clip-angular px-4 py-2">
              <Shield className="h-4 w-4 text-pursuit-red" />
              <span className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-rockport">
                Most Wanted — Active
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-pursuit-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-pursuit-red" />
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1
              id="hero-name"
              className="font-heading text-5xl font-bold uppercase italic leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span className="text-white">Santosh</span>
              <br />
              <span className="text-sepia-gradient">K Kammar</span>
            </h1>
          </motion.div>

          {/* Wanted tagline */}
          <motion.div variants={itemVariants}>
            <p className="mt-6 max-w-2xl font-heading text-base font-medium uppercase tracking-wider text-exhaust md:text-lg">
              <span className="text-pursuit-red">WANTED:</span> Software Engineer
              — Last seen building production-grade backend systems,
              AI-powered solutions, and modern web applications.
            </p>
          </motion.div>

          {/* Stats badges */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            {[
              { value: '7', label: 'Projects' },
              { value: '15+', label: 'Technologies' },
              { value: '2026', label: 'Active Since' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-2 border-industrial-light bg-carbon clip-angular px-4 py-2"
              >
                <span className="font-heading text-xl font-bold text-rockport">
                  {stat.value}
                </span>
                <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-fog">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <SkewButton
              variant="primary"
              href="https://github.com/SKKammar/My-Portfolio/raw/master/public/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Rap Sheet
            </SkewButton>
            <SkewButton variant="outline" href="#blacklist">
              <ArrowRight className="mr-2 h-4 w-4" />
              View The Blacklist
            </SkewButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
