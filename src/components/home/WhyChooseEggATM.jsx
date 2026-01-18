import React, { useState, useEffect, useRef } from "react";

export const PRIMARY_COLOR = "#faa807";
export const SECONDARY_COLOR = "#ffd13d";
export const PRIMARY_GRADIENT =
  "linear-gradient(135deg, #faa807 0%, #ffd13d 100%)";

const WhyChooseEggATM = () => {
  const [eggState, setEggState] = useState("whole");
  const [showCards, setShowCards] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const featureCards = [
    {
      id: 1,
      icon: "🌿",
      title: "Freshness",
      value: "98%",
      description: "Guaranteed farm-fresh quality",
      color: "#10b981",
      position: "top-4 left-4 sm:top-6 sm:left-6"
    },
    {
      id: 2,
      icon: "🔒",
      title: "Airtight",
      value: "100%",
      description: "Perfect seal technology",
      color: "#3b82f6",
      position: "top-4 right-4 sm:top-6 sm:right-6"
    },
    {
      id: 3,
      icon: "⚡",
      title: "Convenience",
      value: "95%",
      description: "24/7 instant access",
      color: "#f59e0b",
      position: "bottom-4 right-4 sm:bottom-6 sm:right-6"
    },
    {
      id: 4,
      icon: "♻️",
      title: "Eco-Friendly",
      value: "90%",
      description: "Sustainable packaging",
      color: "#22c55e",
      position: "bottom-4 left-4 sm:bottom-6 sm:left-6"
    },
    {
      id: 5,
      icon: "⭐",
      title: "Quality",
      value: "99%",
      description: "Premium grade selection",
      color: "#8b5cf6",
      position: "top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"
    },
    {
      id: 6,
      icon: "💰",
      title: "Value",
      value: "96%",
      description: "Best price guarantee",
      color: "#ef4444",
      position: "top-1/2 -translate-y-1/2 right-0 translate-x-1/2"
    },
  ];

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const startAnimation = () => {
    const sequence = () => {
      setEggState("glowing");
      setTimeout(() => setEggState("cracking"), 1000);
      setTimeout(() => {
        setEggState("open");
        setTimeout(() => setShowCards(true), 300);
      }, 2000);
    };
    sequence();
  };

  const replayAnimation = () => {
    setEggState("whole");
    setShowCards(false);
    setTimeout(startAnimation, 300);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-6 px-4 sm:py-12 md:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-amber-50 to-white"
    >
      {/* Background Effects - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-4 w-32 h-32 sm:top-10 sm:right-10 sm:w-48 sm:h-48 md:top-20 md:right-20 md:w-64 md:h-64 bg-gradient-to-br from-yellow-200/20 to-amber-300/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-32 h-32 sm:bottom-10 sm:left-10 sm:w-48 sm:h-48 md:bottom-20 md:left-20 md:w-64 md:h-64 bg-gradient-to-tr from-amber-200/20 to-yellow-300/10 rounded-full blur-2xl"></div>
      </div>

      {/* Header - Mobile Responsive */}
      <div className="relative text-center mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto px-2">
        <div className="inline-block mb-2 sm:mb-1 md:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
            Why Choose{" "}
            <span
              className="relative inline-block"
              style={{
                background: PRIMARY_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EGG! ATM
              {/* Animated Egg on top of M - Responsive */}
              <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-4 md:-top-7 md:-right-5 lg:-top-8 lg:-right-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xs sm:blur-sm"></div>
                
                {/* Egg container */}
                <div className="relative w-full h-full">
                  <img 
                    src="/images/egg.png" 
                    alt="Egg"
                    className="w-full h-full object-contain animate-egg-wobble drop-shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full flex items-center justify-center text-lg sm:text-xl md:text-2xl lg:text-3xl animate-egg-wobble';
                      fallback.innerHTML = '🥚';
                      e.target.parentElement.appendChild(fallback);
                    }}
                  />
                </div>
                
                {/* Sparkles */}
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-300 animate-ping" style={{animationDuration: '2s'}}></div>
              </div>
            </span>
          </h2>
        </div>
      </div>

      {/* Main Container - Mobile Responsive */}
      <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] xl:min-h-[650px] px-2 sm:px-4">
        
        {/* Cards Container - Responsive Positioning */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
            {featureCards.map((card) => (
              <div
                key={card.id}
                className={`absolute ${card.position} z-10 transition-all duration-700 ease-out ${
                  showCards ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  transitionDelay: `${card.id * 0.08}s`,
                }}
              >
                {/* Card - Responsive sizing */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl p-1.5 sm:p-2 md:p-3 
                  border-2 border-white/50 shadow-md hover:shadow-lg hover:scale-105 sm:hover:scale-110
                  transition-all duration-200 cursor-pointer min-w-[60px] sm:min-w-[70px] md:min-w-[80px] lg:min-w-[90px]"
                  style={{ borderColor: `${card.color}40` }}
                >
                  <div className="text-center">
                    <div 
                      className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1 transition-transform duration-300"
                      style={{ color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 line-clamp-1">
                      {card.title}
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-bold" style={{ color: card.color }}>
                      {card.value}
                    </div>
                  </div>
                  {/* Tooltip - Hidden on mobile, shown on hover for desktop */}
                  <div className="hidden sm:block absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 
                    opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                    {card.description}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                  {/* Mobile tap tooltip - Shows on click/touch */}
                  <div className="sm:hidden absolute -top-1 -translate-y-full left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] rounded py-0.5 px-1 
                    opacity-0 active:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap z-20">
                    {card.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Egg Animation - Responsive */}
        <div className="relative z-20">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72">
            
            {/* Egg Glow */}
            <div className={`absolute inset-0 rounded-full blur-lg sm:blur-xl transition-all duration-700 ${
              eggState === "whole" ? "bg-amber-200/30" :
              eggState === "glowing" ? "bg-orange-300/40 animate-pulse-glow" :
              eggState === "cracking" ? "bg-orange-400/50 animate-pulse-fast" :
              "bg-gradient-to-r from-amber-300/30 to-yellow-300/30"
            }`}></div>

            {/* Egg Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Whole & Cracking Egg */}
              {eggState !== "open" && (
                <div className={`relative transition-all duration-400 ${
                  eggState === "cracking" ? "animate-crack-shake" : ""
                }`}>
                  <div className="relative w-32 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 lg:w-48 lg:h-60 xl:w-56 xl:h-68">
                    
                    {/* Egg Shell */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-amber-50 to-yellow-50 
                      rounded-[50%] shadow-lg sm:shadow-xl shadow-amber-300/40 overflow-hidden">
                      
                      {/* Egg Details */}
                      <div className="absolute inset-2 sm:inset-3 md:inset-4 rounded-[50%] bg-gradient-to-br from-white/20 to-transparent"></div>
                      <div className="absolute top-3 left-6 sm:top-4 sm:left-7 w-8 sm:w-10 h-4 sm:h-5 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm"></div>
                      <div className="absolute bottom-6 right-4 sm:bottom-8 sm:right-6 w-6 sm:w-8 h-3 sm:h-4 bg-gradient-to-t from-white/30 to-transparent rounded-full blur-sm"></div>
                    </div>

                    {/* Cracks */}
                    {eggState === "cracking" && (
                      <>
                        {/* Main Crack */}
                        <div className="absolute left-1/2 top-2 sm:top-3 -translate-x-1/2 w-[2px] h-0 bg-gradient-to-b from-amber-400/80 to-transparent animate-crack-main rounded-full"></div>
                        
                        {/* Branching Cracks */}
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-[1px] h-0 bg-gradient-to-b from-amber-400/60 to-transparent animate-crack-branch rounded-full"
                            style={{
                              left: `${45 + (Math.random() * 10)}%`,
                              top: `${15 + i * 15}%`,
                              transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
                              animationDelay: `${i * 0.15}s`,
                            }}
                          ></div>
                        ))}
                        
                        {/* Flash Effect */}
                        <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-transparent via-orange-400/10 to-transparent animate-crack-flash"></div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Open Egg - Responsive */}
              {eggState === "open" && (
                <div className="relative animate-egg-open">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-40 xl:h-40">
                    {/* Glow effect behind egg */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-md sm:blur-lg animate-pulse"></div>
                    
                    {/* Rotating Egg Image Container */}
                    <div className="relative w-full h-full">
                      {/* Egg Image with Multiple Animations */}
                      <img 
                        src="/images/egg.png" 
                        alt="Egg"
                        className="w-full h-full object-contain animate-egg-combined"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          // Fallback to emoji
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-egg-bounce';
                          fallback.innerHTML = '🥚';
                          e.target.parentElement.appendChild(fallback);
                        }}
                      />
                      
                      {/* Reflection effect */}
                      <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-3 h-0.5 sm:w-4 sm:h-1 bg-white/40 rounded-full blur-sm"></div>
                      
                      {/* Floating particles around egg */}
                      <div className="absolute -top-0.5 -left-0.5 sm:-top-1 sm:-left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-400/50 animate-bounce" style={{animationDelay: '0s'}}></div>
                      <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-orange-400/50 animate-bounce" style={{animationDelay: '0.3s'}}></div>
                      <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400/50 animate-bounce" style={{animationDelay: '0.6s'}}></div>
                      <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-500/50 animate-bounce" style={{animationDelay: '0.9s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls - Only Replay Button */}
      <div className={`text-center transition-all duration-700 px-2 sm:px-4 mt-4 sm:mt-6 md:mt-8 ${
        showCards ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <button 
            className="group relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg text-white font-semibold text-xs sm:text-sm md:text-base
              shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 w-full max-w-[200px] sm:max-w-none"
            onClick={replayAnimation}
          >
            <span className="relative z-10 flex items-center gap-1 sm:gap-2 justify-center">
              <span>Replay Animation</span>
              <span className="group-hover:rotate-180 transition-transform duration-300 text-sm sm:text-base md:text-lg">↻</span>
            </span>
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes egg-wobble {
          0%, 100% {
            transform: 
              translateY(0) 
              rotate(0deg);
          }
          15% {
            transform: 
              translateY(-2px) 
              rotate(3deg);
          }
          30% {
            transform: 
              translateY(-1px) 
              rotate(-2deg);
          }
          45% {
            transform: 
              translateY(-3px) 
              rotate(2deg);
          }
          60% {
            transform: 
              translateY(-0.5px) 
              rotate(-1deg);
          }
          75% {
            transform: 
              translateY(-2px) 
              rotate(1.5deg);
          }
          90% {
            transform: 
              translateY(-0.25px) 
              rotate(-0.5deg);
          }
        }

        @keyframes egg-glow {
          0%, 100% {
            filter: drop-shadow(0 0 3px rgba(250, 168, 7, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 6px rgba(250, 168, 7, 0.5));
          }
        }

        @keyframes egg-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.03);
          }
          50% {
            transform: rotate(180deg) scale(1.06);
          }
          75% {
            transform: rotate(270deg) scale(1.03);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes egg-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(2deg);
          }
          50% {
            transform: translateY(-5px) rotate(0deg);
          }
          75% {
            transform: translateY(-4px) rotate(-2deg);
          }
        }

        @keyframes egg-pulse {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 5px rgba(250, 168, 7, 0.3));
          }
          50% {
            filter: brightness(1.08) drop-shadow(0 0 10px rgba(250, 168, 7, 0.5));
          }
        }

        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }

        @keyframes crack-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-0.5px); }
          75% { transform: translateX(0.5px); }
        }

        @keyframes crack-main {
          0% { height: 0; opacity: 0; }
          50% { height: 20px; opacity: 1; }
          100% { height: 30px; opacity: 0.8; }
        }

        @keyframes crack-branch {
          0% { height: 0; opacity: 0; }
          50% { height: 12px; opacity: 1; }
          100% { height: 10px; opacity: 0.6; }
        }

        @keyframes crack-flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.15; }
        }

        @keyframes egg-open {
          0% { 
            transform: scale(0.8); 
            opacity: 0;
          }
          100% { 
            transform: scale(1); 
            opacity: 1;
          }
        }

        .animate-egg-wobble {
          animation: 
            egg-wobble 3s ease-in-out infinite,
            egg-glow 4s ease-in-out infinite;
        }

        .animate-egg-combined {
          animation: 
            egg-rotate 8s linear infinite,
            egg-float 4s ease-in-out infinite,
            egg-pulse 3s ease-in-out infinite;
        }

        .animate-egg-spin {
          animation: egg-rotate 6s linear infinite;
        }

        .animate-egg-bounce {
          animation: egg-float 3s ease-in-out infinite;
        }

        .animate-bounce-soft {
          animation: bounce-soft 3s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-crack-shake {
          animation: crack-shake 0.1s ease-in-out infinite;
        }

        .animate-crack-main {
          animation: crack-main 0.6s ease-out forwards;
        }

        .animate-crack-branch {
          animation: crack-branch 0.4s ease-out forwards;
        }

        .animate-crack-flash {
          animation: crack-flash 0.3s ease-out;
        }

        .animate-egg-open {
          animation: egg-open 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-pulse-fast {
          animation: pulse-glow 0.4s ease-in-out infinite;
        }

        /* Responsive line clamp for mobile */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-egg-combined {
            animation: 
              egg-rotate 10s linear infinite,
              egg-float 5s ease-in-out infinite,
              egg-pulse 4s ease-in-out infinite;
          }
          
          .animate-egg-wobble {
            animation: 
              egg-wobble 4s ease-in-out infinite,
              egg-glow 5s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseEggATM;