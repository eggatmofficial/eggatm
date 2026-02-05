
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
//   FaTwitter,
//   FaYoutube,
//   FaLinkedin,
//   FaTiktok,
//   FaTelegram
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

//   // Environment variables for social media URLs
//   const SOCIAL_MEDIA = {
//     facebook: import.meta.env.VITE_FACEBOOK_URL || '#',
//     instagram: import.meta.env.VITE_INSTAGRAM_URL || '#',
//     twitter: import.meta.env.VITE_TWITTER_URL || '#',
//     youtube: import.meta.env.VITE_YOUTUBE_URL || '#',
//     linkedin: import.meta.env.VITE_LINKEDIN_URL || '#',
//     tiktok: import.meta.env.VITE_TIKTOK_URL || '#',
//     whatsapp: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/919629861885',
//     telegram: import.meta.env.VITE_TELEGRAM_URL || '#'
//   };

//   // Social media configuration
//   const socialMediaLinks = [
//     {
//       name: 'Facebook',
//       icon: <FaFacebook />,
//       color: '#1877F2',
//       url: SOCIAL_MEDIA.facebook
//     },
//     {
//       name: 'Instagram',
//       icon: <FaInstagram />,
//       color: '#E4405F',
//       url: SOCIAL_MEDIA.instagram
//     },
//     {
//       name: 'YouTube',
//       icon: <FaYoutube />,
//       color: '#FF0000',
//       url: SOCIAL_MEDIA.youtube
//     },
//     {
//       name: 'WhatsApp',
//       icon: <FaWhatsapp />,
//       color: '#25D366',
//       url: SOCIAL_MEDIA.whatsapp
//     },
//   ];

//   // Filter active social media
//   const activeSocialMedia = socialMediaLinks.filter(social => 
//     social.url && social.url !== '#'
//   );

//   // Improved screen size detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       if (width < 375) {
//         setScreenSize('xs');
//       } else if (width < 576) {
//         setScreenSize('sm');
//       } else if (width < 768) {
//         setScreenSize('md');
//       } else if (width < 992) {
//         setScreenSize('lg');
//       } else if (width < 1200) {
//         setScreenSize('xl');
//       } else {
//         setScreenSize('xxl');
//       }
      
//       if (width >= 768) {
//         setShowMobileMenu(false);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Responsive value getter with fallbacks
//   const getResponsiveValue = (config) => {
//     const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
//     for (let i = sizes.indexOf(screenSize); i >= 0; i--) {
//       if (config[sizes[i]] !== undefined) {
//         return config[sizes[i]];
//       }
//     }
//     return config.default || config.xxl;
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
//     try {
//       await api.post("/contact", formData);
//       setIsSubmitted(true);
//       setFormData({ name: '', email: '', phone: '', message: '' });
//       setFormErrors({});
      
//       setTimeout(() => setIsSubmitted(false), 5000);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Failed to send message. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Responsive animations
//   const fadeInUp = {
//     hidden: { 
//       opacity: 0, 
//       y: getResponsiveValue({ xs: 15, sm: 20, md: 25, default: 30 }),
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
//         staggerChildren: getResponsiveValue({ xs: 0.08, sm: 0.1, md: 0.12, default: 0.15 })
//       }
//     }
//   };

//   // Responsive spacing configuration
//   const spacing = {
//     xs: { // < 375px
//       container: '0 12px',
//       section: '1.5rem 0',
//       card: '1rem',
//       gap: '1rem',
//       headerFont: '1.75rem',
//       h2Font: '1.25rem',
//       bodyFont: '0.85rem',
//       buttonPadding: '0.75rem 1.25rem',
//       iconSize: 35,
//       mapHeight: '220px'
//     },
//     sm: { // 375px - 575px
//       container: '0 15px',
//       section: '2rem 0',
//       card: '1.25rem',
//       gap: '1.25rem',
//       headerFont: '2rem',
//       h2Font: '1.4rem',
//       bodyFont: '0.9rem',
//       buttonPadding: '0.875rem 1.5rem',
//       iconSize: 40,
//       mapHeight: '250px'
//     },
//     md: { // 576px - 767px
//       container: '0 20px',
//       section: '2.5rem 0',
//       card: '1.5rem',
//       gap: '1.5rem',
//       headerFont: '2.2rem',
//       h2Font: '1.5rem',
//       bodyFont: '0.95rem',
//       buttonPadding: '1rem 1.75rem',
//       iconSize: 45,
//       mapHeight: '300px'
//     },
//     lg: { // 768px - 991px
//       container: '0 25px',
//       section: '3rem 0',
//       card: '1.75rem',
//       gap: '1.75rem',
//       headerFont: '2.5rem',
//       h2Font: '1.75rem',
//       bodyFont: '1rem',
//       buttonPadding: '1.1rem 2rem',
//       iconSize: 50,
//       mapHeight: '350px'
//     },
//     xl: { // 992px - 1199px
//       container: '0 30px',
//       section: '3.5rem 0',
//       card: '2rem',
//       gap: '2rem',
//       headerFont: '3rem',
//       h2Font: '2rem',
//       bodyFont: '1.05rem',
//       buttonPadding: '1.2rem 2.25rem',
//       iconSize: 55,
//       mapHeight: '380px'
//     },
//     xxl: { // 1200px+
//       container: '0 40px',
//       section: '4rem 0',
//       card: '2.5rem',
//       gap: '2.5rem',
//       headerFont: '3.5rem',
//       h2Font: '2.25rem',
//       bodyFont: '1.1rem',
//       buttonPadding: '1.3rem 2.5rem',
//       iconSize: 60,
//       mapHeight: '400px'
//     }
//   };

