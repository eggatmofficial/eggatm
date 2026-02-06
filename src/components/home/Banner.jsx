// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";


// import banner1 from "../../assets/banners/desktop/banner1.png";
// import banner2 from "../../assets/banners/desktop/banner2.png";
// import banner3 from "../../assets/banners/desktop/banner3.png";
// import banner4 from "../../assets/banners/desktop/banner4.png";
// import banner5 from "../../assets/banners/desktop/banner5.png";
// import banner6 from "../../assets/banners/desktop/banner6.png";

// import mBanner1 from "../../assets/banners/mobile/banner1.png";
// import mBanner2 from "../../assets/banners/mobile/banner2.png";
// import mBanner3 from "../../assets/banners/mobile/banner31.png";
// import mBanner4 from "../../assets/banners/mobile/banner4.png";
// import mBanner5 from "../../assets/banners/mobile/banner5.png";
// import mBanner6 from "../../assets/banners/mobile/banner6.png";

// const banners = [
//   {
//     desktopImage: banner1,
//     mobileImage: mBanner1,
//     title: "MUTTA MITTAI",
//     subtitle: "Our Signature Egg Sweet",
//     desc: "Fresh • Hot • Famous",
//     buttonText: "Taste the Tradition",
//     buttonLink: "/products",
//     animationStyle: "heroSmash"
//   },
//   {
//     desktopImage: banner2,
//     mobileImage: mBanner2,
//     title: "Egg Street Foods",
//     subtitle: "Everyone Loves",
//     desc: "Egg Chilli • Lollipop • Fried Rice",
//     buttonText: "Sweet with a Twist",
//     buttonLink: "/products",
//     animationStyle: "comicPop"
//   },
//   {
//     desktopImage: banner3,
//     mobileImage: mBanner3,
//     title: "EGG! ATM Menu",
//     subtitle: "All Your Favourite Egg Dishes",
//     desc: "Bread Omelette • Egg Chilli • Egg Cutlet • Mini Fried Rice",
//     buttonText: "Sweet Journey Starts Here",
//     buttonLink: "/products",
//     animationStyle: "bounceFlip"
//   },
//   {
//     desktopImage: banner4,
//     mobileImage: mBanner4,
//     title: "Real Egg Lovers",
//     subtitle: "Spicy • Juicy • Full Flavour",
//     desc: "Kaara Muttai • Egg Masala Fry • Egg Mixture",
//     buttonText: "One Bite Magic",
//     buttonLink: "/products",
//     animationStyle: "spinZoom"
//   },
//   {
//     desktopImage: banner5,
//     mobileImage: mBanner5,
//     title: "EGG! ATM Specials",
//     subtitle: "Hot • Fresh • Made in Front of You",
//     desc: "Kaara Muttai • Egg Masala Fry • Egg Paniyaram",
//     buttonText: "Crack Open Happiness",
//     buttonLink: "/products",
//     animationStyle: "cartoonNetwork"
//   },
//   {
//     desktopImage: banner6,
//     mobileImage: mBanner6,
//     title: "Start Your Own Franchise",
//     subtitle: "Low Investment • High Profit",
//     desc: "Join the fastest growing egg snack brand",
//     buttonText: "Learn More",
//     buttonLink: "/franchise",
//     animationStyle: "orangeGradient" 
//   }
// ];

