import { useEffect, useState } from "react";
import api from "../../api/axios";
import { 
  FaEnvelope, 
  FaUsers, 
  FaCalendarAlt, 
  FaDownload, 
  FaSearch,
  FaChevronRight,
  FaGlobe,
  FaMobileAlt,
  FaDesktop
} from "react-icons/fa";

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    website: 0,
    mobile: 0
  });

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/newsletter");
      const data = response.data.data || response.data;
      setSubscribers(data);
      setFilteredSubscribers(data);
      
      // Calculate stats
      const websiteCount = data.filter(item => item.source === "website").length;
      const mobileCount = data.filter(item => item.source === "mobile").length;
      
      setStats({
        total: data.length,
        website: websiteCount,
        mobile: mobileCount
      });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === "") {
      setFilteredSubscribers(subscribers);
    } else {
      const filtered = subscribers.filter(subscriber =>
        subscriber.email.toLowerCase().includes(term) ||
        subscriber.source.toLowerCase().includes(term)
      );
      setFilteredSubscribers(filtered);
    }
  };

  const exportToCSV = () => {
    const headers = ["Email", "Source", "Subscribed Date"];
    const csvContent = [
      headers.join(","),
      ...filteredSubscribers.map(item => [
        `"${item.email}"`,
        item.source,
        new Date(item.createdAt).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSourceIcon = (source) => {
    switch(source) {
      case 'website': return <FaDesktop className="text-blue-500" />;
      case 'mobile': return <FaMobileAlt className="text-green-500" />;
      default: return <FaGlobe className="text-gray-500" />;
    }
  };

  const getSourceColor = (source) => {
    switch(source) {
      case 'website': return "bg-blue-100 text-blue-800";
      case 'mobile': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <p className="mt-4 text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <FaEnvelope className="text-white text-2xl" />
              </div>
              Newsletter Subscribers
            </h1>
            <p className="text-gray-600 mt-2">Manage and view all newsletter subscriptions</p>
          </div>
          
          <button
            onClick={exportToCSV}
            className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-medium"
          >
            <FaDownload />
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
                <FaUsers className="text-2xl text-amber-500" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Website Signups</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.website}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <FaDesktop className="text-2xl text-blue-500" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.website / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div> */}

          {/* <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Mobile Signups</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.mobile}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <FaMobileAlt className="text-2xl text-green-500" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.mobile / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Search and Table Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by email or source..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <span className="text-sm text-gray-500">
                {filteredSubscribers.length} of {subscribers.length} subscribers
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                <th className="p-5 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    Email Address
                  </div>
                </th>
                <th className="p-5 text-left text-sm font-semibold text-gray-700">
                  Source
                </th>
                <th className="p-5 text-left text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    Subscription Date
                  </div>
                </th>
                {/* <th className="p-5 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((item) => (
                  <tr 
                    key={item._id} 
                    className="hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-yellow-50/50 transition-all duration-200 group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center">
                          <FaEnvelope className="text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.email}</p>
                          <p className="text-xs text-gray-500 mt-1">Subscriber</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(item.source)}
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getSourceColor(item.source)}`}>
                          {item.source}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">
                            {new Date(item.createdAt).getDate()}
                          </div>
                          <div className="text-xs text-gray-500 uppercase">
                            {new Date(item.createdAt).toLocaleString('default', { month: 'short' })}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">
                            {new Date(item.createdAt).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            at {new Date(item.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                        <FaSearch className="text-3xl text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No subscribers found</h3>
                      <p className="text-gray-500">
                        {searchTerm ? "Try a different search term" : "No subscribers yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredSubscribers.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredSubscribers.length}</span> subscribers
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white rounded-lg transition-all">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 border border-gray-200 rounded-lg">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-white rounded-lg transition-all">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterList;