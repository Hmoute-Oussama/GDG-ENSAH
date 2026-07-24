'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

interface Member {
  name: string;
  role: string;
  department: string;
  initials: string;
  color: string;
  image?: string;
}

const members: Member[] = [
  { name: "Meriem Jamili", role: "Founder & Team Leader", department: "Executive Office", initials: "MJ", color: "#4285F4" },
  { name: "Marwa El Faiz", role: "Vice Team Leader", department: "Executive Office", initials: "ME", color: "#EA4335" },
  { name: "Oumayma Errouas", role: "General Secretary", department: "Executive Office", initials: "OE", color: "#FBBC05" },
  { name: "Marouane Bouderz", role: "Treasurer", department: "Finance", initials: "MB", color: "#34A853" },
  { name: "Kaoutar El Ayadi", role: "Sponsorship Manager", department: "Partnerships", initials: "KE", color: "#4285F4" },
  { name: "Oussama Hmoute", role: "External Relations Manager", department: "Partnerships", initials: "OH", color: "#EA4335" },
  { name: "Abdelkader Ennia", role: "Community Manager", department: "Community", initials: "AE", color: "#34A853" },
  { name: "Karim Erradi", role: "Human Resources", department: "People", initials: "KE", color: "#34A853" },
  { name: "Youssef Samri", role: "Event Manager", department: "Events", initials: "YS", color: "#9C27B0" },
  { name: "Meriem Kourad", role: "Media Manager", department: "Marketing", initials: "MK", color: "#34A853" },
  { name: "Mohammed Addi", role: "Graphic Designer", department: "Marketing", initials: "MA", color: "#4285F4" },
];

function MemberCard({ member, index, featured = false }: { member: Member; index: number; featured?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`relative overflow-hidden rounded-[28px] cursor-pointer group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-[28px] transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.06]" />

      {/* Accent glow on hover */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: member.color }}
      />

      {/* Mouse-tracking spotlight */}
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${member.color}22 0%, transparent 70%)`,
          left: useTransform(springX, (v) => `calc(${(v + 0.5) * 100}% - 125px)`),
          top: useTransform(springY, (v) => `calc(${(v + 0.5) * 100}% - 125px)`),
        }}
      />

      {/* Content */}
      <div className={`relative z-10 ${featured ? 'p-10 md:p-14' : 'p-8'} flex flex-col items-center text-center h-full justify-center gap-6`}>
        
        {/* Avatar */}
        <div className="relative">
          {/* Animated ring */}
          <motion.div
            className="absolute -inset-1.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
            style={{ border: `2px solid ${member.color}` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
            style={{ border: `1px dashed ${member.color}` }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Profile image placeholder — replace src with real photos */}
          <div
            className={`${featured ? 'w-28 h-28 text-3xl' : 'w-20 h-20 text-xl'} rounded-full flex items-center justify-center font-black tracking-tight relative overflow-hidden transition-transform duration-500 group-hover:scale-110`}
            style={{
              backgroundColor: `${member.color}18`,
              color: member.color,
              border: `2px solid ${member.color}40`,
            }}
          >
            {member.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              member.initials
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <h3 className={`${featured ? 'text-3xl' : 'text-xl'} font-bold text-white tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300`} style={{ backgroundImage: `linear-gradient(90deg, #fff, ${member.color})` }}>
            {member.name}
          </h3>
          <p className="text-base font-medium mb-3 transition-colors duration-300" style={{ color: member.color }}>
            {member.role}
          </p>
          <span className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase border transition-all duration-300" style={{ borderColor: `${member.color}30`, color: `${member.color}aa`, backgroundColor: `${member.color}08` }}>
            {member.department}
          </span>
        </div>

        {featured && (
          <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm mt-2">
            Leading GDG On Campus ENSAH with a vision to build the most vibrant developer community in the region.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Teams() {
  const founder = members[0];
  const rest = members.slice(1);

  return (
    <section id="teams" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4285F4] opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#34A853] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />

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
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#4285F4] to-[#EA4335] rounded-full" />
            <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Our People
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95]">
            The Minds<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#34A853]">
              Behind It All.
            </span>
          </h2>
        </motion.div>

        {/* Leadership — Founder featured */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6" style={{ perspective: '1200px' }}>
          <MemberCard member={founder} index={0} featured />
          <MemberCard member={members[1]} index={1} />
          <MemberCard member={members[2]} index={2} />
          <MemberCard member={members[3]} index={3} />
        </div>

        {/* Rest of team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
          {rest.slice(3).map((member, i) => (
            <MemberCard key={member.name + member.role} member={member} index={i + 4} />
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
              Want to be part of the team?
            </h3>
            <p className="text-gray-400 text-lg font-light">
              We're always looking for passionate people to join GDG ENSAH.
            </p>
          </div>
          <button className="relative group overflow-hidden rounded-full p-[1px] shrink-0">
            <span className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="relative px-10 py-4 bg-black rounded-full transition-all duration-300 group-hover:bg-black/50">
              <span className="font-bold text-base tracking-wide text-white">
                Apply Now
              </span>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
