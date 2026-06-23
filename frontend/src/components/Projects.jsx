import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { HiEye } from 'react-icons/hi';
import { fetchProjects } from '../services/api';
import { projects as staticProjects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { useDebounce } from '../hooks/usePortfolio';

const filters = ['all', 'fullstack', 'frontend', 'backend', 'ai', 'other'];

const filterLabels = {
  all: 'All Projects',
  fullstack: 'Full Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  ai: 'AI/ML',
  other: 'Other',
};

export default function Projects({ preview = false }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [projectsList, setProjectsList] = useState(staticProjects);
  const debouncedSearch = useDebounce(searchQuery, 250);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjectsList(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      }
    };
    loadProjects();
  }, []);

  const filtered = projectsList.filter((p) => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
    
    // In preview mode, only show featured projects
    const matchesPreview = !preview || p.featured;
    return matchesFilter && matchesSearch && matchesPreview;
  });

  const displayedProjects = preview ? filtered.slice(0, 3) : filtered;

  return (
    <section id="projects" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.03), transparent)' }}>

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            A showcase of my best work — from C++ systems to full MERN stack applications.
          </p>
        </div>

        {/* Search bar */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-md mx-auto mb-8"
          >
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by project name or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-11 pr-4"
            />
          </motion.div>
        )}

        {/* Filter Tabs */}
        {!preview && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={
                  activeFilter === f
                    ? { background: 'linear-gradient(135deg, #2563EB, #7C3AED)', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }
                    : { background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {filterLabels[f]}
              </motion.button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {displayedProjects.length > 0 ? (
            <motion.div
              key={(preview ? 'preview' : activeFilter) + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 transition-opacity duration-300"
                      style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.95))' }} />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(4px)' }}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                        style={{ background: 'rgba(37,99,235,0.8)' }}
                        title="View Details"
                      >
                        <HiEye size={18} />
                      </motion.button>
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ background: 'rgba(30,41,59,0.9)' }}
                          title="GitHub"
                        >
                          <FaGithub size={16} />
                        </motion.a>
                      )}
                      {project.liveDemo && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                          style={{ background: 'rgba(6,182,212,0.8)' }}
                          title="Live Demo"
                        >
                          <FaExternalLinkAlt size={14} />
                        </motion.a>
                      )}
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold"
                        style={{ background: 'rgba(37,99,235,0.9)', color: 'white' }}>
                        ⭐ Featured
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold capitalize"
                      style={{ background: 'rgba(0,0,0,0.7)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.3)' }}>
                      {project.category}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="tech-badge text-xs">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-badge text-xs">+{project.technologies.length - 3}</span>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="flex gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                      >
                        📖 Case Study
                      </button>
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold text-accent text-center transition-all duration-200 hover:bg-accent/10"
                          style={{ border: '1px solid rgba(6,182,212,0.3)' }}
                        >
                          🔗 Live Demo
                        </a>
                      )}
                      {project.github && !project.liveDemo && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-300 text-center transition-all duration-200 hover:bg-white/5"
                          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          💻 GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-slate-500"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No projects found for "{searchQuery}"</p>
              <button onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="mt-4 text-primary hover:underline text-sm">
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          {preview ? (
            <Link to="/projects" className="btn-primary inline-flex text-sm py-2.5 px-6">
              View More Projects →
            </Link>
          ) : (
            <a
              href="https://github.com/aijazahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <FaGithub /> View All on GitHub
            </a>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
