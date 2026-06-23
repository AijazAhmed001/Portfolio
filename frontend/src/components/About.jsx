import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { fetchAchievements } from '../services/api';

// Simple animated number that counts up
const AnimatedNumber = ({ end, suffix, duration = 2000, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span>{count}{suffix}</span>;
};

const StatCard = ({ value, suffix, label, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 text-center rounded-2xl"
    >
      <div className="text-3xl font-black font-display gradient-text mb-1">
        <AnimatedNumber end={value} suffix={suffix} inView={inView} />
      </div>
      <div className="text-slate-400 text-sm">{label}</div>
    </motion.div>
  );
};

export default function About({ preview = false }) {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAchievements();
        setStatsData(data);
      } catch (err) {
        console.error('Failed to load achievements in About component:', err);
      }
    };
    loadStats();
  }, []);
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, #7C3AED, transparent)' }} />

      <div className="section-wrapper">
        {/* Section Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Get to know me — my story, my journey, and what drives me to build amazing things.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left — Image + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Main image card */}
            <div className="relative">
              <div
                className="w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1e3a6e 0%, #2d1b69 50%, #1E293B 100%)',
                  border: '1px solid rgba(37,99,235,0.3)',
                  boxShadow: '0 20px 60px rgba(37,99,235,0.2), 0 0 40px rgba(124,58,237,0.1)',
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👨‍💻</div>
                  <div className="text-white font-display font-bold text-2xl">{personalInfo.name}</div>
                  <div className="gradient-text text-sm font-medium mt-1">Full Stack Developer</div>
                  <div className="mt-4 px-4 py-2 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', color: '#06B6D4' }}>
                    🎓 {personalInfo.university}
                  </div>
                </div>
              </div>

              {/* Floating — Tech Stack */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-card px-4 py-3 rounded-2xl text-sm shadow-xl"
                style={{ border: '1px solid rgba(37,99,235,0.3)' }}
              >
                <div className="text-xs text-slate-400 mb-1">Tech Stack</div>
                <div className="font-bold text-white">MERN Stack 🚀</div>
              </motion.div>

              {/* Floating — University */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-6 -left-6 glass-card px-4 py-3 rounded-2xl text-sm shadow-xl"
                style={{ border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <div className="text-xs text-slate-400 mb-1">University</div>
                <div className="font-bold text-white">Air University 🎓</div>
              </motion.div>

              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 -z-10"
                style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }} />
            </div>
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-accent text-sm font-mono font-medium mb-3 uppercase tracking-widest">
              // Who I Am
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Passionate Developer &{' '}
              <span className="gradient-text">Problem Solver</span>
            </h3>

            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              {personalInfo.bio}
            </p>

            <p className="text-slate-400 leading-relaxed mb-8">
              I'm currently in my final year of <span className="text-white font-semibold">BS Computer Science</span> at{' '}
              <span className="text-white font-semibold">Air University, Islamabad</span>. I am deeply
              interested in building full-stack web applications that solve real-world problems, with a
              growing passion for AI and machine learning integration.
            </p>

            {/* Info grid */}
            {!preview && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <FaEnvelope className="text-primary" />, label: 'Email', value: personalInfo.email },
                  { icon: <FaMapMarkerAlt className="text-secondary" />, label: 'Location', value: personalInfo.location },
                  { icon: '🎓', label: 'Degree', value: `${personalInfo.degree}` },
                  { icon: '⭐', label: 'CGPA', value: personalInfo.cgpa },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
                      <div className="text-white font-medium text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social + CTA */}
            {preview ? (
              <div className="flex flex-wrap gap-3">
                <Link to="/about" className="btn-primary text-sm py-2.5 px-6">
                  View More →
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="btn-outline text-sm py-2.5">
                  <FaGithub /> GitHub
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="btn-primary text-sm py-2.5">
                  <FaLinkedin /> LinkedIn
                </a>
                <a href={personalInfo.resume} download className="btn-accent text-sm py-2.5">
                  Download CV
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* Stats Cards */}
        {statsData.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {statsData.slice(0, preview ? 4 : 6).map((stat, i) => (
              <StatCard key={i} {...stat} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
