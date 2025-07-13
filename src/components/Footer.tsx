'use client';

import { motion } from 'framer-motion';
import { Heart, Code, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 40%, #ffffff 100%)',
      padding: '1.5rem 1rem 1rem',
      position: 'relative',
      overflow: 'hidden',
      margin: '0',
      border: 'none',
      boxSizing: 'border-box',
      width: '100%',
      minHeight: 'auto'
    }}>
      {/* Smooth Transition Overlay */}
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        width: '100%',
        height: '60px',
        background: 'linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Subtle Background Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.02) 0%, rgba(139, 92, 246, 0.02) 70%, transparent 100%)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.02) 0%, rgba(118, 75, 162, 0.02) 70%, transparent 100%)',
        borderRadius: '50%',
        filter: 'blur(15px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          {/* Main Content */}
          <div style={{ marginBottom: '1rem' }}>
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              <span style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '500',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Crafted with
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#ec4899'
                }}
              >
                <Heart size={16} fill="currentColor" />
              </motion.span>
              <span style={{
                color: '#4b5563',
                fontSize: '0.875rem',
                fontWeight: '500',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                and
              </span>
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  display: 'inline-flex',
                  color: '#8b5cf6'
                }}
              >
                <Code size={16} />
              </motion.span>
            </motion.div>

            <p style={{
              color: '#6b7280',
              fontSize: '0.8rem',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '400',
              lineHeight: '1.5',
              marginBottom: '0.75rem'
            }}>
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>

            <p style={{
              color: '#9ca3af',
              fontSize: '0.75rem',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '400'
            }}>
              © {currentYear} Purvam Prajapati. All rights reserved.
            </p>
          </div>

          {/* Thank You Message */}
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))',
              color: '#7c3aed',
              fontSize: '0.875rem',
              fontWeight: '600',
              fontFamily: 'Inter, system-ui, sans-serif',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <motion.span
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={16} />
            </motion.span>
            Thanks for visiting!
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
