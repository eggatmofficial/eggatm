

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // ⏳ WAIT for profile to load
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but not admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow admin
  return children;
};

export default ProtectedAdminRoute;
