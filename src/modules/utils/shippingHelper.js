// const shippingRepo = require("../shipping/shipping.repository");
// const ApiError = require("./ApiError");

// exports.calculateShippingCharge = async (method, totalWeight) => {
//   if (method === "PICKUP") return 0;
//   if (method === "TRANSPORT") return 0;

//   if (method === "COURIER") {
//     const slab = await shippingRepo.findActiveByWeight(totalWeight);
//     if (!slab) {
//       throw new ApiError("Courier price not configured", 500);
//     }
//     return slab.price;
//   }

//   throw new ApiError("Invalid shipping method", 400);
// };






const shippingRepo = require("../shipping/shipping.repository");
const ApiError = require("./ApiError");

exports.calculateShippingCharge = async (method, totalWeight) => {
  console.log("🚚 SHIPPING HELPER CALLED:", { method, totalWeight });
  
  if (method === "PICKUP") {
    console.log("📦 PICKUP - No shipping charge");
    return 0;
  }
  
  if (method === "TRANSPORT") {
    console.log("🚌 TRANSPORT - No shipping charge");
    return 0; // Or add transport logic if needed
  }

  if (method === "COURIER") {
    console.log("📮 COURIER - Looking for weight slab:", totalWeight);
    const slab = await shippingRepo.findActiveByWeight(totalWeight);
    
    if (!slab) {
      console.error("❌ No shipping slab found for weight:", totalWeight);
      throw new ApiError("Courier price not configured", 500);
    }
    
    console.log("💰 COURIER SLAB FOUND:", {
      minWeight: slab.minWeight,
      maxWeight: slab.maxWeight,
      price: slab.price
    });
    
    return slab.price;
  }

  throw new ApiError("Invalid shipping method", 400);
};