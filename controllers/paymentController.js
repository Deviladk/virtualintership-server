const Payment = require('../models/Payment');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Create payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res, next) => {
  try {
    const { courseId, paymentMethod, paymentDetails } = req.body;

    const course = await Course.findById(courseId);
    if (!course || !course.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const amount = course.discountedPrice;
    const originalAmount = course.originalPrice;
    const discount = originalAmount - amount;

    // Create payment record
    const payment = await Payment.create({
      user: req.user.id,
      course: courseId,
      amount,
      originalAmount,
      discount,
      paymentMethod,
      paymentDetails,
      status: 'completed', // In production, this would be handled by payment gateway
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      paidAt: new Date()
    });

    // Create enrollment automatically after payment
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: courseId,
      payment: payment._id,
      status: 'active'
    });

    // Update user's enrolled courses
    const User = require('../models/User');
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
      message: 'Payment successful and enrollment completed',
      data: {
        payment,
        enrollment
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user payments
// @route   GET /api/payments
// @access  Private
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('course', 'title description image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single payment
// @route   GET /api/payments/:id
// @access  Private
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('course')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Make sure user owns this payment
    if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this payment'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};


