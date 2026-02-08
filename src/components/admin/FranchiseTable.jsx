import { useState } from "react";

const tableStyles = `
  .table-container {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: slideUpTable 0.5s ease-out;
  }
  
  .table-scroll {
    overflow-x: auto;
  }
  
  .table {
    width: 100%;
    min-width: 768px;
  }
  
  .table-header {
    background: linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%);
    border-bottom: 1px solid #e5e7eb;
  }
  
  .table-header th {
    padding: 1rem 1.5rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
    font-size: 0.875rem;
  }
  
  .table-row {
    border-bottom: 1px solid #f3f4f6;
    transition: all 0.3s ease;
  }
  
  .table-row:hover {
    background-color: #eff6ff;
    transform: scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .table-cell {
    padding: 1rem 1.5rem;
  }
  
  .outlet-name {
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }
  
  .outlet-address {
    font-size: 0.75rem;
    color: #6b7280;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
  }
  
  .contact-chips {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
    flex-wrap: wrap;
  }
  
  .contact-chip {
    font-size: 0.625rem;
    padding: 0.125rem 0.375rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 0.25rem;
  }
  
  .more-contacts {
    font-size: 0.625rem;
    color: #6b7280;
  }
  
  .city-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    animation: pulseSubtle 2s infinite;
  }
  
  .status-active {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .status-inactive {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .status-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    margin-right: 0.25rem;
  }
  
  .active-dot {
    background-color: #10b981;
  }
  
  .inactive-dot {
    background-color: #ef4444;
  }
  
  .action-buttons {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .edit-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
  }
  
  .edit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
  }
  
  .delete-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
  }
  
  .delete-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);
  }
  
  .edit-tooltip {
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1f2937;
    color: white;
    font-size: 0.625rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  
  .delete-tooltip {
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1f2937;
    color: white;
    font-size: 0.625rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  
  .edit-button:hover .edit-tooltip {
    opacity: 1;
  }
  
  .delete-button:hover .delete-tooltip {
    opacity: 1;
  }
  
  .table-footer {
    padding: 1rem 1.5rem;
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
  }
  
  .footer-stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.75rem;
    color: #4b5563;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .stat-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
  
  .active-dot-stat {
    background-color: #10b981;
  }
  
  .inactive-dot-stat {
    background-color: #ef4444;
  }
  
  .total-count {
    margin-left: auto;
    color: #1f2937;
    font-weight: 600;
  }
  
  .empty-state {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 3rem;
    text-align: center;
    animation: fadeIn 0.3s ease-out;
  }
  
  .empty-icon {
    color: #d1d5db;
    margin: 0 auto 1rem;
  }
  
  .empty-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .empty-message {
    color: #9ca3af;
    font-size: 0.875rem;
  }
  
  @keyframes slideUpTable {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulseSubtle {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default function FranchiseTable({ data, onEdit, onDelete, isLoading }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  if (data.length === 0 && !isLoading) {
    return (
      <>
        <style>{tableStyles}</style>
        <div className="empty-state">
          <svg className="empty-icon" style={{ width: '4rem', height: '4rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="empty-title">No outlets found</h3>
          <p className="empty-message">Add your first franchise outlet using the form</p>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{tableStyles}</style>
      <div className="table-container">
        <div className="table-scroll">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Outlet
                  </div>
                </th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((fr, index) => (
                <tr
                  key={fr._id}
                  className={`table-row ${hoveredRow === index ? 'hovered-row' : ''}`}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="table-cell">
                    <div>
                      <p className="outlet-name">{fr.shopName}</p>
                      <p className="outlet-address">{fr.address}</p>
                      <div className="contact-chips">
                        {fr.contact && fr.contact.slice(0, 2).map((num, i) => (
                          <span key={i} className="contact-chip">{num}</span>
                        ))}
                        {fr.contact && fr.contact.length > 2 && (
                          <span className="more-contacts">+{fr.contact.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="city-badge">{fr.city}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${fr.isActive ? 'status-active' : 'status-inactive'}`}>
                      <span className={`status-dot ${fr.isActive ? 'active-dot' : 'inactive-dot'}`}></span>
                      {fr.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="action-buttons">
                      <button
                        onClick={() => onEdit && onEdit(fr)}
                        className="edit-button"
                      >
                        <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                        <span className="edit-tooltip">Edit this outlet</span>
                      </button>
                      
                      <button
                        onClick={() => onDelete && onDelete(fr)}
                        className="delete-button"
                      >
                        <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                        <span className="delete-tooltip">Delete this outlet</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="table-footer">
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-dot active-dot-stat"></span>
              Active: {data.filter(f => f.isActive).length}
            </div>
            <div className="stat-item">
              <span className="stat-dot inactive-dot-stat"></span>
              Inactive: {data.filter(f => !f.isActive).length}
            </div>
            <div className="total-count">
              Total: <span style={{ fontWeight: 'bold' }}>{data.length}</span> outlets
            </div>
          </div>
        </div>
      </div>
    </>
  );
}