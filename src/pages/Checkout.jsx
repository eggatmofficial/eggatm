


// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { buyNowOrderAPI, initiate, verify } from "../api/order.api";
// import toast from "react-hot-toast";
// import {
//   FiMapPin,
//   FiCreditCard,
//   FiCheck,
//   FiLock,
//   FiChevronRight,
//   FiPackage,
//   FiTruck,
//   FiHome,
//   FiUser,
//   FiChevronLeft,
//   FiShoppingBag,
//   FiShield,
//   FiClock,
//   FiEdit2,
//   FiPlus,
//   FiShoppingCart
// } from "react-icons/fi";
// import { FaRupeeSign } from "react-icons/fa";
// import axios from "axios";
// import api from "../api/axios";
// import { getCartAPI } from "../api/cart.api";
// import { setCartFromBackend } from "../store/cart.store";

// const Checkout = () => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const { items } = useSelector((state) => state.checkout);
//   const [isMobile, setIsMobile] = useState(false);


//   console.log("items product", items);
//   console.log("item from auth Store", user);
//   console.log("user address", user?.addresses);
  
//   const addresses = user?.addresses || [];
//   // Get only the default address or first address
//   const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
  
//   const [activeStep, setActiveStep] = useState(1);
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);
//   const [selectedAddressId, setSelectedAddressId] = useState(
//     defaultAddress?._id || null
//   );
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
// const [processingMessage, setProcessingMessage] = useState("");


//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Detect mobile screen
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//     };
    
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Redirect guards
//   if (!isAuthenticated) return <Navigate to="/login" />;
//   if (!items || items.length === 0) return <Navigate to="/" />;

