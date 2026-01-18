import { FiLogOut, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#1f2937] text-white shadow flex items-center justify-between px-6 z-40">
      
      {/* LEFT : TITLE */}
      <div>
        <h2 className="text-lg font-semibold text-white">
         Welcome to {user?.name || "Admin"}
        </h2>
        <p className="text-xs text-white">
          Manage orders, products, users & stock
        </p>
      </div>

      {/* RIGHT : ADMIN INFO */}
      <div className="flex items-center gap-4">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-white">
            {user?.name || "Admin"}
          </p>
          <p className="text-xs text-white">
            {user?.role === "admin" ? "Administrator" : "Staff"}
          </p>
        </div>

        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <FiUser className="text-lg text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
