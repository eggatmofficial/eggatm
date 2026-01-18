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
  FiXCircle
} from "react-icons/fi";

const AdminProductStock = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [outOfStockFilter, setOutOfStockFilter] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
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
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchLowStock = async () => {
    try {
      setLoading(true);
      const res = await api.get("/stock/low");
      setProducts(res.data.data);
      setLowStockFilter(true);
      setOutOfStockFilter(false);
    } catch (err) {
      console.error("Error fetching low stock:", err);
      toast.error("Failed to load low stock products");
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
    if (stock === 0) return "bg-red-100 text-red-800 border-red-200";
    if (stock <= 5) return "bg-orange-100 text-orange-800 border-orange-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  const getStockStatusIcon = (stock) => {
    if (stock === 0) return <FiXCircle className="text-red-500" />;
    if (stock <= 5) return <FiAlertCircle className="text-orange-500" />;
    return <FiCheckCircle className="text-green-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading stock data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <FiPackage className="text-blue-600" />
              Product Stock Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage inventory, variants, and stock levels
            </p>
          </div>
          <button
            onClick={fetchProducts}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <FiBox className="text-lg" />
            Refresh Inventory
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {products.reduce((sum, product) => sum + calculateTotalStock(product), 0)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Items in Stock</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiPackage className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600">{getLowStockCount()}</div>
                <div className="text-sm text-gray-600 mt-1">Low Stock Items (≤ 5)</div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiTrendingDown className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-red-600">{getOutOfStockCount()}</div>
                <div className="text-sm text-gray-600 mt-1">Out of Stock</div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <FiAlertCircle className="text-2xl text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {products.reduce((sum, product) => sum + product.variants.length, 0)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Variants</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiHash className="text-2xl text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            {/* <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by product name, variant, SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div> */}
            
            {/* Filter Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setLowStockFilter(!lowStockFilter);
                  setOutOfStockFilter(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                  lowStockFilter 
                    ? 'bg-orange-50 text-orange-700 border-orange-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <FiAlertCircle />
                Low Stock
              </button>
              
              <button
                onClick={() => {
                  setOutOfStockFilter(!outOfStockFilter);
                  setLowStockFilter(false);
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                  outOfStockFilter 
                    ? 'bg-red-50 text-red-700 border-red-300' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <FiXCircle />
                Out of Stock
              </button>
              
              {/* <button
                onClick={fetchLowStock}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                <FiFilter />
                Show Low Stock
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="p-6 text-left text-gray-700 font-semibold">Product</th>
                <th className="p-6 text-left text-gray-700 font-semibold">Variants</th>
                <th className="p-6 text-left text-gray-700 font-semibold">Stock Status</th>
                <th className="p-6 text-left text-gray-700 font-semibold">Total Stock</th>
                {/* <th className="p-6 text-left text-gray-700 font-semibold">Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr 
                  key={product._id} 
                  className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors"
                >
                  {/* Product Column */}
                  <td className="p-6">
                    <div>
                      <div className="font-bold text-gray-900 text-lg mb-1">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 font-mono">
                        ID: {product._id.substring(0, 10)}...
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Variants Column */}
                  <td className="p-6">
                    <div className="space-y-2">
                      {product.variants.map((variant, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {variant.label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {variant.sku && `SKU: ${variant.sku}`}
                              {variant.price && ` • ₹${variant.price}`}
                              {variant.weight && ` • ${variant.weight}`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStockStatusColor(variant.stock)}`}>
                              {variant.stock} units
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Stock Status Column */}
                  <td className="p-6">
                    <div className="space-y-2">
                      {product.variants.map((variant, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {getStockStatusIcon(variant.stock)}
                          <div className="text-sm">
                            {variant.label}: 
                            <span className={`font-medium ml-1 ${
                              variant.stock === 0 ? 'text-red-600' :
                              variant.stock <= 5 ? 'text-orange-600' :
                              'text-green-600'
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

                  {/* Total Stock Column */}
                  <td className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {calculateTotalStock(product)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        across {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </td>

                  {/* Actions Column */}
                  {/* <td className="p-6">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowAddVariantModal(true);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-md transition-all"
                      >
                        <FiPlus />
                        Add Variant
                      </button>
                      
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowEditStockModal(true);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-md transition-all"
                      >
                        <FiEdit />
                        Edit Stock
                      </button>
                      
                      {product.variants.length > 0 && (
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteVariantModal(true);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all"
                        >
                          <FiTrash2 />
                          Delete Variant
                        </button>
                      )}
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">
                {searchTerm || lowStockFilter || outOfStockFilter
                  ? "Try changing your search criteria" 
                  : "No products in inventory"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Variant Modal */}
      {showAddVariantModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Add New Variant</h3>
              <p className="text-gray-600 text-sm mt-1">
                For: <span className="font-semibold">{selectedProduct.name}</span>
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Variant Label *
                </label>
                <input
                  type="text"
                  value={newVariant.label}
                  onChange={(e) => setNewVariant({...newVariant, label: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Large, Blue, 500g"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({...newVariant, stock: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (Optional)
                  </label>
                  <input
                    type="text"
                    value={newVariant.weight}
                    onChange={(e) => setNewVariant({...newVariant, weight: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 500g"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddVariantModal(false)}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVariant}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Add Variant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Stock Modal */}
      {showEditStockModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Update Stock Level</h3>
              <p className="text-gray-600 text-sm mt-1">
                {selectedProduct.name}
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Variant *
                </label>
                <select
                  value={editStockData.label}
                  onChange={(e) => setEditStockData({...editStockData, label: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Choose a variant</option>
                  {selectedProduct.variants.map((variant, index) => (
                    <option key={index} value={variant.label}>
                      {variant.label} (Current: {variant.stock} units)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Stock Quantity *
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
                    Current stock for "{editStockData.label}": {
                      selectedProduct.variants.find(v => v.label === editStockData.label)?.stock || 0
                    } units
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditStockModal(false)}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStock}
                disabled={!editStockData.label}
                className={`px-6 py-3 rounded-lg transition-all ${
                  editStockData.label
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg'
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Delete Variant</h3>
              <p className="text-gray-600 text-sm mt-1">
                {selectedProduct.name}
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
                <FiTrash2 className="text-2xl text-red-600" />
              </div>
              
              <p className="text-center text-gray-700 mb-4">
                Are you sure you want to delete this variant? This action cannot be undone.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Variant to Delete *
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
                <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
                  <div className="text-sm text-red-800">
                    This will permanently delete the "{variantToDelete.label}" variant and all associated data.
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteVariantModal(false)}
                className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteVariant}
                disabled={!variantToDelete.label}
                className={`px-6 py-3 rounded-lg transition-all ${
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
    </div>
  );
};

export default AdminProductStock;