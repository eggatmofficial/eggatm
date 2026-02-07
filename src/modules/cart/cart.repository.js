// const Cart = require("./cart.model");

// class CartRepository {
//   findByUserId(userId) {
//     return Cart.findOne({ userId })
//     .populate({
//   path: "items.productId",
//   select: "name images variants tags isActive",
//   })
//   }

//   create(data) {
//     return Cart.create(data);
//   }

//   update(cart) {
//     return cart.save();
//   }

//   clearCart(userId) {
//     return Cart.findOneAndUpdate(
//       { userId },
//       { $set: { items: [] } },
//       { new: true }
//     );
//   }

//   removeItems(userId, items) {
//   return Cart.findOneAndUpdate(
//     { userId },
//     {
//       $pull: {
//         items: {
//           $or: items.map((item) => ({
//             productId: item.productId,
//             variantLabel: item.variantLabel,
//           })),
//         },
//       },
//     },
//     { new: true }
//   );
// }
// }

// module.exports = new CartRepository();





const Cart = require("./cart.model");
const mongoose = require("mongoose");


class CartRepository {
  async findByUserId(userId) {
    return Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name images variants tags isActive",
    });
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
  const productIds = items.map(i =>
    new mongoose.Types.ObjectId(i.productId._id || i.productId)
  );

  const variantLabels = items.map(i => i.variantLabel);

  console.log("🧹 CART CLEANUP:", {
  userId,
  productIds,
  variantLabels,
});


  return Cart.findOneAndUpdate(
    { userId },
    {
      $pull: {
        items: {
          productId: { $in: productIds },
          variantLabel: { $in: variantLabels },
        },
      },
    },
    { new: true }
  );
}





}

module.exports = new CartRepository();