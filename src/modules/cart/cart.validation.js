const ApiError = require("../utils/ApiError");


exports.addToCartValidation = (req, res, next) => {
  const { productId, variantLabel, quantity } = req.body;

  if (!productId) throw new ApiError("Product ID is required", 400);
  if (!variantLabel) throw new ApiError("Variant is required", 400);
  if (!quantity || quantity < 1)
    throw new ApiError("Quantity must be at least 1", 400);

  next();
};
