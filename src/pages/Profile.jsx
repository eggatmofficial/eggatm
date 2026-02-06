
// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   FiUser,
//   FiBox,
//   FiLogOut,
//   FiPackage,
//   FiRefreshCw,
//   FiMapPin,
//   FiTruck,
//   FiHome,
//   FiPhone,
//   FiChevronLeft,
//   FiChevronRight,
//   FiMenu,
//   FiX,
//   FiCheckCircle,
//   FiClock,
//   FiChevronDown,
//   FiChevronUp,
//   FiPhone as FiPhoneIcon
// } from "react-icons/fi";
// import { MdCheckCircle, MdRadioButtonUnchecked, MdLocalShipping, MdShoppingBag } from "react-icons/md";
// import { FaBoxOpen, FaShippingFast } from "react-icons/fa";
// import { logout } from "../store/auth.store";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import toast from "react-hot-toast";

// // Dynamic orders per page based on screen size
// const getOrdersPerPage = () => {
//   if (typeof window !== 'undefined') {
//     if (window.innerWidth < 640) return 1;
//     if (window.innerWidth < 1024) return 2;
//     return 3;
//   }
//   return 2;
// };

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [ordersPerPage, setOrdersPerPage] = useState(getOrdersPerPage());
//   const [expandedOrderId, setExpandedOrderId] = useState(null);
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
//   const contentRef = useRef(null);
//   const modalRef = useRef(null);
  
//   const userAddress = user?.addresses?.[0] || null;
  
//   // Handle responsive orders per page
//   useEffect(() => {
//     const handleResize = () => {
//       setOrdersPerPage(getOrdersPerPage());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (activeTab === "orders") fetchOrders();
//   }, [activeTab]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeTab]);

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

//   // Close modal on outside click and handle body scroll
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         setSelectedOrder(null);
//       }
//     };

//     if (selectedOrder) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.body.style.overflow = 'auto';
//     };
//   }, [selectedOrder]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orders/my-orders");
      
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
//     navigate("/");
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const formatDateShort = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//     });
//   };

//   const getOrderStatus = (status) => {
//     const statusConfig = {
//       CREATED: { label: "Order Placed", color: "text-blue-600", bg: "bg-blue-100", icon: MdShoppingBag },
//       CONFIRMED: { label: "Confirmed", color: "text-purple-600", bg: "bg-purple-100", icon: FiCheckCircle },
//       PROCESSING: { label: "Processing", color: "text-yellow-600", bg: "bg-yellow-100", icon: FiPackage },
//       SHIPPED: { label: "Shipped", color: "text-orange-600", bg: "bg-orange-100", icon: MdLocalShipping },
//       OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "text-pink-600", bg: "bg-pink-100", icon: FaShippingFast },
//       DELIVERED: { label: "Delivered", color: "text-green-600", bg: "bg-green-100", icon: FiCheckCircle },
//       CANCELLED: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100", icon: FiX },
//     };
//     return statusConfig[status] || { label: status, color: "text-gray-600", bg: "bg-gray-100", icon: FiPackage };
//   };

//   const getOrderSteps = (status) => {
//     const steps = [
//       { 
//         key: "CREATED", 
//         label: "Order Placed", 
//         description: "Your order has been placed successfully",
//         icon: MdShoppingBag,
//         color: "from-blue-400 to-blue-500",
//         bgColor: "bg-blue-100",
//         textColor: "text-blue-600"
//       },
//       { 
//         key: "CONFIRMED", 
//         label: "Order Confirmed", 
//         description: "We've received your order and confirmed it",
//         icon: FiCheckCircle,
//         color: "from-purple-400 to-purple-500",
//         bgColor: "bg-purple-100",
//         textColor: "text-purple-600"
//       },
//       { 
//         key: "PROCESSING", 
//         label: "Processing", 
//         description: "Your order is being prepared for shipment",
//         icon: FiPackage,
//         color: "from-yellow-400 to-yellow-500",
//         bgColor: "bg-yellow-100",
//         textColor: "text-yellow-600"
//       },
//       { 
//         key: "SHIPPED", 
//         label: "Shipped", 
//         description: "Your order has been dispatched",
//         icon: MdLocalShipping,
//         color: "from-orange-400 to-orange-500",
//         bgColor: "bg-orange-100",
//         textColor: "text-orange-600"
//       },
//       { 
//         key: "OUT_FOR_DELIVERY", 
//         label: "Out for Delivery", 
//         description: "Your order is on its way to you",
//         icon: FaShippingFast,
//         color: "from-pink-400 to-pink-500",
//         bgColor: "bg-pink-100",
//         textColor: "text-pink-600"
//       },
//       { 
//         key: "DELIVERED", 
//         label: "Delivered", 
//         description: "Your order has been delivered",
//         icon: FiCheckCircle,
//         color: "from-green-400 to-green-500",
//         bgColor: "bg-green-100",
//         textColor: "text-green-600"
//       },
//     ];
    
//     const currentIndex = steps.findIndex(step => step.key === status);
//     return steps.map((step, index) => ({
//       ...step,
//       completed: index <= currentIndex,
//       active: index === currentIndex,
//       upcoming: index > currentIndex,
//     }));
//   };

//   const totalPages = Math.ceil(orders.length / ordersPerPage);
//   const paginatedOrders = orders.slice(
//     (currentPage - 1) * ordersPerPage,
//     currentPage * ordersPerPage
//   );

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       // Smooth scroll to content
//       if (contentRef.current) {
//         contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }
//   };

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
    
//     if (totalPages <= maxVisiblePages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage <= 2) {
//         for (let i = 1; i <= Math.min(3, totalPages); i++) {
//           pageNumbers.push(i);
//         }
//         if (totalPages > 3) {
//           pageNumbers.push('...');
//           pageNumbers.push(totalPages);
//         }
//       } else if (currentPage >= totalPages - 1) {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         for (let i = totalPages - 2; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         pageNumbers.push(1);
//         pageNumbers.push('...');
//         pageNumbers.push(currentPage - 1);
//         pageNumbers.push(currentPage);
//         pageNumbers.push(currentPage + 1);
//         pageNumbers.push('...');
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };

//   const toggleOrderExpand = (orderId) => {
//     setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
//   };

//   if (!user) return null;


// const getStatusDescription = (status) => {
//   const descriptions = {
//     CREATED: "Your order has been placed successfully",
//     CONFIRMED: "We've received your order and confirmed it",
//     PROCESSING: "Your order is being prepared for shipment",
//     SHIPPED: "Your order has been dispatched from our warehouse",
//     OUT_FOR_DELIVERY: "Your order is on its way to your location",
//     DELIVERED: "Your order has been successfully delivered",
//     CANCELLED: "Your order has been cancelled",
//   };
//   return descriptions[status] || "Your order is being processed";
// };

// const calculateProgressHeight = (status) => {
//   const steps = ['CREATED', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
//   const currentIndex = steps.indexOf(status);
  
//   if (currentIndex === -1) return 0;
//   return ((currentIndex + 1) / steps.length) * 100;
// };

// const getEstimatedTime = (createdAt, stepIndex) => {
//   const date = new Date(createdAt);
//   // Add hours based on step index
//   date.setHours(date.getHours() + (stepIndex * 2));
  
