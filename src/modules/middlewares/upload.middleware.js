const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        width: 600,
        height: 600,
        crop: "fill",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  },
});

const upload = multer({
  storage,
  limits: {
    files: 4, // Maximum 4 files
    fileSize: 5 * 1024 * 1024, // 5MB per file
    fieldSize: 10 * 1024 * 1024, // Increase field size to 10MB for JSON data
    fields: 20, // Maximum 20 fields
  },
});

module.exports = upload;