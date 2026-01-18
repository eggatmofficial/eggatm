import { useEffect, useState } from "react";
import api from "../../api/axios";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaComment, 
  FaCalendarAlt,
  FaSearch,
  FaEye,
  FaPaperPlane,
  FaClock,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    withPhone: 0
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact");
      const data = response.data.data || response.data;
      setContacts(data);
      setFilteredContacts(data);
      
      const unreadCount = data.filter(item => item.status === "unread").length;
      const phoneCount = data.filter(item => item.phone && item.phone.trim() !== "").length;
      
      setStats({
        total: data.length,
        unread: unreadCount,
        withPhone: phoneCount
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
    
    if (term === "") {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        (contact.phone && contact.phone.toLowerCase().includes(term)) ||
        contact.message.toLowerCase().includes(term)
      );
      setFilteredContacts(filtered);
    }
  };

  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/contact/${id}`, { status: "read" });
      fetchContacts();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (str) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-red-500",
      "bg-indigo-500"
    ];
    const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading contact messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <FaComment className="text-white text-2xl" />
              </div>
              Contact Messages
            </h1>
            <p className="text-gray-600 mt-2">Manage customer inquiries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                <FaComment className="text-2xl text-blue-500" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unread Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.unread}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
                <FaEnvelope className="text-2xl text-amber-500" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.unread / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">With Phone Number</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.withPhone}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <FaPhone className="text-2xl text-green-500" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.withPhone / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">
                Showing {Math.min(itemsPerPage, currentItems.length)} of {filteredContacts.length} messages
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item._id} className={`hover:bg-gray-50 ${item.status === "unread" ? "bg-blue-50/30" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${getRandomColor(item.name)} flex items-center justify-center text-white font-bold`}>
                          {getInitials(item.name)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaEnvelope className="text-gray-400 text-xs" />
                          {item.email}
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaPhone className="text-gray-400 text-xs" />
                            {item.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-gray-700 text-sm line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaClock className="text-gray-400 text-xs" />
                          {getTimeAgo(item.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "unread" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {item.status === "unread" ? "New" : "Read"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewContactDetails(item)}
                          className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-1 text-sm"
                        >
                          <FaEye className="text-xs" />
                          View
                        </button>
                        {item.status === "unread" && (
                          <button
                            onClick={() => markAsRead(item._id)}
                            className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center gap-1 text-sm"
                          >
                            <FaPaperPlane className="text-xs" />
                            Mark Read
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                        <FaComment className="text-4xl text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages found</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        {searchTerm ? "Try a different search term" : "No contact messages have been submitted yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredContacts.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} messages
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <FaChevronLeft />
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl ${getRandomColor(selectedContact.name)} flex items-center justify-center text-white font-bold text-xl`}>
                    {getInitials(selectedContact.name)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h4>
                    <div className="space-y-1 mt-2">
                      <p className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-gray-400" />
                        {selectedContact.email}
                      </p>
                      {selectedContact.phone && (
                        <p className="flex items-center gap-2 text-gray-600">
                          <FaPhone className="text-gray-400" />
                          {selectedContact.phone}
                        </p>
                      )}
                      <p className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-gray-400" />
                        {new Date(selectedContact.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Message</h5>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedContact.email);
                      alert("Email copied to clipboard!");
                    }}
                    className="px-5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                  >
                    Copy Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;