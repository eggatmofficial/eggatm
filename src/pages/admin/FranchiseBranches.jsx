// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger);

// /* ===============================
//    SIMPLE SEO – React 19 SAFE
// ================================ */
// const useSEO = ({ title, description }) => {
//   useEffect(() => {
//     document.title = title;
//     let meta = document.querySelector("meta[name='description']");
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "description";
//       document.head.appendChild(meta);
//     }
//     meta.content = description;
//   }, [title, description]);
// };

// const locations = [
//   {
//     city: "Chennai",
//     address: "Anna Nagar, Chennai",
//     mapEmbed: "https://www.google.com/maps?q=Anna+Nagar+Chennai&output=embed",
//     mapLink:
//       "https://www.google.com/maps/search/?api=1&query=Anna+Nagar+Chennai",
//   },
//   {
//     city: "Coimbatore",
//     address: "Gandhipuram, Coimbatore",
//     mapEmbed:
//       "https://www.google.com/maps?q=Gandhipuram+Coimbatore&output=embed",
//     mapLink:
//       "https://www.google.com/maps/search/?api=1&query=Gandhipuram+Coimbatore",
//   },
//   {
//     city: "Bangalore",
//     address: "Whitefield, Bangalore",
//     mapEmbed:
//       "https://www.google.com/maps?q=Whitefield+Bangalore&output=embed",
//     mapLink:
//       "https://www.google.com/maps/search/?api=1&query=Whitefield+Bangalore",
//   },
// ];

// const FranchiseBranches = () => {
//   useSEO({
//     title: "EGG! ATM Franchise Locations",
//     description:
//       "Explore EGG! ATM franchise locations in Chennai, Coimbatore and Bangalore.",
//   });

//   const sectionsRef = useRef([]);
//   const isMobile = window.innerWidth < 900;
//   const eggCount = isMobile ? 4 : 8;

//   useEffect(() => {
//     /* ===============================
//        SCROLL ENGINE
//     =============================== */
//     let lenis;
//     if (!isMobile) {
//       lenis = new Lenis({ smooth: true, lerp: 0.08 });
//       const raf = (t) => {
//         lenis.raf(t);
//         ScrollTrigger.update();
//         requestAnimationFrame(raf);
//       };
//       requestAnimationFrame(raf);
//     }

//     /* ===============================
//        SECTION ANIMATIONS (ALL DEVICES)
//     =============================== */
//     sectionsRef.current.forEach((sec) => {
//       gsap.fromTo(
//         sec,
//         { opacity: 0, y: isMobile ? 25 : 70 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: isMobile ? 0.6 : 1,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: sec,
//             start: "top 90%",
//           },
//         }
//       );
//     });

//     /* ===============================
//        EGG BACKGROUND ANIMATION
//     =============================== */
//     gsap.utils.toArray(".egg").forEach((egg, i) => {
//       gsap.fromTo(
//         egg,
//         {
//           y: gsap.utils.random(40, 120),
//           x: gsap.utils.random(-40, 40),
//           scale: gsap.utils.random(0.9, 1.05),
//           opacity: 0.12,
//         },
//         {
//           y: gsap.utils.random(-120, -40),
//           x: gsap.utils.random(-60, 60),
//           scale: gsap.utils.random(1, 1.15),
//           opacity: 0.25,
//           duration: gsap.utils.random(14, 22),
//           ease: "sine.inOut",
//           repeat: -1,
//           yoyo: true,
//           delay: i * 0.6,
//         }
//       );
//     });

//     /* ===============================
//        FIXED ICON PULSE
//     =============================== */
//     gsap.to(".vision-enquiry a", {
//       scale: 1.07,
//       repeat: -1,
//       yoyo: true,
//       duration: 1.6,
//       ease: "sine.inOut",
//       stagger: 0.3,
//     });

//     return () => {
//       lenis && lenis.destroy();
//       ScrollTrigger.killAll();
//     };
//   }, [isMobile]);

//   return (
//     <div className="vision-root">
//       {/* EGG BACKGROUND */}
//       <div className="egg-bg">
//         {Array.from({ length: eggCount }).map((_, i) => (
//           <span className="egg" key={i} />
//         ))}
//       </div>

