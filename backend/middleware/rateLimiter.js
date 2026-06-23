const rateLimit = require('express-rate-limit');

// General API limiter — 100 req per 15 min per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  skip: (req) => process.env.NODE_ENV === 'test',
});

// Contact form limiter — 5 per 10 minutes per IP (anti-spam)
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact form submissions. Please wait 10 minutes.',
  },
  skip: (req) => process.env.NODE_ENV === 'test',
});

// Read-only API limiter — 200 req per 15 min per IP (generous for portfolio reads)
const readLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please slow down.',
  },
  skip: (req) => process.env.NODE_ENV === 'test',
});

module.exports = { generalLimiter, contactLimiter, readLimiter };
