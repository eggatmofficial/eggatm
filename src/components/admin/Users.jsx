

import React, { useState, useEffect } from "react";
import * as userAPI from "../../api/user.api";
import * as XLSX from "xlsx";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "#10B981" : type === "error" ? "#EF4444" : "#3B82F6";

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: bgColor,
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minWidth: "300px",
      maxWidth: "400px",
      animation: "slideIn 0.3s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {type === "success" && "✅"}
        {type === "error" && "❌"}
        {type === "info" && "ℹ️"}
        <span style={{ fontSize: "14px", fontWeight: "500" }}>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "18px",
          padding: "0",
          marginLeft: "12px",
        }}
      >
        ×
      </button>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    location: "",
    branch: "",
    email: "",
    password: "",
    status: "Active",
    role: "User",
    // Separate address fields
    addressFullName: "",
    addressPhone: "",
    addressLine1: "",
    addressCity: "",
    addressPincode: "",
    addressIsDefault: true
  });

  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "info", // success, error, info
  });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, show: false });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const status = activeTab; // all | active | inactive
      const res = await userAPI.getUsers(status);
      setUsers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      showToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create address object from form fields
    const addressData = {
      fullName: form.addressFullName || form.name,
      phone: form.addressPhone || form.mobile,
      line1: form.addressLine1 || "",
      city: form.addressCity || form.location || "",
      pincode: form.addressPincode || "000000", // Provide default if empty
      isDefault: form.addressIsDefault
    };

    const payload = {
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      location: form.location,
      branch: form.branch,
      role: form.role,
      status: form.status,
      password: form.password,
      addressData: addressData // Send as addressData object, not addresses array
    };

    console.log("Sending payload:", payload);

    if (editingId) {
      await userAPI.updateUser(editingId, payload);
      showToast("User updated successfully!", "success");
    } else {
      await userAPI.createUser(payload);
      showToast("User created successfully!", "success");
    }

    fetchUsers();
    handleCloseModal();
  } catch (err) {
    console.error("Error:", err);
    showToast(err.response?.data?.message || "Action failed", "error");
  }
};

  const handleEdit = (user) => {
    // Get the default address for editing
    const defaultAddress = user.addresses?.find(addr => addr.isDefault) || 
                          user.addresses?.[0] || 
                          {};

    setForm({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      location: user.location,
      branch: user.branch,
      role: user.role,
      status: user.isActive ? "Active" : "Inactive",
      password: "", // Clear password for edit mode
      // Address fields
      addressFullName: defaultAddress.fullName || user.name,
      addressPhone: defaultAddress.phone || user.mobile || "",
      addressLine1: defaultAddress.line1 || "",
      addressCity: defaultAddress.city || user.location || "",
      addressPincode: defaultAddress.pincode || "",
      addressIsDefault: defaultAddress.isDefault || true
    });
    setEditingId(user._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await userAPI.deleteUser(id);
      showToast("User deleted successfully!", "success");
      fetchUsers();
    } catch (err) {
      showToast("Delete failed", "error");
    }
  };

  const handleOpenModal = () => {
    setForm({
      name: "",
      mobile: "",
      location: "",
      branch: "",
      email: "",
      password: "",
      status: "Active",
      role: "User",
      // Address fields
      addressFullName: "",
      addressPhone: "",
      addressLine1: "",
      addressCity: "",
      addressPincode: "",
      addressIsDefault: true
    });
    setEditingId(null);
    setShowPassword(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({
      name: "",
      mobile: "",
      location: "",
      branch: "",
      email: "",
      password: "",
      status: "Active",
      role: "User",
      addressFullName: "",
      addressPhone: "",
      addressLine1: "",
      addressCity: "",
      addressPincode: "",
      addressIsDefault: true
    });
  };

  // Helper function to get full address string
  const getFullAddressString = (user) => {
    if (!user.addresses || user.addresses.length === 0) return "N/A";
    
    const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
    const parts = [];
    
    if (defaultAddress.line1) parts.push(defaultAddress.line1);
    if (defaultAddress.city) parts.push(defaultAddress.city);
    if (defaultAddress.pincode) parts.push(`PIN: ${defaultAddress.pincode}`);
    
    return parts.join(", ");
  };

  // Helper function to get address details for display
  const getAddressDetails = (user) => {
    if (!user.addresses || user.addresses.length === 0) {
      return {
        line1: "N/A",
        city: "",
        pincode: "",
        phone: "",
        fullName: ""
      };
    }
    
    const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
    return defaultAddress;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile?.includes(searchTerm) ||
      user.branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.addresses?.some(addr => 
        addr.line1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        addr.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        addr.pincode?.includes(searchTerm)
      ));

    const matchesStatus =
      activeTab === "all"
        ? true
        : activeTab === "active"
        ? user.isActive === true
        : user.isActive === false;

    return matchesSearch && matchesStatus;
  });

  const downloadUsersExcel = () => {
    if (!users.length) {
      showToast("No users to export", "info");
      return;
    }

    try {
      // 🔹 Prepare data for Excel
      const excelData = users.map((user, index) => {
        const address = getAddressDetails(user);
        return {
          "S.No": index + 1,
          "Name": user.name,
          "Email": user.email,
          "Mobile": user.mobile || "",
          "Location": user.location || "",
          "Address Line": address.line1,
          "City": address.city,
          "Pincode": address.pincode,
          "Address Name": address.fullName,
          "Address Phone": address.phone,
          "Branch": user.branch || "",
          "Role": user.role,
          "Status": user.isActive ? "Active" : "Inactive",
          "Total Addresses": user.addresses?.length || 0,
          "Created At": user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "",
        };
      });

      // 🔹 Create worksheet & workbook
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      // 🔹 Download file
      XLSX.writeFile(workbook, "Users_List.xlsx");
      showToast("Excel file downloaded successfully!", "success");
    } catch (error) {
      console.error("Failed to export Excel:", error);
      showToast("Failed to export Excel file", "error");
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      await userAPI.toggleUserStatus(id);
      const action = currentStatus ? "deactivated" : "activated";
      showToast(`User ${action} successfully!`, "success");
      fetchUsers();
    } catch (error) {
      showToast("Failed to update user status", "error");
    }
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>👥 User Management</h1>
          <p style={styles.headerSubtitle}>Manage all user accounts and permissions</p>
        </div>
        
        <div style={styles.headerActions}>
          <div style={styles.headerStats}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{users.length}</div>
              <div style={styles.statLabel}>Total Users</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{users.filter(u => u.isActive).length}</div>
              <div style={styles.statLabel}>Active</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{users.filter(u => !u.isActive).length}</div>
              <div style={styles.statLabel}>Inactive</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>
                {users.reduce((total, user) => total + (user.addresses?.length || 0), 0)}
              </div>
              <div style={styles.statLabel}>Addresses</div>
            </div>
          </div>

          <button
            style={{
              ...styles.addButton,
              backgroundColor: "#10B981",
            }}
            onClick={downloadUsersExcel}
          >
            ⬇️ Download Excel
          </button>
          
          <button style={styles.addButton} onClick={handleOpenModal}>
            <span style={styles.addIcon}>+</span>
            Add User
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div style={styles.mainContent}>
        {/* SEARCH AND FILTERS */}
        <div style={styles.toolbar}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              style={styles.searchInput}
              placeholder="Search users by name, email, mobile, branch, address, city, or pincode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                style={styles.clearSearch} 
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          <div style={styles.tabs}>
            <button
              style={activeTab === "all" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("all")}
            >
              All Users
            </button>
            <button
              style={activeTab === "active" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("active")}
            >
              Active
            </button>
            <button
              style={activeTab === "inactive" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* USER CARDS GRID */}
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading users...</p>
          </div>
        ) : (
          <div style={isMobile ? styles.mobileUsersGrid : styles.usersGrid}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const address = getAddressDetails(user);
                const fullAddress = getFullAddressString(user);
                
                return (
                  <div key={user._id} style={styles.userCard}>
                    <div style={styles.cardHeader}>
                      <div style={styles.userAvatar}>
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div style={styles.userInfo}>
                        <h3 style={styles.userName}>{user.name}</h3>
                        <p style={styles.userEmail}>{user.email}</p>
                        <p style={styles.userMobile}>📱 {user.mobile || "N/A"}</p>
                      </div>
                      <div style={styles.userStatus}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: user.isActive ? "#10B981" : "#EF4444"
                        }}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                        <span style={styles.roleBadge}>{user.role}</span>
                      </div>
                    </div>

                    <div style={styles.cardBody}>
                      <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>📍 Location:</span>
                        <span style={styles.detailValue}>{user.location || "N/A"}</span>
                      </div>
                      <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>🏢 Branch:</span>
                        <span style={styles.detailValue}>{user.branch || "N/A"}</span>
                      </div>
                      
                      {/* Address Details */}
                      <div style={styles.addressSection}>
                        <div style={styles.sectionTitle}>
                          🏠 Address Details
                          {user.addresses?.find(addr => addr.isDefault) && (
                            <span style={styles.defaultBadge}>Default</span>
                          )}
                        </div>
                        {address.line1 !== "N/A" ? (
                          <>
                            <div style={styles.detailRow}>
                              <span style={styles.detailLabel}>Address:</span>
                              <span style={styles.detailValue} title={address.line1}>
                                {address.line1}
                              </span>
                            </div>
                            <div style={styles.detailRow}>
                              <span style={styles.detailLabel}>City:</span>
                              <span style={styles.detailValue}>{address.city}</span>
                            </div>
                            <div style={styles.detailRow}>
                              <span style={styles.detailLabel}>Pincode:</span>
                              <span style={styles.detailValue}>{address.pincode || "N/A"}</span>
                            </div>
                            {address.fullName && (
                              <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Name:</span>
                                <span style={styles.detailValue}>{address.fullName}</span>
                              </div>
                            )}
                            {address.phone && (
                              <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Contact:</span>
                                <span style={styles.detailValue}>{address.phone}</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div style={styles.noAddress}>No address added</div>
                        )}
                      </div>
                      
                      <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>📦 Addresses:</span>
                        <span style={styles.detailValue}>
                          {user.addresses?.length || 0} address(es)
                        </span>
                      </div>
                    </div>

                    <div style={styles.cardFooter}>
                      <button
                        style={{
                          ...styles.actionButton,
                          backgroundColor: user.isActive ? "#FEF3C7" : "#DCFCE7",
                          color: user.isActive ? "#92400E" : "#166534",
                        }}
                        onClick={() => toggleUserStatus(user._id, user.isActive)}
                      >
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        style={styles.actionButton}
                        onClick={() => handleEdit(user)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(user._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>👤</div>
                <h3 style={styles.emptyTitle}>No users found</h3>
                <p style={styles.emptyText}>
                  {searchTerm ? "Try a different search term" : "Create your first user to get started"}
                </p>
                <button style={styles.addButtonSmall} onClick={handleOpenModal}>
                  Add New User
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingId ? "✏️ Edit User" : "➕ Add New User"}
              </h2>
              <button style={styles.modalClose} onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={isMobile ? styles.modalMobileGrid : styles.modalGrid}>
                {/* Basic Information */}
                <div style={styles.sectionHeader}>
                  <span style={styles.sectionIcon}>👤</span>
                  Basic Information
                </div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    style={styles.input}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Mobile Number *</label>
                  <input
                    style={styles.input}
                    placeholder="9876543210"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    style={styles.input}
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password {!editingId && "*"}</label>
                  <div style={styles.passwordWrapper}>
                    <input
                      style={styles.passwordInput}
                      placeholder={editingId ? "Leave blank to keep current" : "Minimum 6 characters"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required={!editingId}
                      minLength={6}
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      style={styles.eyeButton}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Location</label>
                  <input
                    style={styles.input}
                    placeholder="Enter city/state"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Branch</label>
                  <input
                    style={styles.input}
                    placeholder="Enter branch name"
                    value={form.branch}
                    onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Role</label>
                  <select
                    style={styles.select}
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Status</label>
                  <div style={styles.radioGroup}>
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="status"
                        checked={form.status === "Active"}
                        onChange={() => setForm({ ...form, status: "Active" })}
                        style={styles.radioInput}
                      />
                      <span style={form.status === "Active" ? styles.radioActive : styles.radioText}>
                        Active
                      </span>
                    </label>
                    <label style={styles.radioLabel}>
                      <input
                        type="radio"
                        name="status"
                        checked={form.status === "Inactive"}
                        onChange={() => setForm({ ...form, status: "Inactive" })}
                        style={styles.radioInput}
                      />
                      <span style={form.status === "Inactive" ? styles.radioInactive : styles.radioText}>
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>

                {/* Address Section */}
                <div style={styles.fullWidthDesktop}>
                  <div style={styles.sectionHeader}>
                    <span style={styles.sectionIcon}>🏠</span>
                    Address Information
                  </div>
                  
                  <div style={isMobile ? styles.mobileGrid : styles.addressGrid}>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Address Name</label>
                      <input
                        style={styles.input}
                        placeholder="Recipient name (optional)"
                        value={form.addressFullName}
                        onChange={(e) => setForm({ ...form, addressFullName: e.target.value })}
                      />
                      <p style={styles.helperText}>Defaults to user name if empty</p>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Address Phone</label>
                      <input
                        style={styles.input}
                        placeholder="Contact number for address (optional)"
                        value={form.addressPhone}
                        onChange={(e) => setForm({ ...form, addressPhone: e.target.value })}
                        type="tel"
                      />
                      <p style={styles.helperText}>Defaults to user mobile if empty</p>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Address Line 1 *</label>
                      <textarea
                        style={styles.textareaSmall}
                        placeholder="House no., Building, Street, Area..."
                        value={form.addressLine1}
                        onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                        rows="2"
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>City</label>
                      <input
                        style={styles.input}
                        placeholder="City"
                        value={form.addressCity}
                        onChange={(e) => setForm({ ...form, addressCity: e.target.value })}
                      />
                      <p style={styles.helperText}>Defaults to location if empty</p>
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Pincode</label>
                      <input
                        style={styles.input}
                        placeholder="6-digit pincode"
                        value={form.addressPincode}
                        onChange={(e) => setForm({ ...form, addressPincode: e.target.value })}
                        maxLength="6"
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Set as Default Address</label>
                      <div style={styles.checkboxGroup}>
                        <input
                          type="checkbox"
                          checked={form.addressIsDefault}
                          onChange={(e) => setForm({ ...form, addressIsDefault: e.target.checked })}
                          style={styles.checkboxInput}
                        />
                        <span style={styles.checkboxText}>
                          Set this as default address
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button style={styles.submitButton} type="submit">
                  {editingId ? "Update User" : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflowX: "hidden",
  },

  header: {
    backgroundColor: "#1E293B",
    color: "white",
    padding: "24px",
    borderBottom: "1px solid #334155",
  },

  headerContent: {
    marginBottom: "20px",
  },

  headerTitle: {
    fontSize: "clamp(20px, 4vw, 28px)",
    fontWeight: "700",
    margin: "0 0 8px 0",
    textAlign: "center",
  },

  headerSubtitle: {
    fontSize: "14px",
    color: "#94A3B8",
    margin: 0,
    textAlign: "center",
  },

  headerActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },

  headerStats: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    flex: 1,
  },

  statCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "12px 16px",
    borderRadius: "10px",
    minWidth: "100px",
    flex: "1",
    maxWidth: "120px",
  },

  statNumber: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "4px",
    textAlign: "center",
  },

  statLabel: {
    fontSize: "11px",
    color: "#94A3B8",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    textAlign: "center",
  },

  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#3B82F6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
  },

  addIcon: {
    fontSize: "18px",
  },

  addButtonSmall: {
    marginTop: "16px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#3B82F6",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  mainContent: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxSizing: "border-box",
  },

  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    padding: "8px 12px",
    width: "100%",
    boxSizing: "border-box",
  },

  searchIcon: {
    marginRight: "8px",
    color: "#94A3B8",
    flexShrink: 0,
  },

  searchInput: {
    flex: "1",
    border: "none",
    outline: "none",
    fontSize: "14px",
    backgroundColor: "transparent",
    color: "#1E293B",
    minWidth: "0",
    width: "100%",
  },

  clearSearch: {
    background: "none",
    border: "none",
    color: "#94A3B8",
    cursor: "pointer",
    fontSize: "12px",
    padding: "4px 8px",
    flexShrink: 0,
  },

  tabs: {
    display: "flex",
    gap: "4px",
    backgroundColor: "white",
    padding: "4px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    overflow: "auto",
  },

  tab: {
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#64748B",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    flex: "1",
    textAlign: "center",
  },

  tabActive: {
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#1E293B",
    backgroundColor: "#F1F5F9",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flex: "1",
    textAlign: "center",
  },

  usersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: "20px",
    width: "100%",
  },

  mobileUsersGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },

  userCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    border: "1px solid #E2E8F0",
    transition: "all 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },

  userAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#3B82F6",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "600",
    flexShrink: 0,
  },

  userInfo: {
    flex: "1",
    minWidth: "150px",
  },

  userName: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#1E293B",
    margin: "0 0 4px 0",
    wordBreak: "break-word",
  },

  userEmail: {
    fontSize: "14px",
    color: "#64748B",
    margin: "0 0 4px 0",
    wordBreak: "break-word",
  },

  userMobile: {
    fontSize: "13px",
    color: "#64748B",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },

  userStatus: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    alignItems: "flex-end",
    flexShrink: 0,
  },

  statusBadge: {
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "600",
    color: "white",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
  },

  roleBadge: {
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: "500",
    color: "#64748B",
    backgroundColor: "#F1F5F9",
    borderRadius: "10px",
    whiteSpace: "nowrap",
  },

  cardBody: {
    marginBottom: "20px",
  },

  detailRow: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "10px",
    fontSize: "14px",
    flexWrap: "wrap",
  },

  detailLabel: {
    color: "#64748B",
    minWidth: "100px",
    marginRight: "12px",
    flexShrink: 0,
  },

  detailValue: {
    color: "#1E293B",
    fontWeight: "500",
    flex: "1",
    wordBreak: "break-word",
  },

  addressSection: {
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #F1F5F9",
  },

  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  defaultBadge: {
    fontSize: "10px",
    padding: "2px 6px",
    backgroundColor: "#10B981",
    color: "white",
    borderRadius: "4px",
    fontWeight: "500",
  },

  noAddress: {
    fontSize: "14px",
    color: "#94A3B8",
    fontStyle: "italic",
    textAlign: "center",
    padding: "8px",
  },

  cardFooter: {
    display: "flex",
    gap: "10px",
    paddingTop: "16px",
    borderTop: "1px solid #F1F5F9",
  },

  actionButton: {
    flex: "1",
    padding: "8px 12px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#3B82F6",
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
  },

  deleteButton: {
    flex: "1",
    padding: "8px 12px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#EF4444",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
  },

  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "white",
    borderRadius: "12px",
    border: "2px dashed #E2E8F0",
    width: "100%",
    boxSizing: "border-box",
  },

  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },

  emptyTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1E293B",
    margin: "0 0 8px 0",
  },

  emptyText: {
    fontSize: "14px",
    color: "#64748B",
    margin: 0,
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },

  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #E2E8F0",
    borderTopColor: "#3B82F6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#64748B",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
    backdropFilter: "blur(4px)",
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "700px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px",
    borderBottom: "1px solid #E2E8F0",
  },

  modalTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1E293B",
    margin: 0,
  },

  modalClose: {
    fontSize: "24px",
    color: "#64748B",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "all 0.2s",
  },

  modalGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    padding: "24px",
  },

  modalMobileGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
  },

  fullWidthDesktop: {
    gridColumn: "span 2",
  },

  modalFooter: {
    display: "flex",
    gap: "12px",
    padding: "24px",
    borderTop: "1px solid #E2E8F0",
  },

  cancelButton: {
    flex: "1",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748B",
    backgroundColor: "#F1F5F9",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  submitButton: {
    flex: "1",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#3B82F6",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  // Form styles
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#475569",
    marginBottom: "6px",
  },

  input: {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    backgroundColor: "#F8FAFC",
    transition: "all 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },

  select: {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    backgroundColor: "#F8FAFC",
    color: "#1E293B",
    width: "100%",
    boxSizing: "border-box",
  },

  passwordWrapper: {
    display: "flex",
    gap: "8px",
    width: "100%",
  },

  passwordInput: {
    flex: "1",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    backgroundColor: "#F8FAFC",
    minWidth: "0",
    boxSizing: "border-box",
  },

  eyeButton: {
    padding: "8px 12px",
    backgroundColor: "#F1F5F9",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
    flexShrink: 0,
  },

  radioGroup: {
    display: "flex",
    gap: "20px",
    marginTop: "6px",
    flexWrap: "wrap",
  },

  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
  },

  radioInput: {
    margin: 0,
  },

  radioText: {
    fontSize: "14px",
    color: "#64748B",
  },

  radioActive: {
    fontSize: "14px",
    color: "#10B981",
    fontWeight: "500",
  },

  radioInactive: {
    fontSize: "14px",
    color: "#EF4444",
    fontWeight: "500",
  },

  textareaSmall: {
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    backgroundColor: "#F8FAFC",
    resize: "vertical",
    minHeight: "60px",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },

  helperText: {
    fontSize: "12px",
    color: "#64748B",
    marginTop: "4px",
    fontStyle: "italic",
  },

  sectionHeader: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: "16px",
    gridColumn: "span 2",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingBottom: "8px",
    borderBottom: "2px solid #F1F5F9",
  },

  sectionIcon: {
    fontSize: "18px",
  },

  addressGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    width: "100%",
  },

  mobileGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },

  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
  },

  checkboxInput: {
    width: "16px",
    height: "16px",
    cursor: "pointer",
  },

  checkboxText: {
    fontSize: "14px",
    color: "#475569",
    cursor: "pointer",
  },
};

// Add CSS animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`, styleSheet.cssRules.length);

export default Users;




