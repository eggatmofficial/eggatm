import { useEffect, useState } from "react";
import { getFranchises, createFranchise, updateFranchise, deleteFranchise } from "../../api/franchise.api";
import FranchiseForm from "../../components/admin/FranchiseForm";
import FranchiseTable from "../../components/admin/FranchiseTable";

// Inline CSS for this component
const styles = `
  .admin-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 1rem;
  }
  
  @media (min-width: 768px) {
    .admin-container {
      padding: 1.5rem;
    }
  }
  
  .admin-grid {
    max-width: 140rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .admin-title-section {
    flex: 1;
  }
  
  .admin-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  @media (min-width: 768px) {
    .admin-title {
      font-size: 2.25rem;
    }
  }
  
  .admin-subtitle {
    color: #4b5563;
  }
  
  .create-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
    white-space: nowrap;
  }
  
  .create-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
  }
  
  .table-container {
    background-color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }
  
  .table-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }
  
  .table-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .table-count {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .table-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .search-box {
    flex: 1;
    min-width: 200px;
    max-width: 400px;
  }
  
  .search-input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .control-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .refresh-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    color: #374151;
    transition: all 0.2s;
  }
  
  .refresh-button:hover {
    background-color: #f9fafb;
  }
  
  .editing-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #fef3c7;
    color: #92400e;
    font-size: 0.875rem;
    border-radius: 0.5rem;
    margin-left: 1rem;
  }
  
  .table-content {
    padding: 1.5rem;
  }
  
  .loading-skeleton {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .skeleton-row {
    height: 3rem;
    background-color: #e5e7eb;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
  
  /* Popup Modal Styles */
  .popup-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    animation: fadeIn 0.3s ease-out;
  }
  
  .popup-content {
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
    display: flex;
    flex-direction: column;
  }
  
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f8fafc;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  .popup-title {
    font-weight: 600;
    color: #1f2937;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .close-popup {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #6b7280;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
  }
  
  .close-popup:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
  
  .popup-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .popup-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    background-color: #f9fafb;
  }
  
  .cancel-button {
    padding: 0.5rem 1.5rem;
    background-color: white;
    color: #6b7280;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #f3f4f6;
  }
  
  /* Toast Notification Styles */
  .toast-container {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
  }
  
  .toast {
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: slideInRight 0.3s ease-out;
    transition: all 0.3s;
    max-width: 100%;
  }
  
  .toast.success {
    background-color: #f0fdf4;
    border-left: 4px solid #10b981;
    color: #065f46;
  }
  
  .toast.error {
    background-color: #fef2f2;
    border-left: 4px solid #ef4444;
    color: #991b1b;
  }
  
  .toast.info {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
    color: #1e40af;
  }
  
  .toast.warning {
    background-color: #fffbeb;
    border-left: 4px solid #f59e0b;
    color: #92400e;
  }
  
  .toast-icon {
    flex-shrink: 0;
  }
  
  .toast-content {
    flex: 1;
  }
  
  .toast-title {
    font-weight: 600;
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  
  .toast-message {
    font-size: 0.75rem;
    opacity: 0.9;
  }
  
  .toast-close {
    background: none;
    border: none;
    padding: 0.25rem;
    border-radius: 0.25rem;
    cursor: pointer;
    color: inherit;
    opacity: 0.7;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  
  .toast-close:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  /* Confirmation Modal Styles */
  .confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1500;
    padding: 1rem;
    animation: fadeIn 0.3s ease-out;
  }
  
  .confirmation-content {
    background-color: white;
    border-radius: 1rem;
    width: 100%;
    max-width: 500px;
    overflow: hidden;
    animation: slideIn 0.3s ease-out;
  }
  
  .confirmation-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f8fafc;
  }
  
  .confirmation-title {
    font-weight: 600;
    color: #1f2937;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .confirmation-body {
    padding: 1.5rem;
  }
  
  .confirmation-message {
    color: #4b5563;
    line-height: 1.5;
  }
  
  .confirmation-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    background-color: #f9fafb;
  }
  
  .confirm-button {
    padding: 0.5rem 1.5rem;
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .confirm-button:hover {
    background-color: #dc2626;
  }
  
  .cancel-confirm-button {
    padding: 0.5rem 1.5rem;
    background-color: white;
    color: #6b7280;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-confirm-button:hover {
    background-color: #f3f4f6;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  /* Scrollbar styling */
  .popup-body::-webkit-scrollbar {
    width: 6px;
  }
  
  .popup-body::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }
  
  .popup-body::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  .popup-body::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

// Toast Component
const Toast = ({ type, title, message, onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="toast-icon" style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="toast-icon" style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="toast-icon" style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="toast-icon" style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={`toast ${type} ${isExiting ? 'slideOutRight' : ''}`} style={{ animation: isExiting ? 'slideOutRight 0.3s ease-out forwards' : '' }}>
      {getIcon()}
      <div className="toast-content">
        <div className="toast-title">{title}</div>
        <div className="toast-message">{message}</div>
      </div>
      <button className="toast-close" onClick={onClose}>
        ✕
      </button>
    </div>
  );
};

export default function FranchiseAdmin() {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const load = async () => {
    try {
      setLoading(true);
      const res = await getFranchises();
      setList(res.data.data);
      setFilteredList(res.data.data);
      addToast('success', 'Data Loaded', 'Franchise outlets loaded successfully');
    } catch (error) {
      console.error("Failed to load franchises:", error);
      addToast('error', 'Load Failed', 'Failed to load franchise outlets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredList(list);
    } else {
      const filtered = list.filter(item =>
        item.shopName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchTerm, list]);

  const submit = async (data) => {
    try {
      if (edit) {
        await updateFranchise(edit._id, data);
        addToast('success', 'Outlet Updated', `${data.shopName} has been updated successfully`);
      } else {
        await createFranchise(data);
        addToast('success', 'Outlet Created', `${data.shopName} has been created successfully`);
      }
      
      setEdit(null);
      setShowPopup(false);
      load();
    } catch (error) {
      console.error("Failed to save franchise:", error);
      addToast('error', 'Save Failed', error.message || 'Failed to save outlet');
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteItem(item);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;
    
    try {
      setDeleting(true);
      await deleteFranchise(deleteItem._id);
      addToast('success', 'Outlet Deleted', `${deleteItem.shopName} has been deleted successfully`);
      load();
    } catch (error) {
      console.error("Failed to delete franchise:", error);
      addToast('error', 'Delete Failed', error.message || 'Failed to delete outlet');
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
      setDeleteItem(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteItem(null);
  };

  const handleCreateClick = () => {
    setEdit(null);
    setShowPopup(true);
  };

  const handleEditClick = (item) => {
    setEdit(item);
    setShowPopup(true);
  };

  const handleCancelEdit = () => {
    setEdit(null);
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEdit(null);
  };

  return (
    <>
      <style>{styles}</style>
      
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && deleteItem && (
        <div className="confirmation-modal" onClick={cancelDelete}>
          <div className="confirmation-content" onClick={(e) => e.stopPropagation()}>
            <div className="confirmation-header">
              <h3 className="confirmation-title">
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Delete Outlet
              </h3>
            </div>
            
            <div className="confirmation-body">
              <p className="confirmation-message">
                Are you sure you want to delete <strong>{deleteItem.shopName}</strong>? 
                This action cannot be undone.
              </p>
            </div>
            
            <div className="confirmation-footer">
              <button
                type="button"
                onClick={cancelDelete}
                className="cancel-confirm-button"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="confirm-button"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Outlet'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Form Popup Modal */}
      {showPopup && (
        <div className="popup-modal" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3 className="popup-title">
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {edit ? "Edit Outlet" : "Create New Outlet"}
              </h3>
              
              <button
                type="button"
                onClick={handleClosePopup}
                className="close-popup"
              >
                ✕
              </button>
            </div>
            
            <div className="popup-body">
              <FranchiseForm 
                onSubmit={submit} 
                initialData={edit}
                onCancel={handleCancelEdit}
                isEditing={!!edit}
              />
            </div>
            
            <div className="popup-footer">
              <button
                type="button"
                onClick={handleClosePopup}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="admin-container">
        <div className="admin-grid">
          <header className="admin-header">
            <div className="admin-title-section">
              <h1 className="admin-title">Franchise Management</h1>
              <p className="admin-subtitle">Manage your franchise outlets and locations</p>
            </div>
            
            <button
              onClick={handleCreateClick}
              className="create-button"
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Outlet
            </button>
          </header>

          <div className="table-container">
            <div className="table-header">
              <div className="table-title">
                All Outlets 
                <span className="table-count"> ({list.length} total)</span>
                {edit && (
                  <span className="editing-badge">
                    <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editing: {edit.shopName}
                  </span>
                )}
              </div>
              
              <div className="table-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search outlets by name, city, or address..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="control-buttons">
                  <button
                    onClick={load}
                    className="refresh-button"
                    disabled={loading}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {loading ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
              </div>
            </div>

            <div className="table-content">
              {loading ? (
                <div className="loading-skeleton">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="skeleton-row"></div>
                    ))}
                  </div>
                </div>
              ) : (
                <FranchiseTable 
                  data={filteredList} 
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                  isLoading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}