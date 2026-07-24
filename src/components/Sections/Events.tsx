'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, MouseEvent } from 'react';

function EventCard({ event, index }: { event: typeof events[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(spotlightY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(spotlightX, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative overflow-hidden rounded-[32px] cursor-pointer group ${event.size}`}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: event.bg }}
      />

      {/* Mouse-tracking spotlight */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
          left: useTransform(spotlightX, (v) => `calc(${(v + 0.5) * 100}% - 150px)`),
          top: useTransform(spotlightY, (v) => `calc(${(v + 0.5) * 100}% - 150px)`),
        }}
      />

      {/* Decorative floating shapes */}
      <motion.div
        className="absolute w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: event.accent, top: '-10%', right: '-5%', opacity: 0.4 }}
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: event.accent, bottom: '10%', left: '5%', opacity: 0.2 }}
        animate={{ y: [0, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[320px]">
        <div className="flex justify-between items-start">
          <div
            className="px-5 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase backdrop-blur-md border border-white/20"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff' }}
          >
            {event.type}
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center bg-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 -rotate-45">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        <div className="mt-auto">
          {event.featured && (
            <motion.div
              className="text-[120px] md:text-[160px] font-black text-white/[0.06] leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              {event.bigNumber}
            </motion.div>
          )}
          <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-2">
            {event.date}
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
            {event.title}
          </h3>
          {event.description && (
            <p className="text-white/70 text-base mt-4 max-w-md leading-relaxed font-light">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const events = [
  {
    title: "Google I/O Extended",
    date: "June 15, 2026",
    type: "Conference",
    color: "#4285F4",
    bg: "linear-gradient(135deg, #1a237e 0%, #1565c0 40%, #42a5f5 100%)",
    accent: "#42a5f5",
    size: "md:col-span-2 md:row-span-2",
    featured: true,
    bigNumber: "I/O",
    description: "The biggest Google developer event of the year, live-streamed and extended to ENSAH. Keynotes, codelabs, and community sessions."
  },
  {
    title: "DevFest ENSAH",
    date: "December 10, 2026",
    type: "Festival",
    color: "#34A853",
    bg: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #66bb6a 100%)",
    accent: "#66bb6a",
    size: "md:col-span-1",
    featured: false,
    bigNumber: "",
    description: ""
  },
  {
    title: "Cloud Study Jam",
    date: "October 22, 2026",
    type: "Workshop",
    color: "#FBBC05",
    bg: "linear-gradient(135deg, #e65100 0%, #f57c00 50%, #ffb74d 100%)",
    accent: "#ffb74d",
    size: "md:col-span-1",
    featured: false,
    bigNumber: "",
    description: ""
  },
  {
    title: "AI Hackathon",
    date: "November 5, 2026",
    type: "Hackathon",
    color: "#EA4335",
    bg: "linear-gradient(135deg, #b71c1c 0%, #e53935 50%, #ef9a9a 100%)",
    accent: "#ef9a9a",
    size: "md:col-span-2",
    featured: false,
    bigNumber: "",
    description: "48 hours. Teams of 4. Build an AI-powered solution to a real-world challenge and pitch it to a panel of industry experts."
  },
];

export default function Events() {
  return (
    <section id="events" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#4285F4] opacity-[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#EA4335] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#4285F4] animate-pulse" />
              <span className="w-3 h-3 rounded-full bg-[#EA4335] animate-pulse [animation-delay:0.2s]" />
              <span className="w-3 h-3 rounded-full bg-[#FBBC05] animate-pulse [animation-delay:0.4s]" />
              <span className="w-3 h-3 rounded-full bg-[#34A853] animate-pulse [animation-delay:0.6s]" />
            </div>
            <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Upcoming Events
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95]">
            Experiences<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
              Worth Building.
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: "12+", label: "Events / Year", color: "#4285F4" },
            { number: "500+", label: "Attendees", color: "#EA4335" },
            { number: "30+", label: "Speakers", color: "#FBBC05" },
            { number: "8+", label: "Workshops", color: "#34A853" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 text-center group hover:border-white/20 transition-colors duration-300"
            >
              <p className="text-4xl md:text-5xl font-black tracking-tighter transition-colors duration-300" style={{ color: stat.color }}>
                {stat.number}
              </p>
              <p className="text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
