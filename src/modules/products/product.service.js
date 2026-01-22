
const ApiError = require("../utils/ApiError");
const { getPublicIdFromUrl } = require("../utils/helpers");
const productRepository = require("./product.repository");
const ProductValidation = require("./product.validation");
const cloudinary = require("../../config/cloudinary");
const generateSKU = require("../utils/generateSKU");
const applyDiscount = require("../utils/applyDiscount");



class ProductService {
  

async createProduct(data, adminId) {
    console.log("data",data);

if (typeof data.variants === "string") {
    data.variants = JSON.parse(data.variants);
  }
    

data.variants = data.variants.map(variant => ({
    ...variant,
    sku: variant.sku && variant.sku.trim() !== ""
      ? variant.sku
      : generateSKU(),
  }));
    
     ProductValidation.validateCreate(data);

    return productRepository.create({
      ...data,
      createdBy: adminId,
    });
}


// async getAllProducts() {
//   const products = await productRepository.findAll();

//   return products.map(product => {
//     const productDiscount = product.discount;

//     const variantsWithDiscount = product.variants.map(v => {
//       // Priority: Variant > Product
//       const discountSource =
//         v.discount?.isActive
//           ? v.discount
//           : productDiscount?.isActive
//           ? productDiscount
//           : null;

//       const discountedPrice = discountSource
//         ? applyDiscount(v.price, discountSource)
//         : v.price;

//       const discountPercentage =
//         discountedPrice < v.price
//           ? Math.round(((v.price - discountedPrice) / v.price) * 100)
//           : 0;

//       return {
//         ...v.toObject(),
//         originalPrice: v.price,
//         discountedPrice,
//         discountPercentage
//       };
//     });

//     return {
//       ...product.toObject(),
//       variants: variantsWithDiscount
//     };
//   });
// }





//festival offer crt code


async getAllProducts() {
  const products = await productRepository.findAll();

  return products.map(product => {
    const variants = product.variants.map(v => {
      let discountedPrice = v.price;
      let discount = null;

      // ✅ Variant discount ONLY if active
      if (v.discount?.isActive === true) {
        const after = applyDiscount(v.price, v.discount);
        if (after < v.price) {
          discountedPrice = after;
          discount = v.discount;
        }
      }

      // ✅ Product discount ONLY if active
      else if (product.discount?.isActive === true) {
        const after = applyDiscount(v.price, product.discount);
        if (after < v.price) {
          discountedPrice = after;
          discount = product.discount;
        }
      }

      return {
        ...v.toObject(),
        originalPrice: v.price,
        discountedPrice, // 🔥 resets automatically
        discount          // 🔥 null if inactive
      };
    });

    return {
      ...product.toObject(),
      discount: product.discount?.isActive === true ? product.discount : null,
      variants
    };
  });
}







async getProduct(id) {
  const product = await productRepository.findById(id);

  if (!product) throw new ApiError("Product not found", 404);

  const productDiscount = product.discount;

  const variantsWithDiscount = product.variants.map(v => {
    const discountSource = v.discount?.isActive ? v.discount : productDiscount;
    const discountedPrice = applyDiscount(v.price, discountSource);

    return {
      ...v.toObject(),
      originalPrice: v.price,
      discountedPrice,
    };
  });

  return {
    ...product.toObject(),
    variants: variantsWithDiscount,
  };
}



  async updateProduct(id, data) {
  const product = await productRepository.findById(id);

  if (!product) {
    throw new ApiError("Product not found", 404);
  }

  // Parse variants
  if (typeof data.variants === "string") {
    try {
      data.variants = JSON.parse(data.variants);
    } catch {
      throw new ApiError("Invalid variants format", 400);
    }
  }

  if (Array.isArray(data.variants)) {
  data.variants = data.variants.map(variant => ({
    ...variant,
    sku: variant.sku && variant.sku.trim() !== ""
      ? variant.sku
      : generateSKU(),
  }));
}


  // Get images to delete (old images that are NOT in new images)
  const imagesToKeep = data.images || []; // New images array (existing + new)
  const imagesToDelete = product.images.filter(oldImage => 
    !imagesToKeep.includes(oldImage)
  );

  // Delete only images that are being removed
  for (const oldUrl of imagesToDelete) {
    try {
      const publicId = getPublicIdFromUrl(oldUrl);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (err) {
      console.error(`Error deleting image ${oldUrl}:`, err);
      // Continue even if one deletion fails
    }
  }

  // Handle main image change
  if (data.mainImage && data.mainImage !== product.mainImage) {
    // Only delete old main image if it's not in the images array anymore
    if (!imagesToKeep.includes(product.mainImage)) {
      try {
        const publicId = getPublicIdFromUrl(product.mainImage);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (err) {
        console.error(`Error deleting old main image:`, err);
      }
    }
  }

  // Ensure mainImage is part of images array
  if (data.mainImage && !imagesToKeep.includes(data.mainImage)) {
    imagesToKeep.unshift(data.mainImage);
  }

  // Update the images array
  data.images = imagesToKeep;

  return productRepository.updateById(id, data);
}



  async deleteProduct (id) {

    const Product = await productRepository.findById(id);

    if(!Product) throw new ApiError("Product not found",404)

    //cloudinary delete

    for (const imageUrl of Product.images) {
    const publicId = getPublicIdFromUrl(imageUrl);
    await cloudinary.uploader.destroy(publicId);
  }

    const deleteProduct = await productRepository.deleteId(id)

    return deleteProduct
}


async toggleProductStatus(productId) {
  
    const product = await productRepository.findById(productId);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    const updatedProduct = await productRepository.updateStatus(
      productId,
      !product.isActive
    );

    return updatedProduct;
  }


}







module.exports = new ProductService();