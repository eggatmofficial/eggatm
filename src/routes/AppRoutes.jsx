
// import { Routes, Route } from "react-router-dom";
// import { lazy, Suspense } from "react";
// import PageLoader from "../components/common/PageLoader";
// import ProtectedAdminRoute from "./ProtectedAdminRoute";
// import UserLayout from "../components/layout/UserLayout";

// // ==============================
// // LAZY LOAD ALL COMPONENTS
// // ==============================

// // User Pages
// const Home = lazy(() => import("../pages/Home"));
// const Products = lazy(() => import("../pages/Products"));
// const ProductDetails = lazy(() => import("../components/product/ProductDetails"));
// const Cart = lazy(() => import("../pages/Cart"));
// const Checkout = lazy(() => import("../pages/Checkout"));
// const Login = lazy(() => import("../pages/Login"));
// const Profile = lazy(() => import("../pages/Profile"));
// const About = lazy(() => import("../pages/About"));
// const Contact = lazy(() => import("../pages/Contact"));
// const Terms = lazy(() => import("../pages/Terms"));
// const ShippingPolicy = lazy(() => import("../pages/ShippingPolicy"));
// const Franchise = lazy(() => import("../pages/franchise"));
// const NotFound = lazy(() => import("../components/common/NotFound"));

// // Admin Components (DO NOT lazy load AdminLayout)
// import AdminLayout from "../components/layout/AdminLayout";
// import AdminProductStock from "../pages/admin/AdminProductStock";
// import ContactList from "../pages/admin/ContactList";
// import NewsletterList from "../pages/admin/NewsletterList";

// const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
// const Banner = lazy(() => import("../components/admin/Banner"));
// const Product = lazy(() => import("../components/admin/Product"));
// const Users = lazy(() => import("../components/admin/Users"));
// const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
// const AdminOrderDetails = lazy(() => import("../pages/admin/AdminOrderDetails"));
// const Newsletter = lazy(() => import("../pages/admin/NewsletterList"));
// const ContactUs = lazy(() => import("../pages/admin/ContactList"));

// const AppRoutes = () => {
//   return (
//     <Suspense fallback={<PageLoader />}>
//       <Routes>
//         {/* ============================== */}
//         {/* USER ROUTES */}
//         {/* ============================== */}
//         <Route element={<UserLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/products/:id" element={<ProductDetails />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/aboutus" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/terms-and-conditions" element={<Terms />} />
//           <Route path="/shipping-policy" element={<ShippingPolicy />} />
//           <Route path="/franchise" element={<Franchise />} />
//         </Route>

//         {/* ============================== */}
//         {/* AUTH ROUTES */}
//         {/* ============================== */}
//         <Route path="/login" element={<Login />} />

//         {/* ============================== */}
//         {/* ADMIN ROUTES */}
//         {/* ============================== */}
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedAdminRoute>
//               <Routes>
//                 <Route element={<AdminLayout />}>
//                   <Route index element={<AdminDashboard />} />
//                   <Route path="dashboard" element={<AdminDashboard />} />
//                   <Route path="banners" element={<Banner />} />
//                   <Route path="products" element={<Product />} />
//                   <Route path="users" element={<Users />} />
//                   <Route path="orders" element={<AdminOrders />} />
//                   <Route path="orders/:id" element={<AdminOrderDetails/>} />
//                   <Route path="stocks" element={<AdminProductStock />} />
//                   <Route path="/admin/newsletter" element={<NewsletterList />} />
//                   <Route path="/admin/contacts" element={<ContactList />} />
//                 </Route>
//               </Routes>
//             </ProtectedAdminRoute>
//           }
//         />

//         {/* ============================== */}
//         {/* 404 ROUTE */}
//         {/* ============================== */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default AppRoutes;



import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PageLoader from "../components/common/PageLoader";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";

// User Pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../components/product/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Login = lazy(() => import("../pages/Login"));
const Profile = lazy(() => import("../pages/Profile"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Terms = lazy(() => import("../pages/Terms"));
const ShippingPolicy = lazy(() => import("../pages/ShippingPolicy"));
const Franchise = lazy(() => import("../pages/Franchise"));
const NotFound = lazy(() => import("../components/common/NotFound"));

// Admin Pages
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const Banner = lazy(() => import("../components/admin/Banner"));
const Product = lazy(() => import("../components/admin/Product"));
const Users = lazy(() => import("../components/admin/Users"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
const AdminOrderDetails = lazy(() => import("../pages/admin/AdminOrderDetails"));
const AdminProductStock = lazy(() => import("../pages/admin/AdminProductStock"));
const NewsletterList = lazy(() => import("../pages/admin/NewsletterList"));
const ContactList = lazy(() => import("../pages/admin/ContactList"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/franchise" element={<Franchise />} />
        </Route>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="banners" element={<Banner />} />
          <Route path="products" element={<Product />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetails />} />
          <Route path="stocks" element={<AdminProductStock />} />
          <Route path="newsletter" element={<NewsletterList />} />
          <Route path="contacts" element={<ContactList />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;









