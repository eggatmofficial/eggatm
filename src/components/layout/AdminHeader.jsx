

import { FiUser } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Match sidebar collapse state
      if (width >= 1024 && width < 1280) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate header position
  const getHeaderPosition = () => {
    if (windowWidth < 1024) {
      return "left-0"; // Mobile/tablet: full width
    }
    return isCollapsed ? "left-20" : "left-64"; // Desktop: depends on sidebar state
  };

  return (
    <header className={`
      fixed top-0 h-16 bg-white shadow-sm border-b
      flex items-center justify-between px-4 md:px-6
      transition-all duration-300 ease-in-out z-30
      ${getHeaderPosition()} right-0
    `}>
      
      {/* Left Section */}
      <div className="flex items-center">
        <div className="lg:hidden mr-4">
          <div className="w-8 h-8 bg-gradient-to-r from-[#faa807] to-[#ffb62e] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
        </div>
        
        <div className="ml-3 sm:ml-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800">
            Welcome, {user?.name || "Admin"}
          </h2>
          <p className="text-sm text-gray-500">Administrator Dashboard</p>
        </div>
      </div>

      {/* Right Section - User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-800">{user?.name || "Admin"}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role === "admin" ? "Administrator" : "Staff"}</p>
        </div>
        
        <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
          <FiUser className="text-gray-600 text-lg" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;