import { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaImage } from "react-icons/fa";

const Banner = () => {
  // 🔹 Dummy Banner Data
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Big Sale Banner",
      image:
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200",
      active: true,
    },
    {
      id: 2,
      title: "Festival Offer",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200",
      active: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [form, setForm] = useState({
    title: "",
    image: "",
    active: true,
  });

  /* ---------------- HANDLERS ---------------- */

  const openAddModal = () => {
    setEditingBanner(null);
    setForm({ title: "", image: "", active: true });
    setShowModal(true);
  };

  const openEditModal = (banner) => {
    setEditingBanner(banner);
    setForm(banner);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.image) {
      alert("Title & Image URL required");
      return;
    }

    if (editingBanner) {
      // UPDATE
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id ? { ...form, id: b.id } : b
        )
      );
    } else {
      // CREATE
      setBanners((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this banner?")) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Banner Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-[#faa807] text-black px-5 py-2 rounded-lg font-semibold"
        >
          <FaPlus /> Add Banner
        </button>
      </div>

      {/* BANNER LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">
                {banner.title}
              </h3>

              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    banner.active
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {banner.active ? "Active" : "Inactive"}
                </span>
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEditModal(banner)}
                  className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={() => handleDelete(banner.id)}
                  className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 text-red-600 hover:bg-red-50"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingBanner ? "Edit Banner" : "Add Banner"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Banner Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />
                <label className="text-sm">
                  Active Banner
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#faa807] rounded-lg font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
