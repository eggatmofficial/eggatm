// const ApiError = require("../utils/ApiError");
// const Product = require("../products/product.model");
// const cartRepo = require("../cart/cart.repository");
// const orderRepo = require("./order.repository");
// const sendOrderStatusEmail = require("../utils/sendOrderStatusEmail");
// const getFinalPrice = require("../utils/cartHelper");


// class OrderService {
//   // 🛒 CART → ORDER
// async createFromCart(userId, data) {
//   const { items, address } = data;

//   if (!items || items.length === 0) {
//     throw new ApiError("No items selected", 400);
//   }

//   const order = await this._createOrder(
//     userId,
//     items,
//     address,
//     "CART"
//   );

//   // ✅ REMOVE ONLY PURCHASED ITEMS
//   await cartRepo.removeItems(userId, items);

//   return order;
// }


//   // ⚡ BUY NOW → ORDER
//   async createFromBuyNow(userId, data) {
//     const items = [
//       {
//         productId: data.productId,
//         variantLabel: data.variantLabel,
//         quantity: data.quantity,
//       },
//     ];

//     return this._createOrder(userId, items, data.address, "BUY_NOW");
//   }

//   // 🔥 COMMON ORDER CREATION
//   // async _createOrder(userId, items, address, source) {
//   //   let totalAmount = 0;
//   //   const orderItems = [];

//   //   for (const item of items) {
//   //     const product = await Product.findById(item.productId);

//   //     if (!product || !product.isActive) {
//   //       throw new ApiError("Product unavailable", 400);
//   //     }

//   //     const variant = product.variants.find(
//   //       (v) => v.label === item.variantLabel
//   //     );

//   //     if (!variant || variant.stock < item.quantity) {
//   //       throw new ApiError("Insufficient stock", 400);
//   //     }

//   //     const subtotal = variant.price * item.quantity;
//   //     totalAmount += subtotal;

//   //     orderItems.push({
//   //       productId: item.productId,
//   //       variantId: variant._id,   
//   //       variantLabel: item.variantLabel,
//   //       price: variant.price,
//   //       quantity: item.quantity,
//   //       subtotal,
//   //     });
//   //   }

//   //     const order = await orderRepo.create({
//   //     userId,
//   //     items: orderItems,
//   //     totalAmount,
//   //     address,
//   //     source,
//   //   });


//   //   // await sendOrderStatusEmail(order);

//   //   return order;

//   // }

//   async _createOrder(userId, items, address, source) {
//   let totalAmount = 0;
//   const orderItems = [];

//   for (const item of items) {
//     if (!item.quantity || item.quantity <= 0) {
//       throw new ApiError("Invalid quantity", 400);
//     }

//     const product = await Product.findById(item.productId);
//     if (!product || !product.isActive) {
//       throw new ApiError("Product unavailable", 400);
//     }

//     const variant = product.variants.find(
//       (v) => v.label === item.variantLabel
//     );
//     if (!variant) {
//       throw new ApiError("Variant not found", 404);
//     }

//     if (variant.stock < item.quantity) {
//       throw new ApiError("Insufficient stock", 400);
//     }

//     // ✅ ALWAYS RECALCULATE PRICE IN BACKEND
//     const finalPrice = getFinalPrice(product, variant);

//     if (typeof finalPrice !== "number" || isNaN(finalPrice)) {
//       throw new ApiError("Price calculation failed", 500);
//     }

//     const subtotal = finalPrice * item.quantity;
//     totalAmount += subtotal;

//     orderItems.push({
//       productId: item.productId,
//       variantId: variant._id,
//       variantLabel: item.variantLabel,
//       price: finalPrice, // ✅ discounted price
//       quantity: item.quantity,
//       subtotal,
//     });
//   }

//   return orderRepo.create({
//     userId,
//     items: orderItems,
//     totalAmount,
//     address,
//     source,
//     status: "CREATED",
//   });
// }




//   async getMyOrders(userId) {
//     return orderRepo.findByUserId(userId);
//   }


//   async getMyOrderById(orderId, userId) {
//     const order = await orderRepo.findUserOrderById(orderId, userId);

//     if (!order) {
//       throw new ApiError("Order not found", 404);
//     }

//     return order;
//   }



//   async getAllOrders() {
//     return orderRepo.findAll();
//   }



