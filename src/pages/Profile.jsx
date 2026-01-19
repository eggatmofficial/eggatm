  // import { useState, useEffect } from "react";
  // import { useDispatch, useSelector } from "react-redux";
  // import {
  //   FiUser,
  //   FiBox,
  //   FiLogOut,
  //   FiPackage,
  //   FiRefreshCw,
  //   FiMapPin,
  //   FiEdit,
  //   FiCheck,
  //   FiX,
  //   FiTruck,
  //   FiHome,
  //   FiPhone,
  //   FiTrash2,
  //   FiPlus,
  //   FiChevronLeft,
  //   FiChevronRight
  // } from "react-icons/fi";
  // import { MdLocationOn, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
  // import { FaShippingFast } from "react-icons/fa";
  // import { logout } from "../store/auth.store";
  // import { useNavigate } from "react-router-dom";
  // import api from "../api/axios";
  // import toast from "react-hot-toast";

  // const ORDERS_PER_PAGE = 2; // Show 2 orders per page

  // const Profile = () => {
  //   const [activeTab, setActiveTab] = useState("profile");
  //   const [orders, setOrders] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [selectedOrder, setSelectedOrder] = useState(null);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [isEditingAddress, setIsEditingAddress] = useState(false);
  //   const [addressData, setAddressData] = useState({
  //     fullName: "",
  //     phone: "",
  //     line1: "",
  //     line2: "",
  //     city: "",
  //     state: "",
  //     pincode: "",
  //     landmark: "",
  //   });

  //   const { user } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
    
  //   // Get the primary/default address from user.addresses
  //   const userAddress = user?.addresses?.[0] || null;

  //   useEffect(() => {
  //     if (activeTab === "orders") fetchOrders();
  //   }, [activeTab]);

  //   // Reset to page 1 when tab changes
  //   useEffect(() => {
  //     setCurrentPage(1);
  //   }, [activeTab]);

  //   // Initialize address form data
  //   useEffect(() => {
  //     if (userAddress) {
  //       setAddressData({
  //         fullName: userAddress.fullName || user?.name || "",
  //         phone: userAddress.phone || user?.mobile || "",
  //         line1: userAddress.line1 || "",
  //         line2: userAddress.line2 || "",
  //         city: userAddress.city || "",
  //         state: userAddress.state || "",
  //         pincode: userAddress.pincode || "",
  //         landmark: userAddress.landmark || "",
  //       });
  //     }
  //   }, [userAddress, user]);

  //   const fetchOrders = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await api.get("/orders/my-orders");
  //       console.log("order res", res.data.data);
        
  //       // Sort orders by date (newest first)
  //       const sortedOrders = Array.isArray(res?.data?.data) 
  //         ? res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //         : [];
        
  //       setOrders(sortedOrders);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Failed to load orders");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const handleLogout = () => {
  //     dispatch(logout());
  //     navigate("/login");
  //   };

  //   const formatDate = (date) =>
  //     new Date(date).toLocaleDateString("en-IN", {
  //       day: "numeric",
  //       month: "short",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });

  //   const getOrderStatus = (status) => {
  //     const statusConfig = {
  //       CREATED: { label: "Order Placed", color: "text-blue-600", bg: "bg-blue-100" },
  //       CONFIRMED: { label: "Confirmed", color: "text-purple-600", bg: "bg-purple-100" },
  //       PROCESSING: { label: "Processing", color: "text-yellow-600", bg: "bg-yellow-100" },
  //       SHIPPED: { label: "Shipped", color: "text-orange-600", bg: "bg-orange-100" },
  //       OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "text-pink-600", bg: "bg-pink-100" },
  //       DELIVERED: { label: "Delivered", color: "text-green-600", bg: "bg-green-100" },
  //       CANCELLED: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100" },
  //     };
  //     return statusConfig[status] || { label: status, color: "text-gray-600", bg: "bg-gray-100" };
  //   };

  //   const getOrderSteps = (status) => {
  //     const steps = [
  //       { key: "CREATED", label: "Order Placed", icon: "📦" },
  //       { key: "CONFIRMED", label: "Confirmed", icon: "✓" },
  //       { key: "PROCESSING", label: "Processing", icon: "⚙️" },
  //       { key: "SHIPPED", label: "Shipped", icon: "🚚" },
  //       { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: "🏍️" },
  //       { key: "DELIVERED", label: "Delivered", icon: "🏠" },
  //     ];
      
  //     const currentIndex = steps.findIndex(step => step.key === status);
  //     return steps.map((step, index) => ({
  //       ...step,
  //       completed: index <= currentIndex,
  //       active: index === currentIndex,
  //     }));
  //   };

  //   // Calculate pagination
  //   const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  //   const paginatedOrders = orders.slice(
  //     (currentPage - 1) * ORDERS_PER_PAGE,
  //     currentPage * ORDERS_PER_PAGE
  //   );

  //   // Handle page change
  //   const handlePageChange = (page) => {
  //     if (page >= 1 && page <= totalPages) {
  //       setCurrentPage(page);
  //       // Scroll to top of orders section
  //       document.querySelector('.orders-section')?.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   };

  //   // Generate page numbers for pagination
  //   const getPageNumbers = () => {
  //     const pageNumbers = [];
  //     const maxVisiblePages = 3;
      
  //     if (totalPages <= maxVisiblePages) {
  //       // Show all pages if total pages is less than max visible
  //       for (let i = 1; i <= totalPages; i++) {
  //         pageNumbers.push(i);
  //       }
  //     } else {
  //       // Show first page, last page, and pages around current page
  //       if (currentPage <= 2) {
  //         pageNumbers.push(1, 2, 3);
  //         if (totalPages > 3) pageNumbers.push('...', totalPages);
  //       } else if (currentPage >= totalPages - 1) {
  //         pageNumbers.push(1, '...');
  //         pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
  //       } else {
  //         pageNumbers.push(1, '...');
  //         pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
  //         pageNumbers.push('...', totalPages);
  //       }
  //     }
      
  //     return pageNumbers;
  //   };

  //   if (!user) return null;

  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="mb-8 animate-fade-in">
  //           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
  //             My Account
  //           </h1>
  //           <p className="text-gray-600">Manage your profile, orders, and address</p>
  //         </div>

  //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  //           {/* SIDEBAR */}
  //           <aside className="bg-white rounded-2xl shadow-lg p-6 animate-slide-in-left">
  //             <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
  //               <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
  //                 {user.name?.[0]?.toUpperCase()}
  //               </div>
  //               <div>
  //                 <p className="font-bold text-lg text-gray-800">{user.name}</p>
  //                 <p className="text-sm text-gray-600 truncate">{user.email}</p>
  //                 {/* <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
  //                   <FiUser className="text-xs" />
  //                   <span>Member since {new Date(user.createdAt).getFullYear()}</span>
  //                 </div> */}
  //               </div>
  //             </div>

  //             <div className="space-y-2">
  //               <button
  //                 onClick={() => setActiveTab("profile")}
  //                 className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
  //                   activeTab === "profile"
  //                     ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-[1.02]"
  //                     : "hover:bg-gray-50 hover:shadow-md"
  //                 }`}
  //               >
  //                 <FiUser className="text-lg" />
  //                 <span className="font-medium">Profile & Address</span>
  //               </button>

  //               <button
  //                 onClick={() => setActiveTab("orders")}
  //                 className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
  //                   activeTab === "orders"
  //                     ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-[1.02]"
  //                     : "hover:bg-gray-50 hover:shadow-md"
  //                 }`}
  //               >
  //                 <FiBox className="text-lg" />
  //                 <span className="font-medium">My Orders</span>
  //                 {orders.length > 0 && (
  //                   <span className="ml-auto bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
  //                     {orders.length}
  //                   </span>
  //                 )}
  //               </button>
  //             </div>

  //             <button
  //               onClick={handleLogout}
  //               className="w-full mt-8 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
  //             >
  //               <FiLogOut className="text-lg" />
  //               Logout
  //             </button>
  //           </aside>

  //           {/* CONTENT */}
  //           <section className="lg:col-span-3">
  //             <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-in-right">
  //               <div className="border-b border-gray-100 p-6 flex justify-between items-center">
  //                 <h2 className="text-2xl font-bold text-gray-800">
  //                   {activeTab === "profile" ? "Profile & Address" : "My Orders"}
  //                 </h2>

  //                 {activeTab === "orders" && (
  //                   <button
  //                     onClick={fetchOrders}
  //                     className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300"
  //                   >
  //                     <FiRefreshCw className={loading ? "animate-spin" : ""} />
  //                     {loading ? "Refreshing..." : "Refresh"}
  //                   </button>
  //                 )}
  //               </div>

  //               <div className="p-6">
  //                 {/* PROFILE & ADDRESS */}
  //                 {activeTab === "profile" && (
  //                   <div className="space-y-8">
  //                     {/* Personal Info */}
  //                     <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
  //                       <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
  //                         <FiUser className="text-blue-500" />
  //                         Personal Information
  //                       </h3>
  //                       <div className="grid md:grid-cols-2 gap-6">
  //                         <div className="space-y-2">
  //                           <label className="text-sm font-medium text-gray-600">Full Name</label>
  //                           <div className="p-4 bg-white rounded-xl border border-gray-200 font-medium">
  //                             {user.name}
  //                           </div>
  //                         </div>
  //                         <div className="space-y-2">
  //                           <label className="text-sm font-medium text-gray-600">Email Address</label>
  //                           <div className="p-4 bg-white rounded-xl border border-gray-200 font-medium">
  //                             {user.email}
  //                           </div>
  //                         </div>
  //                         <div className="space-y-2">
  //                           <label className="text-sm font-medium text-gray-600">Phone Number</label>
  //                           <div className="p-4 bg-white rounded-xl border border-gray-200 font-medium">
  //                             {user.mobile || "Not provided"}
  //                           </div>
  //                         </div>
  //                         <div className="space-y-2">
  //                           <label className="text-sm font-medium text-gray-600">Location</label>
  //                           <div className="p-4 bg-white rounded-xl border border-gray-200 font-medium">
  //                             {user.location || "Not specified"}
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>

  //                     {/* Address Section */}
  //                     <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
  //                       <div className="flex justify-between items-center mb-6">
  //                         <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
  //                           <FiMapPin className="text-green-500" />
  //                           Delivery Address
  //                         </h3>
  //                       </div>

  //                       {userAddress ? (
  //                         <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
  //                           <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
  //                             <div className="flex-1">
  //                               <div className="flex items-center gap-3 mb-4">
  //                                 <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
  //                                   <FiHome className="text-green-500 text-xl" />
  //                                 </div>
  //                                 <div>
  //                                   <div className="flex items-center gap-2 mb-1">
  //                                     <p className="font-bold text-gray-800 text-lg">{userAddress.fullName}</p>
  //                                   </div>
  //                                   <div className="flex items-center gap-2 text-gray-700">
  //                                     <FiPhone className="text-sm" />
  //                                     <span className="font-medium">{userAddress.phone}</span>
  //                                   </div>
  //                                 </div>
  //                               </div>

  //                               <div className="space-y-2 pl-16">
  //                                 <p className="text-gray-700">
  //                                   <span className="font-medium">Address: </span>
  //                                   {userAddress.line1}
  //                                 </p>
  //                                 {userAddress.line2 && (
  //                                   <p className="text-gray-700">{userAddress.line2}</p>
  //                                 )}
  //                                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
  //                                   <p className="text-gray-700">
  //                                     <span className="font-medium">City: </span>
  //                                     {userAddress.city}
  //                                   </p>
  //                                   <p className="text-gray-700">
  //                                     <span className="font-medium">State: </span>
  //                                     {userAddress.state ?? "TamilNadu"}
  //                                   </p>
  //                                   <p className="text-gray-700">
  //                                     <span className="font-medium">Pincode: </span>
  //                                     {userAddress.pincode}
  //                                   </p>
  //                                   {userAddress.landmark && (
  //                                     <p className="text-gray-700 col-span-2">
  //                                       <span className="font-medium">Landmark: </span>
  //                                       {userAddress.landmark}
  //                                     </p>
  //                                   )}
  //                                 </div>
  //                               </div>
  //                             </div>

  //                             <div className="flex flex-col sm:flex-row sm:items-start gap-2">
  //                               {userAddress.isDefault && (
  //                                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
  //                                   DEFAULT
  //                                 </span>
  //                               )}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       ) : (
  //                         <div className="text-center py-8">
  //                           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //                             <FiMapPin className="text-gray-400 text-3xl" />
  //                           </div>
  //                           <p className="text-gray-600 mb-4">No address saved yet</p>
  //                           <button
  //                             onClick={() => navigate("/profile/addresses")}
  //                             className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
  //                           >
  //                             Add Address
  //                           </button>
  //                         </div>
  //                       )}
  //                     </div>
  //                   </div>
  //                 )}

  //                 {/* ORDERS SECTION */}
  //                 {activeTab === "orders" && (
  //                   <div className="orders-section">
  //                     {loading ? (
  //                       <div className="text-center py-12">
  //                         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
  //                         <p className="text-gray-600">Loading your orders...</p>
  //                       </div>
  //                     ) : paginatedOrders.length === 0 ? (
  //                       <div className="text-center py-12">
  //                         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //                           <FiPackage className="text-gray-400 text-4xl" />
  //                         </div>
  //                         <p className="text-gray-600 text-lg mb-4">No orders found</p>
  //                         <button
  //                           onClick={() => navigate("/products")}
  //                           className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
  //                         >
  //                           Start Shopping
  //                         </button>
  //                       </div>
  //                     ) : (
  //                       <div>
  //                         {/* Orders Info */}
  //                         <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
  //                           <div className="flex flex-col sm:flex-row sm:items-center justify-between">
  //                             <div>
  //                               <p className="text-gray-700 font-medium">
  //                                 Showing {Math.min((currentPage - 1) * ORDERS_PER_PAGE + 1, orders.length)}-
  //                                 {Math.min(currentPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} orders
  //                               </p>
  //                               <p className="text-sm text-gray-600 mt-1">
  //                                 Page {currentPage} of {totalPages}
  //                               </p>
  //                             </div>
  //                             <div className="mt-2 sm:mt-0 text-sm text-gray-600">
  //                               2 orders per page
  //                             </div>
  //                           </div>
  //                         </div>

  //                         {/* Orders List - Shows exactly 2 orders */}
  //                         <div className="space-y-6">
  //                           {paginatedOrders.map((order) => {
  //                             const status = getOrderStatus(order.status);
  //                             return (
  //                               <div
  //                                 key={order._id}
  //                                 className="border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 bg-white"
  //                               >
  //                                 {/* Order Header */}
  //                                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-gray-100">
  //                                   <div className="space-y-2">
  //                                     <div className="flex items-center gap-3">
  //                                       <span className="text-lg font-bold text-gray-800">
  //                                         Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
  //                                       </span>
  //                                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
  //                                         {status.label}
  //                                       </span>
  //                                     </div>
  //                                     <p className="text-sm text-gray-600 flex items-center gap-2">
  //                                       <span>Placed on {formatDate(order.createdAt)}</span>
  //                                       <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
  //                                       <span>Order Total: ₹{order.totalAmount}</span>
  //                                     </p>
  //                                   </div>
  //                                   <div>
  //                                     <p className="text-sm text-gray-600 font-medium">Total Amount</p>
  //                                     <p className="text-2xl font-bold text-gray-800">₹{order.totalAmount}</p>
  //                                   </div>
  //                                   <button
  //                                     onClick={() => setSelectedOrder(order)}
  //                                     className="mt-4 md:mt-0 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300"
  //                                   >
  //                                     <FiTruck className="text-lg" />
  //                                     Track Order
  //                                   </button>
  //                                 </div>

  //                                 {/* Order Items */}
  //                                 <div className="space-y-4">
  //                                   {order.items.slice(0, 2).map((item, i) => (
  //                                     <div
  //                                       key={i}
  //                                       className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
  //                                     >
  //                                       <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg flex items-center justify-center">
  //                                         <FiPackage className="text-orange-500 text-2xl" />
  //                                       </div>
  //                                       <div className="flex-1">
  //                                         <p className="font-medium text-gray-800 line-clamp-1">
  //                                           {item.productId?.name || "Product"}
  //                                         </p>
  //                                         <div className="flex items-center gap-4 mt-2">
  //                                           <span className="text-sm text-gray-600">
  //                                             Qty: {item.quantity}
  //                                           </span>
  //                                           <span className="text-sm text-gray-600">
  //                                             Price: ₹{item.price}
  //                                           </span>
  //                                           <span className="text-sm font-medium text-gray-800">
  //                                             Subtotal: ₹{item.quantity * item.price}
  //                                           </span>
  //                                         </div>
  //                                       </div>
  //                                     </div>
  //                                   ))}
  //                                   {order.items.length > 2 && (
  //                                     <div className="text-center text-gray-600 text-sm">
  //                                       + {order.items.length - 2} more item(s)
  //                                     </div>
  //                                   )}
  //                                 </div>
  //                               </div>
  //                             );
  //                           })}
  //                         </div>

  //                         {/* Enhanced Pagination - Shows 2 orders per page */}
  //                         {totalPages > 1 && (
  //                           <div className="mt-8 pt-8 border-t border-gray-200">
  //                             {/* Pagination Info */}
  //                             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
  //                               <div className="text-sm text-gray-600 mb-2 sm:mb-0">
  //                                 Showing {Math.min((currentPage - 1) * ORDERS_PER_PAGE + 1, orders.length)}-
  //                                 {Math.min(currentPage * ORDERS_PER_PAGE, orders.length)} of {orders.length} orders
  //                               </div>
  //                               <div className="text-sm text-gray-600">
  //                                 Page {currentPage} of {totalPages}
  //                               </div>
  //                             </div>

  //                             {/* Pagination Controls */}
  //                             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
  //                               {/* Previous Button */}
  //                               <button
  //                                 disabled={currentPage === 1}
  //                                 onClick={() => handlePageChange(currentPage - 1)}
  //                                 className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
  //                               >
  //                                 <FiChevronLeft className="text-lg" />
  //                                 Previous
  //                               </button>

  //                               {/* Page Numbers */}
  //                               <div className="flex items-center gap-2">
  //                                 {getPageNumbers().map((page, index) => (
  //                                   page === '...' ? (
  //                                     <span key={`ellipsis-${index}`} className="text-gray-400 px-2">
  //                                       ...
  //                                     </span>
  //                                   ) : (
  //                                     <button
  //                                       key={page}
  //                                       onClick={() => handlePageChange(page)}
  //                                       className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
  //                                         currentPage === page
  //                                           ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
  //                                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  //                                       }`}
  //                                     >
  //                                       {page}
  //                                     </button>
  //                                   )
  //                                 ))}
  //                               </div>

  //                               {/* Next Button */}
  //                               <button
  //                                 disabled={currentPage === totalPages}
  //                                 onClick={() => handlePageChange(currentPage + 1)}
  //                                 className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
  //                               >
  //                                 Next
  //                                 <FiChevronRight className="text-lg" />
  //                               </button>
  //                             </div>

  //                             {/* Quick Navigation */}
  //                             <div className="mt-4 flex items-center justify-center gap-4">
  //                               <span className="text-sm text-gray-600">Go to page:</span>
  //                               <div className="flex items-center gap-2">
  //                                 <input
  //                                   type="number"
  //                                   min="1"
  //                                   max={totalPages}
  //                                   value={currentPage}
  //                                   onChange={(e) => {
  //                                     const page = parseInt(e.target.value);
  //                                     if (page >= 1 && page <= totalPages) {
  //                                       handlePageChange(page);
  //                                     }
  //                                   }}
  //                                   className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
  //                                 />
  //                                 <span className="text-sm text-gray-600">of {totalPages}</span>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         )}
  //                       </div>
  //                     )}
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           </section>
  //         </div>
  //       </div>

  //       {/* FLIPKART-STYLE TRACK ORDER MODAL */}
  //       {selectedOrder && (
  //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in mt-10">
  //           <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
  //             {/* Modal Header */}
  //             <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 rounded-t-2xl">
  //               <div className="flex justify-between items-center">
  //                 <div>
  //                   <h3 className="text-2xl font-bold text-gray-800">
  //                     Order #{selectedOrder.orderNumber || selectedOrder._id.slice(-8).toUpperCase()}
  //                   </h3>
  //                   <p className="text-gray-600 mt-1">
  //                     Placed on {formatDate(selectedOrder.createdAt)}
  //                   </p>
  //                 </div>
  //                 <button
  //                   onClick={() => setSelectedOrder(null)}
  //                   className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
  //                 >
  //                   <FiX className="text-gray-600 text-xl" />
  //                 </button>
  //               </div>
  //             </div>

  //             {/* Order Progress */}
  //             <div className="p-6">
  //               <div className="mb-8">
  //                 <div className="flex items-center justify-between mb-2">
  //                   <span className="text-lg font-semibold text-gray-800">Order Progress</span>
  //                   <span className={`px-3 py-1 rounded-full text-sm font-bold ${
  //                     getOrderStatus(selectedOrder.status).bg
  //                   } ${getOrderStatus(selectedOrder.status).color}`}>
  //                     {getOrderStatus(selectedOrder.status).label}
  //                   </span>
  //                 </div>
  //                 <p className="text-gray-600 text-sm mb-6">
  //                   Estimated delivery: {formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))}
  //                 </p>

  //                 {/* Flipkart-style Progress Steps */}
  //                 <div className="relative">
  //                   {/* Progress Line */}
  //                   <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full transform -translate-y-1/2"></div>
  //                   <div 
  //                     className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform -translate-y-1/2 transition-all duration-1000"
  //                     style={{ width: `${(getOrderSteps(selectedOrder.status).filter(s => s.completed).length / 6) * 100}%` }}
  //                   ></div>

  //                   {/* Steps */}
  //                   <div className="relative flex justify-between">
  //                     {getOrderSteps(selectedOrder.status).map((step, index) => (
  //                       <div key={step.key} className="flex flex-col items-center">
  //                         <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
  //                           step.completed
  //                             ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-110'
  //                             : 'bg-white border-2 border-gray-300 text-gray-400'
  //                         } ${step.active ? 'ring-4 ring-green-200 ring-opacity-50' : ''}`}>
  //                           {step.completed ? (
  //                             <MdCheckCircle className="text-2xl" />
  //                           ) : (
  //                             <MdRadioButtonUnchecked className="text-2xl" />
  //                           )}
  //                         </div>
  //                         <span className={`text-xs font-medium text-center max-w-20 ${
  //                           step.completed ? 'text-gray-800' : 'text-gray-500'
  //                         }`}>
  //                           {step.label}
  //                         </span>
  //                         <span className="text-xs text-gray-400 mt-1">
  //                           {step.active ? "In progress" : step.completed ? "Completed" : "Pending"}
  //                         </span>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //               </div>

  //               {/* Order Details */}
  //               <div className="bg-gray-50 rounded-xl p-6">
  //                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Details</h4>
  //                 <div className="grid md:grid-cols-1 gap-4">
  //                   <div className="space-y-2">
  //                     <div className="flex justify-between">
  //                       <span className="text-gray-600">Payment Method</span>
  //                       <span className="font-medium">Credit/Debit Card</span>
  //                     </div>
  //                   </div>
  //                   <div className="space-y-2">
  //                     <div className="flex justify-between">
  //                       <span className="text-gray-600">Delivery Address</span>
  //                       <span className="font-medium text-right">
  //                         {userAddress ? (
  //                           <>
  //                             {userAddress.line1}<br />
  //                             {userAddress.city}, {userAddress.pincode}
  //                           </>
  //                         ) : 'Not specified'}
  //                       </span>
  //                     </div>
  //                     <div className="flex justify-between">
  //                       <span className="text-gray-600">Contact</span>
  //                       <span className="font-medium">{user.mobile || 'N/A'}</span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               {/* Action Buttons */}
  //               <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
  //                 <button
  //                   onClick={() => setSelectedOrder(null)}
  //                   className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
  //                 >
  //                   Close
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Custom Animations */}
  //       <style jsx>{`
  //         @keyframes fade-in {
  //           from { opacity: 0; }
  //           to { opacity: 1; }
  //         }
          
  //         @keyframes slide-in-left {
  //           from { transform: translateX(-20px); opacity: 0; }
  //           to { transform: translateX(0); opacity: 1; }
  //         }
          
  //         @keyframes slide-in-right {
  //           from { transform: translateX(20px); opacity: 0; }
  //           to { transform: translateX(0); opacity: 1; }
  //         }
          
  //         .animate-fade-in {
  //           animation: fade-in 0.5s ease-out;
  //         }
          
  //         .animate-slide-in-left {
  //           animation: slide-in-left 0.5s ease-out;
  //         }
          
  //         .animate-slide-in-right {
  //           animation: slide-in-right 0.5s ease-out;
  //         }
          
  //         .line-clamp-1 {
  //           overflow: hidden;
  //           display: -webkit-box;
  //           -webkit-box-orient: vertical;
  //           -webkit-line-clamp: 1;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // };

  // export default Profile;













  