//   return date.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const getDeliveryEstimate = (status) => {
//   const estimates = {
//     CREATED: "Within 3-5 business days",
//     CONFIRMED: "Within 3-5 business days",
//     PROCESSING: "Within 2-4 business days",
//     SHIPPED: "Within 1-2 business days",
//     OUT_FOR_DELIVERY: "Today or tomorrow",
//     DELIVERED: "Delivered successfully",
//   };
//   return estimates[status] || "Will be updated soon";
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Mobile Header - Simplified without "My Account" text */}
//       <div className="lg:hidden sticky top-0 z-40 bg-white shadow-sm">
//         <div className="p-3 sm:p-4">
//           <div className="flex items-center justify-between">
            
//             {/* Tab title based on active tab */}
//             <h1 className="text-lg font-bold text-gray-800">
//               {activeTab === "profile" ? "Profile" : "My Orders "}
//             </h1>
            
//             {/* User avatar/placeholder */}
//             <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
//               {user.name?.[0]?.toUpperCase()}
//             </div>
//           </div>

//           {/* Mobile Tab Switcher - Only tabs, no extra text */}
//           <div className="mt-3 bg-white rounded-lg shadow-xs border border-gray-100">
//             <div className="flex">
//               <button
//                 onClick={() => {
//                   setActiveTab("profile");
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className={`flex-1 py-2.5 text-center font-medium transition-all duration-300 ${
//                   activeTab === "profile"
//                     ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-1.5">
//                   <FiUser className="text-base" />
//                   <span className="text-xs sm:text-sm">Profile</span>
//                 </div>
//               </button>
//               <button
//                 onClick={() => {
//                   setActiveTab("orders");
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className={`flex-1 py-2.5 text-center font-medium transition-all duration-300 ${
//                   activeTab === "orders"
//                     ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-1.5">
//                   <FiBox className="text-base" />
//                   <span className="text-xs sm:text-sm">Orders</span>
//                   {orders.length > 0 && (
//                     <span className="bg-white text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
//                       {orders.length}
//                     </span>
//                   )}
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Header */}
//       <div className="hidden lg:block p-6 pb-0">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//               My Account
//             </h1>
//             <p className="text-gray-600">Manage your profile, orders, and address</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Desktop Sidebar */}
//           <aside className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
//             <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
//               <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
//                 {user.name?.[0]?.toUpperCase()}
//               </div>
//               <div>
//                 <p className="font-bold text-lg text-gray-800">{user.name}</p>
//                 <p className="text-sm text-gray-600 truncate">{user.email}</p>
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

//           {/* CONTENT AREA */}
//           <section className="lg:col-span-3" ref={contentRef}>
//             {/* Content Card */}
//             <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden min-h-[400px]">
//               <div className="p-3 sm:p-4 lg:p-6">
//                 {/* PROFILE & ADDRESS */}
//                 {activeTab === "profile" && (
//                   <div className="space-y-4 sm:space-y-6 lg:space-y-8">
//                     {/* Personal Info */}
//                     <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
//                       <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
//                         <FiUser className="text-blue-500 text-sm sm:text-base lg:text-lg" />
//                         Personal Information
//                       </h3>
//                       <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-6">
//                         <div className="space-y-1.5 sm:space-y-2">
//                           <label className="text-xs sm:text-sm font-medium text-gray-600">Full Name</label>
//                           <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
//                             {user.name}
//                           </div>
//                         </div>
//                         <div className="space-y-1.5 sm:space-y-2">
//                           <label className="text-xs sm:text-sm font-medium text-gray-600">Email Address</label>
//                           <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
//                             {user.email}
//                           </div>
//                         </div>
//                         <div className="space-y-1.5 sm:space-y-2">
//                           <label className="text-xs sm:text-sm font-medium text-gray-600">Phone Number</label>
//                           <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
//                             {user.mobile || "Not provided"}
//                           </div>
//                         </div>
//                         <div className="space-y-1.5 sm:space-y-2">
//                           <label className="text-xs sm:text-sm font-medium text-gray-600">Location</label>
//                           <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
//                             {user.location || "Not specified"}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Address Section */}
//                     <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
//                       <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
//                         <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-1.5 sm:gap-2">
//                           <FiMapPin className="text-green-500 text-sm sm:text-base lg:text-lg" />
//                           Delivery Address
//                         </h3>
//                       </div>

//                       {userAddress ? (
//                         <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-200 shadow-sm">
//                           <div className="flex flex-col gap-3 sm:gap-4">
//                             <div className="flex items-center gap-2.5 sm:gap-3">
//                               <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
//                                 <FiHome className="text-green-500 text-sm sm:text-base lg:text-lg" />
//                               </div>
//                               <div>
//                                 <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
//                                   <p className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg">{userAddress.fullName}</p>
//                                 </div>
//                                 <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
//                                   <FiPhone className="text-xs sm:text-sm" />
//                                   <span className="font-medium text-xs sm:text-sm lg:text-base">{userAddress.phone}</span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="space-y-1.5 sm:space-y-2 lg:pl-14 sm:pl-16">
//                               <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
//                                 <span className="font-medium">Address: </span>
//                                 {userAddress.line1}
//                               </p>
//                               {userAddress.line2 && (
//                                 <p className="text-gray-700 text-xs sm:text-sm lg:text-base">{userAddress.line2}</p>
//                               )}
//                               <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
//                                 <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
//                                   <span className="font-medium">City: </span>
//                                   {userAddress.city}
//                                 </p>
//                                 <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
//                                   <span className="font-medium">State: </span>
//                                   {userAddress.state ?? "TamilNadu"}
//                                 </p>
//                                 <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
//                                   <span className="font-medium">Pincode: </span>
//                                   {userAddress.pincode}
//                                 </p>
//                                 {userAddress.landmark && (
//                                   <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
//                                     <span className="font-medium">Landmark: </span>
//                                     {userAddress.landmark}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-center py-4 sm:py-6 lg:py-8">
//                           <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                             <FiMapPin className="text-gray-400 text-xl sm:text-2xl lg:text-3xl" />
//                           </div>
//                           <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">No address saved yet</p>
//                           <button
//                             onClick={() => navigate("/profile/addresses")}
//                             className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
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
//                       <div className="text-center py-6 sm:py-8 lg:py-12">
//                         <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-orange-500 mb-3 sm:mb-4"></div>
//                         <p className="text-gray-600 text-sm sm:text-base">Loading your orders...</p>
//                       </div>
//                     ) : paginatedOrders.length === 0 ? (
//                       <div className="text-center py-6 sm:py-8 lg:py-12">
//                         <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
//                           <FiPackage className="text-gray-400 text-xl sm:text-2xl lg:text-4xl" />
//                         </div>
//                         <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">No orders found</p>
//                         <button
//                           onClick={() => navigate("/products")}
//                           className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
//                         >
//                           Start Shopping
//                         </button>
//                       </div>
//                     ) : (
//                       <div>
//                         {/* Orders Info - Mobile Optimized */}
//                         <div className="mb-3 sm:mb-4 lg:mb-6 p-2.5 sm:p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl">
//                           <div className="flex flex-col">
//                             <div className="flex justify-between items-center">
//                               <div>
//                                 <p className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">
//                                   Page {currentPage} of {totalPages}
//                                 </p>
//                                 <p className="text-xs text-gray-600 mt-0.5 sm:mt-1">
//                                   Showing {Math.min(ordersPerPage, paginatedOrders.length)} of {orders.length} orders
//                                 </p>
//                               </div>
//                               <div className="text-xs text-gray-600 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
//                                 {orders.length} total orders
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Orders List - 1 per page on mobile */}
//                         <div className="space-y-3 sm:space-y-4 lg:space-y-6">
//                           {paginatedOrders.map((order) => {
//                             const status = getOrderStatus(order.status);
//                             const StatusIcon = status.icon;
//                             return (
//                               <div
//                                 key={order._id}
//                                 className="border border-gray-200 rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 bg-white"
//                               >
//                                 {/* Order Header - Mobile Optimized */}
//                                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 sm:mb-4 lg:mb-6 pb-3 sm:pb-4 lg:pb-6 border-b border-gray-100">
//                                   <div className="space-y-1.5 sm:space-y-2">
//                                     <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
//                                       <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
//                                         Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
//                                       </span>
//                                       <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold ${status.bg} ${status.color} w-fit flex items-center gap-1`}>
//                                         <StatusIcon className="text-xs" />
//                                         {status.label}
//                                       </span>
//                                     </div>
//                                     <div className="flex flex-col gap-0.5 sm:gap-1 text-xs text-gray-600">
//                                       <span>Placed on {formatDate(order.createdAt)}</span>
//                                       <div className="flex items-center gap-1.5 sm:gap-2">
//                                         <span>Order Total: ₹{order.totalAmount}</span>
//                                         <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
//                                         <span>{order.items.length} item(s)</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="mt-2.5 sm:mt-3 lg:mt-0 flex items-center justify-between lg:block">
//                                     <div className="lg:mb-2">
//                                       <p className="text-xs text-gray-600 font-medium">Total Amount</p>
//                                       <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">₹{order.totalAmount}</p>
//                                     </div>
//                                     <button
//                                       onClick={() => setSelectedOrder(order)}
//                                       className="lg:mt-3 px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
//                                     >
//                                       <FiTruck className="text-sm sm:text-base lg:text-lg" />
//                                       <span className="hidden sm:inline">Track Order</span>
//                                       <span className="sm:hidden">Track</span>
//                                     </button>
//                                   </div>
//                                 </div>

