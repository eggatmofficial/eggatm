


// import { useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import * as productAPI from "../../api/product.api";
// import { FiStar, FiShoppingCart, FiPackage, FiTruck, FiShield, FiHeart, FiShare2 } from "react-icons/fi";
// import { useDispatch } from "react-redux";
// import { setCartFromBackend } from "../../store/cart.store";
// import { addToCartAPI } from "../../api/cart.api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { startCheckout } from "../../store/checkout.store";

// const LENS_SIZE = 200;
// const ZOOM = 3;
// const PRIMARY = "#faa807";
// const PRIMARY_GRADIENT = "linear-gradient(135deg, #faa807 0%, #ffd13d 100%)";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const imgRef = useRef(null);
//   const lensRef = useRef(null);
//   const animationFrameRef = useRef(null);

//   const [product, setProduct] = useState(null);
//   const [activeImg, setActiveImg] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [zoom, setZoom] = useState({
//     active: false,
//     x: 0,
//     y: 0,
//     bgX: "50%",
//     bgY: "50%",
//     scale: 0,
//     opacity: 0
//   });
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   /* ---------- FETCH PRODUCT ---------- */
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await productAPI.getProductById(id);
//         console.log("single product", data.data?.data);
//         const productData = data.data?.data;
//         setProduct(productData);
        
//         // Set first image as active
//         if (productData?.images && productData.images.length > 0) {
//           setActiveImg(productData.images[0]);
//         } else if (productData?.mainImage) {
//           setActiveImg(productData.mainImage);
//         }
        
//         // Set first variant as selected
//         if (productData?.variants && productData.variants.length > 0) {
//           setSelectedVariant(productData.variants[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     })();
//   }, [id]);

//   // Function to get stock status
//   const getStockStatus = (stock) => {
//     if (stock === undefined || stock === null) {
//       return {
//         text: "In Stock",
//         color: "text-green-600",
//         bg: "bg-green-100",
//         border: "border-green-200",
//         badgeBg: "bg-gradient-to-r from-green-500 to-emerald-500",
//         isAvailable: true
//       };
//     }
    
//     if (stock === 0) {
//       return {
//         text: "Out of Stock",
//         color: "text-red-600",
//         bg: "bg-red-100",
//         border: "border-red-200",
//         badgeBg: "bg-gradient-to-r from-red-500 to-pink-500",
//         isAvailable: false
//       };
//     } else if (stock <= 5) {
//       return {
//         text: `Low Stock (${stock})`,
//         color: "text-orange-600",
//         bg: "bg-orange-100",
//         border: "border-orange-200",
//         badgeBg: "bg-gradient-to-r from-orange-500 to-yellow-500",
//         isAvailable: true
//       };
//     } else {
//       return {
//         text: `In Stock (${stock})`,
//         color: "text-green-600",
//         bg: "bg-green-100",
//         border: "border-green-200",
//         badgeBg: "bg-gradient-to-r from-green-500 to-emerald-500",
//         isAvailable: true
//       };
//     }
//   };

//   // Get current stock status
//   const stockStatus = getStockStatus(selectedVariant?.stock);

//   /* ---------- HANDLE ACTIONS ---------- */
//   const handleAddToCart = async () => {
//     if (!product || !stockStatus.isAvailable) return;

//     if (!isAuthenticated) {
//       navigate("/login", {
//         state: { from: `/products/${id}` },
//       });
//       return;
//     }

//     try {
//       const payload = {
//         productId: product._id,
//         variantLabel: selectedVariant.label,
//         quantity,
//       };

//       const res = await addToCartAPI(payload);

//       // 🔥 Redux mirrors backend cart
//       dispatch(setCartFromBackend(res.data.data));

//       toast.success("Added to cart 🛒");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to add to cart"
//       );
//     }
//   };

//   const handleBuyNow = () => {
//     if (!product || !stockStatus.isAvailable) return;

//     if (!isAuthenticated) {
//       navigate("/login", {
//         state: { from: `/products/${id}` },
//       });
//       return;
//     }

//     const price = selectedVariant?.discountedPrice ?? selectedVariant?.price ?? 0;
    
