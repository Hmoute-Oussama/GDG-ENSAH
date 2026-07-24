'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3 glass-panel px-6 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[var(--google-blue)] animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-gray-300">Google Developer Groups ENSAH</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.1]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--google-blue)] to-[#a0c4ff]">
            Innovate.
          </span>{' '}
          <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--google-red)] via-[var(--google-yellow)] to-[var(--google-red)]">
            Build.
          </span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--google-green)] to-[#a8e6b8]">
            Connect.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mb-12 font-light"
        >
          Join a premium community of developers, designers, and innovators. We explore the latest in Google technologies, AI, and Cloud.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 rounded-full bg-foreground text-background font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Discover Events
          </button>
          <Link href="/join" className="px-8 py-4 rounded-full glass-panel font-semibold text-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 flex items-center justify-center gap-2">
            Join the Community
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
