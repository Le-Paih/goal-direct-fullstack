const express = require('express');
const kitController = require('../controllers/kitController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(kitController.getAllKits).post();

router
  .route('/:id')
  .get(kitController.getKit)
  .patch(authController.protect, kitController.updateKit)
  .delete(authController.protect, kitController.deleteKit);

module.exports = router;
