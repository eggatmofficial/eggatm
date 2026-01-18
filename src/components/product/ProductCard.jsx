

//new festival offer working



// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setCartFromBackend } from "../../store/cart.store";
// import { addToCartAPI } from "../../api/cart.api";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { FiShoppingCart, FiEye, FiStar, FiZap, FiCheckCircle, FiGift } from "react-icons/fi";
// import { RiFlashlightFill } from "react-icons/ri";

// const ProductCard = ({ product, index }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);
//   const [showPulse, setShowPulse] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [countdown, setCountdown] = useState("");


//   const isAuthenticated = useSelector(
//     (state) => state.auth.isAuthenticated
//   );

//   // Detect mobile screen
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);


//   //first variant alway shown offer 

// // const discountedVariant =
// //   product.variants?.find(
// //     v => v.discountedPrice < v.originalPrice
// //   ) || product.variants?.[0];

// //maximum off shown if admin gives an multiple variants
// // 🔥 STEP 1: find best variant by MAX ₹ SAVING
// const bestVariant = product.variants?.reduce((best, current) => {
//   if (!current) return best;

//   const original = current.originalPrice ?? current.price;
//   const discounted = current.discountedPrice ?? original;
//   const currentSaving = original - discounted;

//   if (!best) return current;

//   const bestOriginal = best.originalPrice ?? best.price;
//   const bestDiscounted = best.discountedPrice ?? bestOriginal;
//   const bestSaving = bestOriginal - bestDiscounted;

//   return currentSaving > bestSaving ? current : best;
// }, null);

// // 🔥 STEP 2: final variant to show in UI
// const discountedVariant =
//   bestVariant &&
//   (bestVariant.originalPrice ?? bestVariant.price) >
//     bestVariant.discountedPrice
//     ? bestVariant
//     : product.variants?.[0];

//     const original =
//   discountedVariant?.originalPrice ?? discountedVariant?.price ?? 0;

// // const hasDiscount =
// //   discountedVariant &&
// //   discountedVariant.discountedPrice < original;
// const discount = product.discount || discountedVariant?.discount;


// const now = new Date();

// const startDate = discount?.startDate ? new Date(discount.startDate) : null;
// const endDate = discount?.endDate ? new Date(discount.endDate) : null;

// const isFestivalLive =
//   discount?.mode === "festival" &&
//   discount?.isActive === true &&
//   startDate &&
//   endDate &&
//   now >= startDate &&
//   now < endDate;


// const isFestivalUpcoming =
//   discount?.mode === "festival" &&
//   discount?.isActive === true &&
//   startDate &&
//   now < startDate;
  

//   // ✅ SAFE discounted price (works for festival + variant)
// const discountedPrice =
//   isFestivalLive && product.discount
//     ? Math.round(
//         original - (original * product.discount.value) / 100
//       )
//     : discountedVariant?.discountedPrice ?? original;


//   const activeDiscount =
//   isFestivalLive
//     ? product.discount
//     : discountedVariant?.discount?.isActive
//     ? discountedVariant.discount
//     : null;


//   useEffect(() => {
//   if (!isFestivalUpcoming || !startDate) {
//     setCountdown("");
//     return;
//   }

//   const interval = setInterval(() => {
//     const now = new Date();
//     const diff = startDate - now;

//     if (diff <= 0) {
//       clearInterval(interval);
//       setCountdown("");
//       return;
//     }

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff / (1000 * 60)) % 60);
//     const seconds = Math.floor((diff / 1000) % 60);

//     setCountdown(
//       `${hours}h ${minutes}m ${seconds}s`
//     );
//   }, 1000);

//   return () => clearInterval(interval);
// }, [isFestivalUpcoming, startDate]);



// // const hasDiscount =
// //   discountedVariant &&
// //   discountedVariant.discount &&
// //   discountedVariant.discount.isActive === true &&
// //   discountedVariant.discountedPrice < original &&
// //   !isFestivalUpcoming;
// const hasDiscount =
//   !!activeDiscount && discountedPrice < original;




