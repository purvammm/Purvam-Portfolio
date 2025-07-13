'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Code, BookOpen, Coffee, Plane, ChefHat, TrendingUp, Github, Zap, Heart, Star } from 'lucide-react';

const InteractiveCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const cardVariants = {
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
    <section ref={ref} style={{ padding: '3rem 1rem', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3
            variants={cardVariants}
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '2rem',
              background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center'
            }}
          >
            About Section
          </motion.h3>

          <motion.p
            variants={cardVariants}
            style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem', 
              textAlign: 'center',
              color: '#1f2937'
            }}
            className="md:text-3xl"
          >
            Focused on function. Driven by design.
          </motion.p>

          <motion.div
            variants={cardVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}
          >
            <Badge
              variant="secondary"
              style={{
                background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                color: 'white',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: 'none'
              }}
            >
              Hover me
            </Badge>
            <p style={{
              color: '#6b7280',
              fontSize: '1.125rem',
              textAlign: 'center'
            }}>
              I design and develop meaningful digital experiences that blend creativity with functionality.
            </p>
          </motion.div>

          {/* Special Hover Card */}
          <motion.div
            variants={cardVariants}
            style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              onHoverStart={() => setHoveredCard('special')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <Card style={{
                width: '300px',
                height: '200px',
                background: hoveredCard === 'special'
                  ? 'linear-gradient(135deg, #ec4899, #8b5cf6)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: hoveredCard === 'special' ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.5s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: hoveredCard === 'special'
                  ? '0 20px 40px rgba(236, 72, 153, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              className={hoveredCard === 'special' ? 'shadow-2xl shadow-pink-500/50' : ''}
              >
                <CardContent style={{
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <motion.div
                    animate={hoveredCard === 'special' ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Zap
                      size={40}
                      style={{
                        color: hoveredCard === 'special' ? 'white' : '#ec4899',
                        marginBottom: '1rem'
                      }}
                    />
                  </motion.div>
                  <h4 style={{
                    fontWeight: '600',
                    color: hoveredCard === 'special' ? 'white' : '#1f2937',
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem'
                  }}>
                    Interactive Magic
                  </h4>
                  <p style={{
                    color: hoveredCard === 'special' ? 'rgba(255,255,255,0.9)' : '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    {hoveredCard === 'special'
                      ? '✨ You found the magic! This is how I bring designs to life.'
                      : 'Hover over me to see the magic happen!'
                    }
                  </p>
                </CardContent>

                {/* Animated background particles */}
                {hoveredCard === 'special' && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, Math.random() * 200 - 100],
                          y: [0, Math.random() * 200 - 100]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        style={{
                          position: 'absolute',
                          width: '4px',
                          height: '4px',
                          background: 'white',
                          borderRadius: '50%',
                          top: '50%',
                          left: '50%',
                          zIndex: 1
                        }}
                      />
                    ))}
                  </>
                )}
              </Card>
            </motion.div>
          </motion.div>

          {/* Interactive Cards Grid */}
          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gridAutoRows: 'auto'
          }} className="md:grid-cols-3 lg:grid-cols-4">
            
            {/* Profile Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredCard('profile')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1', gridRow: 'span 2' }}
              className="md:col-span-1 md:row-span-2"
            >
              <Card style={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              className={hoveredCard === 'profile' ? 'shadow-xl shadow-pink-500/20' : ''}
              >
                <CardContent style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    😊
                  </motion.div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>That&apos;s me</p>
                  <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>Your Name</h4>
                  <p style={{
                    background: 'linear-gradient(45deg, #ec4899, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>Full Stack Developer</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    <MapPin size={14} />
                    <span>San Francisco, CA</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              variants={cardVariants}
              onHoverStart={() => setHoveredCard('experience')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1' }}
            >
              <Card style={{ 
                height: '100%', 
                background: '#1f2937', 
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'experience' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Calendar className="text-cyan-400" size={20} />
                    <h4 style={{ fontWeight: '600', color: 'white' }}>Experience</h4>
                  </div>
                  <p style={{ color: '#06b6d4', fontWeight: '600', fontSize: '1.5rem', marginBottom: '0.5rem' }}>3+</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Years of Development</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              variants={cardVariants}
              onHoverStart={() => setHoveredCard('projects')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1' }}
            >
              <Card style={{ 
                height: '100%', 
                background: '#1f2937', 
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'projects' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Code className="text-cyan-400" size={20} />
                    <h4 style={{ fontWeight: '600', color: 'white' }}>Projects</h4>
                  </div>
                  <p style={{ color: '#06b6d4', fontWeight: '600', fontSize: '1.5rem', marginBottom: '0.5rem' }}>50+</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Completed Projects</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Free Time Highlights */}
            <motion.div
              variants={cardVariants}
              onHoverStart={() => setHoveredCard('freetime')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 2' }}
              className="md:col-span-2"
            >
              <Card style={{ 
                height: '100%', 
                background: '#1f2937', 
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'freetime' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: 'white' }}>🧠 Free Time Highlights</h4>
                  <div style={{ display: 'grid', gap: '1rem' }} className="md:grid-cols-2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Github className="text-cyan-400" size={16} />
                      <div>
                        <p style={{ color: '#06b6d4', fontWeight: '600' }}>LeetCode →</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>500+ DSA Problems Solved</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <BookOpen className="text-cyan-400" size={16} />
                      <div>
                        <p style={{ color: '#06b6d4', fontWeight: '600' }}>Medium →</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>15+ Blogs Written</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* What I Do Card */}
            <motion.div
              variants={cardVariants}
              onHoverStart={() => setHoveredCard('whatido')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 2' }}
              className="md:col-span-2"
            >
              <Card style={{ 
                height: '100%', 
                background: '#1f2937', 
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'whatido' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: 'white' }}>💼 What I Do</h4>
                  <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
                    Specialized in building responsive web & mobile interfaces using React, Next.js, and modern JavaScript frameworks.
                    I focus on creating seamless user experiences with clean, maintainable code.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Beyond Code Card */}
            <motion.div
              variants={cardVariants}
              onHoverStart={() => setHoveredCard('beyond')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 2' }}
              className="md:col-span-2"
            >
              <Card style={{ 
                height: '100%', 
                background: '#1f2937', 
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'beyond' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: 'white' }}>✨ Beyond Code</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Plane className="text-cyan-400" size={16} />
                      <span style={{ color: '#9ca3af' }}>Travel lover exploring new places</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <ChefHat className="text-cyan-400" size={16} />
                      <span style={{ color: '#9ca3af' }}>Enjoy cooking and trying new recipes</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <TrendingUp className="text-cyan-400" size={16} />
                      <span style={{ color: '#9ca3af' }}>Read finance books & investing guides</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Currently Learning Card */}
            <motion.div
              variants={cardVariants}
              onHoverStart={() => setHoveredCard('learning')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1' }}
            >
              <Card style={{ 
                height: '100%', 
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'learning' ? 'shadow-xl shadow-cyan-400/40 scale-105' : ''}
              >
                <CardContent style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <BookOpen size={32} style={{ color: 'white', marginBottom: '1rem' }} />
                  <h4 style={{ fontWeight: '600', color: 'white', marginBottom: '0.5rem' }}>📚 Currently Learning</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>AI/ML & Cloud Architecture</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Coffee Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredCard('coffee')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1' }}
            >
              <Card style={{
                height: '100%',
                background: '#1f2937',
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'coffee' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <motion.div
                    animate={hoveredCard === 'coffee' ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Coffee className="text-cyan-400" size={32} style={{ marginBottom: '1rem' }} />
                  </motion.div>
                  <p style={{ color: '#06b6d4', fontWeight: '600', fontSize: '1.5rem', marginBottom: '0.5rem' }}>∞</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Cups of Coffee</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredCard('education')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1' }}
            >
              <Card style={{
                height: '100%',
                background: '#1f2937',
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'education' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: 'white' }}>🎓 Education</h4>
                  <p style={{ color: '#06b6d4', fontWeight: '600', marginBottom: '0.5rem' }}>B.Tech in Computer Science</p>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>2019 – 2023</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Favorite Tech Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredCard('tech')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 2' }}
              className="md:col-span-2"
            >
              <Card style={{
                height: '100%',
                background: '#1f2937',
                border: '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'tech' ? 'shadow-xl shadow-cyan-400/20 border-cyan-400/50' : ''}
              >
                <CardContent style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Star className="text-cyan-400" size={20} />
                    <h4 style={{ fontWeight: '600', color: 'white' }}>Favorite Tech Stack</h4>
                  </div>
                  <div style={{ display: 'grid', gap: '0.75rem' }} className="md:grid-cols-2">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Badge variant="secondary" style={{ background: '#374151', color: '#06b6d4' }}>
                        Web Favorite
                      </Badge>
                      <div>
                        <p style={{ color: '#06b6d4', fontWeight: '600' }}>MERN Stack</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Full-stack JavaScript development</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Badge variant="secondary" style={{ background: '#374151', color: '#06b6d4' }}>
                        Mobile Favorite
                      </Badge>
                      <div>
                        <p style={{ color: '#06b6d4', fontWeight: '600' }}>React Native</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Cross-platform mobile apps</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Passion Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              onHoverStart={() => setHoveredCard('passion')}
              onHoverEnd={() => setHoveredCard(null)}
              style={{ gridColumn: 'span 1' }}
            >
              <Card style={{
                height: '100%',
                background: hoveredCard === 'passion'
                  ? 'linear-gradient(135deg, #ef4444, #f97316)'
                  : '#1f2937',
                border: hoveredCard === 'passion' ? 'none' : '1px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              className={hoveredCard === 'passion' ? 'shadow-xl shadow-red-400/40' : ''}
              >
                <CardContent style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <motion.div
                    animate={hoveredCard === 'passion' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6, repeat: hoveredCard === 'passion' ? Infinity : 0 }}
                  >
                    <Heart
                      size={32}
                      style={{
                        color: hoveredCard === 'passion' ? 'white' : '#ef4444',
                        marginBottom: '1rem'
                      }}
                    />
                  </motion.div>
                  <h4 style={{
                    fontWeight: '600',
                    color: hoveredCard === 'passion' ? 'white' : 'white',
                    marginBottom: '0.5rem'
                  }}>
                    Passion
                  </h4>
                  <p style={{
                    color: hoveredCard === 'passion' ? 'rgba(255,255,255,0.9)' : '#9ca3af',
                    fontSize: '0.875rem'
                  }}>
                    Building amazing experiences
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveCards;
