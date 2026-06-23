const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogBySlug,
  seedBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const verifyAdmin = require('../middleware/auth');
const { readLimiter } = require('../middleware/rateLimiter');

router.get('/', readLimiter, getBlogs);
router.get('/seed', seedBlogs);
router.get('/:slug', readLimiter, getBlogBySlug);

// Admin-only write endpoints (using id for updates and deletes)
router.post('/', verifyAdmin, createBlog);
router.put('/:id', verifyAdmin, updateBlog);
router.delete('/:id', verifyAdmin, deleteBlog);

module.exports = router;
