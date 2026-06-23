// ─── Personal Info ────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Aijaz Ahmed',
  tagline: 'Full Stack Developer & AI Enthusiast',
  email: 'aijazahmed@email.com',
  phone: '+92 300 0000000',
  location: 'Islamabad, Pakistan',
  university: 'Air University',
  degree: 'BS Computer Science',
  cgpa: '3.5 / 4.0',
  graduationYear: '2026',
  linkedin: 'https://linkedin.com/in/aijazahmed',
  github: 'https://github.com/aijazahmed',
  facebook: 'https://facebook.com/aijazahmed',
  instagram: 'https://instagram.com/aijazahmed',
  twitter: 'https://twitter.com/aijazahmed',
  bio: `I'm a passionate Full Stack Developer specializing in modern web technologies. I enjoy creating responsive and user-friendly applications with clean architecture. Currently pursuing my BS in Computer Science at Air University, I'm driven by a love for building impactful digital solutions.`,
  resume: '/resume.pdf',
};

// ─── Nav Links ────────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats = [
  { value: 10, suffix: '+', label: 'Projects Completed' },
  { value: 5, suffix: '+', label: 'Technologies' },
  { value: 2, suffix: '+', label: 'Years Learning' },
  { value: 100, suffix: '%', label: 'Dedication' },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills = {
  frontend: [
    { name: 'HTML5', percentage: 95, color: '#E34F26' },
    { name: 'CSS3', percentage: 90, color: '#1572B6' },
    { name: 'JavaScript', percentage: 85, color: '#F7DF1E' },
    { name: 'React.js', percentage: 80, color: '#61DAFB' },
    { name: 'Tailwind CSS', percentage: 85, color: '#06B6D4' },
    { name: 'Bootstrap', percentage: 88, color: '#7952B3' },
  ],
  backend: [
    { name: 'Node.js', percentage: 75, color: '#339933' },
    { name: 'Express.js', percentage: 75, color: '#68A063' },
    { name: 'REST API', percentage: 80, color: '#2563EB' },
  ],
  database: [
    { name: 'MongoDB', percentage: 75, color: '#47A248' },
    { name: 'MySQL', percentage: 65, color: '#4479A1' },
    { name: 'Firebase', percentage: 60, color: '#FFCA28' },
  ],
  tools: [
    { name: 'Git', percentage: 85, color: '#F05032' },
    { name: 'GitHub', percentage: 85, color: '#94A3B8' },
    { name: 'Figma', percentage: 70, color: '#F24E1E' },
    { name: 'Postman', percentage: 80, color: '#FF6C37' },
    { name: 'VS Code', percentage: 95, color: '#007ACC' },
  ],
};

