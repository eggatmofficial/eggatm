const mongoose = require("mongoose");

const shippingPriceSchema = new mongoose.Schema(
  {
    minWeight: {
      type: Number, // grams
      required: true,
    },
    maxWeight: {
      type: Number, // grams
      required: true,
    },
    price: {
      type: Number, // rupees
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShippingPrice", shippingPriceSchema);
