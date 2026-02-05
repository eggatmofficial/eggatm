// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaEye, FaSearch, FaFilter, FaSort, FaCalendar, 
//   FaSync, FaUser, FaBox, FaDollarSign, FaShippingFast,
//   FaCheckCircle, FaTimesCircle, FaClock, FaTruck
// } from "react-icons/fa";
// import { FiPackage } from "react-icons/fi";

// const statusConfig = {
//   CREATED: { 
//     label: "Created", 
//     color: "bg-gray-100 text-gray-800 border border-gray-300",
//     icon: <FaClock className="text-gray-500" />,
//     bgColor: "bg-gray-50",
//     textColor: "text-gray-700"
//   },
//   PAID: { 
//     label: "Paid", 
//     color: "bg-blue-50 text-blue-700 border border-blue-200",
//     icon: <FaDollarSign className="text-blue-500" />,
//     bgColor: "bg-blue-50",
//     textColor: "text-blue-700"
//   },
//   SHIPPED: { 
//     label: "Shipped", 
//     color: "bg-orange-50 text-orange-700 border border-orange-200",
//     icon: <FaTruck className="text-orange-500" />,
//     bgColor: "bg-orange-50",
//     textColor: "text-orange-700"
//   },
//   DELIVERED: { 
//     label: "Delivered", 
//     color: "bg-green-50 text-green-700 border border-green-300",
//     icon: <FaCheckCircle className="text-green-500" />,
//     bgColor: "bg-green-50",
//     textColor: "text-green-700"
//   },
//   CANCELLED: { 
//     label: "Cancelled", 
//     color: "bg-red-50 text-red-700 border border-red-200",
//     icon: <FaTimesCircle className="text-red-500" />,
//     bgColor: "bg-red-50",
//     textColor: "text-red-700"
//   },
// };

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [sortBy, setSortBy] = useState("newest");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orders/admin/all");
//       setOrders(res.data.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const userName = order.userId?.name?.toLowerCase() || "";
//     const userEmail = order.userId?.email?.toLowerCase() || "";
//     const orderId = order._id.toLowerCase();
    
//     const matchesSearch = 
//       orderId.includes(searchTerm.toLowerCase()) ||
//       userName.includes(searchTerm.toLowerCase()) ||
//       userEmail.includes(searchTerm.toLowerCase()) ||
//       order.items.some(item => 
//         item.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
    
//     const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   }).sort((a, b) => {
//     switch (sortBy) {
//       case "newest":
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       case "oldest":
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       case "amount-high":
//         return b.totalAmount - a.totalAmount;
//       case "amount-low":
//         return a.totalAmount - b.totalAmount;
//       default:
//         return 0;
//     }
//   });

//   const getStatusCount = (status) => {
//     return orders.filter(order => order.status === status).length;
//   };

//   const getTotalRevenue = () => {
//     return orders
//       .filter(order => order.status === "DELIVERED")
//       .reduce((sum, order) => sum + order.totalAmount, 0);
//   };

//   const getAverageOrderValue = () => {
//     const deliveredOrders = orders.filter(order => order.status === "DELIVERED");
//     if (deliveredOrders.length === 0) return 0;
//     return getTotalRevenue() / deliveredOrders.length;
//   };

//   const getUserInitials = (user) => {
//     if (!user?.name) return "UU";
//     const nameParts = user.name.split(" ");
//     if (nameParts.length >= 2) {
//       return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
//     }
//     return user.name.substring(0, 2).toUpperCase();
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
//               <FiPackage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-xl" />
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//               Order Management
//             </h1>
//             <p className="text-gray-600">
//               Track and manage all customer orders efficiently
//             </p>
//           </div>
          
//           <div className="flex items-center gap-3">
//             <button 
//               onClick={fetchOrders}
//               className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm"
//             >
//               <FaSync className="text-sm" />
//               <span className="font-medium">Refresh</span>
//             </button>
            
//             <div className="relative">
//               <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none min-w-[160px]"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="amount-high">Amount: High to Low</option>
//                 <option value="amount-low">Amount: Low to High</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Orders */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Orders</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
//               </div>
//               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                 <FiPackage className="text-blue-500 text-xl" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-500">Across all statuses</p>
//             </div>
//           </div>

//           {/* Total Revenue */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">₹{getTotalRevenue().toLocaleString()}</p>
//               </div>
//               <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
//                 <FaDollarSign className="text-green-500 text-xl" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-500">From delivered orders</p>
//             </div>
//           </div>

//           {/* Average Order Value */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">₹{Math.round(getAverageOrderValue()).toLocaleString()}</p>
//               </div>
//               <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
//                 <FaShippingFast className="text-purple-500 text-xl" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-500">Per delivered order</p>
//             </div>
//           </div>

//           {/* Pending Orders */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Pending</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">
//                   {getStatusCount("CREATED") + getStatusCount("PAID")}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
//                 <FaClock className="text-orange-500 text-xl" />
//               </div>
//             </div>
//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <p className="text-xs text-gray-500">Created + Paid orders</p>
//             </div>
//           </div>
//         </div>

//         {/* Status Filter Tabs */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           <button
//             onClick={() => setStatusFilter("ALL")}
//             className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
//               statusFilter === "ALL" 
//                 ? "bg-blue-500 text-white shadow-sm" 
//                 : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
//             }`}
//           >
//             All ({orders.length})
//           </button>
          
//           {Object.entries(statusConfig).map(([key, config]) => (
//             <button
//               key={key}
//               onClick={() => setStatusFilter(key)}
//               className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
//                 statusFilter === key
//                   ? `${config.bgColor} ${config.textColor} border border-gray-200 shadow-sm`
//                   : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               {config.icon}
//               {config.label} ({getStatusCount(key)})
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
//           <div className="relative">
//             <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search orders by ID, customer name, email, or product..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Orders Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredOrders.map((order) => {
//           const status = statusConfig[order.status];
//           const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
          
//           return (
//             <div 
//               key={order._id} 
//               className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//             >
//               {/* Order Header */}
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                         <FaUser className="text-gray-500 text-sm" />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           {order.userId?.name || "Unknown Customer"}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate max-w-[180px]">
//                           {order.userId?.email || "No email"}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-sm font-mono text-gray-600 mt-2">
//                       #{order._id.substring(0, 10)}...
//                     </p>
//                   </div>
                  
//                   <div className="flex flex-col items-end">
//                     <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${status.color}`}>
//                       {status.label}
//                     </span>
//                     <p className="text-xs text-gray-500 mt-2">
//                       {formatDate(order.createdAt)}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Content */}
//               <div className="p-6">
//                 {/* Product Preview */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="flex -space-x-2">
//                     {order.items.slice(0, 3).map((item, index) => (
//                       <div 
//                         key={index} 
//                         className="w-10 h-10 rounded-lg border-2 border-white shadow-sm overflow-hidden"
//                       >
//                         <img 
//                           src={item.productId?.mainImage || "https://via.placeholder.com/100"} 
//                           alt={item.productId?.name || "Product"}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = "https://via.placeholder.com/100";
//                           }}
//                         />
//                       </div>
//                     ))}
//                     {order.items.length > 3 && (
//                       <div className="w-10 h-10 bg-gray-100 rounded-lg border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
//                         +{order.items.length - 3}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div>
//                     <p className="font-medium text-gray-900">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
//                     <p className="text-sm text-gray-500">
//                       {order.items[0]?.productId?.name || "Unknown Product"}
//                       {order.items.length > 1 && ` +${order.items.length - 1} more`}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="space-y-3 pt-4 border-t border-gray-100">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Order Total</span>
//                     <span className="text-xl font-bold text-gray-900">₹{order.totalAmount}</span>
//                   </div>
// {/*                   
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Payment</span>
//                     <span className={`text-sm font-medium px-2 py-1 rounded ${
//                       order.paymentStatus === 'PAID' 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}>
//                       {order.paymentStatus === 'PAID' ? 'Paid' : 'Pending'}
//                     </span>
//                   </div> */}
//                 </div>
//               </div>

