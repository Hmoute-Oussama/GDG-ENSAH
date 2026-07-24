'use client';

import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

const inputClassName =
  'w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-colors text-white placeholder-gray-500';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = <K extends keyof ContactFormData>(field: K, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    setSubmitError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(result.message || 'Unable to send your message. Please try again.');
        return;
      }

      setIsSuccess(true);
      setFormData(initialFormData);
      setErrors({});
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Let&apos;s Build Together</h2>
            <p className="text-gray-400">Have an idea? Want to join the team? Drop us a message.</p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 text-center py-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--google-green)]/20 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--google-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
              <p className="text-gray-400 mb-8">Thanks for reaching out. We&apos;ll get back to you soon.</p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-8 py-3 rounded-2xl glass-panel font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name *"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={`${inputClassName} focus:border-[var(--google-blue)] ${errors.name ? 'border-[var(--google-red)]' : ''}`}
                  />
                  {errors.name && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`${inputClassName} focus:border-[var(--google-red)] ${errors.email ? 'border-[var(--google-red)]' : ''}`}
                  />
                  {errors.email && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.email}</p>}
                </div>
              </div>

              <div>
                <textarea
                  placeholder="Your Message *"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`${inputClassName} focus:border-[var(--google-yellow)] resize-none ${errors.message ? 'border-[var(--google-red)]' : ''}`}
                />
                {errors.message && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.message}</p>}
              </div>

              {submitError && (
                <div className="p-4 rounded-2xl bg-[var(--google-red)]/10 border border-[var(--google-red)]/30 text-[var(--google-red)] text-sm text-center">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
