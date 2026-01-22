exports.getPublicIdFromUrl = (url) => {
  // Example URL:
  // https://res.cloudinary.com/<cloud>/image/upload/v123/products/abc123.webp

  const parts = url.split("/");
  const fileName = parts[parts.length - 1]; // abc123.webp
  const publicId = fileName.split(".")[0];

  return `products/${publicId}`; // folder must match multer folder
};
