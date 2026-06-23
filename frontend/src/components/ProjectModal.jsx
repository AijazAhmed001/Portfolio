import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaClock, FaUser, FaCheckCircle } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
          style={{
            background: '#1E293B',
            border: '1px solid rgba(37,99,235,0.3)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Project Image */}
          <div className="relative h-56 overflow-hidden rounded-t-3xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(30,41,59,0.9))' }} />

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}
            >
              <FaTimes />
            </motion.button>

            {/* Status badge */}
            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: '#10B981' }}>
                ✅ {project.status}
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
              {project.title}
            </h2>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <FaClock className="text-primary" />
                <span>Duration: <span className="text-white">{project.duration}</span></span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaUser className="text-secondary" />
                <span>Role: <span className="text-white">{project.role}</span></span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-400 leading-relaxed mb-6">
              {project.longDescription}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            {/* Features */}
            {project.features && (
              <div className="mb-8">
                <h4 className="text-white font-semibold mb-3">Key Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-slate-300 text-sm">
                      <FaCheckCircle className="text-accent flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {project.liveDemo && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaExternalLinkAlt size={14} /> Live Demo
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <FaGithub size={14} /> Source Code
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
