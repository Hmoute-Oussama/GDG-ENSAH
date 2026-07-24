'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 md:p-16 rounded-[40px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--google-blue)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--google-red)] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Let's Build Together</h2>
            <p className="text-gray-400">Have an idea? Want to join the team? Drop us a message.</p>
          </div>

          <form className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[var(--google-blue)] transition-colors text-white placeholder-gray-500"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[var(--google-red)] transition-colors text-white placeholder-gray-500"
              />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[var(--google-yellow)] transition-colors text-white placeholder-gray-500 resize-none"
            />
            <button 
              type="button" 
              className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
