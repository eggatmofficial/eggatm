
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCartFromBackend } from "../store/cart.store";
import { startCheckout } from "../store/checkout.store";
import {
  updateCartItemAPI,
  removeCartItemAPI,
} from "../api/cart.api";
import toast from "react-hot-toast";
import { clearCartAPI } from "../api/cart.api";
import { FiTrash2, FiShoppingBag, FiArrowRight, FiPackage, FiTruck, FiShield, FiPlus, FiMinus, FiCheck, FiCheckCircle, FiChevronLeft, FiHome, FiPercent, FiCalendar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export const PRIMARY_COLOR = "#faa807";
export const SECONDARY_COLOR = "#ffd13d";
export const PRIMARY_GRADIENT = "linear-gradient(135deg, #faa807 0%, #ffd13d 100%)";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const [removingId, setRemovingId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [screenSize, setScreenSize] = useState('mobile'); // mobile, tablet, desktop

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("🛒 Cart Items:", items);
  }, [items]);

  // Initialize selection - select all by default
  useEffect(() => {
    if (items.length > 0 && selectedItems.length === 0) {
      const allItemIds = items.map(item => `${item.productId._id}-${item.variantLabel}`);
      setSelectedItems(allItemIds);
    }
  }, [items]);

  const handleIncrease = async (item) => {
    const res = await updateCartItemAPI({
      productId: item.productId._id,
      variantLabel: item.variantLabel,
      quantity: item.quantity + 1,
    });
    dispatch(setCartFromBackend(res.data.data));
  };

  const handleDecrease = async (item) => {
    try {
      const res = await updateCartItemAPI({
        productId: item.productId._id,   
        variantLabel: item.variantLabel,
        quantity: item.quantity - 1,
      });
      dispatch(setCartFromBackend(res.data.data));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleRemove = async (item) => {
    try {
      setRemovingId(`${item.productId._id}-${item.variantLabel}`);
      const res = await removeCartItemAPI({
        productId: item.productId._id,   
        variantLabel: item.variantLabel,
      });
      dispatch(setCartFromBackend(res.data.data));
      toast.success("Item removed");
      setRemovingId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove item");
      setRemovingId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartAPI();
      dispatch(setCartFromBackend({ items: [] }));
      setSelectedItems([]);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  // Handle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Select all items
  const selectAllItems = () => {
    const allItemIds = items.map(item => `${item.productId._id}-${item.variantLabel}`);
    setSelectedItems(allItemIds);
  };

  // Deselect all items
  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  // Calculate selected items total
  const calculateSelectedTotal = () => {
    return items.reduce((total, item) => {
      const itemId = `${item.productId._id}-${item.variantLabel}`;
      if (selectedItems.includes(itemId)) {
        return total + item.totalPrice;
      }
      return total;
    }, 0);
  };

  // Calculate selected items quantity
  const calculateSelectedQuantity = () => {
    return items.reduce((total, item) => {
      const itemId = `${item.productId._id}-${item.variantLabel}`;
      if (selectedItems.includes(itemId)) {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  // Check if all items are selected
  const isAllSelected = items.length > 0 && selectedItems.length === items.length;

  // Get selected items for checkout
  const getSelectedItemsForCheckout = () => {
    return items.filter(item => 
      selectedItems.includes(`${item.productId._id}-${item.variantLabel}`)
    );
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedItemsForCheckout = getSelectedItemsForCheckout();
    
    if (selectedItemsForCheckout.length === 0) {
      toast.error("Please select at least one item to checkout");
      return;
    }
    
    // Dispatch selected items to checkout store
    dispatch(startCheckout(selectedItemsForCheckout));
    
    // Navigate to checkout page
    navigate("/checkout");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  if (!items.length) {
    return (
      <div className=" bg-gradient-to-b from-amber-50/30 via-white to-white flex flex-col items-center justify-center px-4 py-8">
        {/* Mobile Back Button */}
        <div className="w-full max-w-7xl px-4 mb-8 sm:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
          >
            <FiChevronLeft />
            Back
          </button>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center px-4"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center mx-auto">
              <FiShoppingBag className="text-3xl sm:text-4xl md:text-6xl text-amber-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-ping" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md mb-6 sm:mb-8 px-2">
            Add some delicious spices to your cart! Explore our premium collection and fill your kitchen with amazing flavors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/products')}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg md:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              style={{ background: PRIMARY_GRADIENT }}
            >
              Explore Products
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg md:rounded-xl font-bold text-sm sm:text-base md:text-lg border-2 border-amber-500 text-amber-600 hover:bg-amber-50 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const selectedTotal = calculateSelectedTotal();
  const selectedQuantity = calculateSelectedQuantity();

  return (
    <div className="bg-gradient-to-b from-amber-50/30 via-white to-white py-2 sm:py-6 md:py-8">
      {/* Mobile Header with Back Button */}
      {screenSize === 'mobile' && (
        <div className="px-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-4"
          >
            <FiChevronLeft />
            Back
          </button>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Your Shopping Cart
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">{totalQuantity} items</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500 text-sm" />
                <span className="font-medium">{selectedQuantity} selected</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="font-medium">Total: <span className="font-bold text-gray-900">₹{selectedTotal}</span></span>
            </div>
          </div>
          
          {screenSize !== 'mobile' && (
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid - Responsive layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        
        {/* LEFT - Cart Items */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Selection Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Select All Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          selectAllItems();
                        } else {
                          deselectAllItems();
                        }
                      }}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
                      ${isAllSelected 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-transparent' 
                        : 'border-gray-300 group-hover:border-amber-400 group-hover:bg-amber-50'
                      }`}
                    >
                      {isAllSelected && (
                        <FiCheck className="text-white text-sm" />
                      )}
                    </div>
                  </div>
                  <span className="font-medium text-gray-700 text-sm sm:text-base">
                    {isAllSelected ? 'Deselect All' : 'Select All'}
                  </span>
                </label>

                {/* Selected Count */}
                <div className="px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <span className="text-sm font-medium text-amber-700">
                    {selectedItems.length}/{items.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handleClearCart}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  <FiTrash2 className="text-sm" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Cart Items */}
          <AnimatePresence>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 sm:space-y-6"
            >
              {items.map((item) => {
                const itemId = `${item.productId._id}-${item.variantLabel}`;
                const isSelected = selectedItems.includes(itemId);

                return (
                  <motion.div
                    key={itemId}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`relative bg-white rounded-xl sm:rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 hover:shadow-xl group
                      ${isSelected 
                        ? 'border-amber-500 border-2 shadow-lg' 
                        : 'border-amber-100'
                      }
                      ${removingId === itemId ? 'opacity-0 scale-95' : ''}`}
                  >
                    {/* Selection Toggle Button */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                      <button
                        onClick={() => toggleItemSelection(itemId)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110
                          ${isSelected
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                            : 'bg-white border-2 border-gray-300 hover:border-amber-400 text-gray-400'
                          }`}
                      >
                        {isSelected ? (
                          <FiCheck className="text-sm" />
                        ) : (
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-300 rounded"></div>
                        )}
                      </button>
                    </div>

                    {/* Egg!ATM Badge */}
                    {item.tags?.includes('Egg!ATM') && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
                        <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold shadow-md">
                          🥚 Egg! ATM
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 pl-12 sm:pl-16 md:pl-20">
                      {/* Product Image */}
                      <div className="flex items-start gap-4 sm:block">
                        <img
                          src={
                            item.productId?.images?.[0]
                              ? item.productId.images[0]
                              : "/placeholder.png"
                          }
                          alt={item.productId?.name || "Product"}
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-cover rounded-lg sm:rounded-xl border-2 border-amber-100 shadow-md flex-shrink-0"
                        />
                        
                        {/* Mobile-only price and variant info */}
                        <div className="sm:hidden flex-1">
                          <div className="mb-1">
                            <h3 className="text-base font-bold text-gray-900 line-clamp-2">
                              {item.productId?.name || "Product unavailable"}
                            </h3>
                          </div>
                          <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                            <FiPackage className="text-amber-500" />
                            {item.variantLabel}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-900">₹{item.totalPrice}</div>
                            <div className="text-sm text-gray-500">₹{item.price} × {item.quantity}</div>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        {/* Product name and price for sm and up */}
                        <div className="hidden sm:flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">
                              {item.productId?.name || "Product unavailable"}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3 sm:mb-4">
                              <span className="flex items-center gap-1">
                                <FiPackage className="text-amber-500" />
                                {item.variantLabel}
                              </span>
                              <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                                ₹{item.price}/unit
                              </span>
                            </div>
                          </div>

                          {/* Desktop/Tablet Item Total */}
                          <div className="hidden md:block text-right">
                            <div className={`text-xl md:text-2xl font-bold mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>
                              ₹{item.totalPrice}
                            </div>
                            <div className="text-sm text-gray-500">
                              ₹{item.price} × {item.quantity}
                            </div>
                            {!isSelected && (
                              <div className="text-sm text-amber-600 mt-1 font-medium">
                                Not selected
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tablet Item Total (shows on sm screens) */}
                        <div className="hidden sm:flex md:hidden justify-between items-center mb-4">
                          <div className={`text-lg font-bold ${isSelected ? 'text-gray-900' : 'text-gray-400'}`}>
                            ₹{item.totalPrice}
                          </div>
                          <div className="text-sm text-gray-500">
                            ₹{item.price} × {item.quantity}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 sm:mt-6">
                          <div className="flex items-center justify-between sm:justify-start gap-4">
                            <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl overflow-hidden border border-amber-200">
                              <button
                                onClick={() => handleDecrease(item)}
                                disabled={item.quantity === 1}
                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-amber-100 active:scale-95 transition-all duration-200"
                              >
                                <FiMinus className="text-gray-700" />
                              </button>
                              
                              <span className="w-12 sm:w-14 md:w-16 text-center text-lg sm:text-xl font-bold text-gray-900">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => handleIncrease(item)}
                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-amber-100 active:scale-95 transition-all duration-200"
                              >
                                <FiPlus className="text-gray-700" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemove(item)}
                              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors duration-200 group"
                            >
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                                <FiTrash2 className="text-sm group-hover:scale-110 transition-transform" />
                              </div>
                              <span className="font-medium text-sm hidden sm:inline">Remove</span>
                            </button>
                          </div>

                          {/* Select/Deselect Button */}
                          <button
                            onClick={() => toggleItemSelection(itemId)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm
                              ${isSelected
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {isSelected ? 'Selected ✓' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Benefits Section - Responsive */}
          <div className="mt-6 sm:mt-8">
            {/* Mobile/Tab - Horizontal Scroll */}
            <div className="lg:hidden overflow-x-auto pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6">
              <div className="flex gap-3 sm:gap-4" style={{ minWidth: 'min-content' }}>
                {[
                  {
                    icon: <FiCheckCircle />,
                    title: "Egg! ATM Standard",
                    desc: "Premium Grade",
                    color: "from-amber-500 to-orange-500",
                    bg: "from-amber-50 to-orange-50",
                    border: "amber-200"
                  },
                  {
                    icon: <FiShield />,
                    title: "Quality Guarantee",
                    desc: "Certified Quality",
                    color: "from-green-500 to-emerald-500",
                    bg: "from-green-50 to-emerald-50",
                    border: "green-200"
                  },
                  {
                    icon: <FiCalendar />,
                    title: "Daily Fresh",
                    desc: "Shelf life",
                    color: "from-blue-500 to-cyan-500",
                    bg: "from-blue-50 to-cyan-50",
                    border: "blue-200"
                  },
                  {
                    icon: <FiPercent />,
                    title: "Best Prices",
                    desc: "Market competitive",
                    color: "from-purple-500 to-pink-500",
                    bg: "from-purple-50 to-pink-50",
                    border: "purple-200"
                  }
                ].map((benefit, index) => (
                  <div key={index} className={`min-w-[180px] sm:min-w-[200px] bg-gradient-to-r ${benefit.bg} rounded-xl p-4 border border-${benefit.border}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white`}>
                        {benefit.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base">{benefit.title}</div>
                        <div className="text-xs sm:text-sm text-gray-600">{benefit.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Benefits Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4 mt-8">
              {[
                  {
                    icon: <FiCheckCircle />,
                    title: "Egg! ATM Standard",
                    desc: "Premium Grade",
                    color: "from-amber-500 to-orange-500",
                    bg: "from-amber-50 to-orange-50",
                    border: "amber-200"
                  },
                  {
                    icon: <FiShield />,
                    title: "Quality Guarantee",
                    desc: "Certified Quality",
                    color: "from-green-500 to-emerald-500",
                    bg: "from-green-50 to-emerald-50",
                    border: "green-200"
                  },
                  {
                    icon: <FiCalendar />,
                    title: "Daily Fresh",
                    desc: "Shelf life",
                    color: "from-blue-500 to-cyan-500",
                    bg: "from-blue-50 to-cyan-50",
                    border: "blue-200"
                  },
                  {
                    icon: <FiPercent />,
                    title: "Best Prices",
                    desc: "Market competitive",
                    color: "from-purple-500 to-pink-500",
                    bg: "from-purple-50 to-pink-50",
                    border: "purple-200"
                  }
                ].map((benefit, index) => (
                <div key={index} className={`bg-gradient-to-r ${benefit.bg} rounded-2xl p-5 border border-${benefit.border}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center text-white`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{benefit.title}</div>
                      <div className="text-sm text-gray-600">{benefit.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white ${screenSize === 'desktop' ? 'rounded-2xl shadow-xl sticky top-6' : 'rounded-xl shadow-lg'} border border-amber-100 p-4 sm:p-5 lg:p-6`}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <FiShoppingBag className="text-sm sm:text-base" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Order Summary</h3>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {/* Selection Status */}
              <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-sm sm:text-base">
                      {selectedQuantity} items selected
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Out of {totalQuantity} in cart
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">₹{selectedTotal}</div>
                    <div className="text-xs sm:text-sm text-gray-500">Selected total</div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Price ({selectedQuantity} items)</span>
                  <span className="font-medium text-gray-900 text-sm sm:text-base">₹{selectedTotal}</span>
                </div>
                
                {/* <div className="flex justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Delivery Charges</span>
                  <span className="text-green-600 font-medium text-sm sm:text-base">
                    {selectedTotal >= 499 ? 'FREE' : '₹50'}
                  </span>
                </div> */}
              </div>

              <div className="border-t border-amber-100 pt-3 sm:pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">Total Amount</span>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      {/* ₹{((selectedTotal ) + (selectedTotal >= 499 ? 0 : 50)).toFixed(2)} */}
                       ₹{(selectedTotal ).toFixed(2)}
                    </div>
                    {/* <div className="text-xs sm:text-sm text-gray-500">Inclusive of all taxes</div> */}
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className={`w-full py-3 sm:py-4 ${screenSize === 'desktop' ? 'rounded-xl' : 'rounded-lg'} font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-xl ${screenSize === 'desktop' ? 'hover:scale-[1.02]' : ''} active:scale-95 group mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3
                  ${selectedItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : ''
                  }`}
                style={selectedItems.length > 0 ? { background: PRIMARY_GRADIENT } : {}}
              >
                {selectedItems.length === 0 ? (
                  <span className="text-sm sm:text-base">Select items to checkout</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <FiArrowRight className="group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              {/* Additional Options - Show on desktop and tablet */}
              {screenSize !== 'mobile' && (
                <div className="space-y-3 mt-4">
                  <div className="flex gap-3">
                    <button
                      onClick={selectAllItems}
                      className="flex-1 py-2 sm:py-3 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors duration-200 font-medium text-sm"
                    >
                      Select All
                    </button>
                    
                    <button
                      onClick={deselectAllItems}
                      className="flex-1 py-2 sm:py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                    >
                      Deselect All
                    </button>
                  </div>
                  
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full py-2 sm:py-3 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 transition-colors duration-200 font-medium text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Continue Shopping Button for Mobile */}
          {screenSize === 'mobile' && (
            <button
              onClick={() => navigate('/products')}
              className="w-full py-3 rounded-lg border-2 border-amber-500 text-amber-600 hover:bg-amber-50 transition-colors duration-200 font-medium text-sm"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>

      {/* Mobile Floating Checkout Button */}
      {screenSize === 'mobile' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-sm text-gray-600">Total ({selectedQuantity} items)</div>
                <div className="text-xl font-bold text-gray-900">₹{selectedTotal.toFixed(2)}</div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className={`px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center gap-2
                  ${selectedItems.length === 0
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : ''
                  }`}
                style={selectedItems.length > 0 ? { background: PRIMARY_GRADIENT } : {}}
              >
                <span>Checkout</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding for mobile floating button */}
      {screenSize === 'mobile' && <div className="h-20"></div>}
    </div>
  );
};

export default Cart;