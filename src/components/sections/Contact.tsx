'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useSupabaseProfile } from '@/hooks/useSupabase';
import emailjs from '@emailjs/browser';
import MagneticButton from '@/components/ui/MagneticButton';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_mqp7e52';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_y1agy9m';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'pxNqsgOTki_vb8cAb';

const SOCIAL_LINKS = [
  { icon: FaGithub, href: 'https://github.com/ahmdfariiss', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
];

interface FormField {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { profile } = useSupabaseProfile();
  const [formState, setFormState] = useState<FormField>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
          to_email: 'afarisalaziz201@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      setError('Gagal mengirim pesan. Coba lagi.');
      setTimeout(() => setError(''), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `form-input text-base ${focusedField === field ? 'border-b-[var(--accent)]' : ''}`;

  return (
    <section id="contact" className="py-32 relative">
      <div className="section-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Big headline + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="section-label block mb-6">Let&apos;s Connect</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none mb-8">
              Let&apos;s Work<br />
              <span className="text-[var(--accent)]">Together</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-12 max-w-sm">
              Tertarik untuk berkolaborasi, atau punya pertanyaan? Kirim pesan dan saya akan merespons secepatnya.
            </p>

            {/* Contact info */}
            <div className="space-y-5 mb-12">
              <motion.a
                href={`mailto:${profile?.email || 'afarisalaziz201@gmail.com'}`}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
              >
                <div className="w-11 h-11 rounded-full border border-[var(--border)] group-hover:border-[var(--accent)]/40 flex items-center justify-center transition-colors">
                  <FaEnvelope size={14} />
                </div>
                <span className="text-sm">{profile?.email || 'afarisalaziz201@gmail.com'}</span>
              </motion.a>

              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 text-[var(--text-secondary)]"
              >
                <div className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center">
                  <FaMapMarkerAlt size={14} />
                </div>
                <span className="text-sm">{profile?.location || 'Indonesia'}</span>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <MagneticButton
                  key={s.label}
                  as="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.25}
                  className="w-11 h-11 rounded-full border border-[var(--border)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] text-[var(--text-muted)] flex items-center justify-center transition-colors"
                >
                  <s.icon size={15} />
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label className="section-label block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="Your name"
                  className={inputClass('name')}
                />
              </div>

              {/* Email */}
              <div>
                <label className="section-label block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  placeholder="your@email.com"
                  className={inputClass('email')}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="section-label block mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="What&apos;s this about?"
                  className={inputClass('subject')}
                />
              </div>

              {/* Message */}
              <div>
                <label className="section-label block mb-2">Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${inputClass('message')} resize-none`}
                />
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-mono"
                >
                  ✗ {error}
                </motion.p>
              )}

              {/* Submit button */}
              <div className="flex items-center gap-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-8 py-4 rounded-sm font-bold text-sm transition-all duration-300 cursor-pointer ${
                    isSubmitted
                      ? 'bg-green-500 text-black'
                      : 'bg-[var(--accent)] text-black hover:bg-[#c5ff30]'
                  } disabled:opacity-70`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>✓ Sent!</>
                  ) : (
                    <>
                      <FaPaperPlane size={13} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <span className="text-xs text-neutral-700 font-mono">
                  Usually responds within 24h
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