// const discountPercentage = hasDiscount
//   ? Math.round(((original - discountedPrice) / original) * 100)
//   : 0;



//   useEffect(() => {
//     // Show pulse animation on mount for discounted items (desktop only)
//     if (hasDiscount && !isMobile) {
//       setShowPulse(true);
//       const timer = setTimeout(() => setShowPulse(false), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [hasDiscount, isMobile]);

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();

//     if (!isAuthenticated) {
//       toast.error("Please login to add items to cart");
//       navigate("/login");
//       return;
//     }

//     try {
//       const payload = {
//         productId: product._id,
//         variantLabel: discountedVariant.label,
//         quantity: 1,
//       };

//       const res = await addToCartAPI(payload);
//       dispatch(setCartFromBackend(res.data.data));
//       toast.success("Added to cart 🛒");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to add to cart"
//       );
//     }
//   };

//   const handleViewProduct = () => {
//     navigate(`/products/${product._id}`);
//   };

//   // Get badge style based on discount percentage
//   const getBadgeStyle = (percentage) => {
//     if (percentage >= 50) {
//       return {
//         gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
//         icon: "🎯",
//         label: "MEGA"
//       };
//     } else if (percentage >= 30) {
//       return {
//         gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
//         icon: "⚡",
//         label: "GREAT"
//       };
//     } else if (percentage >= 20) {
//       return {
//         gradient: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)",
//         icon: "🔥",
//         label: "HOT"
//       };
//     } else {
//       return {
//         gradient: "linear-gradient(135deg, #faa807 0%, #a7f3d0 100%)",
//         icon: "✨",
//         label: "OFFER"
//       };
//     }
//   };

//   const badgeStyle = getBadgeStyle(discountPercentage);

//   return (
//     <div 
//       className="relative group cursor-pointer"
//       onMouseEnter={() => !isMobile && setIsHovered(true)}
//       onMouseLeave={() => !isMobile && setIsHovered(false)}
//       onClick={handleViewProduct}
//     >
//       {isFestivalUpcoming && (
//   <div className="absolute top-2 left-2 z-30 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-lg text-xs font-bold shadow flex flex-col items-center">
//     <span>⏳ Coming Soon</span>
//     {countdown && (
//       <span className="text-[10px] mt-1 text-yellow-100">
//         Starts in {countdown}
//       </span>
//     )}
//   </div>
// )}

//       {/* LEFT TOP FESTIVAL BADGE - RESPONSIVE */}
//       {isFestivalLive && (
//         <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-30">
//           {/* Mobile vs Desktop Size */}
//           <div className={`relative ${isMobile ? 'scale-75' : ''}`}>
//             <div className={`absolute -inset-2 bg-gradient-to-r 
//               from-red-500/40 via-yellow-500/40 to-red-500/40 
//               rounded-full blur-md ${!isMobile && 'animate-pulse-slow'}`}
//             />
            
//             <div className="relative bg-gradient-to-br 
//               from-red-600 via-red-500 to-yellow-500 
//               p-0.5 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl"
//             >
//               <div className="bg-gradient-to-r from-red-700 to-red-800 
//                 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl"
//               >
//                 {/* Curve Lines - Hide on mobile */}
//                 {!isMobile && (
//                   <div className="absolute -top-1 left-1/4 w-1/2 h-1 
//                     bg-gradient-to-r from-transparent via-yellow-300 to-transparent 
//                     rounded-full"
//                   />
//                 )}
                
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   {/* Animated Icon */}
//                   <div className="relative">
//                     {!isMobile && (
//                       <div className="absolute inset-0 bg-yellow-300 
//                         rounded-full blur-sm animate-ping"
//                         style={{ animationDuration: '1.5s' }}
//                       />
//                     )}
//                     <span className="relative text-sm sm:text-lg">🎁</span>
//                   </div>
                  