// // ====================================
// // HERO SMASH ANIMATION (Banner 1)
// // ====================================
// const HeroSmashTitle = ({ text }) => (
//   <div className="relative">
//     <h1 className="relative font-black leading-tight whitespace-nowrap">
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           initial={{ 
//             y: -300,
//             opacity: 0,
//             scale: 3
//           }}
//           animate={{ 
//             y: 0,
//             opacity: 1,
//             scale: 1
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 500,
//             damping: 30,
//             delay: i * 0.03
//           }}
//           whileHover={{ 
//             scale: 1.2,
//             y: -5,
//             transition: { type: "spring", stiffness: 400 }
//           }}
//           className="inline-block text-white"
//           style={{ 
//             textShadow: `
//               0 1px 0 #ccc,
//               0 2px 0 #c9c9c9,
//               0 3px 0 #bbb,
//               0 4px 0 #b9b9b9,
//               0 5px 0 #aaa,
//               0 6px 1px rgba(0,0,0,.1),
//               0 0 5px rgba(0,0,0,.1),
//               0 1px 3px rgba(0,0,0,.3),
//               0 3px 5px rgba(0,0,0,.2),
//               0 5px 10px rgba(0,0,0,.25),
//               0 10px 10px rgba(0,0,0,.2),
//               0 20px 20px rgba(0,0,0,.15)
//             `
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h1>
//   </div>
// );

// // ====================================
// // COMIC POP ANIMATION (Banner 2)
// // ====================================
// const ComicPopTitle = ({ text }) => (
//   <div className="relative">
//     <h1 className="relative font-black leading-tight whitespace-nowrap">
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           initial={{ 
//             scale: 0,
//             rotate: -180
//           }}
//           animate={{ 
//             scale: 1,
//             rotate: 0
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 400,
//             damping: 20,
//             delay: i * 0.05
//           }}
//           whileHover={{ 
//             scale: 1.3,
//             rotate: [0, -10, 10, 0],
//             transition: { type: "spring", stiffness: 500 }
//           }}
//           className="inline-block text-yellow-400"
//           style={{ 
//             textShadow: `
//               2px 2px 0 #ff0000,
//               4px 4px 0 #ff5500,
//               6px 6px 0 #ffaa00,
//               8px 8px 0 #000,
//               8px 8px 15px rgba(0,0,0,0.5)
//             `
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h1>
    
//     {/* Comic dots */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.3 }}
//       transition={{ delay: 0.8 }}
//       className="absolute -inset-4 pointer-events-none"
//     >
//       {[...Array(20)].map((_, i) => (
//         <motion.div
//           key={i}
//           animate={{ 
//             scale: [0, 1.5, 0],
//             opacity: [0, 0.5, 0]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: i * 0.1
//           }}
//           className="absolute w-2 h-2 bg-red-500 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`
//           }}
//         />
//       ))}
//     </motion.div>
//   </div>
// );

// // ====================================
// // BOUNCE FLIP ANIMATION (Banner 3)
// // ====================================
// const BounceFlipTitle = ({ text }) => (
//   <div className="relative">
//     <h1 className="relative font-black leading-tight whitespace-nowrap">
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           initial={{ 
//             y: -100,
//             rotateX: -90,
//             opacity: 0,
//             scale: 0.5
//           }}
//           animate={{ 
//             y: [0, -30, 0, -15, 0],
//             rotateX: 0,
//             opacity: 1,
//             scale: 1
//           }}
//           transition={{
//             y: {
//               duration: 1.5,
//               delay: i * 0.08,
//               repeat: Infinity,
//               repeatDelay: 2
//             },
//             rotateX: {
//               type: "spring",
//               stiffness: 300,
//               damping: 25,
//               delay: i * 0.08
//             },
//             opacity: { duration: 0.4, delay: i * 0.08 },
//             scale: { type: "spring", stiffness: 350, damping: 20, delay: i * 0.08 }
//           }}
//           whileHover={{ 
//             scale: 1.4,
//             rotateY: 360,
//             transition: { 
//               rotateY: { duration: 0.6 },
//               scale: { type: "spring", stiffness: 500 }
//             }
//           }}
//           className="inline-block text-green-400"
//           style={{ 
//             textShadow: `
//               2px 2px 0 #059669,
//               4px 4px 0 #047857,
//               6px 6px 0 #065f46,
//               8px 8px 0 #000,
//               0 0 10px rgba(52, 211, 153, 0.5)
//             `
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h1>
    
//     {/* Bouncing balls */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.4 }}
//       transition={{ delay: 1 }}
//       className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4"
//     >
//       {[...Array(6)].map((_, i) => (
//         <motion.div
//           key={i}
//           animate={{ 
//             y: [0, -25, 0],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{
//             duration: 0.8,
//             repeat: Infinity,
//             delay: i * 0.1 + 1.2
//           }}
//           className="w-3 h-3 rounded-full bg-green-500"
//         />
//       ))}
//     </motion.div>
//   </div>
// );

// // ====================================
// // SPIN ZOOM ANIMATION (Banner 4)
// // ====================================
// const SpinZoomTitle = ({ text }) => (
//   <div className="relative">
//     <h1 className="relative font-black leading-tight whitespace-nowrap">
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           initial={{ 
//             scale: 0,
//             rotate: 720,
//             opacity: 0
//           }}
//           animate={{ 
//             scale: [1, 1.2, 1],
//             rotate: 0,
//             opacity: 1
//           }}
//           transition={{
//             scale: {
//               duration: 2,
//               delay: i * 0.06,
//               repeat: Infinity,
//               repeatDelay: 1
//             },
//             rotate: {
//               type: "spring",
//               stiffness: 200,
//               damping: 15,
//               delay: i * 0.06
//             },
//             opacity: { duration: 0.5, delay: i * 0.06 }
//           }}
//           whileHover={{ 
//             scale: 1.5,
//             rotate: 180,
//             color: "#f97316",
//             transition: { 
//               rotate: { duration: 0.4 },
//               scale: { type: "spring", stiffness: 400 }
//             }
//           }}
//           className="inline-block text-orange-400"
//           style={{ 
//             textShadow: `
//               1px 1px 0 #ea580c,
//               3px 3px 0 #c2410c,
//               5px 5px 0 #9a3412,
//               7px 7px 0 #000,
//               0 0 15px rgba(249, 115, 22, 0.6)
//             `
//           }}
//         >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h1>
    
//     {/* Spinning circles */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.3 }}
//       transition={{ delay: 0.8 }}
//       className="absolute -inset-4 pointer-events-none"
//     >
//       {[...Array(4)].map((_, i) => (
//         <motion.div
//           key={i}
//           animate={{ 
//             rotate: 360,
//             scale: [1, 1.3, 1]
//           }}
//           transition={{
//             rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
//             scale: { duration: 2, repeat: Infinity, delay: i * 0.5 }
//           }}
//           className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-orange-500/50 rounded-full"
//           style={{
//             transform: `translate(-50%, -50%)`
//           }}
//         />
//       ))}
//     </motion.div>
    
//     {/* Zoom particles */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.5 }}
//       transition={{ delay: 1.2 }}
//       className="absolute -inset-6 pointer-events-none"
//     >
//       {[...Array(12)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{ scale: 0, opacity: 1 }}
//           animate={{ 
//             scale: 2,
//             opacity: 0
//           }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             delay: i * 0.2 + 1.5
//           }}
//           className="absolute top-1/2 left-1/2 w-4 h-4 bg-orange-400 rounded-full"
//           style={{
//             transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateX(40px)`
//           }}
//         />
//       ))}
//     </motion.div>
//   </div>
// );

// // ====================================
// // CARTOON NETWORK STYLE ANIMATION (Banner 5)
// // ====================================
// const CartoonNetworkTitle = ({ text }) => {
//   const colors = ['#00AEEF', '#FFDE00', '#ED1C24', '#39B54A', '#8A2BE2'];
  
//   return (
//     <div className="relative">
//       {/* Cartoon Network Checkerboard Background */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.15 }}
//         transition={{ delay: 0.3 }}
//         className="absolute -inset-12 pointer-events-none"
//         style={{
//           backgroundImage: `
//             linear-gradient(45deg, #00AEEF 25%, transparent 25%),
//             linear-gradient(-45deg, #FFDE00 25%, transparent 25%),
//             linear-gradient(45deg, transparent 75%, #ED1C24 75%),
//             linear-gradient(-45deg, transparent 75%, #39B54A 75%)
//           `,
//           backgroundSize: '40px 40px',
//           backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
//           filter: 'blur(2px)'
//         }}
//       />
      
//       {/* Cartoon Network Bouncing Ball */}
//       <motion.div
//         animate={{ 
//           y: [0, -150, 0, -80, 0],
//           x: ['-100%', '100%', '-50%', '50%', '0%'],
//           scale: [0.5, 1.2, 0.8, 1.1, 0.9],
//           rotate: [0, 360, 720, 1080, 1440]
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//         className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-[#00AEEF] via-[#FFDE00] to-[#ED1C24] shadow-2xl"
//         style={{
//           filter: 'blur(8px)'
//         }}
//       />
      
//       {/* Main Text - Cartoon Network Style */}
//       <h1 className="relative font-black leading-tight whitespace-nowrap">
//         {text.split("").map((char, i) => (
//           <motion.span
//             key={i}
//             initial={{ 
//               y: -200,
//               scale: 0,
//               rotate: Math.random() * 90 - 45,
//               opacity: 0
//             }}
//             animate={{ 
//               y: [0, -15, 0, -8, 0],
//               scale: 1,
//               rotate: 0,
//               opacity: 1
//             }}
//             transition={{
//               y: {
//                 duration: 1.2,
//                 delay: i * 0.1,
//                 repeat: Infinity,
//                 repeatDelay: 1
//               },
//               scale: {
//                 type: "spring",
//                 stiffness: 400,
//                 damping: 25,
//                 delay: i * 0.05
//               },
//               rotate: {
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 20,
//                 delay: i * 0.05
//               },
//               opacity: { duration: 0.4, delay: i * 0.05 }
//             }}
//             whileHover={{ 
//               scale: 1.3,
//               y: -20,
//               rotate: [0, -10, 10, 0],
//               transition: { 
//                 rotate: { duration: 0.3 },
//                 scale: { type: "spring", stiffness: 500 }
//               }
//             }}
//             className="inline-block"
//             style={{ 
//               color: colors[i % colors.length],
//               textShadow: `
//                 0 0 0 #000,
//                 4px 4px 0 #000,
//                 8px 8px 0 rgba(0,0,0,0.3),
//                 12px 12px 0 rgba(0,0,0,0.2)
//               `,
//               WebkitTextStroke: '2px #000',
//               textStroke: '2px #000',
//               padding: '0 2px'
//             }}
//           >
//             {char === " " ? "\u00A0" : char}
//           </motion.span>
//         ))}
//       </h1>
      
//       {/* Cartoon Network TV Static Effect */}
//       <motion.div
//         animate={{ 
//           opacity: [0.02, 0.05, 0.02],
//           scale: [1, 1.02, 1]
//         }}
//         transition={{ 
//           duration: 0.1,
//           repeat: Infinity 
//         }}
//         className="absolute -inset-4 pointer-events-none"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 20% 30%, transparent 40%, rgba(255,255,255,0.03) 100%),
//             radial-gradient(circle at 80% 70%, transparent 40%, rgba(255,255,255,0.03) 100%)
//           `,
//           filter: 'contrast(150%)'
//         }}
//       />
      
//       {/* Cartoon Network Characters/Emojis */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.6 }}
//         transition={{ delay: 1 }}
//         className="absolute -inset-8 pointer-events-none"
//       >
//         {[...Array(8)].map((_, i) => {
//           const emojis = ['📺', '🎨', '✏️', '🎭', '🖍️', '📝', '🎪', '🤹'];
//           return (
//             <motion.div
//               key={i}
//               initial={{ 
//                 y: -50,
//                 x: Math.random() * 100 + '%',
//                 scale: 0,
//                 rotate: 0
//               }}
//               animate={{ 
//                 y: '100%',
//                 rotate: 360,
//                 scale: [0, 1.2, 0.8, 0]
//               }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Infinity,
//                 delay: i * 0.5,
//                 ease: "easeInOut"
//               }}
//               className="absolute text-3xl md:text-4xl"
//               style={{ 
//                 color: colors[i % colors.length]
//               }}
//             >
//               {emojis[i]}
//             </motion.div>
//           );
//         })}
//       </motion.div>
      
//       {/* Squiggly TV Lines */}
//       <motion.svg
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.3 }}
//         transition={{ delay: 1.2 }}
//         className="absolute -inset-4 pointer-events-none"
//         width="100%" 
//         height="100%"
//       >
//         {[...Array(5)].map((_, i) => (
//           <motion.path
//             key={i}
//             d={`M0,${i * 20 + 10} Q100,${i * 20} 200,${i * 20 + 20} T400,${i * 20} T600,${i * 20 + 20} T800,${i * 20}`}
//             stroke={colors[i % colors.length]}
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="5,5"
//             initial={{ pathLength: 0 }}
//             animate={{ 
//               pathLength: 1,
//               strokeDashoffset: [0, 20]
//             }}
//             transition={{
//               pathLength: { duration: 2, delay: 1.5 + i * 0.2 },
//               strokeDashoffset: { 
//                 duration: 1, 
//                 repeat: Infinity,
//                 ease: "linear"
//               }
//             }}
//           />
//         ))}
//       </motion.svg>
//     </div>
//   );
// };

// // ====================================
// // ORANGE/WHITE/YELLOW GRADIENT ANIMATION (Banner 6) 
// // ====================================
// const OrangeGradientTitle = ({ text }) => (
//   <div className="relative">
//     <h1 className="relative font-black leading-tight whitespace-nowrap">
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           initial={{ 
//             y: 100,
//             opacity: 0,
//             scale: 0.5,
//             rotate: -20
//           }}
//           animate={{ 
//             y: 0,
//             opacity: 1,
//             scale: 1,
//             rotate: 0
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 350,
//             damping: 25,
//             delay: i * 0.05,
//             duration: 0.7
//           }}
//           whileHover={{ 
//             scale: 1.3,
//             y: -10,
//             transition: { type: "spring", stiffness: 450 }
//           }}
//           className="inline-block"
//           style={{
//             background: `
//               linear-gradient(
//                 135deg,
//                 #FF7A00 0%,
//                 #FFB347 25%,
//                 #FFFFFF 50%,
//                 #FFE066 75%,
//                 #FFD700 100%
//               )
//             `,
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             textShadow: `
//               1px 1px 0 rgba(255,255,255,0.4),
//               2px 2px 0 rgba(0,0,0,0.15)
//             `
//           }}
//             >
//           {char === " " ? "\u00A0" : char}
//         </motion.span>
//       ))}
//     </h1>

    
//     {/* Sunburst rays */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.4 }}
//       transition={{ delay: 0.8 }}
//       className="absolute -inset-12 pointer-events-none"
//     >
//       {[...Array(16)].map((_, i) => (
//         <motion.div
//           key={i}
//           animate={{ 
//             scale: [0.8, 1.2, 0.8],
//             opacity: [0.2, 0.5, 0.2]
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: i * 0.1
//           }}
//           className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-transparent via-orange-400 to-transparent"
//           style={{
//             transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-40px)`
//           }}
//         />
//       ))}
//     </motion.div>
    
//     {/* Floating orange/yellow particles */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.5 }}
//       transition={{ delay: 0.6 }}
//       className="absolute inset-0 pointer-events-none overflow-hidden"
//     >
//       {[...Array(20)].map((_, i) => {
//         const colors = ['#FF6B00', '#FFA500', '#FFD700'];
//         const color = colors[i % colors.length];
        
//         return (
//           <motion.div
//             key={i}
//             initial={{ 
//               y: Math.random() * 100 + '%',
//               x: Math.random() * 100 + '%',
//               scale: 0,
//               rotate: 0
//             }}
//             animate={{ 
//               y: [null, '-100%'],
//               rotate: 360,
//               scale: [0, 1, 0]
//             }}
//             transition={{
//               duration: 3 + Math.random() * 2,
//               repeat: Infinity,
//               delay: i * 0.3,
//               ease: "linear"
//             }}
//             className="absolute w-3 h-3 rounded-full"
//             style={{ 
//               backgroundColor: color,
//               boxShadow: `0 0 10px ${color}`
//             }}
//           />
//         );
//       })}
//     </motion.div>
    
//     {/* Pulse circles */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 0.3 }}
//       transition={{ delay: 1 }}
//       className="absolute -inset-8 pointer-events-none"
//     >
//       {[...Array(3)].map((_, i) => (
//         <motion.div
//           key={i}
//           initial={{ scale: 0, opacity: 1 }}
//           animate={{ 
//             scale: 3,
//             opacity: 0
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             delay: i * 1 + 1.2
//           }}
//           className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-orange-400/50 rounded-full"
//           style={{
//             transform: `translate(-50%, -50%)`
//           }}
//         />
//       ))}
//     </motion.div>
    
//     {/* Rising heat waves */}
//     <motion.div
//       animate={{ 
//         y: ['0%', '-100%', '0%'],
//         opacity: [0.1, 0.3, 0.1]
//       }}
//       transition={{ 
//         duration: 4,
//         repeat: Infinity,
//         ease: "linear"
//       }}
//       className="absolute -inset-8 pointer-events-none"
//       style={{
//         background: 'linear-gradient(to top, transparent, rgba(255, 165, 0, 0.1), transparent)',
//         filter: 'blur(5px)'
//       }}
//     />
//   </div>
// );

// // Add CSS animation for gradient shift
// const style = document.createElement('style');
// style.textContent = `
//   @keyframes gradientShift {
//     0% { background-position: 0% 50%; }
//     50% { background-position: 100% 50%; }
//     100% { background-position: 0% 50%; }
//   }
// `;
// document.head.appendChild(style);

// // ANIMATED SUBTITLE
// const ExtremeSubtitle = ({ text, isCartoon = false, isOrange = false }) => (
//   <motion.div
//     initial={{ scale: 0, rotate: 180 }}
//     animate={{ scale: 1, rotate: 0 }}
//     transition={{ 
//       type: "spring",
//       stiffness: 300,
//       damping: 20,
//       delay: 0.8 
//     }}
//     className="inline-block"
//   >
//     <h2 className={`font-bold px-5 py-2.5 rounded-full backdrop-blur-sm border-2 ${
//       isCartoon
//         ? 'text-white bg-gradient-to-r from-[#00AEEF]/40 via-[#FFDE00]/40 to-[#ED1C24]/40 border-white/60' 
//         : isOrange
//         ? 'text-orange-100 bg-gradient-to-r from-orange-600/40 via-amber-600/40 to-yellow-600/40 border-orange-400/60'
//         : 'text-white bg-gradient-to-r from-black/50 to-black/30 border-white/20'
//     } shadow-xl`}>
//       {isCartoon && '📺 '}
//       {isOrange && '🔥 '}
//       {text}
//       {isCartoon && ' 📺'}
//       {isOrange && ' 🔥'}
//     </h2>
//   </motion.div>
// );

// // EXTREME TAGS
// const ExtremeTags = ({ items, isCartoon = false, isOrange = false }) => (
//   <div className="flex flex-wrap justify-center gap-2">
//     {items.map((item, i) => (
//       <motion.span
//         key={i}
//         initial={{ 
//           scale: 0,
//           rotate: -180,
//           y: 100
//         }}
//         animate={{ 
//           scale: 1,
//           rotate: 0,
//           y: 0
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 350,
//           damping: 25,
//           delay: 1 + (i * 0.1)
//         }}
//         whileHover={{ 
//           scale: 1.15,
//           y: -8,
//           rotate: [0, -3, 3, 0],
//           transition: { type: "spring", stiffness: 500 }
//         }}
//         className={`px-4 py-2 rounded-full backdrop-blur-sm font-bold shadow-lg whitespace-nowrap ${
//           isCartoon
//             ? 'bg-gradient-to-r from-[#00AEEF]/30 via-[#FFDE00]/30 to-[#ED1C24]/30 border-2 border-white/60 text-white'
//             : isOrange
//             ? 'bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 border-2 border-orange-400/60 text-orange-100'
//             : 'bg-white/10 border border-white/20 text-white'
//         } text-sm`}
//         style={{ 
//           textShadow: '1px 1px 3px rgba(0,0,0,0.8)'
//         }}
//       >
//         {isCartoon && '🥚 '}
//         {isOrange && '🚀 '}
//         {item}
//         {isCartoon && ' 🥚'}
//         {isOrange && ' 🚀'}
//       </motion.span>
//     ))}
//   </div>
// );

// // EXTREME BUTTON
// const ExtremeButton = ({ text, onClick, isMobile, isCartoon = false, isOrange = false }) => (
//   <motion.button
//     initial={{ scale: 0, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     transition={{ 
//       type: "spring",
//       stiffness: 300,
//       damping: 20,
//       delay: 1.5 
//     }}
//     whileHover={{ 
//       scale: isMobile ? 1.08 : 1.15,
//       y: -8,
//       transition: { type: "spring", stiffness: 450 } 
//     }}
//     whileTap={{ scale: 0.95 }}
//     onClick={onClick}
//     className="relative group"
//   >
//     {/* Button pulse effect */}
//     <motion.div
//       animate={{ 
//         scale: [1, 1.2, 1],
//         opacity: [0.3, 0.6, 0.3]
//       }}
//       transition={{ 
//         duration: 2, 
//         repeat: Infinity 
//       }}
//       className={`absolute -inset-3 rounded-full blur-md ${
//         isCartoon
//           ? 'bg-gradient-to-r from-[#00AEEF] via-[#FFDE00] to-[#ED1C24]' 
//           : isOrange
//           ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600'
//           : 'bg-gradient-to-r from-amber-500 to-orange-600'
//       }`}
//     />
    
//     {/* Main button */}
//     <div className={`relative rounded-full ${
//       isMobile ? 'px-8 py-3' : 'px-12 py-4'
//     } ${
//       isCartoon
//         ? 'bg-gradient-to-r from-[#00AEEF] via-[#FFDE00] to-[#ED1C24]'
//         : isOrange
//         ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500'
//         : 'bg-gradient-to-r from-amber-400 to-yellow-500'
//     } border-3 border-black shadow-xl`}>
//       <span className={`font-black text-black ${
//         isMobile ? 'text-base' : 'text-xl'
//       }`}>
//         {isCartoon && '📺 '}
//         {isOrange && '🔥 '}
//         {text}
//         {isCartoon && ' 📺'}
//         {isOrange && ' 🔥'}
//       </span>
      
//       {/* Arrow animation */}
//       {!isMobile && (
//         <motion.span
//           animate={{ 
//             x: [0, 8, 0],
//             scale: [1, 1.2, 1]
//           }}
//           transition={{ 
//             duration: 1.5, 
//             repeat: Infinity,
//             repeatType: "reverse" 
//           }}
//           className="ml-3 inline-block text-xl"
//         >
//           →
//         </motion.span>
//       )}
//     </div>
    
//     {/* Orange/yellow fire particles */}
//     {isOrange && !isMobile && (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.5 }}
//         transition={{ delay: 1.8 }}
//         className="absolute -inset-6 pointer-events-none"
//       >
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{ 
//               y: [0, -20, 0],
//               x: [0, Math.random() * 20 - 10, 0],
//               scale: [0, 0.8, 0],
//               opacity: [0, 0.8, 0]
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               delay: i * 0.2
//             }}
//             className="absolute top-1/2 left-1/2 text-xl"
//             style={{
//               color: i % 3 === 0 ? '#FF6B00' : i % 3 === 1 ? '#FFA500' : '#FFD700',
//               transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(20px)`
//             }}
//           >
//             🔥
//           </motion.div>
//         ))}
//       </motion.div>
//     )}
//   </motion.button>
// );

// // MAIN BANNER COMPONENT
// const Banner = () => {
//   const [index, setIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % banners.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const currentBanner = banners[index];
//   const bannerImage = isMobile ? currentBanner.mobileImage : currentBanner.desktopImage;
//   const isCartoon = currentBanner.animationStyle === 'cartoonNetwork';
//   const isOrange = currentBanner.animationStyle === 'orangeGradient';

//   const renderTitle = () => {
//     const style = currentBanner.animationStyle;
//     const title = currentBanner.title;
    
//     switch(style) {
//       case 'heroSmash':
//         return <HeroSmashTitle text={title} />;
//       case 'comicPop':
//         return <ComicPopTitle text={title} />;
//       case 'bounceFlip':
//         return <BounceFlipTitle text={title} />;
//       case 'spinZoom':
//         return <SpinZoomTitle text={title} />;
//       case 'cartoonNetwork':
//         return <CartoonNetworkTitle text={title} />;
//       case 'orangeGradient':
//         return <OrangeGradientTitle text={title} />;
//       default:
//         return <HeroSmashTitle text={title} />;
//     }
//   };

//   return (
//     <section className="relative w-full h-[42vh] md:h-[90vh] overflow-hidden bg-black">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={index}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//           className="absolute inset-0"
//         >
//           {/* Background Image */}
//           <motion.img
//             src={bannerImage}
//             alt={currentBanner.title}
//             className="absolute inset-0 w-full h-full object-cover"
//             initial={{ scale: 1.05 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 7 }}
//           />

//           {/* Dynamic overlay */}
//           <div className={`absolute inset-0 ${
//             isCartoon
//               ? 'bg-gradient-to-t from-black/80 via-[#00AEEF]/20 to-transparent'
//               : isOrange
//               ? 'bg-gradient-to-t from-black/80 via-orange-900/20 to-transparent'
//               : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent'
//           }`} />

//           {/* Content Container */}
//           <div className={`relative h-full flex flex-col items-center justify-center text-center px-4 ${
//             isMobile ? 'pb-6 pt-12' : 'pb-0'
//           }`}>
            
//             {/* Title - Single line */}
//             <div className={`mb-3 md:mb-4 w-full overflow-hidden ${
//               isMobile ? 'scale-90' : ''
//             }`}>
//               <div className={`${isMobile ? 'text-xl sm:text-2xl' : 'text-3xl md:text-5xl lg:text-7xl'} whitespace-nowrap`}>
//                 {renderTitle()}
//               </div>
//             </div>

//             {/* Subtitle */}
//             <div className="mb-3 md:mb-4">
//               <ExtremeSubtitle text={currentBanner.subtitle} isCartoon={isCartoon} isOrange={isOrange} />
//             </div>

//             {/* Tags */}
//             <div className={`mb-4 md:mb-6 ${
//               isMobile ? 'max-w-xs' : 'max-w-2xl'
//             }`}>
//               <ExtremeTags 
//                 items={currentBanner.desc.split(" • ").slice(0, isMobile ? 2 : undefined)}
//                 isCartoon={isCartoon}
//                 isOrange={isOrange}
//               />
//             </div>

//             {/* Button */}
//             <ExtremeButton 
//               text={currentBanner.buttonText} 
//               onClick={() => navigate(currentBanner.buttonLink)}
//               isMobile={isMobile}
//               isCartoon={isCartoon}
//               isOrange={isOrange}
//             />
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Navigation Dots */}
//       <div className={`absolute ${
//         isMobile ? 'bottom-3' : 'bottom-6'
//       } left-1/2 transform -translate-x-1/2 flex gap-2 z-20`}>
//         {banners.map((_, i) => (
//           <motion.button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`relative ${
//               isMobile ? 'w-2 h-2' : 'w-2.5 h-2.5'
//             } rounded-full transition-all duration-300 ${
//               i === index
//                 ? isCartoon ? "bg-[#00AEEF]" : 
//                   currentBanner.animationStyle === 'bounceFlip' ? "bg-green-400" :
//                   currentBanner.animationStyle === 'spinZoom' ? "bg-orange-400" :
//                   isOrange ? "bg-orange-500" : "bg-amber-400"
//                 : "bg-white/50"
//             }`}
//             aria-label={`Go to slide ${i + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Banner;




import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import banner1 from "../../assets/banners/desktop/banner1.png";
import banner2 from "../../assets/banners/desktop/banner2.png";
import banner3 from "../../assets/banners/desktop/banner3.png";
import banner4 from "../../assets/banners/desktop/banner4.png";
import banner5 from "../../assets/banners/desktop/banner5.png";
import banner6 from "../../assets/banners/desktop/banner6.png";

import mBanner1 from "../../assets/banners/mobile/banner1.png";
import mBanner2 from "../../assets/banners/mobile/banner2.png";
import mBanner3 from "../../assets/banners/mobile/banner31.png";
import mBanner4 from "../../assets/banners/mobile/banner4.png";
import mBanner5 from "../../assets/banners/mobile/banner5.png";
import mBanner6 from "../../assets/banners/mobile/banner6.png";

const banners = [
  // {
  //   desktopImage: banner1,
  //   mobileImage: mBanner1,
  //   title: "MUTTA MITTAI",
  //   subtitle: "Our Signature Egg Sweet",
  //   desc: "Fresh • Hot • Famous",
  //   buttonText: "Taste the Tradition",
  //   buttonLink: "/contact",
  //   animationStyle: "heroSmash"
  // },
    {
    desktopImage: banner6,
    mobileImage: mBanner6,
    title: "Start Your Own Franchise",
    subtitle: "Low Investment • High Profit",
    desc: "Join the fastest growing egg snack brand",
    buttonText: "Learn More",
    buttonLink: "/franchise",
    animationStyle: "orangeGradient" 
  },
    {
    desktopImage: banner1,
    mobileImage: mBanner1,
    title: "MUTTA MITTAI",
    subtitle: "Our Signature Egg Sweet",
    desc: "Fresh • Hot • Famous",
    buttonText: "Taste the Tradition",
    buttonLink: "/contact",
    animationStyle: "heroSmash"
  },
  {
    desktopImage: banner2,
    mobileImage: mBanner2,
    title: "Egg Based Snacks",
    subtitle: "Everyone Loves",
    desc: "Egg Chilli • Lollipop • Fried Rice",
    buttonText: "Sweet with a Twist",
    buttonLink: "/contact",
    animationStyle: "comicPop"
  },
  {
    desktopImage: banner3,
    mobileImage: mBanner3,
    title: "EGG! ATM Menu",
    subtitle: "All Your Favourite Egg Dishes",
    desc: "Bread Omelette • Egg Chilli • Egg Cutlet • Mini Fried Rice",
    buttonText: "Sweet Journey Starts Here",
    buttonLink: "/contact",
    animationStyle: "bounceFlip"
  },
  {
    desktopImage: banner4,
    mobileImage: mBanner4,
    title: "Real Egg Lovers",
    subtitle: "Spicy • Juicy • Full Flavour",
    desc: "Kaara Muttai • Egg Masala Fry • Egg Mixture",
    buttonText: "One Bite Magic",
    buttonLink: "/contact",
    animationStyle: "spinZoom"
  },
  {
    desktopImage: banner5,
    mobileImage: mBanner5,
    title: "EGG! ATM Specials",
    subtitle: "Hot • Fresh • Made in Front of You",
    desc: "Kaara Muttai • Egg Masala Fry • Egg Paniyaram",
    buttonText: "Crack Open Happiness",
    buttonLink: "/products",
    animationStyle: "cartoonNetwork"
  },
  
  // {
  //   desktopImage: banner6,
  //   mobileImage: mBanner6,
  //   title: "Start Your Own Franchise",
  //   subtitle: "Low Investment • High Profit",
  //   desc: "Join the fastest growing egg snack brand",
  //   buttonText: "Learn More",
  //   buttonLink: "/franchise",
  //   animationStyle: "orangeGradient" 
  // }
];

// ====================================
// HERO SMASH ANIMATION (Banner 1) - MOBILE SIMPLIFIED
// ====================================
const HeroSmashTitle = ({ text, isMobile = false }) => (
  <div className="relative">
    <h1 className="relative font-black leading-tight whitespace-nowrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            y: isMobile ? -100 : -300,
            opacity: 0,
            scale: isMobile ? 1.5 : 3
          }}
          animate={{ 
            y: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            type: "spring",
            stiffness: isMobile ? 400 : 500,
            damping: isMobile ? 20 : 30,
            delay: i * 0.03
          }}
          whileHover={{ 
            scale: 1.2,
            y: -5,
            transition: { type: "spring", stiffness: 400 }
          }}
          className="inline-block text-white"
          style={{ 
            textShadow: isMobile
              ? `0 2px 0 #000,
                 0 4px 8px rgba(0,0,0,0.5)`
              : `0 1px 0 #ccc,
                 0 2px 0 #c9c9c9,
                 0 3px 0 #bbb,
                 0 4px 0 #b9b9b9,
                 0 5px 0 #aaa,
                 0 6px 1px rgba(0,0,0,.1),
                 0 0 5px rgba(0,0,0,.1),
                 0 1px 3px rgba(0,0,0,.3),
                 0 3px 5px rgba(0,0,0,.2),
                 0 5px 10px rgba(0,0,0,.25),
                 0 10px 10px rgba(0,0,0,.2),
                 0 20px 20px rgba(0,0,0,.15)`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  </div>
);

// ====================================
// COMIC POP ANIMATION (Banner 2) - MOBILE SIMPLIFIED
// ====================================
const ComicPopTitle = ({ text, isMobile = false }) => (
  <div className="relative">
    <h1 className="relative font-black leading-tight whitespace-nowrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            scale: 0,
            rotate: isMobile ? -90 : -180
          }}
          animate={{ 
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: "spring",
            stiffness: isMobile ? 350 : 400,
            damping: isMobile ? 15 : 20,
            delay: i * (isMobile ? 0.08 : 0.05)
          }}
          whileHover={{ 
            scale: 1.3,
            rotate: [0, -10, 10, 0],
            transition: { type: "spring", stiffness: 500 }
          }}
          className="inline-block text-yellow-400"
          style={{ 
            textShadow: isMobile
              ? `1px 1px 0 #ff0000,
                 2px 2px 0 #000,
                 0 0 10px rgba(255,170,0,0.5)`
              : `2px 2px 0 #ff0000,
                 4px 4px 0 #ff5500,
                 6px 6px 0 #ffaa00,
                 8px 8px 0 #000,
                 8px 8px 15px rgba(0,0,0,0.5)`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
    
    {/* Comic dots - Only for desktop */}
    {!isMobile && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8 }}
        className="absolute -inset-4 pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
            className="absolute w-2 h-2 bg-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>
    )}
  </div>
);

// ====================================
// BOUNCE FLIP ANIMATION (Banner 3) - MOBILE SIMPLIFIED
// ====================================
const BounceFlipTitle = ({ text, isMobile = false }) => (
  <div className="relative">
    <h1 className="relative font-black leading-tight whitespace-nowrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            y: isMobile ? -50 : -100,
            rotateX: isMobile ? -45 : -90,
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: isMobile ? [0, -15, 0, -8, 0] : [0, -30, 0, -15, 0],
            rotateX: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            y: {
              duration: isMobile ? 1 : 1.5,
              delay: i * (isMobile ? 0.1 : 0.08),
              repeat: Infinity,
              repeatDelay: 2
            },
            rotateX: {
              type: "spring",
              stiffness: isMobile ? 250 : 300,
              damping: isMobile ? 15 : 25,
              delay: i * (isMobile ? 0.1 : 0.08)
            },
            opacity: { duration: 0.4, delay: i * (isMobile ? 0.1 : 0.08) },
            scale: { 
              type: "spring", 
              stiffness: isMobile ? 300 : 350, 
              damping: isMobile ? 15 : 20, 
              delay: i * (isMobile ? 0.1 : 0.08) 
            }
          }}
          whileHover={{ 
            scale: isMobile ? 1.2 : 1.4,
            rotateY: 360,
            transition: { 
              rotateY: { duration: 0.6 },
              scale: { type: "spring", stiffness: 500 }
            }
          }}
          className="inline-block text-green-400"
          style={{ 
            textShadow: isMobile
              ? `1px 1px 0 #065f46,
                 2px 2px 0 #000,
                 0 0 8px rgba(52, 211, 153, 0.5)`
              : `2px 2px 0 #059669,
                 4px 4px 0 #047857,
                 6px 6px 0 #065f46,
                 8px 8px 0 #000,
                 0 0 10px rgba(52, 211, 153, 0.5)`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
    
    {/* Bouncing balls - Only for desktop */}
    {!isMobile && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -25, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1 + 1.2
            }}
            className="w-3 h-3 rounded-full bg-green-500"
          />
        ))}
      </motion.div>
    )}
  </div>
);

