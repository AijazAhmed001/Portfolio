import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import axios from 'axios';
import { personalInfo } from '../data/portfolioData';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const contactInfo = [
  { icon: <FaEnvelope />, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#2563EB' },
  { icon: <FaPhone />, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#7C3AED' },
  { icon: <FaMapMarkerAlt />, label: 'Location', value: personalInfo.location, href: '#', color: '#06B6D4' },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [touched, setTouched] = useState({});

  // Client-side validation
  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Name is required';
    else if (data.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!data.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'Invalid email address';
    if (!data.subject.trim()) errs.subject = 'Subject is required';
    else if (data.subject.trim().length < 3) errs.subject = 'Subject too short';
    if (!data.message.trim()) errs.message = 'Message is required';
    else if (data.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Live validation after touch
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      await axios.post(`${API_URL}/contact`, form);
      setStatus('success');
      setForm(initialForm);
      setTouched({});
      setTimeout(() => setStatus(null), 6000);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: msg });
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const inputClasses = (field) => `form-input ${
    errors[field] && touched[field]
      ? 'border-red-500/60 focus:border-red-500'
      : touched[field] && !errors[field]
      ? 'border-green-500/40'
      : ''
  }`;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #2563EB, transparent 60%)' }} />

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's work together and build something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl h-full">
              <h3 className="text-2xl font-display font-bold text-white mb-2">
                Let's <span className="gradient-text">Talk</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Contact items */}
              <div className="space-y-5 mb-8">
                {contactInfo.map(({ icon, label, value, href, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}>
                      {icon}
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide">{label}</p>
                      <p className="text-white font-medium text-sm group-hover:text-accent transition-colors duration-200">
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div className="glow-divider" />

              {/* Socials */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Follow Me</p>
                <div className="flex gap-3">
                  {[
                    { icon: <FaGithub size={18} />, href: personalInfo.github, label: 'GitHub' },
                    { icon: <FaLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn' },
                  ].map(({ icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      aria-label={label}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-xl font-display font-bold text-white mb-6">
                Send a Message
              </h3>

              {/* Success / Error alerts */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-medium"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981' }}
                >
                  <HiCheckCircle size={20} />
                  Message sent successfully! I'll get back to you soon. 🎉
                </motion.div>
              )}
              {status?.type === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl mb-6 text-sm font-medium"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}
                >
                  <HiXCircle size={20} />
                  {status.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe"
                      className={inputClasses('name')}
                      maxLength={100}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="john@example.com"
                      className={inputClasses('email')}
                      maxLength={254}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Project Inquiry / Collaboration / Freelance Work"
                    className={inputClasses('subject')}
                    maxLength={200}
                  />
                  {errors.subject && touched.subject && (
                    <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5 font-medium">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    placeholder="Tell me about your project, requirements, or just say hello..."
                    className={`${inputClasses('message')} resize-none`}
                    maxLength={2000}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message && touched.message ? (
                      <p className="text-red-400 text-xs">{errors.message}</p>
                    ) : <span />}
                    <p className="text-slate-600 text-xs">{form.message.length}/2000</p>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3"
                  style={{
                    background: status === 'loading'
                      ? 'rgba(37,99,235,0.5)'
                      : 'linear-gradient(135deg, #2563EB, #7C3AED)',
                    boxShadow: status === 'loading' ? 'none' : '0 4px 30px rgba(37,99,235,0.4)',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
