
const Product = require("../products/product.model");
const ApiError = require("../utils/ApiError");

class StockService {

  // 📦 GET ALL STOCK
  async getAllStock() {
    return Product.find(
      {},
      { name: 1, variants: 1, isActive: 1 }
    );
  }

  // ➕ ADD NEW VARIANT (ADMIN)
  async addVariant(productId, variantData) {
    const product = await Product.findById(productId);
    if (!product) throw new ApiError("Product not found", 404);

    const exists = product.variants.find(
      v => v.label === variantData.label
    );

    if (exists) {
      throw new ApiError("Variant already exists", 400);
    }

    product.variants.push(variantData);
    await product.save();

    return product;
  }

  // ✏️ UPDATE STOCK (BY LABEL)
  async updateStock(productId, label, stock) {
    const result = await Product.updateOne(
      {
        _id: productId,
        "variants.label": label,
      },
      {
        $set: { "variants.$.stock": stock },
      }
    );

    if (result.modifiedCount === 0) {
      throw new ApiError("Stock update failed", 400);
    }

    return true;
  }

  // ❌ REMOVE VARIANT
  async deleteVariant(productId, label) {
    const result = await Product.updateOne(
      { _id: productId },
      { $pull: { variants: { label } } }
    );

    if (result.modifiedCount === 0) {
      throw new ApiError("Variant delete failed", 400);
    }

    return true;
  }

  // 🔴 LOW STOCK LIST (≤ 5)
  async getLowStock(limit = 5) {
    return Product.aggregate([
      { $unwind: "$variants" },
      {
        $match: {
          "variants.stock": { $lte: limit },
        },
      },
      {
        $project: {
          name: 1,
          "variants.label": 1,
          "variants.stock": 1,
          "variants.price": 1,
        },
      },
    ]);
  }
}

module.exports = new StockService();
