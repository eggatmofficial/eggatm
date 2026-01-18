import { NavLink, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiPackage, 
  FiShoppingBag, 
  FiUsers,
  FiTrendingUp,
  FiMail,
  FiMessageSquare,
  FiLogOut,
  FiBox,
  FiBarChart2
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth.store"; 

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "bg-gradient-to-r from-[#faa807] to-[#ffb62e] text-white shadow-lg"
         : "text-white/80 hover:bg-white/10 hover:text-white hover:pl-6"
     }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50">
      {/* LOGO */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#faa807] to-[#ffb62e] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              Admin Panel
            </h1>
            <p className="text-xs text-white/60">Control Center</p>
          </div>
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="mt-6 px-3 space-y-1">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <FiHome className="text-lg" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          <FiShoppingBag className="text-lg" />
          Products
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <FiUsers className="text-lg" />
          Users
        </NavLink>

        {/* Changed orders icon to FiPackage */}
        <NavLink to="/admin/orders" className={linkClass}>
          <FiPackage className="text-lg" /> {/* Changed from FiUsers to FiPackage */}
          Orders
        </NavLink>

        <NavLink to="/admin/stocks" className={linkClass}>
          <FiTrendingUp className="text-lg" />
          Stocks
        </NavLink>


        <NavLink to="/admin/newsletter" className={linkClass}>
          <FiMail className="text-lg" />
          Newsletter
        </NavLink>

        <NavLink to="/admin/contacts" className={linkClass}>
          <FiMessageSquare className="text-lg" />
          Contact Queries
        </NavLink>
      </nav>

      {/* Logout Button at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>

      </div>


    </aside>
  );
};

export default AdminSidebar;