//     dispatch(
//       startCheckout([
//      {  
//        productId: product._id,
//         name: product.name,
//         price,
//         image: activeImg,
//         quantity,
//         variantLabel: selectedVariant.label,
//         totalPrice: price * quantity,
//       }
//       ])
//     );

//     navigate("/checkout");
//   };

//   /* ---------- SMOOTH ZOOM ANIMATION ---------- */
//   const updateZoom = (clientX, clientY) => {
//     if (!imgRef.current) return;
    
//     cancelAnimationFrame(animationFrameRef.current);
    
//     animationFrameRef.current = requestAnimationFrame(() => {
//       const rect = imgRef.current.getBoundingClientRect();
//       let x = clientX - rect.left;
//       let y = clientY - rect.top;

//       // Boundary constraints
//       x = Math.max(LENS_SIZE / 2, Math.min(x, rect.width - LENS_SIZE / 2));
//       y = Math.max(LENS_SIZE / 2, Math.min(y, rect.height - LENS_SIZE / 2));

//       const bgX = (x / rect.width) * 100;
//       const bgY = (y / rect.height) * 100;

//       setZoom(prev => ({
//         ...prev,
//         x,
//         y,
//         bgX: `${bgX}%`,
//         bgY: `${bgY}%`,
//       }));
//     });
//   };

//   const handleMouseEnter = () => {
//     if (!activeImg) return;
    
//     setZoom(prev => ({
//       ...prev,
//       active: true,
//       scale: 0,
//       opacity: 0
//     }));
    
//     setTimeout(() => {
//       setZoom(prev => ({
//         ...prev,
//         scale: 1,
//         opacity: 1
//       }));
//     }, 10);
//   };

//   const handleMouseLeave = () => {
//     setZoom(prev => ({
//       ...prev,
//       scale: 0,
//       opacity: 0,
//       active: false
//     }));
//   };

//   const onMouseMove = (e) => updateZoom(e.clientX, e.clientY);
//   const onTouchStart = (e) => {
//     handleMouseEnter();
//     const touch = e.touches[0];
//     updateZoom(touch.clientX, touch.clientY);
//   };
//   const onTouchMove = (e) => {
//     const touch = e.touches[0];
//     updateZoom(touch.clientX, touch.clientY);
//   };
//   const onTouchEnd = () => handleMouseLeave();

//   if (!product) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-16 animate-pulse">
//         <div className="h-[500px] bg-gray-200 rounded-3xl" />
//         <div className="space-y-6">
//           <div className="h-8 bg-gray-200 rounded w-3/4" />
//           <div className="h-5 bg-gray-200 rounded w-1/2" />
//           <div className="h-16 bg-gray-200 rounded" />
//           <div className="grid grid-cols-2 gap-4">
//             <div className="h-14 bg-gray-200 rounded-xl" />
//             <div className="h-14 bg-gray-200 rounded-xl" />
//           </div>
//           <div className="h-24 bg-gray-200 rounded-xl" />
//         </div>
//       </div>
//     );
//   }

//   // Get all images from product
//   const productImages = product.images && product.images.length > 0 
//     ? product.images 
//     : product.mainImage 
//       ? [product.mainImage] 
//       : [];

//   const productPrice =
//   selectedVariant?.discountedPrice ??
//   selectedVariant?.price ??
//   0;

// const originalPrice =
//   selectedVariant?.originalPrice ??
//   selectedVariant?.price ??
//   0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
//       {/* Floating Background Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full animate-float"
//             style={{
//               background: PRIMARY_GRADIENT,
//               width: Math.random() * 100 + 50,
//               height: Math.random() * 100 + 50,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               opacity: 0.03,
//               filter: 'blur(40px)',
//               animationDelay: `${i * 2}s`,
//               animationDuration: `${Math.random() * 20 + 20}s`
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         {/* Breadcrumb */}
//         <div className="mb-8">
//           <nav className="flex items-center text-sm text-gray-500">
//             <span className="hover:text-amber-600 cursor-pointer transition-colors">Home</span>
//             <span className="mx-2">›</span>
//             <span className="hover:text-amber-600 cursor-pointer transition-colors">Products</span>
//             <span className="mx-2">›</span>
//             <span className="font-medium text-gray-900">{product.name}</span>
//           </nav>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
//           {/* LEFT - IMAGE GALLERY */}
//           <div className="space-y-8">
//             {/* Main Image Container */}
//             {activeImg && (
//               <div className="relative group">
//                 <div
//                   className="relative h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                   onMouseMove={onMouseMove}
//                   onTouchStart={onTouchStart}
//                   onTouchMove={onTouchMove}
//                   onTouchEnd={onTouchEnd}
//                 >
//                   {/* Image with gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />
                  