//   async getOrderById(orderId) {
//     const order = await orderRepo.findByIdOne(orderId);
//     if (!order) throw new ApiError("Order not found", 404);
//     return order;
//   }


// //  async updateOrderStatus(orderId, status) {
// //   const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
// //   if (!allowedStatus.includes(status)) {
// //     throw new ApiError("Invalid order status", 400);
// //   }

// //   // 1️⃣ FETCH ORDER FIRST
// //   const order = await orderRepo.findById(orderId);
// //   if (!order) throw new ApiError("Order not found", 404);
// // console.log("order",order);


  
// //     console.log("🔁 ORDER STATUS UPDATE", {
// //       orderId,
// //       prevStatus: order.status,
// //        newStatus: status,
// //     });

// //      if (order.status === "PAID" && status === "PAID") {
// //       return order;
// //     }

// //   // 2️⃣ UPDATE STOCK ONLY ON TRANSITION → PAID
// //   if (order.status !== "PAID" && order.status === "PAID") {
// //     for (const item of order.items) {
// //       console.log("📦 REDUCING STOCK", item);
// //       const result = await Product.updateOne(
// //         {
// //           _id: item.productId,
// //           // "variants._id": item.variantId,
// //           "variants.label": item.variantLabel,
// //           "variants.stock": { $gte: item.quantity },
// //         },
// //         {
// //           $inc: { "variants.$.stock": -item.quantity },
// //         }
// //       );

// //       // 🚨 SAFETY CHECK
// //       if (result.modifiedCount === 0) {
// //         throw new ApiError("Stock update failed", 500);
// //       }
// //     }
// //   }

// //   // 3️⃣ UPDATE ORDER STATUS
// //   order.status = status;
// //   await order.save();

// //   await sendOrderStatusEmail(order);

// //   return order;
// // }


// async updateOrderStatus(orderId, status) {
//   const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
//   if (!allowedStatus.includes(status)) {
//     throw new ApiError("Invalid order status", 400);
//   }

//   // 1️⃣ FETCH ORDER
//   const order = await orderRepo.findById(orderId);
//   if (!order) throw new ApiError("Order not found", 404);

//   console.log("🔁 ORDER STATUS UPDATE", {
//     orderId,
//     prevStatus: order.status,
//     newStatus: status,
//   });

//   // 🔒 Prevent double deduction
//   if (order.status === "PAID" && status === "PAID") {
//     return order;
//   }

//   // 2️⃣ REDUCE STOCK ONLY WHEN MOVING TO PAID
//   if (order.status !== "PAID" && status === "PAID") {
//     for (const item of order.items) {
//       console.log("📦 REDUCING STOCK", item);

//       const result = await Product.updateOne(
//         {
//           _id: item.productId,
//           "variants.label": item.variantLabel,
//         },
//         {
//           $inc: { "variants.$.stock": -Number(item.quantity) },
//         }
//       );

//       console.log("🧮 STOCK UPDATE RESULT", result);

//       if (result.modifiedCount === 0) {
//         throw new ApiError("Stock update failed", 500);
//       }
//     }
//   }

//   // 3️⃣ UPDATE ORDER STATUS
//   order.status = status;
//   await order.save();

//   // await sendOrderStatusEmail(order);
//   return order;
// }


// }

// module.exports = new OrderService();





























// const ApiError = require("../utils/ApiError");
// const Product = require("../products/product.model");
// const cartRepo = require("../cart/cart.repository");
// const orderRepo = require("./order.repository");
// const sendOrderStatusEmail = require("../utils/sendOrderStatusEmail");
// const getFinalPrice = require("../utils/cartHelper");
// const { calculateShippingCharge } = require("../utils/shippingHelper");



// class OrderService {
//   // 🛒 CART → ORDER
// async createFromCart(userId, data) {
//   const { items, address ,shippingMethod} = data;

//   if (!items || items.length === 0) {
//     throw new ApiError("No items selected", 400);
//   }

//     if (!shippingMethod) {
//     throw new ApiError("Shipping method is required", 400);
//   }

//   const order = await this._createOrder(
//     userId,
//     items,
//     address,
//     "CART",
//      shippingMethod
//   );

//   // ✅ REMOVE ONLY PURCHASED ITEMS
//   await cartRepo.removeItems(userId, items);

//   return order;
// }


