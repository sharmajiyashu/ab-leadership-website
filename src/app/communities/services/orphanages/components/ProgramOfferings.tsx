'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Program } from '../types'
import SectionHeading from '@/components/sections/SectionHeading'

interface ProgramOfferingsProps {
  programs: Program[];
}

export default function ProgramOfferings({ programs }: ProgramOfferingsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

            subtitle="Trauma-informed creative arts programs designed to support healing, expression, and healthy development through safe, age-appropriate therapeutic modalities"
          >
            Program <span className="text-[#0047AB]">Highlights</span>
          </SectionHeading>
        </div>

        <div>
          {/* First Row - 3 programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.slice(0, 3).map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden cursor-default hover:shadow-lg hover:transform hover:scale-102"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={program.image || ''}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 font-bricolage-display">
                    {program.title}
                  </h3>
                  {program.subtitle && (
                    <p className="text-sm text-gray-700 italic mb-2 font-bricolage-text">
                      {program.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed font-bricolage-text">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second Row - 3 programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {programs.slice(3, 6).map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden cursor-default hover:shadow-lg hover:transform hover:scale-102"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={program.image || ''}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 font-bricolage-display">
                    {program.title}
                  </h3>
                  {program.subtitle && (
                    <p className="text-sm text-gray-700 italic mb-2 font-bricolage-text">
                      {program.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 leading-relaxed font-bricolage-text">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
