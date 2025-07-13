'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  GraduationCap,
  FolderOpen,
  Code,
  Mail,
  Linkedin,
  Github,
  Sun,
  Moon
} from 'lucide-react';

const FloatingSidebar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);


  const navigationItems = useMemo(() => [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: GraduationCap, label: 'Education' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ], []);

  const socialItems = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/purvam-prajapati-b3a15a230' },
    { icon: Mail, label: 'Email', href: 'mailto:prajapatipurvam2003@gmail.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/purvammm' },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isClient, navigationItems]);

  const scrollToSection = (sectionId: string) => {
    if (!isClient) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    if (!isClient) return;
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Magnetic effect calculation
  const calculateMagneticEffect = (index: number, targetIndex: number) => {
    if (hoveredIndex === null) return { x: 0, y: 0, scale: 1 };

    const distance = Math.abs(index - targetIndex);
    const maxDistance = 2; // Effect radius

    if (distance > maxDistance) return { x: 0, y: 0, scale: 1 };

    const strength = 1 - (distance / maxDistance);
    const baseOffset = 15;
    const scaleEffect = 1 + (strength * 0.2);

    if (index === targetIndex) {
      return { x: baseOffset, y: 0, scale: 1.3 };
    }

    const offset = baseOffset * strength * 0.6;
    return { x: offset, y: 0, scale: scaleEffect };
  };

  const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="floating-sidebar glass-morphism hydrated"
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        borderRadius: '25px',
        padding: '20px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'auto'
      }}
    >
      {/* Navigation Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const magneticEffect = calculateMagneticEffect(index, hoveredIndex || -1);

          return (
            <motion.div
              key={item.id}
              style={{ position: 'relative' }}
              animate={{
                x: magneticEffect.x,
                y: magneticEffect.y,
                scale: magneticEffect.scale
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <motion.button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  scale: 1.1,
                  boxShadow: isActive
                    ? '0 8px 25px rgba(236, 72, 153, 0.4)'
                    : '0 6px 20px rgba(0, 0, 0, 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: isActive
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(255, 255, 255, 0.8)',
                  color: isActive ? '#ec4899' : '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive
                    ? '0 4px 12px rgba(236, 72, 153, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Icon size={18} strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          margin: '12px 0',
          width: '32px'
        }}
      />

      {/* Social Links & Theme Toggle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {socialItems.map((item, index) => {
          const Icon = item.icon;
          const socialIndex = navigationItems.length + index;
          const magneticEffect = calculateMagneticEffect(socialIndex, hoveredIndex || -1);

          return (
            <motion.div
              key={index}
              style={{ position: 'relative' }}
              animate={{
                x: magneticEffect.x,
                y: magneticEffect.y,
                scale: magneticEffect.scale
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <motion.a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(socialIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.6)',
                  color: '#374151',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon size={14} strokeWidth={1.5} />
              </motion.a>
            </motion.div>
          );
        })}

        {/* Theme Toggle */}
        <motion.div
          style={{ position: 'relative' }}
          animate={{
            x: calculateMagneticEffect(navigationItems.length + socialItems.length, hoveredIndex || -1).x,
            y: calculateMagneticEffect(navigationItems.length + socialItems.length, hoveredIndex || -1).y,
            scale: calculateMagneticEffect(navigationItems.length + socialItems.length, hoveredIndex || -1).scale
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          <motion.button
            onClick={toggleTheme}
            onMouseEnter={() => setHoveredIndex(navigationItems.length + socialItems.length)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.6)',
              color: '#374151',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {isDarkMode ? <Moon size={14} strokeWidth={1.5} /> : <Sun size={14} strokeWidth={1.5} />}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FloatingSidebar;