//   // ⚡ BUY NOW → ORDER
//   // async createFromBuyNow(userId, data) {
    
//   //   const items = [
//   //     {
//   //       productId: data.productId,
//   //       variantLabel: data.variantLabel,
//   //       quantity: data.quantity,
//   //     },
//   //   ];

//   //   return this._createOrder(userId, items, data.address, "BUY_NOW");
//   // }


//   async createFromBuyNow(userId, data) {
//   const {
//     productId,
//     variantLabel,
//     quantity,
//     address,
//     shippingMethod
//   } = data;

//   if (!shippingMethod) {
//     throw new ApiError("Shipping method is required", 400);
//   }

//   const items = [
//     {
//       productId,
//       variantLabel,
//       quantity,
//     },
//   ];

//   return this._createOrder(
//     userId,
//     items,
//     address,
//     "BUY_NOW",
//     shippingMethod
//   );
// }

//   // 🔥 COMMON ORDER CREATION
//   // async _createOrder(userId, items, address, source) {
//   //   let totalAmount = 0;
//   //   const orderItems = [];

//   //   for (const item of items) {
//   //     const product = await Product.findById(item.productId);

//   //     if (!product || !product.isActive) {
//   //       throw new ApiError("Product unavailable", 400);
//   //     }

//   //     const variant = product.variants.find(
//   //       (v) => v.label === item.variantLabel
//   //     );

//   //     if (!variant || variant.stock < item.quantity) {
//   //       throw new ApiError("Insufficient stock", 400);
//   //     }

//   //     const subtotal = variant.price * item.quantity;
//   //     totalAmount += subtotal;

//   //     orderItems.push({
//   //       productId: item.productId,
//   //       variantId: variant._id,   
//   //       variantLabel: item.variantLabel,
//   //       price: variant.price,
//   //       quantity: item.quantity,
//   //       subtotal,
//   //     });
//   //   }

//   //     const order = await orderRepo.create({
//   //     userId,
//   //     items: orderItems,
//   //     totalAmount,
//   //     address,
//   //     source,
//   //   });


//   //   // await sendOrderStatusEmail(order);

//   //   return order;

//   // }

// //   async _createOrder(userId, items, address, source, shippingMethod = "COURIER") {
// //   let totalAmount = 0;
// //   let totalWeight = 0;
// //   const orderItems = [];

// //   for (const item of items) {
// //     if (!item.quantity || item.quantity <= 0) {
// //       throw new ApiError("Invalid quantity", 400);
// //     }

// //     const product = await Product.findById(item.productId);
// //     if (!product || !product.isActive) {
// //       throw new ApiError("Product unavailable", 400);
// //     }

// //     const variant = product.variants.find(
// //       (v) => v.label === item.variantLabel
// //     );
// //     if (!variant) {
// //       throw new ApiError("Variant not found", 404);
// //     }

// //     if (variant.stock < item.quantity) {
// //       throw new ApiError("Insufficient stock", 400);
// //     }

// //     // ✅ ALWAYS RECALCULATE PRICE IN BACKEND
// //     const finalPrice = getFinalPrice(product, variant);

// //     if (typeof finalPrice !== "number" || isNaN(finalPrice)) {
// //       throw new ApiError("Price calculation failed", 500);
// //     }

// //     const subtotal = finalPrice * item.quantity;
// //     totalAmount += subtotal;

// //     // ✅ WEIGHT CALCULATION
// //      const weight = variant.unit === "kg" ? variant.weight * 1000 : variant.weight;
// //     totalWeight += weight * item.quantity;

// //     orderItems.push({
// //       productId: item.productId,
// //       variantId: variant._id,
// //       variantLabel: item.variantLabel,
// //       price: finalPrice, // ✅ discounted price
// //       quantity: item.quantity,
// //       subtotal,
// //     });
// //   }


// //   return orderRepo.create({
// //     userId,
// //     items: orderItems,
// //     totalAmount,
// //     address,
// //     source,
// //     status: "CREATED",
// //     shipping: {
// //       method: shippingMethod,
// //       charge: shippingCharge,
// //       totalWeight
// //     }
// //   });
// // }
// // async _createOrder(userId, items, address, source, shippingMethod) {
// //   let totalAmount = 0;
// //   let totalWeight = 0;
// //   const orderItems = [];

