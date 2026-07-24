'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Teams', href: '#teams' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: 'X / Twitter',
      href: 'https://x.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative z-10 overflow-hidden">
      {/* Big CTA Section */}
      <div className="relative pt-32 pb-24 px-6">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#4285F4] to-transparent opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-5xl text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter text-white leading-[0.95] mb-8">
            Ready to Build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]">
              the Future?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Join GDG On Campus ENSAH and be part of a community that turns ideas into impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/join" className="relative group overflow-hidden rounded-full p-[2px]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative px-10 py-4 bg-black rounded-full transition-all duration-300 group-hover:bg-transparent">
                <span className="font-bold text-lg tracking-wide text-white">
                  Join the Community
                </span>
              </div>
            </Link>
            <Link href="#events" className="px-10 py-4 rounded-full border border-white/20 hover:border-white/50 text-white font-bold text-lg transition-all duration-300 hover:bg-white/5">
              Explore Events
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Grid */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Brand Column */}
            <div className="md:col-span-5">
              <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <motion.div
                    className="absolute w-3.5 h-3.5 rounded-full bg-[#4285F4] opacity-80 mix-blend-screen"
                    animate={{ x: [-3, 3, -3], y: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute w-3.5 h-3.5 rounded-full bg-[#EA4335] opacity-80 mix-blend-screen"
                    animate={{ x: [3, -3, 3], y: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute w-3.5 h-3.5 rounded-full bg-[#FBBC05] opacity-80 mix-blend-screen"
                    animate={{ x: [-3, 3, -3], y: [3, -3, 3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.div
                    className="absolute w-3.5 h-3.5 rounded-full bg-[#34A853] opacity-80 mix-blend-screen"
                    animate={{ x: [3, -3, 3], y: [3, -3, 3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  />
                </div>
                <span className="font-extrabold text-xl tracking-tighter text-white">
                  GDG<span className="font-light opacity-60 ml-1">ENSAH</span>
                </span>
              </Link>
              <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-8">
                Google Developer Groups On Campus ENSAH — empowering the next generation of developers through community, workshops, and cutting-edge technology.
              </p>

              {/* Socials */}
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            <div className="md:col-span-2">
              <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">Explore</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-white group-hover:w-3 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">Resources</h4>
              <ul className="space-y-4">
                {['Google DevLibrary', 'Android Developers', 'Google Cloud', 'TensorFlow', 'Flutter Dev'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-white group-hover:w-3 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3">
              <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-6">Stay Updated</h4>
              <p className="text-gray-400 text-sm font-light mb-4 leading-relaxed">
                Subscribe to our newsletter for event updates and the latest in tech.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-5 py-3 text-sm outline-none focus:border-[#4285F4] text-white placeholder-gray-500 transition-colors duration-300"
                />
                <button className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors duration-300 tracking-wide">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} Google Developer Groups On Campus ENSAH. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Developed by <span className="text-white font-semibold">Oussama Hmoute</span></span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[#EA4335] mx-0.5"
              >
                ♥
              </motion.span>
              <span>by GDG ENSAH</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
