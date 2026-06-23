import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';

import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgressBar from './components/ScrollProgressBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import CertificationsPage from './pages/CertificationsPage';
import AchievementsPage from './pages/AchievementsPage';
import BlogPage from './pages/BlogPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: 'ease-out-cubic',
      offset: 80,
    });
  }, []);

  // Handle hash scrolling and standard scroll-to-top on route changes
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <ErrorBoundary>
      {/* Animated intro loading screen */}
      <LoadingScreen />

      {/* Reading progress indicator */}
      <ScrollProgressBar />

      {/* Global Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '12px',
          },
        }}
      />

      <div className="min-h-screen bg-dark text-white overflow-x-hidden flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostDetailPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={
              <div className="min-h-screen flex flex-col items-center justify-center text-center pt-24 px-4">
                <div className="text-6xl mb-4">🛸</div>
                <h1 className="text-3xl font-display font-black text-white mb-2">404: Page Not Found</h1>
                <p className="text-slate-400 mb-6">The page you are looking for has floated away into space.</p>
                <a href="/" className="btn-primary text-sm py-2.5 px-5">Go Home</a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
