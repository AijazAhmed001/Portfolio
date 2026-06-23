import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter,
  FaArrowUp, FaEnvelope
} from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

// Map sections and pages for footer navigation
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Services', href: '/#services' },
];

const exploreLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLinkClick = (href) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const socials = [
    { icon: <FaGithub size={18} />, href: personalInfo.github, label: 'GitHub', color: '#94A3B8' },
    { icon: <FaLinkedin size={18} />, href: personalInfo.linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { icon: <FaFacebook size={18} />, href: personalInfo.facebook, label: 'Facebook', color: '#1877F2' },
    { icon: <FaInstagram size={18} />, href: personalInfo.instagram, label: 'Instagram', color: '#E4405F' },
    { icon: <FaTwitter size={18} />, href: personalInfo.twitter, label: 'Twitter / X', color: '#1DA1F2' },
  ];

  return (
    <footer className="relative overflow-hidden pt-16 pb-8"
      style={{ background: 'linear-gradient(to bottom, #0F172A, #0A0F1E)' }}>

      {/* Top glow divider */}
      <div className="glow-divider absolute top-0 left-0 right-0" />

      {/* Background grid */}
      <div className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-animated flex items-center justify-center font-bold text-white text-sm shadow-lg">
                  AA
                </div>
                <span className="font-display font-bold text-white text-lg">{personalInfo.name}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Full Stack Developer & AI Enthusiast building modern, scalable web applications with passion and precision.
              </p>
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981' }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for freelance work
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-slate-400 hover:text-accent text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Explore Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-widest">
                Explore
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLinkClick(link.href)}
                      className="text-slate-400 hover:text-accent text-sm transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-secondary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact + Social */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-display font-bold mb-5 text-sm uppercase tracking-widest">
                Connect
              </h4>

              <a href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-accent text-sm mb-4 transition-colors duration-200">
                <FaEnvelope className="text-primary" />
                {personalInfo.email}
              </a>

              {/* Social Icons */}
              <div className="flex gap-3 flex-wrap mt-4">
                {socials.map(({ icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -4, color }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    aria-label={label}
                    title={label}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="glow-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-white font-semibold">{personalInfo.name}</span>. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            <Link to="/admin" className="hover:text-primary transition-colors duration-200 font-medium">
              🔑 System Administration
            </Link>
          </p>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl z-50"
        style={{
          background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
          boxShadow: '0 4px 20px rgba(37,99,235,0.5)',
        }}
        aria-label="Scroll to top"
      >
        <FaArrowUp size={16} />
      </motion.button>
    </footer>
  );
}