//                   {/* Text */}
//                   <div className="text-center">
//                     <div className="text-white font-black text-[10px] sm:text-xs 
//                       tracking-wider uppercase whitespace-nowrap"
//                     >
//                       {product.discount.label || "FEST"}
//                     </div>
//                     <div className="text-yellow-200 text-[9px] sm:text-[10px] 
//                       font-semibold tracking-tight"
//                     >
//                       OFFER
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* GREEN OFFER BADGE - RESPONSIVE */}
//       {hasDiscount && (
//         <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-30 pointer-events-none">
//           <div className={`relative ${isMobile ? '' : 'animate-float'}`} 
//             style={{ animationDelay: `${index * 0.2}s` }}>
            
//             {/* Outer Glow - Desktop only */}
//             {!isMobile && (
//               <div className={`absolute -inset-1 rounded-lg blur-lg ${showPulse ? 'animate-ping' : ''}`}
//                 style={{
//                   background: badgeStyle.gradient,
//                   animationDuration: '2s',
//                   opacity: 0.4
//                 }}
//               />
//             )}
            
//             {/* Ribbon Tail - Desktop only */}
//             {!isMobile && (
//               <div className="absolute -bottom-1 right-1/2 transform translate-x-1/2 w-4 h-4" 
//                 style={{ 
//                   clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                   background: badgeStyle.gradient 
//                 }}
//               />
//             )}
            
//             {/* Main Badge */}
//             <div className="relative">
//               <div 
//                 className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-lg sm:shadow-xl ${!isMobile && 'transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-green-300'}`}
//                 style={{
//                   background: badgeStyle.gradient,
//                   boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
//                   minWidth: isMobile ? '65px' : '85px'
//                 }}
//               >
//                 {/* Shine Effect - Desktop only */}
//                 {!isMobile && (
//                   <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//                 )}
       
//                 {/* Badge Content */}
//                 <div className="relative flex items-center justify-center gap-1 sm:gap-1.5">
//                   <span className="text-white text-xs sm:text-sm">
//                     {badgeStyle.icon}
//                   </span>
//                   <div className="flex flex-col items-center">
//                     <span className="text-white font-black text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap">
//                      {discountPercentage > 0 && (
//   <span>{discountPercentage}% OFF</span>
// )}

//                     </span>
//                     <span className="text-white/90 text-[9px] sm:text-[10px] font-medium tracking-tight">
//                       {badgeStyle.label}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Corner Stars - Desktop only */}
//               {!isMobile && (
//                 <>
//                   <div className="absolute -top-2 -left-2 text-yellow-300 text-xs animate-spin-slow">
//                     ⭐
//                   </div>
//                   <div className="absolute -top-2 -right-2 text-yellow-300 text-xs animate-spin-slow"
//                     style={{ animationDelay: '0.5s' }}>
//                     ⭐
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Card Container */}
//       <div className={`relative bg-white rounded-xl sm:rounded-2xl w-full overflow-hidden border border-gray-100 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-2xl transition-all duration-300 ${!isMobile && 'group-hover:scale-[1.02]'}`}>
        
//         {/* Image Container */}
//         <div className="relative overflow-hidden">
//           {/* Green Overlay on Hover - Desktop only */}
//           {!isMobile && (
//             <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
//           )}
          
//           <img
//             src={product.mainImage}
//             alt={product.name}
//             className="h-48 sm:h-56 w-full object-cover transform transition-transform duration-300 sm:duration-700 sm:group-hover:scale-110"
//           />
          
//           {/* Quick Actions Overlay - Desktop only */}
//           {!isMobile && (
//             <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
//               <button
//                 onClick={handleAddToCart}
//                 className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
//               >
//                 <FiShoppingCart className="text-lg" />
//               </button>
//               <button
//                 onClick={handleViewProduct}
//                 className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
//               >
//                 <FiEye className="text-lg" />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="p-4 sm:p-5">
//           {/* Product Name */}
//           <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1 sm:group-hover:text-orange-500 transition-colors duration-300">
//             {product.name}
//           </h3>

//           {/* Price Section */}
//           <div className="mt-3 sm:mt-4">
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 ">
//               <span className="text-xl sm:text-2xl font-bold text-gray-900">
//                 {/* ₹{discountedVariant?.discountedPrice || discountedVariant?.price} */}
//                  ₹{discountedPrice}
//               </span>
              
