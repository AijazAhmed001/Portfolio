const Project = require('../models/Project');

/**
 * GET /api/projects
 * Get all projects (with optional category filter)
 */
const getProjects = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category && category !== 'all') filter.category = category;
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/projects/:id
 * Get single project by ID
 */
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

// Seed default projects if DB is empty
const seedProjects = async (req, res, next) => {
  try {
    const count = await Project.countDocuments();
    if (count > 0) {
      return res.status(200).json({ success: true, message: 'Projects already seeded' });
    }

    const defaultProjects = [
      {
        title: 'Hospital Management System',
        description: 'A comprehensive C++ OOP-based hospital management system with patient records, doctor management, and billing.',
        longDescription: 'Built with C++ using Object-Oriented Programming principles. Features include patient registration, appointment scheduling, doctor management, billing system, and file-based data persistence.',
        technologies: ['C++', 'OOP', 'File Handling', 'Data Structures'],
        category: 'other',
        github: 'https://github.com/aijazahmed',
        liveDemo: '',
        featured: true,
        duration: '2 Months',
        role: 'Full Stack Developer',
        status: 'completed',
        order: 1,
      },
      {
        title: 'Gym Management System',
        description: 'A full-featured gym management web app with membership management, trainer profiles, and workout plans.',
        longDescription: 'Built with MERN Stack. Features include member registration, subscription management, trainer booking, workout plan tracking, and payment tracking dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
        category: 'fullstack',
        github: 'https://github.com/aijazahmed',
        liveDemo: 'https://gym-management-demo.vercel.app',
        featured: true,
        duration: '3 Months',
        role: 'Full Stack Developer',
        status: 'completed',
        order: 2,
      },
      {
        title: 'University Portal',
        description: 'A full-stack university portal for students, faculty, and administration with course management and grades.',
        longDescription: 'A comprehensive university management system with student enrollment, course management, grade tracking, faculty management, and exam scheduling.',
        technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Bootstrap'],
        category: 'fullstack',
        github: 'https://github.com/aijazahmed',
        liveDemo: '',
        featured: true,
        duration: '4 Months',
        role: 'Full Stack Developer',
        status: 'completed',
        order: 3,
      },
      {
        title: 'E-Commerce Website',
        description: 'A complete MERN Stack e-commerce platform with product listings, cart, checkout, and order management.',
        longDescription: 'Full-featured e-commerce application with product catalog, search & filter, shopping cart, secure checkout, order tracking, and admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        category: 'fullstack',
        github: 'https://github.com/aijazahmed',
        liveDemo: 'https://ecommerce-demo.vercel.app',
        featured: true,
        duration: '3 Months',
        role: 'Full Stack Developer',
        status: 'completed',
        order: 4,
      },
      {
        title: 'AI Chatbot',
        description: 'An intelligent AI-powered chatbot integrated with OpenAI GPT API for natural language conversations.',
        longDescription: 'A conversational AI chatbot built with React and Node.js, powered by OpenAI GPT API. Features real-time messaging, chat history, and customizable personas.',
        technologies: ['React', 'Node.js', 'OpenAI API', 'WebSockets', 'TailwindCSS'],
        category: 'ai',
        github: 'https://github.com/aijazahmed',
        liveDemo: 'https://ai-chatbot-demo.vercel.app',
        featured: false,
        duration: '1 Month',
        role: 'Full Stack Developer',
        status: 'completed',
        order: 5,
      },
    ];

    await Project.insertMany(defaultProjects);
    res.status(201).json({ success: true, message: 'Projects seeded successfully' });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, message: 'Project deleted successfully', data: project });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  seedProjects,
  createProject,
  updateProject,
  deleteProject,
};
