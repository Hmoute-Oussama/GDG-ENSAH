'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FormEvent, useState, useEffect } from 'react';

interface ApplyFormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  motivation: string;
}

interface ApplyFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  experience?: string;
  motivation?: string;
}

const initialFormData: ApplyFormData = {
  fullName: '',
  email: '',
  phone: '',
  role: '',
  experience: '',
  motivation: '',
};

const roles = [
  'Team Leader',
  'Vice Team Leader',
  'General Secretary',
  'Treasurer',
  'Sponsorship Manager',
  'External Relations Manager',
  'Community Manager',
  'Human Resources',
  'Event Manager',
  'Media Manager',
  'Graphic Designer',
  'Web Developer',
  'Other',
];

const inputClassName =
  'w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 outline-none transition-colors text-white placeholder-gray-500 text-sm';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ isOpen, onClose }: ApplyModalProps) {
  const [formData, setFormData] = useState<ApplyFormData>(initialFormData);
  const [errors, setErrors] = useState<ApplyFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const updateField = <K extends keyof ApplyFormData>(field: K, value: string) => {
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

  const handleClose = () => {
    onClose();
    // Reset after animation finishes
    setTimeout(() => {
      setFormData(initialFormData);
      setErrors({});
      setSubmitError('');
      setIsSuccess(false);
    }, 300);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        setSubmitError(result.message || 'Unable to submit your application. Please try again.');
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-[32px] p-8 md:p-12 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient glows */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--google-blue)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--google-yellow)] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

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
                  <h3 className="text-2xl font-bold mb-3">Application Submitted!</h3>
                  <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                    Thanks for applying to join the GDG ENSAH team. We&apos;ll review your application and get back to you soon.
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Join the Team</h2>
                    <p className="text-gray-400 text-sm">
                      Apply to become part of the GDG ENSAH organizing team — not just a member, but a builder.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Full Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name *"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          className={`${inputClassName} focus:border-[var(--google-blue)] ${errors.fullName ? 'border-[var(--google-red)]' : ''}`}
                        />
                        {errors.fullName && <p className="mt-1.5 text-xs text-[var(--google-red)]">{errors.fullName}</p>}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`${inputClassName} focus:border-[var(--google-red)] ${errors.email ? 'border-[var(--google-red)]' : ''}`}
                        />
                        {errors.email && <p className="mt-1.5 text-xs text-[var(--google-red)]">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone + Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`${inputClassName} focus:border-[var(--google-yellow)]`}
                      />
                      <div>
                        <select
                          value={formData.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className={`${inputClassName} focus:border-[var(--google-green)] ${errors.role ? 'border-[var(--google-red)]' : ''} ${formData.role ? '' : 'text-gray-500'}`}
                        >
                          <option value="" disabled>Role you&apos;re applying for *</option>
                          {roles.map((r) => (
                            <option key={r} value={r} className="bg-black text-white">{r}</option>
                          ))}
                        </select>
                        {errors.role && <p className="mt-1.5 text-xs text-[var(--google-red)]">{errors.role}</p>}
                      </div>
                    </div>

                    {/* Experience */}
                    <textarea
                      placeholder="Relevant experience or skills (optional)"
                      rows={3}
                      value={formData.experience}
                      onChange={(e) => updateField('experience', e.target.value)}
                      className={`${inputClassName} focus:border-[var(--google-blue)] resize-none`}
                    />

                    {/* Motivation */}
                    <div>
                      <textarea
                        placeholder="Why do you want to join the GDG ENSAH team? *"
                        rows={3}
                        value={formData.motivation}
                        onChange={(e) => updateField('motivation', e.target.value)}
                        className={`${inputClassName} focus:border-[var(--google-yellow)] resize-none ${errors.motivation ? 'border-[var(--google-red)]' : ''}`}
                      />
                      {errors.motivation && <p className="mt-1.5 text-xs text-[var(--google-red)]">{errors.motivation}</p>}
                    </div>

                    {submitError && (
                      <div className="p-4 rounded-2xl bg-[var(--google-red)]/10 border border-[var(--google-red)]/30 text-[var(--google-red)] text-sm text-center">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-2xl bg-white text-black font-bold text-base hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