//   // If no address exists
//   if (!defaultAddress) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//         <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
//           <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
//             <FiMapPin className="text-2xl sm:text-3xl text-red-500" />
//           </div>
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
//             No Address Found
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
//             Please add an address in your profile to proceed with checkout.
//           </p>
//           <button
//             onClick={() => navigate("/profile/addresses")}
//             className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-md text-sm sm:text-base"
//           >
//             Add Address in Profile
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const totalAmount = items.reduce(
//     (sum, item) => sum + item.totalPrice,
//     0
//   );

//   // Helper function to get image URL from item
//   const getItemImage = (item) => {
//     if (item.image) {
//       return item.image;
//     }
    
//     if (item.productId && item.productId.images && item.productId.images.length > 0) {
//       return item.productId.images[0];
//     }
    
//     if (item.mainImage) {
//       return item.mainImage;
//     }
    
//     return "https://via.placeholder.com/150?text=No+Image";
//   };

//   // Helper function to get product name from item
//   const getItemName = (item) => {
//     if (item.name) {
//       return item.name;
//     }
    
//     if (item.productId && item.productId.name) {
//       return item.productId.name;
//     }
    
//     return "Product Name Not Available";
//   };

//   // const handlePlaceOrder = async () => {
//   //   try {
//   //     setIsPlacingOrder(true);

//   //     let orderRes;

//   //     if (items.length === 1) {
//   //       // BUY NOW FLOW
//   //       const product = items[0];
//   //       console.log("🛒 CHECKOUT ITEMS 👉", items);

//   //       orderRes = await buyNowOrderAPI({
//   //         productId: product.productId?._id || product.productId,
//   //         variantId: product.variantId,
//   //         variantLabel: product.variantLabel,
//   //         quantity: product.quantity,
//   //         address: defaultAddress._id, // Use default address ID
//   //       });
//   //     } else {
//   //       // CART FLOW (MULTIPLE PRODUCTS)
//   //       orderRes = await api.post("/orders/cart/checkout", {
//   //         address: defaultAddress._id, // Use default address ID
//   //         items: items.map(item => ({
//   //           productId: item.productId?._id || item.productId,
//   //           variantId: item.variantId,
//   //           variantLabel: item.variantLabel,
//   //           quantity: item.quantity,
//   //         })),
//   //       });
//   //     }

//   //     const orderId = orderRes.data.data._id;
//   //     console.log("ORDER ID ", orderId);

//   //     // INITIATE PAYMENT
//   //     const paymentRes = await initiate({ orderId });

//   //     const { razorpayOrderId, amount, key } = paymentRes.data.data;

//   //     // OPEN RAZORPAY
//   //     const options = {
//   //       key,
//   //       amount: amount * 100,
//   //       currency: "INR",
//   //       name: "EGG! ATM",
//   //       image: "https://res.cloudinary.com/dqtk1trh0/image/upload/v1768355429/Egg_ATM_Logo_s1yyhp.jpg",
//   //       description: "Secure Checkout",
//   //       order_id: razorpayOrderId,
//   //       prefill: {
//   //         name: user?.name || "",
//   //         email: user?.email || "",
//   //         contact: user?.phone || "",
//   //       },
//   //       theme: {
//   //         color: "#faa807",
//   //       },
//   //       handler: async function (response) {
//   //         console.log("Razorpay handler triggered");
//   //         await verify({
//   //           razorpay_order_id: response.razorpay_order_id,
//   //           razorpay_payment_id: response.razorpay_payment_id,
//   //           razorpay_signature: response.razorpay_signature,
//   //         });
//   //         console.log(" Payment verified");
//   //         const cartRes = await getCartAPI();
//   //         console.log("Cart API response:", cartRes.data.data);

//   //         dispatch(setCartFromBackend(cartRes.data.data));

//   //         toast.success(" Payment Successful");

//   //         navigate("/products");
//   //       },
//   //     };

//   //     new window.Razorpay(options).open();
//   //   } catch (err) {
//   //     console.error("PAYMENT ERROR ❌", err);
//   //     toast.error("Order or payment failed");
//   //   } finally {
//   //     setIsPlacingOrder(false);
//   //   }
//   // };





// //   const handlePlaceOrder = async () => {
// //   try {

    
// //       setIsPlacingOrder(true);

// //     let orderRes;

// //     if (items.length === 1) {
// //       // BUY NOW FLOW
// //       const product = items[0];
// //       console.log("🛒 CHECKOUT ITEMS 👉", items);


// //       orderRes = await buyNowOrderAPI({
// //         productId: product.productId,
// //         variantId: product.variantId,  
// //         variantLabel: product.variantLabel,
// //         quantity: product.quantity,
// //         address: selectedAddressId,
// //       });
// //     } else {
// //       // CART FLOW (MULTIPLE PRODUCTS)
// //       orderRes = await api.post("/orders/cart/checkout", {
// //     address: selectedAddressId,
// //     items: items.map(item => ({
// //     productId: item.productId,
// //      variantId: item.variantId, 
// //     variantLabel: item.variantLabel,
// //     quantity: item.quantity,
// //     })),
// //   });

// //     }

// //     const orderId = orderRes.data.data._id;
// //     console.log("ORDER ID ", orderId);

// //     // INITIATE PAYMENT
// //     const paymentRes = await initiate({ orderId });

// //     const { razorpayOrderId, amount, key } = paymentRes.data.data;

// //     // OPEN RAZORPAY
// //       const options = {
// //     key,
// //     amount: amount * 100,
// //     currency: "INR",

// //     //  Company Name
// //     name: "Egg! ATM",

// //     // LOGO (must be public HTTPS)
// //     image: "https://res.cloudinary.com/dqtk1trh0/image/upload/v1768355429/Egg_ATM_Logo_s1yyhp.jpg",

// //     description: "Secure Checkout",

// //     order_id: razorpayOrderId,

// //     // Autofill customer info
// //     prefill: {
// //       name: user?.name || "",
// //       email: user?.email || "",
// //       contact: user?.phone || "",
// //     },

// //     //  Brand color
// //     theme: {
// //       color: "#faa807",
// //     },

// //       handler: async function (response) {
// //         console.log("Razorpay handler triggered");
// //         await verify({razorpay_order_id: response.razorpay_order_id,razorpay_payment_id: response.razorpay_payment_id,razorpay_signature: response.razorpay_signature,})
// //          console.log(" Payment verified");
// //         const cartRes = await getCartAPI();
// //         console.log("Cart API response:", cartRes.data.data);

// //         dispatch(setCartFromBackend(cartRes.data.data));

// //         toast.success(" Payment Successful");

// //         navigate("/products");
// //       },
// //     };

// //     new window.Razorpay(options).open();

// //   } catch (err) {
// //     console.error("PAYMENT ERROR ❌", err);
// //     toast.error("Order or payment failed");
// //   }
// // };



// const handlePlaceOrder = async () => {
//   try {
//     setIsPlacingOrder(true);

//     const orderRes = await api.post("/orders/cart/checkout", {
//       address: selectedAddressId,
//       items: items.map(item => ({
//         productId: item.productId._id || item.productId,
//         variantLabel: item.variantLabel,
//         quantity: item.quantity,
//       })),
//     });

//     const orderId = orderRes.data.data._id;

//     const paymentRes = await initiate({ orderId });
//     const { razorpayOrderId, amount, key } = paymentRes.data.data;

//     const options = {
//       key,
//       amount: amount * 100,
//       currency: "INR",
//       name: "Egg! ATM",
//       image: "https://res.cloudinary.com/dqtk1trh0/image/upload/v1768355429/Egg_ATM_Logo_s1yyhp.jpg",
//       order_id: razorpayOrderId,
//       theme: { color: "#faa807" },

//       handler: async (response) => {
//          setPaymentSuccess(true);
//          setProcessingMessage("Confirming your order...");

//         await verify({
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature,
//         });

//         setProcessingMessage("Finalizing order & sending confirmation...");

//         const cartRes = await getCartAPI();
//         dispatch(setCartFromBackend(cartRes.data.data));

//         toast.success("Payment Successful");
//         // navigate("/products");
//         setTimeout(() => {
//           navigate("/products");
//         }, 1500);
//       }
//     };

//     new window.Razorpay(options).open();

//   } catch (err) {
//     toast.error("Order or payment failed");
//   } finally {
//     setIsPlacingOrder(false);
//   }
// };



//   // Format address for display
  
  
  
  
//   const formatAddress = (address) => {
//     if (!address) return [];
    
//     const parts = [];
    
//     if (address.line1) {
//       parts.push(address.line1);
//     }
    
//     if (address.line2) {
//       parts.push(address.line2);
//     }
    
//     const locationParts = [];
//     if (address.city) locationParts.push(address.city);
//     if (address.state) locationParts.push(address.state);
//     if (address.pincode) locationParts.push(address.pincode);
    
//     if (locationParts.length > 0) {
//       parts.push(locationParts.join(", "));
//     }
    
//     if (address.landmark) {
//       parts.push(`Landmark: ${address.landmark}`);
//     }
    
//     return parts;
//   };

//   // Render the single address card (only one address shown)
//   const renderSingleAddressCard = () => {
//     const addressParts = formatAddress(defaultAddress);
    
//     return (
//       <div className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md">
//         <div className="flex items-center justify-between mb-3 sm:mb-4">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
//               <FiCheck className="text-white text-xs" />
//             </div>
//             <div>
//               <div className="flex items-center gap-2">
//                 <h3 className="font-bold text-gray-800 text-sm sm:text-base">
//                   {defaultAddress.fullName}
//                 </h3>
//                 {defaultAddress.isDefault && (
//                   <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
//                     DEFAULT
//                   </span>
//                 )}
//               </div>
//               <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
//                 📱 {defaultAddress.phone}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Address Details */}
//         <div className="space-y-1.5 sm:space-y-2 pl-7 sm:pl-9">
//           {addressParts.map((part, index) => (
//             <p 
//               key={index} 
//               className="text-gray-700 text-xs sm:text-sm leading-relaxed"
//             >
//               {part}
//             </p>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Render order items preview
//   const renderOrderItemsPreview = () => {
//     return (
//       <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
//         <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
//           <FiShoppingBag className="text-orange-500 text-lg sm:text-xl" />
//           Order Items ({items.length})
//         </h3>
        
//         <div className="space-y-3 sm:space-y-4">
//           {items.map((item, index) => {
//             const imageUrl = getItemImage(item);
//             const productName = getItemName(item);
//             const variantLabel = item.variantLabel || "Standard";
//             const price = item.price || 0;
//             const quantity = item.quantity || 1;
//             const totalPrice = item.totalPrice || price * quantity;
            
//             return (
//               <div 
//                 key={index} 
//                 className="flex items-center gap-3 sm:gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 {/* Product Image */}
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//                   <img 
//                     src={imageUrl}
//                     alt={productName}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "https://via.placeholder.com/150?text=No+Image";
//                     }}
//                   />
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
//                     <h4 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1">
//                       {productName}
//                     </h4>
//                     <p className="font-bold text-gray-900 text-sm sm:text-base">
//                       ₹{totalPrice}
//                     </p>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 sm:mt-2">
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                         {variantLabel}
//                       </span>
//                       <span className="text-xs sm:text-sm text-gray-600">
//                         Qty: {quantity}
//                       </span>
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0">
//                       ₹{price} each
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
        
//         {/* Order Summary - Shown only on mobile in the preview */}
//         {isMobile && (
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-gray-600 text-sm">Subtotal</span>
//               <span className="font-medium">₹{totalAmount}</span>
//             </div>
//             <div className="flex justify-between items-center mb-2">
//               {/* <span className="text-gray-600 text-sm">Shipping</span> */}
//               {/* <span className="font-medium text-green-600">FREE</span> */}
//             </div>
//             <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
//               <span>Total</span>
//               <span className="text-orange-600">₹{totalAmount}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Success screen
//   if (orderPlaced) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
//         <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center animate-fadeIn">
//           <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
//             <FiCheck className="text-3xl sm:text-4xl text-white" />
//           </div>
//           <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
//             🎉 Order Confirmed!
//           </h1>
//           <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
//             Your order has been placed successfully. We'll notify you once it ships.
//           </p>
          
//           <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
//             <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
//               <FiTruck className="text-xl sm:text-2xl text-orange-500" />
//               <span className="font-semibold text-gray-800 text-sm sm:text-base">Estimated Delivery</span>
//             </div>
//             <p className="text-xl sm:text-2xl font-bold text-gray-900">3-5 Business Days</p>
//           </div>
          
//           <button
//             onClick={() => navigate("/orders")}
//             className="w-full py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
//           >
//             View My Orders
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (paymentSuccess) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
//       <div className="text-center max-w-md px-6">
//         <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
//           <FiCheck className="text-4xl text-green-600" />
//         </div>

//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Payment Successful 🎉
//         </h2>

//         <p className="text-gray-600 mb-4">
//           {processingMessage}
//         </p>

//         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div className="h-full bg-green-500 animate-progress"></div>
//         </div>
//       </div>
//     </div>
//   );
// }


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4">
//       {/* Mobile Header */}
//       {isMobile && (
//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate(-1)}
//               className="p-2 rounded-lg bg-white shadow-sm"
//             >
//               <FiChevronLeft className="text-xl text-gray-700" />
//             </button>
//             <h1 className="text-xl font-bold text-gray-900">
//               Checkout
//             </h1>
//           </div>
//           <button
//             onClick={() => navigate("/profile/addresses")}
//             className="text-xs text-orange-600 hover:text-orange-700 font-medium"
//           >
//             Manage Address
//           </button>
//         </div>
//       )}

//       {/* Desktop Header */}
//       {!isMobile && (
//         <div className="mb-6 sm:mb-10 text-center">
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
//             Complete Your Order
//           </h1>
//           <p className="text-gray-600 text-base sm:text-lg">
//             Review your items and delivery details
//           </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
//           {/* Main Content - Left 2/3 */}
//           <div className="lg:w-2/3 space-y-4 sm:space-y-6 lg:space-y-8">
//             {/* Progress Steps - Mobile Version */}
//             {isMobile && (
//               <div className="bg-white rounded-xl shadow-sm p-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex flex-col items-center">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold mb-1
//                       ${activeStep >= 1 
//                         ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
//                         : 'bg-gray-200 text-gray-400'
//                       }`}
//                     >
//                       1
//                     </div>
//                     <span className="text-xs font-medium">Order Items</span>
//                   </div>
                  
//                   <div className="flex-1 h-1 mx-2 bg-gray-200">
//                     <div className={`h-full rounded-full transition-all duration-500
//                       ${activeStep >= 2 ? 'bg-gradient-to-r from-orange-500 to-amber-500' : ''}`}
//                       style={{ width: activeStep >= 2 ? '100%' : '0%' }}
//                     ></div>
//                   </div>
                  
//                   <div className="flex flex-col items-center">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold mb-1
//                       ${activeStep >= 2 
//                         ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
//                         : 'bg-gray-200 text-gray-400'
//                       }`}
//                     >
//                       2
//                     </div>
//                     <span className="text-xs font-medium">Delivery Address</span>
//                   </div>
                  
//                   <div className="flex-1 h-1 mx-2 bg-gray-200">
//                     <div className={`h-full rounded-full transition-all duration-500
//                       ${activeStep >= 3 ? 'bg-gradient-to-r from-orange-500 to-amber-500' : ''}`}
//                       style={{ width: activeStep >= 3 ? '100%' : '0%' }}
//                     ></div>
//                   </div>
                  
//                   <div className="flex flex-col items-center">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold mb-1
//                       ${activeStep >= 3 
//                         ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
//                         : 'bg-gray-200 text-gray-400'
//                       }`}
//                     >
//                       3
//                     </div>
//                     <span className="text-xs font-medium">Payment</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Progress Steps - Desktop Version */}
//             {!isMobile && (
//               <div className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className="flex items-center justify-between mb-8">
//                   {[
//                     { number: 1, label: "Order Items", active: activeStep >= 1 },
//                     { number: 2, label: "Delivery Address", active: activeStep >= 2 },
//                     { number: 3, label: "Payment", active: activeStep >= 3 }
//                   ].map((step) => (
//                     <div key={step.number} className="flex items-center">
//                       <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all
//                         ${step.active 
//                           ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' 
//                           : 'bg-gray-200 text-gray-400'
//                         }`}
//                       >
//                         {step.number}
//                       </div>
//                       <div className="ml-3">
//                         <div className="text-xs text-gray-500">Step {step.number}</div>
//                         <div className="font-semibold">{step.label}</div>
//                       </div>
//                       {step.number < 3 && (
//                         <div className="mx-6 w-20 h-1 bg-gray-200 rounded-full">
//                           <div className={`h-full rounded-full transition-all duration-500
//                             ${step.active ? 'bg-gradient-to-r from-orange-500 to-amber-500' : ''}`}
//                             style={{ width: step.active ? '100%' : '0%' }}
//                           ></div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Order Items Preview */}
//             {renderOrderItemsPreview()}

//             {/* Delivery Address Section - Now shows only one address */}
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
//               <div className="flex items-center justify-between mb-4 sm:mb-6">
//                 <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
//                   <FiMapPin className="text-orange-500 text-lg sm:text-xl" />
//                   Delivery Address
//                 </h2>
//               </div>

//               {/* Single Address Card - Always shown */}
//               {renderSingleAddressCard()}

//               {/* Continue Button - Always enabled since we have a default address */}
//               <button
//                 onClick={() => {
//                   setActiveStep(2);
//                   if (isMobile) {
//                     document.querySelector('.order-summary')?.scrollIntoView({ behavior: 'smooth' });
//                   }
//                 }}
//                 className="mt-6 w-full py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base hover:shadow-lg hover:scale-[1.02]"
//               >
//                 Continue to Proceed
//                 <FiChevronRight className="text-lg" />
//               </button>
//             </div>
//           </div>

//           {/* Order Summary - Right 1/3 */}
//           <div className="lg:w-1/3 space-y-4 sm:space-y-6 lg:space-y-8">
//             {/* Order Summary Card */}
//             <div className="order-summary bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
//               <h2 className="text-lg text-center sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
//                 Order Summary
//               </h2>

//               <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
//                   <span className="font-medium text-sm sm:text-base">₹{totalAmount}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   {/* <span className="text-gray-600 text-sm sm:text-base">Shipping</span> */}
//                   {/* <span className="font-medium text-green-600 text-sm sm:text-base">FREE</span> */}
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 text-sm sm:text-base">Tax</span>
//                   <span className="font-medium text-sm sm:text-base">₹0</span>
//                 </div>
//               </div>

//               <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
//                 <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
//                   <span>Total Amount</span>
//                   <span className="text-orange-600">
//                     <span className="text-sm mr-1">₹</span>
//                     {totalAmount}
//                   </span>
//                 </div>
//               </div>

//               {/* Selected Address Preview - Desktop */}
//               {!isMobile && defaultAddress && (
//                 <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                   <div className="flex items-center gap-2 text-gray-700 mb-2">
//                     <FiMapPin className="text-orange-500" />
//                     <span className="text-sm font-medium">Delivering to:</span>
//                   </div>
//                   <div className="text-xs text-gray-600 space-y-1">
//                     <p className="font-medium">{defaultAddress.fullName}</p>
//                     <p className="line-clamp-2">{defaultAddress.line1}</p>
//                     {defaultAddress.line2 && (
//                       <p>{defaultAddress.line2}</p>
//                     )}
//                     <p>{defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}</p>
//                   </div>
//                 </div>
//               )}

//               {/* Secure Payment Info */}
//               {/* <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
//                 <div className="flex items-center gap-2 text-blue-700">
//                   <FiShield className="text-lg" />
//                   <span className="text-sm font-medium">Secure Payment</span>
//                 </div>
//                 <p className="text-xs text-blue-600 mt-1">
//                   Your payment is protected with 256-bit SSL encryption
//                 </p>
//               </div> */}

//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={activeStep < 2 || isPlacingOrder}
//                 className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 text-sm sm:text-base
//                   ${(activeStep >= 2 && !isPlacingOrder)
//                     ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-xl active:scale-95'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//               >
//                 {isPlacingOrder ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Placing Order...
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center gap-2">
//                     <FiCreditCard className="text-lg" />
//                     Place Order
//                   </div>
//                 )}
//               </button>

//               {/* Secure Checkout Info - Desktop */}
//               {/* {!isMobile && (
//                 <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
//                   <div className="flex items-center gap-3 text-gray-600">
//                     <FiLock className="text-green-500 text-xl" />
//                     <div>
//                       <p className="font-medium">Secure Checkout</p>
//                       <p className="text-sm text-gray-500">Your payment is safe and secure</p>
//                     </div>
//                   </div>
//                 </div>
//               )} */}

//               {/* Delivery Info */}
//               {/* <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center gap-2 text-gray-700">
//                   <FiClock className="text-lg" />
//                   <span className="text-sm font-medium">Delivery Estimate</span>
//                 </div>
//                 <p className="text-xs text-gray-600 mt-1">3-5 business days • Free shipping</p>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Bar */}
//       {isMobile && activeStep >= 2 && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 z-50">
//           <div className="flex items-center justify-between mb-2">
//             <div>
//               <div className="text-sm text-gray-500">Total Amount</div>
//               <div className="text-xl font-bold text-gray-900">₹{totalAmount}</div>
//             </div>
//             <button
//               onClick={handlePlaceOrder}
//               disabled={isPlacingOrder}
//               className={`px-6 py-3 rounded-lg font-bold text-sm min-w-[140px]
//                 ${!isPlacingOrder
//                   ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
//                   : 'bg-gray-200 text-gray-400'
//                 }`}
//             >
//               {isPlacingOrder ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Processing...
//                 </div>
//               ) : (
//                 "Pay Now"
//               )}
//             </button>
//           </div>
//           <div className="text-xs text-center text-gray-500">
//             By placing order, you agree to our Terms & Conditions
//           </div>
//         </div>
//       )}

//       {/* Add some animation styles */}
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out;
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
        
//         /* Mobile optimizations */
//         @media (max-width: 640px) {
//           button, [role="button"] {
//             min-height: 44px; /* Minimum touch target */
//           }
          
//           input, select, textarea {
//             font-size: 16px; /* Prevents iOS zoom on focus */
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Checkout;




import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { initiate, verify } from "../api/order.api";
import toast from "react-hot-toast";
import {
  FiMapPin,
  FiCreditCard,
  FiCheck,
  FiChevronRight,
  FiPackage,
  FiTruck,
  FiHome,
  FiChevronLeft,
  FiShoppingBag,
  FiTruck as FiShipping,
  FiAlertCircle,
  FiTag,
} from "react-icons/fi";
import api from "../api/axios";
import { getCartAPI } from "../api/cart.api";
import { setCartFromBackend } from "../store/cart.store";

const Checkout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("COURIER");
  const [shippingCharge, setShippingCharge] = useState(0);
  
  const addresses = user?.addresses || [];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
  
  const [activeStep, setActiveStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress?._id || null
  );
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processingMessage, setProcessingMessage] = useState("");
  const [itemPrices, setItemPrices] = useState([]);

  const cartItems = useSelector((state) => state.cart.items);
  const checkoutItems = useSelector((state) => state.checkout.items);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isBuyNow = checkoutItems && checkoutItems.length > 0;
  const itemsToCheckout = isBuyNow ? checkoutItems : cartItems;

  // Fetch actual prices from backend
  const fetchActualPrices = useCallback(async () => {
    if (!itemsToCheckout || itemsToCheckout.length === 0) return;

    try {
      const pricePromises = itemsToCheckout.map(async (item) => {
        try {
          const productId = item.productId?._id || item.productId;
          
          const productRes = await api.get(`/products/${productId}`);
          const product = productRes.data.data;
          
          const variant = product.variants?.find(v => v.label === item.variantLabel);
          if (!variant) return null;

          let actualPrice = variant.price;
          
          if (product.discount?.isActive) {
            if (product.discount.type === "PERCENTAGE") {
              actualPrice = variant.price - (variant.price * product.discount.value / 100);
            } else if (product.discount.type === "FIXED") {
              actualPrice = variant.price - product.discount.value;
            }
          }
          
          if (variant.discountedPrice) {
            actualPrice = variant.discountedPrice;
          }

          return {
            productId,
            variantLabel: item.variantLabel,
            name: product.name,
            originalPrice: variant.price,
            actualPrice: Math.max(actualPrice, 0),
            quantity: item.quantity || 1,
            weight: variant.unit === "kg" ? variant.weight * 1000 : variant.weight || 0,
            discount: product.discount,
            image: product.images?.[0] || product.mainImage,
          };
        } catch (err) {
          console.error("Error fetching product price:", err);
          return null;
        }
      });

      const prices = await Promise.all(pricePromises);
      const validPrices = prices.filter(p => p !== null);
      setItemPrices(validPrices);
      
      console.log("💰 ACTUAL PRICES FROM BACKEND:", validPrices);

    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  }, [itemsToCheckout]);

  // Fetch prices on component mount
  useEffect(() => {
    if (itemsToCheckout && itemsToCheckout.length > 0) {
      fetchActualPrices();
    }
  }, [itemsToCheckout, fetchActualPrices]);

  // Process items with actual prices
  const processedItems = useCallback(() => {
    if (!itemsToCheckout || itemsToCheckout.length === 0) return [];
    
    return itemsToCheckout.map(item => {
      const productId = item.productId?._id || item.productId;
      const productIdObj = item.productId?._id 
        ? item.productId 
        : { _id: item.productId };
      
      const backendPrice = itemPrices.find(p => 
        p.productId === productId && p.variantLabel === item.variantLabel
      );
      
      const price = backendPrice?.actualPrice || item.price || 0;
      const quantity = item.quantity || 1;
      const totalPrice = price * quantity;
      const originalPrice = backendPrice?.originalPrice || item.price || 0;
      const discount = originalPrice > price ? originalPrice - price : 0;
      
      const weight = backendPrice?.weight || item.weight || 0;
      
      return {
        ...item,
        productId: productIdObj,
        price,
        originalPrice,
        discount,
        quantity,
        totalPrice,
        weight,
        variantLabel: item.variantLabel,
        name: backendPrice?.name || item.name || item.productId?.name || "Product",
        image: backendPrice?.image || item.image || item.productId?.images?.[0] || item.mainImage || "https://via.placeholder.com/150?text=No+Image",
        hasDiscount: discount > 0
      };
    });
  }, [itemsToCheckout, itemPrices]);

  // Calculate totals
  const calculatedTotals = useCallback(() => {
    const items = processedItems();
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const totalDiscount = items.reduce((sum, item) => sum + (item.discount * item.quantity), 0);
    
    return { subtotal, totalDiscount };
  }, [processedItems]);

  const { subtotal, totalDiscount } = calculatedTotals();
  const totalAmount = subtotal + shippingCharge;

  // 🔥 SHIPPING ESTIMATION
  useEffect(() => {
    if (!itemsToCheckout || itemsToCheckout.length === 0) return;

    const items = processedItems();
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);
    
    api.post("/shipping/estimate", {
      shippingMethod,
      items: items.map(i => ({
        weight: i.weight || 0,
        quantity: i.quantity,
      })),
    }).then(res => {
      const charge = res.data.data?.charge || 0;
      setShippingCharge(charge);
    }).catch(err => {
      console.error("Shipping estimation error:", err);
      switch(shippingMethod) {
        case "COURIER": setShippingCharge(50); break;
        case "TRANSPORT": setShippingCharge(30); break;
        case "PICKUP": setShippingCharge(0); break;
        default: setShippingCharge(50);
      }
    });
  }, [shippingMethod, processedItems, itemsToCheckout]);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Redirect guards
  if (!isAuthenticated) return <Navigate to="/" />;
  if (!itemsToCheckout || itemsToCheckout.length === 0) return <Navigate to="/" />;

  // If no address exists
  if (!defaultAddress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FiMapPin className="text-2xl sm:text-3xl text-red-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            No Address Found
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            Please add an address in your profile to proceed with checkout.
          </p>
          <button
            onClick={() => navigate("/profile/addresses")}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-md text-sm sm:text-base"
          >
            Add Address in Profile
          </button>
        </div>
      </div>
    );
  }

  // Validation function
  const validateCheckout = () => {
    const items = processedItems();
    
    const invalidItems = items.filter(item => {
      return !item.productId?._id || !item.variantLabel || !item.quantity || item.quantity <= 0;
    });
    
    if (invalidItems.length > 0) {
      toast.error("Some items have invalid data. Please try again.");
      return false;
    }
    
    if (!shippingMethod) {
      toast.error("Please select a shipping method");
      return false;
    }
    
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return false;
    }
    
    console.log("✅ Checkout validation passed");
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateCheckout()) return;

    try {
      setIsPlacingOrder(true);
      setProcessingMessage("Creating your order...");

      const items = processedItems();
      
      console.log("🛒 CHECKOUT ITEMS:", {
        itemCount: items.length,
        isBuyNow,
        items: items.map(item => ({
          name: item.name,
          variant: item.variantLabel,
          price: item.price,
          quantity: item.quantity,
          total: item.totalPrice
        }))
      });

      let orderRes;
      
      if (isBuyNow && items.length === 1) {
        // Single product buy now
        console.log("⚡ USING BUY NOW (single product)");
        orderRes = await api.post("/orders/buy-now", {
          address: selectedAddressId,
          shippingMethod,
          productId: items[0].productId._id,
          variantLabel: items[0].variantLabel,
          quantity: items[0].quantity,
        });
      } else {
        // Cart checkout (multiple items or cart items)
        console.log("🛒 USING CART CHECKOUT (multiple items)");
        orderRes = await api.post("/orders/cart/checkout", {
          address: selectedAddressId,
          shippingMethod,
          items: items.map(item => ({
            productId: item.productId._id,
            variantLabel: item.variantLabel,
            quantity: item.quantity,
          })),
        });
      }

      const orderData = orderRes.data.data;
      const orderId = orderData._id;
      const orderTotalFromBackend = orderData.totalAmount;
      
      // Update shipping charge from backend
      const backendShippingCharge = orderData.shipping?.charge || 0;
      setShippingCharge(backendShippingCharge);
      
      console.log("✅ BACKEND ORDER RESPONSE:", {
        orderId,
        backendTotal: orderTotalFromBackend,
        backendShipping: backendShippingCharge,
        backendItems: orderData.items?.length || 0,
        uiTotal: totalAmount,
        uiItems: items.length,
        difference: Math.abs(orderTotalFromBackend - totalAmount)
      });

      // Check item count mismatch
      if (orderData.items?.length !== items.length) {
        console.error("❌ ITEM COUNT MISMATCH:", {
          frontendItems: items.length,
          backendItems: orderData.items?.length,
        });
        
        toast.error("Item count mismatch. Please refresh and try again.");
        setIsPlacingOrder(false);
        return;
      }

      // Check price mismatch
      if (Math.abs(orderTotalFromBackend - totalAmount) > 10) {
        toast.error(`Price mismatch detected. Please refresh and try again.`);
        setIsPlacingOrder(false);
        return;
      }

      setProcessingMessage("Initializing payment...");
      
      const paymentRes = await initiate({ orderId });
      const { razorpayOrderId, amount, key } = paymentRes.data.data;
      
      console.log("💳 Payment initiated:", {
        orderTotal: orderTotalFromBackend,
        razorpayAmount: amount,
        match: Math.abs(orderTotalFromBackend - amount) < 1
      });

      const options = {
        key,
        amount: Math.round(amount * 100),
        currency: "INR",
        name: "EGG! ATM",
        image: "https://res.cloudinary.com/dqtk1trh0/image/upload/v1768355429/Egg_ATM_Logo_s1yyhp.jpg",
        order_id: razorpayOrderId,
        description: `Order #${orderId.slice(-8)} (${items.length} items)`,
        theme: { color: "#faa807" },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: user?.phone || "",
        },

        handler: async (response) => {
          setPaymentSuccess(true);
          setProcessingMessage("Confirming your payment...");

          try {
            // Step 1: Verify payment
            await verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setProcessingMessage("Finalizing your order...");

            // Step 2: Refresh cart for cart-based orders
            if (!isBuyNow) {
              console.log("🛒 Refreshing cart after successful payment");
              await refreshCartAfterPayment();
            }

            // Step 3: Show success message
            toast.success("Payment Successful! Order confirmed.");
            
            // Step 4: Navigate after short delay
          // Step 4: Navigate + force refresh
setTimeout(() => {
  dispatch(clearCart());          // safety
  navigate("/products", { replace: true });
  navigate(0);                    // 🔥 force refresh
}, 300);

            
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            toast.error("Payment verification failed. Please contact support.");
            
            setPaymentSuccess(false);
            setIsPlacingOrder(false);
          }
        },

        modal: {
          ondismiss: function() {
            toast.error("Payment cancelled");
            setIsPlacingOrder(false);
            console.log("🛒 Payment cancelled, cart items preserved");
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Order placement error:", err);
      toast.error(err.response?.data?.message || "Order or payment failed. Please try again.");
      setIsPlacingOrder(false);
      setProcessingMessage("");
    }
  };

  // Format address for display
  const formatAddress = (address) => {
    if (!address) return [];
    
    const parts = [];
    if (address.line1) parts.push(address.line1);
    if (address.line2) parts.push(address.line2);
    
    const locationParts = [];
    if (address.city) locationParts.push(address.city);
    if (address.state) locationParts.push(address.state);
    if (address.pincode) locationParts.push(address.pincode);
    
    if (locationParts.length > 0) parts.push(locationParts.join(", "));
    if (address.landmark) parts.push(`Landmark: ${address.landmark}`);
    
    return parts;
  };

  // Render address card
  const renderSingleAddressCard = () => {
    const addressParts = formatAddress(defaultAddress);
    
    return (
      <div className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <FiCheck className="text-white text-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                  {defaultAddress.fullName}
                </h3>
                {defaultAddress.isDefault && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    DEFAULT
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                📱 {defaultAddress.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2 pl-7 sm:pl-9">
          {addressParts.map((part, index) => (
            <p key={index} className="text-gray-700 text-xs sm:text-sm leading-relaxed">
              {part}
            </p>
          ))}
        </div>
      </div>
    );
  };

  // Progress steps
  const steps = [
    { number: 1, label: "Order Items", active: activeStep >= 1, icon: FiShoppingBag },
    { number: 2, label: "Delivery Address", active: activeStep >= 2, icon: FiMapPin },
    { number: 3, label: "Shipping Method", active: activeStep >= 3, icon: FiShipping },
    { number: 4, label: "Payment", active: activeStep >= 4, icon: FiCreditCard }
  ];

  // Success screens
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center animate-fadeIn">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
            <FiCheck className="text-3xl sm:text-4xl text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            🎉 Order Confirmed!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
            Your order has been placed successfully. We'll notify you once it ships.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <FiTruck className="text-xl sm:text-2xl text-orange-500" />
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Estimated Delivery</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">3-5 Business Days</p>
          </div>
          
          <button
            onClick={() => navigate("/orders")}
            className="w-full py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
            <FiCheck className="text-4xl text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful 🎉
          </h2>

          <p className="text-gray-600 mb-4">
            {processingMessage}
          </p>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4">
      {/* Mobile Header */}
      {isMobile && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white shadow-sm">
              <FiChevronLeft className="text-xl text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Complete Your Order
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Review your items and delivery details
          </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:w-2/3 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Progress Steps */}
            {!isMobile && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all relative
                          ${step.active 
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {step.active ? <step.icon className="text-lg" /> : step.number}
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">Step {step.number}</div>
                          <div className="font-semibold text-sm">{step.label}</div>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="mx-4 w-16 h-1 bg-gray-200 rounded-full">
                          <div className={`h-full rounded-full transition-all duration-500
                            ${step.active ? 'bg-gradient-to-r from-orange-500 to-amber-500' : ''}`}
                            style={{ width: step.active ? '100%' : '0%' }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Progress Steps */}
            {isMobile && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1
                          ${step.active 
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {step.number}
                        </div>
                        <span className="text-[10px] font-medium text-center max-w-[50px] leading-tight">
                          {step.label}
                        </span>
                      </div>
                      
                      {index < steps.length - 1 && (
                        <div className="w-4 h-1 mx-1 bg-gray-200">
                          <div className={`h-full rounded-full transition-all duration-500
                            ${step.active ? 'bg-gradient-to-r from-orange-500 to-amber-500' : ''}`}
                            style={{ width: step.active ? '100%' : '0%' }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: Order Items Preview */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FiShoppingBag className="text-orange-500 text-lg sm:text-xl" />
                  Order Items ({processedItems().length})
                  {isBuyNow && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                      BUY NOW
                    </span>
                  )}
                </h3>
                {activeStep === 1 && (
                  <span className="text-xs sm:text-sm text-orange-600 font-medium">
                    Step 1 of 4
                  </span>
                )}
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {processedItems().map((item, index) => (
                  <div key={`${item.productId._id}-${item.variantLabel}-${index}`} 
                    className="flex items-center gap-3 sm:gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <h4 className="font-medium text-gray-800 text-sm sm:text-base line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2">
                            {item.hasDiscount && (
                              <span className="text-xs line-through text-gray-400">
                                ₹{item.originalPrice * item.quantity}
                              </span>
                            )}
                            <p className="font-bold text-gray-900 text-sm sm:text-base">
                              ₹{item.totalPrice}
                            </p>
                          </div>
                          {item.hasDiscount && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                              <FiTag className="inline mr-1" /> Save ₹{item.discount * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 sm:mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {item.variantLabel}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-600">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 sm:mt-0">
                          {item.hasDiscount ? (
                            <span>₹{item.price} each (was ₹{item.originalPrice})</span>
                          ) : (
                            <span>₹{item.price} each</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="space-y-2">
                  {totalDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Discount Applied:</span>
                      <span className="font-medium text-green-600">-₹{totalDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal ({processedItems().length} items):</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shipping:</span>
                    <span className="font-medium">₹{shippingCharge}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Order Total:</span>
                    <span className="text-lg font-bold text-orange-600">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              
              {/* Continue Button for Step 1 */}
              {activeStep === 1 && (
                <button onClick={() => setActiveStep(2)}
                  className="mt-6 w-full py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base hover:shadow-lg hover:scale-[1.02]">
                  Continue to Delivery Address
                  <FiChevronRight className="text-lg" />
                </button>
              )}
            </div>

            {/* STEP 2: Delivery Address Section */}
            {activeStep >= 2 && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                    <FiMapPin className="text-orange-500 text-lg sm:text-xl" />
                    Delivery Address
                  </h2>
                  {activeStep === 2 && (
                    <span className="text-xs sm:text-sm text-orange-600 font-medium">
                      Step 2 of 4
                    </span>
                  )}
                </div>

                {renderSingleAddressCard()}

                {/* Navigation buttons for Step 2 */}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setActiveStep(1)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition">
                    Back to Items
                  </button>
                  <button onClick={() => setActiveStep(3)}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
                    Continue to Shipping Method
                    <FiChevronRight className="text-lg" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Shipping Method Section */}
            {activeStep >= 3 && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FiTruck className="text-orange-500" />
                    Shipping Method
                  </h2>
                  {activeStep === 3 && (
                    <span className="text-xs sm:text-sm text-orange-600 font-medium">
                      Step 3 of 4
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition
                    ${shippingMethod === "COURIER" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}>
                    <input type="radio" name="shippingMethod" value="COURIER" checked={shippingMethod === "COURIER"}
                      onChange={(e) => setShippingMethod(e.target.value)} className="hidden" />
                    <FiPackage className="text-2xl text-orange-500" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Courier Delivery</p>
                      <p className="text-sm text-gray-600">Home delivery via courier (3–5 days)</p>
                    </div>
                    {shippingMethod === "COURIER" && <FiCheck className="text-green-600 text-xl" />}
                  </label>

                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition
                    ${shippingMethod === "TRANSPORT" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}>
                    <input type="radio" name="shippingMethod" value="TRANSPORT" checked={shippingMethod === "TRANSPORT"}
                      onChange={(e) => setShippingMethod(e.target.value)} className="hidden" />
                    <FiTruck className="text-2xl text-orange-500" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Transport / Bus</p>
                      <p className="text-sm text-gray-600">Bulk or intercity transport delivery</p>
                    </div>
                    {shippingMethod === "TRANSPORT" && <FiCheck className="text-green-600 text-xl" />}
                  </label>

                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition
                    ${shippingMethod === "PICKUP" ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}>
                    <input type="radio" name="shippingMethod" value="PICKUP" checked={shippingMethod === "PICKUP"}
                      onChange={(e) => setShippingMethod(e.target.value)} className="hidden" />
                    <FiHome className="text-2xl text-orange-500" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Self Pickup</p>
                      <p className="text-sm text-gray-600">Collect from store / hub</p>
                    </div>
                    {shippingMethod === "PICKUP" && <FiCheck className="text-green-600 text-xl" />}
                  </label>
                </div>

                {/* Shipping Charge Display */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Shipping Charge:</span>
                    <span className="text-lg font-bold text-gray-900">₹{shippingCharge}</span>
                  </div>
                </div>

                {/* Navigation buttons for Step 3 */}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setActiveStep(2)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition">
                    Back to Address
                  </button>
                  <button onClick={() => {
                    if (!shippingMethod) {
                      toast.error("Please select a shipping method");
                      return;
                    }
                    setActiveStep(4);
                  }} className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition">
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Payment Section */}
            {activeStep >= 4 && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                    <FiCreditCard className="text-orange-500 text-lg sm:text-xl" />
                    Payment
                  </h2>
                  {activeStep === 4 && (
                    <span className="text-xs sm:text-sm text-orange-600 font-medium">
                      Step 4 of 4
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Order Total</div>
                      <div className="text-sm text-gray-500">{processedItems().length} items</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">₹{totalAmount}</div>
                      <div className="text-sm text-gray-500">
                        ₹{subtotal} + ₹{shippingCharge} shipping
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FiAlertCircle className="text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Secure Payment</p>
                        <p className="text-sm text-blue-600">
                          You will be redirected to Razorpay for secure payment processing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation buttons for Step 4 */}
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setActiveStep(3)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition">
                    Back to Shipping
                  </button>
                  <button onClick={handlePlaceOrder} disabled={!shippingMethod || isPlacingOrder}
                    className={`flex-1 py-3 font-bold rounded-xl transition flex items-center justify-center gap-2
                      ${!isPlacingOrder
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:scale-[1.02]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    {isPlacingOrder ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${totalAmount}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary - Right 1/3 */}
          <div className="lg:w-1/3 space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="order-summary bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-lg text-center sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 border-b pb-3 sm:pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {totalDiscount > 0 && (
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                    <span className="text-green-700 text-sm">Total Savings</span>
                    <span className="font-bold text-green-700">-₹{totalDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                  <span className="font-medium text-sm sm:text-base">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Shipping Method</span>
                  <span className="font-medium text-sm">{shippingMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Shipping Charge</span>
                  <span className="font-medium text-sm">₹{shippingCharge}</span>
                </div>
              </div>

              <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-orange-600">₹{totalAmount}</span>
                </div>
              </div>

              {/* Selected Address Preview - Desktop */}
              {!isMobile && defaultAddress && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <FiMapPin className="text-orange-500" />
                    <span className="text-sm font-medium">Delivering to:</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="font-medium">{defaultAddress.fullName}</p>
                    <p className="line-clamp-2">{defaultAddress.line1}</p>
                    {defaultAddress.line2 && <p>{defaultAddress.line2}</p>}
                    <p>{defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pincode}</p>
                  </div>
                </div>
              )}

              {/* Progress indicator */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Checkout Progress</div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${(activeStep / steps.length) * 100}%` }}></div>
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">
                  Step {activeStep} of {steps.length}
                </div>
              </div>

              {/* Continue button for desktop */}
              {!isMobile && activeStep < 4 && (
                <button onClick={() => setActiveStep(activeStep + 1)}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition mt-4">
                  Continue to {steps[activeStep].label}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {isMobile && activeStep === 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 z-50">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-gray-500">Total Amount</div>
              <div className="text-xl font-bold text-gray-900">₹{totalAmount}</div>
            </div>
            <button onClick={handlePlaceOrder} disabled={isPlacingOrder}
              className={`px-6 py-3 rounded-lg font-bold text-sm min-w-[140px] transition-all flex items-center justify-center gap-2
                ${!isPlacingOrder
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400'}`}>
              {isPlacingOrder ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                `Pay ₹${totalAmount}`
              )}
            </button>
          </div>
          <div className="text-xs text-center text-gray-500">
            By placing order, you agree to our Terms & Conditions
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
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
        
        @media (max-width: 640px) {
          button, [role="button"] {
            min-height: 44px;
          }
          
          input, select, textarea {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;