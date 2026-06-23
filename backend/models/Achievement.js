const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: [true, 'Value is required'],
    },
    suffix: {
      type: String,
      default: '',
      trim: true,
    },
    label: {
      type: String,
      required: [true, 'Label is required'],
      trim: true,
      maxlength: [100, 'Label too long'],
    },
    icon: {
      type: String,
      default: '',
      trim: true,
    },
    color: {
      type: String,
      default: '#EF4444',
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

achievementSchema.index({ order: 1 });

module.exports = mongoose.model('Achievement', achievementSchema);
