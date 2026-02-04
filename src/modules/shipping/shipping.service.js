const ApiError = require("../utils/ApiError");
const repo = require("./shipping.repository");

class ShippingService {
async create(data) {
  const { minWeight, maxWeight } = data;

  if (minWeight >= maxWeight) {
    throw new ApiError("minWeight must be less than maxWeight", 400);
  }

  const overlap = await repo.findOverlap(minWeight, maxWeight);
  if (overlap) {
    throw new ApiError(
      `Overlapping slab exists (${overlap.minWeight}g - ${overlap.maxWeight}g)`,
      409
    );
  }

  return repo.create(data);
}


  async getAll() {
    return repo.findAll();
  }

async update(id, data) {
  const { minWeight, maxWeight } = data;

  if (minWeight !== undefined && maxWeight !== undefined) {
    if (minWeight >= maxWeight) {
      throw new ApiError("minWeight must be less than maxWeight", 400);
    }

    const overlap = await repo.findOverlap(minWeight, maxWeight, id);
    if (overlap) {
      throw new ApiError(
        `Overlapping slab exists (${overlap.minWeight}g - ${overlap.maxWeight}g)`,
        409
      );
    }
  }

  const price = await repo.update(id, data);
  if (!price) throw new ApiError("Shipping price not found", 404);

  return price;
}


  async delete(id) {
    const price = await repo.delete(id);
    if (!price) throw new ApiError("Shipping price not found", 404);
    return price;
  }

  async estimateShipping({ items, shippingMethod }) {
  // Pickup or transport = free
  if (shippingMethod !== "COURIER") {
    return {
      totalWeight: 0,
      charge: 0,
    };
  }
 console.log("🧮 SHIPPING ITEMS", items);
  let totalWeight = 0;

  for (const item of items) {
    if (!item.weight) continue;
    totalWeight += item.weight * item.quantity;
  }

  if (totalWeight === 0) {
    return { totalWeight: 0, charge: 0 };
  }

  const slab = await repo.findActiveByWeight(totalWeight);

  console.log("📦 TOTAL WEIGHT:", totalWeight);
console.log("💰 MATCHED SLAB:", slab);

  return {
    totalWeight,
    charge: slab ? slab.price : 0,
  };
}

}

module.exports = new ShippingService();
