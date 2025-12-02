const express = require('express');
const router = express.Router();
const {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  applyForInternship,
  searchInternships
} = require('../controllers/internshipController');
const { protect, authorize } = require('../middleware/auth');

router.get('/search', searchInternships);
router.get('/', getInternships);
router.get('/:id', getInternship);
router.post('/', protect, authorize('admin'), createInternship);
router.put('/:id', protect, authorize('admin'), updateInternship);
router.delete('/:id', protect, authorize('admin'), deleteInternship);
router.post('/:id/apply', protect, applyForInternship);

module.exports = router;


