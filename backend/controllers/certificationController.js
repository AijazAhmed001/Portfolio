const Certification = require('../models/Certification');

// GET /api/certifications
const getCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({ order: 1 }).lean();
    res.status(200).json({ success: true, count: certifications.length, data: certifications });
  } catch (error) {
    next(error);
  }
};

// GET /api/certifications/:id
const getCertificationById = async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id).lean();
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, data: certification });
  } catch (error) {
    next(error);
  }
};

// POST /api/certifications
const createCertification = async (req, res, next) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({ success: true, message: 'Certification created successfully', data: certification });
  } catch (error) {
    next(error);
  }
};

// PUT /api/certifications/:id
const updateCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, message: 'Certification updated successfully', data: certification });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/certifications/:id
const deleteCertification = async (req, res, next) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) {
      return res.status(404).json({ success: false, message: 'Certification not found' });
    }
    res.status(200).json({ success: true, message: 'Certification deleted successfully', data: certification });
  } catch (error) {
    next(error);
  }
};

// Seed initial certifications
const seedCertifications = async (req, res, next) => {
  try {
    const count = await Certification.countDocuments();
    if (count > 0) return res.status(200).json({ success: true, message: 'Certifications already seeded' });

    const defaultCertifications = [
      {
        title: 'The Complete Web Development Bootcamp',
        issuer: 'Udemy',
        date: 'Jan 2024',
        credential: 'https://udemy.com/certificate/example',
        icon: '🌐',
        color: '#2563EB',
        order: 1,
      },
      {
        title: 'JavaScript Algorithms and Data Structures',
        issuer: 'freeCodeCamp',
        date: 'Mar 2024',
        credential: 'https://freecodecamp.org/certification/example',
        icon: '⚡',
        color: '#F7DF1E',
        order: 2,
      },
      {
        title: 'React – The Complete Guide',
        issuer: 'Udemy',
        date: 'Jun 2024',
        credential: 'https://udemy.com/certificate/example2',
        icon: '⚛️',
        color: '#61DAFB',
        order: 3,
      },
      {
        title: 'Python for Everybody',
        issuer: 'Coursera',
        date: 'Aug 2024',
        credential: 'https://coursera.org/verify/example',
        icon: '🐍',
        color: '#3776AB',
        order: 4,
      },
      {
        title: 'AI For Everyone',
        issuer: 'Coursera (DeepLearning.AI)',
        date: 'Nov 2024',
        credential: 'https://coursera.org/verify/example2',
        icon: '🤖',
        color: '#7C3AED',
        order: 5,
      },
      {
        title: 'MongoDB for Developers',
        issuer: 'MongoDB University',
        date: 'Feb 2025',
        credential: 'https://university.mongodb.com/course/completion',
        icon: '🗄️',
        color: '#47A248',
        order: 6,
      },
    ];

    await Certification.insertMany(defaultCertifications);
    res.status(201).json({ success: true, message: 'Certifications seeded successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
  seedCertifications,
};
