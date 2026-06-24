'use client'

import { useState, useEffect, useRef, type ReactNode } from 'react';

interface SubserviceContentSectionProps {
  children: ReactNode;
}

export default function SubserviceContentSection({ children }: SubserviceContentSectionProps) {
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
    <section ref={sectionRef} className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={textRef}
          className="transition-all duration-700 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            willChange: 'opacity, transform'
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