//                                 {/* Order Items - Collapsible on mobile */}
//                                 <div className="space-y-2 sm:space-y-3 lg:space-y-4">
//                                   {order.items.slice(0, expandedOrderId === order._id ? order.items.length : 2).map((item, i) => (
//                                     <div
//                                       key={i}
//                                       className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300"
//                                     >
//                                       <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded sm:rounded-lg flex items-center justify-center">
//                                         <FiPackage className="text-orange-500 text-base sm:text-xl lg:text-2xl" />
//                                       </div>
//                                       <div className="flex-1">
//                                         <p className="font-medium text-gray-800 line-clamp-1 text-xs sm:text-sm lg:text-base">
//                                           {item.productId?.name || "Product"}
//                                         </p>
//                                         <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1 lg:gap-4 mt-0.5 sm:mt-1 lg:mt-2">
//                                           <span className="text-xs text-gray-600">
//                                             Qty: {item.quantity}
//                                           </span>
//                                           <span className="text-xs text-gray-600">
//                                             Price: ₹{item.price}
//                                           </span>
//                                           <span className="text-xs sm:text-sm font-medium text-gray-800">
//                                             Subtotal: ₹{item.quantity * item.price}
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   ))}
//                                   {order.items.length > 2 && (
//                                     <button
//                                       onClick={() => toggleOrderExpand(order._id)}
//                                       className="w-full text-center text-gray-600 text-xs sm:text-sm flex items-center justify-center gap-1 hover:text-blue-600 transition-colors duration-300"
//                                     >
//                                       {expandedOrderId === order._id ? (
//                                         <>
//                                           <FiChevronUp className="text-sm" />
//                                           Show Less
//                                         </>
//                                       ) : (
//                                         <>
//                                           <FiChevronDown className="text-sm" />
//                                           + {order.items.length - 2} more item(s)
//                                         </>
//                                       )}
//                                     </button>
//                                   )}
//                                 </div>
//                               </div>
//                             );
//                           })}
//                         </div>

//                         {/* Enhanced Pagination - Mobile Optimized */}
//                         {totalPages > 1 && (
//                           <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200">
//                             {/* Pagination Info */}
//                             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 lg:mb-4">
//                               <div className="text-xs text-gray-600 mb-0.5 sm:mb-0">
//                                 Page {currentPage} of {totalPages}
//                               </div>
//                               <div className="text-xs text-gray-600">
//                                 Order {Math.min((currentPage - 1) * ordersPerPage + 1, orders.length)} of {orders.length}
//                               </div>
//                             </div>

//                             {/* Pagination Controls - Mobile Optimized */}
//                             <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 lg:gap-4">
//                               {/* Previous Button */}
//                               <button
//                                 disabled={currentPage === 1}
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-xs sm:text-sm lg:text-base"
//                               >
//                                 <FiChevronLeft className="text-sm sm:text-base lg:text-lg" />
//                                 Previous
//                               </button>

//                               {/* Page Numbers - Mobile Optimized */}
//                               <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 overflow-x-auto py-1 sm:py-2">
//                                 {getPageNumbers().map((page, index) => (
//                                   page === '...' ? (
//                                     <span key={`ellipsis-${index}`} className="text-gray-400 px-0.5 sm:px-1 lg:px-2 text-xs sm:text-sm">
//                                       ...
//                                     </span>
//                                   ) : (
//                                     <button
//                                       key={page}
//                                       onClick={() => handlePageChange(page)}
//                                       className={`min-w-6 h-6 sm:min-w-8 sm:h-8 lg:min-w-10 lg:h-10 rounded sm:rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base px-1.5 sm:px-2 ${
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
//                                 className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-xs sm:text-sm lg:text-base"
//                               >
//                                 Next
//                                 <FiChevronRight className="text-sm sm:text-base lg:text-lg" />
//                               </button>
//                             </div>

//                             {/* Quick Navigation - Mobile Optimized */}
//                             <div className="mt-2 sm:mt-3 lg:mt-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 lg:gap-4">
//                               <span className="text-xs text-gray-600">Go to page:</span>
//                               <div className="flex items-center gap-1.5">
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
//                                   className="w-10 sm:w-12 lg:w-16 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-2 border border-gray-300 rounded text-center text-xs sm:text-sm lg:text-base"
//                                 />
//                                 <span className="text-xs text-gray-600">of {totalPages}</span>
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

//   {/* TRACK ORDER MODAL WITH DYNAMIC STATUS */}
// {selectedOrder && (
//   <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 animate-fade-in">
//     <div 
//       ref={modalRef}
//       className="bg-white w-full max-w-2xl h-screen overflow-y-auto"
//     >
//       {/* Modal Header - Fixed at top */}
//       <div className="sticky top-0 bg-white z-20 p-4 border-b border-gray-100 shadow-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-bold text-gray-800 truncate">
//               Order #{selectedOrder.orderNumber || selectedOrder._id.slice(-8).toUpperCase()}
//             </h3>
//             <p className="text-gray-600 mt-1 text-sm">
//               Placed on {formatDate(selectedOrder.createdAt)}
//             </p>
//           </div>
//           <button
//             onClick={() => setSelectedOrder(null)}
//             className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
//           >
//             <FiX className="text-gray-600 text-lg" />
//           </button>
//         </div>
//       </div>

//       {/* Modal Content */}
//       <div className="p-4">
//         {/* Current Status Card - DYNAMIC */}
//         {(() => {
//           const statusConfig = getOrderStatus(selectedOrder.status);
//           const StatusIcon = statusConfig.icon;
          
//           return (
//             <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <span className="text-base font-semibold text-gray-800">Current Status</span>
//                   <p className="text-gray-600 text-sm mt-1">
//                     {getStatusDescription(selectedOrder.status)}
//                   </p>
//                 </div>
//                 <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${statusConfig.bg} ${statusConfig.color} flex items-center gap-2`}>
//                   <StatusIcon className="text-base" />
//                   {statusConfig.label}
//                 </span>
//               </div>
//             </div>
//           );
//         })()}

