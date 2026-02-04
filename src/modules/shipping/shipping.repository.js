const ShippingPrice = require("./shippingPrice.model");

class ShippingRepository {
  create(data) {
    return ShippingPrice.create(data);
  }

  findAll() {
    return ShippingPrice.find().sort({ minWeight: 1 });
  }

  findActiveByWeight(weight) {
    return ShippingPrice.findOne({
      minWeight: { $lte: weight },
      maxWeight: { $gte: weight },
      isActive: true,
    });
  }

  findById(id) {
    return ShippingPrice.findById(id);
  }

  update(id, data) {
    return ShippingPrice.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id) {
    return ShippingPrice.findByIdAndDelete(id);
  }

  findOverlap(minWeight, maxWeight, excludeId = null) {
  const query = {
    isActive: true,
    $or: [
      { minWeight: { $lte: maxWeight }, maxWeight: { $gte: minWeight } }
    ],
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return ShippingPrice.findOne(query);
}

}

module.exports = new ShippingRepository();
