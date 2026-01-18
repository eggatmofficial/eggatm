import React, { useEffect, useState } from "react";
import ProductList from "../components/product/ProductList";
import * as productAPI from "../api/product.api"

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
       const response = await productAPI.getAllProducts();

    const allProducts = response.data?.data || [];

    console.log("all products",allProducts);
    

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
