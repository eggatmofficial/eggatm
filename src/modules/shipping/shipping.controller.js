const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const service = require("./shipping.service");

exports.createShippingPrice = asyncHandler(async (req, res) => {
  const price = await service.create(req.body);
  res.status(201).json(new ApiResponse(201, price, "Shipping price created"));
});

exports.getShippingPrices = asyncHandler(async (req, res) => {
  const prices = await service.getAll();
  res.status(200).json(new ApiResponse(200, prices, "Shipping prices fetched"));
});

exports.updateShippingPrice = asyncHandler(async (req, res) => {
  const price = await service.update(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, price, "Shipping price updated"));
});

exports.deleteShippingPrice = asyncHandler(async (req, res) => {
  await service.delete(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Shipping price deleted"));
});

exports.estimateShipping = asyncHandler(async (req, res) => {
  const result = await service.estimateShipping(req.body);

  res.status(200).json(
    new ApiResponse(200, result, "Shipping estimated")
  );
});
