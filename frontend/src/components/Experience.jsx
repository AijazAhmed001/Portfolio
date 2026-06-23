import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchExperiences } from '../services/api';
import { experience as staticExperience } from '../data/portfolioData';

const typeColors = {
  learning: { bg: 'rgba(37,99,235,0.15)', border: 'rgba(37,99,235,0.4)', dot: '#2563EB' },
  project:  { bg: 'rgba(124,58,237,0.15)', border: 'rgba(124,58,237,0.4)', dot: '#7C3AED' },
  current:  { bg: 'rgba(6,182,212,0.15)',  border: 'rgba(6,182,212,0.4)',  dot: '#06B6D4' },
};

const typeLabels = { learning: 'Learning', project: 'Project', current: '🔥 Current', work: 'Work' };

export default function Experience({ preview = false }) {
  const [experienceList, setExperienceList] = useState(staticExperience);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await fetchExperiences();
        setExperienceList(data);
      } catch (err) {
        console.error('Failed to load experiences:', err);
      }
    };
    loadExperience();
  }, []);

  // Sort descending by year in preview mode to get the most recent, otherwise keep chronological
  const displayedExp = preview
    ? [...experienceList].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 1)
    : experienceList;
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at left, #2563EB, transparent)' }} />

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            My development journey — from first lines of code to building full-stack production applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #2563EB, #7C3AED, #06B6D4, transparent)' }} />

          {displayedExp.map((item, i) => {
            const isRight = preview ? true : i % 2 === 0;
            const colors = typeColors[item.type] || typeColors.learning;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row pl-20 md:pl-0`}
              >
                {/* Timeline dot (desktop center) */}
                <div className={`absolute ${preview ? 'left-6 md:left-8' : 'left-6 md:left-1/2 md:-translate-x-1/2'} top-6 z-10`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3, type: 'spring' }}
                    className="w-5 h-5 rounded-full border-2 border-dark"
                    style={{
                      background: colors.dot,
                      boxShadow: `0 0 12px ${colors.dot}80`,
                    }}
                  />
                </div>

                {/* Year badge (desktop only) */}
                {!preview && (
                  <div className={`hidden md:flex flex-1 ${isRight ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-full text-sm font-bold font-mono"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                        color: colors.dot,
                      }}
                    >
                      {item.year}
                    </motion.div>
                  </div>
                )}

                {/* Card */}
                <div className={`flex-1 ${preview ? 'md:pl-16' : (isRight ? 'md:pl-12' : 'md:pr-12')}`}>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: `0 10px 30px ${colors.dot}20` }}
                    className="glass-card p-6 rounded-2xl transition-all duration-300"
                  >
                    {/* Mobile/Preview year */}
                    <div className={`flex items-center gap-3 mb-3 ${preview ? '' : 'md:hidden'}`}>
                      <span className="px-3 py-1 rounded-full text-xs font-bold font-mono"
                        style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.dot }}>
                        {item.year}
                      </span>
                    </div>

                    {/* Type badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.dot }}>
                      {typeLabels[item.type] || item.type}
                    </span>

                    <h3 className="text-xl font-display font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-accent text-sm font-medium mb-3">{item.company}</p>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

                    {/* Skills used */}
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="tech-badge text-xs">{skill}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}

          {/* Future dot / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6"
          >
            {preview ? (
              <Link to="/experience" className="btn-primary text-sm py-2.5 px-6">
                View Full Timeline →
              </Link>
            ) : (
              <div className="glass-card px-6 py-3 rounded-full text-sm text-slate-400 text-center"
                style={{ border: '1px solid rgba(37,99,235,0.2)' }}>
                🚀 More great work incoming...
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
