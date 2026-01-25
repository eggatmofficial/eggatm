// import { useState, useEffect } from "react";
// import api from "../../api/axios";
// import toast from "react-hot-toast";
// import {
//   FiPackage,
//   FiAlertCircle,
//   FiPlus,
//   FiTrash2,
//   FiEdit,
//   FiSearch,
//   FiFilter,
//   FiTrendingDown,
//   FiBox,
//   FiDollarSign,
//   FiHash,
//   FiCheckCircle,
//   FiXCircle
// } from "react-icons/fi";

// const AdminProductStock = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [lowStockFilter, setLowStockFilter] = useState(false);
//   const [outOfStockFilter, setOutOfStockFilter] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   // Modal states
//   const [showAddVariantModal, setShowAddVariantModal] = useState(false);
//   const [showEditStockModal, setShowEditStockModal] = useState(false);
//   const [showDeleteVariantModal, setShowDeleteVariantModal] = useState(false);
  
//   // Form states
//   const [newVariant, setNewVariant] = useState({
//     label: "",
//     stock: 0,
//     price: 0,
//     sku: "",
//     weight: "",
//     dimensions: ""
//   });
//   const [editStockData, setEditStockData] = useState({
//     label: "",
//     stock: 0
//   });
//   const [variantToDelete, setVariantToDelete] = useState({
//     productId: "",
//     label: ""
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     filterProducts();
//   }, [products, searchTerm, lowStockFilter, outOfStockFilter]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/stock");
//       setProducts(res.data.data);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchLowStock = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/stock/low");
//       setProducts(res.data.data);
//       setLowStockFilter(true);
//       setOutOfStockFilter(false);
//     } catch (err) {
//       console.error("Error fetching low stock:", err);
//       toast.error("Failed to load low stock products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProducts = () => {
//     let filtered = [...products];

//     // Apply search filter
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(term) ||
//         product._id.toLowerCase().includes(term) ||
//         product.variants.some(variant =>
//           variant.label.toLowerCase().includes(term) ||
//           variant.sku?.toLowerCase().includes(term)
//         )
//       );
//     }

//     // Apply low stock filter (stock <= 5)
//     if (lowStockFilter) {
//       filtered = filtered.filter(product =>
//         product.variants.some(variant => variant.stock <= 5 && variant.stock > 0)
//       );
//     }

//     // Apply out of stock filter (stock === 0)
//     if (outOfStockFilter) {
//       filtered = filtered.filter(product =>
//         product.variants.some(variant => variant.stock === 0)
//       );
//     }

//     setFilteredProducts(filtered);
//   };

//   const handleAddVariant = async () => {
//     if (!newVariant.label.trim()) {
//       toast.error("Variant label is required");
//       return;
//     }
//     if (newVariant.stock < 0) {
//       toast.error("Stock cannot be negative");
//       return;
//     }
//     if (newVariant.price <= 0) {
//       toast.error("Price must be greater than 0");
//       return;
//     }

//     try {
//       const res = await api.post(`/stock/${selectedProduct._id}/variant`, newVariant);
//       toast.success("Variant added successfully!");
//       setShowAddVariantModal(false);
//       setNewVariant({
//         label: "",
//         stock: 0,
//         price: 0,
//         sku: "",
//         weight: "",
//         dimensions: ""
//       });
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to add variant");
//     }
//   };

//   const handleUpdateStock = async () => {
//     if (editStockData.stock < 0) {
//       toast.error("Stock cannot be negative");
//       return;
//     }

//     try {
//       await api.put(`/stock/${selectedProduct._id}/stock`, {
//         label: editStockData.label,
//         stock: editStockData.stock
//       });
//       toast.success("Stock updated successfully!");
//       setShowEditStockModal(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update stock");
//     }
//   };

//   const handleDeleteVariant = async () => {
//     try {
//       await api.delete(`/stock/${variantToDelete.productId}/variant`, {
//         data: { label: variantToDelete.label }
//       });
//       toast.success("Variant deleted successfully!");
//       setShowDeleteVariantModal(false);
//       fetchProducts();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete variant");
//     }
//   };

//   const calculateTotalStock = (product) => {
//     return product.variants.reduce((sum, variant) => sum + variant.stock, 0);
//   };

