const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const variantSchema = new mongoose.Schema(
  {
    label: { type: String, required: true }, // "250g"
    weight: { type: Number, required: true }, // 250
    unit: { type: String, enum: ["g", "kg"], required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    sku: String,
    discount: {
      type: {
        type: "percentage" | "flat",
        type: String,
        enum: ["percentage", "flat"],
      },
      value: {
        type: Number,
        min: 0,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      label: String, // "500g Offer"
    },
  },
  { _id: false }
);

const discountSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ["instant", "festival"], // admin / festival
    },

    type: {
      type: String,
      enum: ["percentage", "flat"],
    },

    value: {
      type: Number,
      min: 0,
    },

    startDate: Date, // only for festival
    endDate: Date,

    isActive: {
      type: Boolean,
      default: false,
    },

    label: String, // "Pongal Offer"
  },
  { _id: false }
);


const productSchema = new mongoose.Schema(
  {

    name: { type: String, required: true, trim: true },
    description: String,

    images: {
      type: [String],
      required: true,
      validate: [arr => arr.length > 0 && arr.length <= 4, "1–4 images required"],
    },

    mainImage: { type: String, required: true },

    discount: discountSchema,

    variants: {
      type: [variantSchema],
      required: true,
      validate: [arr => arr.length > 0, "At least one variant required"],
    },
    sku: {
      type: String,
    },

    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);



module.exports = mongoose.model("Product", productSchema);