//       {/* BRANCH SECTIONS */}
//       {locations.map((item, index) => (
//         <section
//           key={index}
//           ref={(el) => (sectionsRef.current[index] = el)}
//           className={`vision-plane ${index % 2 !== 0 ? "reverse" : ""}`}
//         >
//           <div className="plane-content">
//             <h1>{item.city}</h1>
//             <p>{item.address}</p>
//           </div>

//           <a
//             href={item.mapLink}
//             target="_blank"
//             rel="noreferrer"
//             className="map-wrapper"
//             aria-label={`Open ${item.city} location in Google Maps`}
//           >
//             <iframe src={item.mapEmbed} title={item.city} />
//             <span className="map-overlay">Open in Google Maps</span>
//           </a>
//         </section>
//       ))}

//       {/* FIXED CONTACT ICONS */}
//       <div className="vision-enquiry">
//         <a
//           href="https://wa.me/919629861885"
//           target="_blank"
//           rel="noreferrer"
//           className="wa"
//         >
//           <FaWhatsapp />
//         </a>
//         <a href="tel:+911962986188" className="call">
//           <FaPhoneAlt />
//         </a>
//       </div>

//       {/* STYLES */}
//       <style>{`
//         .vision-root {
//           background: #000;
//           color: #fff;
//           overflow-x: hidden;
//           position: relative;
//         }

//         /* ===============================
//            EGG BACKGROUND
//         =============================== */
//         .egg-bg {
//           position: fixed;
//           inset: 0;
//           pointer-events: none;
//           z-index: 0;
//           overflow: hidden;
//         }

//         .egg {
//           position: absolute;
//           width: 120px;
//           height: 160px;
//           background: radial-gradient(
//             ellipse at top,
//             rgba(255,255,255,0.35),
//             rgba(255,193,7,0.18),
//             rgba(255,152,0,0.12)
//           );
//           border-radius: 50% 50% 45% 45%;
//           filter: blur(6px);
//           opacity: 0.2;
//         }

//         .egg:nth-child(1) { top: 10%; left: 15%; }
//         .egg:nth-child(2) { top: 30%; left: 75%; }
//         .egg:nth-child(3) { top: 55%; left: 45%; }
//         .egg:nth-child(4) { top: 70%; left: 85%; }
//         .egg:nth-child(5) { top: 85%; left: 20%; }
//         .egg:nth-child(6) { top: 40%; left: 90%; }
//         .egg:nth-child(7) { top: 15%; left: 55%; }
//         .egg:nth-child(8) { top: 60%; left: 10%; }

//         /* ===============================
//            SECTIONS
//         =============================== */
//         .vision-plane {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 80px 8%;
//           gap: 40px;
//           position: relative;
//           z-index: 2;
//         }

//         .vision-plane.reverse {
//           flex-direction: row-reverse;
//         }

//         .plane-content h1 {
//           font-size: 3.5rem;
//           font-weight: 800;
//         }

//         .plane-content p {
//           color: #ccc;
//           margin-top: 10px;
//         }

//         .map-wrapper {
//           position: relative;
//           border-radius: 22px;
//           overflow: hidden;
//         }

//         .map-wrapper iframe {
//           width: 480px;
//           height: 300px;
//           border: none;
//           pointer-events: none;
//         }

//         .map-overlay {
//           position: absolute;
//           inset: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(0,0,0,0.35);
//           color: #fff;
//           font-weight: 600;
//           opacity: 0;
//           transition: opacity 0.3s;
//         }

//         .map-wrapper:hover .map-overlay {
//           opacity: 1;
//         }

//         /* ===============================
//            FIXED ICONS
//         =============================== */
//         .vision-enquiry {
//           position: fixed;
//           right: 16px;
//           bottom: 16px;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           z-index: 100;
//         }

//         .vision-enquiry a {
//           width: 56px;
//           height: 56px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 1.6rem;
//           box-shadow: 0 12px 28px rgba(0,0,0,0.45);
//         }

//         .wa {
//           background: #25d366;
//           color: #000;
//         }