//               {hasDiscount && (
//                 <>
//                   <span className="text-base sm:text-lg text-gray-400 line-through">
//                     ₹{discountedVariant?.originalPrice}
//                   </span>
//                   <div className="px-2 py-1 rounded bg-gradient-to-r from-amber-500 to-orange-500 lg:ml-5">
//                     <span className="text-xs font-bold text-white">
//                     Save ₹{original - discountedPrice}
//                     </span>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Action Buttons - Mobile optimized */}
//           <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 group/btn flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold hover:shadow-lg sm:hover:shadow-xl active:scale-95 transition-all duration-300 text-sm sm:text-base"
//             >
//               <FiShoppingCart className="text-base sm:text-lg sm:group-hover/btn:rotate-12 transition-transform duration-300" />
//               <span className="whitespace-nowrap">Add to Cart</span>
//             </button>
            
//             <button
//               onClick={handleViewProduct}
//               className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-orange-600 sm:border-2 sm:border-orange-400 text-gray-700 sm:text-yellow-700 font-semibold hover:bg-gray-50 sm:hover:bg-yellow-50 sm:hover:border-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
//             >
//               <FiEye className="text-base sm:text-lg" />
//               <span className="whitespace-nowrap">View Details</span>
//             </button>
//           </div>
//         </div>

//         {/* Green Corner Accents - Desktop only */}
//         {!isMobile && (
//           <>
//             <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-400/30 rounded-tr-2xl" />
//             <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-emerald-400/30 rounded-bl-2xl" />
//           </>
//         )}

//         {/* Green Hover Glow Effect - Desktop only */}
//         {!isMobile && (
//           <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/20 transition-all duration-500 pointer-events-none" />
//         )}
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0) rotate(0deg); }
//           33% { transform: translateY(-5px) rotate(2deg); }
//           66% { transform: translateY(3px) rotate(-1deg); }
//         }
        
//         @keyframes pulse-slow {
//           0%, 100% { opacity: 0.5; transform: scale(1); }
//           50% { opacity: 0.8; transform: scale(1.05); }
//         }
        
//         @keyframes spin-slow {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         .animate-pulse-slow {
//           animation: pulse-slow 3s ease-in-out infinite;
//         }
        
//         .animate-spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
        
//         .line-clamp-1 {
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 1;
//         }
        
//         .line-clamp-2 {
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 2;
//         }
        
//         /* Mobile-specific touch optimizations */
//         @media (max-width: 640px) {
//           button {
//             min-height: 44px; /* Minimum touch target size */
//           }
          
//           img {
//             max-height: 200px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCard;













//deepseek code



