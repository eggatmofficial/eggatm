const catchAsync = require("../utils/asyncHandler");
const newsletterService = require("./newsletter.service");
const { subscribeNewsletterSchema } = require("./newsletter.validation");

exports.subscribeNewsletter = catchAsync(async (req, res) => {
  const { error, value } = subscribeNewsletterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const result = await newsletterService.subscribe(value);

  res.status(201).json({
    success: true,
    message: result.message,
  });
});

exports.unsubscribeNewsletter = catchAsync(async (req, res) => {
  const { email } = req.body;

  const result = await newsletterService.unsubscribe(email);

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

exports.getAllSubscribers = catchAsync(async (req, res) => {
  const subscribers = await newsletterService.getAllSubscribers();

  res.status(200).json({
    success: true,
    data: subscribers,
  });
});
