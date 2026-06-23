const Experience = require('../models/Experience');

// GET /api/experiences
const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, year: -1 }).lean();
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    next(error);
  }
};

// GET /api/experiences/:id
const getExperienceById = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id).lean();
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    next(error);
  }
};

// POST /api/experiences
const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, message: 'Experience created successfully', data: experience });
  } catch (error) {
    next(error);
  }
};

// PUT /api/experiences/:id
const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience updated successfully', data: experience });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/experiences/:id
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }
    res.status(200).json({ success: true, message: 'Experience deleted successfully', data: experience });
  } catch (error) {
    next(error);
  }
};

// Seed initial experiences
const seedExperiences = async (req, res, next) => {
  try {
    const count = await Experience.countDocuments();
    if (count > 0) return res.status(200).json({ success: true, message: 'Experiences already seeded' });

    const defaultExperiences = [
      {
        year: '2024',
        title: 'Started Web Development Journey',
        company: 'Self-Learning',
        description: 'Began learning HTML, CSS, JavaScript, and React. Built first responsive websites and UIs.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        type: 'learning',
        order: 1,
      },
      {
        year: '2025',
        title: 'Built Full Stack Projects',
        company: 'Air University — Personal Projects',
        description: 'Developed MERN stack applications including Hospital Management, Gym System, and University Portal.',
        skills: ['Node.js', 'Express', 'MongoDB', 'MERN Stack'],
        type: 'project',
        order: 2,
      },
      {
        year: '2026',
        title: 'Advanced MERN & AI Development',
        company: 'Air University — Final Year',
        description: 'Working on advanced MERN applications, AI integration with OpenAI, and production deployment.',
        skills: ['Advanced React', 'AI/OpenAI', 'Production Deployment', 'System Design'],
        type: 'current',
        order: 3,
      },
    ];

    await Experience.insertMany(defaultExperiences);
    res.status(201).json({ success: true, message: 'Experiences seeded successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  seedExperiences,
};
