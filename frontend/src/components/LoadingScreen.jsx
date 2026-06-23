import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 15;
      });
    }, 80);

    // Hide after 1.6 seconds
    const timer = setTimeout(() => setIsVisible(false), 1600);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: '#0F172A' }}
        >
          {/* Background orbs */}
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20 orb-animate"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', animation: 'orb-move 10s ease-in-out infinite reverse' }} />

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl font-display mb-8 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
          >
            AA
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-display font-bold text-white mb-1"
          >
            Aijaz Ahmed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-sm mb-10"
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-1 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)',
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-slate-600 text-xs mt-4 font-mono"
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
