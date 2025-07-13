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
      experience: '2+ years'
    },
    {
      name: 'JavaScript',
      description: 'Used for full-stack web development, building interactive UIs and server-side applications.',
      category: 'Programming',
      level: 'Advanced',
      experience: '2+ years'
    },
    {
      name: 'Python',
      description: 'Primary language for AI/ML projects, data analysis, and building intelligent systems.',
      category: 'Programming',
      level: 'Expert',
      experience: '3+ years'
    },
    {
      name: 'React.js',
      description: 'Built modern web applications with component-based architecture and state management.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years'
    },
    {
      name: 'Node.js',
      description: 'Developed backend services, REST APIs, and server-side applications.',
      category: 'Web Development',
      level: 'Advanced',
      experience: '2+ years'
    },
    {
      name: 'MongoDB',
      description: 'NoSQL database management for scalable web applications and data storage.',
      category: 'Database',
      level: 'Advanced',
      experience: '2+ years'
    },
    {
      name: 'MySQL',
      description: 'Relational database design and management for structured data applications.',
      category: 'Database',
      level: 'Advanced',
      experience: '2+ years'
    },
    {
      name: 'Machine Learning',
      description: 'Developed AI models for fake news detection, sign language recognition, and predictive analytics.',
      category: 'Machine Learning',
      level: 'Expert',
      experience: '2+ years'
    },
    {
      name: 'Deep Learning',
      description: 'Built CNN models using ResNet50 for image classification with 99.96% accuracy.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '2+ years'
    },
    {
      name: 'NLP',
      description: 'Developed question-answering systems using RoBERTa and context-aware text processing.',
      category: 'Machine Learning',
      level: 'Advanced',
      experience: '1+ years'
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
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
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
              padding: '12px 16px',
              background: 'rgba(248, 250, 252, 0.8)',
              borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
              backdropFilter: 'blur(10px)'
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
                width: '240px',
                background: 'rgba(248, 250, 252, 0.6)',
                borderRight: '1px solid rgba(226, 232, 240, 0.5)',
                padding: '20px 0',
                backdropFilter: 'blur(10px)'
              }}>
                {/* Profile Section */}
                <div style={{
                  padding: '0 20px',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(55, 65, 81, 0.1)',
                    border: '1px solid rgba(55, 65, 81, 0.2)',
                    margin: '0 auto 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151'
                  }}>
                    <User size={20} strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '4px'
                  }}>
                    Dev Purvam
                  </p>
                </div>

                {/* Categories */}
                <div className="categories" style={{ padding: '0 12px' }}>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#64748b',
                    marginBottom: '12px',
                    padding: '0 8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Categories
                  </p>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.name}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveCategory(category.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          background: activeCategory === category.name
                            ? 'rgba(55, 65, 81, 0.1)'
                            : 'transparent',
                          color: activeCategory === category.name ? '#374151' : '#64748b',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '4px'
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
                className="macos-scrollbar advanced-skills-content"
                style={{
                  flex: 1,
                  padding: '24px',
                  overflowY: 'auto',
                  height: '100%'
                }}
              >
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
                  <div style={{ display: 'grid', gap: '12px' }} className="grid-cols-1 sm:grid-cols-2">
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
                            <div style={{ marginBottom: '12px' }}>
                              <h4 style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '6px' }}>
                                {skill.name}
                              </h4>
                              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
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
  );
};

export default AdvancedSkills;
