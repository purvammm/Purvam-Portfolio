'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Linkedin, Github, Heart } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contactHoverStates, setContactHoverStates] = useState<{[key: number]: boolean}>({});
  const [contactMousePositions, setContactMousePositions] = useState<{[key: number]: {x: number, y: number}}>({});

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
      id="contact"
      ref={ref}
      style={{
        padding: '2rem 1rem 1.5rem',
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '0.75rem',
              color: '#000000'
            }}
            className="text-xl sm:text-2xl"
          >
            Let&apos;s Connect
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '1.5rem',
              maxWidth: '400px',
              margin: '0 auto 1.5rem',
              fontSize: '0.9rem',
              lineHeight: '1.5'
            }}
          >
            Ready to collaborate? Let&apos;s create something amazing together!
          </motion.p>

          {/* Contact Methods */}
          <motion.div
            variants={itemVariants}
            className="contact-buttons"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              margin: '0 auto'
            }}
          >
            {[
              {
                icon: Mail,
                href: 'mailto:prajapatipurvam2003@gmail.com',
                label: 'Email'
              },
              {
                icon: Linkedin,
                href: 'https://www.linkedin.com/in/purvam-prajapati-b3a15a230',
                label: 'LinkedIn'
              },
              {
                icon: Github,
                href: 'https://github.com/purvammm',
                label: 'GitHub'
              }
            ].map(({ icon: Icon, href, label }, index) => {
              const isButtonHovered = contactHoverStates[index] || false;
              const mousePosition = contactMousePositions[index] || { x: 0, y: 0 };

              return (
                <motion.a
                  key={index}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : '_self'}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60px',
                    height: '60px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid rgba(0, 0, 0, 0.08)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    textDecoration: 'none',
                    color: '#1f2937',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  animate={{
                    x: isButtonHovered ? (mousePosition.x - 30) * 0.4 : 0,
                    y: isButtonHovered ? (mousePosition.y - 30) * 0.4 : 0,
                    scale: isButtonHovered ? 1.3 : 1,
                    boxShadow: isButtonHovered
                      ? '0 20px 50px rgba(0, 0, 0, 0.25)'
                      : '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setContactMousePositions(prev => ({
                      ...prev,
                      [index]: {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                      }
                    }));
                  }}
                  onMouseEnter={() => {
                    setContactHoverStates(prev => ({ ...prev, [index]: true }));
                  }}
                  onMouseLeave={() => {
                    setContactHoverStates(prev => ({ ...prev, [index]: false }));
                    setContactMousePositions(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
                  }}
                  whileTap={{ scale: 0.85 }}
                  title={label}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Minimal Footer */}
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}
            >
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart size={16} fill="#ef4444" color="#ef4444" />
              </motion.div>
              <span>by Purvam Prajapati</span>
            </motion.div>

            <p style={{
              color: '#9ca3af',
              fontSize: '0.75rem',
              margin: 0
            }}>
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
