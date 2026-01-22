// const ApiError = require("../utils/ApiError");
// const cartRepo = require("./cart.repository");
// const Product = require("../products/product.model");
// const getFinalPrice = require("../utils/cartHelper");

// class CartService {

// // async addToCart(userId, data) {
// //     const { productId, variantLabel, quantity } = data;

// //     const product = await Product.findOne({
// //       _id: productId,
// //       isActive: true,
// //     });

// //     if (!product) throw new ApiError("Product not found", 404);

// //     const variant = product.variants.find(
// //       v => v.label === variantLabel
// //     );

// //     if (!variant) throw new ApiError("Variant not found", 404);

// //     if (variant.stock < quantity)
// //       throw new ApiError("Insufficient stock", 400);

// //     let cart = await cartRepo.findByUserId(userId);

// //     if (!cart) {
// //       cart = await cartRepo.create({
// //         userId,
// //         items: [
// //           {
// //             productId,
// //             variantLabel,
// //             price: variant.price,
// //             quantity,
// //           },
// //         ],
// //       });
// //       return cart;
// //     }

// //       const existingItem = cart.items.find(
// //       (i) =>
// //         i.productId._id.toString() === productId.toString() &&
// //         i.variantLabel === variantLabel
// //     );


// //     if (existingItem) {
// //       existingItem.quantity += quantity;
// //     } else {
// //       cart.items.push({
// //         productId,
// //         variantLabel,
// //         price: variant.price,
// //         quantity,
// //       });
// //     }

// //     await cartRepo.update(cart);
// //     return cartRepo.findByUserId(userId);
// //   }

// async addToCart(userId, data) {
//   const { productId, variantLabel, quantity } = data;

//   const product = await Product.findOne({ _id: productId, isActive: true });
//   if (!product) throw new ApiError("Product not found", 404);

//   const variant = product.variants.find(v => v.label === variantLabel);
//   if (!variant) throw new ApiError("Variant not found", 404);

//   console.log("🔥 ADD TO CART START");
// console.log("Variant price:", variant.price);
// console.log("Product discount:", product.discount);
// console.log("Variant discount:", variant.discount);

//   if (variant.stock < quantity)
//     throw new ApiError("Insufficient stock", 400);

//   const finalPrice = getFinalPrice(product, variant); // ✅ FIX
// console.log("FINAL PRICE:", finalPrice);
//   let cart = await cartRepo.findByUserId(userId);

//   if (!cart) {
//     cart = await cartRepo.create({
//       userId,
//       items: [
//         {
//           productId,
//           variantLabel,
//           price: finalPrice,        // ✅ discounted price
//           originalPrice: variant.price, // optional
//           quantity,
//           totalPrice: finalPrice * quantity,
//         },
//       ],
//     });
//     return cart;
//   }

//   const existingItem = cart.items.find(
//     (i) =>
//       i.productId._id.toString() === productId.toString() &&
//       i.variantLabel === variantLabel
//   );

//   if (existingItem) {
//      console.log("🟡 ITEM ALREADY IN CART");
//   console.log("OLD PRICE:", existingItem.price);

//   const finalPrice = getFinalPrice(product, variant);
//   console.log("NEW PRICE:", finalPrice);
//     existingItem.price = finalPrice;
//     existingItem.quantity += quantity;
//     existingItem.totalPrice = existingItem.price * existingItem.quantity; // ✅
//   } else {
//     cart.items.push({
//       productId,
//       variantLabel,
//       price: finalPrice,         // ✅ discounted
//       originalPrice: variant.price,
//       quantity,
//       totalPrice: finalPrice * quantity,
//     });
//   }

//   await cartRepo.update(cart);
//   return cartRepo.findByUserId(userId);
// }


// async getCart(userId) {
//   let cart = await cartRepo.findByUserId(userId);

//   if (!cart) {
//     return {
//       userId,
//       items: [],
//     };
//   }

//   cart.items = cart.items.filter(
//     (i) => i.productId && i.productId.images?.length > 0
//   );

//   await cart.save();
//   return cart;
// }



// async updateCartItem(userId, productId, variantLabel, quantity) {

//     const cart = await cartRepo.findByUserId(userId);

//     if (!cart) throw new ApiError("Cart not found", 404);

//     const item = cart.items.find(
//   (i) =>
//     i.productId._id.toString() === productId.toString() &&
//     i.variantLabel === variantLabel
//     );


//     if (!item) throw new ApiError("Cart item not found", 404);