//   const currentSpacing = spacing[screenSize] || spacing.xxl;

//   return (
//     <>
//       {/* Sticky Header */}
//       <motion.div
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//       </motion.div>
      
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={staggerContainer}
//         style={{
//           background: 'linear-gradient(135deg, #fffaf0 0%, #fff5e6 100%)',
//           minHeight: '100vh',
//           overflowX: 'hidden'
//         }}
//       >
//         <div style={{ 
//           maxWidth: '1400px', 
//           margin: '0 auto', 
//           padding: currentSpacing.container,
//           position: 'relative'
//         }}>
//           {/* Header Section */}
//           <motion.div 
//             variants={fadeInUp}
//             style={{
//               textAlign: 'center',
//               padding: currentSpacing.section,
//               marginBottom: currentSpacing.gap
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
//               <FaPaperPlane size={getResponsiveValue({ xs: 24, sm: 28, md: 32, default: 40 })} style={{ color: '#FF6B35' }} />
//             </motion.div>
            
//             <motion.h1 
//               style={{ 
//                 fontSize: currentSpacing.headerFont,
//                 fontWeight: 800,
//                 marginBottom: '0.75rem',
//                 background: 'linear-gradient(45deg, #FF6B35, #FFA62E)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 lineHeight: 1.2,
//                 padding: getResponsiveValue({ xs: '0 5px', sm: '0 10px', default: '0' })
//               }}
//             >
//               Contact Us
//             </motion.h1>
            
//             <motion.p 
//               style={{ 
//                 fontSize: currentSpacing.bodyFont,
//                 color: '#666',
//                 maxWidth: '600px',
//                 margin: '0 auto',
//                 padding: getResponsiveValue({ xs: '0 5px', sm: '0 10px', default: '0' }),
//                 lineHeight: 1.6
//               }}
//             >
//               Have questions? We're here to help! Reach out through any channel below.
//             </motion.p>
//           </motion.div>

//           {/* Main Content Grid */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: getResponsiveValue({ 
//               xs: '1fr', 
//               sm: '1fr', 
//               md: '1fr', 
//               lg: '1fr 1fr',
//               default: '1fr 1fr'
//             }),
//             gap: currentSpacing.gap,
//             marginBottom: getResponsiveValue({ 
//               xs: '2rem', 
//               sm: '2.5rem', 
//               default: '4rem' 
//             }),
//             alignItems: 'stretch'
//           }}>
//             {/* Left Column - Contact Information */}
//             <motion.div variants={fadeInUp}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: getResponsiveValue({ xs: '10px', sm: '12px', default: '16px' }),
//                 padding: currentSpacing.card,
//                 boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}>
//                 <h2 style={{ 
//                   fontSize: currentSpacing.h2Font,
//                   fontWeight: 700,
//                   marginBottom: getResponsiveValue({ xs: '1rem', sm: '1.25rem', default: '1.5rem' }),
//                   color: '#2D3047'
//                 }}>
//                   Get in Touch
//                 </h2>