//                   <img
//                     ref={imgRef}
//                     src={activeImg}
//                     alt={product.name}
//                     className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
//                   />

//                   {/* Out of Stock Overlay */}
//                   {!stockStatus.isAvailable && (
//                     <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
//                       <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl">
//                         <div className="text-2xl font-bold text-red-600 mb-2">Out of Stock</div>
//                         <p className="text-gray-600">This product is currently unavailable</p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Zoom Lens */}
//                   {zoom.active && stockStatus.isAvailable && (
//                     <div
//                       ref={lensRef}
//                       className="absolute pointer-events-none overflow-hidden rounded-full border-2 border-white shadow-2xl z-30"
//                       style={{
//                         width: LENS_SIZE,
//                         height: LENS_SIZE,
//                         left: zoom.x - LENS_SIZE / 2,
//                         top: zoom.y - LENS_SIZE / 2,
//                         backgroundImage: `url(${activeImg})`,
//                         backgroundSize: `${ZOOM * 100}%`,
//                         backgroundPosition: `${zoom.bgX} ${zoom.bgY}`,
//                         transform: `scale(${zoom.scale})`,
//                         opacity: zoom.opacity,
//                         transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
//                         boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
//                       <div className="absolute inset-0 rounded-full border-2 border-white/50" />
//                     </div>
//                   )}

//                   {/* Zoom Hint */}
//                   {stockStatus.isAvailable && (
//                     <div className={`absolute bottom-6 right-6 z-20 transition-all duration-500 ${zoom.active ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
//                       <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm flex items-center gap-2">
//                         <span className="text-lg">🔍</span>
//                         {window.innerWidth < 768 ? 'Touch & drag' : 'Hover to zoom'}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Lens Glow Effect */}
//                 {zoom.active && stockStatus.isAvailable && (
//                   <div
//                     className="absolute inset-0 rounded-3xl pointer-events-none z-10"
//                     style={{
//                       background: `radial-gradient(circle at ${zoom.x}px ${zoom.y}px, rgba(250,168,7,0.15) 0%, transparent 70%)`,
//                       filter: 'blur(20px)',
//                     }}
//                   />
//                 )}
//               </div>
//             )}

//             {/* Thumbnail Gallery */}
//             {productImages.length > 1 && (
//               <div className="flex gap-4 justify-center">
//                 {productImages.map((img, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setActiveImg(img)}
//                     className="relative group"
//                   >
//                     <div className={`absolute -inset-1 rounded-2xl transition-all duration-500 ${activeImg === img ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-transparent to-transparent group-hover:from-amber-100 group-hover:to-orange-100'}`} />
//                     <img
//                       src={img}
//                       alt={`View ${index + 1}`}
//                       className={`relative w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg transition-all duration-500 ${activeImg === img ? 'scale-110 ring-2 ring-amber-500' : 'group-hover:scale-105'}`}
//                     />
//                     {/* Active indicator */}
//                     {activeImg === img && (
//                       <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-ping" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//           </div>

//           {/* RIGHT - PRODUCT INFO */}
//           <div className="space-y-8">
//             {/* Header */}
//             <div>              
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
//                 {product.name}
//                 <span className="block text-xl text-gray-600 font-normal mt-2">
//                   {product.description || "High quality product with premium features"}
//                 </span>
//               </h1>
//             </div>

