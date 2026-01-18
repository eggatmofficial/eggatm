import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* FIXED SIDEBAR */}
      <AdminSidebar />

      {/* FIXED HEADER */}
      <AdminHeader />

      {/* CONTENT AREA */}
      <main className="ml-64 pt-20 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
