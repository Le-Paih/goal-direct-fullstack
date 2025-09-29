const express = require('express');
const bootController = require('../controllers/bootController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(bootController.getAllBoots).post();

router
  .route('/:id')
  .get(bootController.getBoot)
  .patch(authController.protect, bootController.updateBoot)
  .delete(authController.protect, bootController.deleteBoot);

module.exports = router;
