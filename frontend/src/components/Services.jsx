import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';
import { services } from '../data/portfolioData';

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, #7C3AED, transparent 70%)' }} />

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">
            What I can build for you — from beautiful frontends to robust backends and everything in between.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl group relative overflow-hidden cursor-default"
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${service.color}20`,
                  border: `1px solid ${service.color}40`,
                  boxShadow: `0 4px 20px ${service.color}30`,
                }}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Features list */}
              <ul className="space-y-2">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-slate-300 text-sm">
                    <HiCheckCircle style={{ color: service.color }} className="flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))',
            border: '1px solid rgba(37,99,235,0.3)',
          }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ background: 'radial-gradient(ellipse, #2563EB, transparent)' }} />
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 relative z-10">
            Ready to Build Something Amazing?
          </h3>
          <p className="text-slate-400 mb-6 relative z-10">
            Let's collaborate and turn your ideas into a stunning digital reality.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary relative z-10 text-lg px-8 py-3"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