//             {/* Variant Selection */}
//             {product.variants && product.variants.length > 0 && (
//               <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
//                 <h3 className="font-bold text-gray-900 text-lg mb-4">Select Variant</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {product.variants.map((variant, index) => {
//                     const variantStockStatus = getStockStatus(variant.stock);
//                     return (
//                       <button
//                         key={index}
//                         onClick={() => setSelectedVariant(variant)}
//                         disabled={!variantStockStatus.isAvailable}
//                         className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
//                           selectedVariant?.label === variant.label
//                             ? `bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg ${!variantStockStatus.isAvailable ? 'opacity-70' : ''}`
//                             : `bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 hover:shadow-md ${!variantStockStatus.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`
//                         }`}
//                       >
//                         <div className="text-center">
//                           <div className="font-bold">{variant.label}</div>
//                           <div className="text-sm mt-1">₹{variant.price}</div>
//                         </div>
//                         {/* Stock status dot */}
//                         <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${variantStockStatus.bg} border border-white`}></div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Pricing */}
//             <div className={`bg-gradient-to-r from-white to-amber-50/50 rounded-3xl p-6 border ${stockStatus.border}`}>
//               <div className="flex items-baseline gap-4 mb-2">
//                 <span className="text-5xl font-bold text-gray-900">₹{productPrice}</span>

//                 {originalPrice > productPrice && (
//                   <span className="text-2xl text-gray-400 line-through">
//                     ₹{originalPrice}
//                   </span>
//                 )}

//                 {/* Stock Status Badge */}
//                 <span className={`px-4 py-1.5 rounded-full text-white font-bold text-sm shadow-lg ${stockStatus.badgeBg}`}>
//                   {stockStatus.text}
//                 </span>
//               </div>
//               {/* Stock Status Message */}
//               {selectedVariant?.stock !== undefined && selectedVariant?.stock !== null && (
//                 <div className={`mt-2 inline-block px-3 py-1 rounded-lg text-sm font-medium ${stockStatus.bg} ${stockStatus.color}`}>
//                   {selectedVariant.stock === 0 ? (
//                     <span className="flex items-center gap-1">
//                       <span className="text-xl">😔</span> Currently unavailable
//                     </span>
//                   ) : selectedVariant.stock <= 5 ? (
//                     <span className="flex items-center gap-1">
//                       <span className="text-xl">⚠️</span> Hurry! Only {selectedVariant.stock} left
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-1">
//                       <span className="text-xl">✅</span> {selectedVariant.stock} units available
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Discount Label */}
//             {product.discount?.label && selectedVariant?.discountedPrice < selectedVariant?.originalPrice && (
//               <div className="mt-2 inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold">
//               🎉 {product.discount.label}
//               </div>
//             )}

//             {/* Quantity Selector */}
//             {stockStatus.isAvailable && (
//               <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
//                 <h3 className="font-bold text-gray-900 text-lg mb-4">Select Quantity</h3>
//                 <div className="flex items-center gap-6">
//                   <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl overflow-hidden">
//                     <button
//                       onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                       disabled={quantity <= 1}
//                       className="w-14 h-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-amber-100 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       −
//                     </button>
//                     <span className="w-20 text-center text-2xl font-bold text-gray-900">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity(q => q + 1)}
//                       disabled={selectedVariant?.stock && quantity >= selectedVariant.stock}
//                       className="w-14 h-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-amber-100 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div className="text-sm">
//                     <span className="text-gray-600">Available: </span>
//                     <span className={`font-bold ${stockStatus.color}`}>
//                       {selectedVariant?.stock || "397"} units {selectedVariant?.stock <= 5 ? "⚠️" : "🟢"}
//                     </span>
//                     {selectedVariant?.stock && quantity > selectedVariant.stock && (
//                       <div className="text-red-500 text-xs mt-1">
//                         ❌ Cannot exceed available stock
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="space-y-4">
//               {stockStatus.isAvailable ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={selectedVariant?.stock === 0}
//                     className="group flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-bold text-lg
//                               transition-all duration-500 hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
//                     style={{ background: PRIMARY_GRADIENT }}
//                   >
//                     <FiShoppingCart className="text-xl group-hover:rotate-12 transition-transform" />
//                     Add to Cart
//                   </button>

