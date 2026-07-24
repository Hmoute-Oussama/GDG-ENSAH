'use client';

import { useEffect } from 'react';
import Hero from "@/components/Sections/Hero";
import About from "@/components/Sections/About";
import Events from "@/components/Sections/Events";
import Teams from "@/components/Sections/Teams";
import Projects from "@/components/Sections/Projects";
import Gallery from "@/components/Sections/Gallery";
import Partners from "@/components/Sections/Partners";
import Contact from "@/components/Sections/Contact";
import { scrollToSection } from "@/components/Layout/SmoothScrollProvider";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Wait for Lenis to initialise and sections to render
      const timer = setTimeout(() => scrollToSection(hash), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Events />
      <Teams />
      <Projects />
      <Gallery />
      <Partners />
      <Contact />
    </div>
  );
}
