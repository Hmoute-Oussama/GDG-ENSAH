'use client';

import { motion } from 'framer-motion';

export default function Partners() {
  const partners = [
    { name: "Google", color: "var(--google-blue)" },
    { name: "GDG", color: "var(--google-red)" },
    { name: "Sponsors", color: "var(--google-yellow)" },
    { name: "University", color: "var(--google-green)" },
  ];

  return (
    <section id="partners" className="relative py-24 px-6 border-y border-[rgba(255,255,255,0.05)] bg-black/20">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-widest uppercase font-semibold text-gray-500">Trusted By Our Partners</span>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              className="flex items-center justify-center cursor-pointer transition-opacity duration-300"
            >
              <h3 className="text-3xl font-extrabold tracking-tighter" style={{ color: partner.color }}>
                {partner.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
