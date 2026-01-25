

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
  FaDesktop,
  FaTimes,
  FaChevronLeft,
  FaPaperPlane,
  FaChevronUp,
  FaFilter,
  FaSort,
  FaExternalLinkAlt,
  FaCopy,
  FaRegCheckCircle
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // "newest", "oldest", "email"
  const [showFilters, setShowFilters] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [subscribers, searchTerm, sourceFilter, sortBy]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/newsletter");
      const data = response.data.data || response.data;
      setSubscribers(data);
      
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

  const applyFiltersAndSort = () => {
    let filtered = [...subscribers];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply source filter
    if (sourceFilter !== "all") {
      filtered = filtered.filter(subscriber => subscriber.source === sourceFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortBy === "email") {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });
    
    setFilteredSubscribers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
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
      case 'website': return "bg-blue-50 text-blue-700 border border-blue-200";
      case 'mobile': return "bg-green-50 text-green-700 border border-green-200";
      default: return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: now.getFullYear() !== d.getFullYear() ? 'numeric' : undefined
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const PaginationButtons = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredSubscribers.length)} of {filteredSubscribers.length} subscribers
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <FaChevronLeft className="text-gray-600 text-sm" />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
            </>
          )}
          
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <FaChevronRight className="text-gray-600 text-sm" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4 sm:p-6">
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin"></div>
            <FaEnvelope className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500 text-xl" />
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-medium">Loading subscribers</p>
            <p className="text-sm text-gray-500 mt-1">Please wait a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <FaEnvelope className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">Manage and view all newsletter subscriptions</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3">
            <button
              onClick={fetchSubscribers}
              className="px-4 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 text-sm font-medium"
            >
              <FaPaperPlane className=" text-gray-500" />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-md"
            >
              <FaDownload className="text-white" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Subscribers</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.total}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg sm:rounded-xl">
                <FaUsers className="text-lg sm:text-xl text-amber-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Website Signups</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">{stats.website}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl">
                <FaDesktop className="text-lg sm:text-xl text-blue-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.website / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow col-span-1 xs:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Mobile Signups</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 sm:mt-2">{stats.mobile}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl">
                <FaMobileAlt className="text-lg sm:text-xl text-green-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.mobile / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm sm:text-base placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Clear search"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 py-3 rounded-xl border transition-all text-sm font-medium flex items-center gap-2 ${
                    showFilters || sourceFilter !== "all" || sortBy !== "newest"
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FaFilter />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                
                <button
                  onClick={() => setSortBy(sortBy === "newest" ? "oldest" : sortBy === "oldest" ? "email" : "newest")}
                  className="px-4 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-all text-sm font-medium flex items-center gap-2"
                >
                  <FaSort />
                  <span className="hidden sm:inline">
                    {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "Email"}
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "website", "mobile"].map((source) => (
                      <button
                        key={source}
                        onClick={() => setSourceFilter(source)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          sourceFilter === source
                            ? source === "website" 
                              ? "bg-blue-100 text-blue-800 border border-blue-300"
                              : source === "mobile"
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {source === "all" ? "All Sources" : source}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
            <span>{filteredSubscribers.length} subscribers found</span>
            <div className="flex items-center gap-2">
              {sourceFilter !== "all" && (
                <button
                  onClick={() => setSourceFilter("all")}
                  className="text-xs text-amber-600 hover:text-amber-800 px-2 py-1 rounded bg-amber-50"
                >
                  Clear {sourceFilter} filter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subscribers List */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subscription Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((item) => (
                  <tr 
                    key={item._id} 
                    className="hover:bg-amber-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center">
                          <FaEnvelope className="text-amber-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{item.email}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Subscribed {formatDate(item.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(item.source)}
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${getSourceColor(item.source)}`}>
                          {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { 
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(item.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(item.email)}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-xs font-medium"
                        >
                          {copiedEmail === item.email ? (
                            <>
                              <FaRegCheckCircle />
                              Copied
                            </>
                          ) : (
                            <>
                              <FaCopy className="text-xs" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => window.location.href = `mailto:${item.email}`}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-xs font-medium"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                          Email
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          <div className="divide-y divide-gray-100">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div 
                  key={item._id} 
                  className="p-4 hover:bg-amber-50/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{item.email}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getSourceColor(item.source)}`}>
                            {item.source}
                          </span>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCalendarAlt className="text-gray-400 text-xs flex-shrink-0" />
                            <span>{formatDate(item.createdAt)}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString('en-US', { 
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })} at {new Date(item.createdAt).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => copyToClipboard(item.email)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      {copiedEmail === item.email ? (
                        <>
                          <FaRegCheckCircle />
                          Copied
                        </>
                      ) : (
                        <>
                          <FaCopy className="text-xs" />
                          Copy Email
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => window.location.href = `mailto:${item.email}`}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No subscribers found</h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                  {searchTerm || sourceFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No newsletter subscribers yet"}
                </p>
                {(searchTerm || sourceFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSourceFilter("all");
                      setShowFilters(false);
                    }}
                    className="mt-4 px-4 py-2 text-amber-600 hover:text-amber-800 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {filteredSubscribers.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50">
            <PaginationButtons />
          </div>
        )}
      </div>

      {/* Quick Stats Info */}
      {filteredSubscribers.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{filteredSubscribers.length}</span> subscribers match your criteria
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Website ({stats.website})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">Mobile ({stats.mobile})</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={exportToCSV}
          className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center"
          aria-label="Export CSV"
        >
          <FaDownload className="text-xl" />
        </button>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .email-cell {
          max-width: 250px;
        }
        
        @media (max-width: 640px) {
          .email-cell {
            max-width: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default NewsletterList;