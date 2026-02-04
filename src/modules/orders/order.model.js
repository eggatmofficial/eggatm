// const mongoose = require("mongoose");

// const orderItemSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//     },
//     variantId: {
//       type: mongoose.Schema.Types.ObjectId,
//     },
//     variantLabel: { type: String},
//     price: { type: Number },
//     quantity: { type: Number },
//     subtotal: { type: Number },
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: {
//       type: [orderItemSchema],
//       required: true,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     source: {
//       type: String,
//       enum: ["CART", "BUY_NOW"],
//       default: "CART",
//     },

//     status: {
//       type: String,
//       enum: ["CREATED", "PAID","SHIPPED", "DELIVERED","CANCELLED"],
//       default: "CREATED",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);






const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    variantLabel: { type: String},
    price: { type: Number },
    quantity: { type: Number },
    subtotal: { type: Number },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      enum: ["CART", "BUY_NOW"],
      default: "CART",
    },

    status: {
      type: String,
      enum: ["CREATED", "PAID","SHIPPED", "DELIVERED","CANCELLED"],
      default: "CREATED",
    },

    
  shipping: {
    method: {
      type: String,
      enum: ["PICKUP", "COURIER", "TRANSPORT"],
      required: true,
    },

    charge: { type: Number, default: 0 },

    totalWeight: { type: Number }, // grams

    bus: {
      busNumber: String,
      driverName: String,
      driverPhone: String,
      route: String,
      departureTime: Date,
      status: {
        type: String,
        enum: ["ASSIGNED","IN_TRANSIT", "DELIVERED"],
      },
      assignedAt: Date,
    },

    courier: {
    company: String,
    trackingNumber: String,
    trackingUrl: String,
    dispatchedAt: Date,
    expectedDeliveryDate: Date,
    status: {
      type: String,
      enum: ["DISPATCHED", "IN_TRANSIT", "DELIVERED"],
    },
  },

  }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
