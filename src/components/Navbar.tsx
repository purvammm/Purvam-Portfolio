'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plus, Terminal } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide navbar based on scroll direction with improved logic
      if (currentScrollY < 50) {
        // Always show at top of page
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsVisible(false);
        setIsOpen(false); // Close mobile menu when hiding
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isClient]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (!isClient) return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    }
  };

  const navContainerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    },
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 10
      }
    }
  };



  const backgroundVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: scrolled ? 1 : 0,
      opacity: scrolled ? 1 : 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', height: '5rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '0 0 16px 16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: 'none'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#1f2937',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <Terminal size={28} strokeWidth={2} />
          </div>
          <div className="hidden md:flex items-center">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              color: '#374151',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <Plus size={24} strokeWidth={2} />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          variants={navbarVariants}
          initial="visible"
          animate="visible"
          exit="hidden"
          className="fixed top-0 left-0 right-0 z-50 navbar-mobile"
          style={{
            background: scrolled
              ? 'rgba(255, 255, 255, 0.95)'
              : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderBottom: scrolled
              ? '1px solid rgba(255, 255, 255, 0.2)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.1)'
              : 'none',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.05), rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.05))',
              zIndex: -1
            }}
          />

          {/* Floating particles effect */}
          {scrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: -1
              }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -10, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                  style={{
                    position: 'absolute',
                    width: '4px',
                    height: '4px',
                    background: `linear-gradient(45deg, ${i === 0 ? '#ec4899' : i === 1 ? '#8b5cf6' : '#3b82f6'}, transparent)`,
                    borderRadius: '50%',
                    left: `${20 + i * 30}%`,
                    top: '50%'
                  }}
                />
              ))}
            </motion.div>
          )}
          <motion.div
            variants={navContainerVariants}
            initial="visible"
            animate="visible"
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 2rem',
              borderRadius: '0 0 16px 16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: 'none'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '5rem',
              padding: '0.5rem 0'
            }}>
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="visible"
                whileHover="hover"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => scrollToSection('#home')}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1f2937',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    background: 'rgba(255, 255, 255, 1)'
                  }}
                >
                  <Terminal size={28} strokeWidth={2} />
                </motion.div>

                {/* Logo glow effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 0.3, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                    borderRadius: '8px',
                    filter: 'blur(8px)',
                    zIndex: -1
                  }}
                />
              </motion.div>

              {/* Desktop Navigation - Expandable Plus Button */}
              <motion.div
                className="hidden md:flex items-center"
                onMouseEnter={() => {
                  console.log('Mouse entered navigation area - isExpanded will be:', true);
                  setIsExpanded(true);
                }}
                onMouseLeave={() => {
                  console.log('Mouse left navigation area - isExpanded will be:', false);
                  setIsExpanded(false);
                }}
                style={{
                  padding: '10px',
                  borderRadius: '20px'
                }}
              >
                {/* Plus Button */}
                <motion.div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <motion.button
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '18px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(15px)',
                      color: '#374151',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    whileHover={{
                      scale: 1.08,
                      background: 'rgba(255, 255, 255, 1)',
                      boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2), 0 6px 15px rgba(59, 130, 246, 0.1)',
                      borderColor: 'rgba(59, 130, 246, 0.2)',
                      y: -2
                    }}
                    whileTap={{
                      scale: 0.96,
                      y: 0
                    }}
                    animate={{
                      rotate: isExpanded ? 45 : 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      duration: 0.4
                    }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: '-2px',
                        background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
                        borderRadius: '20px',
                        filter: 'blur(8px)',
                        opacity: 0,
                        zIndex: -1
                      }}
                      whileHover={{
                        opacity: 1,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      animate={{
                        rotate: isExpanded ? 45 : 0
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Plus size={24} strokeWidth={2.5} />
                    </motion.div>
                  </motion.button>

                  {/* Expanded Navigation Menu */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -30, y: 0 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -30, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                        style={{
                          position: 'absolute',
                          right: '-20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          marginRight: '70px',
                          background: 'rgba(255, 255, 255, 0.98)',
                          backdropFilter: 'blur(25px)',
                          borderRadius: '20px',
                          padding: '16px 20px',
                          display: 'flex',
                          gap: '12px',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          zIndex: 99999,
                          minWidth: 'max-content',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {navItems.map((item, index) => (
                          <motion.button
                            key={item.name}
                            initial={{ opacity: 0, y: 15, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              delay: index * 0.08,
                              duration: 0.4,
                              type: "spring",
                              stiffness: 300,
                              damping: 25
                            }}
                            onClick={() => scrollToSection(item.href)}
                            style={{
                              padding: '14px 24px',
                              borderRadius: '14px',
                              border: '1px solid rgba(0, 0, 0, 0.06)',
                              background: 'rgba(255, 255, 255, 0.9)',
                              color: '#1f2937',
                              fontWeight: '600',
                              fontSize: '0.95rem',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              minHeight: '48px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                            whileHover={{
                              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                              color: '#000000',
                              scale: 1.08,
                              y: -4,
                              border: '1px solid rgba(59, 130, 246, 0.2)',
                              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)',
                              filter: 'brightness(1.05)'
                            }}
                            whileTap={{
                              scale: 0.96,
                              y: -1
                            }}
                          >
                            <motion.span
                              whileHover={{
                                scale: 1.05,
                                letterSpacing: '0.02em'
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.name}
                            </motion.span>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: scrolled ? '#374151' : '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isOpen ? 'close' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    marginTop: '12px',
                    padding: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                  }}
                  className="md:hidden"
                >
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => scrollToSection(item.href)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        margin: '4px 0',
                        color: '#374151',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600"
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '3px',
                          background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                          transformOrigin: 'left'
                        }}
                      />
                      {item.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
