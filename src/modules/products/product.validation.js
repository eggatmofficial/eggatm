const ApiError = require("../utils/ApiError");


class ProductValidation {
  static validateCreate(data) {
    const { name, variants, images, mainImage } = data;

    if (!name) {
      throw new ApiError("Product name is required", 400);
    }

    if (!variants) {
      throw new ApiError("Variants are required", 400);
    }

    // variants validation
    if (!Array.isArray(variants) || variants.length === 0) {
      throw new ApiError("At least one variant is required", 400);
    }

    for (const variant of variants) {
      if (variant.price < 0) {
        throw new ApiError("Variant price cannot be negative", 400);
      }
      if (variant.stock < 0) {
        throw new ApiError("Variant stock cannot be negative", 400);
      }
    }

    // images validation
    if (!images || images.length === 0) {
      throw new ApiError("Product must have at least one image", 400);
    }

    // main image validation
    if (!images.includes(mainImage)) {
      throw new ApiError(
        "Main image must be one of uploaded images",
        400
      );
    }
  }
}

module.exports = ProductValidation;
