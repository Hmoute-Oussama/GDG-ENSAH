'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { scrollToSection } from './SmoothScrollProvider';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 50], [20, 0]);
  const headerWidth = useTransform(scrollY, [0, 50], ["90%", "100%"]);
  const headerBorderRadius = useTransform(scrollY, [0, 50], ["32px", "0px"]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (pathname === '/') {
      scrollToSection(id);
    } else {
      // Navigate home and let the home page pick up the hash
      router.push(`/#${id}`);
    }
  };

  const navLinks = [
    { name: 'About', id: 'about', color: 'var(--google-blue)' },
    { name: 'Events', id: 'events', color: 'var(--google-red)' },
    { name: 'Teams', id: 'teams', color: 'var(--google-yellow)' },
    { name: 'Projects', id: 'projects', color: 'var(--google-green)' },
    { name: 'Gallery', id: 'gallery', color: 'var(--google-blue)' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.header
        style={{ y: headerY, width: headerWidth, borderRadius: headerBorderRadius }}
        className={`pointer-events-auto transition-colors duration-500 overflow-hidden ${
          scrolled 
            ? 'glass-panel !border-x-0 !border-t-0 shadow-lg bg-black/40' 
            : 'glass-panel border-white/10 shadow-2xl bg-black/20 backdrop-blur-xl'
        }`}
      >
        <div className="px-6 md:px-10 h-20 flex items-center justify-between w-full max-w-7xl mx-auto">
          
          {/* Stunning Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div 
                className="absolute w-4 h-4 rounded-full bg-[var(--google-blue)] opacity-80 mix-blend-screen"
                animate={{ x: [-4, 4, -4], y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute w-4 h-4 rounded-full bg-[var(--google-red)] opacity-80 mix-blend-screen"
                animate={{ x: [4, -4, 4], y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div 
                className="absolute w-4 h-4 rounded-full bg-[var(--google-yellow)] opacity-80 mix-blend-screen"
                animate={{ x: [-4, 4, -4], y: [4, -4, 4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute w-4 h-4 rounded-full bg-[var(--google-green)] opacity-80 mix-blend-screen"
                animate={{ x: [4, -4, 4], y: [4, -4, 4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-all duration-300">
              GDG<span className="font-light opacity-70 ml-1 group-hover:opacity-100 transition-opacity">ENSAH</span>
            </span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.id)}
                className="relative text-sm font-semibold text-gray-300 hover:text-white transition-colors group py-2 cursor-pointer"
              >
                {link.name}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: link.color }}
                />
              </button>
            ))}
          </nav>
          
          {/* Glowing CTA Button */}
          <Link href="/join" className="hidden md:flex relative group overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-0 bg-gradient-to-r from-[var(--google-blue)] via-[var(--google-red)] to-[var(--google-yellow)] rounded-full opacity-70 group-hover:opacity-100 group-hover:animate-spin-slow transition-opacity duration-500 blur-sm" />
            <div className="relative px-6 py-2.5 bg-black rounded-full transition-all duration-300 group-hover:bg-black/50">
              <span className="font-bold text-sm tracking-wide text-white">
                Join Us
              </span>
            </div>
          </Link>

        </div>
      </motion.header>
    </div>
  );
}

