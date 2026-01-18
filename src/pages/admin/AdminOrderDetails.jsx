import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { 
  FaArrowLeft, FaCheck, FaTruck, FaBoxOpen, FaTimes, 
  FaEdit, FaPrint, FaWhatsapp, FaUser, FaCalendar,
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaShoppingBag,
  FaTag, FaWeight, FaRupeeSign, FaCreditCard, FaQrcode,
  FaClipboardList, FaStore, FaTachometerAlt
} from "react-icons/fa";
import { FiPackage, FiTrendingUp, FiDollarSign } from "react-icons/fi";

const statusConfig = {
  CREATED: { 
    label: "Order Created", 
    icon: "📝",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200"
  },
  PAID: { 
    label: "Payment Received", 
    icon: "💳",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  SHIPPED: { 
    label: "Order Shipped", 
    icon: "🚚",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  DELIVERED: { 
    label: "Delivered", 
    icon: "✅",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  CANCELLED: { 
    label: "Cancelled", 
    icon: "❌",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  },
};

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/admin/${id}`);
      setOrder(res.data.data);
      setStatus(res.data.data.status);
      
      if (res.data.data.address && typeof res.data.data.address === 'string') {
        fetchAddress(res.data.data.address);
      }
    } catch (err) {
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const fetchAddress = async (addressId) => {
    try {
      const res = await api.get(`/address/${addressId}`);
      setAddress(res.data.data);
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  const updateStatus = async () => {
    try {
      await api.put(`/orders/admin/${id}/status`, { status });
      toast.success("Order status updated successfully!");
      fetchOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const getTotalItems = () => {
    if (!order?.items) return 0;
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <FiPackage className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-xl" />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBoxOpen className="text-gray-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/admin/orders")}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-sm"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getActiveStep = () => {
    const steps = ["CREATED", "PAID", "SHIPPED", "DELIVERED"];
    return steps.indexOf(order.status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/orders")}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaArrowLeft className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {/* Order #{order._id}... */}
                Order Details
              </h1>
              <p className="text-gray-600 mt-1">
                {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} • Placed on {new Date(order.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {/* {["details", "timeline", "customer", "actions"].map((tab) => ( */}
             {["details"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaClipboardList className="text-blue-500" />
              Order Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FaUser className="text-blue-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.userId?.name || "Unknown Customer"}</p>
                    <p className="text-sm text-gray-600">{order.userId?.email || "No email"}</p>
                  </div>
                </div>
                
                <div className="space-y-2 pl-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendar className="text-gray-400" />
                    <span>Order Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaStore className="text-gray-400" />
                    <span>Source: {order.source}</span>
                  </div>
                </div>
              </div>
              
              {/* Order Stats */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <FiTrendingUp className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Order Status</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        statusConfig[order.status].bgColor
                      } ${statusConfig[order.status].color} border ${
                        statusConfig[order.status].borderColor
                      }`}>
                        {statusConfig[order.status].icon} {statusConfig[order.status].label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pl-1">
                  {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCreditCard className="text-gray-400" />
                    <span>Payment: <span className={`font-medium ${
                      order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {order.paymentStatus === 'PAID' ? 'Paid' : 'Pending'}
                    </span></span>
                  </div> */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiPackage className="text-gray-400" />
                    <span>Items: {getTotalItems()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaShoppingBag className="text-orange-500" />
              Order Items ({order.items.length})
            </h3>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={item.productId?.mainImage || "https://via.placeholder.com/100"} 
                        alt={item.productId?.name || "Product"} 
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {item.productId?.name || "Unknown Product"}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FaTag className="text-xs" />
                          ₹{item.price} each
                        </span>
                        <span className="flex items-center gap-1">
                          <FaWeight className="text-xs" />
                          {item.variantLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">₹{item.subtotal}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Total Amount */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Total Amount</p>
                    <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">₹{order.totalAmount}</p>
                    <p className="text-sm text-gray-600 text-right">
                      {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline & Actions */}
        <div className="space-y-6">
          {/* Timeline Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaTachometerAlt className="text-purple-500" />
              Order Timeline
            </h3>
            
            <div className="space-y-4">
              {["CREATED", "PAID", "SHIPPED", "DELIVERED"].map((step, index) => {
                const isActive = index <= getActiveStep();
                const isCurrent = order.status === step;
                const config = statusConfig[step];
                
                return (
                  <div key={step} className="flex items-start gap-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${isActive ? config.bgColor : 'bg-gray-100'}
                      ${isCurrent ? 'border-2 border-blue-500' : 'border border-gray-200'}
                    `}>
                      <span className={isActive ? config.color : 'text-gray-400'}>
                        {config.icon}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {config.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-gray-500 mt-1">
                          Updated: {new Date(order.updatedAt).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-3"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Update Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaEdit className="text-blue-500" />
              Update Status
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select New Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => setStatus(key)}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        status === key
                          ? `${config.bgColor} border-blue-500`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{config.icon}</span>
                        <span className="font-medium">{config.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={updateStatus}
                disabled={status === order.status}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  status === order.status
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {status === order.status ? (
                  "Status Already Set"
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaCheck />
                    Update Order Status
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;