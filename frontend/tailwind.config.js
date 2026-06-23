/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#7C3AED',
        accent: '#06B6D4',
        dark: '#0F172A',
        darkCard: '#1E293B',
        darkBorder: '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #2563EB, 0 0 20px #2563EB' },
          to: { boxShadow: '0 0 20px #7C3AED, 0 0 40px #7C3AED' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))',
        'glow-gradient': 'radial-gradient(ellipse at center, rgba(37,99,235,0.3) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
