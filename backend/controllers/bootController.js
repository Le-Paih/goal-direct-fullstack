const catchAsync = require('../utils/catchAsync');
const Boot = require('../models/bootModel');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getBoot = catchAsync(async (req, res, next) => {
  let query = Boot.findById(req.params.id);
  const boot = await query;

  if (!boot) {
    return next(new AppError('No boot found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      boot,
    },
  });
});

exports.getAllBoots = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.bootId) filter = { boot: req.params.bootId };

  const features = new APIFeatures(Boot.find(filter), req.query).paginate();
  const boots = await features.query;

  res.status(200).json({
    status: 'success',
    results: boots.length,
    data: {
      boots,
    },
  });
});

exports.createBoot = catchAsync(async (req, res, next) => {
  const boot = await Boot.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      boot,
    },
  });
});

exports.updateBoot = catchAsync(async (req, res, next) => {
  const boot = await Boot.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!boot) {
    return next(new AppError('No boot found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      boot,
    },
  });
});

exports.deleteBoot = catchAsync(async (req, res, next) => {
  const boot = await Boot.findByIdAndDelete(req.params.id);

  if (!boot) {
    return next(new AppError('No boot found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: {
      boot,
    },
  });
});