//                   <button
//                     onClick={handleBuyNow}
//                     disabled={selectedVariant?.stock === 0}
//                     className="group flex items-center justify-center gap-3 py-4 px-8
//                             rounded-2xl font-bold text-lg 
//                            bg-gradient-to-r from-amber-500 to-orange-500 text-white
//                             hover:shadow-2xl hover:scale-105 active:scale-95 transition-all
//                             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
//                   >
//                     <span className="text-xl">⚡</span>
//                     Buy Now
//                   </button>
//                 </div>
//               ) : (
//                 <div className="border bg-gradient-to-r from-amber-300 to-orange-200 text-white border-red-200 rounded-2xl p-6 text-center">
//                   <div className="text-red-600 text-2xl font-bold mb-2">Out of Stock</div>
//                   <p className="text-gray-600 mb-4">This product is currently unavailable for purchase.</p>
//                   <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                     <button 
//                       onClick={() => navigate("/products")}
//                       className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 border border-amber-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
//                     >
//                       🔄 Browse Similar Products
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Stock Status Indicator */}
//             {selectedVariant?.stock !== undefined && selectedVariant?.stock !== null && (
//               <div className={`p-4 rounded-xl ${stockStatus.bg} ${stockStatus.border} border`}>
//                 <div className="flex items-center gap-3">
//                   <div className={`w-3 h-3 rounded-full ${stockStatus.badgeBg}`}></div>
//                   <div>
//                     <h4 className="font-bold text-gray-800">Stock Status</h4>
//                     <p className={`text-sm ${stockStatus.color}`}>
//                       {selectedVariant.stock === 0 
//                         ? "This item is completely sold out. Check back later." 
//                         : selectedVariant.stock <= 5 
//                           ? `Only ${selectedVariant.stock} items left! Order soon to avoid disappointment.` 
//                           : `Good availability with ${selectedVariant.stock} units in stock.`}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           50% { transform: translateY(-20px) rotate(10deg); }
//         }
        
//         .animate-float {
//           animation: float 20s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductDetails;






import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as productAPI from "../../api/product.api";
import { FiStar, FiShoppingCart, FiPackage, FiTruck, FiShield, FiHeart, FiShare2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setCartFromBackend } from "../../store/cart.store";
import { addToCartAPI } from "../../api/cart.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { startCheckout } from "../../store/checkout.store";

const LENS_SIZE = 200;
const ZOOM = 3;
const PRIMARY = "#faa807";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #faa807 0%, #ffd13d 100%)";

