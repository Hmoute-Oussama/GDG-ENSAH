'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect, ReactNode } from 'react';
import ApplyModal from '@/components/Forms/ApplyModal';

interface Member {
  name: string;
  role: string;
  department: string;
  initials: string;
  color: string;
  image?: string;
}

const members: Member[] = [
  { name: "Meriem Jamili",    role: "Founder & Team Leader",      department: "Executive",    initials: "MJ", color: "#4285F4", image: "/members/meriem_jamili.png" },
  { name: "Marwa El Faiz",    role: "Vice Team Leader",           department: "Executive",    initials: "ME", color: "#EA4335" },
  { name: "Oumayma Errouas", role: "General Secretary",          department: "Executive",    initials: "OE", color: "#FBBC05" },
  { name: "Marouane Bouderz", role: "Treasurer",                  department: "Finance",      initials: "MB", color: "#34A853" },
  { name: "Kaoutar El Ayadi", role: "Sponsorship Manager",        department: "Partnerships", initials: "KE", color: "#4285F4" },
  { name: "Oussama Hmoute",  role: "External Relations",         department: "Partnerships", initials: "OH", color: "#EA4335", image: "/members/oussama_hmoute.jpg" },
  { name: "Abdelkader Ennia", role: "Community Manager",          department: "Community",    initials: "AE", color: "#34A853" },
  { name: "Karim Erradi",    role: "Human Resources",            department: "People",       initials: "KE", color: "#FBBC05", image: "/members/karim_erradi.jpg" },
  { name: "Youssef Samri",   role: "Event Manager",              department: "Events",       initials: "YS", color: "#EA4335", image: "/members/youssef_samri.jpg" },
  { name: "Meriem Kourad",   role: "Media Manager",              department: "Marketing",    initials: "MK", color: "#34A853", image: "/members/meriem_kourad.jpg" },
  { name: "Mohammed Addi",   role: "Graphic Designer",           department: "Marketing",    initials: "MA", color: "#4285F4" },
];

const SIZES = [180, 145, 145, 130, 130, 130, 118, 118, 118, 118, 118];
const CANVAS_H = 820;

