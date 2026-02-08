const catchAsync = require("../utils/asyncHandler");
const franchiseService = require("./franchise.service");
const {
  createFranchiseSchema,
  updateFranchiseSchema,
} = require("./franchise.validation");

exports.createFranchise = catchAsync(async (req, res) => {
  const { error, value } = createFranchiseSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const franchise = await franchiseService.create(value);

  res.status(201).json({
    success: true,
    data: franchise,
  });
});

exports.updateFranchise = catchAsync(async (req, res) => {
  const { error, value } = updateFranchiseSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const franchise = await franchiseService.update(req.params.id, value);

  res.status(200).json({
    success: true,
    data: franchise,
  });
});

exports.getAllFranchises = catchAsync(async (req, res) => {
  const franchises = await franchiseService.getAll(req.query);

  res.status(200).json({
    success: true,
    data: franchises,
  });
});

exports.getActiveFranchises = catchAsync(async (req, res) => {
  const franchises = await franchiseService.getActive();

  res.status(200).json({
    success: true,
    data: franchises,
  });
});

exports.toggleFranchiseStatus = catchAsync(async (req, res) => {
  const franchise = await franchiseService.toggleStatus(req.params.id);

  res.status(200).json({
    success: true,
    data: franchise,
  });
});



exports.deleteFranchise = catchAsync(async (req, res) => {
  const result = await franchiseService.deleteFranchise(req.params.id);

  res.status(200).json({
    success: true,
    message: result.message,
    deletedId: result.id,
  });
});
