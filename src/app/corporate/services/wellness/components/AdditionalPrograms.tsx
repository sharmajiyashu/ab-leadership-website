'use client'

import { useState, useEffect, useRef } from 'react';
import SectionHeading from '@/components/sections/SectionHeading';

export default function AdditionalPrograms() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      if (sectionTop < windowHeight * 1.2 && sectionTop > -sectionHeight) {
        const startPoint = windowHeight * 1.2;
        const endPoint = -sectionHeight;
        const progress = Math.max(0, Math.min(1, (startPoint - sectionTop) / (startPoint - endPoint)));
        setScrollProgress(progress);
        setMaxProgress(prev => Math.max(prev, progress));
      } else if (sectionTop >= windowHeight * 1.2) {
        if (maxProgress < 1) {
          setScrollProgress(0);
        }
      } else {
        setScrollProgress(1);
        setMaxProgress(1);
      }
    };

    const textObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          window.addEventListener('scroll', handleScroll, { passive: true });
          handleScroll();
        }
      },
      { threshold: 0, rootMargin: '300px' }
    );

    const currentTextRef = textRef.current;
    
    if (currentTextRef) {
      textObserver.observe(currentTextRef);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (currentTextRef) {
        textObserver.unobserve(currentTextRef);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [maxProgress]);

  const effectiveProgress = isSectionVisible ? Math.max(scrollProgress, maxProgress) : maxProgress;
  const textProgress = Math.min(1, effectiveProgress * 2.5);
  const textOpacity = Math.min(1, textProgress * 1.5);
  const textTranslateY = (1 - textProgress) * 60;
  const textScale = 0.95 + (textProgress * 0.05);

  // Grid animation with slight delay
  const gridProgress = Math.min(1, Math.max(0, effectiveProgress - 0.1) * 2.5);
  const gridOpacity = Math.min(1, gridProgress * 1.5);
  const gridTranslateY = (1 - gridProgress) * 40;

  return (
    <section ref={sectionRef} className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={textRef}
          className="text-center mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            willChange: 'opacity, transform'
          }}
        >
          <SectionHeading
            level="subservice"

            title="Additional Wellness Programs"
          />
        </div>
        
        <div 
          ref={gridRef}
          className="grid md:grid-cols-3 gap-8 transition-all duration-700 ease-out"
          style={{
            opacity: gridOpacity,
            transform: `translateY(${gridTranslateY}px)`,
            willChange: 'opacity, transform'
          }}
        >
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Team Wellness and Culture Building</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Stress Literacy for Professionals</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Fitness for the Workplace</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Everyday Mental Wellbeing Practices</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Workplace Emotional Balance</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Load Management</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Calm Performance at Work</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Emotional Sustainability for Teams</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Recovery in High-Demand Roles</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Workplace Emotional Intelligence</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Stress-Smart Work Practices</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Emotional Energy Management</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Workplace Emotional Hygiene</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Building Mental Capacity at Work</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Sustainable Mental Performance</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Wellbeing for Hybrid Teams</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Managing Emotional Fatigue at Work</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Strength without Burnout</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Emotional Safety & Wellbeing</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Balance in Fast-Paced Environments</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Psychological Wellbeing for Employees</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Managing Mental Overload</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Emotional Stability under Pressure</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700">Mental Health Foundations for Work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
