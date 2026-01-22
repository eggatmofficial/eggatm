const Cart = require("./cart.model");

class CartRepository {
  findByUserId(userId) {
    return Cart.findOne({ userId })
    .populate({
  path: "items.productId",
  select: "name images variants tags isActive",
  })
  }

  create(data) {
    return Cart.create(data);
  }

  update(cart) {
    return cart.save();
  }

  clearCart(userId) {
    return Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );
  }

  removeItems(userId, items) {
  return Cart.findOneAndUpdate(
    { userId },
    {
      $pull: {
        items: {
          $or: items.map((item) => ({
            productId: item.productId,
            variantLabel: item.variantLabel,
          })),
        },
      },
    },
    { new: true }
  );
}
}

module.exports = new CartRepository();
