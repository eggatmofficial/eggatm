import React, { useEffect, useRef, useState } from "react";

export const PRIMARY_COLOR = '#faa807';
export const SECONDARY_COLOR = '#ffd13d';
export const PRIMARY_GRADIENT = 'linear-gradient(135deg, #faa807 0%, #ffd13d 100%)';

const Categories = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const categories = [
    { 
      name: "Tea Powder", 
      emoji: "🍵", 
      gradient: "from-amber-50 via-orange-50 to-yellow-50",
      color: "#faa807"
    },
    { 
      name: "Coffee Powder", 
      emoji: "☕", 
      gradient: "from-amber-100 via-orange-100 to-yellow-100",
      color: "#e69500"
    },
    { 
      name: "Magic Masala", 
      emoji: "🌶️", 
      gradient: "from-red-50 via-orange-50 to-amber-50",
      color: "#dc2626"
    },
    { 
      name: "Fried Rice Masala", 
      emoji: "🍚", 
      gradient: "from-orange-50 via-amber-50 to-yellow-50",
      color: "#f97316"
    },
    { 
      name: "Base Masala", 
      emoji: "🥘", 
      gradient: "from-purple-50 via-pink-50 to-rose-50",
      color: "#8b5cf6"
    },
    { 
      name: "Egg 65 Masala", 
      emoji: "🥚", 
      gradient: "from-yellow-50 via-amber-50 to-orange-50",
      color: "#fbbf24"
    },
    { 
      name: "Veg 65 Masala", 
      emoji: "🥦", 
      gradient: "from-green-50 via-emerald-50 to-lime-50",
      color: "#059669"
    },
    { 
      name: "Peri Peri Masala", 
      emoji: "🔥", 
      gradient: "from-red-100 via-orange-100 to-red-50",
      color: "#dc2626"
    },
    { 
      name: "Soda Flavours", 
      emoji: "🥤", 
      gradient: "from-blue-50 via-cyan-50 to-sky-50",
      color: "#3b82f6"
    },
    { 
      name: "Tissue Paper", 
      emoji: "🧻", 
      gradient: "from-gray-50 via-slate-50 to-zinc-50",
      color: "#6b7280"
    },
  ];

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden  px-4 sm:px-6 lg:px-12 xl:px-20 py-10 sm:py-14 lg:py-10 "
    >
      {/* Floating particles with your color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: PRIMARY_COLOR,
              opacity: 0.3,
              left: `${10 + (i * 6)}%`,
              top: `${10 + (i * 4)}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

   <div className="relative w-full flex flex-col space-y-10">


        {/* Header with your primary color */}
        <div className="text-center mb-16 ">
          <div className="flex flex-col items-center space-y-6 ">
            <h1 className="text-5xl md:text-7xl font-bold" style={{ 
              background: PRIMARY_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Our Collections
            </h1>
            {/* Animated underline with your gradient */}
            <div className="relative h-2 mt-6 overflow-hidden rounded-full bg-amber-100 w-48 md:w-64">
              <div 
                className="absolute inset-0"
                style={{
                  background: PRIMARY_GRADIENT,
                  animation: 'shimmer 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
          
          {/* Centered description */}
          <div className="flex justify-center">
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed text-center">
              Discover premium quality spices and essentials with <span className="font-semibold" style={{ color: PRIMARY_COLOR }}>100% natural</span> ingredients
            </p>
          </div>
        </div>

        {/* Grid - Centered with custom colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card group flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Main Card - Centered */}
              <div className={`
                relative w-full h-64 rounded-2xl p-6
                flex flex-col items-center justify-center
                cursor-pointer
                overflow-hidden
                transition-all duration-500
                ${hoveredIndex === index ? 'scale-105' : 'scale-100'}
                bg-gradient-to-br ${category.gradient}
                border-2 border-white
                shadow-lg
                hover:shadow-2xl
              `}>
                
                {/* Animated ring with your color */}
                <div 
                  className={`
                    absolute inset-0 rounded-2xl
                    transition-all duration-700
                    ${hoveredIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
                    border-2
                  `}
                  style={{
                    borderColor: hoveredIndex === index ? PRIMARY_COLOR : 'transparent',
                    animation: hoveredIndex === index ? 'spin 3s linear infinite' : 'none',
                  }}
                />
                
                {/* Centered Emoji Container */}
                <div className="relative flex items-center justify-center">
                  <div className={`
                    w-24 h-24 rounded-2xl
                    flex items-center justify-center
                    bg-white/90 backdrop-blur-sm
                    text-5xl
                    shadow-lg
                    transition-all duration-500
                    ${hoveredIndex === index ? 'scale-110 rotate-12' : 'scale-100'}
                    group-hover:scale-110
                    group-hover:rotate-12
                  `}>
                    {category.emoji}
                  </div>
                  
                  {/* Floating particles with your color */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-full animate-float"
                          style={{
                            backgroundColor: PRIMARY_COLOR,
                            left: `${25 + i * 25}%`,
                            top: '-25%',
                            animationDelay: `${i * 0.2}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
                
                {/* Category Name - Centered */}
                <div className="mt-10 text-center w-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex justify-center">
                    <div 
                      className="w-8 h-1 rounded-full transition-all duration-500 group-hover:w-16"
                      style={{ 
                        background: hoveredIndex === index ? PRIMARY_GRADIENT : `linear-gradient(90deg, ${PRIMARY_COLOR}30, ${SECONDARY_COLOR}30)`
                      }}
                    />
                  </div>
                </div>
                
                {/* Bottom gradient line with your colors */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1.5 rounded-full transition-all duration-500 group-hover:w-3/4"
                  style={{ background: PRIMARY_GRADIENT }}
                />
              </div>
              
              {/* Glow effect with your color */}
              <div 
                className={`
                  absolute -z-10
                  rounded-2xl blur-xl
                  transition-all duration-500
                  ${hoveredIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
                  w-full h-64
                `}
                style={{ 
                  background: PRIMARY_GRADIENT,
                  opacity: 0.3
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          50% { transform: translateY(-20px) translateX(10px) scale(1.2); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg) scale(1.05); }
          to { transform: rotate(360deg) scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .category-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .category-card.animate-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        
        /* Stagger animations */
        .category-card:nth-child(1) { animation-delay: 0.1s; }
        .category-card:nth-child(2) { animation-delay: 0.2s; }
        .category-card:nth-child(3) { animation-delay: 0.3s; }
        .category-card:nth-child(4) { animation-delay: 0.4s; }
        .category-card:nth-child(5) { animation-delay: 0.5s; }
        .category-card:nth-child(6) { animation-delay: 0.6s; }
        .category-card:nth-child(7) { animation-delay: 0.7s; }
        .category-card:nth-child(8) { animation-delay: 0.8s; }
        .category-card:nth-child(9) { animation-delay: 0.9s; }
        .category-card:nth-child(10) { animation-delay: 1s; }
      `}</style>
    </section>
  );
};

export default Categories;