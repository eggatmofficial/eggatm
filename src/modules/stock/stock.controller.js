const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const stockService = require("./stock.service");

exports.getAllStock = asyncHandler(async (req, res) => {
  const data = await stockService.getAllStock();
  res.json(new ApiResponse(200, data));
});

exports.addVariant = asyncHandler(async (req, res) => {
  const product = await stockService.addVariant(
    req.params.productId,
    req.body
  );
  res.json(new ApiResponse(201, product, "Variant added"));
});

exports.updateStock = asyncHandler(async (req, res) => {
  const { label, stock } = req.body;

  await stockService.updateStock(
    req.params.productId,
    label,
    stock
  );

  res.json(new ApiResponse(200, null, "Stock updated"));
});

exports.deleteVariant = asyncHandler(async (req, res) => {
  const { label } = req.body;

  await stockService.deleteVariant(
    req.params.productId,
    label
  );

  res.json(new ApiResponse(200, null, "Variant removed"));
});

exports.lowStock = asyncHandler(async (req, res) => {
  const data = await stockService.getLowStock();
  res.json(new ApiResponse(200, data));
});
