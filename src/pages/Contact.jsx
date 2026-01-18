// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { 
//   FaPhone, 
//   FaMapMarkerAlt, 
//   FaClock, 
//   FaPaperPlane,
//   FaEnvelope,
//   FaUser,
//   FaComment,
//   FaWhatsapp,
//   FaInstagram,
//   FaFacebook,
//   FaTwitter
// } from 'react-icons/fa';
// import { 
//   IoLocationOutline,
//   IoCallOutline,
//   IoTimeOutline,
//   IoCheckmarkCircle,
//   IoMenu,
//   IoClose
// } from 'react-icons/io5';
// import api from '../api/axios';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [screenSize, setScreenSize] = useState('desktop');
//   const [showMobileMenu, setShowMobileMenu] = useState(false);

//   // Detect screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       if (width <= 425) {
//         setScreenSize('small-mobile');
//       } else if (width <= 768) {
//         setScreenSize('mobile');
//       } else if (width <= 1024) {
//         setScreenSize('tablet');
//       } else {
//         setScreenSize('desktop');
//       }
      
//       if (width >= 768) {
//         setShowMobileMenu(false);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const getResponsiveValue = (values) => {
//     return values[screenSize] || values.desktop;
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     if (formErrors[e.target.name]) {
//       setFormErrors({
//         ...formErrors,
//         [e.target.name]: ''
//       });
//     }
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = 'Email is invalid';
//     }
//     if (!formData.message.trim()) errors.message = 'Message is required';
//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = validateForm();
    
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     setIsSubmitting(true);
//     await api.post("/contact", formData);
    
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
//       setFormData({ name: '', email: '', phone: '', message: '' });
//       setFormErrors({});
      
//       setTimeout(() => setIsSubmitted(false), 5000);
//     }, 1500);
//   };

//   // Responsive animations
//   const fadeInUp = {
//     hidden: { 
//       opacity: 0, 
//       y: getResponsiveValue({
//         'small-mobile': 20,
//         'mobile': 25,
//         'tablet': 30,
//         'desktop': 30
//       }),
//       scale: 0.98
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1,
//       transition: { 
//         duration: 0.6,
//         ease: [0.22, 1, 0.36, 1]
//       }
//     }
//   };

//   const staggerContainer = {
//     visible: {
//       transition: {
//         staggerChildren: getResponsiveValue({
//           'small-mobile': 0.1,
//           'mobile': 0.12,
//           'tablet': 0.15,
//           'desktop': 0.2
//         })
//       }
//     }
//   };

//   const mobileMenuAnimation = {
//     hidden: { 
//       opacity: 0,
//       x: '-100%'
//     },
//     visible: { 
//       opacity: 1,
//       x: 0,
//       transition: { 
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     }
//   };

//   // Responsive values
//   const containerPadding = getResponsiveValue({
//     'small-mobile': '0 12px',
//     'mobile': '0 15px',
//     'tablet': '0 20px',
//     'desktop': '0 30px'
//   });

//   const headerFontSize = getResponsiveValue({
//     'small-mobile': '2rem',
//     'mobile': '2.2rem',
//     'tablet': '2.8rem',
//     'desktop': '3.5rem'
//   });

//   const sectionPadding = getResponsiveValue({
//     'small-mobile': '2rem 0',
//     'mobile': '2.5rem 0',
//     'tablet': '3rem 0',
//     'desktop': '4rem 0'
//   });

//   const cardPadding = getResponsiveValue({
//     'small-mobile': '1.25rem',
//     'mobile': '1.5rem',
//     'tablet': '2rem',
//     'desktop': '2.5rem'
//   });

//   const iconSize = getResponsiveValue({
//     'small-mobile': 35,
//     'mobile': 40,
//     'tablet': 45,
//     'desktop': 50
//   });

//   return (
//     <>
//       {/* Mobile Menu Overlay */}
//       {showMobileMenu && (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           variants={mobileMenuAnimation}
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: 'rgba(255, 255, 255, 0.98)',
//             zIndex: 1000,
//             padding: '20px',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}
//         >
//           <button
//             onClick={() => setShowMobileMenu(false)}
//             style={{
//               position: 'absolute',
//               top: '20px',
//               right: '20px',
//               background: 'none',
//               border: 'none',
//               fontSize: '1.5rem',
//               cursor: 'pointer',
//               color: '#FF6B35'
//             }}
//           >
//             <IoClose />
//           </button>
          
//           <div style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem',
//             alignItems: 'center'
//           }}>
//             <a href="#contact" style={{
//               fontSize: '1.3rem',
//               fontWeight: 600,
//               color: '#2D3047',
//               textDecoration: 'none'
//             }}>
//               Contact
//             </a>
//             <a href="#map" style={{
//               fontSize: '1.3rem',
//               fontWeight: 600,
//               color: '#2D3047',
//               textDecoration: 'none'
//             }}>
//               Location
//             </a>
//             <a href="#info" style={{
//               fontSize: '1.3rem',
//               fontWeight: 600,
//               color: '#2D3047',
//               textDecoration: 'none'
//             }}>
//               Info
//             </a>
//           </div>
//         </motion.div>
//       )}

//       {/* Sticky Header */}
//       <div style={{ 
//         height: getResponsiveValue({
//           'small-mobile': '50px',
//           'mobile': '55px',
//           'tablet': '60px',
//           'desktop': '70px'
//         }),
//         position: 'sticky',
//         top: 0,
//         background: 'white',
//         zIndex: 100,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: containerPadding
//       }}>
//         {(screenSize === 'small-mobile' || screenSize === 'mobile') && (
//           <button
//             onClick={() => setShowMobileMenu(true)}
//             style={{
//               background: 'none',
//               border: 'none',
//               fontSize: '1.25rem',
//               cursor: 'pointer',
//               color: '#FF6B35',
//               padding: '5px'
//             }}
//           >
//             <IoMenu />
//           </button>
//         )}
        
//         <h1 style={{ 
//           fontSize: getResponsiveValue({
//             'small-mobile': '1.3rem',
//             'mobile': '1.4rem',
//             'tablet': '1.6rem',
//             'desktop': '2rem'
//           }),
//           fontWeight: 700,
//           color: '#FF6B35',
//           margin: 0,
//           textAlign: 'center',
//           flex: 1
//         }}>
//           Egg! ATM Contact
//         </h1>
        
//         {/* Empty div for balance on mobile */}
//         {(screenSize === 'small-mobile' || screenSize === 'mobile') && <div style={{width: '40px'}} />}
//       </div>
      
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//         style={{
//           background: 'linear-gradient(135deg, #fffaf0 0%, #fff5e6 100%)',
//           minHeight: '100vh'
//         }}
//       >
//         <div style={{ 
//           maxWidth: '1400px', 
//           margin: '0 auto', 
//           padding: containerPadding,
//           position: 'relative'
//         }}>
//           {/* Header Section */}
//           <motion.div 
//             variants={fadeInUp}
//             style={{
//               textAlign: 'center',
//               padding: sectionPadding,
//               marginBottom: getResponsiveValue({
//                 'small-mobile': '1.5rem',
//                 'mobile': '2rem',
//                 'tablet': '2.5rem',
//                 'desktop': '3rem'
//               })
//             }}
//           >
//             <motion.div
//               animate={{
//                 y: [0, -8, 0],
//                 transition: {
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }
//               }}
//               style={{
//                 display: 'inline-block',
//                 marginBottom: '1rem'
//               }}
//             >
//               <FaPaperPlane size={getResponsiveValue({
//                 'small-mobile': 28,
//                 'mobile': 32,
//                 'tablet': 36,
//                 'desktop': 40
//               })} style={{ color: '#FF6B35' }} />
//             </motion.div>
            
//             <motion.h1 
//               style={{ 
//                 fontSize: headerFontSize,
//                 fontWeight: 800,
//                 marginBottom: '0.75rem',
//                 background: 'linear-gradient(45deg, #FF6B35, #FFA62E)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 lineHeight: 1.2,
//                 padding: getResponsiveValue({
//                   'small-mobile': '0 10px',
//                   'mobile': '0 15px',
//                   'tablet': '0',
//                   'desktop': '0'
//                 })
//               }}
//             >
//               Contact Us
//             </motion.h1>
            
//             <p style={{ 
//               fontSize: getResponsiveValue({
//                 'small-mobile': '0.9rem',
//                 'mobile': '1rem',
//                 'tablet': '1.1rem',
//                 'desktop': '1.25rem'
//               }),
//               color: '#666',
//               maxWidth: '600px',
//               margin: '0 auto',
//               padding: getResponsiveValue({
//                 'small-mobile': '0 5px',
//                 'mobile': '0 10px',
//                 'tablet': '0 20px',
//                 'desktop': '0'
//               }),
//               lineHeight: 1.5
//             }}>
//               Have questions? We're here to help! Reach out through any channel below.
//             </p>
//           </motion.div>