// Circular progress skills
export const circularSkills = [
  { name: 'HTML', percentage: 95, color: '#E34F26' },
  { name: 'CSS', percentage: 90, color: '#1572B6' },
  { name: 'JavaScript', percentage: 85, color: '#F7DF1E' },
  { name: 'React', percentage: 80, color: '#61DAFB' },
  { name: 'Node.js', percentage: 75, color: '#339933' },
  { name: 'MongoDB', percentage: 75, color: '#47A248' },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Responsive, fast, and modern websites built with the latest technologies.',
    features: ['Responsive Design', 'Cross-browser Compatible', 'SEO Optimized', 'Fast Loading'],
    color: '#2563EB',
  },
  {
    icon: '⚛️',
    title: 'Frontend Development',
    description: 'Beautiful, interactive React applications with smooth animations.',
    features: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Component Libraries'],
    color: '#7C3AED',
  },
  {
    icon: '🔧',
    title: 'Backend Development',
    description: 'Scalable, secure Node.js APIs and server-side applications.',
    features: ['REST APIs', 'Node.js/Express', 'Authentication', 'Database Integration'],
    color: '#06B6D4',
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Modern, user-centric interface designs with excellent user experience.',
    features: ['Figma Design', 'Wireframing', 'Prototyping', 'Design Systems'],
    color: '#F59E0B',
  },
  {
    icon: '🗄️',
    title: 'Database Design',
    description: 'Efficient MongoDB and MySQL database architecture and optimization.',
    features: ['MongoDB', 'MySQL', 'Schema Design', 'Query Optimization'],
    color: '#10B981',
  },
  {
    icon: '📁',
    title: 'Portfolio Creation',
    description: 'Professional portfolio websites that make a lasting impression.',
    features: ['Personal Branding', 'Project Showcase', 'Animations', 'SEO Ready'],
    color: '#EF4444',
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'Hospital Management System',
    description: 'A comprehensive C++ OOP-based hospital management system with patient records, appointments, and billing.',
    longDescription: 'Built with C++ using Object-Oriented Programming principles. Features include patient registration, appointment scheduling, doctor management, billing system, and file-based data persistence. Demonstrates strong programming fundamentals and data structure usage.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
    technologies: ['C++', 'OOP', 'File Handling', 'Data Structures'],
    github: 'https://github.com/aijazahmed',
    liveDemo: '',
    category: 'other',
    featured: true,
    duration: '2 Months',
    role: 'Solo Developer',
    status: 'Completed',
    features: ['Patient Management', 'Doctor Scheduling', 'Billing System', 'Report Generation'],
  },
  {
    id: 2,
    title: 'Gym Management System',
    description: 'A full-featured MERN stack gym management web app with membership management, trainer profiles, and workout plans.',
    longDescription: 'Built with MERN Stack. Features include member registration, subscription management, trainer booking, workout plan tracking, payment tracking dashboard, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    github: 'https://github.com/aijazahmed',
    liveDemo: 'https://gym-demo.vercel.app',
    category: 'fullstack',
    featured: true,
    duration: '3 Months',
    role: 'Full Stack Developer',
    status: 'Completed',
    features: ['Membership Management', 'Trainer Booking', 'Workout Plans', 'Payment Tracking'],
  },
  {
    id: 3,
    title: 'University Portal',
    description: 'A comprehensive full-stack university portal for students, faculty, and administration.',
    longDescription: 'A complete university management system with student enrollment, course management, grade tracking, faculty management, exam scheduling, and academic calendar management.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Bootstrap'],
    github: 'https://github.com/aijazahmed',
    liveDemo: '',
    category: 'fullstack',
    featured: true,
    duration: '4 Months',
    role: 'Full Stack Developer',
    status: 'Completed',
    features: ['Student Enrollment', 'Course Management', 'Grade Tracking', 'Exam Scheduling'],
  },
  {
    id: 4,
    title: 'E-Commerce Website',
    description: 'A complete MERN Stack e-commerce platform with product listings, cart, checkout, and order management.',
    longDescription: 'Full-featured e-commerce application with product catalog, advanced search & filter, shopping cart, secure Stripe checkout, order tracking, wishlist, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
    github: 'https://github.com/aijazahmed',
    liveDemo: 'https://ecommerce-demo.vercel.app',
    category: 'fullstack',
    featured: true,
    duration: '3 Months',
    role: 'Full Stack Developer',
    status: 'Completed',
    features: ['Product Catalog', 'Shopping Cart', 'Stripe Payments', 'Order Tracking', 'Admin Dashboard'],
  },
  {
    id: 5,
    title: 'AI Chatbot',
    description: 'An intelligent AI-powered chatbot integrated with OpenAI GPT API for natural conversations.',
    longDescription: 'A conversational AI chatbot built with React and Node.js, powered by OpenAI GPT API. Features real-time messaging, chat history, conversation export, and customizable AI personas.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    technologies: ['React', 'Node.js', 'OpenAI API', 'WebSockets', 'Tailwind CSS'],
    github: 'https://github.com/aijazahmed',
    liveDemo: 'https://ai-chatbot-demo.vercel.app',
    category: 'ai',
    featured: false,
    duration: '1 Month',
    role: 'Full Stack Developer',
    status: 'Completed',
    features: ['GPT Integration', 'Real-time Chat', 'History', 'Custom Personas'],
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export const experience = [
  {
    year: '2024',
    title: 'Started Web Development Journey',
    company: 'Self-Learning',
    description: 'Began learning HTML, CSS, JavaScript, and React. Built first responsive websites and interactive UIs.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    type: 'learning',
  },
  {
    year: '2025',
    title: 'Built Full Stack Projects',
    company: 'Air University — Personal Projects',
    description: 'Developed MERN stack applications including Hospital Management, Gym System, and University Portal.',
    skills: ['Node.js', 'Express', 'MongoDB', 'MERN Stack'],
    type: 'project',
  },
  {
    year: '2026',
    title: 'Advanced MERN & AI Development',
    company: 'Air University — Final Year',
    description: 'Working on advanced MERN applications, AI integration with OpenAI, and production deployment.',
    skills: ['Advanced React', 'AI/OpenAI', 'Production Deployment', 'System Design'],
    type: 'current',
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const education = [
  {
    degree: 'BS Computer Science',
    institution: 'Air University',
    location: 'Islamabad, Pakistan',
    duration: '2022 – 2026',
    cgpa: '3.5 / 4.0',
    status: 'In Progress',
    description: 'Studying core CS concepts including OOP, Data Structures, Algorithms, Database Systems, Web Technologies, and Software Engineering.',
    courses: ['Data Structures', 'OOP', 'Database Systems', 'Web Technologies', 'Software Engineering', 'AI Fundamentals'],
  },
];

// ─── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  {
    title: 'The Complete Web Development Bootcamp',
    issuer: 'Udemy',
    date: 'Jan 2024',
    credential: '#',
    icon: '🌐',
    color: '#2563EB',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'Mar 2024',
    credential: '#',
    icon: '⚡',
    color: '#F7DF1E',
  },
  {
    title: 'React – The Complete Guide',
    issuer: 'Udemy',
    date: 'Jun 2024',
    credential: '#',
    icon: '⚛️',
    color: '#61DAFB',
  },
  {
    title: 'Python for Everybody',
    issuer: 'Coursera',
    date: 'Aug 2024',
    credential: '#',
    icon: '🐍',
    color: '#3776AB',
  },
  {
    title: 'AI For Everyone',
    issuer: 'Coursera (DeepLearning.AI)',
    date: 'Nov 2024',
    credential: '#',
    icon: '🤖',
    color: '#7C3AED',
  },
  {
    title: 'MongoDB for Developers',
    issuer: 'MongoDB University',
    date: 'Feb 2025',
    credential: '#',
    icon: '🗄️',
    color: '#47A248',
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────
export const achievements = [
  { value: 10, suffix: '+', label: 'Projects Completed', icon: '🏆', color: '#F59E0B' },
  { value: 3, suffix: '', label: 'Hackathons Participated', icon: '🚀', color: '#2563EB' },
  { value: 5, suffix: '+', label: 'Competitions', icon: '🎯', color: '#7C3AED' },
  { value: 8, suffix: '+', label: 'University Events', icon: '🎓', color: '#06B6D4' },
  { value: 12, suffix: '+', label: 'Technical Workshops', icon: '🛠️', color: '#10B981' },
  { value: 100, suffix: '%', label: 'Dedication', icon: '💪', color: '#EF4444' },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    name: 'Dr. Muhammad Usman',
    role: 'Professor, Air University',
    feedback: 'Aijaz is one of the most dedicated students I have had. His understanding of software engineering principles and ability to apply them in real projects is exceptional.',
    rating: 5,
    avatar: 'MU',
  },
  {
    name: 'Ahmed Raza',
    role: 'Team Lead, Tech Project',
    feedback: 'Working with Aijaz was a pleasure. His React and Node.js skills are impressive, and he always delivers clean, well-documented code on time.',
    rating: 5,
    avatar: 'AR',
  },
  {
    name: 'Sara Malik',
    role: 'Client — Gym Management System',
    feedback: 'Aijaz built us a professional gym management system that exceeded our expectations. The UI is beautiful and the system works flawlessly.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'Bilal Khan',
    role: 'Fellow Developer',
    feedback: 'Aijaz has a great eye for design and a strong grasp of backend development. His MERN stack projects are clean and production-ready.',
    rating: 5,
    avatar: 'BK',
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export const blogs = [
  {
    id: 1,
    title: 'Getting Started with MERN Stack Development',
    excerpt: 'A complete guide to building full-stack applications with MongoDB, Express, React, and Node.js.',
    date: 'Mar 15, 2025',
    readTime: '8 min read',
    tags: ['MERN', 'React', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&q=80',
    slug: 'getting-started-mern',
  },
  {
    id: 2,
    title: 'Mastering React Hooks in 2025',
    excerpt: 'Deep dive into React Hooks — useState, useEffect, useContext, and how to write custom hooks.',
    date: 'Apr 10, 2025',
    readTime: '6 min read',
    tags: ['React', 'Hooks', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    slug: 'mastering-react-hooks',
  },
  {
    id: 3,
    title: 'Building Secure REST APIs with Node.js',
    excerpt: 'Best practices for building production-ready, secure APIs with Node.js, Express, and MongoDB.',
    date: 'May 5, 2025',
    readTime: '10 min read',
    tags: ['Node.js', 'Express', 'Security'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    slug: 'secure-rest-apis',
  },
];
