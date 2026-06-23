const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title too long'],
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
      maxlength: [150, 'Issuer too long'],
    },
    date: {
      type: String,
      default: '',
      trim: true,
    },
    credential: {
      type: String,
      default: '',
      trim: true,
    },
    icon: {
      type: String,
      default: '🌐',
      trim: true,
    },
    color: {
      type: String,
      default: '#2563EB',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

certificationSchema.index({ order: 1 });

module.exports = mongoose.model('Certification', certificationSchema);
