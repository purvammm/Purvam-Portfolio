'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Zap, Code, Globe, Minimize2, Maximize2, X, Brain, Monitor, Server, User } from 'lucide-react';

const AdvancedSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState('All');

  const contentRef = useRef<HTMLDivElement>(null);



  const categories = [
    { name: 'All', icon: Globe, color: '#374151' },
    { name: 'Programming', icon: Code, color: '#374151' },
    { name: 'Web Development', icon: Monitor, color: '#374151' },
    { name: 'Database', icon: Server, color: '#374151' },
    { name: 'Machine Learning', icon: Brain, color: '#374151' },
  ];

  const favorites = [
    {
      title: 'Python + ML',
      description: 'Machine Learning and AI development using Python with libraries like TensorFlow and PyTorch.',
      category: 'AI/ML Favorite',
      icon: Brain,
      gradient: 'from-gray-500 to-gray-700'
    },
    {
      title: 'MERN Stack',
      description: 'Full-stack web development using MongoDB, Express, React, and Node.js.',
      category: 'Web Development',
      icon: Code,
      gradient: 'from-gray-500 to-gray-700'
    }
  ];

  const skills = [
    {
      name: 'Java',
      description: 'Core programming language used for backend development and building robust applications.',
      category: 'Programming',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg'
    },
    {
      name: 'JavaScript',
      description: 'Used for full-stack web development, building interactive UIs and server-side applications.',
      category: 'Programming',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'
    },
    {
      name: 'Python',
      description: 'Primary language for AI/ML projects, data analysis, and building intelligent systems.',
      category: 'Programming',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
    },
    {
      name: 'React.js',
      description: 'Built modern web applications with component-based architecture and state management.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
    },
    {
      name: 'Node.js',
      description: 'Developed backend services, REST APIs, and server-side applications.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
    },
    {
      name: 'MongoDB',
      description: 'NoSQL database management for scalable web applications and data storage.',
      category: 'Database',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg'
    },
    {
      name: 'MySQL',
      description: 'Relational database design and management for structured data applications.',
      category: 'Database',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg'
    },
    {
      name: 'Machine Learning',
      description: 'Developed AI models for fake news detection, sign language recognition, and predictive analytics.',
      category: 'Machine Learning',
      level: 'Expert',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg'
    },
    {
      name: 'Deep Learning',
      description: 'Built CNN models using ResNet50 for image classification with 99.96% accuracy.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg'
    },
    {
      name: 'NLP',
      description: 'Developed question-answering systems using RoBERTa and context-aware text processing.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg'
    },
    {
      name: 'Next.js',
      description: 'Full-stack React framework for production-ready web applications.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg'
    },
    {
      name: 'TypeScript',
      description: 'Strongly typed JavaScript for better code quality and developer experience.',
      category: 'Programming',
      level: 'Advanced',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
    },
    {
      name: 'Express.js',
      description: 'Fast, unopinionated web framework for Node.js backend development.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg'
    },
    {
      name: 'PostgreSQL',
      description: 'Advanced relational database with powerful features for complex applications.',
      category: 'Database',
      level: 'Intermediate',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
    },
    {
      name: 'Docker',
      description: 'Containerization platform for consistent development and deployment environments.',
      category: 'Programming',
      level: 'Intermediate',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
    },
    {
      name: 'Git',
      description: 'Version control system for tracking changes and collaborative development.',
      category: 'Programming',
      level: 'Advanced',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
    },
    {
      name: 'AWS',
      description: 'Cloud computing platform for scalable and reliable application deployment.',
      category: 'Programming',
      level: 'Intermediate',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg'
    },
    {
      name: 'TensorFlow',
      description: 'Open-source machine learning framework for building and training AI models.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg'
    },
    {
      name: 'PyTorch',
      description: 'Dynamic neural network framework for research and production AI applications.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development.',
      category: 'Web Development',
      level: 'Expert',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
    },
    {
      name: 'VS Code',
      description: 'Primary code editor with extensive customization and debugging capabilities.',
      category: 'Programming',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg'
    },
    {
      name: 'Figma',
      description: 'Design tool for creating user interfaces and collaborative design workflows.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
    },
    {
      name: 'Postman',
      description: 'API development and testing platform for building robust web services.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg'
    },
    {
      name: 'Flask',
      description: 'Lightweight Python web framework for building APIs and web applications.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg'
    },
    {
      name: 'FastAPI',
      description: 'Modern, fast Python web framework for building APIs with automatic documentation.',
      category: 'Web Development',
      level: 'Intermediate',
      experience: '1+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg'
    },
    {
      name: 'Jupyter',
      description: 'Interactive computing environment for data science and machine learning.',
      category: 'Machine Learning',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg'
    },
    {
      name: 'Pandas',
      description: 'Powerful data manipulation and analysis library for Python.',
      category: 'Machine Learning',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg'
    },
    {
      name: 'NumPy',
      description: 'Fundamental package for scientific computing with Python.',
      category: 'Machine Learning',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg'
    },
    {
      name: 'Streamlit',
      description: 'Framework for building and sharing data science web applications.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original.svg'
    },
    {
      name: 'Linux',
      description: 'Unix-like operating system for development and server environments.',
      category: 'Programming',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg'
    },
    {
      name: 'HTML5',
      description: 'Modern markup language for structuring and presenting web content.',
      category: 'Web Development',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
    },
    {
      name: 'CSS3',
      description: 'Styling language for designing responsive and interactive web interfaces.',
      category: 'Web Development',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'
    },
    {
      name: 'C++',
      description: 'High-performance programming language for system programming and competitive coding.',
      category: 'Programming',
      level: 'Advanced',
      experience: '2+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg'
    },
    {
      name: 'GitHub',
      description: 'Version control platform for collaborative software development and project management.',
      category: 'Programming',
      level: 'Expert',
      experience: '3+ years',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg'
    }
  ];

  const learningSkills = [
    { name: 'Advanced AI/ML', description: 'Exploring advanced deep learning architectures and neural networks.' },
    { name: 'Cloud Computing', description: 'Learning AWS and Azure for scalable AI model deployment.' },
    { name: 'DevOps', description: 'Exploring CI/CD pipelines and containerization with Docker.' },
  ];

  const recentSkills = [
    { name: 'ResNet50', description: 'Recently used for ISL classification achieving 99.96% accuracy.' },
    { name: 'RoBERTa', description: 'Implemented for question-answering system with context-aware processing.' },
    { name: 'Streamlit', description: 'Used for creating interactive ML model interfaces and demos.' },
  ];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <>
      <style jsx>{`
        /* Mobile: Always 5 icons per row */
        @media (max-width: 768px) {
          .skills-icons-responsive {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 12px !important;
            padding: 15px 10px !important;
          }

          /* Improve scrolling performance on mobile */
          .skills-scroll-container {
            scroll-behavior: auto !important;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior-y: contain !important;
            transform: translate3d(0, 0, 0) !important;
          }

          /* Reduce motion for better performance */
          .skill-icon-mobile {
            transition: transform 0.15s ease !important;
          }
        }

        @media (max-width: 480px) {
          .skills-icons-responsive {
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 10px !important;
            padding: 12px 8px !important;
          }
        }
      `}</style>
      <section id="skills" ref={ref} style={{ padding: '5rem 1rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#000000'
            }} className="text-2xl sm:text-3xl md:text-4xl">
              My Skill Store
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              A comprehensive collection of technologies I work with
            </p>
          </motion.div>

          {/* macOS Window */}
          <motion.div
            variants={itemVariants}
            className="advanced-skills-window"
            style={{
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
              overflow: 'hidden',
              height: '600px',
              position: 'relative'
            }}
          >
            {/* macOS Window Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              background: 'rgba(248, 250, 252, 0.95)',
              borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
              backdropFilter: 'blur(15px)'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ff5f57'
                }} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#ffbd2e'
                }} />
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#28ca42'
                }} />
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#64748b'
              }}>
                <Globe size={16} />
                Skills Dashboard
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Minimize2 size={12} style={{ color: '#9ca3af' }} strokeWidth={1.5} />
                <Maximize2 size={12} style={{ color: '#9ca3af' }} strokeWidth={1.5} />
                <X size={12} style={{ color: '#9ca3af' }} strokeWidth={1.5} />
              </div>
            </div>

            {/* Window Content */}
            <div className="advanced-skills-container" style={{ display: 'flex', height: 'calc(100% - 49px)' }}>
              {/* Sidebar */}
              <div className="advanced-skills-sidebar" style={{
                width: '260px',
                background: 'rgba(248, 250, 252, 0.8)',
                borderRight: '1px solid rgba(226, 232, 240, 0.8)',
                padding: '24px 0',
                backdropFilter: 'blur(15px)'
              }}>
                {/* Profile Section */}
                <div style={{
                  padding: '0 24px',
                  marginBottom: '28px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(55, 65, 81, 0.08)',
                    border: '1px solid rgba(55, 65, 81, 0.15)',
                    margin: '0 auto 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}>
                    <User size={22} strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    Dev Purvam
                  </p>
                </div>

                {/* Categories */}
                <div className="categories" style={{ padding: '0 16px' }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#64748b',
                    marginBottom: '16px',
                    padding: '0 12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px'
                  }}>
                    Categories
                  </p>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.name}
                        whileHover={{ x: 6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCategory(category.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          width: '100%',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: activeCategory === category.name
                            ? '1px solid rgba(55, 65, 81, 0.2)'
                            : '1px solid transparent',
                          background: activeCategory === category.name
                            ? 'rgba(55, 65, 81, 0.08)'
                            : 'transparent',
                          color: activeCategory === category.name ? '#1f2937' : '#64748b',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '14px',
                          fontWeight: activeCategory === category.name ? '600' : '500',
                          marginBottom: '6px',
                          boxShadow: activeCategory === category.name
                            ? '0 2px 8px rgba(0, 0, 0, 0.05)'
                            : 'none'
                        }}
                      >
                        <Icon size={16} strokeWidth={1.5} />
                        {category.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Main Content Area */}
              <div
                ref={contentRef}
                className="skills-scroll-container"
                style={{
                  flex: 1,
                  padding: '28px 32px',
                  overflowY: 'auto',
                  height: '100%',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth',
                  background: 'rgba(255, 255, 255, 0.3)',
                  // Enhanced scrolling performance
                  willChange: 'scroll-position',
                  transform: 'translateZ(0)',
                  contain: 'layout style paint',
                  overscrollBehavior: 'contain'
                }}
              >
                {/* Technology Icons Section - Now First */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ marginBottom: '32px' }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    color: '#1f2937'
                  }}>
                    Technologies I Work With
                  </h3>

                  {/* Technology Icons Grid - All Devices */}
                  <div
                    className="skills-icons-responsive"
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      padding: '20px 15px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: '15px',
                      justifyItems: 'center'
                    }}
                  >
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-icon-mobile"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease',
                          transform: 'translateZ(0)'
                        }}
                        onMouseEnter={(e) => {
                          const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
                          if (iconContainer) {
                            iconContainer.style.transform = 'translateY(-2px) scale(1.05)';
                            iconContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
                          if (iconContainer) {
                            iconContainer.style.transform = 'translateY(0) scale(1)';
                            iconContainer.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                      >
                        {/* Technology Icon */}
                        <div
                          className="icon-container"
                          style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            style={{
                              width: '32px',
                              height: '32px',
                              objectFit: 'contain',
                              pointerEvents: 'none'
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div style="width: 32px; height: 32px; background: linear-gradient(45deg, #ec4899, #8b5cf6); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">${skill.name.charAt(0)}</div>`;
                            }}
                          />
                        </div>

                        {/* Technology Name */}
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '600',
                          color: '#374151',
                          textAlign: 'center',
                          lineHeight: '1.2',
                          maxWidth: '70px',
                          wordWrap: 'break-word',
                          hyphens: 'auto',
                          fontFamily: 'Inter, system-ui, sans-serif'
                        }}>
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Favorites Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{ marginBottom: '32px' }}
                >
                  <div style={{ display: 'grid', gap: '16px' }} className="grid-cols-1 sm:grid-cols-2">
                    {favorites.map((favorite, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        <Card style={{
                          background: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                        }}>
                          <CardContent style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                              <div style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(55, 65, 81, 0.1)',
                                border: '1px solid rgba(55, 65, 81, 0.2)',
                                borderRadius: '10px',
                                color: '#374151'
                              }}>
                                <favorite.icon size={18} strokeWidth={1.5} />
                              </div>
                              <div>
                                <Badge style={{
                                  background: `linear-gradient(135deg, ${favorite.gradient.split(' ')[1]}, ${favorite.gradient.split(' ')[3]})`,
                                  color: 'white',
                                  marginBottom: '6px',
                                  fontSize: '11px',
                                  fontWeight: '500'
                                }}>
                                  {favorite.category}
                                </Badge>
                                <h3 style={{ fontWeight: '600', fontSize: '16px', color: '#1f2937' }}>
                                  {favorite.title}
                                </h3>
                              </div>
                            </div>
                            <p style={{ color: '#6b7280', lineHeight: '1.5', fontSize: '14px' }}>
                              {favorite.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* All Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    color: '#1f2937'
                  }}>
                    All Skills
                  </h3>
                  {/* Desktop View - Full Cards */}
                  <div style={{ display: 'grid', gap: '12px' }} className="desktop-skills-cards hidden md:grid grid-cols-1 sm:grid-cols-2">
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ y: -2, scale: 1.01 }}
                      >
                        <Card style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease',
                          height: '100%',
                          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
                        }}>
                          <CardContent style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                              {/* Technology Icon */}
                              <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                              }}>
                                <img
                                  src={skill.icon}
                                  alt={`${skill.name} icon`}
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    objectFit: 'contain'
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement!.innerHTML = `<div style="width: 24px; height: 24px; background: linear-gradient(45deg, #ec4899, #8b5cf6); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">${skill.name.charAt(0)}</div>`;
                                  }}
                                />
                              </div>

                              {/* Skill Info */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <h4 style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '6px' }}>
                                  {skill.name}
                                </h4>
                                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                  <Badge style={{
                                    background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                                    color: 'white',
                                    fontSize: '10px',
                                    fontWeight: '500'
                                  }}>
                                    {skill.level}
                                  </Badge>
                                  <Badge variant="secondary" style={{
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    fontSize: '10px',
                                    fontWeight: '500'
                                  }}>
                                    {skill.experience}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.4' }}>
                              {skill.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Learning Skills Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{ marginTop: '32px' }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    color: '#1f2937'
                  }}>
                    Installing / Currently Learning
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }} className="md:grid-cols-3">
                    {learningSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                      >
                        <Card style={{
                          background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.08))',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(236, 72, 153, 0.15)',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease'
                        }}>
                          <CardContent style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Zap size={14} style={{ color: '#374151' }} strokeWidth={1.5} />
                              <h4 style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{skill.name}</h4>
                            </div>
                            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: '1.4' }}>
                              {skill.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Recently Used Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  style={{ marginTop: '24px', marginBottom: '24px' }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    color: '#1f2937'
                  }}>
                    Recently Used
                  </h3>
                  <div style={{ display: 'grid', gap: '12px' }} className="md:grid-cols-3">
                    {recentSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                      >
                        <Card style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08))',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(59, 130, 246, 0.15)',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease'
                        }}>
                          <CardContent style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <Star size={14} style={{ color: '#374151' }} strokeWidth={1.5} />
                              <h4 style={{ fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>{skill.name}</h4>
                            </div>
                            <p style={{ color: '#6b7280', fontSize: '12px', lineHeight: '1.4' }}>
                              {skill.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>


    </section>
    </>
  );
};

export default AdvancedSkills;
