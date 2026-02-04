const shippingRepo = require("../shipping/shipping.repository");
const ApiError = require("./ApiError");

exports.calculateShippingCharge = async (method, totalWeight) => {
  if (method === "PICKUP") return 0;
  if (method === "TRANSPORT") return 0;

  if (method === "COURIER") {
    const slab = await shippingRepo.findActiveByWeight(totalWeight);
    if (!slab) {
      throw new ApiError("Courier price not configured", 500);
    }
    return slab.price;
  }

  throw new ApiError("Invalid shipping method", 400);
};
