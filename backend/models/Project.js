const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [150, 'Title too long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description too long'],
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: [5000, 'Long description too long'],
    },
    image: {
      type: String,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: '',
    },
    liveDemo: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['fullstack', 'frontend', 'backend', 'ai', 'mobile', 'other'],
      default: 'fullstack',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'Full Stack Developer',
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
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

projectSchema.index({ featured: -1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);
