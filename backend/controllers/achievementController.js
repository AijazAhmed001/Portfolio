const Achievement = require('../models/Achievement');

// GET /api/achievements
const getAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1 }).lean();
    res.status(200).json({ success: true, count: achievements.length, data: achievements });
  } catch (error) {
    next(error);
  }
};

// GET /api/achievements/:id
const getAchievementById = async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id).lean();
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.status(200).json({ success: true, data: achievement });
  } catch (error) {
    next(error);
  }
};

// POST /api/achievements
const createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json({ success: true, message: 'Achievement created successfully', data: achievement });
  } catch (error) {
    next(error);
  }
};

// PUT /api/achievements/:id
const updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.status(200).json({ success: true, message: 'Achievement updated successfully', data: achievement });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/achievements/:id
const deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.status(200).json({ success: true, message: 'Achievement deleted successfully', data: achievement });
  } catch (error) {
    next(error);
  }
};

// Seed initial achievements
const seedAchievements = async (req, res, next) => {
  try {
    const count = await Achievement.countDocuments();
    if (count > 0) return res.status(200).json({ success: true, message: 'Achievements already seeded' });

    const defaultAchievements = [
      { value: 10, suffix: '+', label: 'Projects Completed', icon: '🏆', color: '#F59E0B', order: 1 },
      { value: 3, suffix: '', label: 'Hackathons Participated', icon: '🚀', color: '#2563EB', order: 2 },
      { value: 5, suffix: '+', label: 'Competitions', icon: '🎯', color: '#7C3AED', order: 3 },
      { value: 8, suffix: '+', label: 'University Events', icon: '🎓', color: '#06B6D4', order: 4 },
      { value: 12, suffix: '+', label: 'Technical Workshops', icon: '🛠️', color: '#10B981', order: 5 },
      { value: 100, suffix: '%', label: 'Dedication', icon: '💪', color: '#EF4444', order: 6 },
    ];

    await Achievement.insertMany(defaultAchievements);
    res.status(201).json({ success: true, message: 'Achievements seeded successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  seedAchievements,
};
