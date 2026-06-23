const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

/**
 * POST /api/contact
 * Submit a new contact message
 */
const submitContact = async (req, res, next) => {
  try {
    // Check validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, subject, message } = req.body;

    // Capture IP for spam tracking
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.connection?.remoteAddress ||
      'unknown';

    const contact = await Contact.create({ name, email, subject, message, ip });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: { id: contact._id, createdAt: contact.createdAt },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/contact
 * Get all contact messages (admin only — add auth middleware in production)
 */
const getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/contact/:id — delete spam or old messages (admin only)
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully', data: contact });
  } catch (error) {
    next(error);
  }
};

// PUT /api/contact/:id/read — mark as read/unread (admin only)
const toggleContactRead = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    contact.read = !contact.read;
    await contact.save();
    res.status(200).json({ success: true, message: `Message marked as ${contact.read ? 'read' : 'unread'}`, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts, deleteContact, toggleContactRead };
