const Skill = require('../models/Skill');

/**
 * GET /api/skills
 * Get all skills, optionally grouped by category
 */
const getSkills = async (req, res, next) => {
  try {
    const { category, grouped } = req.query;
    const filter = category ? { category } : {};

    const skills = await Skill.find(filter).sort({ category: 1, order: 1 }).lean();

    if (grouped === 'true') {
      const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {});
      return res.status(200).json({ success: true, data: groupedSkills });
    }

    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
};

// Seed default skills
const seedSkills = async (req, res, next) => {
  try {
    const count = await Skill.countDocuments();
    if (count > 0) return res.status(200).json({ success: true, message: 'Skills already seeded' });

    const defaultSkills = [
      // Frontend
      { name: 'HTML5', percentage: 95, category: 'frontend', color: '#E34F26', order: 1 },
      { name: 'CSS3', percentage: 90, category: 'frontend', color: '#1572B6', order: 2 },
      { name: 'JavaScript', percentage: 85, category: 'frontend', color: '#F7DF1E', order: 3 },
      { name: 'React.js', percentage: 80, category: 'frontend', color: '#61DAFB', order: 4 },
      { name: 'Tailwind CSS', percentage: 85, category: 'frontend', color: '#06B6D4', order: 5 },
      { name: 'Bootstrap', percentage: 88, category: 'frontend', color: '#7952B3', order: 6 },
      // Backend
      { name: 'Node.js', percentage: 75, category: 'backend', color: '#339933', order: 1 },
      { name: 'Express.js', percentage: 75, category: 'backend', color: '#000000', order: 2 },
      { name: 'REST API', percentage: 80, category: 'backend', color: '#2563EB', order: 3 },
      // Database
      { name: 'MongoDB', percentage: 75, category: 'database', color: '#47A248', order: 1 },
      { name: 'MySQL', percentage: 65, category: 'database', color: '#4479A1', order: 2 },
      { name: 'Firebase', percentage: 60, category: 'database', color: '#FFCA28', order: 3 },
      // Tools
      { name: 'Git', percentage: 85, category: 'tools', color: '#F05032', order: 1 },
      { name: 'GitHub', percentage: 85, category: 'tools', color: '#181717', order: 2 },
      { name: 'Figma', percentage: 70, category: 'tools', color: '#F24E1E', order: 3 },
      { name: 'Postman', percentage: 80, category: 'tools', color: '#FF6C37', order: 4 },
      { name: 'VS Code', percentage: 95, category: 'tools', color: '#007ACC', order: 5 },
    ];

    await Skill.insertMany(defaultSkills);
    res.status(201).json({ success: true, message: 'Skills seeded successfully' });
  } catch (error) {
    next(error);
  }
};

// POST /api/skills
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error) {
    next(error);
  }
};

// PUT /api/skills/:id
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, message: 'Skill updated successfully', data: skill });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/skills/:id
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    res.status(200).json({ success: true, message: 'Skill deleted successfully', data: skill });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  seedSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
