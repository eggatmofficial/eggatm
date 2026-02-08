const mongoose = require("mongoose");

const franchiseSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    contact: [
      {
        type: String,
        trim: true,
      },
    ],

    lat: {
      type: Number,
      required: true,
    },

    lng: {
      type: Number,
      required: true,
    },

    mapLink: {
      type: String,
    },

    whatsapp: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Franchise", franchiseSchema);