// //   for (const item of items) {
// //     if (!item.quantity || item.quantity <= 0) {
// //       throw new ApiError("Invalid quantity", 400);
// //     }

// //     const product = await Product.findById(item.productId);
// //     if (!product || !product.isActive) {
// //       throw new ApiError("Product unavailable", 400);
// //     }

// //     const variant = product.variants.find(
// //       (v) => v.label === item.variantLabel
// //     );

// //     if (!variant || variant.stock < item.quantity) {
// //       throw new ApiError("Insufficient stock", 400);
// //     }

// //     const finalPrice = getFinalPrice(product, variant);
// //     const subtotal = finalPrice * item.quantity;
// //     totalAmount += subtotal;

// //     const weightInGrams =
// //       variant.unit === "kg"
// //         ? variant.weight * 1000
// //         : variant.weight;

// //     totalWeight += weightInGrams * item.quantity;

// //     orderItems.push({
// //       productId: item.productId,
// //       variantId: variant._id,
// //       variantLabel: item.variantLabel,
// //       price: finalPrice,
// //       quantity: item.quantity,
// //       subtotal,
// //     });
// //   }

// //   // 🔥 CALCULATE SHIPPING CHARGE
// //   const shippingCharge = await calculateShippingCharge(
// //     shippingMethod,
// //     totalWeight
// //   );

// //   return orderRepo.create({
// //     userId,
// //     items: orderItems,
// //     totalAmount: totalAmount + shippingCharge,
// //     address,
// //     source,
// //     status: "CREATED",
// //     shipping: {
// //       method: shippingMethod,
// //       charge: shippingCharge,
// //       totalWeight,

// //       ...(shippingMethod === "TRANSPORT" && { bus: {} }),
// //       ...(shippingMethod === "COURIER" && { courier: {} })
// //     },
// //   });
// // }

// async _createOrder(userId, items, address, source, shippingMethod) {
//   let totalAmount = 0;
//   let totalWeight = 0;
//   const orderItems = [];

//   for (const item of items) {
//     if (!item.quantity || item.quantity <= 0) {
//       throw new ApiError("Invalid quantity", 400);
//     }

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

//     const finalPrice = getFinalPrice(product, variant);
//     const subtotal = finalPrice * item.quantity;
//     totalAmount += subtotal;

//     // const weightInGrams =
//     //   variant.unit === "kg"
//     //     ? variant.weight * 1000
//     //     : variant.weight;

//     // totalWeight += weightInGrams * item.quantity;

//     console.log("items",items);
    

// // ✅ WEIGHT CALCULATION FROM VARIANT
// if (!variant.weight || variant.weight <= 0) {
//   throw new ApiError("Variant weight missing", 500);
// }

// const weightInGrams =
//   variant.unit === "kg"
//     ? variant.weight * 1000
//     : variant.weight;

// totalWeight += weightInGrams * item.quantity;


// console.log("shipping debug",totalWeight,shippingMethod,item.quantity);



//     orderItems.push({
//       productId: item.productId,
//       variantId: variant._id,
//       variantLabel: item.variantLabel,
//       price: finalPrice,
//       quantity: item.quantity,
//       subtotal,
//     });
//   }

//   // 🔥 CALCULATE SHIPPING CHARGE
//   const shippingCharge = await calculateShippingCharge(
//     shippingMethod,
//     totalWeight
//   );

//   return orderRepo.create({
//     userId,
//     items: orderItems,
//     totalAmount: totalAmount + shippingCharge,
//     address,
//     source,
//     status: "CREATED",
//     shipping: {
//       method: shippingMethod,
//       charge: shippingCharge,
//       totalWeight,

//       ...(shippingMethod === "TRANSPORT" && { bus: {} }),
//       ...(shippingMethod === "COURIER" && { courier: {} })
//     },
//   });
// }






//   async getMyOrders(userId) {
//     return orderRepo.findByUserId(userId);
//   }


//   async getMyOrderById(orderId, userId) {
//     const order = await orderRepo.findUserOrderById(orderId, userId);

//     if (!order) {
//       throw new ApiError("Order not found", 404);
//     }

//     return order;
//   }



//   async getAllOrders() {
//     return orderRepo.findAll();
//   }



//   async getOrderById(orderId) {
//     const order = await orderRepo.findByIdOne(orderId);
//     if (!order) throw new ApiError("Order not found", 404);
//     return order;
//   }



