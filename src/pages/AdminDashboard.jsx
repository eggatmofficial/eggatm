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
      <div className="flex justify-center items-center h-64">
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
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <FaRupeeSign />,
      color: "from-green-500 to-green-400",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "from-purple-500 to-purple-400",
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "from-orange-500 to-orange-400",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow-lg text-white bg-gradient-to-r ${card.color}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{card.title}</p>
                <h2 className="text-3xl font-bold mt-1">
                  {card.value}
                </h2>
              </div>
              <div className="text-4xl opacity-80">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
