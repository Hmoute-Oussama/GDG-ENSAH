'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const features = [
    { 
      title: "Our Mission", 
      desc: "Empowering developers through hands-on technical skills and cutting-edge Google technologies.", 
      gradient: "from-[#1a73e8] to-[#4285F4]",
      shadow: "shadow-[0_0_40px_rgba(66,133,244,0.4)]",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: "Our Vision", 
      desc: "Fostering a highly connected, thriving tech ecosystem of innovators inside ENSAH and beyond.", 
      gradient: "from-[#ea4335] to-[#f46c60]",
      shadow: "shadow-[0_0_40px_rgba(234,67,53,0.4)]",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: "Community", 
      desc: "Providing an inclusive space for students to learn, build, and connect together safely.", 
      gradient: "from-[#fbbc05] to-[#fce28b]",
      shadow: "shadow-[0_0_40px_rgba(251,188,5,0.4)]",
      icon: (
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
  ];

  return (
    <section id="about" className="relative pt-32 pb-48 px-6" ref={containerRef}>
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row gap-16 lg:gap-8">
        
        {/* Sticky Left Column */}
        <div className="lg:w-1/2 lg:sticky lg:top-40 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-16 h-1 bg-white/20 rounded-full" />
              <span className="text-xl font-medium tracking-widest text-white/50 uppercase">
                About Us
              </span>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-black mb-8 tracking-tighter leading-[1.1] text-white">
              We Don't Just Code. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--google-blue)] via-[var(--google-red)] to-[var(--google-yellow)]">
                We Create.
              </span>
            </h2>
            
            <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-xl">
              GDG ENSAH is a premier student-led tech community. We bridge the gap between theory and real-world innovation, pushing the boundaries of what's possible on campus.
            </p>
          </motion.div>
        </div>

        {/* Scrolling Right Column - Vibrant Cards */}
        <div className="lg:w-1/2 flex flex-col gap-12 mt-12 lg:mt-0 pt-20">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className={`relative overflow-hidden rounded-[40px] p-12 bg-gradient-to-br ${feature.gradient} ${feature.shadow} transition-all duration-500`}
            >
              {/* Decorative background circle */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black opacity-20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-xl">
                  {feature.icon}
                </div>
                
                <h3 className="text-4xl font-extrabold mb-4 text-white tracking-tight">
                  {feature.title}
                </h3>
                
                <p className="text-white/90 text-xl font-medium leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

