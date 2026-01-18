import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow animate-pulse overflow-hidden">
      
      {/* Image Skeleton */}
      <div className="h-44 w-full bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-9 bg-gray-200 rounded-lg w-full"></div>
          <div className="h-9 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