// ====================================
// SPIN ZOOM ANIMATION (Banner 4) - MOBILE SIMPLIFIED
// ====================================
const SpinZoomTitle = ({ text, isMobile = false }) => (
  <div className="relative">
    <h1 className="relative font-black leading-tight whitespace-nowrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            scale: 0,
            rotate: isMobile ? 180 : 720,
            opacity: 0
          }}
          animate={{ 
            scale: isMobile ? [1, 1.1, 1] : [1, 1.2, 1],
            rotate: 0,
            opacity: 1
          }}
          transition={{
            scale: {
              duration: isMobile ? 1.5 : 2,
              delay: i * (isMobile ? 0.08 : 0.06),
              repeat: Infinity,
              repeatDelay: 1
            },
            rotate: {
              type: "spring",
              stiffness: isMobile ? 150 : 200,
              damping: isMobile ? 10 : 15,
              delay: i * (isMobile ? 0.08 : 0.06)
            },
            opacity: { 
              duration: 0.5, 
              delay: i * (isMobile ? 0.08 : 0.06) 
            }
          }}
          whileHover={{ 
            scale: isMobile ? 1.3 : 1.5,
            rotate: 180,
            color: "#f97316",
            transition: { 
              rotate: { duration: 0.4 },
              scale: { type: "spring", stiffness: 400 }
            }
          }}
          className="inline-block text-orange-400"
          style={{ 
            textShadow: isMobile
              ? `1px 1px 0 #9a3412,
                 2px 2px 0 #000,
                 0 0 10px rgba(249, 115, 22, 0.5)`
              : `1px 1px 0 #ea580c,
                 3px 3px 0 #c2410c,
                 5px 5px 0 #9a3412,
                 7px 7px 0 #000,
                 0 0 15px rgba(249, 115, 22, 0.6)`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
    
    {/* Spinning circles - Only for desktop */}
    {!isMobile && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.8 }}
        className="absolute -inset-4 pointer-events-none"
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              scale: [1, 1.3, 1]
            }}
            transition={{
              rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, delay: i * 0.5 }
            }}
            className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-orange-500/50 rounded-full"
            style={{
              transform: `translate(-50%, -50%)`
            }}
          />
        ))}
      </motion.div>
    )}
  </div>
);

