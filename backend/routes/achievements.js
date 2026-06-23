const express = require('express');
const router = express.Router();
const {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  seedAchievements,
} = require('../controllers/achievementController');
const verifyAdmin = require('../middleware/auth');
const { readLimiter } = require('../middleware/rateLimiter');

router.get('/', readLimiter, getAchievements);
router.get('/seed', seedAchievements);
router.get('/:id', readLimiter, getAchievementById);

// Admin-only write endpoints
router.post('/', verifyAdmin, createAchievement);
router.put('/:id', verifyAdmin, updateAchievement);
router.delete('/:id', verifyAdmin, deleteAchievement);

module.exports = router;