// // async updateOrderStatus(orderId, status) {
// //   const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
// //   if (!allowedStatus.includes(status)) {
// //     throw new ApiError("Invalid order status", 400);
// //   }

// //   // 1️⃣ FETCH ORDER
// //   const order = await orderRepo.findById(orderId);
// //   if (!order) throw new ApiError("Order not found", 404);

// //   console.log("🔁 ORDER STATUS UPDATE", {
// //     orderId,
// //     prevStatus: order.status,
// //     newStatus: status,
// //   });

// //   // 🔒 Prevent double deduction
// //   if (order.status === "PAID" && status === "PAID") {
// //     return order;
// //   }

// //   // 2️⃣ REDUCE STOCK ONLY WHEN MOVING TO PAID
// //   if (order.status !== "PAID" && status === "PAID") {
// //     for (const item of order.items) {
// //       console.log("📦 REDUCING STOCK", item);

// //       const result = await Product.updateOne(
// //         {
// //           _id: item.productId,
// //           "variants.label": item.variantLabel,
// //         },
// //         {
// //           $inc: { "variants.$.stock": -Number(item.quantity) },
// //         }
// //       );

// //       console.log("🧮 STOCK UPDATE RESULT", result);

// //       if (result.modifiedCount === 0) {
// //         throw new ApiError("Stock update failed", 500);
// //       }
// //     }
// //   }

// //   // 3️⃣ UPDATE ORDER STATUS
// //   order.status = status;
// //   await order.save();

// //   await sendOrderStatusEmail(order);
// //   return order;
// // }

// async updateOrderStatus(orderId, status) {
//   const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
//   if (!allowedStatus.includes(status)) {
//     throw new ApiError("Invalid order status", 400);
//   }

//   // 1️⃣ FETCH ORDER
//   const order = await orderRepo.findById(orderId);
//   if (!order) throw new ApiError("Order not found", 404);

//   console.log("📋 FULL ORDER DATA:", JSON.stringify(order, null, 2));

//   // 🔧 FIX: Handle missing shipping field for old orders
//   if (!order.shipping) {
//     console.log("⚠️ Order missing shipping field, creating...");
//     order.shipping = {
//       method: "COURIER",
//       charge: 0,
//       totalWeight: 0
//     };
//   }
  
//   // 🔧 FIX: Handle missing shipping.method
//   if (!order.shipping.method) {
//     console.log("⚠️ Order missing shipping.method, setting default...");
//     order.shipping.method = "COURIER";
//   }

//   console.log("🔁 ORDER STATUS UPDATE", {
//     orderId,
//     prevStatus: order.status,
//     newStatus: status,
//     shippingMethod: order.shipping.method
//   });

//   // 🔒 Prevent double deduction
//   if (order.status === "PAID" && status === "PAID") {
//     return order;
//   }

//   // 2️⃣ REDUCE STOCK ONLY WHEN MOVING TO PAID
//   if (order.status !== "PAID" && status === "PAID") {
//     for (const item of order.items) {
//       console.log("📦 REDUCING STOCK", item);

//       const result = await Product.updateOne(
//         {
//           _id: item.productId,
//           "variants.label": item.variantLabel,
//         },
//         {
//           $inc: { "variants.$.stock": -Number(item.quantity) },
//         }
//       );

//       console.log("🧮 STOCK UPDATE RESULT", result);

//       if (result.modifiedCount === 0) {
//         throw new ApiError("Stock update failed", 500);
//       }
//     }
//   }

//   // 3️⃣ UPDATE ORDER STATUS
//   order.status = status;
//   await order.save();

//   // await sendOrderStatusEmail(order);

  
//   return order;
// }


// async getTransportOrders() {
//   return orderRepo.findTransportOrders();
// }

// async assignBus(orderId, busData) {
//   const order = await orderRepo.findById(orderId);
//   if (!order) throw new ApiError("Order not found", 404);

//   if (order.shipping.method !== "TRANSPORT") {
//     throw new ApiError("Not a transport order", 400);
//   }

//   order.shipping.bus = {
//     ...busData,
//     status: "ASSIGNED",
//     assignedAt: new Date()
//   };

//   await order.save();
//   return order;
// }

