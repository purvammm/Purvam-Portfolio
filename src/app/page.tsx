'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnimatedBackground from '@/components/AnimatedBackground';
import FloatingSidebar from '@/components/FloatingSidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import SkeletonLoader from '@/components/SkeletonLoader';

// Lazy load heavy components
const About = lazy(() => import('@/components/About'));
const Experience = lazy(() => import('@/components/Experience'));
const Projects = lazy(() => import('@/components/Projects'));
const AdvancedSkills = lazy(() => import('@/components/AdvancedSkills'));
const Contact = lazy(() => import('@/components/Contact'));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time and preload critical resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Balanced loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main style={{ position: 'relative' }}>
      <AnimatedBackground />
      <Navbar />
      <FloatingSidebar />

      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <Suspense fallback={<SkeletonLoader />}>
          <About />
        </Suspense>
      </div>

      <div id="experience">
        <Suspense fallback={<SkeletonLoader />}>
          <Experience />
        </Suspense>
      </div>

      <div id="projects">
        <Suspense fallback={<SkeletonLoader />}>
          <Projects />
        </Suspense>
      </div>

      <div id="skills">
        <Suspense fallback={<SkeletonLoader />}>
          <AdvancedSkills />
        </Suspense>
      </div>

      <div id="contact">
        <Suspense fallback={<SkeletonLoader />}>
          <Contact />
        </Suspense>
      </div>
    </main>
  );
}