//   const getLowStockCount = () => {
//     let count = 0;
//     products.forEach(product => {
//       product.variants.forEach(variant => {
//         if (variant.stock <= 5 && variant.stock > 0) count++;
//       });
//     });
//     return count;
//   };

//   const getOutOfStockCount = () => {
//     let count = 0;
//     products.forEach(product => {
//       product.variants.forEach(variant => {
//         if (variant.stock === 0) count++;
//       });
//     });
//     return count;
//   };

//   const getStockStatusColor = (stock) => {
//     if (stock === 0) return "bg-red-100 text-red-800 border-red-200";
//     if (stock <= 5) return "bg-orange-100 text-orange-800 border-orange-200";
//     return "bg-green-100 text-green-800 border-green-200";
//   };

//   const getStockStatusIcon = (stock) => {
//     if (stock === 0) return <FiXCircle className="text-red-500" />;
//     if (stock <= 5) return <FiAlertCircle className="text-orange-500" />;
//     return <FiCheckCircle className="text-green-500" />;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading stock data...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
//               <FiPackage className="text-blue-600" />
//               Product Stock Management
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Manage inventory, variants, and stock levels
//             </p>
//           </div>
//           <button
//             onClick={fetchProducts}
//             className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
//           >
//             <FiBox className="text-lg" />
//             Refresh Inventory
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-gray-900">
//                   {products.reduce((sum, product) => sum + calculateTotalStock(product), 0)}
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">Total Items in Stock</div>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                 <FiPackage className="text-2xl text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-orange-600">{getLowStockCount()}</div>
//                 <div className="text-sm text-gray-600 mt-1">Low Stock Items (≤ 5)</div>
//               </div>
//               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//                 <FiTrendingDown className="text-2xl text-orange-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-red-600">{getOutOfStockCount()}</div>
//                 <div className="text-sm text-gray-600 mt-1">Out of Stock</div>
//               </div>
//               <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
//                 <FiAlertCircle className="text-2xl text-red-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-3xl font-bold text-gray-900">
//                   {products.reduce((sum, product) => sum + product.variants.length, 0)}
//                 </div>
//                 <div className="text-sm text-gray-600 mt-1">Total Variants</div>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
//                 <FiHash className="text-2xl text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             {/* <div className="flex-1">
//               <div className="relative">
//                 <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search by product name, variant, SKU..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                 />
//               </div>
//             </div> */}
            
//             {/* Filter Buttons */}
//             <div className="flex gap-3">
//               <button
//                 onClick={() => {
//                   setLowStockFilter(!lowStockFilter);
//                   setOutOfStockFilter(false);
//                 }}
//                 className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
//                   lowStockFilter 
//                     ? 'bg-orange-50 text-orange-700 border-orange-300' 
//                     : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
//                 }`}
//               >
//                 <FiAlertCircle />
//                 Low Stock
//               </button>
              
//               <button
//                 onClick={() => {
//                   setOutOfStockFilter(!outOfStockFilter);
//                   setLowStockFilter(false);
//                 }}
//                 className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
//                   outOfStockFilter 
//                     ? 'bg-red-50 text-red-700 border-red-300' 
//                     : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
//                 }`}
//               >
//                 <FiXCircle />
//                 Out of Stock
//               </button>
              
//               {/* <button
//                 onClick={fetchLowStock}
//                 className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all"
//               >
//                 <FiFilter />
//                 Show Low Stock
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//               <tr>
//                 <th className="p-6 text-left text-gray-700 font-semibold">Product</th>
//                 <th className="p-6 text-left text-gray-700 font-semibold">Variants</th>
//                 <th className="p-6 text-left text-gray-700 font-semibold">Stock Status</th>
//                 <th className="p-6 text-left text-gray-700 font-semibold">Total Stock</th>
//                 {/* <th className="p-6 text-left text-gray-700 font-semibold">Actions</th> */}
//               </tr>
//             </thead>

