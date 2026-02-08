

// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { loginUser } from "../store/auth.store";
// import { getCartAPI } from "../api/cart.api";
// import { setCartFromBackend } from "../store/cart.store";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const canvasRef = useRef(null);
//   const eggContainerRef = useRef(null);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [hoverState, setHoverState] = useState({
//     email: false,
//     password: false,
//     submit: false
//   });
//   const [eggAnimation, setEggAnimation] = useState({
//     rotation: 0,
//     scale: 1,
//     glow: 0,
//     particles: []
//   });
//   const [isMobile, setIsMobile] = useState(false);

//   // Get redirect path from multiple sources (priority: search params > location state > default)
//   const fromSearchParam = searchParams.get('redirect');
//   const fromLocationState = location.state?.from;
//   const from = fromSearchParam || fromLocationState || "/";

//   // Debug logging (remove in production)
//   useEffect(() => {
//     console.log('Login Page Debug:');
//     console.log('- from search param:', fromSearchParam);
//     console.log('- from location state:', fromLocationState);
//     console.log('- final redirect path:', from);
//   }, [fromSearchParam, fromLocationState, from]);

//   // Detect screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Egg particle system - simplified for mobile
//   useEffect(() => {
//     const particleCount = isMobile ? 15 : 30;
//     const particles = [];
    
//     for (let i = 0; i < particleCount; i++) {
//       particles.push({
//         x: 50,
//         y: 50,
//         size: Math.random() * (isMobile ? 2 : 4) + 1,
//         speed: Math.random() * 0.5 + 0.2,
//         color: `hsl(${Math.random() * 30 + 35}, 100%, ${Math.random() * 20 + 70}%)`,
//         angle: Math.random() * Math.PI * 2,
//         distance: Math.random() * (isMobile ? 20 : 40) + 10,
//         life: Math.random() * 100,
//         maxLife: 100
//       });
//     }
    
//     setEggAnimation(prev => ({ ...prev, particles }));
    
//     const interval = setInterval(() => {
//       setEggAnimation(prev => {
//         const newRotation = (prev.rotation + (isMobile ? 0.1 : 0.2)) % 360;
//         const newGlow = isMobile ? 0.3 : 0.5 + Math.sin(Date.now() * 0.003) * 0.3;
        
//         const updatedParticles = prev.particles.map(p => {
//           const newAngle = p.angle + p.speed * 0.05;
//           const newX = 50 + Math.cos(newAngle) * p.distance;
//           const newY = 50 + Math.sin(newAngle) * p.distance * 0.6;
//           const newLife = (p.life + 1) % p.maxLife;
//           const opacity = Math.sin((newLife / p.maxLife) * Math.PI) * (isMobile ? 0.4 : 0.7);
          
//           return {
//             ...p,
//             x: newX,
//             y: newY,
//             angle: newAngle,
//             life: newLife,
//             opacity
//           };
//         });
        
//         return {
//           ...prev,
//           rotation: newRotation,
//           glow: newGlow,
//           particles: updatedParticles
//         };
//       });
//     }, isMobile ? 80 : 50);
    
//     return () => clearInterval(interval);
//   }, [isMobile]);

//   useEffect(() => {
//     const scale = (hoverState.email || hoverState.password || hoverState.submit) && !isMobile ? 1.1 : 1;
//     setEggAnimation(prev => ({ ...prev, scale }));
//   }, [hoverState, isMobile]);

//   useEffect(() => {
//     if (isMobile) return; // Disable floating animation on mobile for performance
    
//     let animationId;
//     let time = 0;
    
//     const animate = () => {
//       time += 0.01;
//       const floatY = Math.sin(time) * 2;
      
//       if (eggContainerRef.current) {
//         eggContainerRef.current.style.transform = `translateY(${floatY}px)`;
//       }
      
//       animationId = requestAnimationFrame(animate);
//     };
    
//     animate();
    
//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, [isMobile]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!form.email || !form.password) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(form.email)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Dispatch loginUser thunk
//       const result = await dispatch(loginUser({
//         email: form.email,
//         password: form.password
//       })).unwrap();
      