// async updateTransportStatus(orderId, status) {
//   const allowed = ["IN_TRANSIT", "DELIVERED"];
//   if (!allowed.includes(status)) {
//     throw new ApiError("Invalid transport status", 400);
//   }

//   const order = await orderRepo.findById(orderId);
//   if (!order) throw new ApiError("Order not found", 404);

//   if (order.shipping.method !== "TRANSPORT") {
//     throw new ApiError("Not a transport order", 400);
//   }

//   if (!order.shipping.bus) {
//     throw new ApiError("Bus not assigned yet", 400);
//   }

//   order.shipping.bus.status = status;

//   // 🔥 If delivered → mark order delivered
//   if (status === "DELIVERED") {
//     order.status = "DELIVERED";
//   }

//   await order.save();
//   return order;
// }

// async assignCourier(orderId, courierData) {
//   // ✅ USE orderRepo (NOT order, NOT Order)
//   const order = await orderRepo.findById(orderId);

//   if (!order) {
//     throw new ApiError("Order not found", 404);
//   }

//   if (order.shipping.method !== "COURIER") {
//     throw new ApiError("Not a courier order", 400);
//   }

//   order.shipping.courier = {
//     company: courierData.company,
//     trackingNumber: courierData.trackingNumber,
//     trackingUrl: courierData.trackingUrl,
//     expectedDeliveryDate: courierData.expectedDeliveryDate,
//     status: "IN_TRANSIT",
//     assignedAt: new Date(),
//   };

//   // Optional but correct
//   order.status = "SHIPPED";

//   await order.save();
//   return order;
// }


// async updateCourierStatus(orderId, status) {
//   const allowed = ["IN_TRANSIT", "DELIVERED"];
//   if (!allowed.includes(status)) {
//     throw new ApiError("Invalid courier status", 400);
//   }

//   const order = await orderRepo.findById(orderId);
//   if (!order) throw new ApiError("Order not found", 404);

//   if (order.shipping.method !== "COURIER") {
//     throw new ApiError("Not a courier order", 400);
//   }

//   if (!order.shipping.courier) {
//     throw new ApiError("Courier not assigned yet", 400);
//   }

//   order.shipping.courier.status = status;

//   if (status === "DELIVERED") {
//     order.status = "DELIVERED";
//   }

//   await order.save();
//   return order;
// }


// async getCourierOrders() {
//   return Order.find({
//     "shipping.method": "COURIER"
//   })
//     .populate("userId", "name email")
//     .sort({ createdAt: -1 });
// }

// }

// module.exports = new OrderService();















const ApiError = require("../utils/ApiError");
const Product = require("../products/product.model");
const cartRepo = require("../cart/cart.repository");
const orderRepo = require("./order.repository");
const sendOrderStatusEmail = require("../utils/sendOrderStatusEmail");
const getFinalPrice = require("../utils/cartHelper");
const { calculateShippingCharge } = require("../utils/shippingHelper");

class OrderService {
  // 🛒 CART → ORDER
  async createFromCart(userId, data) {
    const { items, address, shippingMethod } = data;

    if (!items || items.length === 0) {
      throw new ApiError("No items selected", 400);
    }

    if (!shippingMethod) {
      throw new ApiError("Shipping method is required", 400);
    }

    console.log("🛒 CREATING ORDER FROM CART:", {
      userId,
      itemCount: items.length,
      shippingMethod
    });

    // Create order WITHOUT removing items from cart
    const order = await this._createOrder(
      userId,
      items,
      address,
      "CART",
      shippingMethod
    );

    // ❌ DO NOT remove items from cart here
    // Items will be removed only after successful payment
    console.log("✅ Order created, cart items preserved");

    return order;
  }

  // ⚡ BUY NOW → ORDER
  async createFromBuyNow(userId, data) {
    const {
      productId,
      variantLabel,
      quantity,
      address,
      shippingMethod
    } = data;

    if (!shippingMethod) {
      throw new ApiError("Shipping method is required", 400);
    }

    const items = [
      {
        productId,
        variantLabel,
        quantity,
      },
    ];

    console.log("⚡ CREATING BUY NOW ORDER:", {
      userId,
      productId,
      variantLabel,
      quantity,
      shippingMethod
    });

    return this._createOrder(
      userId,
      items,
      address,
      "BUY_NOW",
      shippingMethod
    );
  }