//             <tbody>
//               {filteredProducts.map((product) => (
//                 <tr 
//                   key={product._id} 
//                   className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors"
//                 >
//                   {/* Product Column */}
//                   <td className="p-6">
//                     <div>
//                       <div className="font-bold text-gray-900 text-lg mb-1">
//                         {product.name}
//                       </div>
//                       <div className="text-sm text-gray-500 font-mono">
//                         ID: {product._id.substring(0, 10)}...
//                       </div>
//                       <div className="flex items-center gap-2 mt-2">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           product.isActive 
//                             ? 'bg-green-100 text-green-800 border border-green-200'
//                             : 'bg-gray-100 text-gray-800 border border-gray-200'
//                         }`}>
//                           {product.isActive ? 'Active' : 'Inactive'}
//                         </span>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Variants Column */}
//                   <td className="p-6">
//                     <div className="space-y-2">
//                       {product.variants.map((variant, index) => (
//                         <div 
//                           key={index} 
//                           className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
//                         >
//                           <div>
//                             <div className="font-medium text-gray-900">
//                               {variant.label}
//                             </div>
//                             <div className="text-sm text-gray-600">
//                               {variant.sku && `SKU: ${variant.sku}`}
//                               {variant.price && ` • ₹${variant.price}`}
//                               {variant.weight && ` • ${variant.weight}`}
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(variant.stock)}`}>
//                               {variant.stock} units
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </td>

//                   {/* Stock Status Column */}
//                   <td className="p-6">
//                     <div className="space-y-2">
//                       {product.variants.map((variant, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                           {getStockStatusIcon(variant.stock)}
//                           <div className="text-sm">
//                             {variant.label}: 
//                             <span className={`font-medium ml-1 ${
//                               variant.stock === 0 ? 'text-red-600' :
//                               variant.stock <= 5 ? 'text-orange-600' :
//                               'text-green-600'
//                             }`}>
//                               {variant.stock === 0 ? 'Out of Stock' :
//                                variant.stock <= 5 ? 'Low Stock' :
//                                'In Stock'}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </td>

//                   {/* Total Stock Column */}
//                   <td className="p-6">
//                     <div className="text-center">
//                       <div className="text-3xl font-bold text-gray-900">
//                         {calculateTotalStock(product)}
//                       </div>
//                       <div className="text-sm text-gray-600 mt-1">
//                         across {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
//                       </div>
//                     </div>
//                   </td>

//                   {/* Actions Column */}
//                   {/* <td className="p-6">
//                     <div className="flex flex-col gap-2">
//                       <button
//                         onClick={() => {
//                           setSelectedProduct(product);
//                           setShowAddVariantModal(true);
//                         }}
//                         className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md transition-all"
//                       >
//                         <FiPlus />
//                         Add Variant
//                       </button>
                      
//                       <button
//                         onClick={() => {
//                           setSelectedProduct(product);
//                           setShowEditStockModal(true);
//                         }}
//                         className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
//                       >
//                         <FiEdit />
//                         Edit Stock
//                       </button>
                      
//                       {product.variants.length > 0 && (
//                         <button
//                           onClick={() => {
//                             setSelectedProduct(product);
//                             setShowDeleteVariantModal(true);
//                           }}
//                           className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all"
//                         >
//                           <FiTrash2 />
//                           Delete Variant
//                         </button>
//                       )}
//                     </div>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Empty State */}
//           {filteredProducts.length === 0 && (
//             <div className="text-center py-12">
//               <div className="text-gray-400 text-5xl mb-4">📦</div>
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
//               <p className="text-gray-500">
//                 {searchTerm || lowStockFilter || outOfStockFilter
//                   ? "Try changing your search criteria" 
//                   : "No products in inventory"}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add Variant Modal */}
//       {showAddVariantModal && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//             <div className="p-6 border-b border-gray-200">
//               <h3 className="text-xl font-bold text-gray-900">Add New Variant</h3>
//               <p className="text-gray-600 text-sm mt-1">
//                 For: <span className="font-semibold">{selectedProduct.name}</span>
//               </p>
//             </div>
            
//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Variant Label *
//                 </label>
//                 <input
//                   type="text"
//                   value={newVariant.label}
//                   onChange={(e) => setNewVariant({...newVariant, label: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="e.g., Large, Blue, 500g"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Stock *
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={newVariant.stock}
//                     onChange={(e) => setNewVariant({...newVariant, stock: parseInt(e.target.value) || 0})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price *
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     value={newVariant.price}
//                     onChange={(e) => setNewVariant({...newVariant, price: parseFloat(e.target.value) || 0})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   SKU (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   value={newVariant.sku}
//                   onChange={(e) => setNewVariant({...newVariant, sku: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   placeholder="Stock Keeping Unit"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Weight (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     value={newVariant.weight}
//                     onChange={(e) => setNewVariant({...newVariant, weight: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                     placeholder="e.g., 500g"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Dimensions (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     value={newVariant.dimensions}
//                     onChange={(e) => setNewVariant({...newVariant, dimensions: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                     placeholder="e.g., 10x10x5 cm"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowAddVariantModal(false)}
//                 className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddVariant}
//                 className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all"
//               >
//                 Add Variant
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Stock Modal */}
//       {showEditStockModal && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//             <div className="p-6 border-b border-gray-200">
//               <h3 className="text-xl font-bold text-gray-900">Update Stock Level</h3>
//               <p className="text-gray-600 text-sm mt-1">
//                 {selectedProduct.name}
//               </p>
//             </div>
            