//deepseek code


import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUser,
  FiBox,
  FiLogOut,
  FiPackage,
  FiRefreshCw,
  FiMapPin,
  FiTruck,
  FiHome,
  FiPhone,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX
} from "react-icons/fi";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { logout } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

// Dynamic orders per page based on screen size
const getOrdersPerPage = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768 ? 1 : 2;
  }
  return 2;
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ordersPerPage, setOrdersPerPage] = useState(getOrdersPerPage());
  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  
  const userAddress = user?.addresses?.[0] || null;

  // Handle responsive orders per page
  useEffect(() => {
    const handleResize = () => {
      setOrdersPerPage(getOrdersPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  useEffect(() => {
    if (userAddress) {
      setAddressData({
        fullName: userAddress.fullName || user?.name || "",
        phone: userAddress.phone || user?.mobile || "",
        line1: userAddress.line1 || "",
        line2: userAddress.line2 || "",
        city: userAddress.city || "",
        state: userAddress.state || "",
        pincode: userAddress.pincode || "",
        landmark: userAddress.landmark || "",
      });
    }
  }, [userAddress, user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/my-orders");
      
      const sortedOrders = Array.isArray(res?.data?.data) 
        ? res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      
      setOrders(sortedOrders);
      // toast.success("Orders refreshed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getOrderStatus = (status) => {
    const statusConfig = {
      CREATED: { label: "Order Placed", color: "text-blue-600", bg: "bg-blue-100" },
      CONFIRMED: { label: "Confirmed", color: "text-purple-600", bg: "bg-purple-100" },
      PROCESSING: { label: "Processing", color: "text-yellow-600", bg: "bg-yellow-100" },
      SHIPPED: { label: "Shipped", color: "text-orange-600", bg: "bg-orange-100" },
      OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "text-pink-600", bg: "bg-pink-100" },
      DELIVERED: { label: "Delivered", color: "text-green-600", bg: "bg-green-100" },
      CANCELLED: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100" },
    };
    return statusConfig[status] || { label: status, color: "text-gray-600", bg: "bg-gray-100" };
  };

  const getOrderSteps = (status) => {
    const steps = [
      { key: "CREATED", label: "Order Placed", icon: "📦" },
      { key: "CONFIRMED", label: "Confirmed", icon: "✓" },
      { key: "PROCESSING", label: "Processing", icon: "⚙️" },
      { key: "SHIPPED", label: "Shipped", icon: "🚚" },
      { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: "🏍️" },
      { key: "DELIVERED", label: "Delivered", icon: "🏠" },
    ];
    
    const currentIndex = steps.findIndex(step => step.key === status);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll to content
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
          pageNumbers.push(i);
        }
        if (totalPages > 3) {
          pageNumbers.push('...');
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header - Always Sticky */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">My Account</h1>
              <p className="text-xs text-gray-600">Welcome, {user.name}</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-orange-50 to-yellow-50"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-xl text-gray-700" />
              ) : (
                <FiMenu className="text-xl text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Tab Switcher - Always Sticky Below Header */}
          <div className="mt-4 bg-white rounded-lg shadow-sm">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FiUser className="text-lg" />
                  <span className="text-sm">Profile & Address</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("orders");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-3 text-center font-medium transition-all duration-300 ${
                  activeTab === "orders"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FiBox className="text-lg" />
                  <span className="text-sm">My Orders</span>
                  {orders.length > 0 && (
                    <span className="bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      {orders.length}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6 pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              My Account
            </h1>
            <p className="text-gray-600">Manage your profile, orders, and address</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
            <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-lg text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-gray-50 hover:shadow-md"
                }`}
              >
                <FiUser className="text-lg" />
                <span className="font-medium">Profile & Address</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                  activeTab === "orders"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-gray-50 hover:shadow-md"
                }`}
              >
                <FiBox className="text-lg" />
                <span className="font-medium">My Orders</span>
                {orders.length > 0 && (
                  <span className="ml-auto bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                    {orders.length}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-8 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
          </aside>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <div 
                className="absolute top-0 left-0 h-full w-80 max-w-full bg-white p-6 animate-slide-in-left overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <FiX className="text-xl text-gray-700" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                      activeTab === "profile"
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <FiUser className="text-lg" />
                    <span className="font-medium">Profile & Address</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("orders");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3 ${
                      activeTab === "orders"
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <FiBox className="text-lg" />
                    <span className="font-medium">My Orders</span>
                    {orders.length > 0 && (
                      <span className="ml-auto bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                        {orders.length}
                      </span>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-8 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* CONTENT AREA */}
          <section className="lg:col-span-3" ref={contentRef}>
            {/* Content Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[400px]">
              {/* Content Header - Fixed with refresh button on right */}
              <div className="border-b border-gray-100 p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                    {activeTab === "profile" ? "Profile & Address" : "My Orders"}
                  </h2>

                  {/* Refresh Button - Now always on the right side in lg screens */}
                  {activeTab === "orders" && (
                    <div className="flex justify-end">
                      <button
                        onClick={fetchOrders}
                        className="w-full lg:w-auto px-4 py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                      >
                        <FiRefreshCw className={loading ? "animate-spin" : ""} />
                        {loading ? "Refreshing..." : "Refresh Orders"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 lg:p-6">
                {/* PROFILE & ADDRESS */}
                {activeTab === "profile" && (
                  <div className="space-y-6 lg:space-y-8">
                    {/* Personal Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 lg:p-6">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6 flex items-center gap-2">
                        <FiUser className="text-blue-500" />
                        Personal Information
                      </h3>
                      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Full Name</label>
                          <div className="p-3 lg:p-4 bg-white rounded-xl border border-gray-200 font-medium">
                            {user.name}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Email Address</label>
                          <div className="p-3 lg:p-4 bg-white rounded-xl border border-gray-200 font-medium">
                            {user.email}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Phone Number</label>
                          <div className="p-3 lg:p-4 bg-white rounded-xl border border-gray-200 font-medium">
                            {user.mobile || "Not provided"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-600">Location</label>
                          <div className="p-3 lg:p-4 bg-white rounded-xl border border-gray-200 font-medium">
                            {user.location || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 lg:p-6">
                      <div className="flex justify-between items-center mb-4 lg:mb-6">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-2">
                          <FiMapPin className="text-green-500" />
                          Delivery Address
                        </h3>
                      </div>

                      {userAddress ? (
                        <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                <FiHome className="text-green-500 text-lg lg:text-xl" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-bold text-gray-800 lg:text-lg">{userAddress.fullName}</p>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                  <FiPhone className="text-sm" />
                                  <span className="font-medium text-sm lg:text-base">{userAddress.phone}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 lg:pl-16">
                              <p className="text-gray-700 text-sm lg:text-base">
                                <span className="font-medium">Address: </span>
                                {userAddress.line1}
                              </p>
                              {userAddress.line2 && (
                                <p className="text-gray-700 text-sm lg:text-base">{userAddress.line2}</p>
                              )}
                              <div className="grid grid-cols-1 gap-2">
                                <p className="text-gray-700 text-sm lg:text-base">
                                  <span className="font-medium">City: </span>
                                  {userAddress.city}
                                </p>
                                <p className="text-gray-700 text-sm lg:text-base">
                                  <span className="font-medium">State: </span>
                                  {userAddress.state ?? "TamilNadu"}
                                </p>
                                <p className="text-gray-700 text-sm lg:text-base">
                                  <span className="font-medium">Pincode: </span>
                                  {userAddress.pincode}
                                </p>
                                {userAddress.landmark && (
                                  <p className="text-gray-700 text-sm lg:text-base">
                                    <span className="font-medium">Landmark: </span>
                                    {userAddress.landmark}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 lg:py-8">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiMapPin className="text-gray-400 text-2xl lg:text-3xl" />
                          </div>
                          <p className="text-gray-600 mb-4">No address saved yet</p>
                          <button
                            onClick={() => navigate("/profile/addresses")}
                            className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                          >
                            Add Address
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ORDERS SECTION */}
                {activeTab === "orders" && (
                  <div className="orders-section">
                    {loading ? (
                      <div className="text-center py-8 lg:py-12">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 lg:h-12 lg:w-12 border-b-2 border-orange-500 mb-4"></div>
                        <p className="text-gray-600">Loading your orders...</p>
                      </div>
                    ) : paginatedOrders.length === 0 ? (
                      <div className="text-center py-8 lg:py-12">
                        <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
                          <FiPackage className="text-gray-400 text-2xl lg:text-4xl" />
                        </div>
                        <p className="text-gray-600 lg:text-lg mb-4">No orders found</p>
                        <button
                          onClick={() => navigate("/products")}
                          className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* Orders Info - Mobile Optimized */}
                        <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-700 font-medium text-sm lg:text-base">
                                  Page {currentPage} of {totalPages}
                                </p>
                                <p className="text-xs lg:text-sm text-gray-600 mt-1">
                                  Showing {ordersPerPage} of {orders.length} orders per page
                                </p>
                              </div>
                              <div className="text-xs lg:text-sm text-gray-600 bg-white px-2 py-1 rounded-lg">
                                {orders.length} total orders
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Orders List - 1 per page on mobile */}
                        <div className="space-y-4 lg:space-y-6">
                          {paginatedOrders.map((order) => {
                            const status = getOrderStatus(order.status);
                            return (
                              <div
                                key={order._id}
                                className="border border-gray-200 rounded-2xl p-4 lg:p-6 hover:shadow-xl transition-all duration-500 bg-white"
                              >
                                {/* Order Header - Mobile Optimized */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 pb-4 lg:pb-6 border-b border-gray-100">
                                  <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                      <span className="text-base lg:text-lg font-bold text-gray-800">
                                        Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                                      </span>
                                      <span className={`px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold ${status.bg} ${status.color} w-fit`}>
                                        {status.label}
                                      </span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-xs lg:text-sm text-gray-600">
                                      <span>Placed on {formatDate(order.createdAt)}</span>
                                      <div className="flex items-center gap-2">
                                        <span>Order Total: ₹{order.totalAmount}</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        <span>{order.items.length} item(s)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 lg:mt-0 flex items-center justify-between lg:block">
                                    <div className="lg:mb-2">
                                      <p className="text-xs lg:text-sm text-gray-600 font-medium">Total Amount</p>
                                      <p className="text-xl lg:text-2xl font-bold text-gray-800">₹{order.totalAmount}</p>
                                    </div>
                                    <button
                                      onClick={() => setSelectedOrder(order)}
                                      className="lg:mt-3 px-4 py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                                    >
                                      <FiTruck className="text-lg" />
                                      <span className="hidden sm:inline">Track Order</span>
                                      <span className="sm:hidden">Track</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Order Items - Mobile Optimized */}
                                <div className="space-y-3 lg:space-y-4">
                                  {order.items.slice(0, 3).map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                                    >
                                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg flex items-center justify-center">
                                        <FiPackage className="text-orange-500 text-xl lg:text-2xl" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800 line-clamp-1 text-sm lg:text-base">
                                          {item.productId?.name || "Product"}
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 lg:mt-2">
                                          <span className="text-xs lg:text-sm text-gray-600">
                                            Qty: {item.quantity}
                                          </span>
                                          <span className="text-xs lg:text-sm text-gray-600">
                                            Price: ₹{item.price}
                                          </span>
                                          <span className="text-xs lg:text-sm font-medium text-gray-800">
                                            Subtotal: ₹{item.quantity * item.price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  {order.items.length > 3 && (
                                    <div className="text-center text-gray-600 text-xs lg:text-sm">
                                      + {order.items.length - 3} more item(s)
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Enhanced Pagination - Mobile Optimized */}
                        {totalPages > 1 && (
                          <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-200">
                            {/* Pagination Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 lg:mb-4">
                              <div className="text-xs lg:text-sm text-gray-600 mb-1 sm:mb-0">
                                Page {currentPage} of {totalPages}
                              </div>
                              <div className="text-xs lg:text-sm text-gray-600">
                                Order {Math.min((currentPage - 1) * ordersPerPage + 1, orders.length)} of {orders.length}
                              </div>
                            </div>

                            {/* Pagination Controls - Mobile Optimized */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 lg:gap-4">
                              {/* Previous Button */}
                              <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm lg:text-base"
                              >
                                <FiChevronLeft className="text-lg" />
                                Previous
                              </button>

                              {/* Page Numbers - Mobile Optimized */}
                              <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto py-2">
                                {getPageNumbers().map((page, index) => (
                                  page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="text-gray-400 px-1 lg:px-2 text-sm">
                                      ...
                                    </span>
                                  ) : (
                                    <button
                                      key={page}
                                      onClick={() => handlePageChange(page)}
                                      className={`min-w-8 h-8 lg:min-w-10 lg:h-10 rounded-lg font-medium transition-all duration-300 text-sm lg:text-base px-2 ${
                                        currentPage === page
                                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                    >
                                      {page}
                                    </button>
                                  )
                                ))}
                              </div>

                              {/* Next Button */}
                              <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm lg:text-base"
                              >
                                Next
                                <FiChevronRight className="text-lg" />
                              </button>
                            </div>

                            {/* Quick Navigation - Mobile Optimized */}
                            <div className="mt-3 lg:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 lg:gap-4">
                              <span className="text-xs lg:text-sm text-gray-600">Go to page:</span>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  max={totalPages}
                                  value={currentPage}
                                  onChange={(e) => {
                                    const page = parseInt(e.target.value);
                                    if (page >= 1 && page <= totalPages) {
                                      handlePageChange(page);
                                    }
                                  }}
                                  className="w-14 lg:w-16 px-2 py-1 lg:px-3 lg:py-2 border border-gray-300 rounded-lg text-center text-sm lg:text-base"
                                />
                                <span className="text-xs lg:text-sm text-gray-600">of {totalPages}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* TRACK ORDER MODAL - Fixed Version */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-4 md:p-6 border-b border-gray-200 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg md:text-2xl font-bold text-gray-800">
                    Order #{selectedOrder.orderNumber || selectedOrder._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">
                    Placed on {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                >
                  <FiX className="text-gray-600 text-lg md:text-xl" />
                </button>
              </div>
            </div>

            {/* Order Progress */}
            <div className="p-4 md:p-6">
              <div className="mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <span className="text-base md:text-lg font-semibold text-gray-800">Order Progress</span>
                  <span className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold ${
                    getOrderStatus(selectedOrder.status).bg
                  } ${getOrderStatus(selectedOrder.status).color} w-fit`}>
                    {getOrderStatus(selectedOrder.status).label}
                  </span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6">
                  Estimated delivery: {formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))}
                </p>

                {/* Progress Steps */}
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full transform -translate-y-1/2"></div>
                  <div 
                    className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform -translate-y-1/2 transition-all duration-1000"
                    style={{ width: `${(getOrderSteps(selectedOrder.status).filter(s => s.completed).length / 6) * 100}%` }}
                  ></div>

                  {/* Steps */}
                  <div className="relative flex justify-between">
                    {getOrderSteps(selectedOrder.status).map((step, index) => (
                      <div key={step.key} className="flex flex-col items-center">
                        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-3 transition-all duration-500 ${
                          step.completed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-110'
                            : 'bg-white border-2 border-gray-300 text-gray-400'
                        } ${step.active ? 'ring-2 md:ring-4 ring-green-200 ring-opacity-50' : ''}`}>
                          {step.completed ? (
                            <MdCheckCircle className="text-lg md:text-2xl" />
                          ) : (
                            <MdRadioButtonUnchecked className="text-lg md:text-2xl" />
                          )}
                        </div>
                        <span className={`text-xs font-medium text-center max-w-12 md:max-w-20 ${
                          step.completed ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Order Details</h4>
                <div className="grid gap-3 md:gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Payment Method</span>
                      <span className="font-medium text-sm md:text-base">
                        {selectedOrder.paymentMethod || "Credit/Debit Card"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Delivery Address</span>
                      <span className="font-medium text-sm md:text-base text-right">
                        {userAddress ? (
                          <>
                            {userAddress.line1}<br />
                            {userAddress.city}, {userAddress.pincode}
                          </>
                        ) : 'Not specified'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Contact</span>
                      <span className="font-medium text-sm md:text-base">{user.mobile || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="mt-6">
                <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">Order Summary</h4>
                <div className="space-y-3">
                  {selectedOrder.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800 text-sm md:text-base">
                          {item.productId?.name || "Product"}
                        </p>
                        <p className="text-gray-600 text-xs md:text-sm">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-bold text-gray-800 text-sm md:text-base">
                        ₹{item.quantity * item.price}
                      </p>
                    </div>
                  ))}
                  {selectedOrder.items.length > 3 && (
                    <div className="text-center text-gray-600 text-xs md:text-sm">
                      + {selectedOrder.items.length - 3} more item(s)
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Total Amount</span>
                      <span className="text-xl font-bold text-gray-800">₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 md:gap-3 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2 md:py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300 text-sm md:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;