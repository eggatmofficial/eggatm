import React, { useState, useEffect } from 'react';

const PageLoader = ({ isLoading = true }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
    setShow(true);
  }, [isLoading]);

  useEffect(() => {
    if (!show) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-amber-50 z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Egg */}
        <div className="relative w-20 h-28 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-yellow-50 rounded-[50%] animate-pulse"></div>
          <div className="relative w-full h-full bg-gradient-to-b from-amber-200/80 to-amber-100/80 rounded-[50%] shadow-inner">
            <div className="absolute inset-3 rounded-[50%] bg-gradient-to-br from-white/30 to-transparent"></div>
            {/* Egg Yolk */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full transition-all duration-500"
              style={{ transform: `translate(-50%, -50%) scale(${progress / 100})` }}
            >
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full animate-spin"></div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="w-48 h-1.5 bg-amber-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-700 font-medium">{Math.round(progress)}% loading</p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;