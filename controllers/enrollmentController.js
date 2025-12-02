const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Payment = require('../models/Payment');
const User = require('../models/User');

// @desc    Get user enrollments
// @route   GET /api/enrollments
// @access  Private
exports.getEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate('course', 'title description duration image')
      .populate('payment', 'amount status paymentMethod')
      .sort({ enrolledAt: -1 });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
// @access  Private
exports.getEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('course')
      .populate('payment');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Make sure user owns this enrollment
    if (enrollment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this enrollment'
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create enrollment (after payment)
// @route   POST /api/enrollments
// @access  Private
exports.createEnrollment = async (req, res, next) => {
  try {
    const { courseId, paymentId } = req.body;

    const course = await Course.findById(courseId);
    if (!course || !course.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: req.user.id,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Verify payment if paymentId is provided
    if (paymentId) {
      const payment = await Payment.findById(paymentId);
      if (!payment || payment.status !== 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Invalid or incomplete payment'
        });
      }
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId,
      payment: paymentId,
      status: paymentId ? 'active' : 'pending'
    });

    // Update user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        enrolledCourses: {
          course: courseId,
          enrolledAt: new Date(),
          status: 'active'
        }
      }
    });

    // Update course enrollment count
    course.enrolledCount += 1;
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enrollment status
// @route   PUT /api/enrollments/:id
// @access  Private
exports.updateEnrollment = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Only user or admin can update
    if (enrollment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    enrollment.status = req.body.status || enrollment.status;
    if (req.body.status === 'completed') {
      enrollment.completedAt = new Date();
    }
    await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};