//               {/* Action Footer */}
//               <div className="p-6 pt-0">
//                 <button
//                   onClick={() => navigate(`/admin/orders/${order._id}`)}
//                   className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2"
//                 >
//                   <FaEye className="text-sm" />
//                   View Details
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Empty State */}
//       {filteredOrders.length === 0 && (
//         <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
//           <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FiPackage className="text-gray-400 text-2xl" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
//           <p className="text-gray-500 max-w-md mx-auto mb-6">
//             {searchTerm || statusFilter !== "ALL" 
//               ? "Try adjusting your search or filter criteria" 
//               : "No orders have been placed yet"}
//           </p>
//           {(searchTerm || statusFilter !== "ALL") && (
//             <button
//               onClick={() => {
//                 setSearchTerm("");
//                 setStatusFilter("ALL");
//               }}
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//             >
//               Clear filters
//             </button>
//           )}
//         </div>
//       )}

//       {/* Footer Stats */}
//       {filteredOrders.length > 0 && (
//         <div className="mt-8 pt-8 border-t border-gray-200">
//           <div className="flex flex-wrap justify-between items-center gap-4">
//             <p className="text-gray-600">
//               Showing <span className="font-semibold">{filteredOrders.length}</span> of{" "}
//               <span className="font-semibold">{orders.length}</span> orders
//             </p>
//             <div className="text-sm text-gray-500">
//               Last updated: {new Date().toLocaleTimeString('en-IN', { 
//                 hour: '2-digit', 
//                 minute: '2-digit' 
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


























// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import { 
//   FaEye, FaSearch, FaFilter, FaSort, FaCalendar, 
//   FaSync, FaUser, FaBox, FaDollarSign, FaShippingFast,FaPaperPlane,
//   FaCheckCircle, FaClock, FaTruck, FaChevronUp,
//   FaChevronRight, FaEllipsisV, FaExternalLinkAlt,
//   FaEdit, FaSave, FaTimes, FaSpinner, FaBars
// } from "react-icons/fa";
// import { FiPackage, FiShoppingBag } from "react-icons/fi";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const statusConfig = {
//   CREATED: { 
//     label: "Created", 
//     color: "bg-gray-100 text-gray-800",
//     icon: <FaClock className="text-gray-500" />,
//     bgColor: "bg-gray-50",
//     textColor: "text-gray-700",
//     dotColor: "bg-gray-400",
//     next: ["PAID"]
//   },
//   PAID: { 
//     label: "Paid", 
//     color: "bg-blue-50 text-blue-700",
//     icon: <FaDollarSign className="text-blue-500" />,
//     bgColor: "bg-blue-50",
//     textColor: "text-blue-700",
//     dotColor: "bg-blue-500",
//     next: ["SHIPPED"]
//   },
//   SHIPPED: { 
//     label: "Shipped", 
//     color: "bg-indigo-50 text-indigo-700",
//     icon: <FaTruck className="text-indigo-500" />,
//     bgColor: "bg-indigo-50",
//     textColor: "text-indigo-700",
//     dotColor: "bg-indigo-500",
//     next: ["DELIVERED"]
//   },
//   DELIVERED: { 
//     label: "Delivered", 
//     color: "bg-emerald-50 text-emerald-700",
//     icon: <FaCheckCircle className="text-emerald-500" />,
//     bgColor: "bg-emerald-50",
//     textColor: "text-emerald-700",
//     dotColor: "bg-emerald-500",
//     next: []
//   }
// };

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [sortBy, setSortBy] = useState("newest");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [updatingOrderId, setUpdatingOrderId] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOrders();
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const checkMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   const fetchOrders = async (showToast = true) => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orders/admin/all");
      
//       const activeOrders = res.data.data.filter(order => order.status !== "CANCELLED");
//       setOrders(activeOrders);
      
//       if (showToast) {
//         toast.success('Orders refreshed successfully');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error('Failed to fetch orders');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchOrders(true);
//   };

//   const handleStatusUpdateClick = (order) => {
//     setUpdatingOrderId(order._id);
//     setSelectedStatus(order.status);
//     setShowStatusModal(true);
//   };

//   const updateOrderStatus = async () => {
//     if (!updatingOrderId || !selectedStatus) return;

//     try {
//       setUpdateLoading(true);
      
