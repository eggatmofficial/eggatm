const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const productService = require("./product.service");




exports.createProduct = asyncHandler(async (req, res) => {
    console.log("FILES RECEIVED:", req.files);
 const images = req.files?.images?.map(file => file.path) || [];

  const mainImage =
    req.files?.mainImage?.[0]?.path || images[0];

  if (images.length === 0 && mainImage) {
    images = [mainImage];
  }
  
  let discount = null;

    if (req.body.discount) {
      try {
        discount = JSON.parse(req.body.discount);
      } catch (err) {
        throw new ApiError("Invalid discount format", 400);
      }
    }


  const data = await productService.createProduct(
    {
      ...req.body,
      images,
      mainImage,
      discount 
    },
    req.user.id
  );

  res.status(201).json(new ApiResponse(201, data, "Product created successfully"));
})


exports.getAllProducts = asyncHandler(async (req, res) => {
  const data = await productService.getAllProducts()
  res.status(200).json(new ApiResponse(200, data, "Product fetched successfully"));
});


exports.getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await productService.getProduct(id)
  res.status(200).json(new ApiResponse(200, data, "Single Product fetched successfully"));
});


exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  let updateData = {};

  /* ---------------- BASIC FIELDS ---------------- */
  updateData.name = req.body.name;
  updateData.description = req.body.description;
  updateData.isActive = req.body.isActive === "true";


  /* ---------------- DISCOUNT ---------------- */
if (req.body.discount) {
  try {
    updateData.discount = JSON.parse(req.body.discount);
  } catch (err) {
    throw new ApiError("Invalid discount format", 400);
  }
}


  /* ---------------- VARIANTS ---------------- */
  if (req.body.variants) {
    try {
      updateData.variants = JSON.parse(req.body.variants);
    } catch (err) {
      throw new ApiError("Invalid variants format", 400);
    }
  }

  /* ---------------- EXISTING IMAGES ---------------- */
  let existingImages = [];
  if (req.body.existingImages) {
    try {
      existingImages = JSON.parse(req.body.existingImages);
    } catch (err) {
      throw new ApiError("Invalid existingImages format", 400);
    }
  }

  /* ---------------- NEW UPLOADED IMAGES ---------------- */
  const newImages = req.files?.images
    ? req.files.images.map(file => file.path) // Cloudinary URLs
    : [];

  /* ---------------- MERGE IMAGES ---------------- */
  const finalImages = [...existingImages, ...newImages];

  if (finalImages.length === 0) {
    throw new ApiError("At least one image is required", 400);
  }

  updateData.images = finalImages;

  /* ---------------- MAIN IMAGE ---------------- */
  updateData.mainImage = finalImages[0];

  /* ---------------- UPDATE PRODUCT ---------------- */
  const updatedProduct = await productService.updateProduct(id, updateData);

  res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});


exports.deleteProduct = asyncHandler(async (req,res) => {

 const {id} = req.params;

 const data = await productService.deleteProduct(id);

  res.status(200).json( new ApiResponse(200, data, "Product deleted successfully")
  );
    
})

exports.toggleProductStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const product = await productService.toggleProductStatus(id);

  res.status(200).json( new ApiResponse(200,product,`Product ${product.isActive ? "activated" : "deactivated"} successfully` ));

});


exports.addOrUpdateDiscount = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {mode,type,value,startDate,endDate,isActive,label, } = req.body;

  // Remove discount
  if (isActive === false) {
    const product = await productService.updateProduct(id, {
      discount: { isActive: false },
    });

    return res.status(200).json(
      new ApiResponse(200, product, "Discount removed successfully")
    );
  }

  if (!mode || !type || value === undefined) {
    throw new ApiError("Invalid discount data", 400);
  }

  const product = await productService.updateProduct(id, {
    discount: {
      mode,
      type,
      value,
      startDate,
      endDate,
      isActive: true,
      label,
    },
  });

  res.status(200).json(new ApiResponse(200, product, "Discount applied successfully"));
});



exports.getProducts = async (req, res) => {
  console.log("🔥 getProducts API hit");

  const { search } = req.query; // <-- THIS

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const products = await Product.find(query);

  res.status(200).json({
    status: "success",
    data: products,
  });
};