const ProductDetails = () => {
  const { id } = useParams();
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [zoom, setZoom] = useState({
    active: false,
    x: 0,
    y: 0,
    bgX: "50%",
    bgY: "50%",
    scale: 0,
    opacity: 0
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  /* ---------- FETCH PRODUCT ---------- */
  useEffect(() => {
    (async () => {
      try {
        const data = await productAPI.getProductById(id);
        console.log("single product", data.data?.data);
        const productData = data.data?.data;
        setProduct(productData);
        
        // Set first image as active
        if (productData?.images && productData.images.length > 0) {
          setActiveImg(productData.images[0]);
        } else if (productData?.mainImage) {
          setActiveImg(productData.mainImage);
        }
        
        // Set first variant as selected
        if (productData?.variants && productData.variants.length > 0) {
          setSelectedVariant(productData.variants[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    })();
  }, [id]);

  // Function to get stock status
  const getStockStatus = (stock) => {
    if (stock === undefined || stock === null) {
      return {
        text: "In Stock",
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200",
        badgeBg: "bg-gradient-to-r from-green-500 to-emerald-500",
        isAvailable: true
      };
    }
    
    if (stock === 0) {
      return {
        text: "Out of Stock",
        color: "text-red-600",
        bg: "bg-red-100",
        border: "border-red-200",
        badgeBg: "bg-gradient-to-r from-red-500 to-pink-500",
        isAvailable: false
      };
    } else if (stock <= 5) {
      return {
        text: `Low Stock (${stock})`,
        color: "text-orange-600",
        bg: "bg-orange-100",
        border: "border-orange-200",
        badgeBg: "bg-gradient-to-r from-orange-500 to-yellow-500",
        isAvailable: true
      };
    } else {
      return {
        text: `In Stock (${stock})`,
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200",
        badgeBg: "bg-gradient-to-r from-green-500 to-emerald-500",
        isAvailable: true
      };
    }
  };

  // Get current stock status
  const stockStatus = getStockStatus(selectedVariant?.stock);

  /* ---------- HANDLE ACTIONS ---------- */
  const handleAddToCart = async () => {
    if (!product || !stockStatus.isAvailable) return;

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/products/${id}` },
      });
      return;
    }

    try {
      const payload = {
        productId: product._id,
        variantLabel: selectedVariant.label,
        quantity,
      };

      const res = await addToCartAPI(payload);

      // 🔥 Redux mirrors backend cart
      dispatch(setCartFromBackend(res.data.data));

      toast.success("Added to cart 🛒");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  };

  const handleBuyNow = () => {
    if (!product || !stockStatus.isAvailable) return;

    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/products/${id}` },
      });
      return;
    }

    const price = selectedVariant?.discountedPrice ?? selectedVariant?.price ?? 0;
    
    dispatch(
      startCheckout([
     {  
       productId: product._id,
        name: product.name,
        price,
        image: activeImg,
        quantity,
        variantLabel: selectedVariant.label,
        totalPrice: price * quantity,
         weight:(selectedVariant?.unit === "kg"  ? selectedVariant?.weight * 1000  : selectedVariant?.weight) ,
      }
      ])
    );
console.log("BUY NOW WEIGHT:", selectedVariant?.weight);

    navigate("/checkout");
  };

  /* ---------- SMOOTH ZOOM ANIMATION ---------- */
  const updateZoom = (clientX, clientY) => {
    if (!imgRef.current) return;
    
    cancelAnimationFrame(animationFrameRef.current);
    
    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = imgRef.current.getBoundingClientRect();
      let x = clientX - rect.left;
      let y = clientY - rect.top;

      // Boundary constraints
      x = Math.max(LENS_SIZE / 2, Math.min(x, rect.width - LENS_SIZE / 2));
      y = Math.max(LENS_SIZE / 2, Math.min(y, rect.height - LENS_SIZE / 2));

      const bgX = (x / rect.width) * 100;
      const bgY = (y / rect.height) * 100;

      setZoom(prev => ({
        ...prev,
        x,
        y,
        bgX: `${bgX}%`,
        bgY: `${bgY}%`,
      }));
    });
  };

  const handleMouseEnter = () => {
    if (!activeImg) return;
    
    setZoom(prev => ({
      ...prev,
      active: true,
      scale: 0,
      opacity: 0
    }));
    
    setTimeout(() => {
      setZoom(prev => ({
        ...prev,
        scale: 1,
        opacity: 1
      }));
    }, 10);
  };

  const handleMouseLeave = () => {
    setZoom(prev => ({
      ...prev,
      scale: 0,
      opacity: 0,
      active: false
    }));
  };

  const onMouseMove = (e) => updateZoom(e.clientX, e.clientY);
  const onTouchStart = (e) => {
    handleMouseEnter();
    const touch = e.touches[0];
    updateZoom(touch.clientX, touch.clientY);
  };
  const onTouchMove = (e) => {
    const touch = e.touches[0];
    updateZoom(touch.clientX, touch.clientY);
  };
  const onTouchEnd = () => handleMouseLeave();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-16 animate-pulse">
        <div className="h-[500px] bg-gray-200 rounded-3xl" />
        <div className="space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-16 bg-gray-200 rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-14 bg-gray-200 rounded-xl" />
            <div className="h-14 bg-gray-200 rounded-xl" />
          </div>
          <div className="h-24 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  // Get all images from product
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.mainImage 
      ? [product.mainImage] 
      : [];

  const productPrice =
  selectedVariant?.discountedPrice ??
  selectedVariant?.price ??
  0;

const originalPrice =
  selectedVariant?.originalPrice ??
  selectedVariant?.price ??
  0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50/30">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              background: PRIMARY_GRADIENT,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.03,
              filter: 'blur(40px)',
              animationDelay: `${i * 2}s`,
              animationDuration: `${Math.random() * 20 + 20}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500">
            <span className="hover:text-amber-600 cursor-pointer transition-colors">Home</span>
            <span className="mx-2">›</span>
            <span className="hover:text-amber-600 cursor-pointer transition-colors">Products</span>
            <span className="mx-2">›</span>
            <span className="font-medium text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* LEFT - IMAGE GALLERY */}
          <div className="space-y-8">
            {/* Main Image Container */}
            {activeImg && (
              <div className="relative group">
                <div
                  className="relative h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={onMouseMove}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {/* Image with gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent z-10" />
                  
                  <img
                    ref={imgRef}
                    src={activeImg}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Out of Stock Overlay */}
                  {!stockStatus.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
                      <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl">
                        <div className="text-2xl font-bold text-red-600 mb-2">Out of Stock</div>
                        <p className="text-gray-600">This product is currently unavailable</p>
                      </div>
                    </div>
                  )}

                  {/* Zoom Lens */}
                  {zoom.active && stockStatus.isAvailable && (
                    <div
                      ref={lensRef}
                      className="absolute pointer-events-none overflow-hidden rounded-full border-2 border-white shadow-2xl z-30"
                      style={{
                        width: LENS_SIZE,
                        height: LENS_SIZE,
                        left: zoom.x - LENS_SIZE / 2,
                        top: zoom.y - LENS_SIZE / 2,
                        backgroundImage: `url(${activeImg})`,
                        backgroundSize: `${ZOOM * 100}%`,
                        backgroundPosition: `${zoom.bgX} ${zoom.bgY}`,
                        transform: `scale(${zoom.scale})`,
                        opacity: zoom.opacity,
                        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
                      <div className="absolute inset-0 rounded-full border-2 border-white/50" />
                    </div>
                  )}

                  {/* Zoom Hint */}
                  {stockStatus.isAvailable && (
                    <div className={`absolute bottom-6 right-6 z-20 transition-all duration-500 ${zoom.active ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
                      <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm flex items-center gap-2">
                        <span className="text-lg">🔍</span>
                        {window.innerWidth < 768 ? 'Touch & drag' : 'Hover to zoom'}
                      </div>
                    </div>
                  )}
                </div>

                {/* Lens Glow Effect */}
                {zoom.active && stockStatus.isAvailable && (
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(circle at ${zoom.x}px ${zoom.y}px, rgba(250,168,7,0.15) 0%, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                )}
              </div>
            )}

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-4 justify-center">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImg(img)}
                    className="relative group"
                  >
                    <div className={`absolute -inset-1 rounded-2xl transition-all duration-500 ${activeImg === img ? 'bg-gradient-to-r from-amber-400 to-orange-400' : 'bg-gradient-to-r from-transparent to-transparent group-hover:from-amber-100 group-hover:to-orange-100'}`} />
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className={`relative w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg transition-all duration-500 ${activeImg === img ? 'scale-110 ring-2 ring-amber-500' : 'group-hover:scale-105'}`}
                    />
                    {/* Active indicator */}
                    {activeImg === img && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-ping" />
                    )}
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT - PRODUCT INFO */}
          <div className="space-y-8">
            {/* Header */}
            <div>              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
                <span className="block text-xl text-gray-600 font-normal mt-2">
                  {product.description || "High quality product with premium features"}
                </span>
              </h1>
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Select Variant</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => {
                    const variantStockStatus = getStockStatus(variant.stock);
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variantStockStatus.isAvailable}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 relative ${
                          selectedVariant?.label === variant.label
                            ? `bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg ${!variantStockStatus.isAvailable ? 'opacity-70' : ''}`
                            : `bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800 hover:shadow-md ${!variantStockStatus.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-bold">{variant.label}</div>
                          <div className="text-sm mt-1">₹{variant.price}</div>
                        </div>
                        {/* Stock status dot */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${variantStockStatus.bg} border border-white`}></div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className={`bg-gradient-to-r from-white to-amber-50/50 rounded-3xl p-6 border ${stockStatus.border}`}>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-5xl font-bold text-gray-900">₹{productPrice}</span>

                {originalPrice > productPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                )}

                {/* Stock Status Badge */}
                <span className={`px-4 py-1.5 rounded-full text-white font-bold text-sm shadow-lg ${stockStatus.badgeBg}`}>
                  {stockStatus.text}
                </span>
              </div>
              {/* Stock Status Message */}
              {selectedVariant?.stock !== undefined && selectedVariant?.stock !== null && (
                <div className={`mt-2 inline-block px-3 py-1 rounded-lg text-sm font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                  {selectedVariant.stock === 0 ? (
                    <span className="flex items-center gap-1">
                      <span className="text-xl">😔</span> Currently unavailable
                    </span>
                  ) : selectedVariant.stock <= 5 ? (
                    <span className="flex items-center gap-1">
                      <span className="text-xl">⚠️</span> Hurry! Only {selectedVariant.stock} left
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span className="text-xl">✅</span> {selectedVariant.stock} units available
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Discount Label */}
            {product.discount?.label && selectedVariant?.discountedPrice < selectedVariant?.originalPrice && (
              <div className="mt-2 inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold">
              🎉 {product.discount.label}
              </div>
            )}

            {/* Quantity Selector */}
            {stockStatus.isAvailable && (
              <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Select Quantity</h3>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-14 h-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-amber-100 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="w-20 text-center text-2xl font-bold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      disabled={selectedVariant?.stock && quantity >= selectedVariant.stock}
                      className="w-14 h-14 flex items-center justify-center text-2xl text-gray-700 hover:bg-amber-100 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Available: </span>
                    <span className={`font-bold ${stockStatus.color}`}>
                      {selectedVariant?.stock || "397"} units {selectedVariant?.stock <= 5 ? "⚠️" : "🟢"}
                    </span>
                    {selectedVariant?.stock && quantity > selectedVariant.stock && (
                      <div className="text-red-500 text-xs mt-1">
                        ❌ Cannot exceed available stock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {stockStatus.isAvailable ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={selectedVariant?.stock === 0}
                    className="group flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-bold text-lg
                              transition-all duration-500 hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background: PRIMARY_GRADIENT }}
                  >
                    <FiShoppingCart className="text-xl group-hover:rotate-12 transition-transform" />
                    Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={selectedVariant?.stock === 0}
                    className="group flex items-center justify-center gap-3 py-4 px-8
                            rounded-2xl font-bold text-lg 
                           bg-gradient-to-r from-amber-500 to-orange-500 text-white
                            hover:shadow-2xl hover:scale-105 active:scale-95 transition-all
                            disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="text-xl">⚡</span>
                    Buy Now
                  </button>
                </div>
              ) : (
                <div className="border bg-gradient-to-r from-amber-300 to-orange-200 text-white border-red-200 rounded-2xl p-6 text-center">
                  <div className="text-red-600 text-2xl font-bold mb-2">Out of Stock</div>
                  <p className="text-gray-600 mb-4">This product is currently unavailable for purchase.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => navigate("/products")}
                      className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-400 border border-amber-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      🔄 Browse Similar Products
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stock Status Indicator */}
            {selectedVariant?.stock !== undefined && selectedVariant?.stock !== null && (
              <div className={`p-4 rounded-xl ${stockStatus.bg} ${stockStatus.border} border`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${stockStatus.badgeBg}`}></div>
                  <div>
                    <h4 className="font-bold text-gray-800">Stock Status</h4>
                    <p className={`text-sm ${stockStatus.color}`}>
                      {selectedVariant.stock === 0 
                        ? "This item is completely sold out. Check back later." 
                        : selectedVariant.stock <= 5 
                          ? `Only ${selectedVariant.stock} items left! Order soon to avoid disappointment.` 
                          : `Good availability with ${selectedVariant.stock} units in stock.`}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;