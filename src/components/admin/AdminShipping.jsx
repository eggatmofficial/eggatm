import { useEffect, useState } from "react";
import {
  getShippingPrices,
  createShippingPrice,
  updateShippingPrice,
  deleteShippingPrice,
} from "/src/api/shipping.api.js";

// Toast component
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" 
    ? "bg-gradient-to-r from-green-500 to-emerald-600" 
    : "bg-gradient-to-r from-red-500 to-rose-600";

  const icon = type === "success" ? (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className={`fixed top-6 right-6 z-50 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slideIn min-w-80`}>
      {icon}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-white/80 hover:text-white"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function AdminShipping() {
  const [slabs, setSlabs] = useState([]);
  const [form, setForm] = useState({
    minWeight: "",
    maxWeight: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const loadSlabs = async () => {
    try {
      const res = await getShippingPrices();
      setSlabs(res.data.data);
    } catch (err) {
      showToast("Failed to load shipping slabs", "error");
    }
  };

  useEffect(() => {
    loadSlabs();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await updateShippingPrice(editId, form);
        showToast("Shipping slab updated successfully!", "success");
      } else {
        await createShippingPrice(form);
        showToast("Shipping slab added successfully!", "success");
      }
      setForm({ minWeight: "", maxWeight: "", price: "" });
      setEditId(null);
      loadSlabs();
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({
      minWeight: s.minWeight,
      maxWeight: s.maxWeight,
      price: s.price,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipping slab?")) return;
    try {
      await deleteShippingPrice(id);
      showToast("Shipping slab deleted successfully!", "success");
      loadSlabs();
    } catch (err) {
      showToast("Failed to delete shipping slab", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="admin-shipping">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}

      {/* FORM SECTION */}
      <div className="card">
        <div className="card-header">
          <h2>Shipping Price Management</h2>
          {editId && <span className="edit-badge">Editing</span>}
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="shipping-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Min Weight (grams)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="minWeight"
                    placeholder="0"
                    value={form.minWeight}
                    onChange={handleChange}
                    required
                    min="0"
                    className="form-input"
                  />
                  <span className="input-unit">g</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Max Weight (grams)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="maxWeight"
                    placeholder="1000"
                    value={form.maxWeight}
                    onChange={handleChange}
                    required
                    min="0"
                    className="form-input"
                  />
                  <span className="input-unit">g</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Price</label>
                <div className="relative">
                  <span className="input-currency">₹</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="20.00"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="form-input pl-10"
                  />
                  <span className="input-unit">INR</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center justify-center gap-3 py-3 px-8 rounded-2xl font-semibold text-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {editId ? "Updating..." : "Adding..."}
                  </>
                ) : editId ? "Update Slab" : "Add Slab"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ minWeight: "", maxWeight: "", price: "" });
                  }}
                  className="group flex items-center justify-center gap-3 py-3 px-8 rounded-2xl font-semibold text-lg bg-yellow-500 text-gray-800 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="card">
        <div className="card-header">
          <h2>Configured Shipping Slabs</h2>
          <span className="badge">{slabs.length} slab{slabs.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <th className="table-header">MIN WEIGHT</th>
                  <th className="table-header">MAX WEIGHT</th>
                  <th className="table-header">PRICE</th>
                  <th className="table-header">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {slabs.map((s) => (
                  <tr key={s._id} className="border-b border-gray-100 hover:bg-amber-50/50 transition-colors">
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{s.minWeight}</span>
                        <span className="text-sm text-gray-500">g</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{s.maxWeight}</span>
                        <span className="text-sm text-gray-500">g</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-600 font-bold">₹</span>
                        <span className="font-semibold">{s.price}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="group flex items-center gap-2 py-2 px-4 rounded-xl font-medium text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="group flex items-center gap-2 py-2 px-4 rounded-xl font-medium text-sm bg-red-500 text-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {slabs.length === 0 && (
                  <tr>
                    <td colSpan="4" className="table-cell text-center py-12">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No shipping slabs configured</h3>
                        <p>Add your first shipping slab using the form above</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-shipping {
          padding: 1.5rem;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Segoe UI', Helvetica, Arial, sans-serif;
        }

        /* Toast animation */
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

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        /* HEADER */
        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          margin: 0.5rem 0 0;
          color: #6b7280;
          font-size: 1rem;
        }

        /* CARD */
        .card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          margin-bottom: 2rem;
          overflow: hidden;
          border: 1px solid #f3f4f6;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%);
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .card-body {
          padding: 1.5rem;
        }

        /* BADGES */
        .badge {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #92400e;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #fbbf24;
        }

        .edit-badge {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          color: #92400e;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid #fbbf24;
        }

        /* FORM */
        .shipping-form {
          margin-top: 0.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: all 0.2s;
          width: 100%;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .form-input.pl-10 {
          padding-left: 2.5rem;
        }

        .relative {
          position: relative;
        }

        .input-unit {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-size: 0.875rem;
          background: #f9fafb;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
        }

        .input-currency {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #f59e0b;
          font-weight: 600;
          font-size: 1rem;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* TABLE */
        .table-header {
          padding: 1rem 1.5rem;
          text-align: left;
          font-weight: 600;
          color: #92400e;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .table-cell {
          padding: 1rem 1.5rem;
          color: #374151;
          font-size: 0.95rem;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .admin-shipping {
            padding: 1rem;
          }

          .card-body {
            padding: 1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-actions {
            flex-direction: column;
          }

          .page-header h1 {
            font-size: 1.75rem;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .admin-shipping {
            padding: 0.75rem;
          }

          .table-cell {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}