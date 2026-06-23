const express = require('express');
const router = express.Router();
const {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
  seedExperiences,
} = require('../controllers/experienceController');
const verifyAdmin = require('../middleware/auth');
const { readLimiter } = require('../middleware/rateLimiter');

router.get('/', readLimiter, getExperiences);
router.get('/seed', seedExperiences);
router.get('/:id', readLimiter, getExperienceById);

// Admin-only write endpoints
router.post('/', verifyAdmin, createExperience);
router.put('/:id', verifyAdmin, updateExperience);
router.delete('/:id', verifyAdmin, deleteExperience);

module.exports = router;