// ====================================
// CARTOON NETWORK STYLE ANIMATION (Banner 5) - MOBILE SIMPLIFIED
// ====================================
const CartoonNetworkTitle = ({ text, isMobile = false }) => {
  const colors = ['#00AEEF', '#FFDE00', '#ED1C24', '#39B54A', '#8A2BE2'];
  
  return (
    <div className="relative overflow-visible cartoon-network-title">
      {/* Cartoon Network Checkerboard Background - Simplified for mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.3 }}
          className="absolute -inset-4 md:-inset-12 pointer-events-none overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #00AEEF 25%, transparent 25%),
              linear-gradient(-45deg, #FFDE00 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ED1C24 75%),
              linear-gradient(-45deg, transparent 75%, #39B54A 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px',
            filter: 'blur(1px)',
          }}
        />
      )}
      
      {/* Main Text - Clean for mobile */}
      <div className="relative overflow-visible">
        <h1 className={`relative font-black leading-tight whitespace-nowrap ${
          isMobile ? 'text-lg sm:text-xl' : 'text-3xl md:text-5xl lg:text-7xl'
        }`}>
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ 
                y: isMobile ? -40 : -200,
                scale: 0,
                rotate: isMobile ? Math.random() * 30 - 15 : Math.random() * 90 - 45,
                opacity: 0
              }}
              animate={{ 
                y: [0, isMobile ? -4 : -15, 0, isMobile ? -2 : -8, 0],
                scale: 1,
                rotate: 0,
                opacity: 1
              }}
              transition={{
                y: {
                  duration: isMobile ? 0.8 : 1.2,
                  delay: i * (isMobile ? 0.15 : 0.1),
                  repeat: Infinity,
                  repeatDelay: isMobile ? 1.5 : 1
                },
                scale: {
                  type: "spring",
                  stiffness: isMobile ? 500 : 400,
                  damping: isMobile ? 30 : 25,
                  delay: i * (isMobile ? 0.15 : 0.05)
                },
                rotate: {
                  type: "spring",
                  stiffness: isMobile ? 350 : 300,
                  damping: isMobile ? 25 : 20,
                  delay: i * (isMobile ? 0.15 : 0.05)
                },
                opacity: { 
                  duration: 0.4, 
                  delay: i * (isMobile ? 0.15 : 0.05) 
                }
              }}
              className="inline-block"
              style={{ 
                color: colors[i % colors.length],
                textShadow: isMobile
                  ? `1px 1px 0 #000,
                     2px 2px 0 rgba(0,0,0,0.5)`
                  : `0 0 0 #000,
                     3px 3px 0 #000,
                     6px 6px 0 rgba(0,0,0,0.3),
                     9px 9px 0 rgba(0,0,0,0.2)`,
                WebkitTextStroke: isMobile ? '0.5px #000' : '2px #000',
                textStroke: isMobile ? '0.5px #000' : '2px #000',
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      </div>
    </div>
  );
};