//           {/* Main Content Grid */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: getResponsiveValue({
//               'small-mobile': '1fr',
//               'mobile': '1fr',
//               'tablet': '1fr',
//               'desktop': '1fr 1fr'
//             }),
//             gap: getResponsiveValue({
//               'small-mobile': '1.5rem',
//               'mobile': '2rem',
//               'tablet': '2.5rem',
//               'desktop': '4rem'
//             }),
//             marginBottom: getResponsiveValue({
//               'small-mobile': '2rem',
//               'mobile': '2.5rem',
//               'tablet': '4rem',
//               'desktop': '6rem'
//             })
//           }}>
//             {/* Left Column - Contact Information */}
//             <motion.div
//               variants={fadeInUp}
//             >
//               <div style={{
//                 background: 'white',
//                 borderRadius: getResponsiveValue({
//                   'small-mobile': '12px',
//                   'mobile': '14px',
//                   'tablet': '16px',
//                   'desktop': '20px'
//                 }),
//                 padding: cardPadding,
//                 boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
//                 height: '100%'
//               }}>
//                 <h2 style={{ 
//                   fontSize: getResponsiveValue({
//                     'small-mobile': '1.4rem',
//                     'mobile': '1.5rem',
//                     'tablet': '1.75rem',
//                     'desktop': '2.25rem'
//                   }),
//                   fontWeight: 700,
//                   marginBottom: getResponsiveValue({
//                     'small-mobile': '1.25rem',
//                     'mobile': '1.5rem',
//                     'tablet': '1.75rem',
//                     'desktop': '2rem'
//                   }),
//                   color: '#2D3047'
//                 }}>
//                   Get in Touch
//                 </h2>

//                 {/* Contact Info Cards */}
//                 <div style={{ 
//                   display: 'flex', 
//                   flexDirection: 'column', 
//                   gap: getResponsiveValue({
//                     'small-mobile': '1rem',
//                     'mobile': '1.25rem',
//                     'tablet': '1.5rem',
//                     'desktop': '1.5rem'
//                   }) 
//                 }}>
//                   {/* Location Card */}
//                   <motion.div
//                     animate={{
//                       y: [0, -5, 0],
//                       transition: {
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                       }
//                     }}
//                     whileHover={{ scale: 1.01 }}
//                     style={{
//                       background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 166, 46, 0.05))',
//                       padding: getResponsiveValue({
//                         'small-mobile': '1rem',
//                         'mobile': '1.25rem',
//                         'tablet': '1.5rem',
//                         'desktop': '1.5rem'
//                       }),
//                       borderRadius: '10px',
//                       borderLeft: '4px solid #FF6B35'
//                     }}
//                   >
//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'flex-start', 
//                       gap: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '0.75rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <div style={{
//                         background: '#FF6B35',
//                         width: getResponsiveValue({
//                           'small-mobile': '40px',
//                           'mobile': '45px',
//                           'tablet': '50px',
//                           'desktop': '50px'
//                         }),
//                         height: getResponsiveValue({
//                           'small-mobile': '40px',
//                           'mobile': '45px',
//                           'tablet': '50px',
//                           'desktop': '50px'
//                         }),
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         flexShrink: 0
//                       }}>
//                         <FaMapMarkerAlt size={getResponsiveValue({
//                           'small-mobile': 16,
//                           'mobile': 18,
//                           'tablet': 20,
//                           'desktop': 20
//                         })} />
//                       </div>
//                       <div>
//                         <h3 style={{ 
//                           fontSize: getResponsiveValue({
//                             'small-mobile': '1rem',
//                             'mobile': '1.1rem',
//                             'tablet': '1.25rem',
//                             'desktop': '1.25rem'
//                           }), 
//                           fontWeight: 600, 
//                           marginBottom: '0.5rem', 
//                           color: '#2D3047' 
//                         }}>
//                           Our Location
//                         </h3>
//                         <p style={{ 
//                           color: '#666', 
//                           lineHeight: 1.5,
//                           fontSize: getResponsiveValue({
//                             'small-mobile': '0.85rem',
//                             'mobile': '0.9rem',
//                             'tablet': '1rem',
//                             'desktop': '1rem'
//                           })
//                         }}>
//                           Opp. Indian Oil Bunk, Kumaramangalam,<br />
//                           Tiruchengode, Namakkal – 637205
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Phone Card */}
//                   <motion.div
//                     animate={{
//                       y: [0, -5, 0],
//                       transition: {
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                         delay: 0.2
//                       }
//                     }}
//                     whileHover={{ scale: 1.01 }}
//                     style={{
//                       background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 166, 46, 0.05))',
//                       padding: getResponsiveValue({
//                         'small-mobile': '1rem',
//                         'mobile': '1.25rem',
//                         'tablet': '1.5rem',
//                         'desktop': '1.5rem'
//                       }),
//                       borderRadius: '10px',
//                       borderLeft: '4px solid #FFA62E'
//                     }}
//                   >
//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'flex-start', 
//                       gap: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '0.75rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <div style={{
//                         background: '#FFA62E',
//                         width: getResponsiveValue({
//                           'small-mobile': '40px',
//                           'mobile': '45px',
//                           'tablet': '50px',
//                           'desktop': '50px'
//                         }),
//                         height: getResponsiveValue({
//                           'small-mobile': '40px',
//                           'mobile': '45px',
//                           'tablet': '50px',
//                           'desktop': '50px'
//                         }),
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         flexShrink: 0
//                       }}>
//                         <FaPhone size={getResponsiveValue({
//                           'small-mobile': 16,
//                           'mobile': 18,
//                           'tablet': 20,
//                           'desktop': 20
//                         })} />
//                       </div>
//                       <div>
//                         <h3 style={{ 
//                           fontSize: getResponsiveValue({
//                             'small-mobile': '1rem',
//                             'mobile': '1.1rem',
//                             'tablet': '1.25rem',
//                             'desktop': '1.25rem'
//                           }), 
//                           fontWeight: 600, 
//                           marginBottom: '0.5rem', 
//                           color: '#2D3047' 
//                         }}>
//                           Call Us
//                         </h3>
//                         <p style={{ 
//                           color: '#666', 
//                           lineHeight: 1.5,
//                           fontSize: getResponsiveValue({
//                             'small-mobile': '0.9rem',
//                             'mobile': '1rem',
//                             'tablet': '1.2rem',
//                             'desktop': '1.2rem'
//                           }),
//                           fontWeight: 500 
//                         }}>
//                           +91 96298 61885
//                         </p>
//                         <div style={{ 
//                           display: 'flex', 
//                           flexDirection: getResponsiveValue({
//                             'small-mobile': 'column',
//                             'mobile': 'column',
//                             'tablet': 'row',
//                             'desktop': 'row'
//                           }),
//                           gap: getResponsiveValue({
//                             'small-mobile': '0.5rem',
//                             'mobile': '0.5rem',
//                             'tablet': '0.75rem',
//                             'desktop': '0.75rem'
//                           }), 
//                           marginTop: '0.5rem' 
//                         }}>
//                           <motion.a
//                             href="tel:+919629861885"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             style={{
//                               background: '#25D366',
//                               color: 'white',
//                               padding: getResponsiveValue({
//                                 'small-mobile': '0.4rem 0.8rem',
//                                 'mobile': '0.5rem 1rem',
//                                 'tablet': '0.5rem 1rem',
//                                 'desktop': '0.5rem 1rem'
//                               }),
//                               borderRadius: '50px',
//                               textDecoration: 'none',
//                               fontSize: getResponsiveValue({
//                                 'small-mobile': '0.8rem',
//                                 'mobile': '0.85rem',
//                                 'tablet': '0.9rem',
//                                 'desktop': '0.9rem'
//                               }),
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               gap: '5px',
//                               width: getResponsiveValue({
//                                 'small-mobile': '100%',
//                                 'mobile': '100%',
//                                 'tablet': 'auto',
//                                 'desktop': 'auto'
//                               })
//                             }}
//                           >
//                             <FaWhatsapp />
//                             WhatsApp
//                           </motion.a>
//                           <motion.a
//                             href="tel:+919629861885"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             style={{
//                               background: '#FF6B35',
//                               color: 'white',
//                               padding: getResponsiveValue({
//                                 'small-mobile': '0.4rem 0.8rem',
//                                 'mobile': '0.5rem 1rem',
//                                 'tablet': '0.5rem 1rem',
//                                 'desktop': '0.5rem 1rem'
//                               }),
//                               borderRadius: '50px',
//                               textDecoration: 'none',
//                               fontSize: getResponsiveValue({
//                                 'small-mobile': '0.8rem',
//                                 'mobile': '0.85rem',
//                                 'tablet': '0.9rem',
//                                 'desktop': '0.9rem'
//                               }),
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               gap: '5px',
//                               width: getResponsiveValue({
//                                 'small-mobile': '100%',
//                                 'mobile': '100%',
//                                 'tablet': 'auto',
//                                 'desktop': 'auto'
//                               })
//                             }}
//                           >
//                             <FaPhone size={getResponsiveValue({
//                               'small-mobile': 10,
//                               'mobile': 12,
//                               'tablet': 12,
//                               'desktop': 12
//                             })} />
//                             Call Now
//                           </motion.a>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Hours Card */}
//                   <motion.div
//                     animate={{
//                       y: [0, -5, 0],
//                       transition: {
//                         duration: 3,
//                         repeat: Infinity,
//                         ease: "easeInOut",
//                         delay: 0.4
//                       }
//                     }}
//                     whileHover={{ scale: 1.01 }}
//                     style={{
//                       background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 166, 46, 0.05))',
//                       padding: getResponsiveValue({
//                         'small-mobile': '1rem',
//                         'mobile': '1.25rem',
//                         'tablet': '1.5rem',
//                         'desktop': '1.5rem'
//                       }),
//                       borderRadius: '10px',
//                       borderLeft: '4px solid #1A936F'
//                     }}
//                   >
//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'flex-start', 
//                       gap: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '0.75rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <div style={{
//                         background: '#1A936F',
//                         width: getResponsiveValue({
//                           'small-mobile': '40px',
//                           'mobile': '45px',
//                           'tablet': '50px',
//                           'desktop': '50px'
//                         }),
//                         height: getResponsiveValue({
//                           'small-mobile': '40px',
//                           'mobile': '45px',
//                           'tablet': '50px',
//                           'desktop': '50px'
//                         }),
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         flexShrink: 0
//                       }}>
//                         <FaClock size={getResponsiveValue({
//                           'small-mobile': 16,
//                           'mobile': 18,
//                           'tablet': 20,
//                           'desktop': 20
//                         })} />
//                       </div>
//                       <div>
//                         <h3 style={{ 
//                           fontSize: getResponsiveValue({
//                             'small-mobile': '1rem',
//                             'mobile': '1.1rem',
//                             'tablet': '1.25rem',
//                             'desktop': '1.25rem'
//                           }), 
//                           fontWeight: 600, 
//                           marginBottom: '0.5rem', 
//                           color: '#2D3047' 
//                         }}>
//                           Opening Hours
//                         </h3>
//                         <div style={{ 
//                           color: '#666', 
//                           lineHeight: 1.5,
//                           fontSize: getResponsiveValue({
//                             'small-mobile': '0.85rem',
//                             'mobile': '0.9rem',
//                             'tablet': '1rem',
//                             'desktop': '1rem'
//                           })
//                         }}>
//                           <div><strong>Mon - Fri:</strong> 9am - 11pm</div>
//                           <div><strong>Sat - Sun:</strong> 10am - 1am</div>
//                           <div style={{ 
//                             fontSize: getResponsiveValue({
//                               'small-mobile': '0.8rem',
//                               'mobile': '0.85rem',
//                               'tablet': '0.85rem',
//                               'desktop': '0.85rem'
//                             }), 
//                             color: '#FF6B35', 
//                             marginTop: '0.5rem' 
//                           }}>
//                             🕒 Extended weekend hours!
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Social Media */}
//                   <div>
//                     <h3 style={{ 
//                       fontSize: getResponsiveValue({
//                         'small-mobile': '1rem',
//                         'mobile': '1.1rem',
//                         'tablet': '1.25rem',
//                         'desktop': '1.25rem'
//                       }), 
//                       fontWeight: 600, 
//                       marginBottom: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '0.75rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       }), 
//                       color: '#2D3047' 
//                     }}>
//                       Follow Us
//                     </h3>
//                     <div style={{ 
//                       display: 'flex', 
//                       gap: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '0.75rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       }),
//                       justifyContent: getResponsiveValue({
//                         'small-mobile': 'center',
//                         'mobile': 'center',
//                         'tablet': 'flex-start',
//                         'desktop': 'flex-start'
//                       })
//                     }}>
//                       {[
//                         { icon: <FaInstagram />, color: '#E4405F', href: '#' },
//                         { icon: <FaFacebook />, color: '#1877F2', href: '#' },
//                         { icon: <FaTwitter />, color: '#1DA1F2', href: '#' },
//                       ].map((social, index) => (
//                         <motion.a
//                           key={index}
//                           href={social.href}
//                           whileHover={{ scale: 1.2, rotate: 10 }}
//                           whileTap={{ scale: 0.95 }}
//                           style={{
//                             width: getResponsiveValue({
//                               'small-mobile': '38px',
//                               'mobile': '40px',
//                               'tablet': '45px',
//                               'desktop': '45px'
//                             }),
//                             height: getResponsiveValue({
//                               'small-mobile': '38px',
//                               'mobile': '40px',
//                               'tablet': '45px',
//                               'desktop': '45px'
//                             }),
//                             background: social.color,
//                             borderRadius: '50%',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: 'white',
//                             textDecoration: 'none',
//                             fontSize: getResponsiveValue({
//                               'small-mobile': '1rem',
//                               'mobile': '1rem',
//                               'tablet': '1.2rem',
//                               'desktop': '1.2rem'
//                             })
//                           }}
//                         >
//                           {social.icon}
//                         </motion.a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Column - Contact Form */}
//             <motion.div
//               variants={fadeInUp}
//             >
//               <div style={{
//                 background: 'white',
//                 borderRadius: getResponsiveValue({
//                   'small-mobile': '12px',
//                   'mobile': '14px',
//                   'tablet': '16px',
//                   'desktop': '20px'
//                 }),
//                 padding: cardPadding,
//                 boxShadow: '0 8px 25px rgba(0,0,0,0.06)'
//               }}>
//                 <h2 style={{ 
//                   fontSize: getResponsiveValue({
//                     'small-mobile': '1.4rem',
//                     'mobile': '1.5rem',
//                     'tablet': '1.75rem',
//                     'desktop': '2.25rem'
//                   }),
//                   fontWeight: 700,
//                   marginBottom: getResponsiveValue({
//                     'small-mobile': '1.25rem',
//                     'mobile': '1.5rem',
//                     'tablet': '1.75rem',
//                     'desktop': '2rem'
//                   }),
//                   color: '#2D3047'
//                 }}>
//                   Send Message
//                 </h2>