//         .call {
//           background: #0a6cff;
//           color: #fff;
//         }

//         /* ===============================
//            MOBILE
//         =============================== */
//         @media (max-width: 900px) {
//           .egg {
//             width: 90px;
//             height: 120px;
//             filter: blur(4px);
//           }

//           .vision-plane,
//           .vision-plane.reverse {
//             flex-direction: column;
//             padding: 40px 16px;
//             text-align: center;
//           }

//           .plane-content h1 {
//             font-size: 2.1rem;
//           }

//           .map-wrapper iframe {
//             width: 100%;
//             height: 220px;
//           }

//           .map-overlay {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FranchiseBranches;
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt, FaDirections, FaExternalLinkAlt, FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const branches = [
  {
    shopName: "EGG! ATM Kumaramangalam",
    address: "Opp.to Indian oil Bunk, kumaramangalam pirivu road, kumaramangalam, Namakkal - 637205",
    contact: ["+91 9629861885"],
    city: "Namakkal",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.47119792182136!2d77.93787888037394!3d11.368332317435426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babdf0072e7ae7b%3A0xafdea2d901b611b0!2sEgg%20Bites!5e0!3m2!1sen!2sin!4v1770310170057!5m2!1sen!2sin",
    mapLink: "https://goo.gl/maps/4LJtZzb15k1fTuzG7",
    lat: 11.25854,
    lng: 77.73050,
    whatsapp: "https://wa.me/919629861885"
  },
  {
    shopName: "EGG! ATM Tiruchencode",
    address: "Opp.to SBI Bank, Eat Street, Tiruchengodu, Namakkal - 637211",
    contact: ["+91 9629861885"],
    city: "Namakkal",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d244.45757476557984!2d77.89784307339248!3d11.384201239225344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDIzJzAyLjkiTiA3N8KwNTMnNTIuNCJF!5e0!3m2!1sen!2sin!4v1770310333038!5m2!1sen!2sin",
    mapLink: "https://maps.app.goo.gl/JSarb8FeBo8Pjwz36",
    lat: 11.65,
    lng: 78.16,
    whatsapp: "https://wa.me/919629861885"
  },
  {
    shopName: "EGG! ATM Paramathi Velur",
    address: " Near Abirami Theatre, Karur Main Road, Paramathi Velur, Namakkal - 638182",
    contact: ["+91 6374072276", "+91 8220229406"],
    city: "Namakkal",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d459.3982130981119!2d78.00433316889671!3d11.109030448179851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2sin!4v1770310503282!5m2!1sen!2sin",
    mapLink: "https://maps.app.goo.gl/SHRBLUAiyDiZDGPQ8",
    lat: 11.01667,
    lng: 77.0,
    whatsapp: "https://wa.me/916374072276"
  },
  {
    shopName: "EGG! ATM Pallipalayam",
    address: "Near SBI Bank,Opp.to Amma Super Market, Sankari Main Road, Pallipalayam, Erode - 638006",
    contact: ["+91 85537 08996", "+91 97429 99858"],
    city: "Erode",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3911.5536407893596!2d77.74516917505056!3d11.367277788819706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDIyJzAyLjIiTiA3N8KwNDQnNTEuOSJF!5e0!3m2!1sen!2sin!4v1770310741243!5m2!1sen!2sin",
    mapLink: "https://maps.app.goo.gl/aU5fhqK4iDbsvvBU9",
    lat: 13.08333,
    lng: 80.21667,
    whatsapp: "https://wa.me/918553708996"
  }
];

// Simple Google Maps embed - no lazy loading to avoid IntersectionObserver issues on mobile
const SimpleMap = ({ branch }) => {
  return (
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
  );
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

  if (numbers.length === 1) {
    return (
      <div className="single-contact">
        <FaPhoneAlt className="phone-icon" />
        <a 
          href={`tel:${numbers[0].replace(/\s+/g, '')}`} 
          className="contact-link primary-contact"
        >
          {numbers[0]}
        </a>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(numbers[0])}
          aria-label="Copy phone number"
        >
          <FaCopy />
        </button>
      </div>
    );
  }

  return (
    <div className="multiple-contacts">
      <p className="contacts-label">Available Contact Numbers:</p>
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
            aria-label={`Copy ${number}`}
          >
            <FaCopy />
          </button>
          <span className="contact-badge">
            {index === 0 ? 'Primary' : 'Secondary'}
          </span>
        </div>
      ))}
      <p className="contact-note">Click any number to call directly</p>
    </div>
  );
};

