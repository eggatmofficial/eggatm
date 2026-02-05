import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import logo from "../../assets/imges/popuplogo.png";

const WelcomePopup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const popupRef = useRef(null);
  const overlayRef = useRef(null);
  const eggRef = useRef(null);
  const glowRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [actionText, setActionText] = useState("Login to Continue");
  const [actionPath, setActionPath] = useState("/login");

  localStorage.clear()

  /* ===============================
     ONCE PER DAY LOGIC
  =============================== */
  useEffect(() => {
    const lastShown = localStorage.getItem("welcomePopupDate");
    const today = new Date().toDateString();

    if (lastShown !== today) {
      setShowPopup(true);
      localStorage.setItem("welcomePopupDate", today);
    }
  }, []);

  /* ===============================
     MESSAGE LOGIC
  =============================== */
useEffect(() => {
  const isNewUser = !localStorage.getItem("visitedBefore");
  const isFranchise = location.pathname.includes("franchise");

  // 🏢 FRANCHISE PAGE
  if (isFranchise) {
    setGreeting("Start Your Franchise Journey");
    setSubtitle("Partner with EGG! ATM and grow your business with us.");
    setActionText("Explore Franchise");
    setActionPath("/franchise");
    return;
  }

  // 🆕 NEW USER (NO LOGIN WORDING)
  if (isNewUser) {
    setGreeting("Welcome to EGG! ATM ");
    setSubtitle(
      "Discover fresh products and explore exciting franchise opportunities."
    );
    setActionText("Explore our Francise");
    setActionPath("/franchise");

    localStorage.setItem("visitedBefore", "true");
  }
  // 🔁 EXISTING USER
  else {
    setGreeting("Welcome Back 👋");
    setSubtitle("Login to continue your shopping experience.");
    setActionText("Login to Continue");
    setActionPath("/login");
  }
}, [location.pathname]);

  /* ===============================
     POPUP ANIMATION
  =============================== */
  useEffect(() => {
    if (!showPopup) return;

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    gsap.fromTo(
      popupRef.current,
      { y: 100, scale: 0.8, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }
    );

    // 🥚 Egg breathe animation
    const eggTl = gsap.timeline({ repeat: -1, yoyo: true });

    eggTl
      .to(eggRef.current, {
        scale: 1.05,
        rotate: 2,
        duration: 2,
        ease: "sine.inOut",
      })
      .to(eggRef.current, {
        scale: 1,
        rotate: -2,
        duration: 2,
        ease: "sine.inOut",
      });

    gsap.to(glowRef.current, {
      scale: 1.4,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      eggTl.kill();
    };
  }, [showPopup]);

  const closePopup = () => {
    gsap.to(popupRef.current, {
      y: 100,
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setShowPopup(false),
    });
  };

  if (!showPopup) return null;

  return (
    <div ref={overlayRef} className="welcome-overlay">
      <div ref={popupRef} className="welcome-popup">
        <button className="close-btn" onClick={closePopup}>✕</button>

        {/* 🥚 Animated Egg */}
        <div className="egg-wrapper" ref={eggRef}>
          <span ref={glowRef} className="egg-glow" />
          <img src={logo} alt="logo" className="welcome-logo" />
        </div>

        <h2>{greeting}</h2>
        <p>{subtitle}</p>

        <button className="action-btn" onClick={() => navigate(actionPath)}>
          {actionText}
        </button>
      </div>

      <style>{`
        .welcome-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.35);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .welcome-popup {
          width: 380px;
          padding: 30px 25px;
          border-radius: 22px;
          text-align: center;
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,.25);
          position: relative;
        }

        .egg-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .welcome-logo {
          width: 100px;
          z-index: 2;
          position: relative;
        }

        .egg-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle,
            rgba(255,183,3,0.55) 0%,
            rgba(255,183,3,0.2) 40%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(14px);
          z-index: 1;
        }

        h2 {
          font-size: 22px;
          margin-bottom: 8px;
          color: #111;
          font-weight: 700;
        }

        p {
          font-size: 14px;
          color: #444;
          margin-bottom: 22px;
          line-height: 1.5;
        }

        .action-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg,#ffb703,#fb8500);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(251,133,0,.45);
          transition: transform .2s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,.9);
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 6px 14px rgba(0,0,0,.15);
        }

        @media (max-width: 640px) {
          .welcome-overlay {
            align-items: flex-end;
          }

          .welcome-popup {
            width: 100%;
            border-radius: 24px 24px 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;