import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartFromBackend } from "../../store/cart.store";
import { addToCartAPI } from "../../api/cart.api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FiShoppingCart, FiEye, FiStar, FiZap, FiCheckCircle, FiGift, FiClock } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [festivalEndTime, setFestivalEndTime] = useState("");
  const [festivalStartTime, setFestivalStartTime] = useState("");

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Find best variant by MAX ₹ SAVING
  const bestVariant = product.variants?.reduce((best, current) => {
    if (!current) return best;

    const original = current.originalPrice ?? current.price;
    const discounted = current.discountedPrice ?? original;
    const currentSaving = original - discounted;

    if (!best) return current;

    const bestOriginal = best.originalPrice ?? best.price;
    const bestDiscounted = best.discountedPrice ?? bestOriginal;
    const bestSaving = bestOriginal - bestDiscounted;

    return currentSaving > bestSaving ? current : best;
  }, null);

  // Final variant to show in UI
  const discountedVariant =
    bestVariant &&
    (bestVariant.originalPrice ?? bestVariant.price) >
      bestVariant.discountedPrice
      ? bestVariant
      : product.variants?.[0];

  const original =
    discountedVariant?.originalPrice ?? discountedVariant?.price ?? 0;

  const discount = product.discount || discountedVariant?.discount;

  const now = new Date();
  const startDate = discount?.startDate ? new Date(discount.startDate) : null;
  const endDate = discount?.endDate ? new Date(discount.endDate) : null;

  const isFestivalLive =
    discount?.mode === "festival" &&
    discount?.isActive === true &&
    startDate &&
    endDate &&
    now >= startDate &&
    now < endDate;

  const isFestivalUpcoming =
    discount?.mode === "festival" &&
    discount?.isActive === true &&
    startDate &&
    now < startDate;

  // ✅ SAFE discounted price (works for festival + variant)
  const discountedPrice =
    isFestivalLive && product.discount
      ? Math.round(
          original - (original * product.discount.value) / 100
        )
      : discountedVariant?.discountedPrice ?? original;

  const activeDiscount =
    isFestivalLive
      ? product.discount
      : discountedVariant?.discount?.isActive
      ? discountedVariant.discount
      : null;

  // Check if has ANY discount (including festival)
  const hasAnyDiscount = discountedPrice < original;

  // Calculate discount percentage for ANY discount
  const discountPercentage = hasAnyDiscount
    ? Math.round(((original - discountedPrice) / original) * 100)
    : 0;

  // Check if has REGULAR discount (non-festival)
  const hasRegularDiscount = 
    !!activeDiscount && 
    discountedPrice < original && 
    !isFestivalLive && 
    !isFestivalUpcoming;

  // Countdown for upcoming festival (STARTING TIME) - Left Top
  useEffect(() => {
    if (!isFestivalUpcoming || !startDate) {
      setFestivalStartTime("");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = startDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setFestivalStartTime("Started!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (days > 0) {
        setFestivalStartTime(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setFestivalStartTime(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setFestivalStartTime(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isFestivalUpcoming, startDate]);

  // Countdown for live festival (ENDING TIME) - Left Top
  useEffect(() => {
    if (!isFestivalLive || !endDate) {
      setFestivalEndTime("");
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setFestivalEndTime("Ended!");
        return;
      }

      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (days > 0) {
        setFestivalEndTime(`${days}d ${hours}h ${minutes}m`);
      } else if (totalHours > 0) {
        setFestivalEndTime(`${totalHours}h ${minutes}m ${seconds}s`);
      } else {
        setFestivalEndTime(`${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isFestivalLive, endDate]);

  useEffect(() => {
    // Show pulse animation on mount for discounted items (desktop only)
    if (hasAnyDiscount && !isMobile) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasAnyDiscount, isMobile]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        productId: product._id,
        variantLabel: discountedVariant.label,
        quantity: 1,
      };

      const res = await addToCartAPI(payload);
      dispatch(setCartFromBackend(res.data.data));
      toast.success("Added to cart 🛒");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  };

  const handleViewProduct = () => {
    navigate(`/products/${product._id}`);
  };

  // Get badge style based on discount percentage
  const getBadgeStyle = (percentage) => {
    if (percentage >= 50) {
      return {
        gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        icon: "🎯",
        label: "MEGA",
        shadow: "0 4px 12px rgba(5, 150, 105, 0.4)"
      };
    } else if (percentage >= 30) {
      return {
        gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        icon: "⚡",
        label: "GREAT",
        shadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
      };
    } else if (percentage >= 20) {
      return {
        gradient: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)",
        icon: "🔥",
        label: "HOT",
        shadow: "0 4px 12px rgba(52, 211, 153, 0.3)"
      };
    } else {
      return {
        gradient: "linear-gradient(135deg, #faa807 0%, #a7f3d0 100%)",
        icon: "✨",
        label: "OFFER",
        shadow: "0 4px 12px rgba(250, 168, 7, 0.3)"
      };
    }
  };

  const badgeStyle = getBadgeStyle(discountPercentage);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleViewProduct}
    >
      {/* LEFT TOP: FESTIVAL INFO BADGES (NO DISCOUNT PERCENTAGE SHOWN HERE) */}
      
      {/* 1. UPCOMING FESTIVAL BADGE - LEFT TOP (Just festival info) */}
      {isFestivalUpcoming && (
        <div className="absolute top-2 left-2 z-30">
          <div className="relative">
            {/* Outer glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/40 via-yellow-400/40 to-orange-400/40 rounded-lg blur-sm" />
            
            {/* Main badge */}
            <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 p-0.5 rounded-lg">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-3 py-2 rounded">
                <div className="flex flex-col items-center">
                  {/* Icon and text row */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-white text-sm">⏳</span>
                    <span className="text-white font-bold text-xs uppercase tracking-wide">
                      Coming Soon
                    </span>
                  </div>
                  
                  {/* Countdown timer - SHOWS STARTING TIME */}
                  {festivalStartTime && (
                    <div className="flex items-center gap-1">
                      <FiClock className="text-amber-200 text-[10px]" />
                      <span className="text-amber-100 text-[10px] font-semibold">
                        Starts in {festivalStartTime}
                      </span>
                    </div>
                  )}
                  
                  {/* Festival name */}
                  <div className="mt-1">
                    <span className="text-white/90 text-[10px] font-medium">
                      {discount?.label || "Festival Offer"}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Ribbon tail */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-2"
                style={{ 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: 'linear-gradient(to bottom, #f59e0b, #d97706)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. LIVE FESTIVAL BADGE - LEFT TOP (Just festival info, NO discount %) */}
      {isFestivalLive && (
        <div className="absolute top-2 left-2 z-30">
          <div className="relative">
            {/* Animated outer ring */}
            <div className={`absolute -inset-2 rounded-full bg-gradient-to-r 
              from-red-500/30 via-yellow-500/30 to-red-500/30 
              blur-md ${!isMobile && 'animate-pulse-slow'}`}
            />
            
            {/* Main badge with double border */}
            <div className="relative">
              {/* Outer border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-xl blur-sm opacity-60" />
              
              {/* Inner badge */}
              <div className="relative bg-gradient-to-br from-red-700 via-red-600 to-yellow-600 p-0.5 rounded-xl">
                <div className="bg-gradient-to-r from-red-800 to-red-700 px-3 py-2 rounded-lg">
                  <div className="flex flex-col items-center">
                    {/* Top row: Icon and Festival name */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm animate-ping"
                          style={{ animationDuration: '2s' }}
                        />
                        <span className="relative text-yellow-300 text-base">🎁</span>
                      </div>
                      <div>
                        <div className="text-white font-black text-xs tracking-wider uppercase">
                          {discount?.label || "TODAY'S OFFER"}
                        </div>
                        <div className="text-yellow-200 text-[10px] font-semibold tracking-tight">
                          FESTIVAL SALE
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle: Timer only, NO discount percentage */}
                    {festivalEndTime && (
                      <div className="flex items-center gap-1 mt-1">
                        <FiClock className="text-red-200 text-[10px]" />
                        <span className="text-red-100 text-[10px] font-bold">
                          Ends in {festivalEndTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Sparkle effects */}
              {!isMobile && (
                <>
                  <div className="absolute -top-1 -left-1 text-yellow-300 text-xs animate-spin-slow">
                    ✨
                  </div>
                  <div className="absolute -top-1 -right-1 text-yellow-300 text-xs animate-spin-slow"
                    style={{ animationDelay: '0.5s' }}>
                    ✨
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RIGHT TOP: DISCOUNT PERCENTAGE BADGES (ALL TYPES INCLUDING FESTIVAL) */}
      {hasAnyDiscount && (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-30 pointer-events-none">
          <div className={`relative ${isMobile ? '' : 'animate-float'}`} 
            style={{ animationDelay: `${index * 0.2}s` }}>
            
            {/* Outer Glow - Desktop only */}
            {!isMobile && (
              <div className={`absolute -inset-1 rounded-lg blur-lg ${showPulse ? 'animate-ping' : ''}`}
                style={{
                  background: badgeStyle.gradient,
                  animationDuration: '2s',
                  opacity: 0.4
                }}
              />
            )}
            
            {/* Ribbon Tail - Desktop only */}
            {!isMobile && (
              <div className="absolute -bottom-1 right-1/2 transform translate-x-1/2 w-4 h-4" 
                style={{ 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  background: badgeStyle.gradient 
                }}
              />
            )}
            
            {/* Main Badge */}
            <div className="relative">
              <div 
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg shadow-lg sm:shadow-xl ${!isMobile && 'transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3'}`}
                style={{
                  background: badgeStyle.gradient,
                  boxShadow: badgeStyle.shadow,
                  minWidth: isMobile ? '65px' : '85px'
                }}
              >
                {/* Shine Effect - Desktop only */}
                {!isMobile && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                )}
       
                {/* Badge Content */}
                <div className="relative flex items-center justify-center gap-1 sm:gap-1.5">
                  <span className="text-white text-xs sm:text-sm">
                    {badgeStyle.icon}
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-white font-black text-[10px] sm:text-xs tracking-wider uppercase whitespace-nowrap">
                      {discountPercentage > 0 && `${discountPercentage}% OFF`}
                    </span>
                    <span className="text-white/90 text-[9px] sm:text-[10px] font-medium tracking-tight">
                      {badgeStyle.label}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Corner Stars - Desktop only */}
              {!isMobile && (
                <>
                  <div className="absolute -top-2 -left-2 text-yellow-300 text-xs animate-spin-slow">
                    ⭐
                  </div>
                  <div className="absolute -top-2 -right-2 text-yellow-300 text-xs animate-spin-slow"
                    style={{ animationDelay: '0.5s' }}>
                    ⭐
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Card Container */}
      <div className={`relative bg-white rounded-xl sm:rounded-2xl w-full overflow-hidden border border-gray-100 shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-2xl transition-all duration-300 ${!isMobile && 'group-hover:scale-[1.02]'}`}>
        
        {/* Image Container */}
        <div className="relative overflow-hidden">
          {/* Green Overlay on Hover - Desktop only */}
          {!isMobile && (
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          )}
          
          <img
            src={product.mainImage}
            alt={product.name}
            className="h-48 sm:h-56 w-full object-cover transform transition-transform duration-300 sm:duration-700 sm:group-hover:scale-110"
          />
          
          {/* Quick Actions Overlay - Desktop only */}
          {!isMobile && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              >
                <FiShoppingCart className="text-lg" />
              </button>
              <button
                onClick={handleViewProduct}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              >
                <FiEye className="text-lg" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Product Name */}
          <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1 sm:group-hover:text-orange-500 transition-colors duration-300">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="mt-3 sm:mt-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 ">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹{discountedPrice}
              </span>
              
              {hasAnyDiscount && (
                <>
                  <span className="text-base sm:text-lg text-gray-400 line-through">
                    ₹{original}
                  </span>
                  <div className="px-2 py-1 rounded bg-gradient-to-r from-amber-500 to-orange-500 lg:ml-5">
                    <span className="text-xs font-bold text-white">
                    Save ₹{original - discountedPrice}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons - Mobile optimized */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 group/btn flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold hover:shadow-lg sm:hover:shadow-xl active:scale-95 transition-all duration-300 text-sm sm:text-base"
            >
              <FiShoppingCart className="text-base sm:text-lg sm:group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="whitespace-nowrap">Add to Cart</span>
            </button>
            
            <button
              onClick={handleViewProduct}
              className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-orange-600 sm:border-2 sm:border-orange-400 text-gray-700 sm:text-yellow-700 font-semibold hover:bg-gray-50 sm:hover:bg-yellow-50 sm:hover:border-yellow-400 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FiEye className="text-base sm:text-lg" />
              <span className="whitespace-nowrap">View Details</span>
            </button>
          </div>
        </div>

        {/* Green Corner Accents - Desktop only */}
        {!isMobile && (
          <>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-emerald-400/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-emerald-400/30 rounded-bl-2xl" />
          </>
        )}

        {/* Green Hover Glow Effect - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-400/20 transition-all duration-500 pointer-events-none" />
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-5px) rotate(2deg); }
          66% { transform: translateY(3px) rotate(-1deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        /* Mobile-specific touch optimizations */
        @media (max-width: 640px) {
          button {
            min-height: 44px; /* Minimum touch target size */
          }
          
          img {
            max-height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;