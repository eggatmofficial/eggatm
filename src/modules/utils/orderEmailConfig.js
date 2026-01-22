module.exports = (order, baseUrl) => {
  switch (order.status) {
    case "CREATED":
      return {
        title: "Order Placed Successfully",
        message: "Your order has been placed and is awaiting payment.",
        color: "#2e7d32",
        showItems: true,
        ctaText: "View Order",
        ctaUrl: `${baseUrl}/orders/${order._id}`,
      };

    case "PAID":
      return {
        title: "Payment Successful",
        message: "Your payment was successful. We are preparing your order.",
        color: "#1565c0",
        showItems: false,
        ctaText: "View Order",
        ctaUrl: `${baseUrl}/orders/${order._id}`,
      };

    case "SHIPPED":
      return {
        title: "Order Shipped 🚚",
        message: "Your order has been shipped and is on the way.",
        color: "#ef6c00",
        showItems: false,
        ctaText: "Track Order",
        ctaUrl: `${baseUrl}/orders/${order._id}`,
      };

    case "DELIVERED":
      return {
        title: "Order Delivered 🎉",
        message: "Your order has been delivered successfully.",
        color: "#2e7d32",
        showItems: false,
        ctaText: "Order Details",
        ctaUrl: `${baseUrl}/orders/${order._id}`,
      };

    case "CANCELLED":
      return {
        title: "Order Cancelled",
        message: "Your order has been cancelled. If paid, refund will be processed.",
        color: "#d32f2f",
        showItems: false,
        ctaText: null,
        ctaUrl: null,
      };

    default:
      return null;
  }
};
