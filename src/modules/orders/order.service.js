const ApiError = require("../utils/ApiError");
const Product = require("../products/product.model");
const cartRepo = require("../cart/cart.repository");
const orderRepo = require("./order.repository");
const sendOrderStatusEmail = require("../utils/sendOrderStatusEmail");
const getFinalPrice = require("../utils/cartHelper");


class OrderService {
  // 🛒 CART → ORDER
async createFromCart(userId, data) {
  const { items, address } = data;

  if (!items || items.length === 0) {
    throw new ApiError("No items selected", 400);
  }

  const order = await this._createOrder(
    userId,
    items,
    address,
    "CART"
  );

  // ✅ REMOVE ONLY PURCHASED ITEMS
  await cartRepo.removeItems(userId, items);

  return order;
}


  // ⚡ BUY NOW → ORDER
  async createFromBuyNow(userId, data) {
    const items = [
      {
        productId: data.productId,
        variantLabel: data.variantLabel,
        quantity: data.quantity,
      },
    ];

    return this._createOrder(userId, items, data.address, "BUY_NOW");
  }

  // 🔥 COMMON ORDER CREATION
  // async _createOrder(userId, items, address, source) {
  //   let totalAmount = 0;
  //   const orderItems = [];

  //   for (const item of items) {
  //     const product = await Product.findById(item.productId);

  //     if (!product || !product.isActive) {
  //       throw new ApiError("Product unavailable", 400);
  //     }

  //     const variant = product.variants.find(
  //       (v) => v.label === item.variantLabel
  //     );

  //     if (!variant || variant.stock < item.quantity) {
  //       throw new ApiError("Insufficient stock", 400);
  //     }

  //     const subtotal = variant.price * item.quantity;
  //     totalAmount += subtotal;

  //     orderItems.push({
  //       productId: item.productId,
  //       variantId: variant._id,   
  //       variantLabel: item.variantLabel,
  //       price: variant.price,
  //       quantity: item.quantity,
  //       subtotal,
  //     });
  //   }

  //     const order = await orderRepo.create({
  //     userId,
  //     items: orderItems,
  //     totalAmount,
  //     address,
  //     source,
  //   });


  //   // await sendOrderStatusEmail(order);

  //   return order;

  // }

  async _createOrder(userId, items, address, source) {
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    if (!item.quantity || item.quantity <= 0) {
      throw new ApiError("Invalid quantity", 400);
    }

    const product = await Product.findById(item.productId);
    if (!product || !product.isActive) {
      throw new ApiError("Product unavailable", 400);
    }

    const variant = product.variants.find(
      (v) => v.label === item.variantLabel
    );
    if (!variant) {
      throw new ApiError("Variant not found", 404);
    }

    if (variant.stock < item.quantity) {
      throw new ApiError("Insufficient stock", 400);
    }

    // ✅ ALWAYS RECALCULATE PRICE IN BACKEND
    const finalPrice = getFinalPrice(product, variant);

    if (typeof finalPrice !== "number" || isNaN(finalPrice)) {
      throw new ApiError("Price calculation failed", 500);
    }

    const subtotal = finalPrice * item.quantity;
    totalAmount += subtotal;

    orderItems.push({
      productId: item.productId,
      variantId: variant._id,
      variantLabel: item.variantLabel,
      price: finalPrice, // ✅ discounted price
      quantity: item.quantity,
      subtotal,
    });
  }

  return orderRepo.create({
    userId,
    items: orderItems,
    totalAmount,
    address,
    source,
    status: "CREATED",
  });
}




  async getMyOrders(userId) {
    return orderRepo.findByUserId(userId);
  }


  async getMyOrderById(orderId, userId) {
    const order = await orderRepo.findUserOrderById(orderId, userId);

    if (!order) {
      throw new ApiError("Order not found", 404);
    }

    return order;
  }



  async getAllOrders() {
    return orderRepo.findAll();
  }



  async getOrderById(orderId) {
    const order = await orderRepo.findByIdOne(orderId);
    if (!order) throw new ApiError("Order not found", 404);
    return order;
  }


//  async updateOrderStatus(orderId, status) {
//   const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
//   if (!allowedStatus.includes(status)) {
//     throw new ApiError("Invalid order status", 400);
//   }

//   // 1️⃣ FETCH ORDER FIRST
//   const order = await orderRepo.findById(orderId);
//   if (!order) throw new ApiError("Order not found", 404);
// console.log("order",order);


  
//     console.log("🔁 ORDER STATUS UPDATE", {
//       orderId,
//       prevStatus: order.status,
//        newStatus: status,
//     });

//      if (order.status === "PAID" && status === "PAID") {
//       return order;
//     }

//   // 2️⃣ UPDATE STOCK ONLY ON TRANSITION → PAID
//   if (order.status !== "PAID" && order.status === "PAID") {
//     for (const item of order.items) {
//       console.log("📦 REDUCING STOCK", item);
//       const result = await Product.updateOne(
//         {
//           _id: item.productId,
//           // "variants._id": item.variantId,
//           "variants.label": item.variantLabel,
//           "variants.stock": { $gte: item.quantity },
//         },
//         {
//           $inc: { "variants.$.stock": -item.quantity },
//         }
//       );

//       // 🚨 SAFETY CHECK
//       if (result.modifiedCount === 0) {
//         throw new ApiError("Stock update failed", 500);
//       }
//     }
//   }

//   // 3️⃣ UPDATE ORDER STATUS
//   order.status = status;
//   await order.save();

//   await sendOrderStatusEmail(order);

//   return order;
// }


async updateOrderStatus(orderId, status) {
  const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!allowedStatus.includes(status)) {
    throw new ApiError("Invalid order status", 400);
  }

  // 1️⃣ FETCH ORDER
  const order = await orderRepo.findById(orderId);
  if (!order) throw new ApiError("Order not found", 404);

  console.log("🔁 ORDER STATUS UPDATE", {
    orderId,
    prevStatus: order.status,
    newStatus: status,
  });

  // 🔒 Prevent double deduction
  if (order.status === "PAID" && status === "PAID") {
    return order;
  }

  // 2️⃣ REDUCE STOCK ONLY WHEN MOVING TO PAID
  if (order.status !== "PAID" && status === "PAID") {
    for (const item of order.items) {
      console.log("📦 REDUCING STOCK", item);

      const result = await Product.updateOne(
        {
          _id: item.productId,
          "variants.label": item.variantLabel,
        },
        {
          $inc: { "variants.$.stock": -Number(item.quantity) },
        }
      );

      console.log("🧮 STOCK UPDATE RESULT", result);

      if (result.modifiedCount === 0) {
        throw new ApiError("Stock update failed", 500);
      }
    }
  }

  // 3️⃣ UPDATE ORDER STATUS
  order.status = status;
  await order.save();

  await sendOrderStatusEmail(order);
  return order;
}


}

module.exports = new OrderService();
