const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const cartService = require("./cart.service");



exports.addToCart = asyncHandler(async (req, res) => {
  const data = await cartService.addToCart(req.user.id, req.body);
  res.status(201).json(new ApiResponse(201, data, "Item added to cart"));
});


exports.getCart = asyncHandler(async (req, res) => {
  const data = await cartService.getCart(req.user.id);
  res.status(200).json(new ApiResponse(200, data, "Cart fetched successfully"));
});


exports.updateCartItem = asyncHandler(async (req, res) => {
  const { productId, variantLabel, quantity } = req.body;
  const data = await cartService.updateCartItem( req.user.id, productId, variantLabel, quantity );
  res.status(200).json(new ApiResponse(200, data, "Cart updated sucessfully"));
});


exports.removeItem = asyncHandler(async (req, res) => {
  const { productId, variantLabel } = req.body;
  const data = await cartService.removeItem(req.user.id,productId,variantLabel );
  res.status(200).json(new ApiResponse(200, data, "Item removed successfully"));
});


exports.clearCart = asyncHandler(async (req, res) => {
  const data = await cartService.clearCart(req.user.id);
  res.status(200).json(new ApiResponse(200, data, "Cart cleared successfully"));
});

