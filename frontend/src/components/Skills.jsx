import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { fetchSkills } from '../services/api';
import { skills as staticSkills, circularSkills as staticCircularSkills } from '../data/portfolioData';

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools & Others',
};

// Animated linear skill bar
const SkillBar = ({ name, percentage, color, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="mb-5"
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-white font-medium text-sm">{name}</span>
        <span className="text-slate-400 text-sm font-mono">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}, #06B6D4)` }}
        />
      </div>
    </motion.div>
  );
};

// Circular progress ring
const CircularSkill = ({ name, percentage, color, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = inView
    ? circumference - (percentage / 100) * circumference
    : circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center gap-3 group"
    >
      <div className="relative">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <motion.circle
            cx="55" cy="55" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.8, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            transform="rotate(-90 55 55)"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
          <text x="55" y="55" textAnchor="middle" dominantBaseline="central"
            fill="white" fontSize="16" fontWeight="700" fontFamily="Poppins">
            {percentage}%
          </text>
        </svg>
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
          style={{ background: color }} />
      </div>
      <span className="text-white font-medium text-sm text-center">{name}</span>
    </motion.div>
  );
};

export default function Skills({ preview = false }) {
  const [activeTab, setActiveTab] = useState('frontend');
  const [groupedSkills, setGroupedSkills] = useState(staticSkills);
  const [circularSkillsList, setCircularSkillsList] = useState(staticCircularSkills);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills(true);
        if (data && Object.keys(data).length > 0) {
          setGroupedSkills(data);
          // Dynamically set circular skills if available
          const list = [];
          if (data.frontend) list.push(...data.frontend.slice(0, 2));
          if (data.backend) list.push(...data.backend.slice(0, 2));
          if (data.database) list.push(...data.database.slice(0, 2));
          if (list.length >= 4) {
            setCircularSkillsList(list.slice(0, 6));
          }
        }
      } catch (err) {
        console.error('Failed to load skills:', err);
      }
    };
    loadSkills();
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.03), transparent)' }}>

      <div className="section-wrapper">
        <div data-aos="fade-up">
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">
            Technologies I work with to build modern, scalable, and beautiful web applications.
          </p>
        </div>

        {/* Circular Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl mb-12"
        >
          <h3 className="text-xl font-display font-bold text-white text-center mb-8">
            Core Proficiency
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 justify-items-center">
            {circularSkillsList.map((skill, i) => (
              <CircularSkill key={skill.name} {...skill} index={i} />
            ))}
          </div>
        </motion.div>

        {preview ? (
          <div className="flex justify-center mt-6">
            <Link to="/skills" className="btn-primary text-sm py-2.5 px-6">
              View More Skills →
            </Link>
          </div>
        ) : (
          <>
            {/* Tab selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === key ? 'text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                  style={
                    activeTab === key
                      ? { background: 'linear-gradient(135deg, #2563EB, #7C3AED)', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }
                      : { background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {label}
                </motion.button>
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 rounded-3xl"
            >
              <h3 className="text-lg font-display font-semibold text-white mb-6">
                {categoryLabels[activeTab]} Skills
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-12">
                {groupedSkills[activeTab] && groupedSkills[activeTab].map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest">Technologies I Use</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['HTML5','CSS3','JavaScript','React','Node.js','Express','MongoDB','MySQL',
                  'Tailwind','Bootstrap','Git','GitHub','Figma','Postman','Firebase','REST API'].map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="tech-badge cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
