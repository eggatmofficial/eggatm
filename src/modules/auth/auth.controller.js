const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const authService = require("./auth.service");
const Order = require("../orders/order.model");
const Product = require("../products/product.model");
const User = require("../users/user.model");


exports.login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  res.status(200).json(new ApiResponse(200, data, "Login successful"));
});



exports.getDashboardStats = async (req, res) => {
  const [orders, products, users] = await Promise.all([
    Order.find({ status: { $ne: "CANCELLED" } }),
    Product.countDocuments(),
    User.countDocuments({ role: "user" }),
  ]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  res.json({
    success: true,
    data: {
      totalOrders: orders.length,
      totalRevenue,
      totalProducts: products,
      totalUsers: users,
    },
  });
};