interface Physics {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

function scatter(w: number, h: number): Physics[] {
  // place bubbles in a loose grid so they don't all start overlapping
  const cols = 4;
  return members.map((_, i) => {
    const r = SIZES[i] / 2;
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = w / cols;
    const cellH = h / Math.ceil(members.length / cols);
    return {
      x: cellW * col + cellW / 2 + (Math.random() - 0.5) * 40,
      y: cellH * row + cellH / 2 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r,
    };
  });
}

/* ── Tooltip ─────────────────────────────────────────────────────── */
function Tooltip({ member, size, visible }: { member: Member; size: number; visible: boolean }) {
  return (
    <div
      className="absolute left-1/2 z-50 pointer-events-none"
      style={{
        bottom: size / 2 + 16,
        transform: 'translateX(-50%)',
        opacity: visible ? 1 : 0,
        translate: visible ? '0 0' : '0 8px',
        scale: visible ? '1' : '0.93',
        transition: 'opacity 0.22s ease, translate 0.22s ease, scale 0.22s ease',
      }}
    >
      <div
        className="px-4 py-3 rounded-2xl text-center"
        style={{
          background: 'rgba(5,5,10,0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: `1px solid ${member.color}45`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px ${member.color}18`,
          minWidth: 140,
        }}
      >
        <p className="text-white font-bold text-sm leading-tight mb-0.5 whitespace-nowrap">{member.name}</p>
        <p className="font-semibold text-[11px] leading-snug mb-2 whitespace-nowrap" style={{ color: member.color }}>{member.role}</p>
        <span
          className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase"
          style={{ background: `${member.color}18`, color: `${member.color}cc`, border: `1px solid ${member.color}28` }}
        >
          {member.department}
        </span>
      </div>
      <div className="flex justify-center -mt-[1px]">
        <div
          className="w-2.5 h-2.5 rotate-45"
          style={{ background: 'rgba(5,5,10,0.92)', border: `1px solid ${member.color}45`, borderTop: 'none', borderLeft: 'none' }}
        />
      </div>
    </div>
  );
}

/* ── Single bubble — rendered once, moved via DOM ref ─────────────── */
function Bubble({ member, size, isFounder, nodeRef }: {
  member: Member;
  size: number;
  isFounder: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const fontSize = isFounder ? 36 : size <= 118 ? 20 : 26;

  return (
    <div
      ref={nodeRef}
      className="absolute"
      style={{ width: size, height: size, willChange: 'transform', top: 0, left: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow halo */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${member.color}55 0%, transparent 68%)`,
          opacity: hovered ? 0.7 : 0.18,
          transform: hovered ? 'scale(1.3)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      />

      {/* Spinning orbit ring 1 */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -5,
          border: `1.5px solid ${member.color}70`,
          opacity: isFounder ? 0.7 : hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          animation: `spin-cw ${isFounder ? 9 : 13}s linear infinite`,
        }}
      />
      {/* Spinning orbit ring 2 */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -12,
          border: `1px dashed ${member.color}35`,
          opacity: isFounder ? 0.4 : hovered ? 0.55 : 0,
          transition: 'opacity 0.3s ease',
          animation: `spin-ccw ${isFounder ? 16 : 22}s linear infinite`,
        }}
      />

      {/* Bubble sphere */}
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
        style={{
          background: `radial-gradient(circle at 33% 30%, ${member.color}60 0%, ${member.color}1a 55%, ${member.color}08 100%)`,
          border: `${isFounder ? 2 : 1.5}px solid ${member.color}${hovered ? 'bb' : '45'}`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: hovered
            ? `0 0 ${isFounder ? 48 : 30}px ${member.color}45, inset 0 0 24px ${member.color}12`
            : `0 0 ${isFounder ? 22 : 12}px ${member.color}18, inset 0 0 12px ${member.color}06`,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Gloss — only show on top of initials, hidden when image covers the bubble */}
        {!member.image && (
          <div
            className="absolute pointer-events-none"
            style={{
              top: '8%', left: '14%',
              width: '42%', height: '32%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.65) 0%, transparent 70%)',
              opacity: 0.28,
            }}
          />
        )}
        {/* Photo or initials */}
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        ) : (
          <span
            className="relative z-10 font-black select-none"
            style={{
              fontSize,
              color: member.color,
              textShadow: `0 0 14px ${member.color}90`,
            }}
          >
            {member.initials}
          </span>
        )}
      </div>

      {/* Tooltip */}
      <Tooltip member={member} size={size} visible={hovered} />
    </div>
  );
}

/* ── Canvas — physics runs in RAF, positions written via transform ── */
function BubbleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const domRefs = useRef<(HTMLDivElement | null)[]>([]);
  const physics = useRef<Physics[]>([]);
  const dims = useRef({ w: 900, h: CANVAS_H });
  const rafId = useRef<number | null>(null);
  const initialized = useRef(false);

  const setDomRef = (i: number) => (el: HTMLDivElement | null) => {
    domRefs.current[i] = el;
  };

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      dims.current = { w: width || 900, h: CANVAS_H };
    }

    measure();

    if (!initialized.current) {
      physics.current = scatter(dims.current.w, dims.current.h);
      // Set initial transform on each node
      physics.current.forEach((b, i) => {
        const el = domRefs.current[i];
        if (el) el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
      });
      initialized.current = true;
    }

    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    function tick() {
      const bs = physics.current;
      const { w, h } = dims.current;
      if (!bs.length) { rafId.current = requestAnimationFrame(tick); return; }

      for (let i = 0; i < bs.length; i++) {
        const b = bs[i];
        b.x += b.vx;
        b.y += b.vy;

        // Wall bounce
        if (b.x - b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx); }
        if (b.x + b.r > w)  { b.x = w - b.r;  b.vx = -Math.abs(b.vx); }
        if (b.y - b.r < 0)  { b.y = b.r;      b.vy =  Math.abs(b.vy); }
        if (b.y + b.r > h)  { b.y = h - b.r;  b.vy = -Math.abs(b.vy); }

        // Bubble-bubble elastic collision
        for (let j = i + 1; j < bs.length; j++) {
          const o = bs[j];
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const distSq = dx * dx + dy * dy;
          const minD = b.r + o.r + 4;
          if (distSq < minD * minD && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = (minD - dist) / 2;
            b.x -= nx * overlap;
            b.y -= ny * overlap;
            o.x += nx * overlap;
            o.y += ny * overlap;
            const dot = (b.vx - o.vx) * nx + (b.vy - o.vy) * ny;
            if (dot > 0) {
              b.vx -= dot * nx;
              b.vy -= dot * ny;
              o.vx += dot * nx;
              o.vy += dot * ny;
            }
          }
        }

        // Write directly to DOM — no React re-render
        const el = domRefs.current[i];
        if (el) el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: CANVAS_H }}>
      {members.map((member, i) => (
        <Bubble
          key={member.name}
          member={member}
          size={SIZES[i]}
          isFounder={i === 0}
          nodeRef={setDomRef(i)}
        />
      ))}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────── */
export default function Teams() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="teams" className="relative py-32 px-6 overflow-hidden">
      {/* CSS keyframes for orbit rings — injected once */}
      <style>{`
        @keyframes spin-cw  { to { transform: rotate(360deg);  } }
        @keyframes spin-ccw { to { transform: rotate(-360deg); } }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: '#4285F4', opacity: 0.04 }} />
      <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: '#34A853', opacity: 0.04 }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] rounded-full blur-[130px] pointer-events-none" style={{ background: '#EA4335', opacity: 0.025 }} />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c, i) => (
              <motion.div
                key={c}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: c }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
              />
            ))}
            <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Our People</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]">
            The Minds<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#34A853]">
              Behind It All.
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-base">Hover over a bubble to discover who&apos;s behind GDG ENSAH.</p>
        </motion.div>

        {/* Bubble canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-[32px] overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.015)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <BubbleField />
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mt-8 rounded-[28px] overflow-hidden"
        >
          <div
            className="absolute inset-0 rounded-[28px]"
            style={{
              background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                Want to be part of the team?
              </h3>
              <p className="text-gray-400 text-lg font-light">
                We&apos;re always looking for passionate people to join GDG ENSAH.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative group overflow-hidden rounded-full p-[1px] shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative px-10 py-4 bg-black rounded-full transition-all duration-300 group-hover:bg-black/50">
                <span className="font-bold text-base tracking-wide text-white">Apply Now</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
