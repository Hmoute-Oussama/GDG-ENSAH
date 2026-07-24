'use client';

import { motion } from 'framer-motion';

export default function Gallery() {
  // We'll use colored blocks as placeholders for the gallery images
  const images = [
    { id: 1, color: "var(--google-blue)" },
    { id: 2, color: "var(--google-red)" },
    { id: 3, color: "var(--google-yellow)" },
    { id: 4, color: "var(--google-green)" },
    { id: 5, color: "var(--google-blue)" },
    { id: 6, color: "var(--google-red)" },
  ];

  return (
    <section id="gallery" className="relative py-32 px-6">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Life at GDG</h2>
          <p className="text-xl text-gray-400 font-light">
            Moments captured from our hackathons, workshops, and meetups.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square rounded-2xl overflow-hidden glass-panel cursor-pointer group"
            >
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                style={{ backgroundColor: img.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                <span className="text-white font-medium tracking-wider uppercase text-sm">View</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
