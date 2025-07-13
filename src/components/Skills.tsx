'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
        { name: 'Vue.js', level: 75 },
        { name: 'Framer Motion', level: 80 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 88 },
        { name: 'Python', level: 75 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 82 },
        { name: 'GraphQL', level: 70 }
      ]
    },
    {
      title: 'Tools & Cloud',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'Vercel', level: 85 },
        { name: 'Figma', level: 80 },
        { name: 'VS Code', level: 95 }
      ]
    }
  ];

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="skills" ref={ref} style={{ padding: '5rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}
            className="md:text-4xl"
          >
            <span style={{ color: '#000000' }}>Skills & Technologies</span>
          </motion.h2>

          <div style={{ display: 'grid', gap: '2rem' }} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                style={{
                  background: '#1f2937',
                  padding: '2rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #374151'
                }}
              >
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem', 
                  color: '#06b6d4',
                  textAlign: 'center'
                }}>
                  {category.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={itemVariants}
                      style={{ marginBottom: '0.5rem' }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ fontWeight: '500' }}>{skill.name}</span>
                        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div style={{
                        width: '100%',
                        height: '0.5rem',
                        background: '#374151',
                        borderRadius: '0.25rem',
                        overflow: 'hidden'
                      }}>
                        <motion.div
                          variants={progressVariants}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                          custom={skill.level}
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                            borderRadius: '0.25rem'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Icons */}
          <motion.div
            variants={itemVariants}
            style={{ marginTop: '3rem', textAlign: 'center' }}
          >
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '2rem',
              color: '#06b6d4'
            }}>
              Technologies I Work With
            </h3>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              justifyContent: 'center'
            }} className="px-2 sm:px-0">
              {[
                'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js',
                'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git',
                'Tailwind CSS', 'Framer Motion', 'GraphQL', 'REST APIs'
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  style={{
                    background: '#374151',
                    color: '#06b6d4',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '1.5rem',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    cursor: 'default',
                    transition: 'all 0.2s'
                  }}
                  className="text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 hover:bg-cyan-400 hover:text-gray-900"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