//       // ✅ FETCH CART AFTER LOGIN
//       const cartRes = await getCartAPI();
//       dispatch(setCartFromBackend(cartRes.data.data));
//       toast.success("Login successful!");
      
//       // Determine where to redirect
//       let redirectTo = '/';
      
//       if (result.user.role === "admin") {
//         redirectTo = "/admin";
//       } else {
//         // Validate the redirect path
//         const isInvalidPath = 
//           from === '/login' || 
//           from === location.pathname || 
//           from.includes('/login') ||
//           !from.startsWith('/');
        
//         redirectTo = isInvalidPath ? '/' : from;
//       }
      
//       console.log(`Redirecting to: ${redirectTo}`);
//       navigate(redirectTo, { replace: true });
      
//     } catch (error) {
//       toast.error(error || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
//       {/* Background Orbs - Reduced count for mobile */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(isMobile ? 2 : 3)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full opacity-5 sm:opacity-10"
//             style={{
//               width: `${isMobile ? 150 + i * 100 : 300 + i * 200}px`,
//               height: `${isMobile ? 150 + i * 100 : 300 + i * 200}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               background: `radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(251,191,36,0) 70%)`,
//               animation: `floatOrb ${isMobile ? 15 + i * 5 : 20 + i * 10}s ease-in-out infinite`,
//               animationDelay: `${i * 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 w-full max-w-6xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
//           {/* Left Column - Egg Animation */}
//           <div className="relative order-2 lg:order-1">
//             <div 
//               ref={eggContainerRef}
//               className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center"
//             >
//               {/* Orbital rings - Hide on very small screens */}
//               {!isMobile && [...Array(3)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="absolute border border-amber-200/30 rounded-full"
//                   style={{
//                     width: `${120 + i * 40}px`,
//                     height: `${120 + i * 40}px`,
//                     animation: `orbit ${15 + i * 5}s linear infinite`,
//                     animationDelay: `${i * 1}s`,
//                   }}
//                 />
//               ))}

//               {/* Particles */}
//               {eggAnimation.particles.map((particle, i) => (
//                 <div
//                   key={i}
//                   className="absolute rounded-full"
//                   style={{
//                     left: `${particle.x}%`,
//                     top: `${particle.y}%`,
//                     width: `${particle.size}px`,
//                     height: `${particle.size}px`,
//                     backgroundColor: particle.color,
//                     opacity: particle.opacity,
//                     transform: `translate(-50%, -50%)`,
//                   }}
//                 />
//               ))}

//               {/* Main Egg Container */}
//               <div 
//                 className="relative"
//                 style={{
//                   transform: `
//                     scale(${eggAnimation.scale})
//                     rotate(${eggAnimation.rotation}deg)
//                   `,
//                   transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
//                 }}
//               >
//                 {/* Egg glow effect */}
//                 <div 
//                   className="absolute -inset-8 sm:-inset-10 md:-inset-12 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-yellow-400/10 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] blur-xl"
//                   style={{
//                     opacity: eggAnimation.glow,
//                     transition: 'opacity 1s ease',
//                   }}
//                 />

//                 {/* Egg itself */}
//                 <div className="relative w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80">
//                   <div className="absolute inset-0 bg-gradient-to-b from-amber-300 via-orange-200 to-amber-400 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-lg sm:shadow-xl">
//                     <div className="absolute inset-0 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-b from-white/10 via-transparent to-amber-600/10" />
                    
//                     {/* Egg highlights */}
//                     <div className="absolute top-4 sm:top-6 left-6 sm:left-8 w-12 sm:w-16 h-4 sm:h-8 bg-gradient-to-b from-white/30 to-transparent rounded-full blur-sm" />
//                     <div className="absolute bottom-6 sm:bottom-8 right-8 sm:right-10 w-16 sm:w-20 h-4 sm:h-6 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-sm" />
                    
//                     {/* Inner egg patterns */}
//                     <div className="absolute inset-2 sm:inset-4 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]">
//                       {[...Array(isMobile ? 4 : 8)].map((_, i) => (
//                         <div
//                           key={i}
//                           className="absolute w-0.5 sm:w-1 h-2 sm:h-4 bg-amber-500/20 rounded-full"
//                           style={{
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             transform: `rotate(${Math.random() * 360}deg)`,
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Inner glow */}
//                   <div className="absolute inset-4 sm:inset-8 bg-gradient-to-b from-amber-200/20 to-transparent rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] blur-sm" />

//                   {/* Yolk animation on hover - Desktop only */}
//                   {!isMobile && (hoverState.email || hoverState.password || hoverState.submit) && (
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                       <div className="relative">
//                         <div className="relative w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32">
//                           <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-orange-300 to-amber-400 rounded-full animate-pulse-gentle shadow-md sm:shadow-lg">
//                             <div className="absolute top-1/4 left-1/4 w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-white/50 to-transparent rounded-full" />
//                             <div className="absolute inset-2 sm:inset-4 bg-gradient-to-b from-yellow-200 to-orange-300 rounded-full" />
//                           </div>
                          
//                           {/* Floating yolk particles */}
//                           {[...Array(isMobile ? 3 : 5)].map((_, i) => (
//                             <div
//                               key={i}
//                               className="absolute w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-b from-yellow-200 to-orange-300 rounded-full"
//                               style={{
//                                 left: `${Math.random() * 100}%`,
//                                 top: `${Math.random() * 100}%`,
//                                 animation: `orbitYolk ${Math.random() * 4 + 3}s linear infinite`,
//                                 animationDelay: `${i * 0.5}s`,
//                               }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Egg shadow */}
//                 <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 md:w-48 h-3 sm:h-4 md:h-6 bg-gradient-to-t from-amber-900/10 to-transparent rounded-full blur-sm md:blur-md" />
//               </div>

//               {/* Light rays - Desktop only */}
//               {!isMobile && (
//                 <div className="absolute inset-0">
//                   {[...Array(4)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="absolute top-1/2 left-1/2 w-0.5 sm:w-1 h-32 sm:h-40 bg-gradient-to-b from-transparent via-amber-300/20 to-transparent"
//                       style={{
//                         transform: `translate(-50%, -50%) rotate(${i * 90 + eggAnimation.rotation * 0.1}deg)`,
//                         animation: `pulseRay 3s ease-in-out infinite`,
//                         animationDelay: `${i * 0.5}s`,
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Brand text */}
//             <div className="text-center my-8 sm:my-12">
//               <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-shift">
//                 EGG! ATM
//               </h1>
//               <p className="text-amber-700/80 text-sm sm:text-base md:text-lg mt-2 sm:mt-4 font-light">
//                 Where every transaction hatches possibilities
//               </p>
//             </div>
//           </div>

