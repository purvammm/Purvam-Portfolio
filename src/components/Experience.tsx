'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, MapPin, GraduationCap, User, School, Trophy } from 'lucide-react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [draggedCard, setDraggedCard] = useState<number | null>(null);

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'Tata Consultancy Services',
      companyLogo: '/tcs-logo.png',
      location: 'India',
      period: '2025 - Present',
      description: [
        'Joined as Software Engineer in 2025',
        'Working on enterprise-level software solutions',
        'Developing scalable applications using modern technologies',
        'Contributing to digital transformation initiatives'
      ],
      technologies: ['Java', 'Spring Boot', 'React', 'Node.js', 'Cloud Technologies', 'Microservices'],
      icon: User,
      gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      color: '#374151'
    },
    {
      title: 'B.Tech in Computer Science and Engineering',
      company: 'Charusat University',
      location: 'India',
      period: '2021 - 2025',
      description: [
        'Graduated with CGPA: 8.84',
        'Specialized in AI/ML and Full-Stack Development',
        'Published research papers in Springer and IEEE',
        'Developed multiple AI models and web applications'
      ],
      technologies: ['Machine Learning', 'Deep Learning', 'Java', 'Python', 'React', 'Node.js'],
      icon: GraduationCap,
      gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      color: '#374151'
    },
    {
      title: '12th ISC Board',
      company: 'SNV International School',
      location: 'India',
      period: '2021',
      description: [
        'Achieved 93% in ISC Board examinations',
        'Strong foundation in Mathematics and Computer Science',
        'Participated in various coding competitions',
        'Developed interest in programming and technology'
      ],
      technologies: ['Mathematics', 'Computer Science', 'Physics', 'Chemistry'],
      icon: Trophy,
      gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      color: '#374151'
    },
    {
      title: '10th ICSE Board',
      company: 'SNV International School',
      location: 'India',
      period: '2019',
      description: [
        'Achieved 94.3% in ICSE Board examinations',
        'Excellent academic performance across all subjects',
        'Active participation in school activities',
        'Built strong analytical and problem-solving skills'
      ],
      technologies: ['Academic Excellence', 'Problem Solving', 'Critical Thinking'],
      icon: School,
      gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      color: '#374151'
    }
  ];

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: '5rem 1rem',
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
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#1f2937'
            }}
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            Experience & Education
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '3rem',
              fontSize: '1rem'
            }}
          >
            Drag the cards around to explore - they&apos;ll smoothly return to their original position
          </motion.p>

          <div className="experience-grid" style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>

            {experiences.map((experience, index) => {
              const Icon = experience.icon;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  drag
                  dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                  dragElastic={0.2}
                  dragTransition={{
                    bounceStiffness: 300,
                    bounceDamping: 20,
                    power: 0.3
                  }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: 3,
                    rotateX: 3,
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                  whileDrag={{
                    scale: 1.08,
                    rotate: [0, 2, -2, 0],
                    boxShadow: '0 25px 50px rgba(102, 126, 234, 0.25)',
                    zIndex: 10,
                    transition: {
                      rotate: { duration: 0.2, repeat: Infinity }
                    }
                  }}
                  onDragStart={() => setDraggedCard(index)}
                  onDragEnd={() => {
                    setDraggedCard(null);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08)',
                    cursor: 'grab',
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                  className="hover:cursor-grab active:cursor-grabbing"
                >
                  {/* Gradient Background */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: experience.gradient,
                    borderRadius: '24px 24px 0 0'
                  }} />

                  {/* Icon */}
                  <motion.div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      color: '#667eea'
                    }}
                    whileHover={{
                      scale: 1.1,
                      background: 'rgba(102, 126, 234, 0.15)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </motion.div>

                  {/* Period Badge */}
                  <motion.div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      background: 'rgba(102, 126, 234, 0.1)',
                      color: '#667eea',
                      padding: '0.375rem 0.75rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}
                    whileHover={{
                      scale: 1.05,
                      background: 'rgba(102, 126, 234, 0.15)'
                    }}
                  >
                    <Calendar size={12} strokeWidth={1.5} />
                    {experience.period}
                  </motion.div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.375rem',
                    lineHeight: '1.3'
                  }}>
                    {experience.title}
                  </h3>

                  {/* Company & Location */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    marginBottom: '1rem',
                    color: '#6b7280'
                  }}>
                    <MapPin size={14} />
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {experience.companyLogo ? (
                        <motion.img
                          src={experience.companyLogo}
                          alt={experience.company}
                          style={{
                            height: '16px',
                            width: 'auto',
                            objectFit: 'contain'
                          }}
                          whileHover={{
                            scale: 1.1,
                            filter: 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ) : (
                        <span>{experience.company}</span>
                      )}
                      <span>• {experience.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul style={{ marginBottom: '1rem', gap: '0.5rem' }}>
                    {experience.description.slice(0, 3).map((item, i) => (
                      <motion.li
                        key={i}
                        style={{
                          color: '#4b5563',
                          marginBottom: '0.5rem',
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                          paddingLeft: '1rem',
                          position: 'relative'
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          top: '0.5rem',
                          width: '4px',
                          height: '4px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: '50%'
                        }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {experience.technologies.slice(0, 6).map((tech, i) => (
                      <motion.span
                        key={i}
                        style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          padding: '0.25rem 0.625rem',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                        whileHover={{
                          scale: 1.05,
                          background: 'rgba(102, 126, 234, 0.15)',
                          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Drag Indicator */}
                  {draggedCard === index && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: 'rgba(102, 126, 234, 0.9)',
                        borderRadius: '6px',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.65rem',
                        color: 'white',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -2, 0]
                      }}
                      transition={{
                        y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      ✨ Dragging
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
