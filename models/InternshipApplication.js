const mongoose = require('mongoose');

const internshipApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  resume: {
    type: String // URL to resume file
  },
  coverLetter: {
    type: String
  }
});

// Prevent duplicate applications
internshipApplicationSchema.index({ user: 1, internship: 1 }, { unique: true });

module.exports = mongoose.model('InternshipApplication', internshipApplicationSchema);