//                 {/* Contact Info Cards */}
//                 <div style={{ 
//                   display: 'flex', 
//                   flexDirection: 'column', 
//                   gap: getResponsiveValue({ xs: '0.75rem', sm: '1rem', default: '1.25rem' }),
//                   flex: 1
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
//                       padding: getResponsiveValue({ xs: '0.875rem', sm: '1rem', default: '1.25rem' }),
//                       borderRadius: '10px',
//                       borderLeft: '4px solid #FF6B35'
//                     }}
//                   >
//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'flex-start', 
//                       gap: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' })
//                     }}>
//                       <div style={{
//                         background: '#FF6B35',
//                         width: getResponsiveValue({ xs: '40px', sm: '42px', default: '48px' }),
//                         height: getResponsiveValue({ xs: '40px', sm: '42px', default: '48px' }),
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         flexShrink: 0
//                       }}>
//                         <FaMapMarkerAlt size={getResponsiveValue({ xs: 16, sm: 18, default: 20 })} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <h3 style={{ 
//                           fontSize: getResponsiveValue({ xs: '0.95rem', sm: '1rem', default: '1.1rem' }), 
//                           fontWeight: 600, 
//                           marginBottom: '0.375rem', 
//                           color: '#2D3047' 
//                         }}>
//                           Our Location
//                         </h3>
//                         <p style={{ 
//                           color: '#666', 
//                           lineHeight: 1.5,
//                           fontSize: getResponsiveValue({ xs: '0.8rem', sm: '0.85rem', default: '0.9rem' })
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
//                       padding: getResponsiveValue({ xs: '0.875rem', sm: '1rem', default: '1.25rem' }),
//                       borderRadius: '10px',
//                       borderLeft: '4px solid #FFA62E'
//                     }}
//                   >
//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'flex-start', 
//                       gap: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' })
//                     }}>
//                       <div style={{
//                         background: '#FFA62E',
//                         width: getResponsiveValue({ xs: '40px', sm: '42px', default: '48px' }),
//                         height: getResponsiveValue({ xs: '40px', sm: '42px', default: '48px' }),
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         flexShrink: 0
//                       }}>
//                         <FaPhone size={getResponsiveValue({ xs: 16, sm: 18, default: 20 })} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <h3 style={{ 
//                           fontSize: getResponsiveValue({ xs: '0.95rem', sm: '1rem', default: '1.1rem' }), 
//                           fontWeight: 600, 
//                           marginBottom: '0.375rem', 
//                           color: '#2D3047' 
//                         }}>
//                           Call Us
//                         </h3>
//                         <p style={{ 
//                           color: '#666', 
//                           lineHeight: 1.5,
//                           fontSize: getResponsiveValue({ xs: '0.85rem', sm: '0.9rem', default: '1rem' }),
//                           fontWeight: 500 
//                         }}>
//                           +91 96298 61885
//                         </p>
//                         <div style={{ 
//                           display: 'flex', 
//                           flexDirection: getResponsiveValue({ xs: 'column', sm: 'row', default: 'row' }),
//                           gap: '0.5rem', 
//                           marginTop: '0.75rem' 
//                         }}>
//                           <motion.a
//                             href="tel:+919629861885"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             style={{
//                               background: '#FF6B35',
//                               color: 'white',
//                               padding: getResponsiveValue({ xs: '0.5rem 0.875rem', sm: '0.5rem 1rem', default: '0.625rem 1.125rem' }),
//                               borderRadius: '50px',
//                               textDecoration: 'none',
//                               fontSize: getResponsiveValue({ xs: '0.8rem', sm: '0.85rem', default: '0.9rem' }),
//                               display: 'inline-flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                               gap: '6px',
//                               flex: 1,
//                               textAlign: 'center'
//                             }}
//                           >
//                             <FaPhone size={getResponsiveValue({ xs: 12, sm: 13, default: 14 })} />
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
//                       padding: getResponsiveValue({ xs: '0.875rem', sm: '1rem', default: '1.25rem' }),
//                       borderRadius: '10px',
//                       borderLeft: '4px solid #1A936F'
//                     }}
//                   >
//                     <div style={{ 
//                       display: 'flex', 
//                       alignItems: 'flex-start', 
//                       gap: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' })
//                     }}>
//                       <div style={{
//                         background: '#1A936F',
//                         width: getResponsiveValue({ xs: '40px', sm: '42px', default: '48px' }),
//                         height: getResponsiveValue({ xs: '40px', sm: '42px', default: '48px' }),
//                         borderRadius: '50%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         color: 'white',
//                         flexShrink: 0
//                       }}>
//                         <FaClock size={getResponsiveValue({ xs: 16, sm: 18, default: 20 })} />
//                       </div>
//                       <div style={{ flex: 1 }}>
//                         <h3 style={{ 
//                           fontSize: getResponsiveValue({ xs: '0.95rem', sm: '1rem', default: '1.1rem' }), 
//                           fontWeight: 600, 
//                           marginBottom: '0.375rem', 
//                           color: '#2D3047' 
//                         }}>
//                           Opening Hours
//                         </h3>
//                         <div style={{ 
//                           color: '#666', 
//                           lineHeight: 1.5,
//                           fontSize: getResponsiveValue({ xs: '0.8rem', sm: '0.85rem', default: '0.9rem' })
//                         }}>
//                           <div><strong>Mon - Fri:</strong> 9am - 11pm</div>
//                           <div><strong>Sat - Sun:</strong> 10am - 1am</div>
//                           <div style={{ 
//                             fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }), 
//                             color: '#FF6B35', 
//                             marginTop: '0.5rem',
//                             fontWeight: 500
//                           }}>
//                             🕒 Extended weekend hours!
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Social Media */}
//                   <div style={{ marginTop: 'auto' }}>
//                     <h3 style={{ 
//                       fontSize: getResponsiveValue({ xs: '0.95rem', sm: '1rem', default: '1.1rem' }), 
//                       fontWeight: 600, 
//                       marginBottom: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' }), 
//                       color: '#2D3047' 
//                     }}>
//                       Follow Us
//                     </h3>
//                     <div style={{ 
//                       display: 'flex', 
//                       gap: getResponsiveValue({ xs: '0.5rem', sm: '0.625rem', default: '0.75rem' }),
//                       justifyContent: getResponsiveValue({ xs: 'center', sm: 'center', lg: 'flex-start', default: 'flex-start' }),
//                       flexWrap: 'wrap'
//                     }}>
//                       {activeSocialMedia.map((social, index) => (
//                         <motion.a
//                           key={index}
//                           href={social.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           whileHover={{ scale: 1.15, rotate: 5 }}
//                           whileTap={{ scale: 0.95 }}
//                           style={{
//                             width: getResponsiveValue({ xs: '36px', sm: '38px', default: '42px' }),
//                             height: getResponsiveValue({ xs: '36px', sm: '38px', default: '42px' }),
//                             background: social.color,
//                             borderRadius: '50%',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             color: 'white',
//                             textDecoration: 'none',
//                             fontSize: getResponsiveValue({ xs: '0.9rem', sm: '1rem', default: '1.1rem' }),
//                             position: 'relative',
//                             transition: 'all 0.2s ease'
//                           }}
//                           title={social.name}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.querySelector('.tooltip').style.opacity = 1;
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.querySelector('.tooltip').style.opacity = 0;
//                           }}
//                         >
//                           {social.icon}
//                           <div className="tooltip" style={{
//                             position: 'absolute',
//                             bottom: '-30px',
//                             left: '50%',
//                             transform: 'translateX(-50%)',
//                             background: 'rgba(0,0,0,0.8)',
//                             color: 'white',
//                             padding: '4px 10px',
//                             borderRadius: '6px',
//                             fontSize: '0.75rem',
//                             whiteSpace: 'nowrap',
//                             opacity: 0,
//                             transition: 'opacity 0.2s',
//                             pointerEvents: 'none',
//                             zIndex: 10
//                           }}>
//                             {social.name}
//                           </div>
//                         </motion.a>
//                       ))}
//                     </div>
//                     {activeSocialMedia.length === 0 && (
//                       <p style={{ 
//                         color: '#999', 
//                         fontSize: getResponsiveValue({ xs: '0.8rem', sm: '0.85rem', default: '0.9rem' }),
//                         textAlign: 'center',
//                         padding: '0.75rem',
//                         marginTop: '0.5rem'
//                       }}>
//                         Social media links coming soon!
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Right Column - Contact Form */}
//             <motion.div variants={fadeInUp}>
//               <div style={{
//                 background: 'white',
//                 borderRadius: getResponsiveValue({ xs: '10px', sm: '12px', default: '16px' }),
//                 padding: currentSpacing.card,
//                 boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
//                 height: '100%'
//               }}>
//                 <h2 style={{ 
//                   fontSize: currentSpacing.h2Font,
//                   fontWeight: 700,
//                   marginBottom: getResponsiveValue({ xs: '1rem', sm: '1.25rem', default: '1.5rem' }),
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
//                       padding: getResponsiveValue({ xs: '0.75rem', sm: '1rem', default: '1.25rem' }),
//                       borderRadius: '10px',
//                       marginBottom: getResponsiveValue({ xs: '1rem', sm: '1.25rem', default: '1.5rem' }),
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: getResponsiveValue({ xs: '0.625rem', sm: '0.75rem', default: '0.875rem' })
//                     }}
//                   >
//                     <IoCheckmarkCircle size={getResponsiveValue({ xs: 20, sm: 22, default: 26 })} />
//                     <div>
//                       <div style={{ 
//                         fontWeight: 600, 
//                         fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }) 
//                       }}>
//                         Message Sent!
//                       </div>
//                       <div style={{ 
//                         fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }), 
//                         opacity: 0.9 
//                       }}>
//                         We'll respond within 24 hours.
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   {/* Name Field */}
//                   <div style={{ marginBottom: getResponsiveValue({ xs: '1rem', sm: '1.125rem', default: '1.25rem' }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({ xs: '0.85rem', sm: '0.9rem', default: '0.95rem' })
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
//                         padding: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' }),
//                         border: `2px solid ${formErrors.name ? '#E63946' : '#e0e0e0'}`,
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease'
//                       }}
//                       placeholder="Enter your name"
//                     />
//                     {formErrors.name && (
//                       <div style={{ 
//                         color: '#E63946', 
//                         fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }), 
//                         marginTop: '0.375rem' 
//                       }}>
//                         {formErrors.name}
//                       </div>
//                     )}
//                   </div>

