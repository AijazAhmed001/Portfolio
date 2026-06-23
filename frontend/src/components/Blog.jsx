import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCalendar, HiClock, HiArrowRight } from 'react-icons/hi';
import { fetchBlogs } from '../services/api';
import { blogs as staticBlogs } from '../data/portfolioData';

export default function Blog({ preview = false }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [blogsList, setBlogsList] = useState(staticBlogs);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogsList(data);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      }
    };
    loadBlogs();
  }, []);

  const displayedBlogs = preview ? blogsList.slice(0, 3) : blogsList;

  return (
    <section id="blog" className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(6,182,212,0.03), transparent)' }}>

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">
            I write about web development, modern frameworks, and lessons from building real-world projects.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBlogs.map((post, i) => (
            <motion.article
              key={post._id || post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredId(post._id || post.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`}>
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.9))' }} />

                  {/* Tags on image */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {post.tags && post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-lg font-medium"
                        style={{ background: 'rgba(37,99,235,0.85)', color: '#fff' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-slate-500 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <HiCalendar className="text-primary" /> {post.date || new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <HiClock className="text-accent" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                    style={{ color: (hoveredId === (post._id || post.id)) ? '#06B6D4' : '#2563EB' }}
                  >
                    Read Article
                    <motion.div animate={{ x: (hoveredId === (post._id || post.id)) ? 4 : 0 }}>
                      <HiArrowRight />
                    </motion.div>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          {preview ? (
            <Link to="/blog" className="btn-primary inline-flex text-sm py-2.5 px-6">
              View More Articles →
            </Link>
          ) : (
            <div className="glass-card inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
              style={{ border: '1px solid rgba(6,182,212,0.3)' }}>
              <span className="text-xl">✍️</span>
              <p className="text-slate-400 text-sm">
                More articles coming soon — follow me on{' '}
                <a href="https://linkedin.com/in/aijazahmed" target="_blank" rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors font-semibold">LinkedIn</a>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
