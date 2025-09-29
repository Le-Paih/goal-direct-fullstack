const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(cartController.viewCart);

router.route('/add').post(cartController.addItemToCart);

router.route('/update').put(cartController.updateCartItem);

router.route('/remove').delete(cartController.removeItemFromCart);

router.route('/clear').post(cartController.clearCart);

module.exports = router;
