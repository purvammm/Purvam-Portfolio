'use client';

import { motion } from 'framer-motion';

const SkeletonLoader = () => {
  const shimmer = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
    backgroundSize: '200% 100%'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '2rem'
    }}>
      {/* Navbar Skeleton */}
      <motion.div
        style={{
          height: '80px',
          borderRadius: '16px',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.8)',
          backgroundImage: shimmer.background,
          backgroundSize: shimmer.backgroundSize
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Hero Section Skeleton */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {/* Profile Image Skeleton */}
        <motion.div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.1)',
            backgroundImage: shimmer.background,
            backgroundSize: shimmer.backgroundSize
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Name Skeleton */}
        <motion.div
          style={{
            width: '300px',
            height: '40px',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.1)',
            backgroundImage: shimmer.background,
            backgroundSize: shimmer.backgroundSize
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 0.1
          }}
        />

        {/* Description Skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              style={{
                width: index === 0 ? '400px' : '300px',
                height: '20px',
                borderRadius: '4px',
                background: 'rgba(0, 0, 0, 0.1)',
                backgroundImage: shimmer.background,
                backgroundSize: shimmer.backgroundSize
              }}
              animate={{
                backgroundPosition: ['200% 0', '-200% 0']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.2 + index * 0.1
              }}
            />
          ))}
        </div>

        {/* Buttons Skeleton */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '20px',
                background: 'rgba(0, 0, 0, 0.1)',
                backgroundImage: shimmer.background,
                backgroundSize: shimmer.backgroundSize
              }}
              animate={{
                backgroundPosition: ['200% 0', '-200% 0']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: 0.4 + index * 0.1
              }}
            />
          ))}
        </div>
      </div>

      {/* Cards Skeleton */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            style={{
              height: '200px',
              borderRadius: '16px',
              background: 'rgba(0, 0, 0, 0.1)',
              backgroundImage: shimmer.background,
              backgroundSize: shimmer.backgroundSize
            }}
            animate={{
              backgroundPosition: ['200% 0', '-200% 0']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 0.6 + index * 0.1
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
