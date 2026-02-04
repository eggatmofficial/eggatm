// const asyncHandler = require("../utils/asyncHandler");
// const ApiResponse = require("../utils/ApiResponse");
// const orderService = require("./order.service");

// exports.cartCheckout = asyncHandler(async (req, res) => {
//   const order = await orderService.createFromCart(
//     req.user.id,
//     {
//       items: req.body.items,
//       address: req.body.address,
//     }
//   );

//   res.status(201).json(new ApiResponse(201, order, "Order created from cart"));
// });


// exports.buyNow = asyncHandler(async (req, res) => {
//   const order = await orderService.createFromBuyNow(
//     req.user.id,
//     req.body
//   );

//   res.status(201).json(new ApiResponse(201, order, "Buy-now order created"));
// });


// exports.getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await orderService.getMyOrders(req.user.id);
//   console.log("orders",orders);
  

//   res.status(200).json(new ApiResponse(200, orders, "My orders fetched successfully"));
// });


// exports.getMyOrderById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const order = await orderService.getMyOrderById(id, req.user.id);

//   res.status(200).json(new ApiResponse(200, order, "Order details fetched successfully"));
// });


// exports.getAllOrders = asyncHandler(async (req, res) => {
//   const orders = await orderService.getAllOrders();

//   res.status(200).json(new ApiResponse(200, orders, "All orders fetched successfully") );
// });


// exports.getOrderById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const order = await orderService.getOrderById(id);

//   res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));
// });


// exports.updateOrderStatus = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   console.log("req.body",req.body);
  

//   const order = await orderService.updateOrderStatus(id, status);

//   res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
// });





const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const orderService = require("./order.service");

exports.cartCheckout = asyncHandler(async (req, res) => {
  const order = await orderService.createFromCart(
    req.user.id,
    // {
    //   items: req.body.items,
    //   address: req.body.address,
    // }
    req.body
  );

  res.status(201).json(new ApiResponse(201, order, "Order created from cart"));
});


exports.buyNow = asyncHandler(async (req, res) => {
  const order = await orderService.createFromBuyNow(
    req.user.id,
    req.body
  );

  res.status(201).json(new ApiResponse(201, order, "Buy-now order created"));
});


exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.id);
  console.log("orders",orders);
  

  res.status(200).json(new ApiResponse(200, orders, "My orders fetched successfully"));
});


exports.getMyOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await orderService.getMyOrderById(id, req.user.id);

  res.status(200).json(new ApiResponse(200, order, "Order details fetched successfully"));
});


exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();

  res.status(200).json(new ApiResponse(200, orders, "All orders fetched successfully") );
});


exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await orderService.getOrderById(id);

  res.status(200).json(new ApiResponse(200, order, "Order fetched successfully"));
});


exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("req.body",req.body);
  

  const order = await orderService.updateOrderStatus(id, status);

  res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
});



exports.getTransportOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getTransportOrders();
  res.status(200).json(new ApiResponse(200, orders, "Transport orders fetched"));
});

exports.assignBus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await orderService.assignBus(id, req.body);

  res.status(200).json(new ApiResponse(200, order, "Bus assigned successfully"));
});

exports.getCourierOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getCourierOrders();
  res.json({ success: true, data: orders });
});

exports.updateTransportStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const order = await orderService.updateTransportStatus(orderId, status);

  res.status(200).json({
    success: true,
    message: "Transport status updated",
    data: order,
  });
});


exports.assignCourier = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await orderService.assignCourier(id, req.body);

  res.status(200).json({
    success: true,
    message: "Courier assigned successfully",
    data: order,
  });
});




exports.updateCourierStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const order = await orderService.updateCourierStatus(orderId, status);

  res.status(200).json({
    success: true,
    message: "Courier status updated",
    data: order,
  });
});