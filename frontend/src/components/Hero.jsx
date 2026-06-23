import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaDownload, FaEye } from 'react-icons/fa';
import { HiArrowDown } from 'react-icons/hi';
import { personalInfo } from '../data/portfolioData';

// Animated floating particle
const Particle = ({ style }) => (
  <div
    className="absolute rounded-full opacity-20 pointer-events-none"
    style={{
      animation: `particle-rise ${style.duration}s ease-in ${style.delay}s infinite`,
      ...style,
    }}
  />
);

// Floating tech icons
const FloatingIcon = ({ icon, style }) => (
  <motion.div
    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: style.duration || 4, repeat: Infinity, ease: 'easeInOut', delay: style.delay || 0 }}
    className="absolute text-2xl opacity-30 hidden lg:block pointer-events-none select-none"
    style={style}
  >
    {icon}
  </motion.div>
);

export default function Hero() {
  const canvasRef = useRef(null);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = ['#2563EB', '#7C3AED', '#06B6D4'][Math.floor(Math.random() * 3)];
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -this.speed;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.0005;
        if (this.y < 0 || this.opacity <= 0) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new P());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)' }}
    >
      {/* Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 orb-animate"
        style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', animation: 'orb-move 18s ease-in-out infinite reverse' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #06B6D4, transparent)', animation: 'orb-move 12s ease-in-out infinite' }} />

      {/* Floating Tech Icons */}
      {[
        { icon: '⚛️', top: '15%', left: '8%', duration: 5, delay: 0 },
        { icon: '🟨', top: '25%', right: '10%', duration: 4, delay: 0.5 },
        { icon: '🟢', top: '65%', left: '5%', duration: 6, delay: 1 },
        { icon: '🗄️', bottom: '20%', right: '8%', duration: 5, delay: 1.5 },
        { icon: '🔧', top: '45%', left: '3%', duration: 7, delay: 0.3 },
        { icon: '💻', bottom: '30%', left: '12%', duration: 4.5, delay: 2 },
      ].map((item, i) => <FloatingIcon key={i} icon={item.icon} style={item} />)}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-24">

          {/* Left – Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{
                background: 'rgba(37,99,235,0.15)',
                border: '1px solid rgba(37,99,235,0.3)',
                color: '#06B6D4',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Available for hire
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-xl font-medium mb-2 font-mono"
            >
              Hi, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-black mb-4 leading-tight"
            >
              <span className="shimmer-text">{personalInfo.name}</span>
            </motion.h1>

            {/* Type Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl font-semibold mb-6 h-10"
            >
              <span className="text-slate-400">I'm a </span>
              <TypeAnimation
                sequence={[
                  'Full Stack Developer', 2000,
                  'Frontend Developer', 2000,
                  'Backend Developer', 2000,
                  'React Developer', 2000,
                  'MERN Stack Developer', 2000,
                  'AI Enthusiast', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text font-bold"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              CS student at <span className="text-white font-semibold">Air University</span>. I build
              modern, scalable web applications with clean code and beautiful UIs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a href={personalInfo.resume} download className="btn-primary">
                <FaDownload size={16} /> Download CV
              </a>
              <button onClick={scrollToContact} className="btn-outline">
                Hire Me
              </button>
              <button onClick={scrollToProjects} className="btn-accent">
                <FaEye size={16} /> View Projects
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4"
            >
              <span className="text-slate-500 text-sm">Find me on:</span>
              {[
                { icon: <FaGithub size={20} />, href: personalInfo.github, label: 'GitHub' },
                { icon: <FaLinkedin size={20} />, href: personalInfo.linkedin, label: 'LinkedIn' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)' }}
                  aria-label={label}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #2563EB, #7C3AED, #06B6D4, #2563EB)',
                  padding: '3px',
                  borderRadius: '50%',
                }}
              >
                <div className="w-full h-full rounded-full" style={{ background: '#0F172A' }} />
              </motion.div>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: 'radial-gradient(circle, #2563EB, #7C3AED, transparent)' }}
              />

              {/* Profile photo placeholder */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden"
                style={{
                  border: '3px solid rgba(37,99,235,0.5)',
                  background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                  boxShadow: '0 0 40px rgba(37,99,235,0.3), 0 0 80px rgba(124,58,237,0.2)',
                }}
              >
                {/* Avatar placeholder */}
                <div className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1e3a6e 0%, #2d1b69 50%, #0F172A 100%)' }}>
                  <div className="text-center">
                    <div className="text-8xl mb-2">👨‍💻</div>
                    <div className="text-white font-display font-bold text-xl">Aijaz Ahmed</div>
                    <div className="gradient-text text-sm font-medium">Full Stack Dev</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge — Experience */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-2xl"
                style={{ border: '1px solid rgba(37,99,235,0.3)' }}
              >
                <div className="text-2xl font-bold text-white">2+</div>
                <div className="text-xs text-slate-400">Years Coding</div>
              </motion.div>

              {/* Floating badge — Projects */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-2xl"
                style={{ border: '1px solid rgba(124,58,237,0.3)' }}
              >
                <div className="text-2xl font-bold text-white">10+</div>
                <div className="text-xs text-slate-400">Projects Done</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <HiArrowDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