//                   {/* Email Field */}
//                   <div style={{ marginBottom: getResponsiveValue({ xs: '1rem', sm: '1.125rem', default: '1.25rem' }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({ xs: '0.85rem', sm: '0.9rem', default: '0.95rem' })
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
//                         padding: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' }),
//                         border: `2px solid ${formErrors.email ? '#E63946' : '#e0e0e0'}`,
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease'
//                       }}
//                       placeholder="your@email.com"
//                     />
//                     {formErrors.email && (
//                       <div style={{ 
//                         color: '#E63946', 
//                         fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }), 
//                         marginTop: '0.375rem' 
//                       }}>
//                         {formErrors.email}
//                       </div>
//                     )}
//                   </div>

//                   {/* Phone Field */}
//                   <div style={{ marginBottom: getResponsiveValue({ xs: '1rem', sm: '1.125rem', default: '1.25rem' }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({ xs: '0.85rem', sm: '0.9rem', default: '0.95rem' })
//                     }}>
//                       <IoCallOutline style={{ marginRight: '8px', color: '#FF6B35' }} />
//                       Phone Number
//                     </label>
//                     <motion.input
//                       whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       style={{
//                         width: '100%',
//                         padding: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' }),
//                         border: '2px solid #e0e0e0',
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease'
//                       }}
//                       placeholder="Enter your phone number"
//                     />
//                   </div>

