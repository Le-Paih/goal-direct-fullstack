const express = require('express');
const {
  createCheckoutSession,
  getCheckoutSession,
} = require('../controllers/checkoutController');

const router = express.Router();

router.route('/create-checkout-session').post(createCheckoutSession);

router.route('/session/:id').get(getCheckoutSession);
module.exports = router;
