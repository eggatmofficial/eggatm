

import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  FaShoppingCart,
  FaRupeeSign,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/auth/dashboard-stats");
      setStats(res.data.data);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin h-10 w-10 border-b-2 border-orange-500 rounded-full" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <FaShoppingCart />,
      color: "from-blue-500 to-blue-400",
      textColor: "text-blue-500"
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <FaRupeeSign />,
      color: "from-green-500 to-green-400",
      textColor: "text-green-500"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "from-purple-500 to-purple-400",
      textColor: "text-purple-500"
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "from-orange-500 to-orange-400",
      textColor: "text-orange-500"
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <h2 className={`text-2xl md:text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </h2>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                <div className="text-2xl">
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;