//       const toastId = toast.loading(
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <div className="w-6 h-6 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
//             <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500 text-xs" />
//           </div>
//           <div>
//             <p className="font-medium text-sm">Updating Order Status</p>
//             <p className="text-xs text-gray-500">Processing your request...</p>
//           </div>
//         </div>,
//         {
//           autoClose: false,
//           closeButton: false,
//           closeOnClick: false,
//           draggable: false,
//         }
//       );
      
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       await api.put(`/orders/admin/${updatingOrderId}/status`, {
//         status: selectedStatus
//       });

//       setOrders(prev => {
//         const updatedOrders = prev.map(order => 
//           order._id === updatingOrderId 
//             ? { ...order, status: selectedStatus, updatedAt: new Date().toISOString() }
//             : order
//         );
//         return updatedOrders.filter(order => order.status !== "CANCELLED");
//       });

//       toast.update(toastId, {
//         render: (
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
//               <FaCheckCircle className="text-emerald-500" />
//             </div>
//             <div>
//               <p className="font-medium">Status Updated!</p>
//               <p className="text-sm text-gray-500">
//                 Order #{updatingOrderId.substring(0, 8)} updated to {statusConfig[selectedStatus]?.label}
//               </p>
//             </div>
//           </div>
//         ),
//         type: 'success',
//         isLoading: false,
//         autoClose: 3000,
//         closeButton: true,
//         closeOnClick: true,
//         draggable: true,
//       });

//       setTimeout(() => {
//         setShowStatusModal(false);
//         setUpdatingOrderId(null);
//         setSelectedStatus(null);
//         setUpdateLoading(false);
//       }, 800);

//     } catch (error) {
//       console.error('Update failed:', error);
//       toast.error(error.response?.data?.message || 'Update failed. Please try again.');
//       setUpdateLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const userName = order.userId?.name?.toLowerCase() || "";
//     const userEmail = order.userId?.email?.toLowerCase() || "";
//     const orderId = order._id.toLowerCase();
    
//     const matchesSearch = 
//       orderId.includes(searchTerm.toLowerCase()) ||
//       userName.includes(searchTerm.toLowerCase()) ||
//       userEmail.includes(searchTerm.toLowerCase()) ||
//       order.items.some(item => 
//         item.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
    
//     const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   }).sort((a, b) => {
//     switch (sortBy) {
//       case "newest":
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       case "oldest":
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       case "amount-high":
//         return b.totalAmount - a.totalAmount;
//       case "amount-low":
//         return a.totalAmount - b.totalAmount;
//       default:
//         return 0;
//     }
//   });

//   const getStatusCount = (status) => {
//     return orders.filter(order => order.status === status).length;
//   };

//   const getTotalRevenue = () => {
//     return orders
//       .filter(order => order.status === "DELIVERED")
//       .reduce((sum, order) => sum + order.totalAmount, 0);
//   };

//   const getAverageOrderValue = () => {
//     const deliveredOrders = orders.filter(order => order.status === "DELIVERED");
//     if (deliveredOrders.length === 0) return 0;
//     return getTotalRevenue() / deliveredOrders.length;
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getCurrentOrder = () => {
//     return orders.find(order => order._id === updatingOrderId);
//   };

//   const getStatusDescription = (statusKey) => {
//     switch (statusKey) {
//       case 'PAID':
//         return 'Mark order as paid and ready for shipping';
//       case 'SHIPPED':
//         return 'Mark order as shipped to customer';
//       case 'DELIVERED':
//         return 'Mark order as delivered successfully';
//       default:
//         return '';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="flex items-center justify-center h-96">
//           <div className="text-center">
//             <div className="relative">
//               <div className="w-12 h-12 border-3 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
//               <FiShoppingBag className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500 text-lg" />
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
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
//         theme="light"
//         className="text-sm"
//       />
      
//       {/* Status Update Modal - Responsive */}
//       {showStatusModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
//           <div className="bg-white rounded-2xl w-full max-w-md animate-slideUp max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="p-4 md:p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="max-w-[70%]">
//                   <h3 className="text-lg font-semibold text-gray-900 truncate">Update Order Status</h3>
//                   <p className="text-sm text-gray-500 mt-1 truncate">
//                     Order #{getCurrentOrder()?._id?.substring(0, 8)}...
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     if (!updateLoading) {
//                       setShowStatusModal(false);
//                       setUpdatingOrderId(null);
//                       setSelectedStatus(null);
//                     }
//                   }}
//                   disabled={updateLoading}
//                   className={`p-2 rounded-lg transition-colors ${
//                     updateLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   <FaTimes className="text-gray-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Loading Overlay */}
//             {updateLoading && (
//               <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center">
//                 <div className="text-center px-4">
//                   <div className="relative mb-4">
//                     <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
//                     <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500 text-lg" />
//                   </div>
//                   <p className="text-base md:text-lg font-medium text-gray-900 mb-2">Updating Status</p>
//                   <p className="text-sm text-gray-500">
//                     Changing to {statusConfig[selectedStatus]?.label}
//                   </p>
//                   <div className="mt-4 w-32 md:w-48 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
//                     <div className="h-full bg-indigo-500 rounded-full animate-progress"></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Current Status */}
//             <div className="p-4 md:p-6 border-b border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-medium text-gray-700">Customer</p>
//                   <p className="text-base md:text-lg font-semibold text-gray-900 truncate">
//                     {getCurrentOrder()?.userId?.name || "Customer"}
//                   </p>
//                 </div>
//                 <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium flex items-center gap-2 ${statusConfig[getCurrentOrder()?.status]?.color} whitespace-nowrap`}>
//                   <span className={`w-2 h-2 rounded-full ${statusConfig[getCurrentOrder()?.status]?.dotColor}`}></span>
//                   {statusConfig[getCurrentOrder()?.status]?.label}
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500">Order Total</p>
//                   <p className="text-lg md:text-xl font-bold text-gray-900">₹{getCurrentOrder()?.totalAmount}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-500">Placed on</p>
//                   <p className="text-sm font-medium text-gray-900">{formatDate(getCurrentOrder()?.createdAt)}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Status Options */}
//             <div className="p-4 md:p-6">
//               <p className="text-sm font-medium text-gray-700 mb-4">Select new status</p>
              
//               {statusConfig[getCurrentOrder()?.status]?.next.length > 0 ? (
//                 <div className="space-y-2">
//                   {statusConfig[getCurrentOrder()?.status]?.next.map(statusKey => (
//                     <button
//                       key={statusKey}
//                       onClick={() => !updateLoading && setSelectedStatus(statusKey)}
//                       disabled={updateLoading}
//                       className={`w-full p-3 md:p-4 rounded-xl border transition-all duration-200 text-left flex items-center justify-between ${
//                         updateLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
//                       } ${
//                         selectedStatus === statusKey
//                           ? 'border-indigo-500 bg-indigo-50'
//                           : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${statusConfig[statusKey].dotColor}`}></div>
//                         <div className="min-w-0">
//                           <p className="font-medium text-gray-900 truncate">{statusConfig[statusKey].label}</p>
//                           <p className="text-xs text-gray-500 mt-0.5 truncate">
//                             {getStatusDescription(statusKey)}
//                           </p>
//                         </div>
//                       </div>
//                       {selectedStatus === statusKey && (
//                         <FaCheckCircle className="text-indigo-500 flex-shrink-0" />
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-4 md:py-6">
//                   <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <FaCheckCircle className="text-gray-400" />
//                   </div>
//                   <p className="text-gray-500 text-sm mb-2 px-4">
//                     This order has reached its final status and cannot be updated.
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Status: {getCurrentOrder()?.status}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Modal Actions */}
//             <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                 <button
//                   onClick={() => {
//                     setShowStatusModal(false);
//                     setUpdatingOrderId(null);
//                     setSelectedStatus(null);
//                   }}
//                   disabled={updateLoading}
//                   className={`flex-1 py-2.5 sm:py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl transition-colors ${
//                     updateLoading 
//                       ? 'opacity-50 cursor-not-allowed' 
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateOrderStatus}
//                   disabled={!selectedStatus || updateLoading || statusConfig[getCurrentOrder()?.status]?.next.length === 0}
//                   className="flex-1 py-2.5 sm:py-3 px-4 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {updateLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <FaSave className="text-sm" />
//                       Update Status
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
//         {/* Header */}
//         <div className="mb-4 md:mb-6">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-2 md:p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg md:rounded-xl shadow-lg">
//                 <FiPackage className="text-xl md:text-2xl text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//                   Order Management
//                 </h1>
//                 <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage and track all customer orders</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2 self-end sm:self-auto">
//               <button 
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className={`p-2 md:p-2.5 bg-white rounded-lg border border-gray-200 transition-colors ${
//                   refreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
//                 }`}
//               >
//                 {refreshing ? (
//                   <FaSpinner className="text-gray-600 text-sm animate-spin" />
//                 ) : (
//                   <FaPaperPlane className="text-gray-600 text-sm" />
//                 )}
//               </button>
              
//               <button 
//                 onClick={() => setShowMobileFilters(!showMobileFilters)}
//                 className="p-2 md:p-2.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors md:hidden"
//               >
//                 <FaFilter className="text-gray-600 text-sm" />
//               </button>
//             </div>
//           </div>

//           {/* Quick Stats - Responsive */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 md:mb-6">
//             <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="min-w-0">
//                   <p className="text-xs md:text-sm text-gray-500 truncate">Active Orders</p>
//                   <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{orders.length}</p>
//                 </div>
//                 <div className="p-1.5 md:p-2 bg-indigo-50 rounded-lg flex-shrink-0 ml-2">
//                   <FiPackage className="text-indigo-500 text-sm md:text-base" />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="min-w-0">
//                   <p className="text-xs md:text-sm text-gray-500 truncate">Revenue</p>
//                   <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">₹{getTotalRevenue().toLocaleString('en-IN')}</p>
//                 </div>
//                 <div className="p-1.5 md:p-2 bg-emerald-50 rounded-lg flex-shrink-0 ml-2">
//                   <FaDollarSign className="text-emerald-500 text-sm md:text-base" />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="min-w-0">
//                   <p className="text-xs md:text-sm text-gray-500 truncate">Avg. Order</p>
//                   <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">₹{Math.round(getAverageOrderValue()).toLocaleString('en-IN')}</p>
//                 </div>
//                 <div className="p-1.5 md:p-2 bg-amber-50 rounded-lg flex-shrink-0 ml-2">
//                   <FaShippingFast className="text-amber-500 text-sm md:text-base" />
//                 </div>
//               </div>
//             </div>
            
//             <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200">
//               <div className="flex items-center justify-between">
//                 <div className="min-w-0">
//                   <p className="text-xs md:text-sm text-gray-500 truncate">Pending</p>
//                   <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
//                     {getStatusCount("CREATED") + getStatusCount("PAID")}
//                   </p>
//                 </div>
//                 <div className="p-1.5 md:p-2 bg-orange-50 rounded-lg flex-shrink-0 ml-2">
//                   <FaClock className="text-orange-500 text-sm md:text-base" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Search and Filters */}
//           <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
//             <div className="relative">
//               <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
//               <input
//                 type="text"
//                 placeholder="Search orders, customers, products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3.5 bg-white border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
//               />
//             </div>

//             {/* Mobile Filters */}
//             {showMobileFilters && (
//               <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 space-y-3 animate-slideDown md:hidden">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">Sort by</label>
//                   <div className="relative">
//                     <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
//                     <select
//                       value={sortBy}
//                       onChange={(e) => setSortBy(e.target.value)}
//                       className="w-full pl-9 sm:pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm appearance-none"
//                     >
//                       <option value="newest">Newest First</option>
//                       <option value="oldest">Oldest First</option>
//                       <option value="amount-high">Amount: High to Low</option>
//                       <option value="amount-low">Amount: Low to High</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">Status Filter</label>
//                   <div className="grid grid-cols-2 gap-1.5">
//                     <button
//                       onClick={() => setStatusFilter("ALL")}
//                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate ${
//                         statusFilter === "ALL" 
//                           ? "bg-indigo-500 text-white" 
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                     >
//                       All ({orders.length})
//                     </button>
//                     {Object.entries(statusConfig).map(([key, config]) => (
//                       <button
//                         key={key}
//                         onClick={() => setStatusFilter(key)}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 truncate ${
//                           statusFilter === key
//                             ? `${config.bgColor} ${config.textColor}`
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} flex-shrink-0`}></span>
//                         <span className="truncate">{config.label} ({getStatusCount(key)})</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Desktop Filters */}
//             <div className="hidden md:flex md:flex-col lg:flex-row lg:items-center justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">Sort:</span>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="amount-high">Amount: High to Low</option>
//                   <option value="amount-low">Amount: Low to High</option>
//                 </select>
//               </div>
              
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                 <span className="text-sm text-gray-600">Status:</span>
//                 <div className="flex flex-wrap gap-1.5">
//                   <button
//                     onClick={() => setStatusFilter("ALL")}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                       statusFilter === "ALL" 
//                         ? "bg-indigo-500 text-white" 
//                         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                     }`}
//                   >
//                     All ({orders.length})
//                   </button>
//                   {Object.entries(statusConfig).map(([key, config]) => (
//                     <button
//                       key={key}
//                       onClick={() => setStatusFilter(key)}
//                       className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
//                         statusFilter === key
//                           ? `${config.bgColor} ${config.textColor} border border-gray-200`
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                     >
//                       <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
//                       {config.label} ({getStatusCount(key)})
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Orders List */}
//         <div className="space-y-2 sm:space-y-3">
//           {filteredOrders.map((order) => {
//             const status = statusConfig[order.status];
//             const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
//             return (
//               <div 
//                 key={order._id} 
//                 className="bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden"
//               >
//                 <div className="p-3 sm:p-4">
//                   {/* Order Header */}
//                   <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-3">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
//                         <div className="flex items-center gap-2">
//                           <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <FaUser className="text-gray-600 text-xs sm:text-sm" />
//                           </div>
//                           <div className="min-w-0">
//                             <p className="font-medium text-gray-900 text-sm truncate">
//                               {order.userId?.name || "Unknown Customer"}
//                             </p>
//                             <p className="text-xs text-gray-500 truncate">
//                               {order.userId?.email || "No email"}
//                             </p>
//                           </div>
//                         </div>
                        
