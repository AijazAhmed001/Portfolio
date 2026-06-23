import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiExternalLink } from 'react-icons/hi';
import { fetchCertifications } from '../services/api';
import { certifications as staticCertifications } from '../data/portfolioData';

export default function Certifications({ preview = false }) {
  const [certificationsList, setCertificationsList] = useState(staticCertifications);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const data = await fetchCertifications();
        setCertificationsList(data);
      } catch (err) {
        console.error('Failed to load certifications:', err);
      }
    };
    loadCertifications();
  }, []);

  const displayedCerts = preview ? certificationsList.slice(0, 3) : certificationsList;
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, #06B6D4, transparent)' }} />

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Verified credentials and courses that demonstrate my commitment to continuous learning.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl group relative overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${cert.color}15, transparent)` }} />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{
                  background: `${cert.color}20`,
                  border: `1px solid ${cert.color}40`,
                }}>
                {cert.icon}
              </div>

              {/* Content */}
              <h3 className="text-base font-display font-bold text-white mb-1 leading-snug group-hover:text-accent transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="text-sm font-semibold mb-1" style={{ color: cert.color }}>
                {cert.issuer}
              </p>
              <p className="text-slate-500 text-xs mb-4">{cert.date}</p>

              {/* Credential link */}
              {cert.credential && cert.credential !== '#' ? (
                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:gap-2"
                  style={{ color: cert.color }}
                >
                  View Credential <HiExternalLink />
                </a>
              ) : (
                <span className="text-xs text-slate-600 flex items-center gap-1">
                  ✅ Verified Certificate
                </span>
              )}

              {/* Bottom color accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Learning statement / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center"
        >
          {preview ? (
            <Link to="/certifications" className="btn-primary inline-flex text-sm py-2.5 px-6">
              View More Certifications →
            </Link>
          ) : (
            <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-2xl"
              style={{ border: '1px solid rgba(6,182,212,0.3)' }}>
              <span className="text-2xl">📚</span>
              <p className="text-slate-300 text-sm">
                Always learning — currently exploring{' '}
                <span className="text-accent font-semibold">Advanced AI/ML</span> and{' '}
                <span className="text-primary font-semibold">Cloud Architecture</span>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
