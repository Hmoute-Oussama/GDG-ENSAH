'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, MouseEvent, ReactElement } from 'react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
  colorEnd: string;
  size: string;
  icon: ReactElement;
}

const projects: Project[] = [
  {
    title: "Smart Campus App",
    subtitle: "Mobile Experience",
    description: "A full-featured mobile application for ENSAH students — schedules, campus maps, events, and announcements, all in one place.",
    tech: ["Flutter", "Firebase", "Cloud Functions"],
    color: "#4285F4",
    colorEnd: "#a0c4ff",
    size: "md:col-span-2 md:row-span-2",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "AI Study Assistant",
    subtitle: "Artificial Intelligence",
    description: "An AI-powered study companion that generates quizzes, summarizes lectures, and creates personalized learning plans.",
    tech: ["Next.js", "Gemini API", "TailwindCSS"],
    color: "#EA4335",
    colorEnd: "#ffb4ab",
    size: "md:col-span-1",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: "Eco-Track Web",
    subtitle: "Sustainability",
    description: "A platform to track and reduce carbon footprint on campus with gamified challenges and leaderboards.",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#34A853",
    colorEnd: "#a8e6cf",
    size: "md:col-span-1",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "CyberShield",
    subtitle: "Cybersecurity",
    description: "An open-source vulnerability scanner and security awareness training platform built for educational institutions.",
    tech: ["Python", "FastAPI", "Docker"],
    color: "#FBBC05",
    colorEnd: "#ffe082",
    size: "md:col-span-1",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "GDG Connect",
    subtitle: "Community Platform",
    description: "An internal social network for GDG ENSAH members — event RSVPs, project collaboration, and knowledge sharing.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    color: "#34A853",
    colorEnd: "#a8e6cf",
    size: "md:col-span-1",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  const isFeatured = project.size.includes('col-span-2');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative overflow-hidden rounded-[32px] cursor-pointer group ${project.size}`}
    >
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0c0c0c] rounded-[32px]" />

      {/* Gradient that reveals on hover */}
      <motion.div
        className="absolute inset-0 rounded-[32px] transition-opacity duration-700"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      {/* Animated mesh gradient blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${project.color}40 0%, ${project.colorEnd}10 50%, transparent 70%)`,
          right: isFeatured ? '-5%' : '-20%',
          top: isFeatured ? '20%' : '-20%',
          opacity: isHovered ? 0.8 : 0.2,
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mouse-tracking spotlight */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${project.color}30 0%, transparent 60%)`,
          left: useTransform(springX, (v) => `calc(${(v + 0.5) * 100}% - 150px)`),
          top: useTransform(springY, (v) => `calc(${(v + 0.5) * 100}% - 150px)`),
        }}
      />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-[32px] border border-white/[0.06] group-hover:border-white/[0.15] transition-colors duration-500" />

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-between ${isFeatured ? 'p-10 md:p-14 min-h-[500px]' : 'p-8 md:p-10 min-h-[360px]'}`}>
        
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
            style={{
              backgroundColor: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.icon}
          </div>

          <div className="flex items-center gap-3">
            <span
              className="px-4 py-1.5 rounded-full text-[11px] font-black tracking-[0.15em] uppercase backdrop-blur-md border"
              style={{
                borderColor: `${project.color}30`,
                color: project.color,
                backgroundColor: `${project.color}10`,
              }}
            >
              {project.subtitle}
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500 -rotate-45 group-hover:rotate-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom content */}
        <div>
          <h3
            className={`${isFeatured ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'} font-black text-white tracking-tight leading-[1.1] mb-4`}
          >
            {project.title}
          </h3>

          <AnimatePresence>
            {(isFeatured || isHovered) && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-white/70 text-base leading-relaxed font-light mb-6 max-w-lg"
              >
                {project.description}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}35`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#EA4335] opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4285F4] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
              <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                What We Build
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95]">
              Shipped by<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34A853] via-[#4285F4] to-[#9C27B0]">
                Our Community.
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 font-light max-w-md leading-relaxed">
            Real projects built by real students — solving real problems with Google technologies.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
