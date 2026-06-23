import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCalendar, HiClock, HiArrowLeft, HiTag } from 'react-icons/hi';
import { fetchBlogBySlug } from '../services/api';

export default function BlogPostDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true);
        const data = await fetchBlogBySlug(slug);
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load blog post:', err);
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    };
    getBlog();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4">
        <div className="text-5xl mb-4">😢</div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">{error || 'Article Not Found'}</h2>
        <p className="text-slate-400 mb-6">The article you are looking for might have been removed or doesn't exist.</p>
        <Link to="/blog" className="btn-primary text-sm py-2 px-5 inline-flex items-center gap-2">
          <HiArrowLeft /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 opacity-10 pointer-events-none blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, #7C3AED 50%, transparent 100%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors duration-200 group text-sm font-semibold">
          <motion.div animate={{ x: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="group-hover:-translate-x-1 transition-transform">
            <HiArrowLeft />
          </motion.div>
          Back to Articles
        </Link>

        <article className="glass-card p-6 sm:p-10 rounded-3xl overflow-hidden shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          
          {/* Header */}
          <header className="mb-8">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-xs sm:text-sm mb-4">
              <span className="flex items-center gap-1.5">
                <HiCalendar className="text-primary" /> {blog.date || new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <HiClock className="text-accent" /> {blog.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags && blog.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(255,255,255,0.08)', color: '#06B6D4' }}>
                  <HiTag className="text-xs" /> {tag}
                </span>
              ))}
            </div>

            {/* Banner Image */}
            {blog.image && (
              <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 border border-white/5">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            )}
          </header>

          {/* Body Content */}
          <div 
            className="prose prose-invert max-w-none text-slate-300 text-base sm:text-lg leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </article>
      </div>
    </div>
  );
}
