'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, MapPin, GraduationCap, User, School, Trophy } from 'lucide-react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [draggedCard, setDraggedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Improved drag handling to prevent scroll jerk
    const handleScroll = () => {
      if (draggedCard !== null) {
        setDraggedCard(null);
        // Remove dragging class from body
        document.body.classList.remove('dragging');
      }
    };

    const handleDragStart = () => {
      // Add dragging class to body to prevent scroll
      document.body.classList.add('dragging');
    };

    const handleDragEnd = () => {
      // Remove dragging class from body
      document.body.classList.remove('dragging');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('dragend', handleDragEnd);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('dragend', handleDragEnd);
      // Cleanup: ensure dragging class is removed
      document.body.classList.remove('dragging');
    };
  }, [draggedCard]);

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
      className="experience-section-spacing"
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
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          >
            {!isMobile ? 'Drag the cards around to explore - they\'ll smoothly return to their original position' : 'Tap to explore my professional journey and educational background'}
          </motion.p>



          <div className="experience-grid">
            <style jsx>{`
              @media (max-width: 768px) {
                .experience-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 0.75rem !important;
                  max-width: 100% !important;
                }

                /* Perfect mobile text layout */
                .experience-grid > div {
                  padding: 1rem 0.75rem !important;
                  min-height: 300px !important;
                  max-height: 340px !important;
                  display: flex !important;
                  flex-direction: column !important;
                  justify-content: space-between !important;
                }

                /* Optimize text sizes for mobile 2-column layout with better alignment */
                .experience-grid h3 {
                  font-size: 0.95rem !important;
                  line-height: 1.2 !important;
                  margin-bottom: 0.4rem !important;
                  font-weight: 600 !important;
                  text-align: left !important;
                  word-wrap: break-word !important;
                }

                .experience-grid .period-badge {
                  font-size: 0.7rem !important;
                  padding: 0.2rem 0.4rem !important;
                  margin-bottom: 0.5rem !important;
                  text-align: center !important;
                }

                .experience-grid .company-location {
                  font-size: 0.65rem !important;
                  margin-bottom: 0.5rem !important;
                  text-align: left !important;
                  align-items: center !important;
                  display: flex !important;
                  flex-direction: row !important;
                  gap: 0.2rem !important;
                  overflow: hidden !important;
                }

                .experience-grid .company-location > div {
                  display: flex !important;
                  align-items: center !important;
                  gap: 0.2rem !important;
                  flex-wrap: nowrap !important;
                  overflow: hidden !important;
                  max-width: 100% !important;
                }

                .experience-grid .company-location span {
                  display: inline-flex !important;
                  align-items: center !important;
                  white-space: nowrap !important;
                  line-height: 1 !important;
                  overflow: hidden !important;
                  text-overflow: ellipsis !important;
                  max-width: fit-content !important;
                }

                .experience-grid .company-location img,
                .experience-grid .company-location .company-logo {
                  height: 10px !important;
                  max-width: 30px !important;
                  width: auto !important;
                  object-fit: contain !important;
                }

                .experience-grid .description {
                  flex: 1 !important;
                  margin-bottom: 0.6rem !important;
                  text-align: left !important;
                }

                .experience-grid .description li {
                  font-size: 0.7rem !important;
                  line-height: 1.3 !important;
                  margin-bottom: 0.3rem !important;
                  text-align: left !important;
                  word-wrap: break-word !important;
                }

                .experience-grid .tech-badges {
                  margin-top: auto !important;
                  text-align: left !important;
                  justify-content: flex-start !important;
                }

                .experience-grid .tech-badge {
                  font-size: 0.6rem !important;
                  padding: 0.15rem 0.3rem !important;
                  margin: 0.1rem !important;
                  text-align: center !important;
                }
              }

              @media (max-width: 480px) {
                .experience-grid {
                  grid-template-columns: repeat(2, 1fr) !important;
                  gap: 0.5rem !important;
                }

                .experience-grid > div {
                  padding: 0.75rem 0.6rem !important;
                  min-height: 280px !important;
                  max-height: 320px !important;
                }

                .experience-grid h3 {
                  font-size: 0.85rem !important;
                }

                .experience-grid .period-badge {
                  font-size: 0.65rem !important;
                }

                .experience-grid .company-location {
                  font-size: 0.6rem !important;
                  align-items: center !important;
                  display: flex !important;
                  flex-direction: row !important;
                  gap: 0.15rem !important;
                  overflow: hidden !important;
                  margin-bottom: 0.4rem !important;
                }

                .experience-grid .company-location > div {
                  display: flex !important;
                  align-items: center !important;
                  gap: 0.15rem !important;
                  flex-wrap: nowrap !important;
                  overflow: hidden !important;
                  max-width: 100% !important;
                }

                .experience-grid .company-location span {
                  display: inline-flex !important;
                  align-items: center !important;
                  white-space: nowrap !important;
                  line-height: 1 !important;
                  overflow: hidden !important;
                  text-overflow: ellipsis !important;
                  max-width: fit-content !important;
                }

                .experience-grid .company-location img,
                .experience-grid .company-location .company-logo {
                  height: 8px !important;
                  max-width: 25px !important;
                  width: auto !important;
                  object-fit: contain !important;
                }

                .experience-grid .description li {
                  font-size: 0.65rem !important;
                }

                .experience-grid .tech-badge {
                  font-size: 0.55rem !important;
                }
              }
            `}</style>

            {experiences.map((experience, index) => {
              const Icon = experience.icon;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  drag={!isMobile}
                  dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                  dragElastic={0.1}
                  dragTransition={{
                    bounceStiffness: 600,
                    bounceDamping: 40
                  }}
                  dragMomentum={true}
                  dragPropagation={false}
                  whileHover={{
                    scale: 1.02,
                    y: -4
                  }}
                  whileDrag={{
                    scale: 1.05,
                    rotate: 2,
                    zIndex: 10
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onDragStart={() => {
                    setDraggedCard(index);
                    document.body.classList.add('dragging');
                  }}
                  onDragEnd={() => {
                    setDraggedCard(null);
                    document.body.classList.remove('dragging');
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: '24px',
                    padding: '1.25rem',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
                    cursor: draggedCard === index ? 'grabbing' : 'grab',
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    minHeight: '280px',
                    maxHeight: '320px',
                    // Force drag-friendly properties
                    touchAction: 'none',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                  }}
                  className="drag-test-card"
                  data-dragging={draggedCard === index}
                >
                  {/* Minimal Top Accent */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #f3f4f6, #e5e7eb, #f3f4f6)',
                    borderRadius: '24px 24px 0 0'
                  }} />

                  {/* Minimal Icon */}
                  <motion.div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '18px',
                      background: 'rgba(0, 0, 0, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                      color: '#374151'
                    }}
                    whileHover={{
                      scale: 1.05,
                      background: 'rgba(0, 0, 0, 0.06)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                  </motion.div>

                  {/* Period Badge */}
                  <motion.div
                    className="period-badge"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'rgba(0, 0, 0, 0.04)',
                      color: '#6b7280',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      marginBottom: '0.75rem'
                    }}
                    whileHover={{
                      scale: 1.02,
                      background: 'rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    <Calendar size={10} strokeWidth={1.5} />
                    {experience.period}
                  </motion.div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '0.25rem',
                    lineHeight: '1.3'
                  }}>
                    {experience.title}
                  </h3>

                  {/* Company & Location */}
                  <div className="company-location" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    marginBottom: '0.75rem',
                    color: '#6b7280'
                  }}>
                    <MapPin size={12} strokeWidth={1.5} />
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {experience.companyLogo ? (
                        <motion.img
                          src={experience.companyLogo}
                          alt={experience.company}
                          style={{
                            height: isMobile ? '8px' : '14px',
                            width: 'auto',
                            objectFit: 'contain',
                            maxWidth: isMobile ? '25px' : 'auto'
                          }}
                          className="company-logo"
                          whileHover={{
                            scale: 1.05
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      ) : (
                        <span>{experience.company}</span>
                      )}
                      {isMobile ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                          fontSize: '0.6rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '40px'
                        }}>• {experience.location}</span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>• {experience.location}</span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="description" style={{ marginBottom: '0.75rem', gap: '0.25rem' }}>
                    {experience.description.slice(0, 2).map((item, i) => (
                      <motion.li
                        key={i}
                        style={{
                          color: '#6b7280',
                          marginBottom: '0.25rem',
                          fontSize: '0.75rem',
                          lineHeight: '1.4',
                          paddingLeft: '0.75rem',
                          position: 'relative'
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          top: '0.4rem',
                          width: '3px',
                          height: '3px',
                          background: '#d1d5db',
                          borderRadius: '50%'
                        }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="tech-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {experience.technologies.slice(0, 4).map((tech, i) => (
                      <motion.span
                        key={i}
                        className="tech-badge"
                        style={{
                          background: 'rgba(0, 0, 0, 0.04)',
                          color: '#6b7280',
                          padding: '0.2rem 0.4rem',
                          borderRadius: '10px',
                          fontSize: '0.65rem',
                          fontWeight: '500'
                        }}
                        whileHover={{
                          scale: 1.02,
                          background: 'rgba(0, 0, 0, 0.06)'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.03 * i }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Subtle Drag Indicator - Only show on desktop */}
                  {!isMobile && draggedCard === index && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: '8px',
                        padding: '0.2rem 0.4rem',
                        fontSize: '0.6rem',
                        color: 'white',
                        fontWeight: '500',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'blur(8px)'
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                    >
                      Dragging
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
