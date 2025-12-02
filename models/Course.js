const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description']
  },
  duration: {
    type: String,
    required: [true, 'Please provide course duration']
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please provide original price']
  },
  discountedPrice: {
    type: Number,
    required: [true, 'Please provide discounted price']
  },
  badge: {
    type: String,
    enum: ['Bestseller', 'Popular', 'Hot', 'New', 'Essential', 'Trending', null],
    default: null
  },
  image: {
    type: String,
    default: '💻'
  },
  category: {
    type: String,
    required: [true, 'Please provide a category']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);


