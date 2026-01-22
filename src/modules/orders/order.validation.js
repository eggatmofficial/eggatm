const ApiError = require("../utils/ApiError");

exports.cartCheckoutValidation = (req, res, next) => {
  const { address, items } = req.body;

  if (!address) {
    throw new ApiError("Address is required", 400);
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new ApiError("No items selected for checkout", 400);
  }

  next();
};


exports.buyNowValidation = (req, res, next) => {
   console.log("BUY-NOW BODY ", req.body);
  const { productId, variantLabel, quantity, address } = req.body;

  if (!productId || !variantLabel || !quantity || !address) {
    throw new ApiError("Missing buy-now fields", 400);
  }

  next();
};
