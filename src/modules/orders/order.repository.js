// const Order = require("./order.model");

// class OrderRepository {
//   create(data) {
//     return Order.create(data);
//   }

//   findById(id) {
//     return Order.findById(id)
//   }

//   findByUser(userId) {
//     return Order.find({ userId }).sort({ createdAt: -1 });
//   }

//    findByUserId(userId) {
//     return Order.find({ userId })
//     .populate("items.productId", "name")
//     .sort({ createdAt: -1 })
//     .lean()
//   }

//   findUserOrderById(orderId, userId) {
//     return Order.findOne({ _id: orderId, userId });
//   }

//   findAll() {
//     return Order.find().populate("userId", "name email").populate("items.productId", "name mainImage").sort({ createdAt: -1 });
//   }

//    findByIdOne(id) {
//     return Order.findById(id).populate("userId", "name email").populate("items.productId", "name mainImage").sort({ createdAt: -1 });
//   }


//   updateStatus(orderId, status) {
//     return Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );
//   }


// }

// module.exports = new OrderRepository();




const Order = require("./order.model");

class OrderRepository {
  create(data) {
    return Order.create(data);
  }

  findById(id) {
    return Order.findById(id)
  }

  findByUser(userId) {
    return Order.find({ userId }).sort({ createdAt: -1 });
  }

   findByUserId(userId) {
    return Order.find({ userId })
    .populate("items.productId", "name")
    .sort({ createdAt: -1 })
    .lean()
  }

  findUserOrderById(orderId, userId) {
    return Order.findOne({ _id: orderId, userId });
  }

  findAll() {
    return Order.find().populate("userId", "name email addresses").populate("items.productId", "name mainImage").sort({ createdAt: -1 });
  }

   findByIdOne(id) {
    return Order.findById(id).populate("userId", "name email").populate("items.productId", "name mainImage").sort({ createdAt: -1 });
  }


  updateStatus(orderId, status) {
    return Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
  }

  findTransportOrders() {
  return Order.find({
    "shipping.method": "TRANSPORT"
  })
    .populate("userId", "name email addresses")
    .sort({ createdAt: -1 });
}

findCourierOrders() {
  return Order.find({
    "shipping.method": "COURIER"
  })
    .populate("userId", "name email addresses")
    .sort({ createdAt: -1 });
}


}

module.exports = new OrderRepository();