//     if (quantity < 1) {
//       cart.items = cart.items.filter(i => i !== item);
//     } else {
//       item.quantity = quantity;
//       item.totalPrice = item.price * quantity;
//     }

//     await cartRepo.update(cart);
//     return cartRepo.findByUserId(userId);

// }


// async removeItem(userId, productId, variantLabel) {
//     const cart = await cartRepo.findByUserId(userId);
//     if (!cart) throw new ApiError("Cart not found", 404);

//    cart.items = cart.items.filter(
//   (i) =>
//     !(
//       i.productId._id.toString() === productId.toString() &&
//       i.variantLabel === variantLabel
//     )
// );


//     await cartRepo.update(cart);
//     return cartRepo.findByUserId(userId);

// }


// async clearCart(userId) {
//     await cartRepo.clearCart(userId);
//     return cartRepo.findByUserId(userId);

// }


// }












// module.exports = new CartService();






















const ApiError = require("../utils/ApiError");
const cartRepo = require("./cart.repository");
const Product = require("../products/product.model");
const getFinalPrice = require("../utils/cartHelper");

// 🔧 normalize helper (IMPORTANT)
const normalizeId = (id) => {
  if (!id) return null;
  if (typeof id === "string") return id;
  if (id._id) return id._id.toString();
  return id.toString();
};

class CartService {
  // ➕ ADD TO CART
  async addToCart(userId, data) {
    const { productId, variantLabel, quantity } = data;

    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) throw new ApiError("Product not found", 404);

    const variant = product.variants.find(v => v.label === variantLabel);
    if (!variant) throw new ApiError("Variant not found", 404);

    if (variant.stock < quantity)
      throw new ApiError("Insufficient stock", 400);

    const finalPrice = getFinalPrice(product, variant);

    let cart = await cartRepo.findByUserId(userId);

    if (!cart) {
      cart = await cartRepo.create({
        userId,
        items: [{
          productId,
          variantLabel,
          price: finalPrice,
          originalPrice: variant.price,
          quantity,
          totalPrice: finalPrice * quantity,
        }],
      });
      return cart;
    }

    const existingItem = cart.items.find(
      (i) =>
        normalizeId(i.productId) === productId.toString() &&
        i.variantLabel === variantLabel
    );

    if (existingItem) {
      existingItem.price = finalPrice;
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      cart.items.push({
        productId,
        variantLabel,
        price: finalPrice,
        originalPrice: variant.price,
        quantity,
        totalPrice: finalPrice * quantity,
      });
    }

    await cart.save();
    return cartRepo.findByUserId(userId);
  }

  // 🛒 GET CART
  async getCart(userId) {
    let cart = await cartRepo.findByUserId(userId);

    if (!cart) return { userId, items: [] };

    cart.items = cart.items.filter(
      (i) => i.productId && i.productId.images?.length > 0
    );

    await cart.save();
    return cart;
  }

  // 🔄 UPDATE CART ITEM (INC / DEC)
  async updateCartItem(userId, productId, variantLabel, quantity) {
    const cart = await cartRepo.findByUserId(userId);
    if (!cart) throw new ApiError("Cart not found", 404);

    const item = cart.items.find(
      (i) =>
        normalizeId(i.productId) === productId.toString() &&
        i.variantLabel === variantLabel
    );

    if (!item) {
      console.log("❌ CART ITEM NOT FOUND", {
        productId,
        variantLabel,
        cartItems: cart.items.map(i => ({
          pid: normalizeId(i.productId),
          variant: i.variantLabel
        }))
      });
      throw new ApiError("Cart item not found", 404);
    }

    if (quantity < 1) {
      cart.items = cart.items.filter(i => i !== item);
    } else {
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
    }

    await cart.save();
    return cartRepo.findByUserId(userId);
  }

  // ❌ REMOVE ITEM
  async removeItem(userId, productId, variantLabel) {
    const cart = await cartRepo.findByUserId(userId);
    if (!cart) throw new ApiError("Cart not found", 404);

    cart.items = cart.items.filter(
      (i) =>
        !(
          normalizeId(i.productId) === productId.toString() &&
          i.variantLabel === variantLabel
        )
    );

    await cart.save();
    return cartRepo.findByUserId(userId);
  }

  // 🧹 CLEAR CART
  async clearCart(userId) {
    await cartRepo.clearCart(userId);
    return cartRepo.findByUserId(userId);
  }
}

module.exports = new CartService();
