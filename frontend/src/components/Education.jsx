import { motion } from 'framer-motion';
import { HiAcademicCap, HiStar, HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { education } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(37,99,235,0.03), transparent)' }}>

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic background — building a strong foundation in Computer Science.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-3xl overflow-hidden mb-6 group"
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full"
                style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)' }} />

              <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))',
                      border: '1px solid rgba(37,99,235,0.3)',
                    }}>
                    🎓
                  </div>

                  <div className="flex-1">
                    {/* Status badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{
                        background: 'rgba(16,185,129,0.15)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#10B981',
                      }}>
                      📚 {edu.status}
                    </span>

                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-semibold text-lg mb-4">{edu.institution}</p>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-6 mb-5 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <HiCalendar className="text-primary" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiLocationMarker className="text-secondary" />
                        <span>{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HiStar className="text-accent" />
                        <span>CGPA: <span className="text-white font-bold">{edu.cgpa}</span></span>
                      </div>
                    </div>

                    <p className="text-slate-400 leading-relaxed mb-5">{edu.description}</p>

                    {/* Courses */}
                    <div>
                      <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                        <HiAcademicCap className="text-primary" /> Key Courses
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span key={course} className="tech-badge text-xs">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CGPA progress bar */}
              <div className="px-8 pb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Academic Performance</span>
                  <span className="text-white font-bold">{edu.cgpa}</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: '87.5%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Additional education card — placeholder for future */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6 text-center"
            style={{ border: '1px dashed rgba(37,99,235,0.3)' }}
          >
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="text-white font-semibold mb-1">What's Next?</h4>
            <p className="text-slate-400 text-sm">
              Planning to pursue a Master's in AI or Software Engineering after graduation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
