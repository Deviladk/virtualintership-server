const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an internship title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide an internship description']
  },
  duration: {
    type: String,
    required: [true, 'Please provide internship duration']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Web Development', 'Android Development', 'Data Science', 'Java Programming', 'Mobile App Development', 'Digital Marketing']
  },
  badge: {
    type: String,
    enum: ['Popular', 'Hot', 'New', 'Trending', null],
    default: null
  },
  image: {
    type: String,
    default: '🌐'
  },
  positionsAvailable: {
    type: Number,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  price: {
    type: String,
    default: 'Free'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  appliedCount: {
    type: Number,
    default: 0
  },
  requirements: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Internship', internshipSchema);