//                         <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${status.color} w-fit`}>
//                           <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}></span>
//                           <span className="truncate">{status.label}</span>
//                         </div>
//                       </div>
                      
//                       <p className="text-xs font-mono text-gray-500 truncate">
//                         #{order._id.substring(0, isMobile ? 8 : 12)}...
//                       </p>
//                     </div>
                    
//                     <div className="text-right">
//                       <p className="text-base sm:text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
//                       <p className="text-xs text-gray-500 mt-0.5">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
//                     </div>
//                   </div>

//                   {/* Order Details */}
//                   <div className="space-y-2 sm:space-y-3 pt-3 border-t border-gray-100">
//                     {/* Products Preview */}
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2 sm:gap-3 min-w-0">
//                         <div className="flex -space-x-2 flex-shrink-0">
//                           {order.items.slice(0, 3).map((item, index) => (
//                             <div 
//                               key={index} 
//                               className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-white shadow-xs overflow-hidden"
//                             >
//                               <img 
//                                 src={item.productId?.mainImage || "https://via.placeholder.com/80"} 
//                                 alt={item.productId?.name || "Product"}
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {
//                                   e.target.src = "https://via.placeholder.com/80";
//                                 }}
//                               />
//                             </div>
//                           ))}
//                           {order.items.length > 3 && (
//                             <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-lg border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
//                               +{order.items.length - 3}
//                             </div>
//                           )}
//                         </div>
                        
//                         <div className="min-w-0">
//                           <p className="text-xs sm:text-sm text-gray-900 truncate">
//                             {order.items[0]?.productId?.name || "Unknown Product"}
//                             {order.items.length > 1 && ` +${order.items.length - 1} more`}
//                           </p>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//                         {statusConfig[order.status]?.next.length > 0 && (
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleStatusUpdateClick(order);
//                             }}
//                             className="p-1.5 sm:p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                             title="Update status"
//                           >
//                             <FaEdit className="text-xs sm:text-sm" />
//                           </button>
//                         )}
//                         <button
//                           onClick={() => navigate(`/admin/orders/${order._id}`)}
//                           className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//                           title="View details"
//                         >
//                           <FaEye className="text-xs sm:text-sm" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Order Metadata */}
//                     <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 xs:gap-4 text-xs text-gray-500">
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-1.5">
//                           <FaCalendar className="text-gray-400" />
//                           <span>{formatDate(order.createdAt)}</span>
//                         </div>
//                         <div className="flex items-center gap-1.5">
//                           <FaClock className="text-gray-400" />
//                           <span>{formatTime(order.createdAt)}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Empty State */}
//           {filteredOrders.length === 0 && (
//             <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
//               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
//                 <FiShoppingBag className="text-gray-400 text-lg sm:text-xl" />
//               </div>
//               <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1.5 sm:mb-2">No orders found</h3>
//               <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 max-w-sm mx-auto">
//                 {searchTerm || statusFilter !== "ALL" 
//                   ? "No orders match your search criteria" 
//                   : "No orders have been placed yet"}
//               </p>
//               {(searchTerm || statusFilter !== "ALL") && (
//                 <button
//                   onClick={() => {
//                     setSearchTerm("");
//                     setStatusFilter("ALL");
//                   }}
//                   className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-xs sm:text-sm hover:bg-gray-200 transition-colors"
//                 >
//                   Clear filters
//                 </button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {filteredOrders.length > 0 && (
//           <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
//               <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
//                 Showing <span className="font-semibold">{filteredOrders.length}</span> of{" "}
//                 <span className="font-semibold">{orders.length}</span> active orders
//               </p>
//               <div className="text-xs text-gray-500 flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
//                 Updated {new Date().toLocaleTimeString('en-IN', { 
//                   hour: '2-digit', 
//                   minute: '2-digit' 
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Floating Action Button for Mobile */}
//         {filteredOrders.length > 0 && (
//           <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
//             <button
//               onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//               className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-colors active:scale-95"
//               aria-label="Scroll to top"
//             >
//               <FaChevronUp className="text-sm sm:text-base" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Add animations to global styles */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         @keyframes slideUp {
//           from { 
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to { 
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from { 
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to { 
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes progress {
//           from { width: 0%; }
//           to { width: 100%; }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.3s ease-out;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.2s ease-out;
//         }
        
//         .animate-progress {
//           animation: progress 2s ease-in-out infinite;
//         }

//         /* Responsive breakpoints */
//         @media (max-width: 640px) {
//           .text-xs-xs {
//             font-size: 0.65rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default AdminOrders;




import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { 
  FaEye, FaSearch, FaFilter, FaSort, FaCalendar, 
  FaSync, FaUser, FaBox, FaDollarSign, FaShippingFast, FaPaperPlane,
  FaCheckCircle, FaClock, FaTruck, FaTruckLoading, FaBus,
  FaChevronRight, FaEllipsisV, FaExternalLinkAlt,
  FaEdit, FaSave, FaTimes, FaSpinner, FaMapMarkerAlt, FaPhone,
  FaWarehouse, FaHome, FaRoute, FaShippingFast as FaShippingFastIcon
} from "react-icons/fa";
import { FiPackage, FiShoppingBag, FiTruck, FiHome, FiNavigation } from "react-icons/fi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main status configuration
const statusConfig = {
  CREATED: { 
    label: "Created", 
    color: "bg-gray-100 text-gray-800",
    icon: <FaClock className="text-gray-500" />,
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
    dotColor: "bg-gray-400",
    next: ["PAID"]
  },
  PAID: { 
    label: "Paid", 
    color: "bg-blue-50 text-blue-700",
    icon: <FaDollarSign className="text-blue-500" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    dotColor: "bg-blue-500",
    next: ["SHIPPED"]
  },
  SHIPPED: { 
    label: "Shipped", 
    color: "bg-indigo-50 text-indigo-700",
    icon: <FaTruck className="text-indigo-500" />,
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    dotColor: "bg-indigo-500",
    next: ["DELIVERED"]
  },
  DELIVERED: { 
    label: "Delivered", 
    color: "bg-emerald-50 text-emerald-700",
    icon: <FaCheckCircle className="text-emerald-500" />,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-500",
    next: []
  }
};

// Shipping status configuration
const shippingStatusConfig = {
  ASSIGNED: {
    label: "Assigned",
    color: "bg-yellow-100 text-yellow-800",
    dotColor: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    icon: "📋"
  },
  DISPATCHED: {
    label: "Dispatched",
    color: "bg-purple-100 text-purple-800",
    dotColor: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    icon: "🚚"
  },
  IN_TRANSIT: {
    label: "In Transit",
    color: "bg-blue-100 text-blue-800",
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    icon: "🛣️"
  },
  DELIVERED: {
    label: "Delivered",
    color: "bg-green-100 text-green-800",
    dotColor: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    icon: "✅"
  },
  PENDING: {
    label: "Pending",
    color: "bg-gray-100 text-gray-800",
    dotColor: "bg-gray-400",
    bgColor: "bg-gray-50",
    textColor: "text-gray-600",
    icon: "⏳"
  }
};

const AdminOrders = () => {
  const navigate = useNavigate();
  
  // Main states
  const [activeSection, setActiveSection] = useState("allOrders"); // "allOrders" or "shipping"
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Shipping-specific states
  const [shippingMethodFilter, setShippingMethodFilter] = useState("ALL");
  const [shippingStatusFilter, setShippingStatusFilter] = useState("ALL");
  const [shippingSearchTerm, setShippingSearchTerm] = useState("");
  const [selectedShippingOrder, setSelectedShippingOrder] = useState(null);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [busData, setBusData] = useState({
    busNumber: "",
    driverName: "",
    driverPhone: "",
    route: "",
    expectedDeliveryDate: "",
  });
  const [courierData, setCourierData] = useState({
    company: "",
    trackingNumber: "",
    trackingUrl: "",
    expectedDeliveryDate: "",
  });

  // Fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (showToast = true) => {
    try {
      setLoading(true);
      const res = await api.get("/orders/admin/all");
      
      // Filter out cancelled orders from display
      const activeOrders = res.data.data.filter(order => order.status !== "CANCELLED");
      setOrders(activeOrders);
      
      if (showToast) {
        toast.success('Orders refreshed successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders(true);
  };

  // Order status update
  const handleStatusUpdateClick = (order) => {
    setUpdatingOrderId(order._id);
    setSelectedStatus(order.status);
    setShowStatusModal(true);
  };

  const updateOrderStatus = async () => {
    if (!updatingOrderId || !selectedStatus) return;

    try {
      setUpdateLoading(true);
      
      const toastId = toast.loading(
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
            <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500 text-xs" />
          </div>
          <div>
            <p className="font-medium text-sm">Updating Order Status</p>
            <p className="text-xs text-gray-500">Processing your request...</p>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
          closeOnClick: false,
          draggable: false,
        }
      );
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await api.put(`/orders/admin/${updatingOrderId}/status`, {
        status: selectedStatus
      });

      // Update local state
      setOrders(prev => {
        const updatedOrders = prev.map(order => 
          order._id === updatingOrderId 
            ? { ...order, status: selectedStatus, updatedAt: new Date().toISOString() }
            : order
        );
        return updatedOrders.filter(order => order.status !== "CANCELLED");
      });

      toast.update(toastId, {
        render: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-emerald-500" />
            </div>
            <div>
              <p className="font-medium">Status Updated!</p>
              <p className="text-sm text-gray-500">
                Order #{updatingOrderId.substring(0, 8)} updated to {statusConfig[selectedStatus]?.label}
              </p>
            </div>
          </div>
        ),
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        closeOnClick: true,
        draggable: true,
      });

      setTimeout(() => {
        setShowStatusModal(false);
        setUpdatingOrderId(null);
        setSelectedStatus(null);
        setUpdateLoading(false);
      }, 800);

    } catch (error) {
      console.error('Update failed:', error);
      toast.update(toastId, {
        render: (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <FaTimes className="text-red-500" />
            </div>
            <div>
              <p className="font-medium">Update Failed</p>
              <p className="text-sm text-gray-500">
                {error.response?.data?.message || 'Please try again'}
              </p>
            </div>
          </div>
        ),
        type: 'error',
        isLoading: false,
        autoClose: 4000,
        closeButton: true,
      });
      setUpdateLoading(false);
    }
  };

  // Shipping management functions
  const handleAssignShippingClick = (order) => {
    setSelectedShippingOrder(order);
    setShowShippingModal(true);
  };

  const handleAssignBus = async () => {
    try {
      await api.put(`/orders/transport/${selectedShippingOrder._id}/assign-bus`, busData);
      toast.success("Bus assigned successfully!");
      setShowShippingModal(false);
      setBusData({
        busNumber: "",
        driverName: "",
        driverPhone: "",
        route: "",
        expectedDeliveryDate: "",
      });
      fetchOrders(false);
    } catch (err) {
      toast.error("Bus assignment failed");
      console.error(err);
    }
  };

  const handleAssignCourier = async () => {
    try {
      await api.put(`/orders/admin/${selectedShippingOrder._id}/assign-courier`, courierData);
      toast.success("Courier assigned successfully!");
      setShowShippingModal(false);
      setCourierData({
        company: "",
        trackingNumber: "",
        trackingUrl: "",
        expectedDeliveryDate: "",
      });
      fetchOrders(false);
    } catch (err) {
      toast.error("Courier assignment failed");
      console.error(err);
    }
  };

  const updateShippingStatus = async (orderId, status) => {
    try {
      const shippingMethod = selectedShippingOrder?.shipping?.method || "TRANSPORT";
      const url = shippingMethod === "TRANSPORT" 
        ? `/orders/transport/${orderId}/status` 
        : `/orders/courier/${orderId}/status`;
      
      await api.put(url, { status });
      toast.success("Shipping status updated!");
      fetchOrders(false);
    } catch (err) {
      toast.error("Status update failed");
      console.error(err);
    }
  };

  // Filter orders based on active section
  const getFilteredOrders = () => {
    if (activeSection === "allOrders") {
      return orders.filter(order => {
        const userName = order.userId?.name?.toLowerCase() || "";
        const userEmail = order.userId?.email?.toLowerCase() || "";
        const orderId = order._id.toLowerCase();
        
        const matchesSearch = 
          orderId.includes(searchTerm.toLowerCase()) ||
          userName.includes(searchTerm.toLowerCase()) ||
          userEmail.includes(searchTerm.toLowerCase()) ||
          order.items.some(item => 
            item.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        
        const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
        
        return matchesSearch && matchesStatus;
      }).sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "amount-high":
            return b.totalAmount - a.totalAmount;
          case "amount-low":
            return a.totalAmount - b.totalAmount;
          default:
            return 0;
        }
      });
    } else {
      // Shipping section filters
      return orders.filter(order => {
        // Only show orders that are PAID or SHIPPED for shipping management
        if (!["PAID", "SHIPPED"].includes(order.status)) return false;
        
        const shipping = order.shipping;
        const meta = shipping?.method === "TRANSPORT" ? shipping?.bus : shipping?.courier;
        const shippingMethod = shipping?.method || "";
        
        const matchesSearch = 
          order._id.toLowerCase().includes(shippingSearchTerm.toLowerCase()) ||
          order.userId?.name?.toLowerCase().includes(shippingSearchTerm.toLowerCase()) ||
          (meta?.busNumber || "").toLowerCase().includes(shippingSearchTerm.toLowerCase()) ||
          (meta?.trackingNumber || "").toLowerCase().includes(shippingSearchTerm.toLowerCase()) ||
          (meta?.driverName || "").toLowerCase().includes(shippingSearchTerm.toLowerCase());
        
        const matchesMethod = shippingMethodFilter === "ALL" || shippingMethod === shippingMethodFilter;
        
        const currentStatus = meta?.status || "PENDING";
        const matchesStatus = shippingStatusFilter === "ALL" || currentStatus === shippingStatusFilter;
        
        return matchesSearch && matchesMethod && matchesStatus;
      });
    }
  };

  const filteredOrders = getFilteredOrders();

  // Statistics
  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  const getShippingStats = () => {
    const shippingOrders = orders.filter(order => ["PAID", "SHIPPED"].includes(order.status));
    
    const stats = {
      total: shippingOrders.length,
      transport: shippingOrders.filter(o => o.shipping?.method === "TRANSPORT").length,
      courier: shippingOrders.filter(o => o.shipping?.method === "COURIER").length,
      pickup: shippingOrders.filter(o => o.shipping?.method === "PICKUP").length,
      assigned: shippingOrders.filter(o => {
        const meta = o.shipping?.method === "TRANSPORT" ? o.shipping?.bus : o.shipping?.courier;
        return meta?.status === "ASSIGNED";
      }).length,
      inTransit: shippingOrders.filter(o => {
        const meta = o.shipping?.method === "TRANSPORT" ? o.shipping?.bus : o.shipping?.courier;
        return meta?.status === "IN_TRANSIT";
      }).length,
      delivered: shippingOrders.filter(o => {
        const meta = o.shipping?.method === "TRANSPORT" ? o.shipping?.bus : o.shipping?.courier;
        return meta?.status === "DELIVERED";
      }).length,
    };
    
    return stats;
  };

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === "DELIVERED")
      .reduce((sum, order) => sum + order.totalAmount, 0);
  };

  const getAverageOrderValue = () => {
    const deliveredOrders = orders.filter(order => order.status === "DELIVERED");
    if (deliveredOrders.length === 0) return 0;
    return getTotalRevenue() / deliveredOrders.length;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCurrentOrder = () => {
    return orders.find(order => order._id === updatingOrderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative">
              <div className="w-12 h-12 border-3 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
              <FiShoppingBag className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500 text-lg" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  const shippingStats = getShippingStats();

  return (
    <>
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
        theme="light"
        className="text-sm"
      />
      
      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Update Order Status</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Order #{getCurrentOrder()?._id?.substring(0, 8)}...
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (!updateLoading) {
                      setShowStatusModal(false);
                      setUpdatingOrderId(null);
                      setSelectedStatus(null);
                    }
                  }}
                  disabled={updateLoading}
                  className={`p-2 rounded-lg transition-colors ${
                    updateLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>
            </div>

            {updateLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                    <FaSpinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-500 text-xl" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">Updating Status</p>
                  <p className="text-sm text-gray-500">
                    Changing to {statusConfig[selectedStatus]?.label}
                  </p>
                  <div className="mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <div className="h-full bg-indigo-500 rounded-full animate-progress"></div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Customer</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {getCurrentOrder()?.userId?.name || "Customer"}
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                  statusConfig[getCurrentOrder()?.status]?.color
                }`}>
                  <span className={`w-2 h-2 rounded-full ${statusConfig[getCurrentOrder()?.status]?.dotColor}`}></span>
                  {statusConfig[getCurrentOrder()?.status]?.label}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order Total</p>
                  <p className="text-xl font-bold text-gray-900">₹{getCurrentOrder()?.totalAmount}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Placed on</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(getCurrentOrder()?.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm font-medium text-gray-700 mb-4">Select new status</p>
              
              {statusConfig[getCurrentOrder()?.status]?.next.length > 0 ? (
                <div className="space-y-2">
                  {statusConfig[getCurrentOrder()?.status]?.next.map(statusKey => (
                    <button
                      key={statusKey}
                      onClick={() => !updateLoading && setSelectedStatus(statusKey)}
                      disabled={updateLoading}
                      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left flex items-center justify-between ${
                        updateLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      } ${
                        selectedStatus === statusKey
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${statusConfig[statusKey].dotColor}`}></div>
                        <div>
                          <p className="font-medium text-gray-900">{statusConfig[statusKey].label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {statusKey === 'PAID' ? 'Mark order as paid and ready for shipping' :
                             statusKey === 'SHIPPED' ? 'Mark order as shipped to customer' :
                             'Mark order as delivered successfully'}
                          </p>
                        </div>
                      </div>
                      {selectedStatus === statusKey && (
                        <FaCheckCircle className="text-indigo-500" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaCheckCircle className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    This order has reached its final status and cannot be updated.
                  </p>
                  <p className="text-xs text-gray-400">
                    Status: {getCurrentOrder()?.status}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setUpdatingOrderId(null);
                    setSelectedStatus(null);
                  }}
                  disabled={updateLoading}
                  className={`flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl transition-colors ${
                    updateLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={updateOrderStatus}
                  disabled={!selectedStatus || updateLoading || statusConfig[getCurrentOrder()?.status]?.next.length === 0}
                  className="flex-1 py-3 px-4 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {updateLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaSave className="text-sm" />
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Shipping Assign Modal */}
      {showShippingModal && selectedShippingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md animate-fadeIn">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {selectedShippingOrder.shipping?.method === "TRANSPORT" ? (
                  <>
                    <FaBus className="text-orange-500" />
                    Assign Bus
                  </>
                ) : (
                  <>
                    <FaShippingFastIcon className="text-orange-500" />
                    Assign Courier
                  </>
                )}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Order ID: <span className="font-mono">{selectedShippingOrder._id}</span>
              </p>
            </div>

            <div className="p-6 space-y-4">
              {selectedShippingOrder.shipping?.method === "TRANSPORT" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number *</label>
                    <input
                      type="text"
                      placeholder="Enter bus number"
                      value={busData.busNumber}
                      onChange={(e) => setBusData({ ...busData, busNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name *</label>
                    <input
                      type="text"
                      placeholder="Enter driver name"
                      value={busData.driverName}
                      onChange={(e) => setBusData({ ...busData, driverName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver Phone *</label>
                    <input
                      type="tel"
                      placeholder="Enter driver phone"
                      value={busData.driverPhone}
                      onChange={(e) => setBusData({ ...busData, driverPhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                    <input
                      type="text"
                      placeholder="Enter route details"
                      value={busData.route}
                      onChange={(e) => setBusData({ ...busData, route: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                    <input
                      type="date"
                      value={busData.expectedDeliveryDate}
                      onChange={(e) => setBusData({ ...busData, expectedDeliveryDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Courier Company *</label>
                    <input
                      type="text"
                      placeholder="e.g., FedEx, UPS, DHL"
                      value={courierData.company}
                      onChange={(e) => setCourierData({ ...courierData, company: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number *</label>
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      value={courierData.trackingNumber}
                      onChange={(e) => setCourierData({ ...courierData, trackingNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tracking URL</label>
                    <input
                      type="url"
                      placeholder="https://tracking.example.com"
                      value={courierData.trackingUrl}
                      onChange={(e) => setCourierData({ ...courierData, trackingUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                    <input
                      type="date"
                      value={courierData.expectedDeliveryDate}
                      onChange={(e) => setCourierData({ ...courierData, expectedDeliveryDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowShippingModal(false);
                  setSelectedShippingOrder(null);
                  setBusData({
                    busNumber: "",
                    driverName: "",
                    driverPhone: "",
                    route: "",
                    expectedDeliveryDate: "",
                  });
                  setCourierData({
                    company: "",
                    trackingNumber: "",
                    trackingUrl: "",
                    expectedDeliveryDate: "",
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={selectedShippingOrder.shipping?.method === "TRANSPORT" ? handleAssignBus : handleAssignCourier}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-md transition-shadow"
              >
                Assign Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <FiPackage className="text-2xl text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Order Management
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className={`p-2.5 bg-white rounded-lg border border-gray-200 transition-colors ${
                  refreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                {refreshing ? (
                  <FaSpinner className="text-gray-600 text-sm animate-spin" />
                ) : (
                  <FaPaperPlane className="text-gray-600 text-sm" />
                )}
              </button>
              
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="p-2.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors md:hidden"
              >
                <FaFilter className="text-gray-600 text-sm" />
              </button>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveSection("allOrders")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === "allOrders"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FiShoppingBag />
                  All Orders ({orders.length})
                </div>
              </button>
              <button
                onClick={() => setActiveSection("shipping")}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === "shipping"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FaTruck />
                  Shipping ({shippingStats.total})
                </div>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          {activeSection === "allOrders" ? (
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
                  </div>
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <FiPackage className="text-indigo-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{getTotalRevenue().toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <FaDollarSign className="text-emerald-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Order</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{Math.round(getAverageOrderValue()).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <FaShippingFast className="text-amber-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {getStatusCount("CREATED") + getStatusCount("PAID")}
                    </p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <FaClock className="text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">To Ship</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{shippingStats.total}</p>
                  </div>
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <FaTruckLoading className="text-indigo-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Transport</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{shippingStats.transport}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FaBus className="text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Courier</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{shippingStats.courier}</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <FaShippingFastIcon className="text-orange-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 bg-white rounded-xl p-4 min-w-[140px] border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">In Transit</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{shippingStats.inTransit}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <FiNavigation className="text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder={
                  activeSection === "allOrders" 
                    ? "Search orders, customers, products..."
                    : "Search by Order ID, Name, Bus/Tracking No..."
                }
                value={activeSection === "allOrders" ? searchTerm : shippingSearchTerm}
                onChange={(e) => activeSection === "allOrders" 
                  ? setSearchTerm(e.target.value)
                  : setShippingSearchTerm(e.target.value)
                }
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
              />
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 animate-slideDown md:hidden">
                {activeSection === "allOrders" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                      <div className="relative">
                        <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm appearance-none"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="amount-high">Amount: High to Low</option>
                          <option value="amount-low">Amount: Low to High</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setStatusFilter("ALL")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            statusFilter === "ALL" 
                              ? "bg-indigo-500 text-white" 
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          All ({orders.length})
                        </button>
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <button
                            key={key}
                            onClick={() => setStatusFilter(key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                              statusFilter === key
                                ? `${config.bgColor} ${config.textColor}`
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
                            {config.label} ({getStatusCount(key)})
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Method</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShippingMethodFilter("ALL")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            shippingMethodFilter === "ALL" 
                              ? "bg-orange-500 text-white" 
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          All ({shippingStats.total})
                        </button>
                        <button
                          onClick={() => setShippingMethodFilter("TRANSPORT")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                            shippingMethodFilter === "TRANSPORT"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <FaBus className="text-xs" />
                          Transport ({shippingStats.transport})
                        </button>
                        <button
                          onClick={() => setShippingMethodFilter("COURIER")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                            shippingMethodFilter === "COURIER"
                              ? "bg-orange-50 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <FaShippingFastIcon className="text-xs" />
                          Courier ({shippingStats.courier})
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Status</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setShippingStatusFilter("ALL")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            shippingStatusFilter === "ALL" 
                              ? "bg-indigo-500 text-white" 
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          All
                        </button>
                        {Object.entries(shippingStatusConfig).map(([key, config]) => (
                          <button
                            key={key}
                            onClick={() => setShippingStatusFilter(key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                              shippingStatusFilter === key
                                ? `${config.bgColor} ${config.textColor}`
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
                            {config.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center justify-between">
              {activeSection === "allOrders" ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="amount-high">Amount: High to Low</option>
                      <option value="amount-low">Amount: Low to High</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setStatusFilter("ALL")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          statusFilter === "ALL" 
                            ? "bg-indigo-500 text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All ({orders.length})
                      </button>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => setStatusFilter(key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                            statusFilter === key
                              ? `${config.bgColor} ${config.textColor} border border-gray-200`
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
                          {config.label} ({getStatusCount(key)})
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Method:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setShippingMethodFilter("ALL")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          shippingMethodFilter === "ALL" 
                            ? "bg-orange-500 text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All ({shippingStats.total})
                      </button>
                      <button
                        onClick={() => setShippingMethodFilter("TRANSPORT")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          shippingMethodFilter === "TRANSPORT"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaBus className="text-xs" />
                        Transport ({shippingStats.transport})
                      </button>
                      <button
                        onClick={() => setShippingMethodFilter("COURIER")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          shippingMethodFilter === "COURIER"
                            ? "bg-orange-50 text-orange-700 border border-orange-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaShippingFastIcon className="text-xs" />
                        Courier ({shippingStats.courier})
                      </button>
                      <button
                        onClick={() => setShippingMethodFilter("PICKUP")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                          shippingMethodFilter === "PICKUP"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaHome className="text-xs" />
                        Pickup ({shippingStats.pickup})
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setShippingStatusFilter("ALL")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          shippingStatusFilter === "ALL" 
                            ? "bg-indigo-500 text-white" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        All
                      </button>
                      {Object.entries(shippingStatusConfig).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => setShippingStatusFilter(key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                            shippingStatusFilter === key
                              ? `${config.bgColor} ${config.textColor} border border-gray-200`
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
                          {config.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="text-gray-400 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500 text-sm mb-4 max-w-sm mx-auto">
                {activeSection === "allOrders" 
                  ? (searchTerm || statusFilter !== "ALL" 
                    ? "No orders match your search criteria" 
                    : "No orders have been placed yet")
                  : "No shipping orders match your filters"
                }
              </p>
              {(activeSection === "allOrders" && (searchTerm || statusFilter !== "ALL")) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("ALL");
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            filteredOrders.map((order) => {
              if (activeSection === "allOrders") {
                const status = statusConfig[order.status];
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                
                return (
                  <div 
                    key={order._id} 
                    className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FaUser className="text-gray-600 text-sm" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm truncate max-w-[120px]">
                                  {order.userId?.name || "Unknown Customer"}
                                </p>
                                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                                  {order.userId?.email || "No email"}
                                </p>
                              </div>
                            </div>
                            
                            <div className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${status.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor}`}></span>
                              {status.label}
                            </div>
                          </div>
                          
                          <p className="text-xs font-mono text-gray-500">
                            #{order._id.substring(0, 12)}...
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                              {order.items.slice(0, 3).map((item, index) => (
                                <div 
                                  key={index} 
                                  className="w-8 h-8 rounded-lg border-2 border-white shadow-xs overflow-hidden"
                                >
                                  <img 
                                    src={item.productId?.mainImage || "https://via.placeholder.com/80"} 
                                    alt={item.productId?.name || "Product"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "https://via.placeholder.com/80";
                                    }}
                                  />
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="w-8 h-8 bg-gray-100 rounded-lg border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <p className="text-sm text-gray-900 line-clamp-1">
                                {order.items[0]?.productId?.name || "Unknown Product"}
                                {order.items.length > 1 && ` +${order.items.length - 1} more`}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {statusConfig[order.status]?.next.length > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusUpdateClick(order);
                                }}
                                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="Update status"
                              >
                                <FaEdit className="text-sm" />
                              </button>
                            )}
                            <button
                              onClick={() => navigate(`/admin/orders/${order._id}`)}
                              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View details"
                            >
                              <FaEye className="text-sm" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <FaCalendar className="text-gray-400" />
                              <span>{formatDate(order.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <FaClock className="text-gray-400" />
                              <span>{formatTime(order.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Shipping section view
                const shipping = order.shipping;
                const meta = shipping?.method === "TRANSPORT" ? shipping?.bus : shipping?.courier;
                const shippingStatus = meta?.status || "PENDING";
                const statusConfig = shippingStatusConfig[shippingStatus] || shippingStatusConfig.PENDING;
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
                
                return (
                  <div 
                    key={order._id} 
                    className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FaUser className="text-gray-600 text-sm" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm truncate max-w-[120px]">
                                  {order.userId?.name || "Unknown Customer"}
                                </p>
                                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                                  Order #{order._id.substring(0, 8)}...
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig.color} flex items-center gap-1.5`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`}></span>
                                {statusConfig.label}
                              </span>
                              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                                shipping?.method === "TRANSPORT" 
                                  ? "bg-blue-100 text-blue-700" 
                                  : shipping?.method === "COURIER"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}>
                                {shipping?.method === "TRANSPORT" ? "🚌 Transport" : 
                                 shipping?.method === "COURIER" ? "📦 Courier" : 
                                 "🏪 Pickup"}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{itemCount} items</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Shipping Details</p>
                            {meta ? (
                              <div className="space-y-1">
                                {meta.busNumber && (
                                  <p className="text-sm flex items-center gap-2">
                                    <FaBus className="text-blue-500" />
                                    Bus: {meta.busNumber}
                                  </p>
                                )}
                                {meta.company && (
                                  <p className="text-sm flex items-center gap-2">
                                    <FaShippingFastIcon className="text-orange-500" />
                                    {meta.company}
                                  </p>
                                )}
                                {meta.driverName && (
                                  <p className="text-sm flex items-center gap-2">
                                    <FaUser className="text-gray-500" />
                                    Driver: {meta.driverName}
                                  </p>
                                )}
                                {meta.trackingNumber && (
                                  <p className="text-sm flex items-center gap-2">
                                    <FaBox className="text-gray-500" />
                                    Tracking: {meta.trackingNumber}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400">Not assigned yet</p>
                            )}
                          </div>
                          
                      <div>
  <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
  {(() => {
    // Find the address that matches the order.address ID
    const selectedAddress = order.userId?.addresses?.find(
      addr => addr._id === order.address
    );
    
    if (selectedAddress) {
      return (
        <div className="text-sm">
          <p className="font-medium">{selectedAddress.fullName}</p>
          <p className="text-gray-600">{selectedAddress.line1}</p>
          <p className="text-gray-600">
            {selectedAddress.city} - {selectedAddress.pincode}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            📞 {selectedAddress.phone}
          </p>
        </div>
      );
    } else if (order.userId?.addresses?.[0]) {
      // Fallback to the first address if no match found
      const defaultAddress = order.userId.addresses[0];
      return (
        <div className="text-sm">
          <p className="font-medium">{defaultAddress.fullName}</p>
          <p className="text-gray-600">{defaultAddress.line1}</p>
          <p className="text-gray-600">
            {defaultAddress.city} - {defaultAddress.pincode}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            📞 {defaultAddress.phone}
          </p>
        </div>
      );
    } else {
      return (
        <div className="text-sm">
          <p className="text-gray-400">No address available</p>
          <p className="text-gray-500 text-xs mt-1">
            Customer: {order.userId?.name}
          </p>
        </div>
      );
    }
  })()}
</div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <FaCalendar className="text-gray-400" />
                              <span>Placed: {formatDate(order.createdAt)}</span>
                            </div>
                            {meta?.expectedDeliveryDate && (
                              <div className="flex items-center gap-1.5">
                                <FaClock className="text-gray-400" />
                                <span>ETA: {formatDate(meta.expectedDeliveryDate)}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!meta ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAssignShippingClick(order);
                                }}
                                className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg text-xs font-medium hover:shadow-md transition-shadow"
                              >
                                Assign {shipping?.method === "TRANSPORT" ? "Bus" : "Courier"}
                              </button>
                            ) : (
                              <select
                                value={shippingStatus}
                                onChange={(e) => updateShippingStatus(order._id, e.target.value)}
                                className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                              >
                                <option value="ASSIGNED">Assigned</option>
                                <option value="DISPATCHED">Dispatched</option>
                                <option value="IN_TRANSIT">In Transit</option>
                                <option value="DELIVERED">Delivered</option>
                              </select>
                            )}
                            <button
                              onClick={() => navigate(`/admin/orders/${order._id}`)}
                              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              title="View details"
                            >
                              <FaEye className="text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>

        {/* Footer */}
        {filteredOrders.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredOrders.length}</span> of{" "}
                <span className="font-semibold">{activeSection === "allOrders" ? orders.length : shippingStats.total}</span>{" "}
                {activeSection === "allOrders" ? "orders" : "shipping orders"}
              </p>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                Updated {new Date().toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button for Mobile */}
        {filteredOrders.length > 0 && (
          <div className="fixed bottom-6 right-6 md:hidden">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-colors"
            >
              <FaChevronRight className="transform -rotate-90" />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      `}</style>
    </>
  );
};

export default AdminOrders;