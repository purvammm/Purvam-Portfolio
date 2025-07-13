'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  MapPin,
  BookOpen,
  Mail,
  GraduationCap,
  School,
  Trophy,
  Award
} from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [typingText, setTypingText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const typingTexts = useMemo(() => [
    "Software Engineer",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Problem Solver"
  ], []);

  useEffect(() => {
    if (!isInView) return;

    const currentText = typingTexts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (typingText.length < currentText.length) {
        timeout = setTimeout(() => {
          setTypingText(currentText.slice(0, typingText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (typingText.length > 0) {
        timeout = setTimeout(() => {
          setTypingText(typingText.slice(0, -1));
        }, 50);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [typingText, currentTextIndex, isTyping, isInView, typingTexts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };



  return (
    <section id="about" ref={ref} style={{ padding: '5rem 1rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header Section */}
          <motion.div
            variants={cardVariants}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            <motion.h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#1f2937'
              }}
              className="md:text-4xl"
            >
              About Me
            </motion.h2>

            <motion.p
              style={{
                fontSize: '1rem',
                color: '#6b7280',
                maxWidth: '400px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}
            >
              Building intelligent solutions through code and creativity
            </motion.p>

          </motion.div>

          {/* Compact Cards Grid */}
          <div className="about-cards-grid" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'repeat(10, 70px)',
            gap: '8px',
            padding: '0 1rem'
          }}>

            {/* Name Card - Large */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -6,
                rotateY: 2,
                rotateX: 2,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }
              }}
              whileTap={{
                scale: 0.98
              }}
              style={{
                gridColumn: '1 / 8',
                gridRow: '1 / 3',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}
              >
                Purvam Prajapati
              </h3>
              <motion.div
                style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}
              >
                {typingText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ color: '#1f2937' }}
                >
                  |
                </motion.span>
              </motion.div>
            </motion.div>

            {/* TCS Card - Medium */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.1,
                y: -10,
                rotateY: 8,
                rotateX: 8,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 12
                }
              }}
              whileTap={{
                scale: 0.95
              }}
              style={{
                gridColumn: '8 / 13',
                gridRow: '1 / 3',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '600' }}
              >
                WORKING AT
              </div>
              <Image
                src="/tcs-logo.png"
                alt="TCS Logo"
                width={80}
                height={32}
                style={{
                  height: '32px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </motion.div>

            {/* Location Card - Small */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.15,
                y: -12,
                rotateZ: 3,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 10
                }
              }}
              whileTap={{
                scale: 0.9
              }}
              style={{
                gridColumn: '1 / 4',
                gridRow: '3 / 5',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div>
                <MapPin size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              </div>
              <div
                style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600' }}
              >
                India
              </div>
            </motion.div>

            {/* CGPA Card - Small */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.12,
                y: -10,
                rotateY: 6,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
                transition: {
                  type: "spring",
                  stiffness: 550,
                  damping: 12
                }
              }}
              whileTap={{
                scale: 0.92
              }}
              style={{
                gridColumn: '4 / 7',
                gridRow: '3 / 5',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <div>
                <GraduationCap size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              </div>
              <div
                style={{ fontSize: '1.2rem', color: '#1f2937', fontWeight: 'bold' }}
              >
                8.84
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>CGPA</div>
            </motion.div>

            {/* Projects Card - Medium */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateY: 4,
                rotateX: 4,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                transition: {
                  type: "spring",
                  stiffness: 450,
                  damping: 14
                }
              }}
              whileTap={{
                scale: 0.96
              }}
              style={{
                gridColumn: '7 / 10',
                gridRow: '3 / 5',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <BookOpen size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '1.5rem', color: '#1f2937', fontWeight: 'bold' }}>10+</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>PROJECTS</div>
            </motion.div>

            {/* Research Card - Small */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.15,
                y: -12,
                rotateZ: 3,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 10
                }
              }}
              whileTap={{
                scale: 0.9
              }}
              style={{
                gridColumn: '10 / 13',
                gridRow: '3 / 5',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <Award size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '1.2rem', color: '#1f2937', fontWeight: 'bold' }}>2+</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>RESEARCH</div>
            </motion.div>

            {/* Skills Card - Large */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -6,
                rotateY: 2,
                rotateX: 2,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 16
                }
              }}
              whileTap={{
                scale: 0.98
              }}
              style={{
                gridColumn: '1 / 9',
                gridRow: '5 / 7',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '600' }}>
                SPECIALIZING IN
              </div>
              <div style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: '600', lineHeight: '1.4' }}>
                AI/ML • Full-Stack Development • Research
              </div>
            </motion.div>

            {/* Contact Card - Medium */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateY: 4,
                rotateX: 4,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                transition: {
                  type: "spring",
                  stiffness: 450,
                  damping: 14
                }
              }}
              whileTap={{
                scale: 0.96
              }}
              style={{
                gridColumn: '9 / 13',
                gridRow: '5 / 7',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <Mail size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600' }}>Let&apos;s Connect</div>
            </motion.div>

            {/* Languages Card - Medium */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateY: 4,
                rotateX: 4,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                transition: {
                  type: "spring",
                  stiffness: 450,
                  damping: 14
                }
              }}
              whileTap={{
                scale: 0.96
              }}
              style={{
                gridColumn: '1 / 5',
                gridRow: '7 / 9',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem', fontWeight: '500', letterSpacing: '0.05em' }}>
                LANGUAGES
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['English', 'Hindi', 'Gujarati'].map((lang) => (
                  <span
                    key={lang}
                    style={{
                      color: '#374151',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hobbies Card - Large */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -6,
                rotateY: 2,
                rotateX: 2,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 16
                }
              }}
              whileTap={{
                scale: 0.98
              }}
              style={{
                gridColumn: '5 / 10',
                gridRow: '7 / 9',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem', fontWeight: '500', letterSpacing: '0.05em' }}>
                HOBBIES & INTERESTS
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['Music', 'Art', 'Anime', 'Books'].map((hobby) => (
                  <span
                    key={hobby}
                    style={{
                      color: '#374151',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }}
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education Card - Medium */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateY: 4,
                rotateX: 4,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                transition: {
                  type: "spring",
                  stiffness: 450,
                  damping: 14
                }
              }}
              whileTap={{
                scale: 0.96
              }}
              style={{
                gridColumn: '10 / 13',
                gridRow: '7 / 9',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div>
                <School size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              </div>
              <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '600', textAlign: 'center' }}>
                Charusat
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>University</div>
            </motion.div>

            {/* Skills Card - Large */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -6,
                rotateY: 2,
                rotateX: 2,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 16
                }
              }}
              whileTap={{
                scale: 0.98
              }}
              style={{
                gridColumn: '1 / 8',
                gridRow: '9 / 11',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem', fontWeight: '500', letterSpacing: '0.05em' }}>
                TECHNICAL SKILLS
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', lineHeight: '1.8' }}>
                {[
                  'Java', 'JavaScript', 'Python', 'React.js', 'Node.js', 'MongoDB', 'MySQL', 'Machine Learning'
                ].map((skill, index) => (
                  <span
                    key={skill}
                    style={{
                      color: '#374151',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }}
                  >
                    {skill}
                    {index < 7 && <span style={{ color: '#d1d5db', margin: '0 0.25rem' }}>&bull;</span>}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Creative Thinker Animation Card - Small */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.15,
                y: -12,
                rotateZ: 3,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.18)',
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 10
                }
              }}
              whileTap={{
                scale: 0.95
              }}
              style={{
                gridColumn: '8 / 10',
                gridRow: '9 / 11',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Animated Geometric Shape */}
              <motion.div
                style={{
                  width: '40px',
                  height: '40px',
                  marginBottom: '0.5rem',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Outer rotating ring */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    width: '36px',
                    height: '36px',
                    border: '2px solid transparent',
                    borderTop: '2px solid #8b5cf6',
                    borderRight: '2px solid #ec4899',
                    borderRadius: '50%'
                  }}
                />

                {/* Inner pulsing circle */}
                <motion.div
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#3b82f6']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6'
                  }}
                />

                {/* Orbiting dots */}
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    position: 'absolute',
                    width: '28px',
                    height: '28px'
                  }}
                >
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981'
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#f59e0b'
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -3, 0],
                  color: ['#1f2937', '#8b5cf6', '#ec4899', '#1f2937']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ fontSize: '0.875rem', fontWeight: 'bold', textAlign: 'center' }}
              >
                CREATIVE
              </motion.div>
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.9, 1, 0.9]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ fontSize: '0.75rem', color: '#6b7280' }}
              >
                THINKER
              </motion.div>

              {/* Floating geometric shapes */}
              <motion.div
                animate={{
                  x: [0, 10, -10, 0],
                  y: [0, -5, 5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#8b5cf6',
                  borderRadius: '1px'
                }}
              />

              <motion.div
                animate={{
                  x: [0, -8, 8, 0],
                  y: [0, 8, -8, 0],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#ec4899',
                  borderRadius: '50%'
                }}
              />

              <motion.div
                animate={{
                  x: [0, 5, -5, 0],
                  y: [0, -8, 8, 0],
                  opacity: [0, 0.8, 0],
                  rotate: [0, -90, -180]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '8px',
                  width: '0',
                  height: '0',
                  borderLeft: '3px solid transparent',
                  borderRight: '3px solid transparent',
                  borderBottom: '5px solid #10b981'
                }}
              />
            </motion.div>

            {/* Research Card - Medium */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                scale: 1.08,
                y: -8,
                rotateY: 4,
                rotateX: 4,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                transition: {
                  type: "spring",
                  stiffness: 450,
                  damping: 14
                }
              }}
              whileTap={{
                scale: 0.96
              }}
              style={{
                gridColumn: '10 / 13',
                gridRow: '9 / 11',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <div>
                <Trophy size={24} style={{ color: '#1f2937', marginBottom: '0.5rem' }} />
              </div>
              <div style={{ fontSize: '1rem', color: '#1f2937', fontWeight: 'bold' }}>IEEE</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>SPRINGER</div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