// ====================================
// ORANGE/WHITE/YELLOW GRADIENT ANIMATION (Banner 6) - MOBILE SIMPLIFIED
// ====================================
const OrangeGradientTitle = ({ text, isMobile = false }) => (
  <div className="relative">
    <h1 className="relative font-black leading-tight whitespace-nowrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ 
            y: isMobile ? 50 : 100,
            opacity: 0,
            scale: 0.5,
            rotate: isMobile ? -10 : -20
          }}
          animate={{ 
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: "spring",
            stiffness: isMobile ? 400 : 350,
            damping: isMobile ? 20 : 25,
            delay: i * 0.05,
            duration: 0.7
          }}
          whileHover={{ 
            scale: isMobile ? 1.2 : 1.3,
            y: -10,
            transition: { type: "spring", stiffness: 450 }
          }}
          className="inline-block"
          style={{
            background: `
              linear-gradient(
                135deg,
                #FF7A00 0%,
                #FFB347 25%,
                ${isMobile ? '#FFFFFF' : '#FFFFFF'} 50%,
                #FFE066 75%,
                #FFD700 100%
            )`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: isMobile
              ? `1px 1px 2px rgba(0,0,0,0.3)`
              : `1px 1px 0 rgba(255,255,255,0.4),
                 2px 2px 0 rgba(0,0,0,0.15)`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  </div>
);

// ====================================
// STYLES - COMBINED
// ====================================
const style = document.createElement('style');
style.textContent = `
  .banner-container {
    overflow: hidden !important;
  }

  @media (max-width: 768px) {
    .banner-text {
      text-shadow: 0 2px 4px rgba(0,0,0,0.8) !important;
    }
    
    .banner-content {
      padding-top: 20px !important;
      padding-bottom: 30px !important;
    }
  }
`;

if (!document.getElementById('banner-styles')) {
  style.id = 'banner-styles';
  document.head.appendChild(style);
}

// ANIMATED SUBTITLE
const ExtremeSubtitle = ({ text, isCartoon = false, isOrange = false, isMobile = false }) => (
  <motion.div
    initial={{ scale: 0, rotate: 180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ 
      type: "spring",
      stiffness: isMobile ? 250 : 300,
      damping: isMobile ? 15 : 20,
      delay: 0.8 
    }}
    className="inline-block"
  >
    <h2 className={`font-bold px-3 py-1.5 md:px-5 md:py-2.5 rounded-full backdrop-blur-sm border ${isMobile ? 'text-xs' : 'text-sm md:text-base'} ${
      isCartoon
        ? 'text-white bg-gradient-to-r from-[#00AEEF]/40 via-[#FFDE00]/40 to-[#ED1C24]/40 border-white/60' 
        : isOrange
        ? 'text-orange-100 bg-gradient-to-r from-orange-600/40 via-amber-600/40 to-yellow-600/40 border-orange-400/60'
        : 'text-white bg-gradient-to-r from-black/50 to-black/30 border-white/20'
    } shadow-lg`}>
      {isCartoon && '📺 '}
      {isOrange && '🔥 '}
      {text}
      {isCartoon && ' 📺'}
      {isOrange && ' 🔥'}
    </h2>
  </motion.div>
);

// EXTREME TAGS
const ExtremeTags = ({ items, isCartoon = false, isOrange = false, isMobile = false }) => (
  <div className="flex flex-wrap justify-center gap-1 md:gap-2">
    {items.map((item, i) => (
      <motion.span
        key={i}
        initial={{ 
          scale: 0,
          rotate: -180,
          y: 100
        }}
        animate={{ 
          scale: 1,
          rotate: 0,
          y: 0
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
          delay: 1 + (i * 0.1)
        }}
        className={`px-2 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm font-bold shadow whitespace-nowrap ${
          isCartoon
            ? 'bg-gradient-to-r from-[#00AEEF]/30 via-[#FFDE00]/30 to-[#ED1C24]/30 border border-white/60 text-white'
            : isOrange
            ? 'bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 border border-orange-400/60 text-orange-100'
            : 'bg-white/10 border border-white/20 text-white'
        } ${isMobile ? 'text-xs' : 'text-sm'}`}
      >
        {isCartoon && '🥚 '}
        {isOrange && '🚀 '}
        {item}
        {isCartoon && ' 🥚'}
        {isOrange && ' 🚀'}
      </motion.span>
    ))}
  </div>
);

// EXTREME BUTTON
const ExtremeButton = ({ text, onClick, isMobile, isCartoon = false, isOrange = false }) => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ 
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 1.5 
    }}
    whileHover={{ 
      scale: isMobile ? 1.05 : 1.15,
      y: -4,
      transition: { type: "spring", stiffness: 450 } 
    }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="relative group"
  >
    {/* Main button */}
    <div className={`relative rounded-full ${
      isMobile ? 'px-6 py-2.5' : 'px-8 md:px-12 py-3 md:py-4'
    } ${
      isCartoon
        ? 'bg-gradient-to-r from-[#00AEEF] via-[#FFDE00] to-[#ED1C24]'
        : isOrange
        ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500'
        : 'bg-gradient-to-r from-amber-400 to-yellow-500'
    } border-2 border-black shadow-lg`}>
      <span className={`font-bold text-black ${
        isMobile ? 'text-sm' : 'text-base md:text-lg'
      }`}>
        {isCartoon && '📺 '}
        {isOrange && '🔥 '}
        {text}
        {isCartoon && ' 📺'}
        {isOrange && ' 🔥'}
      </span>
    </div>
  </motion.button>
);

// MAIN BANNER COMPONENT
const Banner = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = banners[index];
  const bannerImage = isMobile ? currentBanner.mobileImage : currentBanner.desktopImage;
  const isCartoon = currentBanner.animationStyle === 'cartoonNetwork';
  const isOrange = currentBanner.animationStyle === 'orangeGradient';

  const renderTitle = () => {
    const style = currentBanner.animationStyle;
    const title = currentBanner.title;
    
    switch(style) {
      case 'heroSmash':
        return <HeroSmashTitle text={title} isMobile={isMobile} />;
      case 'comicPop':
        return <ComicPopTitle text={title} isMobile={isMobile} />;
      case 'bounceFlip':
        return <BounceFlipTitle text={title} isMobile={isMobile} />;
      case 'spinZoom':
        return <SpinZoomTitle text={title} isMobile={isMobile} />;
      case 'cartoonNetwork':
        return <CartoonNetworkTitle text={title} isMobile={isMobile} />;
      case 'orangeGradient':
        return <OrangeGradientTitle text={title} isMobile={isMobile} />;
      default:
        return <HeroSmashTitle text={title} isMobile={isMobile} />;
    }
  };

  return (
    <section className="relative w-full h-[42vh] md:h-[90vh] overflow-hidden bg-black banner-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <motion.img
            src={bannerImage}
            alt={currentBanner.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7 }}
          />

          {/* Dynamic overlay */}
          <div className={`absolute inset-0 ${
            isCartoon
              ? 'bg-gradient-to-t from-black/80 via-[#00AEEF]/20 to-transparent'
              : isOrange
              ? 'bg-gradient-to-t from-black/80 via-orange-900/20 to-transparent'
              : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent'
          }`} />

          {/* Content Container */} 
          <div className={`relative h-full flex flex-col items-center justify-center text-center px-4 banner-content ${
            isMobile ? 'pb-4 pt-8' : 'pb-0 pt-4'
          }`}>
            
            {/* Title - Single line */}
            <div className={`mb-2 md:mb-4 w-full overflow-visible ${
              isMobile ? 'px-2' : ''
            }`}>
              <div className={`whitespace-nowrap banner-text ${
                isMobile ? 'text-lg sm:text-xl' : 'text-3xl md:text-5xl lg:text-7xl'
              }`}>
                {renderTitle()}
              </div>
            </div>

            {/* Subtitle */}
            <div className="mb-2 md:mb-4">
              <ExtremeSubtitle 
                text={currentBanner.subtitle} 
                isCartoon={isCartoon} 
                isOrange={isOrange}
                isMobile={isMobile}
              />
            </div>

            {/* Tags */}
            <div className={`mb-3 md:mb-6 ${
              isMobile ? 'max-w-xs px-2' : 'max-w-2xl'
            }`}>
              <ExtremeTags 
                items={currentBanner.desc.split(" • ").slice(0, isMobile ? 2 : undefined)}
                isCartoon={isCartoon}
                isOrange={isOrange}
                isMobile={isMobile}
              />
            </div>

            {/* Button */}
            <ExtremeButton 
              text={currentBanner.buttonText} 
              onClick={() => navigate(currentBanner.buttonLink)}
              isMobile={isMobile}
              isCartoon={isCartoon}
              isOrange={isOrange}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className={`absolute ${
        isMobile ? 'bottom-2' : 'bottom-6'
      } left-1/2 transform -translate-x-1/2 flex gap-1.5 md:gap-2 z-20`}>
        {banners.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative ${
              isMobile ? 'w-1.5 h-1.5' : 'w-2.5 h-2.5'
            } rounded-full transition-all duration-300 ${
              i === index
                ? isCartoon ? "bg-[#00AEEF]" : 
                  currentBanner.animationStyle === 'bounceFlip' ? "bg-green-400" :
                  currentBanner.animationStyle === 'spinZoom' ? "bg-orange-400" :
                  isOrange ? "bg-orange-500" : "bg-amber-400"
                : "bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;