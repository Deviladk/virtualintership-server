const express = require('express');
const router = express.Router();
const {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment
} = require('../controllers/enrollmentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getEnrollments);
router.get('/:id', getEnrollment);
router.post('/', createEnrollment);
router.put('/:id', updateEnrollment);

module.exports = router;


