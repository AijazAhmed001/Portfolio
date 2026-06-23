const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  seedProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const verifyAdmin = require('../middleware/auth');
const { readLimiter } = require('../middleware/rateLimiter');

router.get('/', readLimiter, getProjects);
router.get('/seed', seedProjects);
router.get('/:id', readLimiter, getProjectById);

// Admin-only write endpoints
router.post('/', verifyAdmin, createProject);
router.put('/:id', verifyAdmin, updateProject);
router.delete('/:id', verifyAdmin, deleteProject);

module.exports = router;
