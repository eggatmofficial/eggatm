import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

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

const locations = [
  {
    city: "Chennai",
    address: "Anna Nagar, Chennai",
    mapEmbed: "https://www.google.com/maps?q=Anna+Nagar+Chennai&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Anna+Nagar+Chennai",
  },
  {
    city: "Coimbatore",
    address: "Gandhipuram, Coimbatore",
    mapEmbed:
      "https://www.google.com/maps?q=Gandhipuram+Coimbatore&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Gandhipuram+Coimbatore",
  },
  {
    city: "Bangalore",
    address: "Whitefield, Bangalore",
    mapEmbed:
      "https://www.google.com/maps?q=Whitefield+Bangalore&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Whitefield+Bangalore",
  },
];

const FranchiseBranches = () => {
  useSEO({
    title: "EGG! ATM Franchise Locations",
    description:
      "Explore EGG! ATM franchise locations in Chennai, Coimbatore and Bangalore.",
  });

  const sectionsRef = useRef([]);
  const isMobile = window.innerWidth < 900;
  const eggCount = isMobile ? 4 : 8;

  useEffect(() => {
    /* ===============================
       SCROLL ENGINE
    =============================== */
    let lenis;
    if (!isMobile) {
      lenis = new Lenis({ smooth: true, lerp: 0.08 });
      const raf = (t) => {
        lenis.raf(t);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    /* ===============================
       SECTION ANIMATIONS (ALL DEVICES)
    =============================== */
    sectionsRef.current.forEach((sec) => {
      gsap.fromTo(
        sec,
        { opacity: 0, y: isMobile ? 25 : 70 },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.6 : 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 90%",
          },
        }
      );
    });

    /* ===============================
       EGG BACKGROUND ANIMATION
    =============================== */
    gsap.utils.toArray(".egg").forEach((egg, i) => {
      gsap.fromTo(
        egg,
        {
          y: gsap.utils.random(40, 120),
          x: gsap.utils.random(-40, 40),
          scale: gsap.utils.random(0.9, 1.05),
          opacity: 0.12,
        },
        {
          y: gsap.utils.random(-120, -40),
          x: gsap.utils.random(-60, 60),
          scale: gsap.utils.random(1, 1.15),
          opacity: 0.25,
          duration: gsap.utils.random(14, 22),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.6,
        }
      );
    });

    /* ===============================
       FIXED ICON PULSE
    =============================== */
    gsap.to(".vision-enquiry a", {
      scale: 1.07,
      repeat: -1,
      yoyo: true,
      duration: 1.6,
      ease: "sine.inOut",
      stagger: 0.3,
    });

    return () => {
      lenis && lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, [isMobile]);

  return (
    <div className="vision-root">
      {/* EGG BACKGROUND */}
      <div className="egg-bg">
        {Array.from({ length: eggCount }).map((_, i) => (
          <span className="egg" key={i} />
        ))}
      </div>

      {/* BRANCH SECTIONS */}
      {locations.map((item, index) => (
        <section
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className={`vision-plane ${index % 2 !== 0 ? "reverse" : ""}`}
        >
          <div className="plane-content">
            <h1>{item.city}</h1>
            <p>{item.address}</p>
          </div>

          <a
            href={item.mapLink}
            target="_blank"
            rel="noreferrer"
            className="map-wrapper"
            aria-label={`Open ${item.city} location in Google Maps`}
          >
            <iframe src={item.mapEmbed} title={item.city} />
            <span className="map-overlay">Open in Google Maps</span>
          </a>
        </section>
      ))}

      {/* FIXED CONTACT ICONS */}
      <div className="vision-enquiry">
        <a
          href="https://wa.me/919629861885"
          target="_blank"
          rel="noreferrer"
          className="wa"
        >
          <FaWhatsapp />
        </a>
        <a href="tel:+911962986188" className="call">
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
        }

        /* ===============================
           EGG BACKGROUND
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
            rgba(255,255,255,0.35),
            rgba(255,193,7,0.18),
            rgba(255,152,0,0.12)
          );
          border-radius: 50% 50% 45% 45%;
          filter: blur(6px);
          opacity: 0.2;
        }

        .egg:nth-child(1) { top: 10%; left: 15%; }
        .egg:nth-child(2) { top: 30%; left: 75%; }
        .egg:nth-child(3) { top: 55%; left: 45%; }
        .egg:nth-child(4) { top: 70%; left: 85%; }
        .egg:nth-child(5) { top: 85%; left: 20%; }
        .egg:nth-child(6) { top: 40%; left: 90%; }
        .egg:nth-child(7) { top: 15%; left: 55%; }
        .egg:nth-child(8) { top: 60%; left: 10%; }

        /* ===============================
           SECTIONS
        =============================== */
        .vision-plane {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 8%;
          gap: 40px;
          position: relative;
          z-index: 2;
        }

        .vision-plane.reverse {
          flex-direction: row-reverse;
        }

        .plane-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
        }

        .plane-content p {
          color: #ccc;
          margin-top: 10px;
        }

        .map-wrapper {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
        }

        .map-wrapper iframe {
          width: 480px;
          height: 300px;
          border: none;
          pointer-events: none;
        }

        .map-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.35);
          color: #fff;
          font-weight: 600;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .map-wrapper:hover .map-overlay {
          opacity: 1;
        }

        /* ===============================
           FIXED ICONS
        =============================== */
        .vision-enquiry {
          position: fixed;
          right: 16px;
          bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 100;
        }

        .vision-enquiry a {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          box-shadow: 0 12px 28px rgba(0,0,0,0.45);
        }

        .wa {
          background: #25d366;
          color: #000;
        }

        .call {
          background: #0a6cff;
          color: #fff;
        }

        /* ===============================
           MOBILE
        =============================== */
        @media (max-width: 900px) {
          .egg {
            width: 90px;
            height: 120px;
            filter: blur(4px);
          }

          .vision-plane,
          .vision-plane.reverse {
            flex-direction: column;
            padding: 40px 16px;
            text-align: center;
          }

          .plane-content h1 {
            font-size: 2.1rem;
          }

          .map-wrapper iframe {
            width: 100%;
            height: 220px;
          }

          .map-overlay {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FranchiseBranches;
