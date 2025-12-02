const Internship = require('../models/Internship');
const InternshipApplication = require('../models/InternshipApplication');

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
exports.getInternships = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    const internships = await Internship.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single internship
// @route   GET /api/internships/:id
// @access  Public
exports.getInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship || !internship.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.status(200).json({
      success: true,
      data: internship
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create internship
// @route   POST /api/internships
// @access  Private/Admin
exports.createInternship = async (req, res, next) => {
  try {
    const internship = await Internship.create(req.body);

    res.status(201).json({
      success: true,
      data: internship
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update internship
// @route   PUT /api/internships/:id
// @access  Private/Admin
exports.updateInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
        runValidators: true
      }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    res.status(200).json({
      success: true,
      data: internship
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
// @access  Private/Admin
exports.deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    internship.isActive = false;
    await internship.save();

    res.status(200).json({
      success: true,
      message: 'Internship deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply for internship
// @route   POST /api/internships/:id/apply
// @access  Private
exports.applyForInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship || !internship.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }

    // Check if user already applied
    const existingApplication = await InternshipApplication.findOne({
      user: req.user.id,
      internship: req.params.id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this internship'
      });
    }

    // Create application
    const application = await InternshipApplication.create({
      user: req.user.id,
      internship: req.params.id,
      resume: req.body.resume,
      coverLetter: req.body.coverLetter
    });

    // Update internship applied count
    internship.appliedCount += 1;
    await internship.save();

    // Update user's applied internships
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        appliedInternships: {
          internship: req.params.id,
          appliedAt: new Date(),
          status: 'pending'
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search internships
// @route   GET /api/internships/search?q=query
// @access  Public
exports.searchInternships = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    
    const internships = await Internship.find({
      isActive: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    next(error);
  }
};


