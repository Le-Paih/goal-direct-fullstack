const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