//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Variant *
//                 </label>
//                 <select
//                   value={editStockData.label}
//                   onChange={(e) => setEditStockData({...editStockData, label: e.target.value})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 >
//                   <option value="">Choose a variant</option>
//                   {selectedProduct.variants.map((variant, index) => (
//                     <option key={index} value={variant.label}>
//                       {variant.label} (Current: {variant.stock} units)
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   New Stock Quantity *
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={editStockData.stock}
//                   onChange={(e) => setEditStockData({...editStockData, stock: parseInt(e.target.value) || 0})}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 />
//               </div>
              
//               {editStockData.label && (
//                 <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                   <div className="text-sm text-blue-800">
//                     Current stock for "{editStockData.label}": {
//                       selectedProduct.variants.find(v => v.label === editStockData.label)?.stock || 0
//                     } units
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowEditStockModal(false)}
//                 className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateStock}
//                 disabled={!editStockData.label}
//                 className={`px-6 py-3 rounded-lg transition-all ${
//                   editStockData.label
//                     ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
//                     : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 Update Stock
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Variant Modal */}
//       {showDeleteVariantModal && selectedProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
//             <div className="p-6 border-b border-gray-200">
//               <h3 className="text-xl font-bold text-gray-900">Delete Variant</h3>
//               <p className="text-gray-600 text-sm mt-1">
//                 {selectedProduct.name}
//               </p>
//             </div>
            
//             <div className="p-6">
//               <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
//                 <FiTrash2 className="text-2xl text-red-600" />
//               </div>
              
//               <p className="text-center text-gray-700 mb-4">
//                 Are you sure you want to delete this variant? This action cannot be undone.
//               </p>
              
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Variant to Delete *
//                 </label>
//                 <select
//                   value={variantToDelete.label}
//                   onChange={(e) => setVariantToDelete({
//                     ...variantToDelete, 
//                     label: e.target.value,
//                     productId: selectedProduct._id
//                   })}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 >
//                   <option value="">Choose a variant</option>
//                   {selectedProduct.variants.map((variant, index) => (
//                     <option key={index} value={variant.label}>
//                       {variant.label} ({variant.stock} units)
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               {variantToDelete.label && (
//                 <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
//                   <div className="text-sm text-red-800">
//                     This will permanently delete the "{variantToDelete.label}" variant and all associated data.
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDeleteVariantModal(false)}
//                 className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteVariant}
//                 disabled={!variantToDelete.label}
//                 className={`px-6 py-3 rounded-lg transition-all ${
//                   variantToDelete.label
//                     ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
//                     : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 Delete Variant
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProductStock;



import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  FiPackage,
  FiAlertCircle,
  FiPlus,
  FiTrash2,
  FiEdit,
  FiSearch,
  FiFilter,
  FiTrendingDown,
  FiBox,
  FiDollarSign,
  FiHash,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiMoreVertical,
  FiChevronDown,
  FiChevronUp,
  FiBarChart2,
  FiArchive
} from "react-icons/fi";
import { FaPaperPlane} from "react-icons/fa"

