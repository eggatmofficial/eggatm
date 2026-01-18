// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import ProductList from "./ProductList";
// import { getProductsAPI } from "../../api/product.api";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [searchParams] = useSearchParams();
//   const search = searchParams.get("search") || "";

//   useEffect(() => {
//     fetchProducts();
//   }, [search]); // 🔥 LIVE TRACKING TRIGGER

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await getProductsAPI({
//         search, // send to backend
//       });

//       setProducts(res.data.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-6">
//       <ProductList products={products} loading={loading} />
//     </div>
//   );
// };

// export default Products;











//authenticate for product route

import React, { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";
import * as productAPI from "../api/product.api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    } else {
      setLoading(false);
      // Don't redirect here - just show the login prompt
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      const allProducts = response.data?.data || [];

      // ✅ SHOW ONLY ACTIVE PRODUCTS IN USER PANEL
      const activeProducts = allProducts.filter(
        (product) => product.isActive === true
      );

      setProducts(activeProducts);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  // If not authenticated, show login prompt UI (NOT redirect)
  if (!isAuthenticated) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🔒 Access Restricted
            </h1>
            <p className="text-gray-600 text-lg">
              Please login to browse our products
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-3xl">🛒</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Login Required
              </h2>
              <p className="text-gray-600">
                Our products are exclusively available to registered customers.
                Login to explore our fresh and hygienic egg collection.
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 px-4 bg-[#faa807] text-white font-semibold rounded-lg hover:bg-[#e69806] transition duration-300 shadow-md hover:shadow-lg"
              >
                Go to Login
              </button>
              
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition duration-300"
              >
                Back to Home
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                New customer? You can register during login.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Our Products
        </h1>
        <p className="text-gray-500 mt-2">
          Fresh • Hygienic • Premium Quality
        </p>
      </div>

      <ProductList products={products} loading={loading} />
    </section>
  );
};

export default Products;