//                   {/* Message Field */}
//                   <div style={{ marginBottom: getResponsiveValue({ xs: '1.5rem', sm: '1.75rem', default: '2rem' }) }}>
//                     <label style={{ 
//                       display: 'block', 
//                       marginBottom: '0.5rem',
//                       fontWeight: 500,
//                       color: '#2D3047',
//                       fontSize: getResponsiveValue({ xs: '0.85rem', sm: '0.9rem', default: '0.95rem' })
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
//                       rows={getResponsiveValue({ xs: 4, sm: 4, lg: 5, default: 6 })}
//                       style={{
//                         width: '100%',
//                         padding: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' }),
//                         border: `2px solid ${formErrors.message ? '#E63946' : '#e0e0e0'}`,
//                         borderRadius: '8px',
//                         fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }),
//                         outline: 'none',
//                         transition: 'all 0.2s ease',
//                         resize: 'vertical',
//                         fontFamily: 'inherit',
//                         minHeight: '120px'
//                       }}
//                       placeholder="Tell us how we can help you..."
//                     />
//                     {formErrors.message && (
//                       <div style={{ 
//                         color: '#E63946', 
//                         fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }), 
//                         marginTop: '0.375rem' 
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
//                       padding: currentSpacing.buttonPadding,
//                       borderRadius: '50px',
//                       fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }),
//                       fontWeight: 600,
//                       cursor: isSubmitting ? 'not-allowed' : 'pointer',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       gap: '8px',
//                       margin: '0 auto',
//                       width: getResponsiveValue({ xs: '100%', sm: '100%', lg: 'auto', default: 'auto' }),
//                       minWidth: getResponsiveValue({ xs: '100%', sm: '100%', lg: '200px', default: '220px' }),
//                       opacity: isSubmitting ? 0.8 : 1
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
//               borderRadius: getResponsiveValue({ xs: '10px', sm: '12px', default: '16px' }),
//               overflow: 'hidden',
//               boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
//               marginBottom: getResponsiveValue({ xs: '2rem', sm: '2.5rem', default: '3rem' })
//             }}
//           >
//             <div style={{
//               padding: getResponsiveValue({ xs: '1rem', sm: '1.25rem', lg: '1.5rem', default: '1.75rem' }),
//               borderBottom: '2px solid #f0f0f0'
//             }}>
//               <h2 style={{ 
//                 fontSize: getResponsiveValue({ xs: '1.1rem', sm: '1.25rem', lg: '1.5rem', default: '1.75rem' }),
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
//                 fontSize: getResponsiveValue({ xs: '0.8rem', sm: '0.85rem', default: '0.9rem' })
//               }}>
//                 Visit our flagship location in Tiruchengode
//               </p>
//             </div>
            
