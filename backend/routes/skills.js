const express = require('express');
const router = express.Router();
const {
  getSkills,
  seedSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const verifyAdmin = require('../middleware/auth');
const { readLimiter } = require('../middleware/rateLimiter');

router.get('/', readLimiter, getSkills);
router.get('/seed', seedSkills);

// Admin-only write endpoints
router.post('/', verifyAdmin, createSkill);
router.put('/:id', verifyAdmin, updateSkill);
router.delete('/:id', verifyAdmin, deleteSkill);

module.exports = router;
