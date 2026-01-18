import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GiEggPod, GiCookingPot } from 'react-icons/gi';
import { IoTimeOutline, IoLocationOutline, IoFastFoodOutline, IoSparkles } from 'react-icons/io5';
import { FaEgg, FaFire, FaArrowRight } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import locationImage from '../assets/imges/Loca.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

  const handleVisitUsClick = () => {
    navigate('/contact');
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setWindowWidth(window.innerWidth);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Responsive breakpoints
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;
  const isDesktop = windowWidth > 1024;

  const getResponsiveValue = (mobile, tablet, desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  // Responsive animation variants
  const glassSlideIn = {
    hidden: { 
      opacity: 0, 
      x: getResponsiveValue(-30, -50, -100),
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      transition: { 
        duration: getResponsiveValue(0.5, 0.6, 0.8),
        ease: "easeOut"
      }
    }
  };

  const glassSlideUp = {
    hidden: { 
      opacity: 0, 
      y: getResponsiveValue(30, 50, 100),
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: getResponsiveValue(0.5, 0.6, 0.8),
        ease: "easeOut"
      }
    }
  };

  const scaleInWithGlow = {
    hidden: { 
      opacity: 0, 
      scale: getResponsiveValue(0.9, 0.8, 0.5),
      boxShadow: "0 0 0 rgba(255, 107, 53, 0)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      boxShadow: getResponsiveValue(
        "0 0 15px rgba(255, 107, 53, 0.3)",
        "0 0 20px rgba(255, 107, 53, 0.4)",
        "0 0 50px rgba(255, 107, 53, 0.5)"
      ),
      transition: { 
        duration: getResponsiveValue(0.6, 0.8, 1),
        ease: "backOut",
        delay: getResponsiveValue(0.1, 0.2, 0.3)
      }
    }
  };

  const textReveal = {
    hidden: { 
      opacity: 0,
      y: getResponsiveValue(20, 30, 50)
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: getResponsiveValue(0.5, 0.6, 0.8),
        ease: "easeOut"
      }
    }
  };

  const floatingCard = {
    animate: {
      y: getResponsiveValue([0, -5, 0], [0, -10, 0], [0, -20, 0]),
      rotateX: getResponsiveValue([0, 2, 0], [0, 3, 0], [0, 5, 0]),
      transition: {
        duration: getResponsiveValue(3, 4, 6),
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const shimmerEffect = {
    hidden: { 
      backgroundPosition: "-200% 0"
    },
    visible: { 
      backgroundPosition: "200% 0",
      transition: {
        duration: getResponsiveValue(2.5, 3, 3),
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const particleFloat = {
    animate: (i) => ({
      y: [0, getResponsiveValue(-10, -15, -30), 0],
      x: [0, Math.sin(i) * getResponsiveValue(5, 10, 20), 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: getResponsiveValue(2 + i, 2.5 + i, 3 + i),
        repeat: Infinity,
        delay: i * getResponsiveValue(0.2, 0.3, 0.5)
      }
    })
  };

  const orbitAnimation = {
    animate: {
      rotate: 360,
      transition: {
        duration: getResponsiveValue(10, 15, 20),
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const typingEffect = {
    hidden: { 
      width: 0,
      opacity: 0
    },
    visible: { 
      width: "100%",
      opacity: 1,
      transition: {
        duration: getResponsiveValue(1.2, 1.5, 2),
        ease: "easeInOut",
        delay: getResponsiveValue(0.2, 0.3, 0.5)
      }
    }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: getResponsiveValue(0.05, 0.1, 0.2),
        delayChildren: getResponsiveValue(0.05, 0.1, 0.2)
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        minHeight: '100vh',
        color: 'white',
        padding: getResponsiveValue('1rem 0', '1.5rem 0', '2rem 0')
      }}
    >
      {/* Animated Background Particles */}
      {[...Array(getResponsiveValue(5, 8, 15))].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={particleFloat}
          animate="animate"
          style={{
            position: 'absolute',
            width: getResponsiveValue('1px', '1.5px', '2px'),
            height: getResponsiveValue('1px', '1.5px', '2px'),
            background: 'radial-gradient(circle, #FF6B35, transparent)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 0
          }}
        />
      ))}

      {/* Orbiting Elements */}
      <motion.div
        variants={orbitAnimation}
        animate="animate"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: getResponsiveValue('100px', '200px', '300px'),
          height: getResponsiveValue('100px', '200px', '300px'),
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: `${Math.sin(i * Math.PI / 2) * getResponsiveValue(50, 100, 150)}px`,
              left: `${Math.cos(i * Math.PI / 2) * getResponsiveValue(50, 100, 150)}px`,
              fontSize: getResponsiveValue('0.6rem', '0.9rem', '1.2rem'),
              opacity: 0.2,
              color: '#FF6B35'
            }}
          >
            <FaEgg />
          </motion.div>
        ))}
      </motion.div>

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: getResponsiveValue('0 16px', '0 24px', '0 32px'),
        position: 'relative',
        zIndex: 2
      }}>
        {/* Hero Section */}
        <div className="relative" style={{ marginBottom: getResponsiveValue('1.5rem', '2rem', '3rem') }}>
          <motion.div
            variants={textReveal}
            style={{
              position: 'relative',
              overflow: 'hidden',
              width: 'fit-content',
              margin: '0 auto'
            }}
          >
            <h1 style={{ 
              fontSize: getResponsiveValue('2rem', '2.5rem', '3.5rem'),
              fontWeight: 900,
              marginBottom: getResponsiveValue('0.25rem', '0.3rem', '0.5rem'),
              background: 'linear-gradient(45deg, #FF6B35, #FFD166, #FF6B35)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              textAlign: 'center',
              lineHeight: 1.2,
              paddingTop: getResponsiveValue('0.5rem', '0.75rem', '1rem')
            }}>
              <motion.span
                variants={shimmerEffect}
                animate="visible"
                initial="hidden"
              >
                Our Story
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.div
            variants={typingEffect}
            style={{
              height: getResponsiveValue('2px', '2.5px', '3px'),
              background: 'linear-gradient(90deg, transparent, #FF6B35, transparent)',
              margin: getResponsiveValue('0.5rem auto', '0.75rem auto', '1rem auto'),
              width: getResponsiveValue('120px', '180px', '250px')
            }}
          />
        </div>

        {/* Main Content with Responsive Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('1fr', '1fr', '1fr 1fr'),
          gap: getResponsiveValue('1.5rem', '2rem', '3rem'),
          alignItems: 'center',
          marginBottom: getResponsiveValue('2rem', '3rem', '5rem')
        }}>
          {/* Left Column - Image */}
          <motion.div
            variants={scaleInWithGlow}
            style={{
              position: 'relative',
              order: getResponsiveValue(2, 2, 1)
            }}
          >
            <motion.div
              variants={floatingCard}
              animate="animate"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: getResponsiveValue('12px', '14px', '18px'),
                transformStyle: 'preserve-3d'
              }}
            >
              <img 
                src={locationImage}
                alt="Egg ATM Store"
                style={{
                  width: '100%',
                  height: getResponsiveValue('250px', '350px', '400px'),
                  objectFit: 'cover',
                  borderRadius: getResponsiveValue('12px', '14px', '18px'),
                  filter: 'brightness(1.1) contrast(1.1)'
                }}
              />
              
              {/* Holographic Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 209, 102, 0.1))',
                mixBlendMode: 'overlay',
                borderRadius: getResponsiveValue('12px', '14px', '18px')
              }} />
              
              {/* Reflective Border */}
              <div style={{
                position: 'absolute',
                top: '-1px',
                left: '-1px',
                right: '-1px',
                bottom: '-1px',
                background: 'linear-gradient(45deg, #FF6B35, #FFD166, #FF6B35)',
                borderRadius: getResponsiveValue('13px', '15px', '19px'),
                zIndex: -1,
                filter: 'blur(4px)',
                opacity: 0.4
              }} />
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={glassSlideUp}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: getResponsiveValue('12px', '14px', '18px'),
              padding: getResponsiveValue('1rem', '1.5rem', '2rem'),
              position: 'relative',
              overflow: 'hidden',
              order: getResponsiveValue(1, 1, 2)
            }}
          >
            {/* Corner Accents */}
            <div style={{
              position: 'absolute',
              top: getResponsiveValue('8px', '10px', '15px'),
              left: getResponsiveValue('8px', '10px', '15px'),
              width: getResponsiveValue('20px', '25px', '35px'),
              height: getResponsiveValue('20px', '25px', '35px'),
              borderTop: '2px solid #FF6B35',
              borderLeft: '2px solid #FF6B35'
            }} />
            <div style={{
              position: 'absolute',
              bottom: getResponsiveValue('8px', '10px', '15px'),
              right: getResponsiveValue('8px', '10px', '15px'),
              width: getResponsiveValue('20px', '25px', '35px'),
              height: getResponsiveValue('20px', '25px', '35px'),
              borderBottom: '2px solid #FF6B35',
              borderRight: '2px solid #FF6B35'
            }} />
            
            <h2 style={{ 
              fontSize: getResponsiveValue('1.25rem', '1.75rem', '2.5rem'),
              fontWeight: 700,
              marginBottom: getResponsiveValue('0.75rem', '1rem', '1.5rem'),
              background: 'linear-gradient(45deg, #fff, #FFD166)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.3
            }}>
              Egg-cellent <span style={{ color: '#FF6B35' }}>Journey</span>
            </h2>
            
            <p style={{ 
              fontSize: getResponsiveValue('0.9rem', '1rem', '1.1rem'),
              lineHeight: getResponsiveValue(1.5, 1.6, 1.7),
              marginBottom: getResponsiveValue('0.75rem', '1rem', '1.5rem'),
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Born from a simple idea in 2025, <strong style={{ color: '#FFD166' }}>Egg! ATM</strong> revolutionized 
              late-night snacking with our unique approach to egg-based delicacies.
            </p>
            
            <motion.p
              whileHover={{ 
                x: getResponsiveValue(3, 5, 10),
                borderLeftColor: '#FFD166'
              }}
              style={{ 
                fontSize: getResponsiveValue('0.85rem', '0.9rem', '1rem'),
                lineHeight: getResponsiveValue(1.5, 1.5, 1.6),
                color: 'rgba(255, 255, 255, 0.7)',
                paddingLeft: getResponsiveValue('0.5rem', '0.75rem', '1.25rem'),
                borderLeft: '2px solid #FF6B35',
                marginBottom: getResponsiveValue('0.75rem', '1rem', '1.5rem'),
                transition: 'all 0.3s ease'
              }}
            >
              What began as a humble street stall has evolved into an innovative culinary 
              movement, spreading joy one egg at a time across multiple cities.
            </motion.p>
          </motion.div>
        </div>

        {/* Core Values - Responsive Layout */}
        <motion.div
          variants={glassSlideUp}
          style={{
            marginTop: getResponsiveValue('2rem', '2.5rem', '3.5rem')
          }}
        >
          <h2 style={{ 
            textAlign: 'center',
            fontSize: getResponsiveValue('1.5rem', '2rem', '2.5rem'),
            fontWeight: 800,
            marginBottom: getResponsiveValue('1.5rem', '2rem', '3rem'),
            background: 'linear-gradient(45deg, #FF6B35, #FFD166)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Our Philosophy
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue(
              '1fr',
              'repeat(2, 1fr)',
              'repeat(4, 1fr)'
            ),
            gap: getResponsiveValue('1rem', '1.25rem', '1.5rem'),
            position: 'relative'
          }}>
            {[
              {
                icon: <GiEggPod size={getResponsiveValue(20, 25, 35)} />,
                title: "Craft",
                desc: "Artisanal egg preparation techniques",
                color: "#FF6B35"
              },
              {
                icon: <MdAccessTime size={getResponsiveValue(20, 25, 35)} />,
                title: "Timing",
                desc: "Perfectly served when you need it most",
                color: "#FFD166"
              },
              {
                icon: <IoLocationOutline size={getResponsiveValue(20, 25, 35)} />,
                title: "Reach",
                desc: "Accessible excellence in every corner",
                color: "#06D6A0"
              },
              {
                icon: <FaFire size={getResponsiveValue(20, 25, 35)} />,
                title: "Flavor",
                desc: "Bold, unforgettable taste experiences",
                color: "#EF476F"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={glassSlideUp}
                custom={index}
                whileHover={{ 
                  scale: getResponsiveValue(1.02, 1.05, 1.07),
                  rotateY: getResponsiveValue(2, 4, 8),
                  boxShadow: getResponsiveValue(
                    '0 5px 15px rgba(0,0,0,0.1)',
                    '0 8px 20px rgba(0,0,0,0.15)',
                    '0 10px 25px rgba(0,0,0,0.2)'
                  )
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: getResponsiveValue('10px', '12px', '16px'),
                  padding: getResponsiveValue('1rem', '1.25rem', '2rem'),
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, getResponsiveValue(1.02, 1.05, 1.1), 1]
                  }}
                  transition={{
                    duration: getResponsiveValue(4, 6, 8),
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    top: '-40%',
                    left: '-40%',
                    right: '-40%',
                    bottom: '-40%',
                    background: `radial-gradient(circle, ${value.color}15, transparent 60%)`,
                    zIndex: -1
                  }}
                />
                
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: getResponsiveValue(0.3, 0.35, 0.4) }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: getResponsiveValue('45px', '55px', '70px'),
                    height: getResponsiveValue('45px', '55px', '70px'),
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    marginBottom: getResponsiveValue('0.5rem', '0.75rem', '1.25rem'),
                    border: `1.5px solid ${value.color}`
                  }}
                >
                  <div style={{ color: value.color }}>
                    {value.icon}
                  </div>
                </motion.div>
                
                <h3 style={{ 
                  fontSize: getResponsiveValue('1rem', '1.25rem', '1.5rem'),
                  fontWeight: 700,
                  marginBottom: getResponsiveValue('0.4rem', '0.5rem', '0.75rem'),
                  color: 'white'
                }}>
                  {value.title}
                </h3>
                
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: getResponsiveValue('0.8rem', '0.85rem', '0.95rem'),
                  lineHeight: getResponsiveValue(1.4, 1.4, 1.5)
                }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          variants={glassSlideUp}
          style={{
            marginTop: getResponsiveValue('2rem', '3rem', '5rem'),
            padding: getResponsiveValue('1rem', '2rem', '3rem'),
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: getResponsiveValue('12px', '18px', '25px'),
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <h2 style={{ 
            textAlign: 'center',
            fontSize: getResponsiveValue('1.5rem', '2rem', '2.5rem'),
            fontWeight: 800,
            marginBottom: getResponsiveValue('1.5rem', '2rem', '3rem'),
            background: 'linear-gradient(45deg, #FFD166, #FF6B35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Our Evolution
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: getResponsiveValue('column', 'row', 'row'),
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: getResponsiveValue('2rem', '0', '0'),
            position: 'relative'
          }}>
            {/* Timeline Line */}
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: getResponsiveValue('20%', '15%', '10%'),
                right: getResponsiveValue('20%', '15%', '10%'),
                height: '1.5px',
                background: 'linear-gradient(90deg, #FF6B35, #FFD166, #FF6B35)',
                transform: 'translateY(-50%)'
              }} />
            )}
            
            {[
              { year: "2024", event: "First Egg! ATM Launched", icon: <FaEgg /> },
              { year: "2025", event: "10 Locations Nationwide", icon: <IoFastFoodOutline /> },
              { year: "Present", event: "Culinary Innovation Hub", icon: <IoSparkles /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: getResponsiveValue(1.02, 1.05, 1.1) }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  zIndex: 2,
                  width: getResponsiveValue('100%', 'auto', 'auto')
                }}
              >
                <div style={{
                  width: getResponsiveValue('25px', '30px', '35px'),
                  height: getResponsiveValue('25px', '30px', '35px'),
                  background: 'black',
                  border: '2px solid #FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  marginBottom: getResponsiveValue('0.4rem', '0.5rem', '0.75rem'),
                  color: '#FFD166'
                }}>
                  {item.icon}
                </div>
                <div style={{
                  fontSize: getResponsiveValue('1rem', '1.1rem', '1.3rem'),
                  fontWeight: 700,
                  color: '#FFD166',
                  marginBottom: getResponsiveValue('0.2rem', '0.25rem', '0.3rem')
                }}>
                  {item.year}
                </div>
                <div style={{
                  fontSize: getResponsiveValue('0.8rem', '0.85rem', '0.95rem'),
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: getResponsiveValue('200px', '160px', '140px'),
                  margin: '0 auto',
                  lineHeight: 1.3
                }}>
                  {item.event}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          variants={scaleInWithGlow}
          style={{
            marginTop: getResponsiveValue('2rem', '3rem', '4rem'),
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 209, 102, 0.1))',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: getResponsiveValue('1.25rem', '1.75rem', '2.5rem'),
            borderRadius: getResponsiveValue('12px', '18px', '25px'),
            position: 'relative',
            overflow: 'hidden',
            width: getResponsiveValue('100%', 'auto', 'auto'),
            maxWidth: getResponsiveValue('100%', '450px', '500px')
          }}>
            <h3 style={{ 
              fontSize: getResponsiveValue('1.25rem', '1.5rem', '2rem'),
              fontWeight: 700,
              marginBottom: getResponsiveValue('0.5rem', '0.75rem', '1.25rem'),
              color: 'white',
              lineHeight: 1.3
            }}>
              Taste the Revolution
            </h3>
            
            <p style={{ 
              fontSize: getResponsiveValue('0.9rem', '1rem', '1.1rem'),
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: getResponsiveValue('0.75rem', '1rem', '1.5rem'),
              lineHeight: 1.4
            }}>
              Join thousands of satisfied customers experiencing the future of egg-based snacks
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: getResponsiveValue(
                  '0 0 10px rgba(255, 107, 53, 0.3)',
                  '0 0 15px rgba(255, 107, 53, 0.3)',
                  '0 0 20px rgba(255, 107, 53, 0.4)'
                )
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleVisitUsClick} 
              style={{
                background: 'linear-gradient(45deg, #FF6B35, #FFD166)',
                color: 'black',
                border: 'none',
                padding: getResponsiveValue('0.7rem 1.25rem', '0.85rem 1.75rem', '1rem 2.5rem'),
                fontSize: getResponsiveValue('0.9rem', '0.95rem', '1rem'),
                fontWeight: 700,
                borderRadius: '40px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: getResponsiveValue('0.5px', '0.7px', '1.5px'),
                display: 'inline-flex',
                alignItems: 'center',
                gap: getResponsiveValue('5px', '6px', '8px'),
                width: getResponsiveValue('100%', 'auto', 'auto'),
                justifyContent: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              <GiCookingPot size={getResponsiveValue(14, 16, 18)} /> 
              Visit Us Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;