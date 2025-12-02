const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createPayment);
router.get('/', getPayments);
router.get('/:id', getPayment);

module.exports = router;


