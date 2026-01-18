import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "../components/common/PageLoader";
import Orders from "../components/admin/Orders";
import AdminProductStock from "../pages/admin/AdminProductStock";

// ✅ Lazy imports ONLY
const AdminLayout = lazy(() =>
  import("../components/layout/AdminLayout")
);
const AdminDashboard = lazy(() =>
  import("../pages/AdminDashboard")
);
const Banner = lazy(() =>
  import("../components/admin/Banner")
);
const Product = lazy(() =>
  import("../components/admin/Product")
);
const Users = lazy(() =>
  import("../components/admin/Users")
);
const AdminOrders = lazy(() =>
  import("../components/admin/Orders")
);
const AdminOrderDetails = lazy(() =>
  import("../components/admin/OrderDetails")
);

const AdminRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="banners" element={<Banner />} />
          <Route path="products" element={<Product />} />
          <Route path="users" element={<Users />} />
      
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;
