'use client'

import { useState, useEffect, useRef } from 'react';
import SectionHeading from '@/components/sections/SectionHeading';

export default function SupportingSkills() {
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

            title="Other Supporting Skills for Organisational Effectiveness"
            subtitle="These capability areas complement our core leadership programs and address practical challenges leaders and teams encounter in day-to-day work. They can be customized or combined based on organisational priorities."
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
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Managing Conflict in the Workplace</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Strategic Communication</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Executive Presence</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Influencing Without Authority</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Strategic Thinking & Foresight</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Delegation for Capability Building</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Situational Leadership</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Leading Change Initiatives</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Cross-Functional Leadership</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Ethical Judgment & Leadership Integrity</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Goal Alignment & Execution</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Trust-Based Team Leadership</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Negotiation for Leaders</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Vision Setting & Direction</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Collective Decision-Making</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 text-lg font-bold flex-shrink-0 leading-none">»</span>
              <p className="text-gray-700 font-bricolage-text">Boost Your Listening Skills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
