

import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useState, useEffect } from "react";

const AdminLayout = () => {
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

  // Calculate main content margin
  const getMainContentMargin = () => {
    if (windowWidth < 1024) {
      return "ml-0"; // Mobile/tablet: no margin
    }
    return isCollapsed ? "ml-20" : "ml-64"; // Desktop: depends on sidebar
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <AdminHeader />
      
      {/* Main Content Area */}
      <main className={`
        pt-16 min-h-screen transition-all duration-300 ease-in-out
        ${getMainContentMargin()}
      `}>
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;