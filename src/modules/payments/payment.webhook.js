const crypto = require("crypto");
const Payment = require("./payment.model");
const Order = require("../orders/order.model");
const Product = require("../products/product.model");
const cartRepo = require("../cart/cart.repository");
const ApiError = require("../utils/ApiError");

const paymentWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const receivedSignature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== receivedSignature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const event = req.body.event;

    // We only care about payment captured
    if (event !== "payment.captured") {
      return res.status(200).json({ status: "ignored" });
    }

    const paymentEntity = req.body.payload.payment.entity;

    const payment = await Payment.findOne({
      razorpayOrderId: paymentEntity.order_id,
    });

    if (!payment || payment.status === "SUCCESS") {
      return res.status(200).json({ status: "already processed" });
    }

    const order = await Order.findById(payment.orderId);
    if (!order || order.status === "PAID") {
      return res.status(200).json({ status: "order already paid" });
    }

    // 🔻 Deduct stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      const variant = product.variants.find(
        (v) => v.label === item.variantLabel
      );

      if (!variant) {
        throw new ApiError("Variant missing during webhook", 400);
      }

      variant.stock -= item.quantity;
      await product.save();
    }

    // Update payment
    payment.status = "SUCCESS";
    payment.razorpayPaymentId = paymentEntity.id;
    await payment.save();

    // Update order
    order.status = "PAID";
    order.paymentId = payment._id;
    await order.save();

    // Clear cart only for CART orders
    if (order.source === "CART") {
      await cartRepo.clearCart(order.userId);
    }

    return res.status(200).json({ status: "payment processed" });
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
};



module.exports = paymentWebhook