//      {/* DYNAMIC Animated Vertical Timeline */}
// <div className="mb-6">
//   <h4 className="text-base font-semibold text-gray-800 mb-4">Order Tracking</h4>
  
//   <div className="relative">
//     {/* Vertical Line */}
//     <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200">
//       {/* Animated Progress Line - DYNAMIC based on status */}
//       <div 
//         className="absolute top-0 left-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transition-all duration-1000 ease-out"
//         style={{ height: `${calculateProgressHeight(selectedOrder.status)}%` }}
//       >
//         {/* Pulse Animation */}
//         <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-green-400 animate-pulse"></div>
//       </div>
//     </div>

//     {/* Timeline Steps - DYNAMIC with different colors */}
//     <div className="space-y-6 ml-8">
//       {getOrderSteps(selectedOrder.status).map((step, index) => {
//         const StepIcon = step.icon;
//         const isCurrentStep = step.active;
//         const isCompleted = step.completed;
//         const isUpcoming = !isCompleted && !isCurrentStep;
        
//         // Define color for each step type
//         const stepColors = {
//           CREATED: {
//             bg: 'from-blue-500 to-blue-600',
//             border: 'border-blue-500',
//             ring: 'ring-blue-100',
//             bgLight: 'bg-blue-50',
//             text: 'text-blue-600'
//           },
//           CONFIRMED: {
//             bg: 'from-purple-500 to-purple-600',
//             border: 'border-purple-500',
//             ring: 'ring-purple-100',
//             bgLight: 'bg-purple-50',
//             text: 'text-purple-600'
//           },
//           PROCESSING: {
//             bg: 'from-yellow-500 to-yellow-600',
//             border: 'border-yellow-500',
//             ring: 'ring-yellow-100',
//             bgLight: 'bg-yellow-50',
//             text: 'text-yellow-600'
//           },
//           SHIPPED: {
//             bg: 'from-orange-500 to-orange-600',
//             border: 'border-orange-500',
//             ring: 'ring-orange-100',
//             bgLight: 'bg-orange-50',
//             text: 'text-orange-600'
//           },
//           OUT_FOR_DELIVERY: {
//             bg: 'from-pink-500 to-pink-600',
//             border: 'border-pink-500',
//             ring: 'ring-pink-100',
//             bgLight: 'bg-pink-50',
//             text: 'text-pink-600'
//           },
//           DELIVERED: {
//             bg: 'from-green-500 to-green-600',
//             border: 'border-green-500',
//             ring: 'ring-green-100',
//             bgLight: 'bg-green-50',
//             text: 'text-green-600'
//           }
//         };
        
//         const colors = stepColors[step.key] || stepColors.CREATED;
        
//         return (
//           <div key={step.key} className="relative group">
//             <div className={`absolute -left-10 top-1/2 transform -translate-y-1/2 ${
//               isCompleted ? 'animate-pulse' : ''
//             }`}>
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ${colors.ring} ${
//                 isCompleted 
//                   ? `bg-gradient-to-r ${colors.bg}` 
//                   : isCurrentStep
//                   ? `bg-gradient-to-r ${colors.bg}`
//                   : 'bg-gray-300 ring-gray-100'
//               }`}>
//                 <StepIcon className="text-xs" />
//               </div>
//               {/* Animated Ring for current step */}
//               {isCurrentStep && (
//                 <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-green-400 animate-ping opacity-75"></div>
//               )}
//             </div>
            
//             <div className={`p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow duration-300 ${
//               isCompleted
//                 ? `${colors.bgLight} ${colors.border}`
//                 : isCurrentStep
//                 ? `${colors.bgLight} ${colors.border}`
//                 : 'bg-white border-gray-300'
//             }`}>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h5 className={`font-semibold text-sm ${
//                       isCompleted || isCurrentStep ? colors.text : 'text-gray-800'
//                     }`}>
//                       {step.label}
//                     </h5>
//                     {isCurrentStep && (
//                       <span className={`px-2 py-0.5 ${colors.text} bg-white text-xs rounded-full animate-pulse border ${colors.border}`}>
//                         CURRENT
//                       </span>
//                     )}
//                     {step.key === 'DELIVERED' && isCompleted && (
//                       <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full animate-pulse">
//                         DELIVERED
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-600 text-xs mt-1">
//                     {step.description}
//                   </p>
//                 </div>
//               </div>
              
//               {/* Success Message for delivered orders */}
//               {step.key === 'DELIVERED' && isCompleted && (
//                 <div className="mt-3 p-2 bg-green-100 rounded-lg">
//                   <p className="text-green-700 text-xs font-medium flex items-center gap-1">
//                     <FiCheckCircle className="text-green-600" />
//                     Your order has been successfully delivered to your address
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// </div>

//         {/* Payment & Delivery Details */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           <div className="bg-gray-50 rounded-xl p-4">
//             <h4 className="text-base font-semibold text-gray-800 mb-3">Payment Details</h4>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Method</span>
//                 <span className="font-medium text-sm">
//                   {selectedOrder.paymentMethod || "Credit/Debit Card"}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Status</span>
//                 <span className={`font-medium text-sm ${
//                   selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
//                 }`}>
//                   {selectedOrder.paymentStatus?.toUpperCase() || 'PAID'}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Amount</span>
//                 <span className="font-medium text-sm">₹{selectedOrder.totalAmount}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-50 rounded-xl p-4">
//             <h4 className="text-base font-semibold text-gray-800 mb-3">Delivery Details</h4>
//             <div className="space-y-3">
//               <div className="flex justify-between items-start">
//                 <span className="text-gray-600 text-sm">Address</span>
//                 <span className="font-medium text-sm text-right">
//                   {userAddress ? (
//                     <>
//                       {userAddress.line1}<br />
//                       {userAddress.city}, {userAddress.pincode}
//                     </>
//                   ) : 'Address not specified'}
//                 </span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Contact</span>
//                 <span className="font-medium text-sm">{user.mobile || userAddress?.phone || 'Not provided'}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm">Delivery Time</span>
//                 <span className="font-medium text-sm">
//                   {getDeliveryEstimate(selectedOrder.status)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Order Items Summary */}
//         <div className="mb-6">
//           <h4 className="text-base font-semibold text-gray-800 mb-4">Order Summary</h4>
//           <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
//             {selectedOrder.items.map((item, index) => (
//               <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-gray-800 text-sm truncate">
//                     {item.productId?.name || "Product"}
//                   </p>
//                   <p className="text-gray-600 text-xs mt-1">
//                     Qty: {item.quantity} × ₹{item.price}
//                   </p>
//                 </div>
//                 <p className="font-bold text-gray-800 text-sm ml-3 whitespace-nowrap">
//                   ₹{item.quantity * item.price}
//                 </p>
//               </div>
//             ))}
            
//             <div className="pt-4 border-t border-gray-200">
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 text-sm">Subtotal</span>
//                   <span className="font-medium text-sm">₹{selectedOrder.totalAmount}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 text-sm">Tax</span>
//                   <span className="font-medium text-sm">₹0</span>
//                 </div>
//                 <div className="pt-2 border-t border-gray-300">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-gray-800 text-base">Total Amount</span>
//                     <span className="text-xl font-bold text-gray-800">₹{selectedOrder.totalAmount}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Close Button */}
//         <div className="flex gap-3">
//           <button
//             onClick={() => setSelectedOrder(null)}
//             className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default Profile;












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
  FiX,
  FiCheckCircle,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiPhone as FiPhoneIcon,
  FiExternalLink
} from "react-icons/fi";
import { MdCheckCircle, MdRadioButtonUnchecked, MdLocalShipping, MdShoppingBag } from "react-icons/md";
import { FaBoxOpen, FaShippingFast, FaBus } from "react-icons/fa";
import { logout } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