const AdminProductStock = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [outOfStockFilter, setOutOfStockFilter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  
  // Modal states
  const [showAddVariantModal, setShowAddVariantModal] = useState(false);
  const [showEditStockModal, setShowEditStockModal] = useState(false);
  const [showDeleteVariantModal, setShowDeleteVariantModal] = useState(false);
  
  // Form states
  const [newVariant, setNewVariant] = useState({
    label: "",
    stock: 0,
    price: 0,
    sku: "",
    weight: "",
    dimensions: ""
  });
  const [editStockData, setEditStockData] = useState({
    label: "",
    stock: 0
  });
  const [variantToDelete, setVariantToDelete] = useState({
    productId: "",
    label: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, lowStockFilter, outOfStockFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/stock");
      setProducts(res.data.data);
      toast.success("Inventory refreshed");
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product._id.toLowerCase().includes(term) ||
        product.variants.some(variant =>
          variant.label.toLowerCase().includes(term) ||
          variant.sku?.toLowerCase().includes(term)
        )
      );
    }

    // Apply low stock filter (stock <= 5)
    if (lowStockFilter) {
      filtered = filtered.filter(product =>
        product.variants.some(variant => variant.stock <= 5 && variant.stock > 0)
      );
    }

    // Apply out of stock filter (stock === 0)
    if (outOfStockFilter) {
      filtered = filtered.filter(product =>
        product.variants.some(variant => variant.stock === 0)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddVariant = async () => {
    if (!newVariant.label.trim()) {
      toast.error("Variant label is required");
      return;
    }
    if (newVariant.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    if (newVariant.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    try {
      const res = await api.post(`/stock/${selectedProduct._id}/variant`, newVariant);
      toast.success("Variant added successfully!");
      setShowAddVariantModal(false);
      setNewVariant({
        label: "",
        stock: 0,
        price: 0,
        sku: "",
        weight: "",
        dimensions: ""
      });
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add variant");
    }
  };

  const handleUpdateStock = async () => {
    if (editStockData.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    try {
      await api.put(`/stock/${selectedProduct._id}/stock`, {
        label: editStockData.label,
        stock: editStockData.stock
      });
      toast.success("Stock updated successfully!");
      setShowEditStockModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update stock");
    }
  };

  const handleDeleteVariant = async () => {
    try {
      await api.delete(`/stock/${variantToDelete.productId}/variant`, {
        data: { label: variantToDelete.label }
      });
      toast.success("Variant deleted successfully!");
      setShowDeleteVariantModal(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete variant");
    }
  };

  const calculateTotalStock = (product) => {
    return product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  };

  const getLowStockCount = () => {
    let count = 0;
    products.forEach(product => {
      product.variants.forEach(variant => {
        if (variant.stock <= 5 && variant.stock > 0) count++;
      });
    });
    return count;
  };

  const getOutOfStockCount = () => {
    let count = 0;
    products.forEach(product => {
      product.variants.forEach(variant => {
        if (variant.stock === 0) count++;
      });
    });
    return count;
  };

  const getStockStatusColor = (stock) => {
    if (stock === 0) return "bg-red-50 text-red-700 border-red-200";
    if (stock <= 5) return "bg-orange-50 text-orange-700 border-orange-200";
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  const getStockStatusIcon = (stock) => {
    if (stock === 0) return <FiXCircle className="text-red-500" />;
    if (stock <= 5) return <FiAlertCircle className="text-orange-500" />;
    return <FiCheckCircle className="text-emerald-500" />;
  };

  const toggleProductExpansion = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-14 w-14 border-[3px] border-blue-600 border-t-transparent mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading inventory data...</p>
            <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <FiPackage className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Stock Management
              </h1>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Monitor and manage your inventory in real-time
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={fetchProducts}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              <FaPaperPlane className="text-lg" />
              <span>Refresh</span>
            </button>
            
            {/* <button
              onClick={() => {
                setSelectedProduct(null);
                setShowAddVariantModal(true);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              <FiPlus className="text-lg" />
              <span>Add New</span>
            </button> */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total Items</p>
                <div className="text-2xl font-bold text-gray-900">
                  {products.reduce((sum, product) => sum + calculateTotalStock(product), 0)}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FiPackage className="text-xl text-blue-600" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Across {products.length} products
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Low Stock</p>
                <div className="text-2xl font-bold text-orange-600">{getLowStockCount()}</div>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <FiTrendingDown className="text-xl text-orange-600" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                ≤ 5 units remaining
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Out of Stock</p>
                <div className="text-2xl font-bold text-red-600">{getOutOfStockCount()}</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <FiAlertCircle className="text-xl text-red-600" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Requires restocking
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Total Variants</p>
                <div className="text-2xl font-bold text-gray-900">
                  {products.reduce((sum, product) => sum + product.variants.length, 0)}
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <FiHash className="text-xl text-emerald-600" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Active inventory items
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search products, variants, SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiXCircle />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setLowStockFilter(!lowStockFilter);
                  setOutOfStockFilter(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                  lowStockFilter 
                    ? 'bg-orange-50 text-orange-700 border-orange-300 shadow-sm' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <FiAlertCircle />
                Low Stock
                {lowStockFilter && <span className="ml-1">({getLowStockCount()})</span>}
              </button>
              
              <button
                onClick={() => {
                  setOutOfStockFilter(!outOfStockFilter);
                  setLowStockFilter(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-sm font-medium ${
                  outOfStockFilter 
                    ? 'bg-red-50 text-red-700 border-red-300 shadow-sm' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <FiXCircle />
                Out of Stock
                {outOfStockFilter && <span className="ml-1">({getOutOfStockCount()})</span>}
              </button>
              
              {(searchTerm || lowStockFilter || outOfStockFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setLowStockFilter(false);
                    setOutOfStockFilter(false);
                  }}
                  className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Products List - Card View for Mobile, Table for Desktop */}
      <div className="space-y-4">
        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-6 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Product Details</th>
                  <th className="p-6 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Variants</th>
                  <th className="p-6 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Stock Status</th>
                  <th className="p-6 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Total Stock</th>
                  {/* <th className="p-6 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">Actions</th> */}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr 
                    key={product._id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                            <FiPackage className="text-xl text-blue-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                          <div className="text-xs text-gray-500 font-mono mb-2">
                            ID: {product._id.substring(0, 8)}...
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.isActive 
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="space-y-3">
                        {product.variants.map((variant, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">{variant.label}</div>
                              <div className="text-xs text-gray-600 mt-1 space-x-3">
                                {variant.sku && <span>SKU: {variant.sku}</span>}
                                {variant.price && <span>₹{variant.price}</span>}
                                {variant.weight && <span>{variant.weight}</span>}
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(variant.stock)}`}>
                                {variant.stock} units
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="space-y-2">
                        {product.variants.map((variant, index) => (
                          <div key={index} className="flex items-center gap-3">
                            {getStockStatusIcon(variant.stock)}
                            <div className="text-sm">
                              <span className="font-medium text-gray-700">{variant.label}:</span>
                              <span className={`ml-1 font-medium ${
                                variant.stock === 0 ? 'text-red-600' :
                                variant.stock <= 5 ? 'text-orange-600' :
                                'text-emerald-600'
                              }`}>
                                {variant.stock === 0 ? 'Out of Stock' :
                                 variant.stock <= 5 ? 'Low Stock' :
                                 'In Stock'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-6">
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {calculateTotalStock(product)}
                        </div>
                        <div className="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                          {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </td>

                    {/* <td className="p-6">
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowAddVariantModal(true);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                        >
                          <FiPlus className="text-sm" />
                          Add Variant
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowEditStockModal(true);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                        >
                          <FiEdit className="text-sm" />
                          Edit Stock
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {filteredProducts.map((product) => (
            <div 
              key={product._id} 
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div 
                className="p-5 cursor-pointer"
                onClick={() => toggleProductExpansion(product._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <FiPackage className="text-lg text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <div className="text-xs text-gray-500">
                        {product.variants.length} variants • {calculateTotalStock(product)} total units
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.isActive 
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {expandedProduct === product._id ? (
                      <FiChevronUp className="text-gray-400" />
                    ) : (
                      <FiChevronDown className="text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedProduct === product._id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      {product.variants.map((variant, index) => (
                        <div 
                          key={index} 
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-medium text-gray-900">{variant.label}</div>
                              <div className="text-xs text-gray-600 mt-1">
                                {variant.sku && <div>SKU: {variant.sku}</div>}
                                {variant.price && <div>Price: ₹{variant.price}</div>}
                                {variant.weight && <div>Weight: {variant.weight}</div>}
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(variant.stock)}`}>
                              {variant.stock} units
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            {getStockStatusIcon(variant.stock)}
                            <span className={
                              variant.stock === 0 ? 'text-red-600' :
                              variant.stock <= 5 ? 'text-orange-600' :
                              'text-emerald-600'
                            }>
                              {variant.stock === 0 ? 'Out of Stock' :
                               variant.stock <= 5 ? 'Low Stock' :
                               'In Stock'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                      {/* <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowAddVariantModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                      >
                        <FiPlus className="text-sm" />
                        Add Variant
                      </button> */}
                      
                      {/* <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditStockModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                      >
                        <FiEdit className="text-sm" />
                        Edit Stock
                      </button> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center border border-gray-200">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <FiArchive className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              {searchTerm || lowStockFilter || outOfStockFilter
                ? "Try adjusting your search or filter criteria" 
                : "Your inventory is empty. Start by adding products and variants."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={fetchProducts}
                className="px-5 py-2.5 text-gray-700 hover:text-gray-900 font-medium"
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowAddVariantModal(true);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Add Product
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Add Variant Modal */}
      {showAddVariantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Add New Variant</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedProduct ? `For: ${selectedProduct.name}` : 'Add new product variant'}
                  </p>
                </div>
                <button
                  onClick={() => setShowAddVariantModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiXCircle className="text-xl text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Variant Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newVariant.label}
                    onChange={(e) => setNewVariant({...newVariant, label: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="e.g., Large, Blue, 500g"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    SKU (Optional)
                  </label>
                  <input
                    type="text"
                    value={newVariant.sku}
                    onChange={(e) => setNewVariant({...newVariant, sku: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Stock Keeping Unit"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Initial Stock <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({...newVariant, stock: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newVariant.price}
                    onChange={(e) => setNewVariant({...newVariant, price: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Weight (Optional)
                  </label>
                  <input
                    type="text"
                    value={newVariant.weight}
                    onChange={(e) => setNewVariant({...newVariant, weight: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 500g, 1kg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dimensions (Optional)
                  </label>
                  <input
                    type="text"
                    value={newVariant.dimensions}
                    onChange={(e) => setNewVariant({...newVariant, dimensions: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 10x10x5 cm"
                  />
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddVariantModal(false)}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVariant}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stock Modal */}
      {showEditStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Update Stock Level</h3>
              <p className="text-gray-600 text-sm mt-1">
                {selectedProduct.name}
              </p>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Select Variant <span className="text-red-500">*</span>
                </label>
                <select
                  value={editStockData.label}
                  onChange={(e) => {
                    const selectedVariant = selectedProduct.variants.find(v => v.label === e.target.value);
                    setEditStockData({
                      ...editStockData, 
                      label: e.target.value,
                      stock: selectedVariant?.stock || 0
                    });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                >
                  <option value="">Choose a variant</option>
                  {selectedProduct.variants.map((variant, index) => (
                    <option key={index} value={variant.label}>
                      {variant.label} (Current: {variant.stock} units)
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  New Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={editStockData.stock}
                  onChange={(e) => setEditStockData({...editStockData, stock: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              {editStockData.label && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium">Current stock: {
                      selectedProduct.variants.find(v => v.label === editStockData.label)?.stock || 0
                    } units</div>
                    <div className="text-xs text-blue-600 mt-1">
                      Updating to: {editStockData.stock} units
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditStockModal(false)}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStock}
                disabled={!editStockData.label}
                className={`px-6 py-3 rounded-lg transition-all font-medium ${
                  editStockData.label
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Variant Modal */}
      {showDeleteVariantModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FiTrash2 className="text-xl text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Delete Variant</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedProduct.name}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="text-2xl text-red-600" />
                </div>
                <p className="text-gray-700 font-medium mb-2">
                  Are you sure you want to delete this variant?
                </p>
                <p className="text-gray-500 text-sm">
                  This action cannot be undone.
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Variant to Delete <span className="text-red-500">*</span>
                </label>
                <select
                  value={variantToDelete.label}
                  onChange={(e) => setVariantToDelete({
                    ...variantToDelete, 
                    label: e.target.value,
                    productId: selectedProduct._id
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Choose a variant</option>
                  {selectedProduct.variants.map((variant, index) => (
                    <option key={index} value={variant.label}>
                      {variant.label} ({variant.stock} units)
                    </option>
                  ))}
                </select>
              </div>
              
              {variantToDelete.label && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-6">
                  <div className="text-sm text-red-800">
                    <div className="font-medium">"{variantToDelete.label}" will be permanently deleted</div>
                    <ul className="text-xs text-red-600 mt-2 space-y-1">
                      <li>• All stock data will be lost</li>
                      <li>• This action cannot be reversed</li>
                      <li>• Associated orders will be affected</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteVariantModal(false)}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteVariant}
                disabled={!variantToDelete.label}
                className={`px-6 py-3 rounded-lg transition-all font-medium ${
                  variantToDelete.label
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Delete Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminProductStock;