import React from "react";
import { MdLocalShipping, MdSecurity, MdRefresh, MdSupport } from "react-icons/md";
import { FaPagelines } from "react-icons/fa";   

export const PRIMARY_COLOR = "#faa807";
export const SECONDARY_COLOR = "#ffd13d";
export const PRIMARY_GRADIENT = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`;

const services = [
  { icon: <MdLocalShipping />, title: "Fast Delivery", desc: "Same day in city" },
  { icon: <MdSecurity />, title: "Quality Checked", desc: "100% authentic" },
  { icon: <FaPagelines />, title: "Naturally Sourced", desc: "Fresh & Hygienic" },
  { icon: <MdSupport />, title: "24/7 Support", desc: "Always available" },
];

const ServicesSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(250,168,7,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(250,168,7,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              backgroundColor: PRIMARY_COLOR,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 animate-pulse-glow"
          style={{
            background: PRIMARY_GRADIENT,
            left: '-20%',
            top: '20%',
            animationDelay: '0s'
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-15 animate-pulse-glow"
          style={{
            background: PRIMARY_GRADIENT,
            right: '-10%',
            bottom: '30%',
            animationDelay: '1s'
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-10 animate-pulse-glow"
          style={{
            background: PRIMARY_GRADIENT,
            left: '30%',
            bottom: '-10%',
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px animate-line-glow"
            style={{
              background: PRIMARY_GRADIENT,
              width: '100%',
              top: `${20 + i * 15}%`,
              opacity: 0.1,
              animationDelay: `${i * 0.5}s`,
              transform: `translateX(${i % 2 === 0 ? '-100%' : '100%'})`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Section Heading with Animation */}
        <div className="text-center mb-14 relative">
          {/* Animated underline */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 overflow-hidden">
            <div 
              className="absolute inset-0 animate-shimmer"
              style={{ background: PRIMARY_GRADIENT }}
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Our <span style={{ color: PRIMARY_COLOR }}>Services</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Designed to deliver quality, convenience, and trust — every single time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="group relative overflow-hidden">
              
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 animate-spin-slow"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, ${PRIMARY_COLOR}, transparent)`,
                    padding: '2px'
                  }}
                />
              </div>
              
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${PRIMARY_COLOR}20 0%, transparent 70%)`,
                }}
              />

              <div
                className="relative flex flex-col items-center text-center p-6 rounded-2xl
                           transition-all duration-500 group-hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(250,168,7,0.1)",
                }}
              >
                {/* Animated Icon Background */}
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                               transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
                    style={{
                      background: PRIMARY_GRADIENT,
                      boxShadow: "0 8px 32px rgba(250,168,7,0.3)",
                    }}
                  >
                    <span className="text-white text-2xl">{service.icon}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-lg mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm">
                  {service.desc}
                </p>

                {/* Animated Dot */}
                <div className="absolute bottom-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Animated Stats */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "24h", label: "Delivery Time", suffix: "Max" },
            { value: "100%", label: "Quality Score", suffix: "Guaranteed" },
            { value: "30", label: "Return Days", suffix: "Policy" },
            { value: "99%", label: "Satisfaction", suffix: "Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all duration-500 group"
            >
              <div 
                className="text-3xl font-bold mb-2"
                style={{
                  background: PRIMARY_GRADIENT,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-xs text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {stat.suffix}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(25px) translateX(25px); }
          100% { transform: translateY(0) translateX(0); }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.1;
          }
          33% { 
            transform: translateY(-20px) translateX(10px); 
            opacity: 0.3;
          }
          66% { 
            transform: translateY(10px) translateX(-20px); 
            opacity: 0.2;
          }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }

        @keyframes line-glow {
          0% { 
            opacity: 0.1;
            transform: translateX(-100%);
          }
          50% { 
            opacity: 0.3;
            transform: translateX(0);
          }
          100% { 
            opacity: 0.1;
            transform: translateX(100%);
          }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-grid-move {
          animation: gridMove 20s linear infinite;
        }

        .animate-float {
          animation: float 15s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-line-glow {
          animation: line-glow 8s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;






// import React from "react";
// import { MdLocalShipping, MdSecurity, MdRefresh, MdSupport } from "react-icons/md";

// export const PRIMARY_COLOR = "#3b82f6";
// export const SECONDARY_COLOR = "#8b5cf6";
// export const PRIMARY_GRADIENT = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`;

// const services = [
//   { icon: <MdLocalShipping />, title: "Fast Delivery", desc: "Same day in city" },
//   { icon: <MdSecurity />, title: "Quality Checked", desc: "100% authentic" },
//   { icon: <MdRefresh />, title: "Easy Returns", desc: "30-day policy" },
//   { icon: <MdSupport />, title: "24/7 Support", desc: "Always available" },
// ];

// const ServicesSection = () => {
//   return (
//     <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      
//       {/* Minimal Grid Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `radial-gradient(${PRIMARY_COLOR}20 1px, transparent 1px)`,
//           backgroundSize: '30px 30px'
//         }} />
//       </div>

//       {/* Floating Accent Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-10 left-10 w-64 h-64 rounded-full" style={{
//           background: `radial-gradient(circle, ${PRIMARY_COLOR}10 0%, transparent 70%)`
//         }} />
//         <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full" style={{
//           background: `radial-gradient(circle, ${SECONDARY_COLOR}08 0%, transparent 70%)`
//         }} />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4">
        
//         {/* Section Heading */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center justify-center gap-3 mb-6">
//             <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//             <span className="text-sm font-semibold tracking-wider uppercase" style={{ color: PRIMARY_COLOR }}>
//               Our Services
//             </span>
//             <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//           </div>
          
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Designed for <span className="italic">Your</span>{" "}
//             <span style={{ 
//               background: PRIMARY_GRADIENT,
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               backgroundClip: 'text'
//             }}>
//               Convenience
//             </span>
//           </h2>
          
//           <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//             Experience premium services crafted to elevate your shopping journey with speed, security, and support.
//           </p>
//         </div>

//         {/* Services Grid - Modern Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, idx) => (
//             <div key={idx} className="group">
//               {/* Service Card */}
//               <div className="relative h-full bg-white rounded-3xl p-8 
//                             transition-all duration-500 hover:-translate-y-2
//                             shadow-lg hover:shadow-2xl hover:shadow-blue-100/50
//                             border border-gray-100 hover:border-blue-200">
                
//                 {/* Number Badge */}
//                 <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl 
//                               flex items-center justify-center text-white font-bold
//                               text-sm shadow-lg transition-all duration-500
//                               group-hover:scale-110 group-hover:rotate-12"
//                   style={{ background: PRIMARY_GRADIENT }}>
//                   {idx + 1}
//                 </div>

//                 {/* Icon Container */}
//                 <div className="relative mb-8">
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 
//                                 rounded-2xl transform rotate-6 group-hover:rotate-12 
//                                 transition-transform duration-500" />
                  
//                   <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center
//                                 transition-all duration-500 group-hover:scale-110
//                                 shadow-lg shadow-blue-100"
//                     style={{ background: PRIMARY_GRADIENT }}>
//                     <span className="text-white text-3xl group-hover:rotate-12 transition-transform duration-500">
//                       {service.icon}
//                     </span>
//                   </div>

//                   {/* Floating Dots */}
//                   <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-400/20 
//                                 group-hover:bg-blue-400/40 transition-all duration-500" />
//                   <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-purple-400/20 
//                                 group-hover:bg-purple-400/40 transition-all duration-500" />
//                 </div>

//                 {/* Content */}
//                 <div className="relative">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:scale-105 
//                                transition-transform duration-300 inline-block">
//                     {service.title}
//                     <span className="absolute -bottom-1 left-0 w-0 h-0.5 
//                                    group-hover:w-full transition-all duration-500"
//                       style={{ background: PRIMARY_GRADIENT }} />
//                   </h3>
                  
//                   <p className="text-gray-600 leading-relaxed mb-6">
//                     {service.desc}
//                   </p>

//                   {/* Learn More Link */}
//                   <div className="flex items-center gap-2 text-sm font-medium
//                                 opacity-0 group-hover:opacity-100 transform translate-y-2 
//                                 group-hover:translate-y-0 transition-all duration-500"
//                     style={{ color: PRIMARY_COLOR }}>
//                     <span>Learn more</span>
//                     <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
//                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Corner Accents */}
//                 <div className="absolute top-4 right-4 w-6 h-px opacity-0 group-hover:opacity-100 
//                               transition-opacity duration-500 delay-100"
//                   style={{ background: PRIMARY_GRADIENT }} />
//                 <div className="absolute bottom-4 left-4 w-px h-6 opacity-0 group-hover:opacity-100 
//                               transition-opacity duration-500 delay-200"
//                   style={{ background: PRIMARY_GRADIENT }} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Bar */}
//         <div className="mt-20 relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 
//                         rounded-3xl -skew-y-1" />
          
//           <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
//             {[
//               { value: "24h", label: "Max Delivery", color: "blue" },
//               { value: "100%", label: "Quality Score", color: "purple" },
//               { value: "30", label: "Return Days", color: "blue" },
//               { value: "99%", label: "Satisfaction", color: "purple" },
//             ].map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="relative inline-block">
//                   <div className={`text-5xl font-black mb-2 transition-all duration-500 
//                                 group-hover:scale-110 ${
//                     stat.color === 'blue' 
//                       ? 'text-blue-600' 
//                       : 'text-purple-600'
//                   }`}>
//                     {stat.value}
//                   </div>
//                   <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
//                     {stat.label}
//                   </div>
                  
//                   {/* Animated Underline */}
//                   <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 
//                                 w-0 h-0.5 group-hover:w-16 transition-all duration-500 ${
//                     stat.color === 'blue' 
//                       ? 'bg-blue-500' 
//                       : 'bg-purple-500'
//                   }`} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 
//                         bg-white rounded-3xl shadow-xl max-w-2xl mx-auto
//                         border border-gray-100">
//             <div className="text-left">
//               <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                 Need personalized assistance?
//               </h3>
//               <p className="text-gray-600">
//                 Our team is ready to help you with any questions.
//               </p>
//             </div>
            
//             <button className="px-8 py-3 rounded-xl font-semibold text-white
//                             transition-all duration-300 hover:shadow-lg hover:scale-105
//                             active:scale-95 whitespace-nowrap"
//               style={{ 
//                 background: PRIMARY_GRADIENT,
//                 boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
//               }}>
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Animation Styles */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.7; }
//         }

//         .service-card:hover .service-icon {
//           animation: float 2s ease-in-out infinite;
//         }

//         .service-card:hover .service-number {
//           animation: pulse 2s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default ServicesSection;