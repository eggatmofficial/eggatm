





// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { loginUser } from "../store/auth.store";
// import { getCartAPI } from "../api/cart.api";
// import { setCartFromBackend } from "../store/cart.store";
// import desktopBg from "../assets/login/desktop.webp";
// import mobileBg from "../assets/login/mobile.webp";
// import { Eye, EyeOff, Shield } from "lucide-react";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Get redirect path
//   const fromSearchParam = searchParams.get('redirect');
//   const fromLocationState = location.state?.from;
//   const from = fromSearchParam || fromLocationState || "/";

//   // Detect screen size
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
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
      
//       const result = await dispatch(loginUser({
//         email: form.email,
//         password: form.password
//       })).unwrap();
      
//       const cartRes = await getCartAPI();
//       dispatch(setCartFromBackend(cartRes.data.data));
//       toast.success("Login successful!");
      
//       let redirectTo = '/';
      
//       if (result.user.role === "admin") {
//         redirectTo = "/admin";
//       } else {
//         const isInvalidPath = 
//           from === '/login' || 
//           from === location.pathname || 
//           from.includes('/login') ||
//           !from.startsWith('/');
        
//         redirectTo = isInvalidPath ? '/' : from;
//       }
      
//       navigate(redirectTo, { replace: true });
      
//     } catch (error) {
//       toast.error(error || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center background-blur  justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
//       {/* Background Image with White Transparent Overlay */}
//       <div className="absolute inset-0 z-0">
//         {/* Mobile Background */}
//         <div className={`w-full h-full bg-cover bg-center ${isMobile ? 'block' : 'hidden'}`} 
//           style={{
//            backgroundImage: `url(${mobileBg})`,
//           }}
//         />
        
//         {/* Desktop Background */}
//         <div className={`w-full h-full bg-cover bg-center ${!isMobile ? 'block' : 'hidden'}`} 
//           style={{
//             backgroundImage: `url(${desktopBg})`,
//           }}
//         />
        
//         {/* White Transparent Overlay - Always visible */}
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//       {/* Login Form - Clean design with better contrast */}
//       <div className="relative z-10 w-full max-w-md mx-auto">
//         <div className=" p-8 sm:p-10 ">
//           <div className="text-center mb-8">

//             <style>
//             {`
//             @keyframes gradientMove {
//               0% { background-position: 0% 50%; }
//               50% { background-position: 100% 50%; }
//               100% { background-position: 0% 50%; }
//             }
//             `}
//             </style>

            
//             {/* EGG!ATM Shop Name */}
//        <h1 className=" text-6xl sm:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg mb-2 select-none"
//         style={{
//           backgroundSize: "200% 200%",
//           animation: "gradientMove 4s ease infinite",
//         }}
//       >
//         EGG! ATM
//       </h1>

            
//             {/* Secure Login Title */}
//             <p className="text-white font-semibold text-base">
//               Secure Franchise Portal
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Input */}
//             <div className="space-y-2">
//               <label className="block text-lg font-bold text-white">
//                 Franchise Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full bg-white/10 border border-yellow-300 rounded-xl px-4 py-3
//              text-white placeholder-white/70
//              focus:outline-none focus:border-amber-500
//              focus:ring-2 focus:ring-amber-500/30
//              transition-all duration-300 text-base"
//              placeholder="Enter your franchise email"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             {/* Password Input with View Icon */}
//             <div className="space-y-2">
//               <label className="block text-lg font-bold text-white">
//                 Franchise Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   // className="w-full bg-white/10 border border-yellow-300 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-300 text-base"
//                    className="w-full bg-white/10 border border-yellow-300 rounded-xl px-4 py-3
//              text-white placeholder-white/70
//              focus:outline-none focus:border-amber-500
//              focus:ring-2 focus:ring-amber-500/30
//              transition-all duration-300 text-base"
//                   placeholder="Enter your franchise password"
//                   required
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
//                   disabled={loading}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Updated Submit Button */}
//          <button
//   type="submit"
//   disabled={loading}
//   className="
//     w-full
//     bg-white/10
//     backdrop-blur-md
//     border border-yellow-300
//     rounded-xl
//     px-8 py-4
//     font-bold text-lg
//     shadow-md
//     hover:bg-white/20
//     hover:border-amber-400
//     hover:shadow-lg
//     transition-all duration-300
//     active:scale-[0.98]
//     disabled:opacity-60
//     disabled:cursor-not-allowed
//   "
// >
//   {loading ? (
//     <span className="flex items-center justify-center text-white">
//       <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//       </svg>
//       Accessing Franchise Portal...
//     </span>
//   ) : (
//     <span
//       className="
//         bg-gradient-to-r
//         from-amber-300
//         via-yellow-300
//         to-orange-400
//         bg-clip-text
//         text-transparent
//       "
//     >
//       Access Franchise
//     </span>
//   )}
// </button>

//           </form>
//         </div>
//       </div>
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
import desktopBg from "../assets/login/desktop1.webp";
import mobileBg from "../assets/login/mobile1.webp";
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
          from.startsWith("/admin") || 
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
      {/* ===== BLURRED BACKGROUND IMAGE ===== */}
<div className="absolute inset-0 z-0 overflow-hidden">
  
  {/* Mobile Background */}
  <div
    className={`absolute inset-0 bg-cover bg-center transition-all duration-500
      ${isMobile ? "block" : "hidden"}`}
    style={{
      backgroundImage: `url(${mobileBg})`,
      filter: "blur(3px)",
      transform: "scale(1.1)", // prevents edge cut after blur
    }}
  />

  {/* Desktop Background */}
  <div
    className={`absolute inset-0 bg-cover bg-center transition-all duration-500
      ${!isMobile ? "block" : "hidden"}`}
    style={{
      backgroundImage: `url(${desktopBg})`,
      filter: "blur(3px)",
      transform: "scale(1.1)",
    }}
  />

  {/* Optional dark overlay for contrast */}
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
        <h1 className=" text-3xl sm:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-lg mb-2 select-none"
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