const BranchSection = ({ branch, index }) => {
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const isMobile = useIsMobile();

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
          <SimpleMap branch={branch} />
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

  const [isMobile, setIsMobile] = useState(false);
  const eggCount = isMobile ? 3 : 8; // Reduced for mobile

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    /* ===============================
       EGG BACKGROUND ANIMATION - LIGHTWEIGHT
    =============================== */
    if (!isMobile) {
      const eggs = gsap.utils.toArray(".egg");
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
    if (!isMobile) {
      gsap.to(".vision-enquiry a", {
        scale: 1.1,
        y: -5,
        boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.4,
      });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

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
        theme="dark"
      />

      {/* EGG BACKGROUND - Minimal on mobile */}
      <div className="egg-bg">
        {Array.from({ length: eggCount }).map((_, i) => (
          <span className="egg" key={i} />
        ))}
      </div>

      {/* BRANCH SECTIONS */}
      {branches.map((branch, index) => (
        <BranchSection
          key={index}
          branch={branch}
          index={index}
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
        .vision-root {
          background: #000;
          color: #fff;
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
          -webkit-tap-highlight-color: transparent;
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
            rgba(255,255,255,0.4),
            rgba(255,193,7,0.2),
            rgba(255,152,0,0.15)
          );
          border-radius: 50% 50% 45% 45%;
          filter: blur(6px);
          opacity: 0.2;
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
          background: linear-gradient(135deg, #fff 0%, #FFC107 50%, #FF9800 100%);
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
          color: #FFC107;
          font-size: 2rem;
        }

        .shop-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFC107;
          line-height: 1.3;
          margin: 0;
        }

        .address-card {
          background: rgba(255, 255, 255, 0.05);
          border-left: 3px solid #FFC107;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .address {
          color: #ccc;
          font-size: 1rem;
          line-height: 1.5;
          margin: 0;
        }

        /* CONTACT CARD STYLES */
        .contact-card {
          background: rgba(30, 30, 30, 0.8);
          padding: 15px;
          border-radius: 10px;
          border: 1px solid rgba(255, 193, 7, 0.1);
        }

        .single-contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          background: rgba(10, 108, 255, 0.1);
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }

        .multiple-contacts {
          margin-bottom: 20px;
        }

        .contacts-label {
          color: #aaa;
          font-size: 0.9rem;
          margin-bottom: 10px;
          font-weight: 500;
          text-align: center;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          text-align: center;
        }

        .phone-icon {
          color: #0a6cff;
          font-size: 1.2rem;
        }

        .contact-link {
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .primary-contact {
          font-size: 1.2rem;
        }

        .contact-link:hover {
          color: #0a6cff;
        }

        .contact-badge {
          background: rgba(255, 193, 7, 0.2);
          color: #FFC107;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .contact-note {
          color: #aaa;
          font-size: 0.85rem;
          margin-top: 10px;
          text-align: center;
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
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
        }

        .whatsapp-btn:hover {
          transform: translateY(-2px);
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
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          border: 2px solid rgba(255, 193, 7, 0.1);
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 250px;
          background: #1a1a1a;
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
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.9) 100%);
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
        }

        .map-action-btn.primary {
          background: #0a6cff;
          color: white;
        }

        .map-action-btn.primary:hover {
          background: #0052cc;
        }

        .map-action-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .map-action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
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
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        .wa {
          background: linear-gradient(135deg, #25d366, #1da851);
          color: #000;
        }

        .call {
          background: linear-gradient(135deg, #0a6cff, #0052cc);
          color: #fff;
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

          .single-contact,
          .contact-item {
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
          }

          .contacts-label {
            text-align: left;
          }

          .contact-note {
            text-align: left;
          }

          .copy-btn {
            margin-top: 0;
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