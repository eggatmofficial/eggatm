// import { useState, useRef, useEffect } from "react";
// import { 
//   FaPlus, FaEdit, FaTrash, FaSearch, FaUpload, FaTimes, FaSpinner 
// } from "react-icons/fa";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as productAPI from "../../api/product.api"

// // Default placeholder image
// const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=300&fit=crop";

// const Product = () => {
//   /* ---------------- STATES ---------------- */
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);
//   const [uploadingImages, setUploadingImages] = useState(false);
//   const [statusFilter, setStatusFilter] = useState("all"); 


//   /* ---------------- FORM STATE ---------------- */
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     images: [],
//     mainImage: DEFAULT_IMAGE,
//     variants: [{
//       label: "",
//       weight: "",
//       unit: "g",
//       price: "",
//       stock: "",
//       sku: ""
//     }],
//     isActive: true,
//    discount: {
//     isActive: false,
//     type: "percentage",
//     value: ""
//   }
//   });

//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [imageFiles, setImageFiles] = useState([]);

//   /* ---------------- FETCH PRODUCTS ---------------- */
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await productAPI.getAllProducts();
//       setProducts(response.data?.data || []);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setError("Failed to load products. Please try again.");
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProducts = products.filter(product => {
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all"
//         ? true
//         : statusFilter === "active"
//         ? product.isActive
//         : !product.isActive;

//     return matchesSearch && matchesStatus;
//   });

//   /* ---------------- HANDLERS ---------------- */
//   const openAddModal = () => {
//     setEditingProduct(null);
//     setForm({
//       name: "",
//       description: "",
//       images: [],
//       mainImage: DEFAULT_IMAGE,
//       variants: [{
//         label: "",
//         weight: "",
//         unit: "g",
//         price: "",
//         stock: "",
//         sku: ""
//       }],
//       isActive: true,
//       discount: {
//     isActive: false,
//     mode: "instant",
//     type: "percentage",
//     value: "",
//     label: "",
//     startDate: "",
//     endDate: ""
//     }

//     });
//     setUploadedImages([]);
//     setImageFiles([]);
//     setShowModal(true);
//   };

//  const openEditModal = (product) => {
//   setEditingProduct(product);
//   setForm({
//     ...product,
//     variants: product.variants.map(v => ({
//       ...v,
//       weight: v.weight.toString(),
//       price: v.price.toString(),
//       stock: v.stock.toString(),
//       discount: v.discount || {
//         isActive: false,
//         type: "percentage",
//         value: ""
//       }
//     })),
//     discount: product.discount || {
//       isActive: false,
//       mode: "instant",
//       type: "percentage",
//       value: "",
//       label: "",
//       startDate: "",
//       endDate: ""
//     }
//   });

//   setUploadedImages(product.images || []);
//   setImageFiles([]);
//   setShowModal(true);
// };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ 
//       ...prev, 
//       [name]: value 
//     }));
//   };

//   const handleVariantChange = (index, field, value) => {
//     const updatedVariants = [...form.variants];
//     updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    
//     // Auto-generate label from weight and unit
//     if (field === 'weight' || field === 'unit') {
//       const weight = field === 'weight' ? value : updatedVariants[index].weight;
//       const unit = field === 'unit' ? value : updatedVariants[index].unit;
//       if (weight && unit) {
//         updatedVariants[index].label = `${weight}${unit}`;
//       }
//     }

//     setForm(prev => ({ ...prev, variants: updatedVariants }));
//   };

//   const addVariant = () => {
//   setForm(prev => ({
//     ...prev,
//     variants: [
//       ...prev.variants,
//       {
//         label: "",
//         weight: "",
//         unit: "g",
//         price: "",
//         stock: "",
//         sku: "",
//         discount: {
//           isActive: false,
//           type: "percentage",  
//           value: ""
//         }
//       }
//     ]
//   }));
// };


//   const removeVariant = (index) => {
//     if (form.variants.length > 1) {
//       const updatedVariants = [...form.variants];
//       updatedVariants.splice(index, 1);
//       setForm(prev => ({ ...prev, variants: updatedVariants }));
//     }
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const validFiles = files.filter(file => {
//       if (!file.type.match('image.*')) {
//         toast.error(`${file.name} is not an image file`, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         return false;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error(`${file.name} exceeds 5MB limit`, {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length > 0) {
//       const newImageFiles = [...imageFiles, ...validFiles].slice(0, 4);
//       setImageFiles(newImageFiles);

//       const readers = validFiles.map(file => {
//         return new Promise((resolve) => {
//           const reader = new FileReader();
//           reader.onload = (event) => resolve(event.target.result);
//           reader.readAsDataURL(file);
//         });
//       });

//       Promise.all(readers).then(images => {
//         const newImages = [...uploadedImages, ...images].slice(0, 4);
//         setUploadedImages(newImages);
//         setForm(prev => ({ 
//           ...prev, 
//           images: newImages,
//           mainImage: newImages[0] || DEFAULT_IMAGE 
//         }));
//       });
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = uploadedImages.filter((_, i) => i !== index);
//     const newImageFiles = imageFiles.filter((_, i) => i !== index);
//     setUploadedImages(newImages);
//     setImageFiles(newImageFiles);
//     setForm(prev => ({ 
//       ...prev, 
//       images: newImages,
//       mainImage: newImages[0] || DEFAULT_IMAGE 
//     }));
//   };

//   const setMainImage = (imageUrl) => {
//     setForm(prev => ({ ...prev, mainImage: imageUrl }));
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const prepareFormData = () => {
//   const formData = new FormData();

//   // Basic fields
//   formData.append("name", form.name);
//   formData.append("description", form.description);
//   formData.append("isActive", form.isActive.toString());

//   // Variants as JSON (simpler & safer)
//   formData.append("variants", JSON.stringify(form.variants));

//   // Existing images (URLs only)
//   const existingImageUrls = uploadedImages.filter(img => img.startsWith("http"));
//   if (existingImageUrls.length > 0) {
//     formData.append("existingImages", JSON.stringify(existingImageUrls));
//   }

//   //  ONLY send FILES using field name "images"
//   imageFiles.forEach(file => {
//     formData.append("images", file); // ✔ matches multer
//   });

//   formData.append("discount", JSON.stringify(form.discount));

//   return formData;
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation with toast
//     if (!form.name) {
//       toast.error("Product name is required", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (uploadedImages.length === 0) {
//       toast.error("At least one image is required", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     if (form.variants.some(v => !v.label || !v.weight || !v.price || !v.stock)) {
//       toast.error("Please fill all required fields in variants", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const formData = prepareFormData();

//       if (editingProduct) {
//         // Update existing product
//         await productAPI.updateProduct(editingProduct._id, formData);
//         toast.success("Product updated successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } else {
//         // Create new product
//         await productAPI.createProduct(formData);
//         toast.success("Product created successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }

//       // Refresh product list
//       await fetchProducts();
//       setShowModal(false);
//       resetForm();
      
//     } catch (err) {
//       console.error("Error saving product:", err);
//       toast.error(err.response?.data?.message || "Failed to save product. Please try again.", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     // Confirm with a custom toast
//     const toastId = toast.info(
//       <div className="flex flex-col gap-2">
//         <p className="font-medium">Are you sure you want to delete this product?</p>
//         <div className="flex gap-2 mt-2">
//           <button
//             onClick={() => {
//               toast.dismiss(toastId);
//               confirmDelete(id);
//             }}
//             className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//           >
//             Yes, Delete
//           </button>
//           <button
//             onClick={() => toast.dismiss(toastId)}
//             className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>,
//       {
//         position: "top-center",
//         autoClose: false,
//         closeButton: false,
//       }
//     );
//   };

//   const confirmDelete = async (id) => {
//     try {
//       await productAPI.deleteProduct(id);
//       toast.success("Product deleted successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Error deleting product:", err);
//       toast.error("Failed to delete product. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const toggleProductStatus = async (id) => {
//     const product = products.find(p => p._id === id);
//     if (!product) return;

//     try {
//       const updatedProduct = { ...product, isActive: !product.isActive };
//       const formData = new FormData();
//       formData.append('name', updatedProduct.name);
//       formData.append('description', updatedProduct.description);
//       formData.append('isActive', updatedProduct.isActive);
//       formData.append('mainImage', updatedProduct.mainImage);
//       formData.append('variants', JSON.stringify(updatedProduct.variants));
//       formData.append('existingImages', JSON.stringify(updatedProduct.images || []));

//       await productAPI.updateProduct(id, formData);
      
//       // Update local state
//       setProducts(prev => prev.map(p => 
//         p._id === id ? { ...p, isActive: !p.isActive } : p
//       ));

//       toast.success(`Product ${!product.isActive ? 'activated' : 'deactivated'} successfully!`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } catch (err) {
//       console.error("Error updating product status:", err);
//       toast.error("Failed to update product status.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       name: "",
//       description: "",
//       images: [],
//       mainImage: DEFAULT_IMAGE,
//       variants: [{
//         label: "",
//         weight: "",
//         unit: "g",
//         price: "",
//         stock: "",
//         sku: ""
//       }],
//       isActive: true,
//       discount: {
//       isActive: false,
//       mode: "instant",
//       type: "percentage",
//       value: "",
//       label: "",
//       startDate: "",
//       endDate: ""
//     }
//     });
//     setUploadedImages([]);
//     setImageFiles([]);
//     setEditingProduct(null);
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Products</h1>
//           <p className="text-gray-600">Manage your products</p>
//         </div>
        
//         {/* ADD BUTTON ON RIGHT SIDE */}
//         <button
//           onClick={openAddModal}
//           className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
//           disabled={submitting}
//         >
//           {submitting ? <FaSpinner className="animate-spin" /> : <FaPlus />} 
//           Add Product
//         </button>
//       </div>

//       {/* ERROR MESSAGE */}
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
//           {error}
//           <button 
//             onClick={fetchProducts}
//             className="ml-4 text-red-700 underline hover:text-red-900"
//           >
//             Retry
//           </button>
//         </div>
//       )}

//       {/* SEARCH BAR */}
//       <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
//         <div className="relative">
//           <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search products by name or description..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//           />
//         </div>
//       </div>

//       {/* STATUS FILTER TOGGLE */}
//       <div className="flex gap-3 mb-6">
//         <button
//           onClick={() => setStatusFilter("all")}
//           className={`px-4 py-2 rounded-lg text-sm font-medium ${
//             statusFilter === "all"
//               ? "bg-amber-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           All Products
//         </button>

//         <button
//           onClick={() => setStatusFilter("active")}
//           className={`px-4 py-2 rounded-lg text-sm font-medium ${
//             statusFilter === "active"
//               ? "bg-green-500 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Active
//         </button>

//         <button
//           onClick={() => setStatusFilter("inactive")}
//           className={`px-4 py-2 rounded-lg text-sm font-medium ${
//             statusFilter === "inactive"
//               ? "bg-gray-800 text-white"
//               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//           }`}
//         >
//           Inactive
//         </button>
//       </div>


//       {/* LOADING STATE */}
//       {loading && (
//         <div className="text-center py-16">
//           <FaSpinner className="animate-spin text-4xl text-amber-500 mx-auto mb-4" />
//           <p className="text-gray-600">Loading products...</p>
//         </div>
//       )}

//       {/* PRODUCTS LIST */}
// {!loading && filteredProducts.length > 0 && (
//   <div className="space-y-6">
//     {filteredProducts.map((product) => (
//       <div
//         key={product._id}
//         className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
//       >
//         <div className="flex flex-col md:flex-row">

//           {/* IMAGE SECTION */}
//           <div className="md:w-1/3 p-5 border-b md:border-b-0 md:border-r">
//             <img
//               src={product.mainImage || DEFAULT_IMAGE}
//               alt={product.name}
//               className="w-full h-56 object-cover rounded-xl mb-4"
//               onError={(e) => (e.target.src = DEFAULT_IMAGE)}
//             />

//             {/* THUMBNAILS */}
//             {product.images?.length > 1 && (
//               <div className="flex gap-3">
//                 {product.images
//                   .filter(img => img !== product.mainImage)
//                   .slice(0, 4)
//                   .map((img, idx) => (
//                     <img
//                       key={idx}
//                       src={img}
//                       alt=""
//                       className="w-16 h-16 object-cover rounded-lg border hover:ring-2 hover:ring-amber-400 transition"
//                       onError={(e) => (e.target.src = DEFAULT_IMAGE)}
//                     />
//                   ))}
//               </div>
//             )}
//           </div>

//           {/* CONTENT SECTION */}
//           <div className="flex-1 p-6">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-2xl font-semibold text-gray-800">
//                   {product.name}
//                 </h3>
//                 <p className="text-gray-600 mt-1">
//                   {product.description || "No description"}
//                 </p>
//               </div>

//               <span
//                 className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                   product.isActive
//                     ? "bg-green-100 text-green-800"
//                     : "bg-gray-200 text-gray-700"
//                 }`}
//               >
//                 {product.isActive ? "Active" : "Inactive"}
//               </span>
//             </div>

//             {/* ACTION BUTTONS */}
//             <div className="flex flex-wrap gap-3 mt-6">
//               <button
//                 onClick={() => toggleProductStatus(product._id)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
//                   product.isActive
//                     ? "bg-gray-100 hover:bg-gray-200"
//                     : "bg-green-100 text-green-700 hover:bg-green-200"
//                 }`}
//               >
//                 {product.isActive ? "Deactivate" : "Activate"}
//               </button>

//               <button
//                 onClick={() => openEditModal(product)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition flex items-center gap-1"
//               >
//                 <FaEdit /> Edit
//               </button>

//               <button
//                 onClick={() => handleDelete(product._id)}
//                 className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition flex items-center gap-1"
//               >
//                 <FaTrash /> Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// )}

      

//       {/* Empty State */}
//       {!loading && products.length === 0 && !error && (
//         <div className="text-center py-16">
//           <div className="text-6xl mb-4">🥚</div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No products yet</h3>
//           <p className="text-gray-500 mb-6">Add your first product with variants</p>
//           <button
//             onClick={openAddModal}
//             className="inline-flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors"
//             disabled={submitting}
//           >
//             <FaPlus /> Add Your First Product
//           </button>
//         </div>
//       )}

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
//           <div className="bg-white w-full max-w-4xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {editingProduct ? "Edit Product" : "Add New Product"}
//               </h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-gray-600 text-2xl"
//                 disabled={submitting}
//               >
//                 &times;
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* BASIC INFO */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Product Name *
//                     </label>
//                     <input
//                       name="name"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Enter product name"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                       required
//                       disabled={submitting}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Product Status
//                     </label>
//                     <div className="flex items-center h-full">
//                       <label className="inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={form.isActive}
//                           onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
//                           className="sr-only peer"
//                           disabled={submitting}
//                         />
//                         <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
//                         <span className="ml-3 text-sm text-gray-700">
//                           {form.isActive ? "Active" : "Inactive"}
//                         </span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Description
//                   </label>
//                   <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     placeholder="Product description..."
//                     rows="3"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                     disabled={submitting}
//                   />
//                 </div>
//               </div>

//               {/* VARIANTS SECTION */}
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Variants</h3>
//                   <button
//                     type="button"
//                     onClick={addVariant}
//                     className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//                     disabled={submitting}
//                   >
//                     <FaPlus /> Add Variant
//                   </button>
//                 </div>

//                 {form.variants.map((variant, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
//                     <div className="flex justify-between items-center mb-4">
//                       <h4 className="font-medium text-gray-800">Variant {index + 1}</h4>
//                       {form.variants.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeVariant(index)}
//                           className="text-red-500 hover:text-red-700"
//                           disabled={submitting}
//                         >
//                           <FaTrash />
//                         </button>
//                       )}
//                     </div>

//                     <div className="space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Weight *
//                           </label>
//                           <input
//                             type="number"
//                             value={variant.weight}
//                             onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
//                             placeholder="e.g., 250"
//                             min="1"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                             required
//                             disabled={submitting}
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Unit *
//                           </label>
//                           <select
//                             value={variant.unit}
//                             onChange={(e) => handleVariantChange(index, 'unit', e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                             disabled={submitting}
//                           >
//                             <option value="g">Grams (g)</option>
//                             <option value="kg">Kilograms (kg)</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Variant Label *
//                           </label>
//                           <input
//                             value={variant.label}
//                             onChange={(e) => handleVariantChange(index, 'label', e.target.value)}
//                             placeholder="Auto-generated"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                             required
//                             disabled={submitting}
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             SKU
//                           </label>
//                           <input
//                             value={variant.sku}
//                             onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
//                             placeholder="SKU code"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
//                             disabled={submitting}
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Price (₹) *
//                           </label>
//                           <input
//                             type="number"
//                             value={variant.price}
//                             onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
//                             placeholder="0"
//                             min="0"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                             required
//                             disabled={submitting}
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Stock *
//                           </label>
//                           <input
//                             type="number"
//                             value={variant.stock}
//                             onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
//                             placeholder="0"
//                             min="0"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                             required
//                             disabled={submitting}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     {/* VARIANT DISCOUNT */}
// <div className="mt-4 border-t pt-4">
//   <label className="flex items-center gap-3 mb-3">
//     <input
//       type="checkbox"
//       checked={variant.discount?.isActive || false}
//     onChange={(e) =>
//   handleVariantChange(index, "discount", {
//     isActive: e.target.checked,
//     type: variant.discount?.type || "percentage",
//     value: variant.discount?.value || ""
//   })
// }

//     />
//     <span className="text-sm font-medium text-gray-700">
//       Enable Variant Discount
//     </span>
//   </label>

//   {variant.discount?.isActive && (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Discount Type
//         </label>
//         <select
//           value={variant.discount.type || "percentage"}
//           onChange={(e) =>
//             handleVariantChange(index, "discount", {
//               ...variant.discount,
//               type: e.target.value
//             })
//           }
//           className="w-full border rounded-lg px-3 py-2"
//         >
//           <option value="percentage">Percentage (%)</option>
//           <option value="flat">Flat (₹)</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">
//           Discount Value
//         </label>
//         <input
//           type="number"
//           value={variant.discount.value}
//           onChange={(e) =>
//             handleVariantChange(index, "discount", {
//               ...variant.discount,
//               value: e.target.value
//             })
//           }
//           className="w-full border rounded-lg px-3 py-2"
//         />
//       </div>
//     </div>
//   )}
// </div>

//                   </div>
//                 ))}
//               </div>

//               {/* IMAGES SECTION */}
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Images</h3>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Upload Images (1-4 images required) *
//                   </label>
                  
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileUpload}
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                     disabled={submitting}
//                   />

//                   <div 
//                     onClick={triggerFileInput}
//                     className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors group mb-4"
//                   >
//                     <div className="flex flex-col items-center justify-center">
//                       <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
//                         {submitting ? (
//                           <FaSpinner className="animate-spin text-amber-600 text-2xl" />
//                         ) : (
//                           <FaUpload className="text-amber-600 text-2xl" />
//                         )}
//                       </div>
//                       <p className="text-gray-700 font-medium mb-1">
//                         {submitting ? "Uploading..." : "Click to upload images"}
//                       </p>
//                       <p className="text-gray-500 text-sm">Upload 1-4 product images</p>
//                       <p className="text-gray-400 text-xs mt-2">Supports JPG, PNG, GIF (max 5MB each)</p>
//                     </div>
//                   </div>

//                   {form.images.length > 0 && (
//                     <div className="space-y-4">
//                       <p className="text-sm text-gray-600">
//                         {form.images.length} image{form.images.length !== 1 ? 's' : ''} selected
//                       </p>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {form.images.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img
//                               src={img}
//                               alt={`Preview ${idx + 1}`}
//                               className={`w-full h-48 object-cover rounded-lg cursor-pointer ${
//                                 form.mainImage === img ? 'ring-2 ring-amber-500' : ''
//                               }`}
//                               onClick={() => !submitting && setMainImage(img)}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => !submitting && handleRemoveImage(idx)}
//                               className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
//                               disabled={submitting}
//                             >
//                               <FaTimes />
//                             </button>
//                             {form.mainImage === img && (
//                               <div className="absolute bottom-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs">
//                                 Main Image
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                       <p className="text-sm text-gray-500">
//                         Click on an image to set as main display image
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* DISCOUNT SECTION */}
//               <div className="space-y-6 border-t pt-6">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Discount Settings
//                 </h3>

//                 {/* Enable Discount */}
//                 <label className="flex items-center gap-3">
//                   <input
//                     type="checkbox"
//                     checked={form.discount.isActive}
//                     onChange={(e) =>
//                       setForm(prev => ({
//                         ...prev,
//                         discount: {
//                           ...prev.discount,
//                           isActive: e.target.checked
//                         }
//                       }))
//                     }
//                   />
//                   <span className="text-gray-700 font-medium">
//                     Enable Discount
//                   </span>
//                 </label>

//                 {/* SHOW ONLY IF ENABLED */}
//                 {form.discount.isActive && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                     {/* Discount Mode */}
//                     <div>
//                       <label className="block text-sm font-medium mb-1">
//                         Discount Mode
//                       </label>
//                       <select
//                         value={form.discount.mode}
//                         onChange={(e) =>
//                           setForm(prev => ({
//                             ...prev,
//                             discount: {
//                               ...prev.discount,
//                               mode: e.target.value
//                             }
//                           }))
//                         }
//                         className="w-full border rounded-lg px-3 py-2"
//                       >
//                         <option value="instant">Instant Discount</option>
//                         <option value="festival">Festival Discount</option>
//                       </select>
//                     </div>

//                     {/* Discount Type */}
//                     <div>
//                       <label className="block text-sm font-medium mb-1">
//                         Discount Type
//                       </label>
//                       <select
//                         value={form.discount.type}
//                         onChange={(e) =>
//                           setForm(prev => ({
//                             ...prev,
//                             discount: {
//                               ...prev.discount,
//                               type: e.target.value
//                             }
//                           }))
//                         }
//                         className="w-full border rounded-lg px-3 py-2"
//                       >
//                         <option value="percentage">Percentage (%)</option>
//                         <option value="flat">Flat Amount (₹)</option>
//                       </select>
//                     </div>

//                     {/* Discount Value */}
//                     <div>
//                       <label className="block text-sm font-medium mb-1">
//                         Discount Value
//                       </label>
//                       <input
//                         type="number"
//                         placeholder="e.g. 10"
//                         value={form.discount.value}
//                         onChange={(e) =>
//                           setForm(prev => ({
//                             ...prev,
//                             discount: {
//                               ...prev.discount,
//                               value: e.target.value
//                             }
//                           }))
//                         }
//                         className="w-full border rounded-lg px-3 py-2"
//                       />
//                     </div>

//                     {/* Label */}
//                     <div>
//                       <label className="block text-sm font-medium mb-1">
//                         Offer Name (optional)
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="Pongal Offer"
//                         value={form.discount.label}
//                         onChange={(e) =>
//                           setForm(prev => ({
//                             ...prev,
//                             discount: {
//                               ...prev.discount,
//                               label: e.target.value
//                             }
//                           }))
//                         }
//                         className="w-full border rounded-lg px-3 py-2"
//                       />
//                     </div>

//                     {/* FESTIVAL DATES */}
//                     {form.discount.mode === "festival" && (
//                       <>
//                         <div>
//                           <label className="block text-sm font-medium mb-1">
//                             Start Date
//                           </label>
//                           <input
//                             type="date"
//                             value={form.discount.startDate}
//                             onChange={(e) =>
//                               setForm(prev => ({
//                                 ...prev,
//                                 discount: {
//                                   ...prev.discount,
//                                   startDate: e.target.value
//                                 }
//                               }))
//                             }
//                             className="w-full border rounded-lg px-3 py-2"
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium mb-1">
//                             End Date
//                           </label>
//                           <input
//                             type="date"
//                             value={form.discount.endDate}
//                             onChange={(e) =>
//                               setForm(prev => ({
//                                 ...prev,
//                                 discount: {
//                                   ...prev.discount,
//                                   endDate: e.target.value
//                                 }
//                               }))
//                             }
//                             className="w-full border rounded-lg px-3 py-2"
//                           />
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>


//               {/* ACTIONS */}
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
//                   disabled={submitting}
//                 >
//                   {submitting && <FaSpinner className="animate-spin" />}
//                   {editingProduct ? "Update Product" : "Add Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;


import { useState, useRef, useEffect } from "react";
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaUpload, FaTimes, FaSpinner,
  FaChevronLeft, FaChevronRight, FaBox, FaImages, FaTag,
  FaEye, FaEyeSlash, FaSort, FaSortUp, FaSortDown
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as productAPI from "../../api/product.api"

// Default placeholder image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=300&fit=crop";

const Product = () => {
  /* ---------------- STATES ---------------- */
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const productsPerPage = 5;

  /* ---------------- FORM STATE ---------------- */
  const [form, setForm] = useState({
    name: "",
    description: "",
    images: [],
    mainImage: DEFAULT_IMAGE,
    variants: [{
      label: "",
      weight: "",
      unit: "g",
      price: "",
      stock: "",
      sku: ""
    }],
    isActive: true,
    discount: {
      isActive: false,
      mode: "instant",
      type: "percentage",
      value: "",
      label: "",
      startDate: "",
      endDate: ""
    }
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAllProducts();
      setProducts(response.data?.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SORTING LOGIC ---------------- */
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    return sortConfig.direction === 'ascending' 
      ? <FaSortUp className="text-amber-500" /> 
      : <FaSortDown className="text-amber-500" />;
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? product.isActive
          : !product.isActive;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'ascending' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === 'status') {
        return sortConfig.direction === 'ascending' 
          ? (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1)
          : (a.isActive === b.isActive ? 0 : a.isActive ? 1 : -1);
      }
      if (sortConfig.key === 'variants') {
        const aCount = a.variants?.length || 0;
        const bCount = b.variants?.length || 0;
        return sortConfig.direction === 'ascending' 
          ? aCount - bCount
          : bCount - aCount;
      }
      if (sortConfig.key === 'price') {
        const aMin = Math.min(...(a.variants?.map(v => v.price) || [0]));
        const bMin = Math.min(...(b.variants?.map(v => v.price) || [0]));
        return sortConfig.direction === 'ascending' 
          ? aMin - bMin
          : bMin - aMin;
      }
      return 0;
    });

  /* ---------------- PAGINATION LOGIC ---------------- */
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) pageNumbers.push(1, '...');
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages) pageNumbers.push('...', totalPages);
    }

    return pageNumbers;
  };

  /* ---------------- HANDLERS ---------------- */
  const openAddModal = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      description: "",
      images: [],
      mainImage: DEFAULT_IMAGE,
      variants: [{
        label: "",
        weight: "",
        unit: "g",
        price: "",
        stock: "",
        sku: ""
      }],
      isActive: true,
      discount: {
        isActive: false,
        mode: "instant",
        type: "percentage",
        value: "",
        label: "",
        startDate: "",
        endDate: ""
      }
    });
    setUploadedImages([]);
    setImageFiles([]);
    setShowModal(true);
  };

 const openEditModal = (product) => {
  setEditingProduct(product);
  setForm({
    ...product,
    variants: product.variants.map(v => ({
      ...v,
      weight: v.weight.toString(),
      price: v.price.toString(),
      stock: v.stock.toString(),
      // 🔥 FIX HERE
      discount: v.discount?.isActive ? v.discount : undefined
    })),
    discount: product.discount || {
      isActive: false,
      mode: "instant",
      type: "percentage",
      value: "",
      label: "",
      startDate: "",
      endDate: ""
    }
  });

  setUploadedImages(product.images || []);
  setImageFiles([]);
  setShowModal(true);
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...form.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    
    if (field === 'weight' || field === 'unit') {
      const weight = field === 'weight' ? value : updatedVariants[index].weight;
      const unit = field === 'unit' ? value : updatedVariants[index].unit;
      if (weight && unit) {
        updatedVariants[index].label = `${weight}${unit}`;
      }
    }

    setForm(prev => ({ ...prev, variants: updatedVariants }));
  };

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          label: "",
          weight: "",
          unit: "g",
          price: "",
          stock: "",
          sku: "",
          discount: {
            isActive: false,
            type: "percentage",  
            value: ""
          }
        }
      ]
    }));
  };

  const removeVariant = (index) => {
    if (form.variants.length > 1) {
      const updatedVariants = [...form.variants];
      updatedVariants.splice(index, 1);
      setForm(prev => ({ ...prev, variants: updatedVariants }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      if (!file.type.match('image.*')) {
        toast.error(`${file.name} is not an image file`, {
          position: "top-right",
          autoClose: 3000,
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`, {
          position: "top-right",
          autoClose: 3000,
        });
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      const newImageFiles = [...imageFiles, ...validFiles].slice(0, 4);
      setImageFiles(newImageFiles);

      const readers = validFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(images => {
        const newImages = [...uploadedImages, ...images].slice(0, 4);
        setUploadedImages(newImages);
        setForm(prev => ({ 
          ...prev, 
          images: newImages,
          mainImage: newImages[0] || DEFAULT_IMAGE 
        }));
      });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setImageFiles(newImageFiles);
    setForm(prev => ({ 
      ...prev, 
      images: newImages,
      mainImage: newImages[0] || DEFAULT_IMAGE 
    }));
  };

  const setMainImage = (imageUrl) => {
    setForm(prev => ({ ...prev, mainImage: imageUrl }));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const prepareFormData = () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("isActive", form.isActive.toString());
    formData.append("variants", JSON.stringify(form.variants));

    const existingImageUrls = uploadedImages.filter(img => img.startsWith("http"));
    if (existingImageUrls.length > 0) {
      formData.append("existingImages", JSON.stringify(existingImageUrls));
    }

    imageFiles.forEach(file => {
      formData.append("images", file);
    });

    formData.append("discount", JSON.stringify(form.discount));

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      toast.error("Product name is required", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (uploadedImages.length === 0) {
      toast.error("At least one image is required", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (form.variants.some(v => !v.label || !v.weight || !v.price || !v.stock)) {
      toast.error("Please fill all required fields in variants", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setSubmitting(true);
      if (form.discount.isActive) {
      form.variants = form.variants.map(v => ({
        ...v,
        discount: {
          isActive: false,
          type: v.discount?.type || "percentage",
          value: 0,
          label: ""
        }
      }));
    }

      const formData = prepareFormData();

      if (editingProduct) {
        await productAPI.updateProduct(editingProduct._id, formData);
        toast.success("Product updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await productAPI.createProduct(formData);
        toast.success("Product created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      await fetchProducts();
      setShowModal(false);
      resetForm();
      
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error(err.response?.data?.message || "Failed to save product. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const toastId = toast.info(
      <div className="flex flex-col gap-2">
        <p className="font-medium">Are you sure you want to delete this product?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              confirmDelete(id);
            }}
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
      }
    );
  };

  const confirmDelete = async (id) => {
    try {
      await productAPI.deleteProduct(id);
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const toggleProductStatus = async (id) => {
    const product = products.find(p => p._id === id);
    if (!product) return;

    try {
      const updatedProduct = { ...product, isActive: !product.isActive };
      const formData = new FormData();
      formData.append('name', updatedProduct.name);
      formData.append('description', updatedProduct.description);
      formData.append('isActive', updatedProduct.isActive);
      formData.append('mainImage', updatedProduct.mainImage);
      formData.append('variants', JSON.stringify(updatedProduct.variants));
      formData.append('existingImages', JSON.stringify(updatedProduct.images || []));

      await productAPI.updateProduct(id, formData);
      
      setProducts(prev => prev.map(p => 
        p._id === id ? { ...p, isActive: !p.isActive } : p
      ));

      toast.success(`Product ${!product.isActive ? 'activated' : 'deactivated'} successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error updating product status:", err);
      toast.error("Failed to update product status.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      images: [],
      mainImage: DEFAULT_IMAGE,
      variants: [{
        label: "",
        weight: "",
        unit: "g",
        price: "",
        stock: "",
        sku: ""
      }],
      isActive: true,
      discount: {
        isActive: false,
        mode: "instant",
        type: "percentage",
        value: "",
        label: "",
        startDate: "",
        endDate: ""
      }
    });
    setUploadedImages([]);
    setImageFiles([]);
    setEditingProduct(null);
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const tableHeaders = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'image', label: 'Image', sortable: false },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'variants', label: 'Variants', sortable: true },
    { key: 'price', label: 'Price Range', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage your products and inventory</p>
        </div>
        
        <button
          onClick={openAddModal}
          className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-300"
          disabled={submitting}
        >
          {submitting ? <FaSpinner className="animate-spin" /> : <FaPlus className="text-lg" />} 
          Add New Product
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaBox className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Products</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {products.filter(p => p.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaEye className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Inactive Products</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {products.filter(p => !p.isActive).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaEyeSlash className="text-gray-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Variants</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {products.reduce((sum, p) => sum + (p.variants?.length || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaTag className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {setStatusFilter("all"); setCurrentPage(1);}}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                statusFilter === "all"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => {setStatusFilter("active"); setCurrentPage(1);}}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                statusFilter === "active"
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active
            </button>

            <button
              onClick={() => {setStatusFilter("inactive"); setCurrentPage(1);}}
              className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                statusFilter === "inactive"
                  ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={fetchProducts}
            className="text-red-700 underline hover:text-red-900 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
          <FaSpinner className="animate-spin text-4xl text-amber-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      )}

      {/* PRODUCTS TABLE */}
      {!loading && filteredProducts.length > 0 && (
        <>
          {/* Table Info */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-800">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
            </p>
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th 
                        key={header.key}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          {header.label}
                          {header.sortable && (
                            <button
                              onClick={() => requestSort(header.key)}
                              className="hover:text-amber-500 transition-colors"
                            >
                              {getSortIcon(header.key)}
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProducts.map((product) => (
                    <tr 
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* Product Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {product._id.slice(-8).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Image */}
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                              src={product.mainImage || DEFAULT_IMAGE}
                              alt={product.name}
                              onError={(e) => (e.target.src = DEFAULT_IMAGE)}
                            />
                          </div>
                          <div className="ml-4 text-xs text-gray-500">
                            {product.images?.length || 0} images
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {product.description || "No description"}
                        </div>
                      </td>

                      {/* Variants */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.variants?.length || 0} variants
                          </span>
                          {product.variants?.slice(0, 2).map((variant, idx) => (
                            <span key={idx} className="text-xs text-gray-600 truncate">
                              {variant.label}: ₹{variant.price}
                            </span>
                          ))}
                          {product.variants?.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{product.variants.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Price Range */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {product.variants?.length > 0 ? (
                            <>
                              <span className="font-semibold">
                                ₹{Math.min(...product.variants.map(v => v.price))}
                              </span>
                              <span className="text-gray-500 mx-1">-</span>
                              <span className="font-semibold">
                                ₹{Math.max(...product.variants.map(v => v.price))}
                              </span>
                            </>
                          ) : (
                            <span className="text-gray-500">No variants</span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.isActive ? (
                            <>
                              <FaEye className="mr-1" /> Active
                            </>
                          ) : (
                            <>
                              <FaEyeSlash className="mr-1" /> Inactive
                            </>
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleProductStatus(product._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              product.isActive
                                ? 'text-gray-600 hover:bg-gray-100'
                                : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={product.isActive ? "Deactivate" : "Activate"}
                          >
                            {product.isActive ? <FaEyeSlash /> : <FaEye />}
                          </button>

                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* PAGINATION */}
      {!loading && filteredProducts.length > 0 && totalPages > 1 && (
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>

            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                <FaChevronLeft className="text-sm" /> Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  pageNum === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === pageNum
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                Next <FaChevronRight className="text-sm" />
              </button>
            </div>

            {/* Page Input */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Go to page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1));
                  paginate(page);
                }}
                className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-gray-600">of {totalPages}</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && !error && (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBox className="text-amber-600 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {searchTerm || statusFilter !== "all" 
              ? "No products match your search criteria. Try adjusting your filters."
              : "Get started by adding your first product to the inventory."}
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            disabled={submitting}
          >
            <FaPlus /> Add Your First Product
          </button>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
                disabled={submitting}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* BASIC INFO */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Status
                    </label>
                    <div className="flex items-center h-full">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.isActive}
                          onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="sr-only peer"
                          disabled={submitting}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-amber-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        <span className="ml-3 text-sm text-gray-700">
                          {form.isActive ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Product description..."
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    disabled={submitting}
                  />
                </div>
              </div>

              {/* VARIANTS SECTION */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Variants</h3>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    disabled={submitting}
                  >
                    <FaPlus /> Add Variant
                  </button>
                </div>

                {form.variants.map((variant, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-800">Variant {index + 1}</h4>
                      {form.variants.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="text-red-500 hover:text-red-700"
                          disabled={submitting}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weight *
                          </label>
                          <input
                            type="number"
                            value={variant.weight}
                            onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
                            placeholder="e.g., 250"
                            min="1"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit *
                          </label>
                          <select
                            value={variant.unit}
                            onChange={(e) => handleVariantChange(index, 'unit', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            disabled={submitting}
                          >
                            <option value="g">Grams (g)</option>
                            <option value="kg">Kilograms (kg)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Variant Label *
                          </label>
                          <input
                            value={variant.label}
                            onChange={(e) => handleVariantChange(index, 'label', e.target.value)}
                            placeholder="Auto-generated"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SKU
                          </label>
                          <input
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                            placeholder="SKU code"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                            disabled={submitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price (₹) *
                          </label>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                            placeholder="0"
                            min="0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                            disabled={submitting}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock *
                          </label>
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                            placeholder="0"
                            min="0"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                            disabled={submitting}
                          />
                        </div>
                      </div>
                    </div>
                    {/* VARIANT DISCOUNT */}
                    <div className="mt-4 border-t pt-4">
                      <label className="flex items-center gap-3 mb-3">
                        <input
                          type="checkbox"
                          checked={variant.discount?.isActive || false}
                          onChange={(e) =>
                            handleVariantChange(index, "discount", {
                              isActive: e.target.checked,
                              type: variant.discount?.type || "percentage",
                              value: variant.discount?.value || ""
                            })
                          }
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Enable Variant Discount
                        </span>
                      </label>

                      {variant.discount?.isActive && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Discount Type
                            </label>
                            <select
                              value={variant.discount.type || "percentage"}
                              onChange={(e) =>
                                handleVariantChange(index, "discount", {
                                  ...variant.discount,
                                  type: e.target.value
                                })
                              }
                              className="w-full border rounded-lg px-3 py-2"
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="flat">Flat (₹)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Discount Value
                            </label>
                            <input
                              type="number"
                              value={variant.discount.value}
                              onChange={(e) =>
                                handleVariantChange(index, "discount", {
                                  ...variant.discount,
                                  value: e.target.value
                                })
                              }
                              className="w-full border rounded-lg px-3 py-2"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* IMAGES SECTION */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Product Images</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Images (1-4 images required) *
                  </label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                    disabled={submitting}
                  />

                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-colors group mb-4"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                        {submitting ? (
                          <FaSpinner className="animate-spin text-amber-600 text-2xl" />
                        ) : (
                          <FaUpload className="text-amber-600 text-2xl" />
                        )}
                      </div>
                      <p className="text-gray-700 font-medium mb-1">
                        {submitting ? "Uploading..." : "Click to upload images"}
                      </p>
                      <p className="text-gray-500 text-sm">Upload 1-4 product images</p>
                      <p className="text-gray-400 text-xs mt-2">Supports JPG, PNG, GIF (max 5MB each)</p>
                    </div>
                  </div>

                  {form.images.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {form.images.length} image{form.images.length !== 1 ? 's' : ''} selected
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {form.images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              className={`w-full h-48 object-cover rounded-lg cursor-pointer ${
                                form.mainImage === img ? 'ring-2 ring-amber-500' : ''
                              }`}
                              onClick={() => !submitting && setMainImage(img)}
                            />
                            <button
                              type="button"
                              onClick={() => !submitting && handleRemoveImage(idx)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
                              disabled={submitting}
                            >
                              <FaTimes />
                            </button>
                            {form.mainImage === img && (
                              <div className="absolute bottom-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs">
                                Main Image
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        Click on an image to set as main display image
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* DISCOUNT SECTION */}
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Discount Settings
                </h3>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.discount.isActive}
                    onChange={(e) =>
                      setForm(prev => ({
                        ...prev,
                        discount: {
                          ...prev.discount,
                          isActive: e.target.checked
                        }
                      }))
                    }
                  />
                  <span className="text-gray-700 font-medium">
                    Enable Discount
                  </span>
                </label>

                {form.discount.isActive && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Discount Mode
                      </label>
                      <select
                        value={form.discount.mode}
                        onChange={(e) =>
                          setForm(prev => ({
                            ...prev,
                            discount: {
                              ...prev.discount,
                              mode: e.target.value
                            }
                          }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="instant">Instant Discount</option>
                        <option value="festival">Festival Discount</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Discount Type
                      </label>
                      <select
                        value={form.discount.type}
                        onChange={(e) =>
                          setForm(prev => ({
                            ...prev,
                            discount: {
                              ...prev.discount,
                              type: e.target.value
                            }
                          }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="percentage">Percentage (%)</option>
                        <option value="flat">Flat Amount (₹)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Discount Value
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 10"
                        value={form.discount.value}
                        onChange={(e) =>
                          setForm(prev => ({
                            ...prev,
                            discount: {
                              ...prev.discount,
                              value: e.target.value
                            }
                          }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Offer Name (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Pongal Offer"
                        value={form.discount.label}
                        onChange={(e) =>
                          setForm(prev => ({
                            ...prev,
                            discount: {
                              ...prev.discount,
                              label: e.target.value
                            }
                          }))
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    {form.discount.mode === "festival" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={form.discount.startDate}
                            onChange={(e) =>
                              setForm(prev => ({
                                ...prev,
                                discount: {
                                  ...prev.discount,
                                  startDate: e.target.value
                                }
                              }))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={form.discount.endDate}
                            onChange={(e) =>
                              setForm(prev => ({
                                ...prev,
                                discount: {
                                  ...prev.discount,
                                  endDate: e.target.value
                                }
                              }))
                            }
                            className="w-full border rounded-lg px-3 py-2"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-colors flex items-center gap-2"
                  disabled={submitting}
                >
                  {submitting && <FaSpinner className="animate-spin" />}
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;