// Dynamic orders per page based on screen size
const getOrdersPerPage = () => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }
  return 2;
};

// Shipping method configuration
const shippingMethodConfig = {
  TRANSPORT: {
    label: "Bus Transport",
    icon: FaBus,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-200",
    description: "Your order will be delivered via bus transport"
  },
  COURIER: {
    label: "Courier Service",
    icon: FiTruck,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-200",
    description: "Your order will be delivered via courier service"
  },
  PICKUP: {
    label: "Store Pickup",
    icon: FiHome,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-200",
    description: "Ready for pickup at our store"
  }
};

// Shipping status configuration
const shippingStatusConfig = {
  PENDING: {
    label: "Pending Assignment",
    color: "text-gray-600",
    bgColor: "bg-gray-100",
    icon: FiClock,
    description: "Awaiting shipping assignment"
  },
  ASSIGNED: {
    label: "Assigned",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    icon: FiPackage,
    description: "Shipping assigned, preparing for dispatch"
  },
  DISPATCHED: {
    label: "Dispatched",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    icon: FiTruck,
    description: "Order has been dispatched"
  },
  IN_TRANSIT: {
    label: "In Transit",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    icon: FiTruck,
    description: "Order is in transit to your location"
  },
  DELIVERED: {
    label: "Delivered",
    color: "text-green-600",
    bgColor: "bg-green-100",
    icon: FiCheckCircle,
    description: "Order has been delivered successfully"
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ordersPerPage, setOrdersPerPage] = useState(getOrdersPerPage());
  const [expandedOrderId, setExpandedOrderId] = useState(null);
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
  const modalRef = useRef(null);
  
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

  // Close modal on outside click and handle body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedOrder(null);
      }
    };

    if (selectedOrder) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [selectedOrder]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/my-orders");
      
      const sortedOrders = Array.isArray(res?.data?.data) 
        ? res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];
      
      setOrders(sortedOrders);
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

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const getOrderStatus = (status) => {
    const statusConfig = {
      CREATED: { label: "Order Placed", color: "text-blue-600", bg: "bg-blue-100", icon: MdShoppingBag },
      CONFIRMED: { label: "Confirmed", color: "text-purple-600", bg: "bg-purple-100", icon: MdCheckCircle },
      PROCESSING: { label: "Processing", color: "text-yellow-600", bg: "bg-yellow-100", icon: FiPackage },
      SHIPPED: { label: "Shipped", color: "text-orange-600", bg: "bg-orange-100", icon: MdLocalShipping },
      OUT_FOR_DELIVERY: { label: "Out for Delivery", color: "text-pink-600", bg: "bg-pink-100", icon: FaShippingFast },
      DELIVERED: { label: "Delivered", color: "text-green-600", bg: "bg-green-100", icon: FiCheckCircle },
      CANCELLED: { label: "Cancelled", color: "text-red-600", bg: "bg-red-100", icon: FiX },
    };
    return statusConfig[status] || { label: status, color: "text-gray-600", bg: "bg-gray-100", icon: FiPackage };
  };

  const getOrderSteps = (status) => {
    const steps = [
      { 
        key: "CREATED", 
        label: "Order Placed", 
        description: "Your order has been placed successfully",
        icon: MdShoppingBag,
        color: "from-blue-400 to-blue-500",
        bgColor: "bg-blue-100",
        textColor: "text-blue-600"
      },
      { 
        key: "CONFIRMED", 
        label: "Order Confirmed", 
        description: "We've received your order and confirmed it",
        icon: MdCheckCircle,
        color: "from-purple-400 to-purple-500",
        bgColor: "bg-purple-100",
        textColor: "text-purple-600"
      },
      { 
        key: "PROCESSING", 
        label: "Processing", 
        description: "Your order is being prepared for shipment",
        icon: FiPackage,
        color: "from-yellow-400 to-yellow-500",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600"
      },
      { 
        key: "SHIPPED", 
        label: "Shipped", 
        description: "Your order has been dispatched",
        icon: MdLocalShipping,
        color: "from-orange-400 to-orange-500",
        bgColor: "bg-orange-100",
        textColor: "text-orange-600"
      },
      { 
        key: "OUT_FOR_DELIVERY", 
        label: "Out for Delivery", 
        description: "Your order is on its way to you",
        icon: FaShippingFast,
        color: "from-pink-400 to-pink-500",
        bgColor: "bg-pink-100",
        textColor: "text-pink-600"
      },
      { 
        key: "DELIVERED", 
        label: "Delivered", 
        description: "Your order has been delivered",
        icon: FiCheckCircle,
        color: "from-green-400 to-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-600"
      },
    ];
    
    const currentIndex = steps.findIndex(step => step.key === status);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
      upcoming: index > currentIndex,
    }));
  };

  // Helper function to get shipping details
  const getShippingDetails = (order) => {
    const shipping = order.shipping || {};
    const method = shipping.method || "COURIER";
    const methodConfig = shippingMethodConfig[method] || shippingMethodConfig.COURIER;
    
    // Get shipping metadata based on method
    const meta = method === "TRANSPORT" ? shipping.bus : shipping.courier;
    const status = meta?.status || "PENDING";
    const statusConfig = shippingStatusConfig[status] || shippingStatusConfig.PENDING;
    
    return {
      method,
      methodConfig,
      meta,
      status,
      statusConfig,
      charge: shipping.charge || 0,
      totalWeight: shipping.totalWeight || 0
    };
  };

  // Helper function to format shipping details for display
  const formatShippingInfo = (shippingDetails) => {
    const { method, methodConfig, meta, statusConfig } = shippingDetails;
    
    const info = {
      method: {
        label: methodConfig.label,
        icon: methodConfig.icon,
        color: methodConfig.color,
        bgColor: methodConfig.bgColor,
        description: methodConfig.description
      },
      status: {
        label: statusConfig.label,
        icon: statusConfig.icon,
        color: statusConfig.color,
        bgColor: statusConfig.bgColor,
        description: statusConfig.description
      }
    };
    
    // Add method-specific details
    if (method === "TRANSPORT" && meta) {
      info.details = {
        busNumber: meta.busNumber,
        driverName: meta.driverName,
        driverPhone: meta.driverPhone,
        route: meta.route,
        assignedAt: meta.assignedAt
      };
    } else if (method === "COURIER" && meta) {
      info.details = {
        company: meta.company,
        trackingNumber: meta.trackingNumber,
        trackingUrl: meta.trackingUrl,
        expectedDeliveryDate: meta.expectedDeliveryDate
      };
    }
    
    return info;
  };

  const getStatusDescription = (status) => {
    const descriptions = {
      CREATED: "Your order has been placed successfully",
      CONFIRMED: "We've received your order and confirmed it",
      PROCESSING: "Your order is being prepared for shipment",
      SHIPPED: "Your order has been dispatched from our warehouse",
      OUT_FOR_DELIVERY: "Your order is on its way to your location",
      DELIVERED: "Your order has been successfully delivered",
      CANCELLED: "Your order has been cancelled",
    };
    return descriptions[status] || "Your order is being processed";
  };

  const calculateProgressHeight = (status) => {
    const steps = ['CREATED', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIndex = steps.indexOf(status);
    
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const getEstimatedTime = (createdAt, stepIndex) => {
    const date = new Date(createdAt);
    // Add hours based on step index
    date.setHours(date.getHours() + (stepIndex * 2));
    
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeliveryEstimate = (status) => {
    const estimates = {
      CREATED: "Within 3-5 business days",
      CONFIRMED: "Within 3-5 business days",
      PROCESSING: "Within 2-4 business days",
      SHIPPED: "Within 1-2 business days",
      OUT_FOR_DELIVERY: "Today or tomorrow",
      DELIVERED: "Delivered successfully",
    };
    return estimates[status] || "Will be updated soon";
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

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header - Simplified without "My Account" text */}
      <div className="lg:hidden sticky top-0 z-40 bg-white shadow-sm">
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            
            {/* Tab title based on active tab */}
            <h1 className="text-lg font-bold text-gray-800">
              {activeTab === "profile" ? "Profile" : "My Orders"}
            </h1>
            
            {/* User avatar/placeholder */}
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {user.name?.[0]?.toUpperCase()}
            </div>
          </div>

          {/* Mobile Tab Switcher - Only tabs, no extra text */}
          <div className="mt-3 bg-white rounded-lg shadow-xs border border-gray-100">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-2.5 text-center font-medium transition-all duration-300 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <FiUser className="text-base" />
                  <span className="text-xs sm:text-sm">Profile</span>
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab("orders");
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-2.5 text-center font-medium transition-all duration-300 ${
                  activeTab === "orders"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <FiBox className="text-base" />
                  <span className="text-xs sm:text-sm">Orders</span>
                  {orders.length > 0 && (
                    <span className="bg-white text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
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

      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
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

          {/* CONTENT AREA */}
          <section className="lg:col-span-3" ref={contentRef}>
            {/* Content Card */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden min-h-[400px]">
              <div className="p-3 sm:p-4 lg:p-6">
                {/* PROFILE & ADDRESS */}
                {activeTab === "profile" && (
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    {/* Personal Info */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6 flex items-center gap-1.5 sm:gap-2">
                        <FiUser className="text-blue-500 text-sm sm:text-base lg:text-lg" />
                        Personal Information
                      </h3>
                      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2 lg:gap-6">
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Full Name</label>
                          <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
                            {user.name}
                          </div>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Email Address</label>
                          <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
                            {user.email}
                          </div>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Phone Number</label>
                          <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
                            {user.mobile || "Not provided"}
                          </div>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-600">Location</label>
                          <div className="p-2.5 sm:p-3 lg:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200 font-medium text-sm sm:text-base">
                            {user.location || "Not specified"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6">
                      <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-1.5 sm:gap-2">
                          <FiMapPin className="text-green-500 text-sm sm:text-base lg:text-lg" />
                          Delivery Address
                        </h3>
                      </div>

                      {userAddress ? (
                        <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-200 shadow-sm">
                          <div className="flex flex-col gap-3 sm:gap-4">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                                <FiHome className="text-green-500 text-sm sm:text-base lg:text-lg" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                                  <p className="font-bold text-gray-800 text-sm sm:text-base lg:text-lg">{userAddress.fullName}</p>
                                </div>
                                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
                                  <FiPhone className="text-xs sm:text-sm" />
                                  <span className="font-medium text-xs sm:text-sm lg:text-base">{userAddress.phone}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1.5 sm:space-y-2 lg:pl-14 sm:pl-16">
                              <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                <span className="font-medium">Address: </span>
                                {userAddress.line1}
                              </p>
                              {userAddress.line2 && (
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base">{userAddress.line2}</p>
                              )}
                              <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                  <span className="font-medium">City: </span>
                                  {userAddress.city}
                                </p>
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                  <span className="font-medium">State: </span>
                                  {userAddress.state ?? "TamilNadu"}
                                </p>
                                <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                  <span className="font-medium">Pincode: </span>
                                  {userAddress.pincode}
                                </p>
                                {userAddress.landmark && (
                                  <p className="text-gray-700 text-xs sm:text-sm lg:text-base">
                                    <span className="font-medium">Landmark: </span>
                                    {userAddress.landmark}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4 sm:py-6 lg:py-8">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <FiMapPin className="text-gray-400 text-xl sm:text-2xl lg:text-3xl" />
                          </div>
                          <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">No address saved yet</p>
                          <button
                            onClick={() => navigate("/profile/addresses")}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
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
                      <div className="text-center py-6 sm:py-8 lg:py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-orange-500 mb-3 sm:mb-4"></div>
                        <p className="text-gray-600 text-sm sm:text-base">Loading your orders...</p>
                      </div>
                    ) : paginatedOrders.length === 0 ? (
                      <div className="text-center py-6 sm:py-8 lg:py-12">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6">
                          <FiPackage className="text-gray-400 text-xl sm:text-2xl lg:text-4xl" />
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">No orders found</p>
                        <button
                          onClick={() => navigate("/products")}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* Orders Info - Mobile Optimized */}
                        <div className="mb-3 sm:mb-4 lg:mb-6 p-2.5 sm:p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl">
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">
                                  Page {currentPage} of {totalPages}
                                </p>
                                <p className="text-xs text-gray-600 mt-0.5 sm:mt-1">
                                  Showing {Math.min(ordersPerPage, paginatedOrders.length)} of {orders.length} orders
                                </p>
                              </div>
                              <div className="text-xs text-gray-600 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                                {orders.length} total orders
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Orders List - 1 per page on mobile */}
                        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                          {paginatedOrders.map((order) => {
                            const status = getOrderStatus(order.status);
                            const StatusIcon = status.icon;
                            const shippingDetails = getShippingDetails(order);
                            const shippingInfo = formatShippingInfo(shippingDetails);
                            const ShippingIcon = shippingInfo.method.icon;
                            
                            return (
                              <div
                                key={order._id}
                                className="border border-gray-200 rounded-lg sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:shadow-lg sm:hover:shadow-xl transition-all duration-500 bg-white"
                              >
                                {/* Order Header - Mobile Optimized */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 sm:mb-4 lg:mb-6 pb-3 sm:pb-4 lg:pb-6 border-b border-gray-100">
                                  <div className="space-y-1.5 sm:space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                                      <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
                                        Order #{order.orderNumber || order._id.slice(-8).toUpperCase()}
                                      </span>
                                      <div className="flex flex-wrap gap-1.5">
                                        <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold ${status.bg} ${status.color} w-fit flex items-center gap-1`}>
                                          <StatusIcon className="text-xs" />
                                          {status.label}
                                        </span>
                                        
                                        {/* Shipping Method Badge */}
                                        {shippingDetails.method && (
                                          <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold w-fit flex items-center gap-1 ${
                                            shippingDetails.method === "TRANSPORT" 
                                              ? "bg-blue-100 text-blue-600" 
                                              : shippingDetails.method === "COURIER"
                                              ? "bg-orange-100 text-orange-600"
                                              : "bg-purple-100 text-purple-600"
                                          }`}>
                                            <ShippingIcon className="text-xs" />
                                            {shippingInfo.method.label}
                                          </span>
                                        )}
                                        
                                        {/* Shipping Status Badge */}
                                        {shippingDetails.meta?.status && (
                                          <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1 rounded-full text-xs font-bold w-fit flex items-center gap-1 ${
                                            shippingInfo.status.bgColor
                                          } ${shippingInfo.status.color}`}>
                                            <FiTruck className="text-xs" />
                                            {shippingInfo.status.label}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 sm:gap-1 text-xs text-gray-600">
                                      <span>Placed on {formatDate(order.createdAt)}</span>
                                      <div className="flex items-center gap-1.5 sm:gap-2">
                                        <span>Order Total: ₹{order.totalAmount}</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        <span>{order.items.length} item(s)</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        <span>Shipping: ₹{shippingDetails.charge === 0 ? 'FREE' : shippingDetails.charge}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-2.5 sm:mt-3 lg:mt-0 flex items-center justify-between lg:block">
                                    <div className="lg:mb-2">
                                      <p className="text-xs text-gray-600 font-medium">Total Amount</p>
                                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">₹{order.totalAmount}</p>
                                    </div>
                                    <button
                                      onClick={() => setSelectedOrder(order)}
                                      className="lg:mt-3 px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl font-medium flex items-center gap-1.5 sm:gap-2 hover:shadow-lg transition-all duration-300 text-xs sm:text-sm lg:text-base"
                                    >
                                      <FiTruck className="text-sm sm:text-base lg:text-lg" />
                                      <span className="hidden sm:inline">Track Order</span>
                                      <span className="sm:hidden">Track</span>
                                    </button>
                                  </div>
                                </div>

                                {/* Order Items - Collapsible on mobile */}
                                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                                  {order.items.slice(0, expandedOrderId === order._id ? order.items.length : 2).map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-300"
                                    >
                                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-50 to-yellow-50 rounded sm:rounded-lg flex items-center justify-center">
                                        <FiPackage className="text-orange-500 text-base sm:text-xl lg:text-2xl" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800 line-clamp-1 text-xs sm:text-sm lg:text-base">
                                          {item.productId?.name || "Product"}
                                        </p>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1 lg:gap-4 mt-0.5 sm:mt-1 lg:mt-2">
                                          <span className="text-xs text-gray-600">
                                            Qty: {item.quantity}
                                          </span>
                                          <span className="text-xs text-gray-600">
                                            Price: ₹{item.price}
                                          </span>
                                          <span className="text-xs sm:text-sm font-medium text-gray-800">
                                            Subtotal: ₹{item.quantity * item.price}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  {order.items.length > 2 && (
                                    <button
                                      onClick={() => toggleOrderExpand(order._id)}
                                      className="w-full text-center text-gray-600 text-xs sm:text-sm flex items-center justify-center gap-1 hover:text-blue-600 transition-colors duration-300"
                                    >
                                      {expandedOrderId === order._id ? (
                                        <>
                                          <FiChevronUp className="text-sm" />
                                          Show Less
                                        </>
                                      ) : (
                                        <>
                                          <FiChevronDown className="text-sm" />
                                          + {order.items.length - 2} more item(s)
                                        </>
                                      )}
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Enhanced Pagination - Mobile Optimized */}
                        {totalPages > 1 && (
                          <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-200">
                            {/* Pagination Info */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                              <div className="text-xs text-gray-600 mb-0.5 sm:mb-0">
                                Page {currentPage} of {totalPages}
                              </div>
                              <div className="text-xs text-gray-600">
                                Order {Math.min((currentPage - 1) * ordersPerPage + 1, orders.length)} of {orders.length}
                              </div>
                            </div>

                            {/* Pagination Controls - Mobile Optimized */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 lg:gap-4">
                              {/* Previous Button */}
                              <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-xs sm:text-sm lg:text-base"
                              >
                                <FiChevronLeft className="text-sm sm:text-base lg:text-lg" />
                                Previous
                              </button>

                              {/* Page Numbers - Mobile Optimized */}
                              <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 overflow-x-auto py-1 sm:py-2">
                                {getPageNumbers().map((page, index) => (
                                  page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="text-gray-400 px-0.5 sm:px-1 lg:px-2 text-xs sm:text-sm">
                                      ...
                                    </span>
                                  ) : (
                                    <button
                                      key={page}
                                      onClick={() => handlePageChange(page)}
                                      className={`min-w-6 h-6 sm:min-w-8 sm:h-8 lg:min-w-10 lg:h-10 rounded sm:rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base px-1.5 sm:px-2 ${
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
                                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-xs sm:text-sm lg:text-base"
                              >
                                Next
                                <FiChevronRight className="text-sm sm:text-base lg:text-lg" />
                              </button>
                            </div>

                            {/* Quick Navigation - Mobile Optimized */}
                            <div className="mt-2 sm:mt-3 lg:mt-4 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 lg:gap-4">
                              <span className="text-xs text-gray-600">Go to page:</span>
                              <div className="flex items-center gap-1.5">
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
                                  className="w-10 sm:w-12 lg:w-16 px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 lg:py-2 border border-gray-300 rounded text-center text-xs sm:text-sm lg:text-base"
                                />
                                <span className="text-xs text-gray-600">of {totalPages}</span>
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

      {/* TRACK ORDER MODAL WITH DYNAMIC STATUS & SHIPPING DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 animate-fade-in">
          <div 
            ref={modalRef}
            className="bg-white w-full max-w-2xl h-screen overflow-y-auto"
          >
            {/* Modal Header - Fixed at top */}
            <div className="sticky top-0 bg-white z-20 p-4 border-b border-gray-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-800 truncate">
                    Order #{selectedOrder.orderNumber || selectedOrder._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm">
                    Placed on {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                >
                  <FiX className="text-gray-600 text-lg" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Current Status Card - DYNAMIC */}
              {(() => {
                const statusConfig = getOrderStatus(selectedOrder.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base font-semibold text-gray-800">Current Status</span>
                        <p className="text-gray-600 text-sm mt-1">
                          {getStatusDescription(selectedOrder.status)}
                        </p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${statusConfig.bg} ${statusConfig.color} flex items-center gap-2`}>
                        <StatusIcon className="text-base" />
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Shipping & Payment Details - Updated */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Shipping Method Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaShippingFast className="text-blue-500" />
                    Shipping Method
                  </h4>
                  {(() => {
                    const shippingDetails = getShippingDetails(selectedOrder);
                    const info = formatShippingInfo(shippingDetails);
                    const MethodIcon = info.method.icon;
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${info.method.bgColor}`}>
                            <MethodIcon className={`text-lg ${info.method.color}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {info.method.label}
                            </p>
                            <p className="text-gray-600 text-xs mt-0.5">
                              {info.method.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Shipping Charge */}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-gray-600 text-sm">Shipping Fee</span>
                          <span className="font-medium text-sm">
                            ₹{shippingDetails.charge === 0 ? 'FREE' : shippingDetails.charge}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Shipping Status Card */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FiTruck className="text-orange-500" />
                    Shipping Status
                  </h4>
                  {(() => {
                    const shippingDetails = getShippingDetails(selectedOrder);
                    const info = formatShippingInfo(shippingDetails);
                    const StatusIcon = info.status.icon;
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${info.status.bgColor}`}>
                            <StatusIcon className={`text-lg ${info.status.color}`} />
                          </div>
                          <div>
                            <span className={`font-medium text-sm ${info.status.color}`}>
                              {info.status.label}
                            </span>
                            <p className="text-gray-600 text-xs mt-0.5">
                              {info.status.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Last Updated */}
                        {shippingDetails.meta?.assignedAt && (
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-gray-600 text-xs">
                              Updated: {formatDateShort(shippingDetails.meta.assignedAt)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Payment Details Card */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">Payment Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Method</span>
                      <span className="font-medium text-sm">
                        {selectedOrder.paymentMethod || "Credit/Debit Card"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Status</span>
                      <span className={`font-medium text-sm ${
                        selectedOrder.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {selectedOrder.paymentStatus?.toUpperCase() || 'PAID'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Amount</span>
                      <span className="font-medium text-sm">₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details Card - Shows Transport/Courier Specific Info */}
              {(() => {
                const shippingDetails = getShippingDetails(selectedOrder);
                const info = formatShippingInfo(shippingDetails);
                
                if (info.details) {
                  return (
                    <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <h4 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        {shippingDetails.method === "TRANSPORT" ? (
                          <>
                            <FaShippingFast className="text-blue-500" />
                            Transport Details
                          </>
                        ) : (
                          <>
                            <FiTruck className="text-orange-500" />
                            Courier Details
                          </>
                        )}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Transport Details */}
                        {shippingDetails.method === "TRANSPORT" && info.details.busNumber && (
                          <>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FaShippingFast className="text-blue-500 text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Bus Number</p>
                                  <p className="font-medium text-gray-800">{info.details.busNumber}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FiUser className="text-blue-500 text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Driver Name</p>
                                  <p className="font-medium text-gray-800">{info.details.driverName}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FiPhoneIcon className="text-blue-500 text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Driver Contact</p>
                                  <p className="font-medium text-gray-800">{info.details.driverPhone}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FiMapPin className="text-blue-500 text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Route</p>
                                  <p className="font-medium text-gray-800">{info.details.route}</p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {/* Courier Details */}
                        {shippingDetails.method === "COURIER" && info.details.trackingNumber && (
                          <>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <FiTruck className="text-orange-500 text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Courier Company</p>
                                  <p className="font-medium text-gray-800">{info.details.company}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <FiPackage className="text-orange-500 text-sm" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-600">Tracking Number</p>
                                  <p className="font-medium text-gray-800 font-mono">
                                    {info.details.trackingNumber}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              {info.details.expectedDeliveryDate && (
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <FiClock className="text-orange-500 text-sm" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Expected Delivery</p>
                                    <p className="font-medium text-gray-800">
                                      {formatDateShort(info.details.expectedDeliveryDate)}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {info.details.trackingUrl && (
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <FiExternalLink className="text-orange-500 text-sm" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Tracking Link</p>
                                    <a 
                                      href={info.details.trackingUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="font-medium text-blue-600 hover:text-blue-800 text-sm underline"
                                    >
                                      Track Package
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* DYNAMIC Animated Vertical Timeline */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-4">Order Tracking</h4>
                
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200">
                    {/* Animated Progress Line - DYNAMIC based on status */}
                    <div 
                      className="absolute top-0 left-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transition-all duration-1000 ease-out"
                      style={{ height: `${calculateProgressHeight(selectedOrder.status)}%` }}
                    >
                      {/* Pulse Animation */}
                      <div className="absolute bottom-0 left-0 w-0.5 h-4 bg-green-400 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Timeline Steps - DYNAMIC with different colors */}
                  <div className="space-y-6 ml-8">
                    {getOrderSteps(selectedOrder.status).map((step, index) => {
                      const StepIcon = step.icon;
                      const isCurrentStep = step.active;
                      const isCompleted = step.completed;
                      const isUpcoming = !isCompleted && !isCurrentStep;
                      
                      // Define color for each step type
                      const stepColors = {
                        CREATED: {
                          bg: 'from-blue-500 to-blue-600',
                          border: 'border-blue-500',
                          ring: 'ring-blue-100',
                          bgLight: 'bg-blue-50',
                          text: 'text-blue-600'
                        },
                        CONFIRMED: {
                          bg: 'from-purple-500 to-purple-600',
                          border: 'border-purple-500',
                          ring: 'ring-purple-100',
                          bgLight: 'bg-purple-50',
                          text: 'text-purple-600'
                        },
                        PROCESSING: {
                          bg: 'from-yellow-500 to-yellow-600',
                          border: 'border-yellow-500',
                          ring: 'ring-yellow-100',
                          bgLight: 'bg-yellow-50',
                          text: 'text-yellow-600'
                        },
                        SHIPPED: {
                          bg: 'from-orange-500 to-orange-600',
                          border: 'border-orange-500',
                          ring: 'ring-orange-100',
                          bgLight: 'bg-orange-50',
                          text: 'text-orange-600'
                        },
                        OUT_FOR_DELIVERY: {
                          bg: 'from-pink-500 to-pink-600',
                          border: 'border-pink-500',
                          ring: 'ring-pink-100',
                          bgLight: 'bg-pink-50',
                          text: 'text-pink-600'
                        },
                        DELIVERED: {
                          bg: 'from-green-500 to-green-600',
                          border: 'border-green-500',
                          ring: 'ring-green-100',
                          bgLight: 'bg-green-50',
                          text: 'text-green-600'
                        }
                      };
                      
                      const colors = stepColors[step.key] || stepColors.CREATED;
                      
                      return (
                        <div key={step.key} className="relative group">
                          <div className={`absolute -left-10 top-1/2 transform -translate-y-1/2 ${
                            isCompleted ? 'animate-pulse' : ''
                          }`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ${colors.ring} ${
                              isCompleted 
                                ? `bg-gradient-to-r ${colors.bg}` 
                                : isCurrentStep
                                ? `bg-gradient-to-r ${colors.bg}`
                                : 'bg-gray-300 ring-gray-100'
                            }`}>
                              <StepIcon className="text-xs" />
                            </div>
                            {/* Animated Ring for current step */}
                            {isCurrentStep && (
                              <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-green-400 animate-ping opacity-75"></div>
                            )}
                          </div>
                          
                          <div className={`p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                            isCompleted
                              ? `${colors.bgLight} ${colors.border}`
                              : isCurrentStep
                              ? `${colors.bgLight} ${colors.border}`
                              : 'bg-white border-gray-300'
                          }`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className={`font-semibold text-sm ${
                                    isCompleted || isCurrentStep ? colors.text : 'text-gray-800'
                                  }`}>
                                    {step.label}
                                  </h5>
                                  {isCurrentStep && (
                                    <span className={`px-2 py-0.5 ${colors.text} bg-white text-xs rounded-full animate-pulse border ${colors.border}`}>
                                      CURRENT
                                    </span>
                                  )}
                                  {step.key === 'DELIVERED' && isCompleted && (
                                    <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full animate-pulse">
                                      DELIVERED
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-xs mt-1">
                                  {step.description}
                                </p>
                              </div>
                              {/* <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FiClock className="text-gray-400" />
                                <span>{getEstimatedTime(selectedOrder.createdAt, index)}</span>
                              </div> */}
                            </div>
                            
                            {/* Success Message for delivered orders */}
                            {step.key === 'DELIVERED' && isCompleted && (
                              <div className="mt-3 p-2 bg-green-100 rounded-lg">
                                <p className="text-green-700 text-xs font-medium flex items-center gap-1">
                                  <FiCheckCircle className="text-green-600" />
                                  Your order has been successfully delivered to your address
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="mb-6">
                <h4 className="text-base font-semibold text-gray-800 mb-4">Order Summary</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">
                          {item.productId?.name || "Product"}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-bold text-gray-800 text-sm ml-3 whitespace-nowrap">
                        ₹{item.quantity * item.price}
                      </p>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Subtotal</span>
                        <span className="font-medium text-sm">₹{selectedOrder.totalAmount}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Tax</span>
                        <span className="font-medium text-sm">₹0</span>
                      </div>
                      <div className="pt-2 border-t border-gray-300">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-800 text-base">Total Amount</span>
                          <span className="text-xl font-bold text-gray-800">₹{selectedOrder.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-300"
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