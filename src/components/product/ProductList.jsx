import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const ProductList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="text-center text-gray-500">
        No products available
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard key={item._id || item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