//                 {isSubmitted && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     style={{
//                       background: 'linear-gradient(135deg, #1A936F, #2EC4B6)',
//                       color: 'white',
//                       padding: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '1rem',
//                         'tablet': '1.25rem',
//                         'desktop': '1.5rem'
//                       }),
//                       borderRadius: '10px',
//                       marginBottom: getResponsiveValue({
//                         'small-mobile': '1.25rem',
//                         'mobile': '1.5rem',
//                         'tablet': '1.75rem',
//                         'desktop': '2rem'
//                       }),
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: getResponsiveValue({
//                         'small-mobile': '0.75rem',
//                         'mobile': '0.75rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}
//                   >
//                     <IoCheckmarkCircle size={getResponsiveValue({
//                       'small-mobile': 22,
//                       'mobile': 24,
//                       'tablet': 28,
//                       'desktop': 30
//                     })} />
//                     <div>
//                       <div style={{ 
//                         fontWeight: 600, 
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.95rem',
//                           'mobile': '1rem',
//                           'tablet': '1.1rem',
//                           'desktop': '1.1rem'
//                         }) 
//                       }}>
//                         Message Sent!
//                       </div>
//                       <div style={{ 
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.8rem',
//                           'mobile': '0.85rem',
//                           'tablet': '0.9rem',
//                           'desktop': '0.9rem'
//                         }), 
//                         opacity: 0.9 
//                       }}>
//                         We'll respond within 24 hours.
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   {/* Name Field */}
//                   <div style={{ marginBottom: getResponsiveValue({
//                     'small-mobile': '1rem',
//                     'mobile': '1.25rem',
//                     'tablet': '1.5rem',
//                     'desktop': '1.5rem'
//                   }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({
//                         'small-mobile': '0.9rem',
//                         'mobile': '0.95rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <FaUser style={{ marginRight: '8px', color: '#FF6B35' }} />
//                       Your Name
//                     </label>
//                     <motion.input
//                       whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       style={{
//                         width: '100%',
//                         padding: getResponsiveValue({
//                           'small-mobile': '0.75rem',
//                           'mobile': '0.875rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         border: `2px solid ${formErrors.name ? '#E63946' : '#e0e0e0'}`,
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.9rem',
//                           'mobile': '0.95rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease'
//                       }}
//                       placeholder="Enter your name"
//                     />
//                     {formErrors.name && (
//                       <div style={{ 
//                         color: '#E63946', 
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.8rem',
//                           'mobile': '0.85rem',
//                           'tablet': '0.85rem',
//                           'desktop': '0.85rem'
//                         }), 
//                         marginTop: '0.5rem' 
//                       }}>
//                         {formErrors.name}
//                       </div>
//                     )}
//                   </div>

//                   {/* Email Field */}
//                   <div style={{ marginBottom: getResponsiveValue({
//                     'small-mobile': '1rem',
//                     'mobile': '1.25rem',
//                     'tablet': '1.5rem',
//                     'desktop': '1.5rem'
//                   }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({
//                         'small-mobile': '0.9rem',
//                         'mobile': '0.95rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <FaEnvelope style={{ marginRight: '8px', color: '#FF6B35' }} />
//                       Email Address
//                     </label>
//                     <motion.input
//                       whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       style={{
//                         width: '100%',
//                         padding: getResponsiveValue({
//                           'small-mobile': '0.75rem',
//                           'mobile': '0.875rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         border: `2px solid ${formErrors.email ? '#E63946' : '#e0e0e0'}`,
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.9rem',
//                           'mobile': '0.95rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease'
//                       }}
//                       placeholder="your@email.com"
//                     />
//                     {formErrors.email && (
//                       <div style={{ 
//                         color: '#E63946', 
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.8rem',
//                           'mobile': '0.85rem',
//                           'tablet': '0.85rem',
//                           'desktop': '0.85rem'
//                         }), 
//                         marginTop: '0.5rem' 
//                       }}>
//                         {formErrors.email}
//                       </div>
//                     )}
//                   </div>

//                   {/* Phone Field */}
//                   <div style={{ marginBottom: getResponsiveValue({
//                     'small-mobile': '1rem',
//                     'mobile': '1.25rem',
//                     'tablet': '1.5rem',
//                     'desktop': '1.5rem'
//                   }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({
//                         'small-mobile': '0.9rem',
//                         'mobile': '0.95rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <IoCallOutline style={{ marginRight: '8px', color: '#FF6B35' }} />
//                       Phone Number (Optional)
//                     </label>
//                     <motion.input
//                       whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       style={{
//                         width: '100%',
//                         padding: getResponsiveValue({
//                           'small-mobile': '0.75rem',
//                           'mobile': '0.875rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         border: '2px solid #e0e0e0',
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.9rem',
//                           'mobile': '0.95rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease'
//                       }}
//                       placeholder="+91 9876543210"
//                     />
//                   </div>

//                   {/* Message Field */}
//                   <div style={{ marginBottom: getResponsiveValue({
//                     'small-mobile': '1.5rem',
//                     'mobile': '1.5rem',
//                     'tablet': '2rem',
//                     'desktop': '2rem'
//                   }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({
//                         'small-mobile': '0.9rem',
//                         'mobile': '0.95rem',
//                         'tablet': '1rem',
//                         'desktop': '1rem'
//                       })
//                     }}>
//                       <FaComment style={{ marginRight: '8px', color: '#FF6B35' }} />
//                       Your Message
//                     </label>
//                     <motion.textarea
//                       whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={getResponsiveValue({
//                         'small-mobile': 4,
//                         'mobile': 4,
//                         'tablet': 5,
//                         'desktop': 6
//                       })}
//                       style={{
//                         width: '100%',
//                         padding: getResponsiveValue({
//                           'small-mobile': '0.75rem',
//                           'mobile': '0.875rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         border: `2px solid ${formErrors.message ? '#E63946' : '#e0e0e0'}`,
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.9rem',
//                           'mobile': '0.95rem',
//                           'tablet': '1rem',
//                           'desktop': '1rem'
//                         }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease',
//                         resize: 'vertical',
//                         fontFamily: 'inherit'
//                       }}
//                       placeholder="Tell us how we can help you..."
//                     />
//                     {formErrors.message && (
//                       <div style={{ 
//                         color: '#E63946', 
//                         fontSize: getResponsiveValue({
//                           'small-mobile': '0.8rem',
//                           'mobile': '0.85rem',
//                           'tablet': '0.85rem',
//                           'desktop': '0.85rem'
//                         }), 
//                         marginTop: '0.5rem' 
//                       }}>
//                         {formErrors.message}
//                       </div>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     style={{
//                       background: isSubmitting 
//                         ? '#ccc' 
//                         : 'linear-gradient(45deg, #FF6B35, #FFA62E)',
//                       color: 'white',
//                       border: 'none',
//                       padding: getResponsiveValue({
//                         'small-mobile': '0.875rem 1.5rem',
//                         'mobile': '1rem 2rem',
//                         'tablet': '1.1rem 2.25rem',
//                         'desktop': '1.2rem 2.5rem'
//                       }),
//                       borderRadius: '50px',
//                       fontSize: getResponsiveValue({
//                         'small-mobile': '0.95rem',
//                         'mobile': '1rem',
//                         'tablet': '1.05rem',
//                         'desktop': '1.1rem'
//                       }),
//                       fontWeight: 600,
//                       cursor: isSubmitting ? 'not-allowed' : 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '10px',
//                       margin: '0 auto',
//                       width: getResponsiveValue({
//                         'small-mobile': '100%',
//                         'mobile': '100%',
//                         'tablet': 'auto',
//                         'desktop': 'auto'
//                       }),
//                       minWidth: getResponsiveValue({
//                         'small-mobile': '100%',
//                         'mobile': '100%',
//                         'tablet': '200px',
//                         'desktop': '200px'
//                       })
//                     }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                         >
//                           ⏳
//                         </motion.div>
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <FaPaperPlane />
//                         Send Message
//                       </>
//                     )}
//                   </motion.button>
//                 </form>
//               </div>
//             </motion.div>
//           </div>

//           {/* Map Section */}
//           <motion.div
//             variants={fadeInUp}
//             id="map"
//             style={{
//               background: 'white',
//               borderRadius: getResponsiveValue({
//                 'small-mobile': '12px',
//                 'mobile': '14px',
//                 'tablet': '16px',
//                 'desktop': '20px'
//               }),
//               overflow: 'hidden',
//               boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
//               marginBottom: getResponsiveValue({
//                 'small-mobile': '2rem',
//                 'mobile': '2.5rem',
//                 'tablet': '3.5rem',
//                 'desktop': '4rem'
//               })
//             }}
//           >
//             <div style={{
//               padding: getResponsiveValue({
//                 'small-mobile': '1.25rem',
//                 'mobile': '1.5rem',
//                 'tablet': '1.75rem 2rem',
//                 'desktop': '2rem 2.5rem'
//               }),
//               borderBottom: '2px solid #f0f0f0'
//             }}>
//               <h2 style={{ 
//                 fontSize: getResponsiveValue({
//                   'small-mobile': '1.3rem',
//                   'mobile': '1.4rem',
//                   'tablet': '1.6rem',
//                   'desktop': '2rem'
//                 }),
//                 fontWeight: 700,
//                 color: '#2D3047',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem',
//                 flexWrap: 'wrap'
//               }}>
//                 <IoLocationOutline color="#FF6B35" />
//                 Find Us on Map
//               </h2>
//               <p style={{ 
//                 color: '#666', 
//                 marginTop: '0.5rem',
//                 fontSize: getResponsiveValue({
//                   'small-mobile': '0.85rem',
//                   'mobile': '0.9rem',
//                   'tablet': '1rem',
//                   'desktop': '1rem'
//                 })
//               }}>
//                 Visit our flagship location in Tiruchengode
//               </p>
//             </div>
            
//             <div style={{
//               position: 'relative',
//               width: '100%',
//               height: getResponsiveValue({
//                 'small-mobile': '250px',
//                 'mobile': '280px',
//                 'tablet': '350px',
//                 'desktop': '400px'
//               }),
//               overflow: 'hidden'
//             }}>
//               <iframe 
//                 src="https://maps.google.com/maps?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205&output=embed" 
//                 allowFullScreen
//                 loading="lazy"
//                 title="Egg ATM Location"
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   border: 'none'
//                 }}
//               />
              
//               {/* Map Overlay Card */}
//               <motion.div
//                 animate={{
//                   y: [0, -5, 0],
//                   transition: {
//                     duration: 3,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }
//                 }}
//                 style={{
//                   position: 'absolute',
//                   bottom: getResponsiveValue({
//                     'small-mobile': '10px',
//                     'mobile': '10px',
//                     'tablet': '15px',
//                     'desktop': '20px'
//                   }),
//                   left: getResponsiveValue({
//                     'small-mobile': '10px',
//                     'mobile': '10px',
//                     'tablet': '15px',
//                     'desktop': '20px'
//                   }),
//                   right: getResponsiveValue({
//                     'small-mobile': '10px',
//                     'mobile': '10px',
//                     'tablet': 'auto',
//                     'desktop': 'auto'
//                   }),
//                   background: 'rgba(255, 255, 255, 0.95)',
//                   backdropFilter: 'blur(10px)',
//                   padding: getResponsiveValue({
//                     'small-mobile': '0.75rem',
//                     'mobile': '1rem',
//                     'tablet': '1.25rem',
//                     'desktop': '1.5rem'
//                   }),
//                   borderRadius: '10px',
//                   boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
//                   maxWidth: getResponsiveValue({
//                     'small-mobile': '100%',
//                     'mobile': '100%',
//                     'tablet': '280px',
//                     'desktop': '300px'
//                   })
//                 }}
//               >
//                 <h3 style={{ 
//                   fontSize: getResponsiveValue({
//                     'small-mobile': '0.95rem',
//                     'mobile': '1rem',
//                     'tablet': '1.05rem',
//                     'desktop': '1.1rem'
//                   }),
//                   fontWeight: 600,
//                   marginBottom: '0.5rem',
//                   color: '#2D3047'
//                 }}>
//                   Egg! ATM Flagship Store
//                 </h3>
//                 <p style={{ 
//                   fontSize: getResponsiveValue({
//                     'small-mobile': '0.8rem',
//                     'mobile': '0.85rem',
//                     'tablet': '0.9rem',
//                     'desktop': '0.9rem'
//                   }),
//                   color: '#666',
//                   lineHeight: 1.4
//                 }}>
//                   Opp. Indian Oil Bunk, Kumaramangalam,<br />
//                   Tiruchengode, Namakkal – 637205
//                 </p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   style={{
//                     background: '#FF6B35',
//                     color: 'white',
//                     border: 'none',
//                     padding: getResponsiveValue({
//                       'small-mobile': '0.35rem 0.75rem',
//                       'mobile': '0.4rem 1rem',
//                       'tablet': '0.5rem 1.25rem',
//                       'desktop': '0.5rem 1.5rem'
//                     }),
//                     borderRadius: '50px',
//                     fontSize: getResponsiveValue({
//                       'small-mobile': '0.8rem',
//                       'mobile': '0.85rem',
//                       'tablet': '0.9rem',
//                       'desktop': '0.9rem'
//                     }),
//                     fontWeight: 500,
//                     cursor: 'pointer',
//                     marginTop: '0.75rem',
//                     width: getResponsiveValue({
//                       'small-mobile': '100%',
//                       'mobile': '100%',
//                       'tablet': 'auto',
//                       'desktop': 'auto'
//                     })
//                   }}
//                   onClick={() => window.open('https://maps.google.com/?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205', '_blank')}
//                 >
//                   Get Directions
//                 </motion.button>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Quick Info Section */}
//           <motion.div
//             variants={fadeInUp}
//             id="info"
//             style={{
//               textAlign: 'center',
//               marginBottom: getResponsiveValue({
//                 'small-mobile': '2rem',
//                 'mobile': '2.5rem',
//                 'tablet': '3rem',
//                 'desktop': '4rem'
//               })
//             }}
//           >
//             <h2 style={{ 
//               fontSize: getResponsiveValue({
//                 'small-mobile': '1.4rem',
//                 'mobile': '1.5rem',
//                 'tablet': '1.75rem',
//                 'desktop': '2.25rem'
//               }),
//               fontWeight: 700,
//               marginBottom: getResponsiveValue({
//                 'small-mobile': '1.25rem',
//                 'mobile': '1.5rem',
//                 'tablet': '2rem',
//                 'desktop': '2.5rem'
//               }),
//               color: '#2D3047'
//             }}>
//               Quick Information
//             </h2>
            
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: getResponsiveValue({
//                 'small-mobile': '1fr',
//                 'mobile': '1fr 1fr',
//                 'tablet': 'repeat(2, 1fr)',
//                 'desktop': 'repeat(4, 1fr)'
//               }),
//               gap: getResponsiveValue({
//                 'small-mobile': '0.75rem',
//                 'mobile': '1rem',
//                 'tablet': '1.25rem',
//                 'desktop': '1.5rem'
//               })
//             }}>
//               {[
//                 {
//                   icon: '🚚',
//                   title: 'Delivery',
//                   desc: 'Available within 5km radius'
//                 },
//                 {
//                   icon: '💰',
//                   title: 'Payment',
//                   desc: 'Cash, UPI & Cards accepted'
//                 },
//                 {
//                   icon: '🎉',
//                   title: 'Catering',
//                   desc: 'Special events & bulk orders'
//                 },
//                 {
//                   icon: '⭐',
//                   title: 'Rating',
//                   desc: '4.8/5 based on 500+ reviews'
//                 }
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ y: -5 }}
//                   whileTap={{ scale: 0.98 }}
//                   style={{
//                     background: 'white',
//                     padding: getResponsiveValue({
//                       'small-mobile': '1.25rem',
//                       'mobile': '1.5rem',
//                       'tablet': '1.75rem',
//                       'desktop': '2rem'
//                     }),
//                     borderRadius: '10px',
//                     boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
//                   }}
//                 >
//                   <div style={{ 
//                     fontSize: getResponsiveValue({
//                       'small-mobile': '2rem',
//                       'mobile': '2.2rem',
//                       'tablet': '2.5rem',
//                       'desktop': '2.5rem'
//                     }),
//                     marginBottom: getResponsiveValue({
//                       'small-mobile': '0.5rem',
//                       'mobile': '0.75rem',
//                       'tablet': '1rem',
//                       'desktop': '1rem'
//                     })
//                   }}>
//                     {item.icon}
//                   </div>
//                   <h3 style={{ 
//                     fontSize: getResponsiveValue({
//                       'small-mobile': '1rem',
//                       'mobile': '1.1rem',
//                       'tablet': '1.25rem',
//                       'desktop': '1.25rem'
//                     }),
//                     fontWeight: 600,
//                     marginBottom: '0.5rem',
//                     color: '#2D3047'
//                   }}>
//                     {item.title}
//                   </h3>
//                   <p style={{ 
//                     color: '#666',
//                     fontSize: getResponsiveValue({
//                       'small-mobile': '0.85rem',
//                       'mobile': '0.9rem',
//                       'tablet': '1rem',
//                       'desktop': '1rem'
//                     })
//                   }}>
//                     {item.desc}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default Contact;






import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPaperPlane,
  FaEnvelope,
  FaUser,
  FaComment,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaTelegram
} from 'react-icons/fa';
import { 
  IoLocationOutline,
  IoCallOutline,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoMenu,
  IoClose
} from 'react-icons/io5';
import api from '../api/axios';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [screenSize, setScreenSize] = useState('desktop');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Environment variables for social media URLs
  const SOCIAL_MEDIA = {
    facebook: import.meta.env.VITE_FACEBOOK_URL || '#',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || '#',
    twitter: import.meta.env.VITE_TWITTER_URL || '#',
    youtube: import.meta.env.VITE_YOUTUBE_URL || '#',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || '#',
    tiktok: import.meta.env.VITE_TIKTOK_URL || '#',
    whatsapp: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/919629861885',
    telegram: import.meta.env.VITE_TELEGRAM_URL || '#'
  };

  // Social media configuration
  const socialMediaLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      color: '#1877F2',
      url: SOCIAL_MEDIA.facebook
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      color: '#E4405F',
      url: SOCIAL_MEDIA.instagram
    },
    // {
    //   name: 'Twitter',
    //   icon: <FaTwitter />,
    //   color: '#1DA1F2',
    //   url: SOCIAL_MEDIA.twitter
    // },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      color: '#FF0000',
      url: SOCIAL_MEDIA.youtube
    },
    // {
    //   name: 'LinkedIn',
    //   icon: <FaLinkedin />,
    //   color: '#0A66C2',
    //   url: SOCIAL_MEDIA.linkedin
    // },
    // {
    //   name: 'TikTok',
    //   icon: <FaTiktok />,
    //   color: '#000000',
    //   url: SOCIAL_MEDIA.tiktok
    // },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      color: '#25D366',
      url: SOCIAL_MEDIA.whatsapp
    },
    // {
    //   name: 'Telegram',
    //   icon: <FaTelegram />,
    //   color: '#0088cc',
    //   url: SOCIAL_MEDIA.telegram
    // }
  ];

  // Filter active social media (only show those with URLs that aren't '#')
  const activeSocialMedia = socialMediaLinks.filter(social => 
    social.url && social.url !== '#'
  );

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 425) {
        setScreenSize('small-mobile');
      } else if (width <= 768) {
        setScreenSize('mobile');
      } else if (width <= 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
      
      if (width >= 768) {
        setShowMobileMenu(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const getResponsiveValue = (values) => {
    return values[screenSize] || values.desktop;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/contact", formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormErrors({});
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive animations
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: getResponsiveValue({
        'small-mobile': 20,
        'mobile': 25,
        'tablet': 30,
        'desktop': 30
      }),
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: getResponsiveValue({
          'small-mobile': 0.1,
          'mobile': 0.12,
          'tablet': 0.15,
          'desktop': 0.2
        })
      }
    }
  };


  // Responsive values
  const containerPadding = getResponsiveValue({
    'small-mobile': '0 12px',
    'mobile': '0 15px',
    'tablet': '0 20px',
    'desktop': '0 30px'
  });

  const headerFontSize = getResponsiveValue({
    'small-mobile': '2rem',
    'mobile': '2.2rem',
    'tablet': '2.8rem',
    'desktop': '3.5rem'
  });

  const sectionPadding = getResponsiveValue({
    'small-mobile': '2rem 0',
    'mobile': '2.5rem 0',
    'tablet': '3rem 0',
    'desktop': '4rem 0'
  });

  const cardPadding = getResponsiveValue({
    'small-mobile': '1.25rem',
    'mobile': '1.5rem',
    'tablet': '2rem',
    'desktop': '2.5rem'
  });

  return (
    <>

      {/* Sticky Header */}
      <div style={{ 
        height: getResponsiveValue({
          'small-mobile': '50px',
          'mobile': '55px',
          'tablet': '60px',
          'desktop': '70px'
        }),
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: containerPadding
      }}>
        <h1 style={{ 
          fontSize: getResponsiveValue({
            'small-mobile': '1.3rem',
            'mobile': '1.5rem',
            'tablet': '1.8rem',
            'desktop': '3rem'
          }),
          fontWeight: 700,
          color: '#FF6B35',
          margin: 0,
          textAlign: 'center',
          flex: 1
        }}>
          EGG! ATM 
        </h1>
        
        {/* Empty div for balance on mobile */}
        {(screenSize === 'small-mobile' || screenSize === 'mobile') && <div style={{width: '40px'}} />}
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{
          background: 'linear-gradient(135deg, #fffaf0 0%, #fff5e6 100%)',
          minHeight: '100vh'
        }}
      >
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: containerPadding,
          position: 'relative'
        }}>
          {/* Header Section */}
          <motion.div 
            variants={fadeInUp}
            style={{
              textAlign: 'center',
              padding: sectionPadding,
              marginBottom: getResponsiveValue({
                'small-mobile': '1.5rem',
                'mobile': '2rem',
                'tablet': '2.5rem',
                'desktop': '3rem'
              })
            }}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              <FaPaperPlane size={getResponsiveValue({
                'small-mobile': 28,
                'mobile': 32,
                'tablet': 36,
                'desktop': 40
              })} style={{ color: '#FF6B35' }} />
            </motion.div>
            
            <motion.h1 
              style={{ 
                fontSize: headerFontSize,
                fontWeight: 800,
                marginBottom: '0.75rem',
                background: 'linear-gradient(45deg, #FF6B35, #FFA62E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2,
                padding: getResponsiveValue({
                  'small-mobile': '0 10px',
                  'mobile': '0 15px',
                  'tablet': '0',
                  'desktop': '0'
                })
              }}
            >
              Contact Us
            </motion.h1>
            
            <p style={{ 
              fontSize: getResponsiveValue({
                'small-mobile': '0.9rem',
                'mobile': '1rem',
                'tablet': '1.1rem',
                'desktop': '1.25rem'
              }),
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              padding: getResponsiveValue({
                'small-mobile': '0 5px',
                'mobile': '0 10px',
                'tablet': '0 20px',
                'desktop': '0'
              }),
              lineHeight: 1.5
            }}>
              Have questions? We're here to help! Reach out through any channel below.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue({
              'small-mobile': '1fr',
              'mobile': '1fr',
              'tablet': '1fr',
              'desktop': '1fr 1fr'
            }),
            gap: getResponsiveValue({
              'small-mobile': '1.5rem',
              'mobile': '2rem',
              'tablet': '2.5rem',
              'desktop': '4rem'
            }),
            marginBottom: getResponsiveValue({
              'small-mobile': '2rem',
              'mobile': '2.5rem',
              'tablet': '4rem',
              'desktop': '6rem'
            })
          }}>
            {/* Left Column - Contact Information */}
            <motion.div
              variants={fadeInUp}
            >
              <div style={{
                background: 'white',
                borderRadius: getResponsiveValue({
                  'small-mobile': '12px',
                  'mobile': '14px',
                  'tablet': '16px',
                  'desktop': '20px'
                }),
                padding: cardPadding,
                boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                height: '100%'
              }}>
                <h2 style={{ 
                  fontSize: getResponsiveValue({
                    'small-mobile': '1.4rem',
                    'mobile': '1.5rem',
                    'tablet': '1.75rem',
                    'desktop': '2.25rem'
                  }),
                  fontWeight: 700,
                  marginBottom: getResponsiveValue({
                    'small-mobile': '1.25rem',
                    'mobile': '1.5rem',
                    'tablet': '1.75rem',
                    'desktop': '2rem'
                  }),
                  color: '#2D3047'
                }}>
                  Get in Touch
                </h2>

                {/* Contact Info Cards */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: getResponsiveValue({
                    'small-mobile': '1rem',
                    'mobile': '1.25rem',
                    'tablet': '1.5rem',
                    'desktop': '1.5rem'
                  }) 
                }}>
                  {/* Location Card */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 166, 46, 0.05))',
                      padding: getResponsiveValue({
                        'small-mobile': '1rem',
                        'mobile': '1.25rem',
                        'tablet': '1.5rem',
                        'desktop': '1.5rem'
                      }),
                      borderRadius: '10px',
                      borderLeft: '4px solid #FF6B35'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '0.75rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <div style={{
                        background: '#FF6B35',
                        width: getResponsiveValue({
                          'small-mobile': '40px',
                          'mobile': '45px',
                          'tablet': '50px',
                          'desktop': '50px'
                        }),
                        height: getResponsiveValue({
                          'small-mobile': '40px',
                          'mobile': '45px',
                          'tablet': '50px',
                          'desktop': '50px'
                        }),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <FaMapMarkerAlt size={getResponsiveValue({
                          'small-mobile': 16,
                          'mobile': 18,
                          'tablet': 20,
                          'desktop': 20
                        })} />
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: getResponsiveValue({
                            'small-mobile': '1rem',
                            'mobile': '1.1rem',
                            'tablet': '1.25rem',
                            'desktop': '1.25rem'
                          }), 
                          fontWeight: 600, 
                          marginBottom: '0.5rem', 
                          color: '#2D3047' 
                        }}>
                          Our Location
                        </h3>
                        <p style={{ 
                          color: '#666', 
                          lineHeight: 1.5,
                          fontSize: getResponsiveValue({
                            'small-mobile': '0.85rem',
                            'mobile': '0.9rem',
                            'tablet': '1rem',
                            'desktop': '1rem'
                          })
                        }}>
                          Opp. Indian Oil Bunk, Kumaramangalam,<br />
                          Tiruchengode, Namakkal – 637205
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phone Card */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                      }
                    }}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 166, 46, 0.05))',
                      padding: getResponsiveValue({
                        'small-mobile': '1rem',
                        'mobile': '1.25rem',
                        'tablet': '1.5rem',
                        'desktop': '1.5rem'
                      }),
                      borderRadius: '10px',
                      borderLeft: '4px solid #FFA62E'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '0.75rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <div style={{
                        background: '#FFA62E',
                        width: getResponsiveValue({
                          'small-mobile': '40px',
                          'mobile': '45px',
                          'tablet': '50px',
                          'desktop': '50px'
                        }),
                        height: getResponsiveValue({
                          'small-mobile': '40px',
                          'mobile': '45px',
                          'tablet': '50px',
                          'desktop': '50px'
                        }),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <FaPhone size={getResponsiveValue({
                          'small-mobile': 16,
                          'mobile': 18,
                          'tablet': 20,
                          'desktop': 20
                        })} />
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: getResponsiveValue({
                            'small-mobile': '1rem',
                            'mobile': '1.1rem',
                            'tablet': '1.25rem',
                            'desktop': '1.25rem'
                          }), 
                          fontWeight: 600, 
                          marginBottom: '0.5rem', 
                          color: '#2D3047' 
                        }}>
                          Call Us
                        </h3>
                        <p style={{ 
                          color: '#666', 
                          lineHeight: 1.5,
                          fontSize: getResponsiveValue({
                            'small-mobile': '0.9rem',
                            'mobile': '1rem',
                            'tablet': '1.2rem',
                            'desktop': '1.2rem'
                          }),
                          fontWeight: 500 
                        }}>
                          +91 96298 61885
                        </p>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: getResponsiveValue({
                            'small-mobile': 'column',
                            'mobile': 'column',
                            'tablet': 'row',
                            'desktop': 'row'
                          }),
                          gap: getResponsiveValue({
                            'small-mobile': '0.5rem',
                            'mobile': '0.5rem',
                            'tablet': '0.75rem',
                            'desktop': '0.75rem'
                          }), 
                          marginTop: '0.5rem' 
                        }}>
                          <motion.a
                            href={SOCIAL_MEDIA.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              background: '#25D366',
                              color: 'white',
                              padding: getResponsiveValue({
                                'small-mobile': '0.4rem 0.8rem',
                                'mobile': '0.5rem 1rem',
                                'tablet': '0.5rem 1rem',
                                'desktop': '0.5rem 1rem'
                              }),
                              borderRadius: '50px',
                              textDecoration: 'none',
                              fontSize: getResponsiveValue({
                                'small-mobile': '0.8rem',
                                'mobile': '0.85rem',
                                'tablet': '0.9rem',
                                'desktop': '0.9rem'
                              }),
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '5px',
                              width: getResponsiveValue({
                                'small-mobile': '100%',
                                'mobile': '100%',
                                'tablet': 'auto',
                                'desktop': 'auto'
                              })
                            }}
                          >
                            <FaWhatsapp />
                            WhatsApp
                          </motion.a>
                          <motion.a
                            href="tel:+919629861885"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              background: '#FF6B35',
                              color: 'white',
                              padding: getResponsiveValue({
                                'small-mobile': '0.4rem 0.8rem',
                                'mobile': '0.5rem 1rem',
                                'tablet': '0.5rem 1rem',
                                'desktop': '0.5rem 1rem'
                              }),
                              borderRadius: '50px',
                              textDecoration: 'none',
                              fontSize: getResponsiveValue({
                                'small-mobile': '0.8rem',
                                'mobile': '0.85rem',
                                'tablet': '0.9rem',
                                'desktop': '0.9rem'
                              }),
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '5px',
                              width: getResponsiveValue({
                                'small-mobile': '100%',
                                'mobile': '100%',
                                'tablet': 'auto',
                                'desktop': 'auto'
                              })
                            }}
                          >
                            <FaPhone size={getResponsiveValue({
                              'small-mobile': 10,
                              'mobile': 12,
                              'tablet': 12,
                              'desktop': 12
                            })} />
                            Call Now
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Hours Card */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4
                      }
                    }}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(255, 166, 46, 0.05))',
                      padding: getResponsiveValue({
                        'small-mobile': '1rem',
                        'mobile': '1.25rem',
                        'tablet': '1.5rem',
                        'desktop': '1.5rem'
                      }),
                      borderRadius: '10px',
                      borderLeft: '4px solid #1A936F'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '0.75rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <div style={{
                        background: '#1A936F',
                        width: getResponsiveValue({
                          'small-mobile': '40px',
                          'mobile': '45px',
                          'tablet': '50px',
                          'desktop': '50px'
                        }),
                        height: getResponsiveValue({
                          'small-mobile': '40px',
                          'mobile': '45px',
                          'tablet': '50px',
                          'desktop': '50px'
                        }),
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <FaClock size={getResponsiveValue({
                          'small-mobile': 16,
                          'mobile': 18,
                          'tablet': 20,
                          'desktop': 20
                        })} />
                      </div>
                      <div>
                        <h3 style={{ 
                          fontSize: getResponsiveValue({
                            'small-mobile': '1rem',
                            'mobile': '1.1rem',
                            'tablet': '1.25rem',
                            'desktop': '1.25rem'
                          }), 
                          fontWeight: 600, 
                          marginBottom: '0.5rem', 
                          color: '#2D3047' 
                        }}>
                          Opening Hours
                        </h3>
                        <div style={{ 
                          color: '#666', 
                          lineHeight: 1.5,
                          fontSize: getResponsiveValue({
                            'small-mobile': '0.85rem',
                            'mobile': '0.9rem',
                            'tablet': '1rem',
                            'desktop': '1rem'
                          })
                        }}>
                          <div><strong>Mon - Fri:</strong> 9am - 11pm</div>
                          <div><strong>Sat - Sun:</strong> 10am - 1am</div>
                          <div style={{ 
                            fontSize: getResponsiveValue({
                              'small-mobile': '0.8rem',
                              'mobile': '0.85rem',
                              'tablet': '0.85rem',
                              'desktop': '0.85rem'
                            }), 
                            color: '#FF6B35', 
                            marginTop: '0.5rem' 
                          }}>
                            🕒 Extended weekend hours!
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Social Media */}
                  <div>
                    <h3 style={{ 
                      fontSize: getResponsiveValue({
                        'small-mobile': '1rem',
                        'mobile': '1.1rem',
                        'tablet': '1.25rem',
                        'desktop': '1.25rem'
                      }), 
                      fontWeight: 600, 
                      marginBottom: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '0.75rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      }), 
                      color: '#2D3047' 
                    }}>
                      Follow Us
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      gap: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '0.75rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      }),
                      justifyContent: getResponsiveValue({
                        'small-mobile': 'center',
                        'mobile': 'center',
                        'tablet': 'flex-start',
                        'desktop': 'flex-start'
                      }),
                      flexWrap: 'wrap'
                    }}>
                      {activeSocialMedia.slice(0, getResponsiveValue({
                        'small-mobile': 4,
                        'mobile': 4,
                        'tablet': 6,
                        'desktop': 8
                      })).map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            width: getResponsiveValue({
                              'small-mobile': '38px',
                              'mobile': '40px',
                              'tablet': '45px',
                              'desktop': '45px'
                            }),
                            height: getResponsiveValue({
                              'small-mobile': '38px',
                              'mobile': '40px',
                              'tablet': '45px',
                              'desktop': '45px'
                            }),
                            background: social.color,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: getResponsiveValue({
                              'small-mobile': '1rem',
                              'mobile': '1rem',
                              'tablet': '1.2rem',
                              'desktop': '1.2rem'
                            }),
                            position: 'relative'
                          }}
                          title={social.name}
                        >
                          {social.icon}
                          <div style={{
                            position: 'absolute',
                            bottom: '-25px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            whiteSpace: 'nowrap',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            pointerEvents: 'none'
                          }}>
                            {social.name}
                          </div>
                        </motion.a>
                      ))}
                    </div>
                    {activeSocialMedia.length === 0 && (
                      <p style={{ 
                        color: '#999', 
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.85rem',
                          'mobile': '0.9rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        textAlign: 'center',
                        padding: '1rem'
                      }}>
                        Social media links coming soon!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              variants={fadeInUp}
            >
              <div style={{
                background: 'white',
                borderRadius: getResponsiveValue({
                  'small-mobile': '12px',
                  'mobile': '14px',
                  'tablet': '16px',
                  'desktop': '20px'
                }),
                padding: cardPadding,
                boxShadow: '0 8px 25px rgba(0,0,0,0.06)'
              }}>
                <h2 style={{ 
                  fontSize: getResponsiveValue({
                    'small-mobile': '1.4rem',
                    'mobile': '1.5rem',
                    'tablet': '1.75rem',
                    'desktop': '2.25rem'
                  }),
                  fontWeight: 700,
                  marginBottom: getResponsiveValue({
                    'small-mobile': '1.25rem',
                    'mobile': '1.5rem',
                    'tablet': '1.75rem',
                    'desktop': '2rem'
                  }),
                  color: '#2D3047'
                }}>
                  Send Message
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: 'linear-gradient(135deg, #1A936F, #2EC4B6)',
                      color: 'white',
                      padding: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '1rem',
                        'tablet': '1.25rem',
                        'desktop': '1.5rem'
                      }),
                      borderRadius: '10px',
                      marginBottom: getResponsiveValue({
                        'small-mobile': '1.25rem',
                        'mobile': '1.5rem',
                        'tablet': '1.75rem',
                        'desktop': '2rem'
                      }),
                      display: 'flex',
                      alignItems: 'center',
                      gap: getResponsiveValue({
                        'small-mobile': '0.75rem',
                        'mobile': '0.75rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}
                  >
                    <IoCheckmarkCircle size={getResponsiveValue({
                      'small-mobile': 22,
                      'mobile': 24,
                      'tablet': 28,
                      'desktop': 30
                    })} />
                    <div>
                      <div style={{ 
                        fontWeight: 600, 
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.95rem',
                          'mobile': '1rem',
                          'tablet': '1.1rem',
                          'desktop': '1.1rem'
                        }) 
                      }}>
                        Message Sent!
                      </div>
                      <div style={{ 
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.8rem',
                          'mobile': '0.85rem',
                          'tablet': '0.9rem',
                          'desktop': '0.9rem'
                        }), 
                        opacity: 0.9 
                      }}>
                        We'll respond within 24 hours.
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div style={{ marginBottom: getResponsiveValue({
                    'small-mobile': '1rem',
                    'mobile': '1.25rem',
                    'tablet': '1.5rem',
                    'desktop': '1.5rem'
                  }) }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: getResponsiveValue({
                        'small-mobile': '0.9rem',
                        'mobile': '0.95rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <FaUser style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Your Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: getResponsiveValue({
                          'small-mobile': '0.75rem',
                          'mobile': '0.875rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        border: `2px solid ${formErrors.name ? '#E63946' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.9rem',
                          'mobile': '0.95rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Enter your name"
                    />
                    {formErrors.name && (
                      <div style={{ 
                        color: '#E63946', 
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.8rem',
                          'mobile': '0.85rem',
                          'tablet': '0.85rem',
                          'desktop': '0.85rem'
                        }), 
                        marginTop: '0.5rem' 
                      }}>
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div style={{ marginBottom: getResponsiveValue({
                    'small-mobile': '1rem',
                    'mobile': '1.25rem',
                    'tablet': '1.5rem',
                    'desktop': '1.5rem'
                  }) }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: getResponsiveValue({
                        'small-mobile': '0.9rem',
                        'mobile': '0.95rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <FaEnvelope style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Email Address
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: getResponsiveValue({
                          'small-mobile': '0.75rem',
                          'mobile': '0.875rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        border: `2px solid ${formErrors.email ? '#E63946' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.9rem',
                          'mobile': '0.95rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <div style={{ 
                        color: '#E63946', 
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.8rem',
                          'mobile': '0.85rem',
                          'tablet': '0.85rem',
                          'desktop': '0.85rem'
                        }), 
                        marginTop: '0.5rem' 
                      }}>
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div style={{ marginBottom: getResponsiveValue({
                    'small-mobile': '1rem',
                    'mobile': '1.25rem',
                    'tablet': '1.5rem',
                    'desktop': '1.5rem'
                  }) }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: getResponsiveValue({
                        'small-mobile': '0.9rem',
                        'mobile': '0.95rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <IoCallOutline style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Phone Number
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: getResponsiveValue({
                          'small-mobile': '0.75rem',
                          'mobile': '0.875rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.9rem',
                          'mobile': '0.95rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="+91 9876543210"
                    />
                  </div>

                  {/* Message Field */}
                  <div style={{ marginBottom: getResponsiveValue({
                    'small-mobile': '1.5rem',
                    'mobile': '1.5rem',
                    'tablet': '2rem',
                    'desktop': '2rem'
                  }) }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: getResponsiveValue({
                        'small-mobile': '0.9rem',
                        'mobile': '0.95rem',
                        'tablet': '1rem',
                        'desktop': '1rem'
                      })
                    }}>
                      <FaComment style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Your Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={getResponsiveValue({
                        'small-mobile': 4,
                        'mobile': 4,
                        'tablet': 5,
                        'desktop': 6
                      })}
                      style={{
                        width: '100%',
                        padding: getResponsiveValue({
                          'small-mobile': '0.75rem',
                          'mobile': '0.875rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        border: `2px solid ${formErrors.message ? '#E63946' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.9rem',
                          'mobile': '0.95rem',
                          'tablet': '1rem',
                          'desktop': '1rem'
                        }),
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      placeholder="Tell us how we can help you..."
                    />
                    {formErrors.message && (
                      <div style={{ 
                        color: '#E63946', 
                        fontSize: getResponsiveValue({
                          'small-mobile': '0.8rem',
                          'mobile': '0.85rem',
                          'tablet': '0.85rem',
                          'desktop': '0.85rem'
                        }), 
                        marginTop: '0.5rem' 
                      }}>
                        {formErrors.message}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: isSubmitting 
                        ? '#ccc' 
                        : 'linear-gradient(45deg, #FF6B35, #FFA62E)',
                      color: 'white',
                      border: 'none',
                      padding: getResponsiveValue({
                        'small-mobile': '0.875rem 1.5rem',
                        'mobile': '1rem 2rem',
                        'tablet': '1.1rem 2.25rem',
                        'desktop': '1.2rem 2.5rem'
                      }),
                      borderRadius: '50px',
                      fontSize: getResponsiveValue({
                        'small-mobile': '0.95rem',
                        'mobile': '1rem',
                        'tablet': '1.05rem',
                        'desktop': '1.1rem'
                      }),
                      fontWeight: 600,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      margin: '0 auto',
                      width: getResponsiveValue({
                        'small-mobile': '100%',
                        'mobile': '100%',
                        'tablet': 'auto',
                        'desktop': 'auto'
                      }),
                      minWidth: getResponsiveValue({
                        'small-mobile': '100%',
                        'mobile': '100%',
                        'tablet': '200px',
                        'desktop': '200px'
                      })
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            variants={fadeInUp}
            id="map"
            style={{
              background: 'white',
              borderRadius: getResponsiveValue({
                'small-mobile': '12px',
                'mobile': '14px',
                'tablet': '16px',
                'desktop': '20px'
              }),
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
              marginBottom: getResponsiveValue({
                'small-mobile': '2rem',
                'mobile': '2.5rem',
                'tablet': '3.5rem',
                'desktop': '4rem'
              })
            }}
          >
            <div style={{
              padding: getResponsiveValue({
                'small-mobile': '1.25rem',
                'mobile': '1.5rem',
                'tablet': '1.75rem 2rem',
                'desktop': '2rem 2.5rem'
              }),
              borderBottom: '2px solid #f0f0f0'
            }}>
              <h2 style={{ 
                fontSize: getResponsiveValue({
                  'small-mobile': '1.3rem',
                  'mobile': '1.4rem',
                  'tablet': '1.6rem',
                  'desktop': '2rem'
                }),
                fontWeight: 700,
                color: '#2D3047',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}>
                <IoLocationOutline color="#FF6B35" />
                Find Us on Map
              </h2>
              <p style={{ 
                color: '#666', 
                marginTop: '0.5rem',
                fontSize: getResponsiveValue({
                  'small-mobile': '0.85rem',
                  'mobile': '0.9rem',
                  'tablet': '1rem',
                  'desktop': '1rem'
                })
              }}>
                Visit our flagship location in Tiruchengode
              </p>
            </div>
            
            <div style={{
              position: 'relative',
              width: '100%',
              height: getResponsiveValue({
                'small-mobile': '250px',
                'mobile': '280px',
                'tablet': '350px',
                'desktop': '400px'
              }),
              overflow: 'hidden'
            }}>
              <iframe 
                src="https://maps.google.com/maps?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205&output=embed" 
                allowFullScreen
                loading="lazy"
                title="EGG! ATM Location"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
              
              {/* Map Overlay Card */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                style={{
                  position: 'absolute',
                  bottom: getResponsiveValue({
                    'small-mobile': '10px',
                    'mobile': '10px',
                    'tablet': '15px',
                    'desktop': '20px'
                  }),
                  left: getResponsiveValue({
                    'small-mobile': '10px',
                    'mobile': '10px',
                    'tablet': '15px',
                    'desktop': '20px'
                  }),
                  right: getResponsiveValue({
                    'small-mobile': '10px',
                    'mobile': '10px',
                    'tablet': 'auto',
                    'desktop': 'auto'
                  }),
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  padding: getResponsiveValue({
                    'small-mobile': '0.75rem',
                    'mobile': '1rem',
                    'tablet': '1.25rem',
                    'desktop': '1.5rem'
                  }),
                  borderRadius: '10px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  maxWidth: getResponsiveValue({
                    'small-mobile': '100%',
                    'mobile': '100%',
                    'tablet': '280px',
                    'desktop': '300px'
                  })
                }}
              >
                <h3 style={{ 
                  fontSize: getResponsiveValue({
                    'small-mobile': '0.95rem',
                    'mobile': '1rem',
                    'tablet': '1.05rem',
                    'desktop': '1.1rem'
                  }),
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#2D3047'
                }}>
                  EGG! ATM Flagship Store
                </h3>
                <p style={{ 
                  fontSize: getResponsiveValue({
                    'small-mobile': '0.8rem',
                    'mobile': '0.85rem',
                    'tablet': '0.9rem',
                    'desktop': '0.9rem'
                  }),
                  color: '#666',
                  lineHeight: 1.4
                }}>
                  Opp. Indian Oil Bunk, Kumaramangalam,<br />
                  Tiruchengode, Namakkal – 637205
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: '#FF6B35',
                    color: 'white',
                    border: 'none',
                    padding: getResponsiveValue({
                      'small-mobile': '0.35rem 0.75rem',
                      'mobile': '0.4rem 1rem',
                      'tablet': '0.5rem 1.25rem',
                      'desktop': '0.5rem 1.5rem'
                    }),
                    borderRadius: '50px',
                    fontSize: getResponsiveValue({
                      'small-mobile': '0.8rem',
                      'mobile': '0.85rem',
                      'tablet': '0.9rem',
                      'desktop': '0.9rem'
                    }),
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginTop: '0.75rem',
                    width: getResponsiveValue({
                      'small-mobile': '100%',
                      'mobile': '100%',
                      'tablet': 'auto',
                      'desktop': 'auto'
                    })
                  }}
                  onClick={() => window.open('https://maps.google.com/?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205', '_blank')}
                >
                  Get Directions
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;