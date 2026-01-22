const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const paymentService = require("./payment.service");

exports.initiatePayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  console.log("REQ BODY ", req.body);
  console.log("ORDER ID ", req.body.orderId);
  console.log("TYPE ", typeof req.body.orderId);

  const data = await paymentService.initiate(
    orderId,
    req.user.id
  );

  res.status(200).json(
    new ApiResponse(200, data, "Payment initiated")
  );
});

exports.verifyPayment = asyncHandler(async (req, res) => {
  const data = await paymentService.verify(req.body);

  res.status(200).json(
    new ApiResponse(200, data, "Payment successful")
  );
});
