
import { useState, useEffect } from "react";
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
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiBox,
  FiMapPin,
  FiSend,
  FiBriefcase
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth.store";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Auto-responsive behavior
      if (width < 1024) {
        // Mobile/Tablet: Sidebar hidden by default
        setIsMobileOpen(false);
        setIsCollapsed(false);
      } else if (width >= 1024 && width < 1280) {
        // Laptop: Collapsed sidebar
        setIsCollapsed(true);
      } else {
        // Desktop: Full sidebar
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleSidebar = () => {
    if (windowWidth >= 1024) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  // Navigation items
  const navItems = [
    { to: "/admin/dashboard", icon: <FiHome />, label: "Dashboard" },
    { to: "/admin/products", icon: <FiShoppingBag />, label: "Products" },
    { to: "/admin/users", icon: <FiUsers />, label: "Users" },
    { to: "/admin/outlets", icon: <FiMapPin />, label: "Outlets" },
    { to: "/admin/orders", icon: <FiPackage />, label: "Orders" },
    { to: "/admin/shipping", icon: < FiSend />, label: "Shipping" },
    { to: "/admin/stocks", icon: <FiTrendingUp />, label: "Stocks" },
    { to: "/admin/newsletter", icon: <FiMail />, label: "Newsletter" },
    { to: "/admin/contacts", icon: <FiMessageSquare />, label: "Contacts" },
  ];

  // Link class function
  const linkClass = ({ isActive }) => {
    const baseClasses = "flex items-center rounded-lg transition-all duration-200 ease-in-out";
    const activeClasses = isActive 
      ? "bg-gradient-to-r from-[#faa807] to-[#ffb62e] text-white shadow-md" 
      : "text-white/80 hover:bg-white/10 hover:text-white";
    
    if (isCollapsed && windowWidth >= 1024) {
      // Collapsed state: centered icons only
      return `${baseClasses} justify-center p-3 mx-2 my-1 ${activeClasses}`;
    }
    
    // Expanded state: icons + text
    return `${baseClasses} gap-3 px-4 py-3 mx-2 my-1 ${activeClasses}`;
  };

  // Desktop Sidebar Content
  const DesktopSidebar = () => (
    <aside className={`
      hidden lg:flex flex-col
      h-screen bg-gradient-to-b from-gray-900 to-gray-800 
      shadow-2xl fixed left-0 top-0 z-40
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Logo Section */}
      <div className="h-16 border-b border-white/10 flex items-center px-4">
        {isCollapsed ? (
          <div className="w-10 h-10 bg-gradient-to-r from-[#faa807] to-[#ffb62e] rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">A</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 bg-gradient-to-r from-[#faa807] to-[#ffb62e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-white/60">Control Center</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink 
            key={item.to}
            to={item.to}
            className={linkClass}
            title={isCollapsed ? item.label : ""}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        {/* Collapse Toggle Button */}
        {windowWidth >= 1024 && (
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 mb-3 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <FiChevronRight className="text-xl" />
            ) : (
              <FiChevronLeft className="text-xl" />
            )}
          </button>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center justify-center gap-2 
            p-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 
            text-white hover:from-red-600 hover:to-red-700 
            transition-all duration-200 shadow-md hover:shadow-lg
            ${isCollapsed ? "p-3" : ""}
          `}
          title={isCollapsed ? "Logout" : ""}
        >
          <FiLogOut className="text-xl" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );

  // Mobile Sidebar Content
  const MobileSidebar = () => (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
        onClick={closeMobileSidebar}
      />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50 animate-slideInLeft">
        {/* Mobile Header */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#faa807] to-[#ffb62e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Panel</h1>
            </div>
          </div>
          <button
            onClick={closeMobileSidebar}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg 
                transition-all duration-200
                ${isActive 
                  ? "bg-gradient-to-r from-[#faa807] to-[#ffb62e] text-white shadow-md" 
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }
              `}
              onClick={closeMobileSidebar}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
          
          {/* Mobile Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              closeMobileSidebar();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
          >
            <FiLogOut className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Menu Button - Only show on mobile/tablet */}
      {windowWidth < 1024 && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-[#faa807] to-[#ffb62e] text-white rounded-lg shadow-lg lg:hidden hover:shadow-xl transition-all duration-200"
        >
          <FiMenu className="text-xl" />
        </button>
      )}

      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Sidebar with Overlay */}
      {windowWidth < 1024 && isMobileOpen && <MobileSidebar />}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out forwards;
        }
        
        .animate-slideOutLeft {
          animation: slideOutLeft 0.3s ease-in forwards;
        }
        
        /* Custom scrollbar for sidebar */
        aside nav::-webkit-scrollbar {
          width: 4px;
        }
        
        aside nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        aside nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        aside nav::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;