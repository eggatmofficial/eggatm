const crypto = require("crypto");
const mongoose = require("mongoose");
const razorpay = require("./gateways/razorpay");
const Payment = require("./payment.model");
const Order = require("../orders/order.model");
const ApiError = require("../utils/ApiError");
const orderService = require("../orders/order.service");
const sendOrderStatusEmail = require("../utils/sendOrderStatusEmail");

class PaymentService {
  // STEP 1: INITIATE PAYMENT
  async initiate(orderId, userId) {
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw new ApiError("Invalid orderId", 400);
    }

    const order = await Order.findById(orderId);
    if (!order) throw new ApiError("Order not found", 404);
    if (order.status !== "CREATED")
      throw new ApiError("Order already paid or cancelled", 400);

    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    await Payment.findOneAndUpdate(
      { orderId },
      {
        orderId,
        userId,
        razorpayOrderId: razorpayOrder.id,
        amount: order.totalAmount,
        status: "CREATED",
      },
      { upsert: true, new: true }
    );

    return {
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: order.totalAmount,
      key: process.env.RAZORPAY_KEY_ID,
    };
  }

  // STEP 2: VERIFY PAYMENT
  async verify(data) {
    const body = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== data.razorpay_signature) {
      throw new ApiError("Invalid payment signature", 400);
    }

    const payment = await Payment.findOne({
      razorpayOrderId: data.razorpay_order_id,
    });

    if (!payment) throw new ApiError("Payment record not found", 404);

    payment.status = "SUCCESS";
    payment.razorpayPaymentId = data.razorpay_payment_id;
    payment.razorpaySignature = data.razorpay_signature;
    await payment.save();

    // await Order.findByIdAndUpdate(payment.orderId, {
    //   status: "PAID",
    // });

    // await orderService.updateOrderStatus(payment.orderId, "PAID");


    const order = await orderService.updateOrderStatus(payment.orderId,"PAID" );


    await sendOrderStatusEmail(order);

  console.log(" Payment success email sent to user:", order.userId);

    


    return payment;
  }
}

module.exports = new PaymentService();
