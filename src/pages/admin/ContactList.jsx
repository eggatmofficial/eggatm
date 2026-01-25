// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { 
//   FaUser, 
//   FaEnvelope, 
//   FaPhone, 
//   FaComment, 
//   FaCalendarAlt,
//   FaSearch,
//   FaEye,
//   FaPaperPlane,
//   FaClock,
//   FaTimes,
//   FaChevronLeft,
//   FaChevronRight
// } from "react-icons/fa";

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [stats, setStats] = useState({
//     total: 0,
//     unread: 0,
//     withPhone: 0
//   });
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const fetchContacts = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/contact");
//       const data = response.data.data || response.data;
//       setContacts(data);
//       setFilteredContacts(data);
      
//       const unreadCount = data.filter(item => item.status === "unread").length;
//       const phoneCount = data.filter(item => item.phone && item.phone.trim() !== "").length;
      
//       setStats({
//         total: data.length,
//         unread: unreadCount,
//         withPhone: phoneCount
//       });
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     setCurrentPage(1);
    
//     if (term === "") {
//       setFilteredContacts(contacts);
//     } else {
//       const filtered = contacts.filter(contact =>
//         contact.name.toLowerCase().includes(term) ||
//         contact.email.toLowerCase().includes(term) ||
//         (contact.phone && contact.phone.toLowerCase().includes(term)) ||
//         contact.message.toLowerCase().includes(term)
//       );
//       setFilteredContacts(filtered);
//     }
//   };

//   const viewContactDetails = (contact) => {
//     setSelectedContact(contact);
//     setShowModal(true);
//   };

//   const markAsRead = async (id) => {
//     try {
//       await api.patch(`/contact/${id}`, { status: "read" });
//       fetchContacts();
//     } catch (error) {
//       console.error("Error marking as read:", error);
//     }
//   };

//   const getTimeAgo = (date) => {
//     const now = new Date();
//     const past = new Date(date);
//     const diffInSeconds = Math.floor((now - past) / 1000);
    
//     if (diffInSeconds < 60) return "Just now";
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
//     return new Date(date).toLocaleDateString();
//   };

//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const getRandomColor = (str) => {
//     const colors = [
//       "bg-blue-500",
//       "bg-purple-500",
//       "bg-green-500",
//       "bg-amber-500",
//       "bg-red-500",
//       "bg-indigo-500"
//     ];
//     const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
//     return colors[index];
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           <p className="mt-4 text-gray-600">Loading contact messages...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
//       <div className="mb-8">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
//               <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
//                 <FaComment className="text-white text-2xl" />
//               </div>
//               Contact Messages
//             </h1>
//             <p className="text-gray-600 mt-2">Manage customer inquiries</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Total Messages</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
//               </div>
//               <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
//                 <FaComment className="text-2xl text-blue-500" />
//               </div>
//             </div>
//             <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '100%' }}></div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">Unread Messages</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.unread}</p>
//               </div>
//               <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
//                 <FaEnvelope className="text-2xl text-amber-500" />
//               </div>
//             </div>
//             <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div 
//                 className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" 
//                 style={{ width: `${stats.total ? (stats.unread / stats.total) * 100 : 0}%` }}
//               ></div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">With Phone Number</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{stats.withPhone}</p>
//               </div>
//               <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
//                 <FaPhone className="text-2xl text-green-500" />
//               </div>
//             </div>
//             <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div 
//                 className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
//                 style={{ width: `${stats.total ? (stats.withPhone / stats.total) * 100 : 0}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                 <FaSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 placeholder="Search messages..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="text-sm text-gray-500">
//                 Showing {Math.min(itemsPerPage, currentItems.length)} of {filteredContacts.length} messages
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message Preview</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {currentItems.length > 0 ? (
//                 currentItems.map((item) => (
//                   <tr key={item._id} className={`hover:bg-gray-50 ${item.status === "unread" ? "bg-blue-50/30" : ""}`}>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-10 h-10 rounded-full ${getRandomColor(item.name)} flex items-center justify-center text-white font-bold`}>
//                           {getInitials(item.name)}
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-900">{item.name}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="space-y-1">
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                           <FaEnvelope className="text-gray-400 text-xs" />
//                           {item.email}
//                         </div>
//                         {item.phone && (
//                           <div className="flex items-center gap-2 text-sm text-gray-600">
//                             <FaPhone className="text-gray-400 text-xs" />
//                             {item.phone}
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="max-w-xs">
//                         <p className="text-gray-700 text-sm line-clamp-2">
//                           {item.message}
//                         </p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-500">
//                         <div className="flex items-center gap-1">
//                           <FaClock className="text-gray-400 text-xs" />
//                           {getTimeAgo(item.createdAt)}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         item.status === "unread" 
//                           ? "bg-blue-100 text-blue-800" 
//                           : "bg-gray-100 text-gray-800"
//                       }`}>
//                         {item.status === "unread" ? "New" : "Read"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => viewContactDetails(item)}
//                           className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-1 text-sm"
//                         >
//                           <FaEye className="text-xs" />
//                           View
//                         </button>
//                         {item.status === "unread" && (
//                           <button
//                             onClick={() => markAsRead(item._id)}
//                             className="px-3 py-1.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center gap-1 text-sm"
//                           >
//                             <FaPaperPlane className="text-xs" />
//                             Mark Read
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-12 text-center">
//                     <div className="flex flex-col items-center justify-center">
//                       <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
//                         <FaComment className="text-4xl text-gray-400" />
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-700 mb-2">No messages found</h3>
//                       <p className="text-gray-500 max-w-md mx-auto">
//                         {searchTerm ? "Try a different search term" : "No contact messages have been submitted yet"}
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {filteredContacts.length > 0 && (
//           <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="text-sm text-gray-600">
//               Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} messages
//             </div>
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//               >
//                 <FaChevronLeft />
//                 Previous
//               </button>
              
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
//                     currentPage === page
//                       ? "bg-blue-500 text-white"
//                       : "text-gray-700 hover:bg-white"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
              
//               <button 
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
//               >
//                 Next
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {showModal && selectedContact && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
//             <div className="p-6 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-400 hover:text-gray-600 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>

//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <div className={`w-16 h-16 rounded-2xl ${getRandomColor(selectedContact.name)} flex items-center justify-center text-white font-bold text-xl`}>
//                     {getInitials(selectedContact.name)}
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h4>
//                     <div className="space-y-1 mt-2">
//                       <p className="flex items-center gap-2 text-gray-600">
//                         <FaEnvelope className="text-gray-400" />
//                         {selectedContact.email}
//                       </p>
//                       {selectedContact.phone && (
//                         <p className="flex items-center gap-2 text-gray-600">
//                           <FaPhone className="text-gray-400" />
//                           {selectedContact.phone}
//                         </p>
//                       )}
//                       <p className="flex items-center gap-2 text-gray-600">
//                         <FaCalendarAlt className="text-gray-400" />
//                         {new Date(selectedContact.createdAt).toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h5 className="text-sm font-semibold text-gray-700 mb-2">Message</h5>
//                   <div className="bg-gray-50 rounded-xl p-4">
//                     <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(selectedContact.email);
//                       alert("Email copied to clipboard!");
//                     }}
//                     className="px-5 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
//                   >
//                     Copy Email
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactList;







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
  FaChevronRight,
  FaFilter,
  FaEllipsisV,
  FaCopy,
  FaReply,
  FaSort,
  FaSortUp,
  FaSortDown
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
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "unread", "read"
  const [sortBy, setSortBy] = useState("newest"); // "newest", "oldest"
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [contacts, searchTerm, statusFilter, sortBy]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/contact");
      const data = response.data.data || response.data;
      setContacts(data);
      
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

  const applyFiltersAndSort = () => {
    let filtered = [...contacts];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.phone && contact.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
    
    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewContactDetails = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    // Mark as read when viewing
    if (contact.status === "unread") {
      markAsRead(contact._id);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/contact/${id}`, { status: "read" });
      fetchContacts();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/contact/mark-all-read");
      fetchContacts();
    } catch (error) {
      console.error("Error marking all as read:", error);
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
      "bg-gradient-to-r from-blue-500 to-cyan-500",
      "bg-gradient-to-r from-purple-500 to-pink-500",
      "bg-gradient-to-r from-green-500 to-emerald-500",
      "bg-gradient-to-r from-amber-500 to-orange-500",
      "bg-gradient-to-r from-red-500 to-rose-500",
      "bg-gradient-to-r from-indigo-500 to-blue-500"
    ];
    const index = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

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
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredContacts.length)} of {filteredContacts.length} messages
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
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
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
            <div className="w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <FaComment className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 text-xl" />
          </div>
          <div className="text-center">
            <p className="text-gray-700 font-medium">Loading messages</p>
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
              <div className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <FaComment className="text-white text-xl sm:text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact Messages</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">Manage customer inquiries</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3">
            <button
              onClick={fetchContacts}
              className="px-4 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2 text-sm font-medium"
            >
              <FaPaperPlane className="text-gray-500" />
              Refresh
            </button>
            {stats.unread > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <FaEye className="text-white" />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Messages</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stats.total}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl">
                <FaComment className="text-lg sm:text-xl text-blue-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-full"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">Unread Messages</p>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 sm:mt-2">{stats.unread}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg sm:rounded-xl">
                <FaEnvelope className="text-lg sm:text-xl text-amber-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.unread / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-shadow col-span-1 xs:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-500 font-medium">With Phone Number</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 sm:mt-2">{stats.withPhone}</p>
              </div>
              <div className="p-2.5 sm:p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl">
                <FaPhone className="text-lg sm:text-xl text-green-500" />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" 
                style={{ width: `${stats.total ? (stats.withPhone / stats.total) * 100 : 0}%` }}
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
                  placeholder="Search by name, email, or message..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-11 sm:pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base placeholder-gray-400"
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
                    showFilters || statusFilter !== "all" || sortBy !== "newest"
                      ? 'bg-blue-50 text-blue-700 border-blue-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <FaFilter />
                  <span className="hidden sm:inline">Filters</span>
                </button>
                
                <button
                  onClick={() => setSortBy(sortBy === "newest" ? "oldest" : "newest")}
                  className="px-4 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 transition-all text-sm font-medium flex items-center gap-2"
                >
                  {sortBy === "newest" ? <FaSortDown /> : <FaSortUp />}
                  <span className="hidden sm:inline">Sort</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "unread", "read"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          statusFilter === status
                            ? status === "unread" 
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : status === "read"
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        {status === "all" ? "All" : status === "unread" ? "Unread" : "Read"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-between">
            <span>{filteredContacts.length} messages found</span>
            <div className="flex items-center gap-2">
              {statusFilter !== "all" && (
                <button
                  onClick={() => setStatusFilter("all")}
                  className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded bg-blue-50"
                >
                  Clear {statusFilter} filter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sender</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((item) => (
                  <tr key={item._id} className={`hover:bg-gray-50 transition-colors ${item.status === "unread" ? "bg-blue-50/50" : ""}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${getRandomColor(item.name)} flex items-center justify-center text-white font-bold text-sm`}>
                          {getInitials(item.name)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {getTimeAgo(item.createdAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaEnvelope className="text-gray-400 text-xs flex-shrink-0" />
                          <span className="truncate max-w-[180px]">{item.email}</span>
                        </div>
                        {item.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaPhone className="text-gray-400 text-xs flex-shrink-0" />
                            <span>{item.phone}</span>
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
                      <div className="text-sm">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "unread" 
                            ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}>
                          {item.status === "unread" ? "New" : "Read"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewContactDetails(item)}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-xs font-medium"
                        >
                          <FaEye className="text-xs" />
                          View
                        </button>
                        {item.status === "unread" && (
                          <button
                            onClick={() => markAsRead(item._id)}
                            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-xs font-medium"
                          >
                            <FaPaperPlane className="text-xs" />
                          </button>
                        )}
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
                  className={`p-4 hover:bg-gray-50 transition-colors ${item.status === "unread" ? "bg-blue-50/30 border-l-4 border-blue-500" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-full ${getRandomColor(item.name)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {getInitials(item.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                            item.status === "unread" 
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {item.status === "unread" ? "New" : "Read"}
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaEnvelope className="text-gray-400 text-xs flex-shrink-0" />
                            <span className="truncate">{item.email}</span>
                          </div>
                          {item.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaPhone className="text-gray-400 text-xs flex-shrink-0" />
                              <span>{item.phone}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaClock className="text-gray-400 text-xs flex-shrink-0" />
                            <span>{getTimeAgo(item.createdAt)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2 mt-2">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => viewContactDetails(item)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <FaEye className="text-xs" />
                      View Details
                    </button>
                    {item.status === "unread" && (
                      <button
                        onClick={() => markAsRead(item._id)}
                        className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
                      >
                        <FaPaperPlane className="text-xs" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <FaComment className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No messages found</h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "No contact messages have been submitted yet"}
                </p>
                {(searchTerm || statusFilter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setShowFilters(false);
                    }}
                    className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {filteredContacts.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50">
            <PaginationButtons />
          </div>
        )}
      </div>

      {/* Message Detail Modal - Mobile Optimized */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
            <div className="sticky top-0 bg-white p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Message Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl p-2"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Sender Info */}
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${getRandomColor(selectedContact.name)} flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0`}>
                    {getInitials(selectedContact.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{selectedContact.name}</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                        <FaEnvelope className="text-gray-400 text-sm flex-shrink-0" />
                        <span className="truncate">{selectedContact.email}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(selectedContact.email);
                            toast.success("Email copied!");
                          }}
                          className="ml-2 p-1.5 text-gray-400 hover:text-gray-600"
                          aria-label="Copy email"
                        >
                          <FaCopy className="text-xs" />
                        </button>
                      </div>
                      {selectedContact.phone && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                          <FaPhone className="text-gray-400 text-sm flex-shrink-0" />
                          <span>{selectedContact.phone}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(selectedContact.phone);
                              toast.success("Phone copied!");
                            }}
                            className="ml-2 p-1.5 text-gray-400 hover:text-gray-600"
                            aria-label="Copy phone"
                          >
                            <FaCopy className="text-xs" />
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaCalendarAlt className="text-gray-400 text-xs flex-shrink-0" />
                        <span>{new Date(selectedContact.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-3">Message</h5>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedContact.email);
                      toast.success("Email copied to clipboard!");
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <FaCopy className="text-gray-500" />
                    Copy Email
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = `mailto:${selectedContact.email}`;
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <FaReply className="text-white" />
                    Reply via Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        @media (min-width: 640px) {
          .animate-slideUp {
            animation: fadeIn 0.2s ease-out;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ContactList;