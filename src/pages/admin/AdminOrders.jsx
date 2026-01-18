import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { 
  FaEye, FaSearch, FaFilter, FaSort, FaCalendar, 
  FaSync, FaUser, FaBox, FaDollarSign, FaShippingFast,
  FaCheckCircle, FaTimesCircle, FaClock, FaTruck
} from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

const statusConfig = {
  CREATED: { 
    label: "Created", 
    color: "bg-gray-100 text-gray-800 border border-gray-300",
    icon: <FaClock className="text-gray-500" />,
    bgColor: "bg-gray-50",
    textColor: "text-gray-700"
  },
  PAID: { 
    label: "Paid", 
    color: "bg-blue-50 text-blue-700 border border-blue-200",
    icon: <FaDollarSign className="text-blue-500" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700"
  },
  SHIPPED: { 
    label: "Shipped", 
    color: "bg-orange-50 text-orange-700 border border-orange-200",
    icon: <FaTruck className="text-orange-500" />,
    bgColor: "bg-orange-50",
    textColor: "text-orange-700"
  },
  DELIVERED: { 
    label: "Delivered", 
    color: "bg-green-50 text-green-700 border border-green-300",
    icon: <FaCheckCircle className="text-green-500" />,
    bgColor: "bg-green-50",
    textColor: "text-green-700"
  },
  CANCELLED: { 
    label: "Cancelled", 
    color: "bg-red-50 text-red-700 border border-red-200",
    icon: <FaTimesCircle className="text-red-500" />,
    bgColor: "bg-red-50",
    textColor: "text-red-700"
  },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/admin/all");
      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
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

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
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

  const getUserInitials = (user) => {
    if (!user?.name) return "UU";
    const nameParts = user.name.split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
              <FiPackage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-xl" />
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Order Management
            </h1>
            <p className="text-gray-600">
              Track and manage all customer orders efficiently
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm"
            >
              <FaSync className="text-sm" />
              <span className="font-medium">Refresh</span>
            </button>
            
            <div className="relative">
              <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none min-w-[160px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiPackage className="text-blue-500 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Across all statuses</p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹{getTotalRevenue().toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FaDollarSign className="text-green-500 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">From delivered orders</p>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹{Math.round(getAverageOrderValue()).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <FaShippingFast className="text-purple-500 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Per delivered order</p>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {getStatusCount("CREATED") + getStatusCount("PAID")}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <FaClock className="text-orange-500 text-xl" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Created + Paid orders</p>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              statusFilter === "ALL" 
                ? "bg-blue-500 text-white shadow-sm" 
                : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
            }`}
          >
            All ({orders.length})
          </button>
          
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                statusFilter === key
                  ? `${config.bgColor} ${config.textColor} border border-gray-200 shadow-sm`
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {config.icon}
              {config.label} ({getStatusCount(key)})
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, email, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const status = statusConfig[order.status];
          const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
          
          return (
            <div 
              key={order._id} 
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FaUser className="text-gray-500 text-sm" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {order.userId?.name || "Unknown Customer"}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[180px]">
                          {order.userId?.email || "No email"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-mono text-gray-600 mt-2">
                      #{order._id.substring(0, 10)}...
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${status.color}`}>
                      {status.label}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                {/* Product Preview */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div 
                        key={index} 
                        className="w-10 h-10 rounded-lg border-2 border-white shadow-sm overflow-hidden"
                      >
                        <img 
                          src={item.productId?.mainImage || "https://via.placeholder.com/100"} 
                          alt={item.productId?.name || "Product"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100";
                          }}
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                    <p className="text-sm text-gray-500">
                      {order.items[0]?.productId?.name || "Unknown Product"}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Order Total</span>
                    <span className="text-xl font-bold text-gray-900">₹{order.totalAmount}</span>
                  </div>
{/*                   
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Payment</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      order.paymentStatus === 'PAID' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.paymentStatus === 'PAID' ? 'Paid' : 'Pending'}
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                  className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEye className="text-sm" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPackage className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {searchTerm || statusFilter !== "ALL" 
              ? "Try adjusting your search or filter criteria" 
              : "No orders have been placed yet"}
          </p>
          {(searchTerm || statusFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("ALL");
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Footer Stats */}
      {filteredOrders.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredOrders.length}</span> of{" "}
              <span className="font-semibold">{orders.length}</span> orders
            </p>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;