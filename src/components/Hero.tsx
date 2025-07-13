'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

const TypewriterText = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = useMemo(() => [
    'Computer Science Engineer',
    'Software Engineer',
    'AI Enthusiast',
    'Full Stack Developer'
  ], []);

  useEffect(() => {
    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex, isDeleting, texts]);

  return (
    <>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ color: '#1f2937' }}
      >
        |
      </motion.span>
    </>
  );
};

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [socialHoverStates, setSocialHoverStates] = useState<{[key: string]: boolean}>({});
  const [socialMousePositions, setSocialMousePositions] = useState<{[key: string]: {x: number, y: number}}>({});
  const fullText = 'Purvam Prajapati';

  // Predefined particle positions to avoid hydration mismatch
  const particleData = [
    { top: 25, left: 15, duration: 4, delay: 0 },
    { top: 45, left: 85, duration: 3.5, delay: 0.5 },
    { top: 65, left: 20, duration: 4.5, delay: 1 },
    { top: 35, left: 70, duration: 3, delay: 1.5 },
    { top: 75, left: 60, duration: 4.2, delay: 0.3 },
    { top: 55, left: 30, duration: 3.8, delay: 0.8 },
    { top: 80, left: 80, duration: 3.3, delay: 1.2 },
    { top: 30, left: 50, duration: 4.8, delay: 0.2 }
  ];

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!isClient) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isClient]);

  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 150 };
  const cardX = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const cardY = useSpring(useTransform(mouseY, [-300, 300], [-15, 15]), springConfig);
  const cardRotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), springConfig);
  const cardRotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), springConfig);

  // Handle mouse movement for magnetic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        zIndex: 0
      }} />

      {/* Floating Particles */}
      {isClient && particleData.map((particle, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
            borderRadius: '50%',
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            opacity: 0.6
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          {/* Magnetic Card */}
          <motion.div
            ref={cardRef}
            style={{
              x: cardX,
              y: cardY,
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="magnetic-card"
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: isHovered
                  ? '0 40px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  : '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                padding: '0',
                width: '1200px',
                maxWidth: '95vw',
                minHeight: '180px',
                transition: 'box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row'
              }}
              className="hero-card hero-mobile"
            >
              {/* Card Glow Effect */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: '24px',
                  zIndex: 0
                }}
              />

              {/* Left Side - Profile Image */}
              <motion.div
                variants={itemVariants}
                className="hero-left"
                style={{
                  flex: '0 0 320px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2.5rem 1.5rem',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <motion.div
                  className="hero-profile"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                    marginBottom: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 25px 60px rgba(236, 72, 153, 0.3)',
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    rotate: [0, -2, 2, -2, 0]
                  }}
                  transition={{
                    scale: { duration: 0.3, type: "spring", stiffness: 300, damping: 20 },
                    rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    default: { duration: 0.3 }
                  }}
                >
                  {/* Animated Background Particles */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '20%',
                      left: '20%',
                      width: '8px',
                      height: '8px',
                      background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                      borderRadius: '50%',
                      opacity: 0.6
                    }}
                    animate={{
                      x: [0, 20, -10, 0],
                      y: [0, -15, 10, 0],
                      scale: [1, 1.5, 0.8, 1],
                      opacity: [0.6, 1, 0.4, 0.6]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '60%',
                      right: '25%',
                      width: '6px',
                      height: '6px',
                      background: 'linear-gradient(45deg, #06b6d4, #3b82f6)',
                      borderRadius: '50%',
                      opacity: 0.7
                    }}
                    animate={{
                      x: [0, -15, 12, 0],
                      y: [0, 18, -8, 0],
                      scale: [1, 0.7, 1.3, 1],
                      opacity: [0.7, 0.3, 1, 0.7]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />

                  {/* Developer Logo */}
                  <motion.div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                    animate={{
                      y: [0, -3, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Code Brackets */}
                    <motion.div
                      style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        fontFamily: 'monospace',
                        lineHeight: '1',
                        marginBottom: '0.5rem'
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360
                      }}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                    >
                      {'</>'}
                    </motion.div>

                    {/* Developer Text */}
                    <motion.div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}
                      whileHover={{
                        color: '#ec4899',
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      DEV
                    </motion.div>
                  </motion.div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))',
                      borderRadius: '24px',
                      opacity: 0,
                      zIndex: 1
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>

              {/* Right Side - Content */}
              <motion.div
                variants={itemVariants}
                className="hero-right"
                style={{
                  flex: 1,
                  padding: '2.5rem 3rem 2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >

                {/* "I'm" text */}
                <motion.div
                  className="hero-intro"
                  style={{
                    fontSize: '2rem',
                    fontWeight: '300',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}
                >
                  I&apos;m
                </motion.div>

                {/* Name */}
                <motion.h1
                  className="hero-name"
                  style={{
                    fontSize: '3.2rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    lineHeight: '1.1',
                    marginBottom: '0.8rem'
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ color: '#1f2937' }}
                  >
                    |
                  </motion.span>
                </motion.h1>

                {/* Typing Animation */}
                <motion.div
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '1.2rem',
                    minHeight: '2rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <TypewriterText />
                </motion.div>

                {/* Divider */}
                <div style={{
                  width: '100%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
                  marginBottom: '1rem'
                }} />

                {/* Enhanced Animated Description */}
                <motion.div
                  style={{
                    position: 'relative',
                    marginBottom: '2rem'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {/* Enhanced Rainbow Glow Effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: '-15px',
                      background: 'conic-gradient(from 0deg, #ff0080, #ff8c00, #40e0d0, #9370db, #ff1493, #00ff7f, #1e90ff, #ff0080)',
                      borderRadius: '25px',
                      filter: 'blur(25px)',
                      opacity: 0,
                      zIndex: -1
                    }}
                    animate={{
                      opacity: [0, 0.4, 0.2, 0.6, 0],
                      scale: [0.7, 1.2, 0.9, 1.3, 0.7],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Secondary Glow Layer */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: '-8px',
                      background: 'linear-gradient(45deg, rgba(255, 0, 128, 0.2), rgba(64, 224, 208, 0.2), rgba(255, 140, 0, 0.2), rgba(147, 112, 219, 0.2))',
                      borderRadius: '20px',
                      filter: 'blur(15px)',
                      opacity: 0,
                      zIndex: -1
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [1, 1.1, 1],
                      rotate: [0, -180, -360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />

                  <motion.div
                    style={{
                      fontSize: '1.15rem',
                      color: '#1f2937',
                      lineHeight: '1.6',
                      fontWeight: '500',
                      textAlign: 'center',
                      padding: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Elegant Black Text with Sophisticated Effects */}
                    <motion.span
                      style={{
                        color: '#1f2937',
                        fontWeight: '700',
                        position: 'relative',
                        display: 'inline-block',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                      animate={{
                        textShadow: [
                          '0 2px 4px rgba(0, 0, 0, 0.1)',
                          '0 4px 8px rgba(0, 0, 0, 0.15)',
                          '0 6px 12px rgba(0, 0, 0, 0.2)',
                          '0 4px 8px rgba(0, 0, 0, 0.15)',
                          '0 2px 4px rgba(0, 0, 0, 0.1)'
                        ],
                        letterSpacing: ['0em', '0.02em', '0em', '0.01em', '0em']
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        scale: 1.02,
                        textShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
                        letterSpacing: '0.03em'
                      }}
                    >
                      <motion.span
                        style={{ display: 'inline-block' }}
                        animate={{
                          y: [0, -1, 0, -0.5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Crafting intelligent solutions where code meets creativity.
                      </motion.span>
                    </motion.span>
                    {' '}
                    <motion.span
                      style={{
                        color: '#1f2937',
                        fontWeight: '700',
                        position: 'relative',
                        display: 'inline-block',
                        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                      }}
                      animate={{
                        filter: [
                          'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                          'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
                          'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))',
                          'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))',
                          'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                        ]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                      whileHover={{
                        scale: 1.02,
                        filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25))'
                      }}
                    >
                      <motion.span
                        style={{ display: 'inline-block' }}
                        animate={{
                          y: [0, -0.5, 0, -1, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        Transforming complex problems into elegant digital experiences through AI and full-stack development.
                      </motion.span>
                    </motion.span>

                    {/* Enhanced Rainbow Floating Particles */}
                    {[...Array(6)].map((_, i) => {
                      const colors = [
                        'linear-gradient(45deg, #ff0080, #ff8c00)',
                        'linear-gradient(45deg, #40e0d0, #9370db)',
                        'linear-gradient(45deg, #ff1493, #00ff7f)',
                        'linear-gradient(45deg, #1e90ff, #ff0080)',
                        'linear-gradient(45deg, #ff8c00, #40e0d0)',
                        'linear-gradient(45deg, #9370db, #ff1493)'
                      ];

                      return (
                        <motion.div
                          key={i}
                          style={{
                            position: 'absolute',
                            width: `${4 + i * 0.5}px`,
                            height: `${4 + i * 0.5}px`,
                            background: colors[i],
                            borderRadius: '50%',
                            top: `${15 + i * 15}%`,
                            left: `${5 + i * 15}%`,
                            boxShadow: `0 0 10px ${['#ff0080', '#40e0d0', '#ff1493', '#1e90ff', '#ff8c00', '#9370db'][i]}40`
                          }}
                          animate={{
                            y: [-15, 15, -15],
                            x: [-8, 8, -8],
                            opacity: [0.4, 1, 0.4],
                            scale: [0.6, 1.4, 0.6],
                            rotate: [0, 360, 0],
                            boxShadow: [
                              `0 0 5px ${['#ff0080', '#40e0d0', '#ff1493', '#1e90ff', '#ff8c00', '#9370db'][i]}40`,
                              `0 0 20px ${['#ff0080', '#40e0d0', '#ff1493', '#1e90ff', '#ff8c00', '#9370db'][i]}80`,
                              `0 0 5px ${['#ff0080', '#40e0d0', '#ff1493', '#1e90ff', '#ff8c00', '#9370db'][i]}40`
                            ]
                          }}
                          transition={{
                            duration: 3 + i * 0.3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                          }}
                        />
                      );
                    })}
                  </motion.div>
                </motion.div>

                {/* Achievements Highlight */}
                <motion.div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1.5rem',
                    padding: '2.5rem',
                    background: 'rgba(0, 0, 0, 0.03)',
                    borderRadius: '16px',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    marginBottom: '1rem',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)'
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 35px rgba(0, 0, 0, 0.08)' }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      SOFTWARE ENGINEER
                    </div>
                    <motion.div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '40px',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                      whileHover={{
                        scale: 1.25,
                        filter: 'drop-shadow(0 12px 25px rgba(0, 0, 0, 0.25))',
                        y: -3
                      }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {/* Glow effect behind logo */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          inset: '-8px',
                          background: 'linear-gradient(45deg, rgba(0, 123, 255, 0.3), rgba(0, 200, 255, 0.3))',
                          borderRadius: '12px',
                          filter: 'blur(12px)',
                          opacity: 0,
                          zIndex: -1
                        }}
                        whileHover={{
                          opacity: 1,
                          scale: 1.1
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      <Image
                        src="/tcs-logo.png"
                        alt="TCS Logo"
                        width={80}
                        height={36}
                        priority
                        loading="eager"
                        style={{
                          height: '36px',
                          width: 'auto',
                          objectFit: 'contain',
                          zIndex: 1
                        }}
                      />
                    </motion.div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      CGPA B.TECH CSE
                    </div>
                    <div style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '700', letterSpacing: '0.02em' }}>
                      8.84
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      PROJECTS CREATED
                    </div>
                    <div style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '700', letterSpacing: '0.02em' }}>
                      10+
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                      RESEARCH PUBLICATIONS
                    </div>
                    <div style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: '700', letterSpacing: '0.02em' }}>
                      2+
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links - Outside the card */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '2.5rem',
              width: '100%'
            }}
          >
            {[
              { icon: Linkedin, href: 'https://www.linkedin.com/in/purvam-prajapati-b3a15a230', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:prajapatipurvam2003@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => {
              const isButtonHovered = socialHoverStates[label] || false;
              const mousePosition = socialMousePositions[label] || { x: 0, y: 0 };

              return (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '4rem',
                    height: '4rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    color: '#1f2937',
                    textDecoration: 'none',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  animate={{
                    x: isButtonHovered ? (mousePosition.x - 32) * 0.3 : 0,
                    y: isButtonHovered ? (mousePosition.y - 32) * 0.3 : 0,
                    scale: isButtonHovered ? 1.2 : 1,
                    boxShadow: isButtonHovered
                      ? '0 15px 40px rgba(0, 0, 0, 0.2)'
                      : '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setSocialMousePositions(prev => ({
                      ...prev,
                      [label]: {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                      }
                    }));
                  }}
                  onMouseEnter={() => {
                    setSocialHoverStates(prev => ({ ...prev, [label]: true }));
                  }}
                  onMouseLeave={() => {
                    setSocialHoverStates(prev => ({ ...prev, [label]: false }));
                    setSocialMousePositions(prev => ({ ...prev, [label]: { x: 0, y: 0 } }));
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
