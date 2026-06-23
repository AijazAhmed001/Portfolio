import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

// Map portfolio sections to separate pages or home page anchors
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/#education' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Detect scroll for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection via IntersectionObserver on homepage
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'about', 'skills', 'services', 'projects', 'experience', 'education', 'contact'];
    const observers = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [location.pathname]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      
      if (location.pathname === '/') {
        // Already on home page, scroll directly
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate home with hash
        navigate(href);
      }
    } else {
      // Standalone page
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine if a link is currently active
  const isLinkActive = (link) => {
    if (location.pathname === '/') {
      // Home page: match section scroll state
      if (link.href === '/') return activeSection === 'home';
      if (link.href.startsWith('/#')) {
        return activeSection === link.href.replace('/#', '');
      }
      return false;
    } else {
      // Other pages: match exact pathname
      return location.pathname === link.href;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg gradient-animated flex items-center justify-center font-bold text-white text-sm shadow-lg">
                AA
              </div>
              <span className="font-display font-bold text-white text-lg hidden sm:block tracking-tight">
                {personalInfo.name}
              </span>
            </motion.button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isLinkActive(link);
                return (
                  <motion.button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                      active
                        ? 'text-white bg-primary/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Hire Me CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={() => handleNavClick('/#contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm px-5 py-2"
              >
                Hire Me
              </motion.button>
            </div>

            {/* Mobile Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 z-50 md:hidden"
              style={{
                background: 'rgba(15, 23, 42, 0.97)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg gradient-animated flex items-center justify-center font-bold text-white text-sm">
                      AA
                    </div>
                    <span className="font-display font-bold text-white">{personalInfo.name}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <HiX size={20} />
                  </motion.button>
                </div>

                {/* Links */}
                <nav className="flex flex-col gap-2 flex-1">
                  {navLinks.map((link, i) => {
                    const active = isLinkActive(link);
                    return (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => handleNavClick(link.href)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          active
                            ? 'bg-primary/20 text-white border border-primary/30'
                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="font-medium">{link.label}</span>
                        {active && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-primary" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleNavClick('/#contact')}
                  className="btn-primary justify-center mt-4"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
