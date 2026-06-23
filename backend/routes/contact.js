const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  deleteContact,
  toggleContactRead,
} = require('../controllers/contactController');
const verifyAdmin = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');

// Validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ min: 3, max: 200 }).withMessage('Subject must be 3-200 characters'),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
];

// POST /api/contact — submit form (rate limited + validated)
router.post('/', contactLimiter, contactValidation, submitContact);

// Admin-only endpoints
router.get('/', verifyAdmin, getContacts);
router.put('/:id/read', verifyAdmin, toggleContactRead);
router.delete('/:id', verifyAdmin, deleteContact);

module.exports = router;
