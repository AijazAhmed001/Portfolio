import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { fetchAchievements } from '../services/api';
import { achievements as staticAchievements } from '../data/portfolioData';

// Animated number counter
const AnimatedNumber = ({ end, suffix, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span>{count}{suffix}</span>;
};

const AchievementCard = ({ value, suffix, label, icon, color, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="glass-card p-6 rounded-2xl text-center group relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse at center, ${color}15, transparent 70%)` }}
      />
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
        className="text-4xl mb-4"
      >
        {icon}
      </motion.div>
      <div className="text-4xl md:text-5xl font-black font-display mb-2" style={{ color }}>
        <AnimatedNumber end={value} suffix={suffix} inView={inView} />
      </div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
};

export default function Achievements({ preview = false }) {
  const [achievementsList, setAchievementsList] = useState(staticAchievements);

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const data = await fetchAchievements();
        setAchievementsList(data);
      } catch (err) {
        console.error('Failed to load achievements:', err);
      }
    };
    loadAchievements();
  }, []);

  const displayedAchievements = preview ? achievementsList.slice(0, 4) : achievementsList;
  return (
    <section id="achievements" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.04), transparent)' }}>

      <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }} />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />

      <div className="section-wrapper">
        <div data-aos="fade-up">
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">
            Numbers that reflect my journey, dedication, and passion for technology.
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 ${preview ? 'lg:grid-cols-4' : 'lg:grid-cols-6'} gap-4`}>
          {displayedAchievements.map((item, i) => (
            <AchievementCard key={i} {...item} index={i} />
          ))}
        </div>

        {preview ? (
          <div className="flex justify-center mt-12">
            <Link to="/achievements" className="btn-primary text-sm py-2.5 px-6">
              View More Achievements →
            </Link>
          </div>
        ) : (
          <div className="mt-16 grid sm:grid-cols-3 gap-6">
            {[
              { title: '🏆 Hackathon Finalist', desc: 'Reached finals in university-level hackathon with an AI-powered web solution.', color: '#F59E0B' },
              { title: '🎯 Tech Competition Winner', desc: 'Won best project award in the annual CS department project competition.', color: '#2563EB' },
              { title: "🎓 Dean's Recognition", desc: "Recognized for outstanding academic performance and dedication to learning.", color: '#7C3AED' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 rounded-2xl group"
              >
                <h4 className="text-white font-display font-bold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-0.5 rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
