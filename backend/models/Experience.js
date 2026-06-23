const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, 'Year is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title too long'],
    },
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
      maxlength: [150, 'Company name too long'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description too long'],
    },
    skills: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ['learning', 'project', 'current', 'work'],
      default: 'work',
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

experienceSchema.index({ order: 1, year: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