//             <div style={{
//               position: 'relative',
//               width: '100%',
//               height: currentSpacing.mapHeight,
//               overflow: 'hidden'
//             }}>
//               <iframe 
//                 src="https://maps.google.com/maps?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205&output=embed" 
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="EGG! ATM Location"
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   border: 'none',
//                   filter: 'saturate(1.1)'
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
//                   bottom: getResponsiveValue({ xs: '8px', sm: '10px', default: '15px' }),
//                   left: getResponsiveValue({ xs: '8px', sm: '10px', default: '15px' }),
//                   right: getResponsiveValue({ xs: '8px', sm: '10px', lg: 'auto', default: 'auto' }),
//                   background: 'rgba(255, 255, 255, 0.95)',
//                   backdropFilter: 'blur(10px)',
//                   padding: getResponsiveValue({ xs: '0.75rem', sm: '0.875rem', default: '1rem' }),
//                   borderRadius: '10px',
//                   boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
//                   maxWidth: getResponsiveValue({ xs: '100%', sm: '100%', lg: '280px', default: '300px' })
//                 }}
//               >
//                 <h3 style={{ 
//                   fontSize: getResponsiveValue({ xs: '0.9rem', sm: '0.95rem', default: '1rem' }),
//                   fontWeight: 600,
//                   marginBottom: '0.375rem',
//                   color: '#2D3047'
//                 }}>
//                   EGG! ATM Flagship Store
//                 </h3>
//                 <p style={{ 
//                   fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }),
//                   color: '#666',
//                   lineHeight: 1.4,
//                   marginBottom: '0.5rem'
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
//                     padding: getResponsiveValue({ xs: '0.4rem 0.875rem', sm: '0.5rem 1rem', default: '0.5rem 1.25rem' }),
//                     borderRadius: '50px',
//                     fontSize: getResponsiveValue({ xs: '0.75rem', sm: '0.8rem', default: '0.85rem' }),
//                     fontWeight: 500,
//                     cursor: 'pointer',
//                     width: '100%'
//                   }}
//                   onClick={() => window.open('https://maps.google.com/?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205', '_blank')}
//                 >
//                   Get Directions
//                 </motion.button>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Footer Note */}
//           <motion.div
//             variants={fadeInUp}
//             style={{
//               textAlign: 'center',
//               padding: getResponsiveValue({ xs: '1rem 0', sm: '1.25rem 0', default: '1.5rem 0' }),
//               color: '#666',
//               fontSize: getResponsiveValue({ xs: '0.8rem', sm: '0.85rem', default: '0.9rem' })
//             }}
//           >
//             <p>© {new Date().getFullYear()} EGG! ATM. All rights reserved.</p>
//             <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
//               We typically respond within 2-4 hours during business hours.
//             </p>
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
  FaYoutube
} from 'react-icons/fa';
import { 
  IoLocationOutline,
  IoCallOutline,
  IoCheckmarkCircle
} from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  // Environment variables for social media URLs
  const SOCIAL_MEDIA = {
    facebook: import.meta.env.VITE_FACEBOOK_URL || '#',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || '#',
    youtube: import.meta.env.VITE_YOUTUBE_URL || '#',
    whatsapp: import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/919629861885'
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
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      color: '#FF0000',
      url: SOCIAL_MEDIA.youtube
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      color: '#25D366',
      url: SOCIAL_MEDIA.whatsapp
    },
  ];

  // Filter active social media
  const activeSocialMedia = socialMediaLinks.filter(social => 
    social.url && social.url !== '#'
  );

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setScreenSize('xs');
      } else if (width < 768) {
        setScreenSize('sm');
      } else if (width < 992) {
        setScreenSize('md');
      } else if (width < 1200) {
        setScreenSize('lg');
      } else {
        setScreenSize('xl');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get responsive value
  const getResponsiveValue = (config) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    for (let i = sizes.indexOf(screenSize); i >= 0; i--) {
      if (config[sizes[i]] !== undefined) {
        return config[sizes[i]];
      }
    }
    return config.xl;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fill all required fields correctly');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Make API call
      const response = await api.post("/contact", formData);
      
      // Show success toast
      toast.success('Message sent successfully! We will respond within 24 hours.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setFormErrors({});
      setIsSubmitted(true);
      
      // Auto hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      toast.error(errorMessage);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive animations
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: getResponsiveValue({ xs: 20, sm: 25, md: 30, lg: 30, xl: 30 }),
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: getResponsiveValue({ xs: 0.1, sm: 0.12, md: 0.15, lg: 0.15, xl: 0.15 })
      }
    }
  };

  // Responsive spacing
  const spacing = {
    xs: {
      container: '0 15px',
      section: '2rem 0',
      card: '1.25rem',
      gap: '1.25rem',
      headerFont: '2rem',
      h2Font: '1.4rem',
      bodyFont: '0.9rem',
      buttonPadding: '0.875rem 1.5rem',
      iconSize: 40,
      mapHeight: '250px'
    },
    sm: {
      container: '0 20px',
      section: '2.5rem 0',
      card: '1.5rem',
      gap: '1.5rem',
      headerFont: '2.2rem',
      h2Font: '1.5rem',
      bodyFont: '0.95rem',
      buttonPadding: '1rem 1.75rem',
      iconSize: 45,
      mapHeight: '300px'
    },
    md: {
      container: '0 25px',
      section: '3rem 0',
      card: '1.75rem',
      gap: '1.75rem',
      headerFont: '2.5rem',
      h2Font: '1.75rem',
      bodyFont: '1rem',
      buttonPadding: '1.1rem 2rem',
      iconSize: 50,
      mapHeight: '350px'
    },
    lg: {
      container: '0 30px',
      section: '3.5rem 0',
      card: '2rem',
      gap: '2rem',
      headerFont: '3rem',
      h2Font: '2rem',
      bodyFont: '1.05rem',
      buttonPadding: '1.2rem 2.25rem',
      iconSize: 55,
      mapHeight: '380px'
    },
    xl: {
      container: '0 40px',
      section: '4rem 0',
      card: '2.5rem',
      gap: '2.5rem',
      headerFont: '3.5rem',
      h2Font: '2.25rem',
      bodyFont: '1.1rem',
      buttonPadding: '1.3rem 2.5rem',
      iconSize: 60,
      mapHeight: '400px'
    }
  };

  const currentSpacing = spacing[screenSize] || spacing.xl;

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        style={{
          background: 'linear-gradient(135deg, #fffaf0 0%, #fff5e6 100%)',
          minHeight: '100vh',
          overflowX: 'hidden'
        }}
      >
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: currentSpacing.container,
          position: 'relative'
        }}>
          {/* Header Section */}
          <motion.div 
            variants={fadeInUp}
            style={{
              textAlign: 'center',
              padding: currentSpacing.section,
              marginBottom: currentSpacing.gap
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
              <FaPaperPlane size={getResponsiveValue({ xs: 28, sm: 32, md: 36, lg: 40, xl: 40 })} style={{ color: '#FF6B35' }} />
            </motion.div>
            
            <motion.h1 
              style={{ 
                fontSize: currentSpacing.headerFont,
                fontWeight: 800,
                marginBottom: '0.75rem',
                background: 'linear-gradient(45deg, #FF6B35, #FFA62E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.2
              }}
            >
              Contact Us
            </motion.h1>
            
            <motion.p 
              style={{ 
                fontSize: currentSpacing.bodyFont,
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6
              }}
            >
              Have questions? We're here to help! Reach out through any channel below.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue({ 
              xs: '1fr', 
              sm: '1fr', 
              md: '1fr', 
              lg: '1fr 1fr',
              xl: '1fr 1fr'
            }),
            gap: currentSpacing.gap,
            marginBottom: getResponsiveValue({ 
              xs: '2rem', 
              sm: '2.5rem', 
              md: '3rem',
              lg: '4rem',
              xl: '4rem' 
            }),
            alignItems: 'stretch'
          }}>
            {/* Left Column - Contact Information */}
            <motion.div variants={fadeInUp}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: currentSpacing.card,
                boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h2 style={{ 
                  fontSize: currentSpacing.h2Font,
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  color: '#2D3047'
                }}>
                  Get in Touch
                </h2>

                {/* Contact Info Cards */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.25rem',
                  flex: 1
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
                      padding: '1.25rem',
                      borderRadius: '10px',
                      borderLeft: '4px solid #FF6B35'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '1rem'
                    }}>
                      <div style={{
                        background: '#FF6B35',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <FaMapMarkerAlt size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          marginBottom: '0.375rem', 
                          color: '#2D3047' 
                        }}>
                          Our Location
                        </h3>
                        <p style={{ 
                          color: '#666', 
                          lineHeight: 1.5,
                          fontSize: '0.9rem'
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
                      padding: '1.25rem',
                      borderRadius: '10px',
                      borderLeft: '4px solid #FFA62E'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '1rem'
                    }}>
                      <div style={{
                        background: '#FFA62E',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <FaPhone size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          marginBottom: '0.375rem', 
                          color: '#2D3047' 
                        }}>
                          Call Us
                        </h3>
                        <p style={{ 
                          color: '#666', 
                          lineHeight: 1.5,
                          fontSize: '1rem',
                          fontWeight: 500 
                        }}>
                          +91 96298 61885
                        </p>
                        <div style={{ 
                          display: 'flex', 
                          gap: '0.5rem', 
                          marginTop: '0.75rem' 
                        }}>
                          <motion.a
                            href="tel:+919629861885"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              background: '#FF6B35',
                              color: 'white',
                              padding: '0.625rem 1.125rem',
                              borderRadius: '50px',
                              textDecoration: 'none',
                              fontSize: '0.9rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              flex: 1,
                              textAlign: 'center'
                            }}
                          >
                            <FaPhone size={14} />
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
                      padding: '1.25rem',
                      borderRadius: '10px',
                      borderLeft: '4px solid #1A936F'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '1rem'
                    }}>
                      <div style={{
                        background: '#1A936F',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        flexShrink: 0
                      }}>
                        <FaClock size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: 600, 
                          marginBottom: '0.375rem', 
                          color: '#2D3047' 
                        }}>
                          Opening Hours
                        </h3>
                        <div style={{ 
                          color: '#666', 
                          lineHeight: 1.5,
                          fontSize: '0.9rem'
                        }}>
                          <div><strong>Mon - Sat:</strong> 09:00 Am - 11.00 Pm</div>
                          <div><strong>Sunday:</strong> 01:00 Pm - 11:00 Pm</div>
                          <div style={{ 
                            fontSize: '0.85rem', 
                            color: '#FF6B35', 
                            marginTop: '0.5rem',
                            fontWeight: 500
                          }}>
                            🕒 Extended weekend hours!
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Social Media */}
                  <div style={{ marginTop: 'auto' }}>
                    <h3 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 600, 
                      marginBottom: '1rem', 
                      color: '#2D3047' 
                    }}>
                      Follow Us
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.75rem',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap'
                    }}>
                      {activeSocialMedia.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            width: '42px',
                            height: '42px',
                            background: social.color,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '1.1rem'
                          }}
                          title={social.name}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                    {activeSocialMedia.length === 0 && (
                      <p style={{ 
                        color: '#999', 
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        padding: '0.75rem',
                        marginTop: '0.5rem'
                      }}>
                        Social media links coming soon!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div variants={fadeInUp}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: currentSpacing.card,
                boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                height: '100%'
              }}>
                <h2 style={{ 
                  fontSize: currentSpacing.h2Font,
                  fontWeight: 700,
                  marginBottom: '1.5rem',
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
                      padding: '1.25rem',
                      borderRadius: '10px',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.875rem'
                    }}
                  >
                    <IoCheckmarkCircle size={26} />
                    <div>
                      <div style={{ 
                        fontWeight: 600, 
                        fontSize: '1rem' 
                      }}>
                        Message Sent!
                      </div>
                      <div style={{ 
                        fontSize: '0.85rem', 
                        opacity: 0.9 
                      }}>
                        We'll respond within 24 hours.
                      </div>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: '0.95rem'
                    }}>
                      <FaUser style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Your Name *
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
                        padding: '1rem',
                        border: `2px solid ${formErrors.name ? '#E63946' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Enter your name"
                    />
                    {formErrors.name && (
                      <div style={{ 
                        color: '#E63946', 
                        fontSize: '0.85rem', 
                        marginTop: '0.375rem' 
                      }}>
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: '0.95rem'
                    }}>
                      <FaEnvelope style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Email Address *
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
                        padding: '1rem',
                        border: `2px solid ${formErrors.email ? '#E63946' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <div style={{ 
                        color: '#E63946', 
                        fontSize: '0.85rem', 
                        marginTop: '0.375rem' 
                      }}>
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: '0.95rem'
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
                        padding: '1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Message Field */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      color: '#2D3047',
                      fontSize: '0.95rem'
                    }}>
                      <FaComment style={{ marginRight: '8px', color: '#FF6B35' }} />
                      Your Message *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01, boxShadow: "0 0 0 2px rgba(255, 107, 53, 0.3)" }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: `2px solid ${formErrors.message ? '#E63946' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        minHeight: '120px'
                      }}
                      placeholder="Tell us how we can help you..."
                    />
                    {formErrors.message && (
                      <div style={{ 
                        color: '#E63946', 
                        fontSize: '0.85rem', 
                        marginTop: '0.375rem' 
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
                      padding: currentSpacing.buttonPadding,
                      borderRadius: '50px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      margin: '0 auto',
                      width: '100%',
                      maxWidth: '300px',
                      opacity: isSubmitting ? 0.8 : 1
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
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
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
              marginBottom: '3rem'
            }}
          >
            <div style={{
              padding: '1.75rem',
              borderBottom: '2px solid #f0f0f0'
            }}>
              <h2 style={{ 
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#2D3047',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <IoLocationOutline color="#FF6B35" />
                Find Us on Map
              </h2>
              <p style={{ 
                color: '#666', 
                marginTop: '0.5rem',
                fontSize: '0.9rem'
              }}>
                Visit our flagship location in Tiruchengode
              </p>
            </div>
            
            <div style={{
              position: 'relative',
              width: '100%',
              height: currentSpacing.mapHeight,
              overflow: 'hidden'
            }}>
              <iframe 
                src="https://maps.google.com/maps?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205&output=embed" 
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EGG! ATM Location"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  filter: 'saturate(1.1)'
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
                  bottom: '15px',
                  left: '15px',
                  right: '15px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem',
                  borderRadius: '10px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  maxWidth: '300px'
                }}
              >
                <h3 style={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '0.375rem',
                  color: '#2D3047'
                }}>
                  EGG! ATM Flagship Store
                </h3>
                <p style={{ 
                  fontSize: '0.85rem',
                  color: '#666',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem'
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
                    padding: '0.5rem 1.25rem',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    width: '100%'
                  }}
                  onClick={() => window.open('https://maps.google.com/?q=Egg+Bites,+9W9Q%2B834,+Nadar+Theru,+Tamil+Nadu+637205', '_blank')}
                >
                  Get Directions
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.div
            variants={fadeInUp}
            style={{
              textAlign: 'center',
              padding: '1.5rem 0',
              color: '#666',
              fontSize: '0.9rem'
            }}
          >
            <p>© {new Date().getFullYear()} EGG! ATM. All rights reserved.</p>
            <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
              We typically respond within 2-4 hours during business hours.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;