  // 🔥 COMMON ORDER CREATION
  async _createOrder(userId, items, address, source, shippingMethod) {
    let totalAmount = 0;
    let totalWeight = 0;
    const orderItems = [];

    console.log("📦 STARTING ORDER CREATION:", {
      userId,
      itemCount: items.length,
      shippingMethod,
      source
    });

    for (const item of items) {
      console.log("🔍 PROCESSING ITEM:", item);
      
      if (!item.quantity || item.quantity <= 0) {
        throw new ApiError("Invalid quantity", 400);
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        throw new ApiError("Product not found", 404);
      }
      
      if (!product.isActive) {
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

      const finalPrice = getFinalPrice(product, variant);
      const subtotal = finalPrice * item.quantity;
      totalAmount += subtotal;

      // Weight calculation
      if (!variant.weight || variant.weight <= 0) {
        console.warn("⚠️ Variant weight missing, using default 0");
        totalWeight += 0;
      } else {
        const weightInGrams = variant.unit === "kg" ? variant.weight * 1000 : variant.weight;
        totalWeight += weightInGrams * item.quantity;
      }

      console.log("💰 ITEM CALCULATION:", {
        product: product.name,
        variant: item.variantLabel,
        price: finalPrice,
        quantity: item.quantity,
        subtotal: subtotal,
        runningTotal: totalAmount,
        weight: variant.weight || 0
      });

      orderItems.push({
        productId: item.productId,
        variantId: variant._id,
        variantLabel: item.variantLabel,
        price: finalPrice,
        quantity: item.quantity,
        subtotal,
      });
    }

    console.log("📊 ORDER SUMMARY BEFORE SHIPPING:", {
      itemsSubtotal: totalAmount,
      totalWeight: totalWeight,
      itemCount: items.length,
      shippingMethod: shippingMethod
    });

    // 🔥 CALCULATE SHIPPING CHARGE
    let shippingCharge = 0;
    try {
      shippingCharge = await calculateShippingCharge(shippingMethod, totalWeight);
      console.log("✅ SHIPPING CALCULATED:", shippingCharge);
    } catch (shippingError) {
      console.error("❌ SHIPPING CALCULATION ERROR:", shippingError.message);
      // Use default shipping charge
      shippingCharge = shippingMethod === "COURIER" ? 50 : 0;
      console.log("⚡ USING DEFAULT SHIPPING:", shippingCharge);
    }
    
    const finalTotal = totalAmount + shippingCharge;
    
    console.log("🎯 FINAL ORDER CALCULATION:", {
      itemsSubtotal: totalAmount,
      shippingCharge: shippingCharge,
      finalTotal: finalTotal,
      weight: totalWeight
    });

    return orderRepo.create({
      userId,
      items: orderItems,
      totalAmount: finalTotal, // ✅ INCLUDES SHIPPING!
      address,
      source,
      status: "CREATED",
      shipping: {
        method: shippingMethod,
        charge: shippingCharge,
        totalWeight,
        ...(shippingMethod === "TRANSPORT" && { bus: {} }),
        ...(shippingMethod === "COURIER" && { courier: {} })
      },
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

  async updateOrderStatus(orderId, status) {
    const allowedStatus = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!allowedStatus.includes(status)) {
      throw new ApiError("Invalid order status", 400);
    }

    const order = await orderRepo.findById(orderId);
    if (!order) throw new ApiError("Order not found", 404);

    console.log("🔁 ORDER STATUS UPDATE:", {
      orderId,
      prevStatus: order.status,
      newStatus: status,
      source: order.source
    });

    // 🔒 Prevent double processing
    if (order.status === "PAID" && status === "PAID") {
      console.log("⚠️ Order already paid, skipping");
      return order;
    }

    // 2️⃣ REDUCE STOCK & REMOVE FROM CART ONLY WHEN MOVING TO PAID
    if (order.status !== "PAID" && status === "PAID") {
      console.log("💰 PROCESSING PAYMENT FOR ORDER:", orderId);
      
      // Reduce stock
      for (const item of order.items) {
        console.log("📦 REDUCING STOCK:", item);

        const result = await Product.updateOne(
          {
            _id: item.productId,
            "variants.label": item.variantLabel,
          },
          {
            $inc: { "variants.$.stock": -Number(item.quantity) },
          }
        );

        console.log("🧮 STOCK UPDATE RESULT:", result);

        if (result.modifiedCount === 0) {
          throw new ApiError("Stock update failed", 500);
        }
      }

      // ✅ REMOVE ITEMS FROM CART ONLY AFTER SUCCESSFUL PAYMENT
      if (order.source === "CART") {
        console.log("🛒 REMOVING ITEMS FROM CART FOR ORDER:", orderId);
        try {
          await cartRepo.removeItems(order.userId, order.items);
          console.log("✅ Cart items removed successfully");
        } catch (cartError) {
          console.error("❌ Error removing cart items:", cartError);
          // Don't fail the payment if cart removal fails
        }
      }
    }

    // 3️⃣ UPDATE ORDER STATUS
    order.status = status;
    await order.save();

    console.log("✅ Order status updated to:", status);

    return order;
  }

  // Additional methods for transport/courier management
  async getTransportOrders() {
    return orderRepo.findTransportOrders();
  }

  async assignBus(orderId, busData) {
    const order = await orderRepo.findById(orderId);
    if (!order) throw new ApiError("Order not found", 404);

    if (order.shipping.method !== "TRANSPORT") {
      throw new ApiError("Not a transport order", 400);
    }

    order.shipping.bus = {
      ...busData,
      status: "ASSIGNED",
      assignedAt: new Date()
    };

    await order.save();
    return order;
  }

  async updateTransportStatus(orderId, status) {
    const allowed = ["IN_TRANSIT", "DELIVERED"];
    if (!allowed.includes(status)) {
      throw new ApiError("Invalid transport status", 400);
    }

    const order = await orderRepo.findById(orderId);
    if (!order) throw new ApiError("Order not found", 404);

    if (order.shipping.method !== "TRANSPORT") {
      throw new ApiError("Not a transport order", 400);
    }

    if (!order.shipping.bus) {
      throw new ApiError("Bus not assigned yet", 400);
    }

    order.shipping.bus.status = status;

    if (status === "DELIVERED") {
      order.status = "DELIVERED";
    }

    await order.save();
    return order;
  }

  async assignCourier(orderId, courierData) {
    const order = await orderRepo.findById(orderId);

    if (!order) {
      throw new ApiError("Order not found", 404);
    }

    if (order.shipping.method !== "COURIER") {
      throw new ApiError("Not a courier order", 400);
    }

    order.shipping.courier = {
      company: courierData.company,
      trackingNumber: courierData.trackingNumber,
      trackingUrl: courierData.trackingUrl,
      expectedDeliveryDate: courierData.expectedDeliveryDate,
      status: "IN_TRANSIT",
      assignedAt: new Date(),
    };

    order.status = "SHIPPED";

    await order.save();
    return order;
  }

  async updateCourierStatus(orderId, status) {
    const allowed = ["IN_TRANSIT", "DELIVERED"];
    if (!allowed.includes(status)) {
      throw new ApiError("Invalid courier status", 400);
    }

    const order = await orderRepo.findById(orderId);
    if (!order) throw new ApiError("Order not found", 404);

    if (order.shipping.method !== "COURIER") {
      throw new ApiError("Not a courier order", 400);
    }

    if (!order.shipping.courier) {
      throw new ApiError("Courier not assigned yet", 400);
    }

    order.shipping.courier.status = status;

    if (status === "DELIVERED") {
      order.status = "DELIVERED";
    }

    await order.save();
    return order;
  }

  async getCourierOrders() {
    return orderRepo.find({
      "shipping.method": "COURIER"
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
  }

  // 🆕 Method to handle cancelled orders
  async cancelOrderAndRestoreCart(orderId) {
    const order = await orderRepo.findById(orderId);
    if (!order) throw new ApiError("Order not found", 404);

    console.log("❌ CANCELLING ORDER:", orderId);

    // Restore stock if order was paid
    if (order.status === "PAID") {
      console.log("📦 RESTORING STOCK FOR CANCELLED ORDER");
      for (const item of order.items) {
        await Product.updateOne(
          {
            _id: item.productId,
            "variants.label": item.variantLabel,
          },
          {
            $inc: { "variants.$.stock": Number(item.quantity) },
          }
        );
      }
    }

    // Update order status
    order.status = "CANCELLED";
    await order.save();

    console.log("✅ Order cancelled successfully");

    return order;
  }
}

module.exports = new OrderService();









