import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaDirections, FaExternalLinkAlt, FaCopy, FaClock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFranchises } from "../../api/franchise.api";

gsap.registerPlugin(ScrollTrigger);

// Custom hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/* ===============================
   SIMPLE SEO – React 19 SAFE
================================ */
const useSEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
};

const ContactNumbers = ({ numbers }) => {
  const copyToClipboard = async (phoneNumber) => {
    try {
      await navigator.clipboard.writeText(phoneNumber.replace(/\s+/g, ''));
      toast.success('Phone number copied to clipboard!', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      toast.error('Failed to copy number', {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="contact-section">
      {numbers.map((number, index) => (
        <div key={index} className="contact-item">
          <FaPhoneAlt className="phone-icon" />
          <a 
            href={`tel:${number.replace(/\s+/g, '')}`} 
            className="contact-link"
          >
            {number}
          </a>
          <button 
            className="copy-btn"
            onClick={() => copyToClipboard(number)}
            aria-label="Copy phone number"
          >
            <FaCopy />
          </button>
        </div>
      ))}
    </div>
  );
};

const BranchSection = ({ branch, index, isMobile }) => {
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    // Only run animations if not on mobile (for better performance)
    if (isMobile) return;

    // Animate info section elements sequentially
    if (infoRef.current) {
      const elements = infoRef.current.children;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      );
    }

    // Animate map container with scale effect
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            markers: false
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      className={`vision-plane ${index % 2 !== 0 && !isMobile ? "reverse" : ""}`}
      id={`branch-${branch.city.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="plane-content" ref={infoRef}>
        <h1 className="city-title">
          <span className="city-glow">{branch.city}</span>
        </h1>
        <div className="branch-info">
          <div className="shop-name-wrapper">
            <FaMapMarkerAlt className="shop-icon" />
            <h2 className="shop-name">{branch.shopName}</h2>
          </div>
          <div className="address-card">
            <p className="address">{branch.address}</p>
          </div>
          
          <div className="contact-card">
            <ContactNumbers numbers={branch.contact} />
            <a 
              href={branch.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-btn"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="map-wrapper" ref={mapRef}>
        <div className="map-frame">
          <div className="map-container">
            <iframe
              src={branch.mapEmbed}
              title={`Google Maps - ${branch.shopName}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="map-iframe"
              aria-label={`Interactive map showing location of ${branch.shopName}`}
            />
          </div>
          <div className="map-overlay">
            <div className="map-actions">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}&travelmode=driving`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-action-btn primary"
              >
                <FaDirections /> Get Directions
              </a>
              <a 
                href={branch.mapLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-action-btn secondary"
              >
                <FaExternalLinkAlt /> Open in Maps
              </a>
            </div>
          </div>
          <div className="map-footer">
            <small className="map-disclaimer">
              Location accuracy may vary. Check before visiting.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

const FranchiseBranches = () => {
  useSEO({
    title: "EGG! ATM Franchise Locations | Fresh Eggs 24/7",
    description: "Find EGG! ATM branches in Erode, Salem, Coimbatore, and Chennai. Fresh eggs available 24/7 at our automated egg vending machines.",
  });

  const isMobile = useIsMobile();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted
    setHasMounted(true);
    
    // Load branches from API
    const loadBranches = async () => {
      try {
        const response = await getUserFranchises();
        const franchiseData = response.data.data || response.data;
        setBranches(franchiseData);
      } catch (err) {
        console.error("Failed to load franchise branches:", err);
        toast.error("Failed to load locations", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadBranches();
  }, []);

  useEffect(() => {
    // Only run animations after component has mounted
    if (!hasMounted || isMobile) return;

    /* ===============================
       EGG BACKGROUND ANIMATION - LIGHTWEIGHT
    =============================== */
    const eggs = gsap.utils.toArray(".egg");
    if (eggs.length > 0) {
      eggs.forEach((egg, i) => {
        const rotation = gsap.utils.random(-10, 10);
        const xRange = 40;
        const yRange = 120;
        
        gsap.fromTo(
          egg,
          {
            y: gsap.utils.random(40, yRange),
            x: gsap.utils.random(-xRange, xRange),
            scale: gsap.utils.random(0.85, 1.05),
            rotation: rotation,
            opacity: 0.08,
          },
          {
            y: gsap.utils.random(-yRange, -40),
            x: gsap.utils.random(-xRange * 1.5, xRange * 1.5),
            scale: gsap.utils.random(1, 1.2),
            rotation: rotation + gsap.utils.random(-5, 5),
            opacity: gsap.utils.random(0.15, 0.3),
            duration: gsap.utils.random(16, 24),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.4,
          }
        );
      });
    }

    /* ===============================
       FIXED ICON PULSE - REDUCED FOR MOBILE
    =============================== */
    const enquiryButtons = document.querySelectorAll(".vision-enquiry a");
    if (enquiryButtons.length > 0) {
      gsap.to(enquiryButtons, {
        scale: 1.1,
        y: -5,
        boxShadow: "0 15px 30px rgba(255, 179, 0, 0.3)",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.4,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Kill GSAP animations
      gsap.killTweensOf(".egg");
      gsap.killTweensOf(".vision-enquiry a");
    };
  }, [hasMounted, isMobile]);

  if (loading) {
    return (
      <div className="loading-screen">
        <style>{`
          .loading-screen {
            min-height: 100vh;
            background: linear-gradient(135deg, #fffde7 0%, #ffecb3 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .loading-content {
            text-align: center;
          }
          
          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 179, 0, 0.3);
            border-top-color: #ffb300;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          h2 {
            color: #ff8f00;
            font-weight: 500;
          }
        `}</style>
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <h2>Loading EGG! ATM Locations...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="vision-root">
      {/* Toast Container for notifications */}
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* EGG BACKGROUND - Minimal on mobile */}
      <div className="egg-bg">
        {Array.from({ length: isMobile ? 3 : 8 }).map((_, i) => (
          <span className="egg" key={i} />
        ))}
      </div>

      {/* BRANCH SECTIONS */}
      {branches.map((branch, index) => (
        <BranchSection
          key={branch._id || index}
          branch={branch}
          index={index}
          isMobile={isMobile}
        />
      ))}

      {/* FIXED CONTACT ICONS */}
      <div className="vision-enquiry">
        <a
          href="https://wa.me/919629861885"
          target="_blank"
          rel="noopener noreferrer"
          className="wa"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <a 
          href="tel:+919629861885" 
          className="call"
          aria-label="Call us"
        >
          <FaPhoneAlt />
        </a>
      </div>

      {/* STYLES */}
      <style>{`
        /* CRITICAL: Force visibility on initial render */
        .vision-root {
          background: linear-gradient(135deg, #fffde7 0%, #ffecb3 100%) !important;
          color: #333 !important;
          overflow-x: hidden !important;
          position: relative !important;
          min-height: 100vh !important;
          -webkit-tap-highlight-color: transparent !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          width: 100% !important;
          height: auto !important;
        }

        /* Ensure all content sections are visible */
        .vision-plane {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          transform: none !important;
        }

        /* ===============================
           EGG BACKGROUND - LIGHTWEIGHT
        =============================== */
        .egg-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .egg {
          position: absolute;
          width: 120px;
          height: 160px;
          background: radial-gradient(
            ellipse at top,
            rgba(255, 255, 255, 0.6),
            rgba(255, 179, 0, 0.3),
            rgba(255, 140, 0, 0.2)
          );
          border-radius: 50% 50% 45% 45%;
          filter: blur(6px);
          opacity: 0.15;
        }

        /* ===============================
           SECTIONS - MOBILE FIRST
        =============================== */
        .vision-plane {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          gap: 30px;
          position: relative;
          z-index: 2;
          min-height: auto;
          width: 100%;
        }

        .plane-content {
          width: 100%;
          max-width: 500px;
        }

        .city-title {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          display: block;
          text-align: center;
        }

        .city-glow {
          background: linear-gradient(135deg, #ff8f00 0%, #ffb300 50%, #ffcc00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* BRANCH INFO */
        .branch-info {
          width: 100%;
        }

        .shop-name-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          text-align: center;
        }

        .shop-icon {
          color: #ffb300;
          font-size: 2rem;
        }

        .shop-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ff8f00;
          line-height: 1.3;
          margin: 0;
        }

        .address-card {
          background: rgba(255, 255, 255, 0.7);
          border-left: 3px solid #ffb300;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(255, 179, 0, 0.1);
        }

        .address {
          color: #666;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
        }

        /* CONTACT CARD STYLES */
        .contact-card {
          background: rgba(255, 255, 255, 0.8);
          padding: 15px;
          border-radius: 10px;
          border: 1px solid rgba(255, 179, 0, 0.2);
          box-shadow: 0 4px 12px rgba(255, 179, 0, 0.1);
        }

        .contact-section {
          margin-bottom: 15px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          padding: 10px;
          background: rgba(255, 179, 0, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 179, 0, 0.1);
        }

        .phone-icon {
          color: #ff8f00;
          font-size: 1rem;
        }

        .contact-link {
          flex: 1;
          color: #333;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: #ff8f00;
        }

        .copy-btn {
          background: rgba(255, 179, 0, 0.1);
          border: 1px solid rgba(255, 179, 0, 0.2);
          color: #ff8f00;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .copy-btn:hover {
          background: #ffb300;
          color: white;
        }

        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #25d366, #1da851);
          color: white;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          width: 100%;
          border: none;
        }

        .whatsapp-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        }

        /* ===============================
           MAP
        =============================== */
        .map-wrapper {
          width: 100%;
          max-width: 500px;
          margin-top: 20px;
        }

        .map-frame {
          border-radius: 15px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 2px solid rgba(255, 179, 0, 0.3);
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 250px;
          background: #f5f5f5;
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .map-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 15px;
          pointer-events: none;
        }

        .map-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          pointer-events: auto;
        }

        .map-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-align: center;
          border: none;
          cursor: pointer;
        }

        .map-action-btn.primary {
          background: #ff8f00;
          color: white;
        }

        .map-action-btn.primary:hover {
          background: #ff6f00;
          transform: translateY(-2px);
        }

        .map-action-btn.secondary {
          background: rgba(255, 255, 255, 0.9);
          color: #333;
        }

        .map-action-btn.secondary:hover {
          background: white;
          transform: translateY(-2px);
        }

        .map-footer {
          background: rgba(0, 0, 0, 0.8);
          padding: 8px;
          text-align: center;
        }

        .map-disclaimer {
          color: #aaa;
          font-size: 0.7rem;
          opacity: 0.7;
        }

        /* ===============================
           FIXED ICONS
        =============================== */
        .vision-enquiry {
          position: fixed;
          right: 15px;
          bottom: 15px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 100;
        }

        .vision-enquiry a {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          border: 2px solid white;
        }

        .wa {
          background: linear-gradient(135deg, #25d366, #1da851);
          color: white;
        }

        .call {
          background: linear-gradient(135deg, #ff8f00, #ffb300);
          color: white;
        }

        .vision-enquiry a:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 25px rgba(0,0,0,0.3);
        }

        /* ===============================
           DESKTOP STYLES
        =============================== */
        @media (min-width: 768px) {
          .vision-plane {
            flex-direction: row;
            justify-content: space-between;
            padding: 80px 8%;
            gap: 60px;
            min-height: 100vh;
          }

          .vision-plane.reverse {
            flex-direction: row-reverse;
          }

          .plane-content {
            max-width: 500px;
            text-align: left;
          }

          .city-title {
            font-size: 3.5rem;
            text-align: left;
            margin-bottom: 30px;
          }

          .shop-name-wrapper {
            flex-direction: row;
            text-align: left;
            justify-content: flex-start;
            gap: 15px;
          }

          .shop-name {
            font-size: 1.8rem;
            text-align: left;
          }

          .address-card {
            text-align: left;
            padding: 20px;
          }

          .address {
            font-size: 1.1rem;
          }

          .contact-item {
            flex-direction: row;
            text-align: left;
          }

          .map-wrapper {
            width: 480px;
            max-width: none;
            margin-top: 0;
          }

          .map-container {
            height: 300px;
          }

          .map-actions {
            flex-direction: row;
          }

          .map-action-btn {
            width: auto;
          }

          .vision-enquiry {
            right: 24px;
            bottom: 24px;
          }

          .vision-enquiry a {
            width: 64px;
            height: 64px;
            font-size: 1.8rem;
          }
        }

        /* Tablet styles (for better middle ground) */
        @media (min-width: 600px) and (max-width: 767px) {
          .vision-plane {
            padding: 60px 40px;
          }
          
          .city-title {
            font-size: 2.5rem;
          }
          
          .map-container {
            height: 280px;
          }
        }

        /* Extra small mobile */
        @media (max-width: 360px) {
          .city-title {
            font-size: 1.8rem;
          }

          .shop-name {
            font-size: 1.3rem;
          }

          .map-container {
            height: 200px;
          }

          .vision-enquiry a {
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FranchiseBranches;