//           {/* Right Column - Login Form */}
//           <div className="relative order-1 lg:order-2">
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-6 sm:p-8 md:p-10 border border-white/40">
//               <div className="text-center mb-6 sm:mb-8 md:mb-10">
//                 <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-md sm:shadow-lg">
//                   <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
//                   Secure Login
//                 </h2>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Access your egg-ceptional banking experience
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//                 {/* Email Input */}
//                 <div 
//                   className="space-y-2 sm:space-y-3 group"
//                   onMouseEnter={() => !isMobile && setHoverState(s => ({ ...s, email: true }))}
//                   onMouseLeave={() => !isMobile && setHoverState(s => ({ ...s, email: false }))}
//                   onTouchStart={() => isMobile && setHoverState(s => ({ ...s, email: true }))}
//                   onTouchEnd={() => isMobile && setHoverState(s => ({ ...s, email: false }))}
//                 >
//                   <label className="block text-sm font-semibold text-gray-700 group-hover:text-amber-600 transition-colors">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-lg sm:rounded-xl blur-sm group-hover:blur transition-all duration-300" />
//                     <input
//                       type="email"
//                       name="email"
//                       value={form.email}
//                       onChange={handleChange}
//                       className="relative w-full bg-white border border-amber-100 sm:border-2 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 group-hover:border-amber-300 text-sm sm:text-base"
//                       placeholder="Enter your email"
//                       required
//                       disabled={loading}
//                     />
//                     <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Password Input */}
//                 <div 
//                   className="space-y-2 sm:space-y-3 group"
//                   onMouseEnter={() => !isMobile && setHoverState(s => ({ ...s, password: true }))}
//                   onMouseLeave={() => !isMobile && setHoverState(s => ({ ...s, password: false }))}
//                   onTouchStart={() => isMobile && setHoverState(s => ({ ...s, password: true }))}
//                   onTouchEnd={() => isMobile && setHoverState(s => ({ ...s, password: false }))}
//                 >
//                   <label className="block text-sm font-semibold text-gray-700 group-hover:text-amber-600 transition-colors">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 rounded-lg sm:rounded-xl blur-sm group-hover:blur transition-all duration-300" />
//                     <input
//                       type="password"
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                       className="relative w-full bg-white border border-amber-100 sm:border-2 rounded-lg sm:rounded-xl px-4 py-3 sm:px-5 sm:py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 group-hover:border-amber-300 text-sm sm:text-base"
//                       placeholder="Enter your password"
//                       required
//                       disabled={loading}
//                     />
//                     <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div
//                   onMouseEnter={() => !isMobile && setHoverState(s => ({ ...s, submit: true }))}
//                   onMouseLeave={() => !isMobile && setHoverState(s => ({ ...s, submit: false }))}
//                   onTouchStart={() => isMobile && setHoverState(s => ({ ...s, submit: true }))}
//                   onTouchEnd={() => isMobile && setHoverState(s => ({ ...s, submit: false }))}
//                 >
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-lg sm:rounded-xl blur-lg opacity-40 sm:opacity-60 group-hover:opacity-60 sm:group-hover:opacity-80 group-hover:blur-lg sm:group-hover:blur-xl transition-all duration-500" />
                    
//                     <div className="relative bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg sm:rounded-xl px-6 py-3 sm:px-8 sm:py-4 md:px-8 md:py-5 text-white font-bold text-base sm:text-lg shadow-md sm:shadow-lg disabled:opacity-70">
//                       <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
//                       <span className="flex items-center justify-center">
//                         {loading ? (
//                           <>
//                             <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                             </svg>
//                             <span className="text-sm sm:text-base">Authenticating...</span>
//                           </>
//                         ) : (
//                           <>
//                             <span className="mr-2 sm:mr-3">🥚</span>
//                             <span className="text-sm sm:text-base">Access Your Account</span>
//                             <span className="ml-2 sm:ml-3 hidden sm:inline">→</span>
//                           </>
//                         )}
//                       </span>
//                     </div>
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Responsive note for mobile */}
//             {isMobile && (
//               <div className="mt-6 text-center">
//                 <p className="text-xs text-amber-700/60">
//                   💡 Tap on inputs for interactive effects
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
        
//         @keyframes floatOrb {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           33% { transform: translate(20px, -15px) scale(1.03); }
//           66% { transform: translate(-15px, 10px) scale(0.97); }
//         }
        
//         @keyframes orbit {
//           0% { transform: rotate(0deg); opacity: 0.2; }
//           50% { opacity: 0.4; }
//           100% { transform: rotate(360deg); opacity: 0.2; }
//         }
        
//         @keyframes orbitYolk {
//           0% { transform: rotate(0deg) translateX(10px) rotate(0deg); }
//           100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
//         }
        
//         @keyframes pulse-gentle {
//           0%, 100% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.03); opacity: 0.9; }
//         }
        
//         @keyframes pulseRay {
//           0%, 100% { opacity: 0.05; }
//           50% { opacity: 0.15; }
//         }
        
//         @keyframes gradient-shift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
        
//         .animate-gradient-shift {
//           background-size: 200% 200%;
//           animation: gradient-shift 3s ease infinite;
//         }
        
//         .animate-pulse-gentle {
//           animation: pulse-gentle 2s ease-in-out infinite;
//         }

