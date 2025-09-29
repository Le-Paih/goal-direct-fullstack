const catchAsync = require('../utils/catchAsync');
const Kit = require('../models/kitModel');
const AppError = require('../utils/appError');

exports.getKit = catchAsync(async (req, res, next) => {
  let query = Kit.findById(req.params.id);
  const kit = await query;

  if (!kit) {
    return next(new AppError('No kit found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      kit,
    },
  });
});

exports.getAllKits = catchAsync(async (req, res, next) => {
  const kits = await Kit.find();

  res.status(200).json({
    status: 'success',
    results: kits.length,
    data: {
      kits,
    },
  });
});

exports.createKit = catchAsync(async (req, res, next) => {
  const kit = await Kit.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      kit,
    },
  });
});

exports.updateKit = catchAsync(async (req, res, next) => {
  const kit = await Kit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!kit) {
    return next(new AppError('No kit found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      kit,
    },
  });
});

exports.deleteKit = catchAsync(async (req, res, next) => {
  const kit = await Kit.findByIdAndDelete(req.params.id);

  if (!kit) {
    return next(new AppError('No kit found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
