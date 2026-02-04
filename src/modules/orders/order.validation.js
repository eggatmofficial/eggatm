// const ApiError = require("../utils/ApiError");

// exports.cartCheckoutValidation = (req, res, next) => {
//   const { address, items } = req.body;

//   if (!address) {
//     throw new ApiError("Address is required", 400);
//   }

//   if (!items || !Array.isArray(items) || items.length === 0) {
//     throw new ApiError("No items selected for checkout", 400);
//   }

//   next();
// };


// exports.buyNowValidation = (req, res, next) => {
//    console.log("BUY-NOW BODY ", req.body);
//   const { productId, variantLabel, quantity, address } = req.body;

//   if (!productId || !variantLabel || !quantity || !address) {
//     throw new ApiError("Missing buy-now fields", 400);
//   }

//   next();
// };






const ApiError = require("../utils/ApiError");

const ALLOWED_SHIPPING_METHODS = ["COURIER", "TRANSPORT", "PICKUP"];

exports.cartCheckoutValidation = (req, res, next) => {
  const { address, items, shippingMethod } = req.body;
   console.log("🧾 CHECKOUT BODY:", req.body);

  if (!address) {
    throw new ApiError("Address is required", 400);
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError("No items selected for checkout", 400);
  }

  if (
    typeof shippingMethod !== "string" ||
    !ALLOWED_SHIPPING_METHODS.includes(shippingMethod.trim())
  ) {
    throw new ApiError("Valid shipping method is required", 400);
  }

  // normalize
  req.body.shippingMethod = shippingMethod.trim();

  next();
};

exports.buyNowValidation = (req, res, next) => {
  const { productId, variantLabel, quantity, address, shippingMethod } = req.body;

  if (!productId || !variantLabel || !quantity || !address) {
    throw new ApiError("Missing buy-now fields", 400);
  }

  if (
    typeof shippingMethod !== "string" ||
    !ALLOWED_SHIPPING_METHODS.includes(shippingMethod.trim())
  ) {
    throw new ApiError("Valid shipping method is required", 400);
  }

  req.body.shippingMethod = shippingMethod.trim();

  next();
};
