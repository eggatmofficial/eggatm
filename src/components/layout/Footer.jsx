import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
  FaInfoCircle,
  FaUser,
  FaAddressCard,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";

const PRIMARY_COLOR = "#faa807";
const SECONDARY_COLOR = "#ffd13d";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #faa807 0%, #ffd13d 100%)";

const FALLBACK_CONFIG = {
  FACEBOOK_URL: "https://facebook.com/eggatm",
  INSTAGRAM_URL: "https://instagram.com/eggatm",
  YOUTUBE_URL: "https://youtube.com/c/eggatm",
  WHATSAPP_URL: "919876543210",
  COMPANY_ADDRESS: "123 Food Street, Chennai, Tamil Nadu 600001",
  SUPPORT_PHONE: "+91 98765 43210",
  SUPPORT_EMAIL: "support@eggatm.com",
};

const getEnvVariable = (key, fallback) => {
  const value = import.meta.env[key];
  return value || fallback;
};

const Footer = () => {
  const [visibleLinks, setVisibleLinks] = useState([]);

  const socialLinks = [
    { 
      icon: <FaFacebookF />, 
      name: "Facebook",
      link: getEnvVariable("VITE_FACEBOOK_URL", FALLBACK_CONFIG.FACEBOOK_URL)
    },
    { 
      icon: <FaInstagram />, 
      name: "Instagram",
      link: getEnvVariable("VITE_INSTAGRAM_URL", FALLBACK_CONFIG.INSTAGRAM_URL)
    },
    { 
      icon: <FaYoutube />, 
      name: "YouTube",
      link: getEnvVariable("VITE_YOUTUBE_URL", FALLBACK_CONFIG.YOUTUBE_URL)
    },
    { 
      icon: <FaWhatsapp />, 
      name: "WhatsApp",
      link: `https://wa.me/${getEnvVariable("VITE_WHATSAPP_PHONE", FALLBACK_CONFIG.WHATSAPP_PHONE)}`
    },
  ];

  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt />, 
      text: getEnvVariable("VITE_COMPANY_ADDRESS", FALLBACK_CONFIG.COMPANY_ADDRESS),
      link: null 
    },
    { 
      icon: <FaPhoneAlt />, 
      text: getEnvVariable("VITE_SUPPORT_PHONE", FALLBACK_CONFIG.SUPPORT_PHONE),
      link: `tel:${getEnvVariable("VITE_SUPPORT_PHONE", FALLBACK_CONFIG.SUPPORT_PHONE)}`
    },
    { 
      icon: <FaEnvelope />, 
      text: getEnvVariable("VITE_SUPPORT_EMAIL", FALLBACK_CONFIG.SUPPORT_EMAIL),
      link: `mailto:${getEnvVariable("VITE_SUPPORT_EMAIL", FALLBACK_CONFIG.SUPPORT_EMAIL)}`
    },
  ];

  const customerService = [
    { name: "Shipping Policy", icon: <FaTruck />, link: "/shipping-policy" },
    { name: "Contact Us", icon: <FaAddressCard />, link: "/contact" },
    { name: "FAQ", icon: <FaInfoCircle />, link: "/aboutus" },
  ];

  const quickLinks = [
    { name: "About Us", icon: <FaUser />, link: "/aboutus" },
    { name: "Terms of Service", icon: <FaFileContract />, link: "/terms-and-conditions" },
    { name: "Privacy Policy", icon: <FaShieldAlt />, link: "/privacy-policy" },
  ];

  // Initialize animation when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const animateLinks = async () => {
        for (let i = 0; i < quickLinks.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setVisibleLinks(prev => [...prev, i]);
        }
      };
      animateLinks();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Animation styles
  const animationStyles = `
    @keyframes slideInFromLeft {
      0% {
        opacity: 0;
        transform: translateX(-20px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .quick-link-animate {
      opacity: 0;
      animation: slideInFromLeft 0.5s ease-out forwards;
    }
    
    .social-icon {
      transition: all 0.3s ease;
    }
    
    .social-icon:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(250, 168, 7, 0.3);
    }
    
    .gradient-text {
      background: ${PRIMARY_GRADIENT};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .icon-pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-[#faa807] to-[#ffd13d] blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-[#ffd13d] to-[#faa807] blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Main Footer Content - 2 columns on mobile/tablet, 5 columns on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              
              {/* Brand Section - Full width on mobile, spans 2 columns on tablet, 2 columns on desktop */}
              <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#faa807] to-[#ffd13d] rounded-lg blur-sm opacity-75"></div>
                      <h2 className="relative text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        <span className="gradient-text">EGG!</span> ATM
                      </h2>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#faa807] to-[#ffd13d] animate-pulse"></div>
                  </div>
                  
                  <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
                    Premium quality food essentials. From farm to table, we bring tradition 
                    and taste together with the freshest ingredients delivered to your doorstep.
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold text-base sm:text-lg">Stay Connected</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="social-icon w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center border border-gray-700 hover:border-yellow-500/50"
                      >
                        <span className="text-white text-base sm:text-lg">
                          {social.icon}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Links - Shown in first column on mobile/tablet */}
              <div className="col-span-1 space-y-4">
                <h3 className="text-white font-semibold text-base sm:text-lg pb-3 border-b border-gray-700/50">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {quickLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.link}
                      className={`group flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300 ${
                        visibleLinks.includes(idx) ? 'quick-link-animate' : 'opacity-0'
                      }`}
                      style={{
                        animationDelay: `${idx * 0.3}s`,
                      }}
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#faa807]/20 group-hover:to-[#ffd13d]/20 transition-all duration-300">
                        <span className="text-gray-400 group-hover:text-yellow-500 transition-colors duration-300 icon-pulse text-sm sm:text-base">
                          {link.icon}
                        </span>
                      </div>
                      <span className="text-gray-400 group-hover:text-white text-xs sm:text-sm md:text-base transition-colors duration-300 flex-1 line-clamp-1">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Customer Service - Shown in second column on mobile/tablet */}
              <div className="col-span-1 space-y-4">
                <h3 className="text-white font-semibold text-base sm:text-lg pb-3 border-b border-gray-700/50">
                  Customer Service
                </h3>
                <div className="space-y-3">
                  {customerService.map((service, idx) => (
                    <Link
                      key={idx}
                      to={service.link}
                      className="group flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#faa807]/20 group-hover:to-[#ffd13d]/20 transition-all duration-300">
                        <span className="text-[#faa807] group-hover:text-[#ffd13d] transition-colors duration-300 text-sm sm:text-base">
                          {service.icon}
                        </span>
                      </div>
                      <span className="text-gray-400 group-hover:text-white text-xs sm:text-sm md:text-base transition-colors duration-300 line-clamp-1">
                        {service.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact Info - Full width on mobile, spans 2 columns on tablet, shown on desktop */}
              <div className="col-span-2 md:col-span-2 lg:col-span-1 space-y-4 mt-4 md:mt-0">
                <h3 className="text-white font-semibold text-base sm:text-lg pb-3 border-b border-gray-700/50">
                  Contact Info
                </h3>
                <div className="space-y-3">
                  {contactInfo.map((info, idx) => {
                    const content = info.link ? (
                      <a
                        href={info.link}
                        className="group flex items-start space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#faa807]/20 group-hover:to-[#ffd13d]/20 transition-all duration-300 flex-shrink-0">
                          <span className="text-[#faa807] group-hover:text-[#ffd13d] transition-colors duration-300 text-sm sm:text-base">
                            {info.icon}
                          </span>
                        </div>
                        <span className="text-gray-400 group-hover:text-white text-xs sm:text-sm transition-colors duration-300 break-words">
                          {info.text}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-start space-x-2 sm:space-x-3 p-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#faa807] text-sm sm:text-base">
                            {info.icon}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs sm:text-sm break-words">
                          {info.text}
                        </span>
                      </div>
                    );

                    return <div key={idx}>{content}</div>;
                  })}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="px-4 bg-gray-900 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#faa807] to-[#ffd13d]"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ffd13d] to-[#faa807]"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#faa807] to-[#ffd13d]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bottom - Responsive layout */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center">
              <div className="order-2 md:order-1">
                <p className="text-gray-500 text-xs sm:text-sm">
                  © {new Date().getFullYear()} <span className="font-semibold text-white">EGG! ATM</span>. All rights reserved.
                </p>
              </div>
              
              <div className="order-1 md:order-2">
                <div className="text-gray-600 text-xs sm:text-sm flex items-center">
                  <span className="mr-2">Made with</span>
                  <span className="text-red-500">❤️</span>
                  <span className="ml-2">in Tamil Nadu, India</span>
                </div>
              </div>
              
              <div className="order-3 md:order-3">
                <div className="text-gray-500 text-xs sm:text-sm flex items-center space-x-2">
                  <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[#faa807] to-[#ffd13d]"></div>
                  <span>100% Fresh & Natural</span>
                  <div className="w-1 h-1 rounded-full bg-gradient-to-r from-[#ffd13d] to-[#faa807]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient border */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#faa807] to-transparent opacity-50"></div>
      </footer>
    </>
  );
};

export default Footer;