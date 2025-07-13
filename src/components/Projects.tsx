'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code, Database, Brain, Globe, Monitor, Smartphone, FileText, Search, Bot } from 'lucide-react';

const Projects = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentProject, setCurrentProject] = useState(0);

  // Function to get appropriate icon for each project
  const getProjectIcon = (title: string, category: string) => {
    if (title.toLowerCase().includes('fake news') || title.toLowerCase().includes('detection')) return Bot;
    if (title.toLowerCase().includes('sign language') || title.toLowerCase().includes('classification')) return Brain;
    if (title.toLowerCase().includes('question') || title.toLowerCase().includes('answering')) return Search;
    if (title.toLowerCase().includes('web') || title.toLowerCase().includes('website')) return Globe;
    if (title.toLowerCase().includes('mobile') || title.toLowerCase().includes('app')) return Smartphone;
    if (title.toLowerCase().includes('database') || title.toLowerCase().includes('sql')) return Database;
    if (title.toLowerCase().includes('api') || title.toLowerCase().includes('backend')) return Code;
    if (category.includes('AI') || category.includes('ML')) return Brain;
    if (category.includes('Web')) return Monitor;
    if (category.includes('Mobile')) return Smartphone;
    return FileText; // Default icon
  };

  const projects = [
    {
      id: '01',
      title: 'Fake News Detection',
      subtitle: 'AI Research Project - Published in Springer',
      description: 'Developed machine learning models including Logistic Regression, Random Forest, and XGBoost to combat online misinformation and improve media credibility.',
      longDescription: 'A comprehensive research project focused on detecting fake news using advanced machine learning algorithms. The project aims to reduce the spread of misinformation and enhance media credibility through automated detection systems.',
      technologies: ['Python', 'Machine Learning', 'Logistic Regression', 'Random Forest', 'XGBoost', 'NLP'],
      github: 'https://github.com/purvammm',
      live: '#',
      featured: true,
      category: 'AI/ML Research',
      year: '2024',
      status: 'Published',
      images: []
    },
    {
      id: '02',
      title: 'Indian Sign Language Classification',
      subtitle: 'CNN Model - Published in IEEE',
      description: 'Achieved 99.96% accuracy using ResNet50 to classify 35 ISL gestures, enhancing accessibility for the deaf community through CNNs and Transfer Learning.',
      longDescription: 'A deep learning project that uses Convolutional Neural Networks and Transfer Learning to recognize Indian Sign Language gestures with exceptional accuracy. This project aims to bridge communication gaps and improve accessibility.',
      technologies: ['Python', 'ResNet50', 'CNN', 'Transfer Learning', 'Deep Learning', 'Computer Vision'],
      github: 'https://github.com/purvammm',
      live: '#',
      featured: true,
      category: 'AI/ML Research',
      year: '2024',
      status: 'Published',
      images: []
    },
    {
      id: '03',
      title: 'Question Answering System',
      subtitle: 'NLP-based Text Processing',
      description: 'Built with RoBERTa for NLP-based context-aware answer extraction from unstructured data with web scraping and Streamlit interface.',
      longDescription: 'An intelligent question-answering system that can process both text documents and web URLs to extract relevant information and provide accurate answers using advanced NLP techniques.',
      technologies: ['Python', 'RoBERTa', 'NLP', 'Streamlit', 'Web Scraping', 'Transformers'],
      github: 'https://github.com/purvammm',
      live: '#',
      featured: false,
      category: 'AI/ML',
      year: '2024',
      status: 'Completed',
      images: []
    },
    {
      id: '04',
      title: 'E-commerce Platform',
      subtitle: 'Full-Stack Web Application',
      description: 'React, Redux, Node.js, MongoDB e-commerce platform with JWT authentication and Stripe payment integration.',
      longDescription: 'A complete e-commerce solution featuring user authentication, product management, shopping cart functionality, secure payment processing, and admin dashboard for inventory management.',
      technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'JWT', 'Stripe'],
      github: 'https://github.com/purvammm',
      live: '#',
      featured: false,
      category: 'Web Development',
      year: '2024',
      status: 'Completed',
      images: []
    },
    {
      id: '05',
      title: 'Task Manager App',
      subtitle: 'React-based Productivity Tool',
      description: 'React-based application with task categorization, priority labels, and responsive UI for efficient task management.',
      longDescription: 'A comprehensive task management solution that helps users organize their work with features like task categorization, priority setting, deadline tracking, and a clean, responsive interface.',
      technologies: ['React', 'JavaScript', 'CSS', 'Local Storage', 'Responsive Design'],
      github: 'https://github.com/purvammm',
      live: '#',
      featured: false,
      category: 'Web Development',
      year: '2023',
      status: 'Completed',
    },
    {
      id: '06',
      title: 'Library Management System',
      subtitle: 'JavaFX Desktop Application',
      description: 'JavaFX GUI application with MySQL backend for inventory and lending automation in library management.',
      longDescription: 'A comprehensive library management system that automates book inventory, member management, lending processes, and generates reports for efficient library operations.',
      technologies: ['Java', 'JavaFX', 'MySQL', 'JDBC', 'GUI Design'],
      github: 'https://github.com/purvammm',
      live: '#',
      featured: false,
      category: 'Desktop Application',
      year: '2023',
      status: 'Completed',
      images: []
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

        // Calculate current project based on scroll position
        const projectWidth = 320; // Updated for smaller cards
        const currentIndex = Math.round(scrollLeft / projectWidth);
        setCurrentProject(Math.min(currentIndex, projects.length - 1));
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [projects.length]);

  const scrollToProject = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const projectWidth = 320; // Updated for smaller cards
      const scrollAmount = direction === 'left' ? -projectWidth : projectWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" ref={ref} style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{
                color: '#000000',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                Projects
              </span>
              <div style={{
                background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                {String(currentProject + 1).padStart(2, '0')}
              </div>
            </div>

            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#1f2937'
            }} className="text-2xl sm:text-3xl md:text-4xl">
              {projects[currentProject]?.title}
            </h2>

            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {projects[currentProject]?.description}
            </p>
          </motion.div>

          {/* Horizontal Scrolling Container */}
          <motion.div variants={itemVariants} style={{ position: 'relative' }}>
            {/* Navigation Arrows */}
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToProject('left')}
                className="projects-navigation"
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <ChevronLeft size={18} strokeWidth={1.5} style={{ color: '#374151' }} />
              </motion.button>
            )}

            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToProject('right')}
                className="projects-navigation"
                style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <ChevronRight size={18} strokeWidth={1.5} style={{ color: '#374151' }} />
              </motion.button>
            )}

            {/* Scrollable Projects Container */}
            <div
              ref={scrollRef}
              style={{
                display: 'flex',
                gap: '2rem',
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollBehavior: 'smooth',
                paddingBottom: '1rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              className="hide-scrollbar horizontal-scroll projects-scroll-container"
              onMouseEnter={() => {
                // Add subtle glow effect on hover
                if (scrollRef.current) {
                  scrollRef.current.style.filter = 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.05))';
                }
              }}
              onMouseLeave={() => {
                if (scrollRef.current) {
                  scrollRef.current.style.filter = 'none';
                }
              }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 50, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.03,
                    rotateY: -2,
                    rotateX: 2,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="project-card"
                  style={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    height: '420px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >


                  {/* Project Visual Header */}
                  <div style={{ position: 'relative', height: '180px', background: 'rgba(249, 250, 251, 0.8)', overflow: 'hidden' }}>
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80px',
                        height: '80px',
                        background: 'rgba(55, 65, 81, 0.1)',
                        border: '1px solid rgba(55, 65, 81, 0.2)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#374151',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        zIndex: 2
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {(() => {
                        const IconComponent = getProjectIcon(project.title, project.category);
                        return <IconComponent size={32} strokeWidth={1.5} />;
                      })()}
                    </motion.div>



                    {/* Status Badge */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: project.status === 'Live'
                          ? 'linear-gradient(45deg, #10b981, #059669)'
                          : 'linear-gradient(45deg, #f59e0b, #d97706)',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 3
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.status}
                    </motion.div>

                    {/* Project Number */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: '#374151',
                        padding: '4px 10px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        zIndex: 3
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.id}
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <motion.div
                    style={{ padding: '20px', position: 'relative', zIndex: 1 }}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Category & Year */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <motion.span
                        style={{
                          background: `linear-gradient(45deg, ${
                            index % 4 === 0 ? '#ec4899, #8b5cf6' :
                            index % 4 === 1 ? '#3b82f6, #06b6d4' :
                            index % 4 === 2 ? '#10b981, #059669' :
                            '#f59e0b, #ef4444'
                          })`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          letterSpacing: '0.5px'
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {project.category}
                      </motion.span>
                      <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: '500' }}>
                        {project.year}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <motion.h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '4px',
                        color: '#1f2937',
                        lineHeight: '1.3'
                      }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>

                    <p style={{
                      color: '#6b7280',
                      fontSize: '0.8rem',
                      marginBottom: '12px',
                      fontWeight: '500',
                      lineHeight: '1.4'
                    }}>
                      {project.subtitle}
                    </p>

                    <p style={{
                      color: '#4b5563',
                      fontSize: '0.8rem',
                      lineHeight: '1.5',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <motion.span
                          key={i}
                          style={{
                            background: 'rgba(55, 65, 81, 0.08)',
                            color: '#374151',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            border: '1px solid rgba(55, 65, 81, 0.15)'
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: -1,
                            background: 'rgba(55, 65, 81, 0.12)'
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <motion.span
                          style={{
                            background: 'rgba(107, 114, 128, 0.08)',
                            color: '#6b7280',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.7rem',
                            fontWeight: '500',
                            border: '1px solid rgba(107, 114, 128, 0.1)'
                          }}
                          whileHover={{
                            scale: 1.05,
                            background: 'rgba(107, 114, 128, 0.12)'
                          }}
                        >
                          +{project.technologies.length - 4}
                        </motion.span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <motion.a
                        whileHover={{
                          scale: 1.02,
                          background: 'rgba(107, 114, 128, 0.15)',
                          y: -1
                        }}
                        whileTap={{ scale: 0.98 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'rgba(107, 114, 128, 0.08)',
                          color: '#374151',
                          textDecoration: 'none',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          padding: '6px 12px',
                          borderRadius: '10px',
                          border: '1px solid rgba(107, 114, 128, 0.15)',
                          flex: 1,
                          justifyContent: 'center'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Github size={12} strokeWidth={1.5} />
                        Code
                      </motion.a>

                      <motion.a
                        whileHover={{
                          scale: 1.02,
                          background: 'rgba(17, 24, 39, 0.9)',
                          y: -1
                        }}
                        whileTap={{ scale: 0.98 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'rgba(17, 24, 39, 0.8)',
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(17, 24, 39, 0.3)',
                          flex: 1,
                          justifyContent: 'center'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ExternalLink size={12} strokeWidth={1.5} />
                        Live
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '2rem'
            }}
          >
            {projects.map((_, index) => (
              <div
                key={index}
                style={{
                  width: index === currentProject ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: index === currentProject
                    ? 'linear-gradient(45deg, #ec4899, #8b5cf6)'
                    : 'rgba(107, 114, 128, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (scrollRef.current) {
                    const projectWidth = 320;
                    scrollRef.current.scrollTo({
                      left: index * projectWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
