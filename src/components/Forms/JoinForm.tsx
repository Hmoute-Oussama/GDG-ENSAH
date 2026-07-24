'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import {
  JoinFormData,
  JoinFormErrors,
  hasJoinFormErrors,
  validateJoinForm,
} from '@/lib/join';

const initialFormData: JoinFormData = {
  fullName: '',
  email: '',
  phone: '',
  studentId: '',
  major: '',
  year: '',
  interests: '',
  confirmed: false,
};

const yearOptions = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  '5th Year',
  'Graduate',
  'Other',
];

const inputClassName =
  'w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-colors text-white placeholder-gray-500';

export default function JoinForm() {
  const [formData, setFormData] = useState<JoinFormData>(initialFormData);
  const [errors, setErrors] = useState<JoinFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = <K extends keyof JoinFormData>(field: K, value: JoinFormData[K]) => {
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

    const validationErrors = validateJoinForm(formData);
    if (hasJoinFormErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
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

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 md:p-16 rounded-[40px] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--google-green)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--google-green)]/20 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--google-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">You&apos;re In!</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            Welcome to GDG ENSAH. We&apos;ve received your membership request and will reach out soon with next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-gray-200 transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link
              href="/#events"
              className="px-8 py-4 rounded-2xl glass-panel font-bold hover:bg-white/10 transition-colors duration-300"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-panel p-8 md:p-16 rounded-[40px] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--google-blue)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--google-green)] opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Join GDG ENSAH</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Fill in your details below and confirm your membership to become part of our developer community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              className={`${inputClassName} focus:border-[var(--google-blue)] ${errors.fullName ? 'border-[var(--google-red)]' : ''}`}
            />
            {errors.fullName && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
              className={`${inputClassName} focus:border-[var(--google-red)] ${errors.email ? 'border-[var(--google-red)]' : ''}`}
            />
            {errors.email && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="tel"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className={`${inputClassName} focus:border-[var(--google-yellow)]`}
          />
          <input
            type="text"
            placeholder="Student ID (optional)"
            value={formData.studentId}
            onChange={(event) => updateField('studentId', event.target.value)}
            className={`${inputClassName} focus:border-[var(--google-green)]`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="Major / Field of Study *"
              value={formData.major}
              onChange={(event) => updateField('major', event.target.value)}
              className={`${inputClassName} focus:border-[var(--google-blue)] ${errors.major ? 'border-[var(--google-red)]' : ''}`}
            />
            {errors.major && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.major}</p>}
          </div>

          <div>
            <select
              value={formData.year}
              onChange={(event) => updateField('year', event.target.value)}
              className={`${inputClassName} focus:border-[var(--google-red)] ${errors.year ? 'border-[var(--google-red)]' : ''} ${formData.year ? '' : 'text-gray-500'}`}
            >
              <option value="" disabled>Year of Study *</option>
              {yearOptions.map((year) => (
                <option key={year} value={year} className="bg-black text-white">
                  {year}
                </option>
              ))}
            </select>
            {errors.year && <p className="mt-2 text-sm text-[var(--google-red)]">{errors.year}</p>}
          </div>
        </div>

        <textarea
          placeholder="What interests you about GDG? (optional)"
          rows={4}
          value={formData.interests}
          onChange={(event) => updateField('interests', event.target.value)}
          className={`${inputClassName} focus:border-[var(--google-yellow)] resize-none`}
        />

        <label className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors cursor-pointer ${errors.confirmed ? 'border-[var(--google-red)] bg-[var(--google-red)]/5' : 'border-white/10 bg-black/20 hover:border-white/20'}`}>
          <input
            type="checkbox"
            checked={formData.confirmed}
            onChange={(event) => updateField('confirmed', event.target.checked)}
            className="mt-1 w-5 h-5 rounded border-white/20 bg-black/40 accent-[var(--google-blue)] cursor-pointer shrink-0"
          />
          <span className="text-sm text-gray-300 leading-relaxed">
            I confirm that I want to join <strong className="text-white">GDG On Campus ENSAH</strong> and agree to participate in club activities, workshops, and community events.
          </span>
        </label>
        {errors.confirmed && <p className="text-sm text-[var(--google-red)] -mt-2">{errors.confirmed}</p>}

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
          {isSubmitting ? 'Submitting...' : 'Confirm & Join the Club'}
        </button>
      </form>
    </motion.div>
  );
}
