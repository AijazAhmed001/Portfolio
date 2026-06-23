const express = require('express');
const router = express.Router();
const {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
  seedCertifications,
} = require('../controllers/certificationController');
const verifyAdmin = require('../middleware/auth');
const { readLimiter } = require('../middleware/rateLimiter');

router.get('/', readLimiter, getCertifications);
router.get('/seed', seedCertifications);
router.get('/:id', readLimiter, getCertificationById);

// Admin-only write endpoints
router.post('/', verifyAdmin, createCertification);
router.put('/:id', verifyAdmin, updateCertification);
router.delete('/:id', verifyAdmin, deleteCertification);

module.exports = router;