//         /* Responsive breakpoint helper classes */
//         @media (max-width: 640px) {
//           .mobile-hidden {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Login;







import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../store/auth.store";
import { getCartAPI } from "../api/cart.api";
import { setCartFromBackend } from "../store/cart.store";
import desktopBg from "../assets/login/desktop.webp";
import mobileBg from "../assets/login/mobile.webp";
import { Eye, EyeOff, Shield } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Get redirect path
  const fromSearchParam = searchParams.get('redirect');
  const fromLocationState = location.state?.from;
  const from = fromSearchParam || fromLocationState || "/";

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      
      const result = await dispatch(loginUser({
        email: form.email,
        password: form.password
      })).unwrap();
      
      const cartRes = await getCartAPI();
      dispatch(setCartFromBackend(cartRes.data.data));
      toast.success("Login successful!");
      
      let redirectTo = '/';
      
      if (result.user.role === "admin") {
        redirectTo = "/admin";
      } else {
        const isInvalidPath = 
          from === '/login' || 
          from === location.pathname || 
          from.includes('/login') ||
          !from.startsWith('/');
        
        redirectTo = isInvalidPath ? '/' : from;
      }
      
      navigate(redirectTo, { replace: true });
      
    } catch (error) {
      toast.error(error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center background-blur  justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Image with White Transparent Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className={`w-full h-full bg-cover bg-center ${isMobile ? 'block' : 'hidden'}`} 
          style={{
           backgroundImage: `url(${mobileBg})`,
          }}
        />
        
        {/* Desktop Background */}
        <div className={`w-full h-full bg-cover bg-center ${!isMobile ? 'block' : 'hidden'}`} 
          style={{
            backgroundImage: `url(${desktopBg})`,
          }}
        />
        
        {/* White Transparent Overlay - Always visible */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Login Form - Clean design with better contrast */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className=" p-8 sm:p-10 ">
          <div className="text-center mb-8">

            <style>
            {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            `}
            </style>

            
            {/* EGG!ATM Shop Name */}
       <h1 className=" text-6xl sm:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg mb-2 select-none"
        style={{
          backgroundSize: "200% 200%",
          animation: "gradientMove 4s ease infinite",
        }}
      >
        EGG! ATM
      </h1>

            
            {/* Secure Login Title */}
            <p className="text-white font-semibold text-base">
              Secure Franchise Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-lg font-bold text-white">
                Franchise Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/10 border border-yellow-300 rounded-xl px-4 py-3
             text-white placeholder-white/70
             focus:outline-none focus:border-amber-500
             focus:ring-2 focus:ring-amber-500/30
             transition-all duration-300 text-base"
             placeholder="Enter your franchise email"
                required
                disabled={loading}
              />
            </div>

            {/* Password Input with View Icon */}
            <div className="space-y-2">
              <label className="block text-lg font-bold text-white">
                Franchise Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  // className="w-full bg-white/10 border border-yellow-300 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-300 text-base"
                   className="w-full bg-white/10 border border-yellow-300 rounded-xl px-4 py-3
             text-white placeholder-white/70
             focus:outline-none focus:border-amber-500
             focus:ring-2 focus:ring-amber-500/30
             transition-all duration-300 text-base"
                  placeholder="Enter your franchise password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Updated Submit Button */}
         <button
  type="submit"
  disabled={loading}
  className="
    w-full
    bg-white/10
    backdrop-blur-md
    border border-yellow-300
    rounded-xl
    px-8 py-4
    font-bold text-lg
    shadow-md
    hover:bg-white/20
    hover:border-amber-400
    hover:shadow-lg
    transition-all duration-300
    active:scale-[0.98]
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  {loading ? (
    <span className="flex items-center justify-center text-white">
      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Accessing Franchise Portal...
    </span>
  ) : (
    <span
      className="
        bg-gradient-to-r
        from-amber-300
        via-yellow-300
        to-orange-400
        bg-clip-text
        text-transparent
      "
    >
      Access Franchise
    </span>
  )}
</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;