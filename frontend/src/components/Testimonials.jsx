import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/portfolioData';

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar
        key={i}
        size={14}
        className={i < rating ? 'text-yellow-400' : 'text-slate-600'}
      />
    ))}
  </div>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, next]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.95 }),
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #2563EB, transparent 60%)' }} />

      <div className="section-wrapper">
        {/* Header */}
        <div data-aos="fade-up">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            What professors, clients, and collaborators say about working with me.
          </p>
        </div>

        {/* Main Slider */}
        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {/* Quote icon */}
          <div className="absolute -top-6 left-8 text-primary opacity-20 z-0">
            <FaQuoteLeft size={80} />
          </div>

          {/* Card */}
          <div className="relative overflow-hidden min-h-[300px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="w-full"
              >
                <div className="glass-card p-8 md:p-10 rounded-3xl relative z-10"
                  style={{ border: '1px solid rgba(37,99,235,0.2)' }}>

                  <StarRating rating={testimonials[current].rating} />

                  <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                    "{testimonials[current].feedback}"
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                        boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
                      }}>
                      {testimonials[current].avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-accent text-sm">{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <FaChevronLeft size={14} />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  whileHover={{ scale: 1.3 }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    background: i === current
                      ? 'linear-gradient(90deg, #2563EB, #7C3AED)'
                      : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <FaChevronRight size={14} />
            </motion.button>
          </div>
        </div>

        {/* Mini cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {testimonials.map((t, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              whileHover={{ y: -4 }}
              className={`glass-card p-4 rounded-2xl text-left transition-all duration-300 ${
                i === current ? 'border-primary/50 shadow-lg shadow-primary/10' : ''
              }`}
              style={i === current ? { border: '1px solid rgba(37,99,235,0.5)' } : {}}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}>
                  {t.avatar}
                </div>
                <div className="text-xs text-white font-medium truncate">{t.name}</div>
              </div>
              <StarRating rating={t.rating} />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
