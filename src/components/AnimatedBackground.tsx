'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    initialX: number;
    initialY: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    setIsClient(true);
    // Delay particle generation to improve initial load
    const timer = setTimeout(() => {
      const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        initialX: Math.random() * 1200,
        initialY: Math.random() * 800,
        duration: Math.random() * 25 + 15,
      }));
      setParticles(generatedParticles);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden'
    }}>
      {/* Main animated gradient background */}
      <motion.div
        animate={isClient ? {
          background: [
            'linear-gradient(45deg, #fdf2f8, #f3e8ff, #dbeafe, #fdf2f8)',
            'linear-gradient(90deg, #f3e8ff, #dbeafe, #fdf2f8, #f3e8ff)',
            'linear-gradient(135deg, #dbeafe, #fdf2f8, #f3e8ff, #dbeafe)',
            'linear-gradient(180deg, #fdf2f8, #f3e8ff, #dbeafe, #fdf2f8)',
          ]
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, #fdf2f8, #f3e8ff, #dbeafe, #fdf2f8)', // Static fallback
        }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3), rgba(236, 72, 153, 0.1), transparent)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 100, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0.1), transparent)',
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.1), transparent)',
          borderRadius: '50%',
          filter: 'blur(35px)',
        }}
      />

      {/* Interactive mouse follower - only render on client */}
      {isClient && (
        <motion.div
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1), transparent)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Floating particles - only render on client */}
      {isClient && particles.map((particle) => (
        <motion.div
          key={particle.id}
          animate={{
            y: [particle.initialY, particle.initialY - 100, particle.initialY],
            x: [particle.initialX, particle.initialX + 50, particle.initialX],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.2, // Use deterministic delay based on id
          }}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'linear-gradient(45deg, #ec4899, #8b5cf6, #3b82f6)',
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Mesh gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
        `,
      }} />

      {/* Subtle noise texture */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.03,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
    </div>
  );
};

export default AnimatedBackground;
