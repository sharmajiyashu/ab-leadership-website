"use client";

import { useState, useEffect, useRef } from "react";

const AnimatedNumber = ({
  target,
  suffix = "",
  duration = 2000,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now() + delay;
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration, delay]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bricolage-display font-semibold text-gray-900 mb-2"
    >
      <span className="inline-block animate-[fadeInScale_0.8s_ease-out]">
        {count}
        {suffix}
      </span>
    </div>
  );
};

const cardBackgrounds = {
  1: { gradient: 'from-slate-50 to-indigo-100', circle: 'bg-indigo-200/40', waves: 'text-indigo-300/80' },
  2: { gradient: 'from-slate-50 to-purple-100', circle: 'bg-purple-200/40', waves: 'text-purple-300/80' },
  3: { gradient: 'from-slate-50 to-violet-100', circle: 'bg-violet-200/40', waves: 'text-violet-300/80' },
} as const;

const CardBackgroundDecoration = ({ variant }: { variant: 1 | 2 | 3 }) => {
  const bg = cardBackgrounds[variant];
  return (
    <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden>
      <div className={`absolute -top-10 -right-10 w-40 h-40 md:w-48 md:h-48 rounded-full ${bg.circle}`} />
      <svg className={`absolute bottom-5 right-3 w-28 h-14 md:w-32 md:h-16 ${bg.waves}`} viewBox="0 0 128 64" fill="none">
        <path d="M8 52 Q36 38 64 48 T120 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 58 Q36 44 64 54 T120 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 64 Q36 50 64 60 T120 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default function ImpactStatistics() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    const cardsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          window.addEventListener("scroll", handleScroll, { passive: true });
          handleScroll();
        }
      },
      { threshold: 0, rootMargin: "300px" }
    );

    const currentCardsRef = cardsRef.current;

    if (currentCardsRef) {
      cardsObserver.observe(currentCardsRef);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (currentCardsRef) {
        cardsObserver.unobserve(currentCardsRef);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxProgress]);

  const effectiveProgress = isSectionVisible ? Math.max(scrollProgress, maxProgress) : maxProgress;
  const textProgress = Math.min(1, effectiveProgress * 2.5);
  const textOpacity = Math.min(1, textProgress * 1.5);
  const textTranslateY = (1 - textProgress) * 60;
  const textScale = 0.95 + textProgress * 0.05;

  return (
    <section ref={sectionRef} className="py-16 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 transition-all duration-700 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            willChange: "opacity, transform",
          }}
        >
          {/* Fact 1 - 3–5x */}
          <div className="group relative overflow-hidden bg-gradient-to-r from-slate-50 to-indigo-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
            <CardBackgroundDecoration variant={1} />
            <div className="relative z-10 font-bricolage-text">
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bricolage-display font-semibold text-gray-900 mb-2">
                  <span className="inline-block">3–5x</span>
                </div>
                <div className="w-20 h-1 bg-blue-600 rounded-full mt-1.5 animate-[slideIn_1.2s_ease-out]" />
              </div>
              <p className="text-gray-900 text-lg leading-relaxed mb-4">
                Justice-involved youth are{" "}
                <span className="font-bold">3–5 times more likely</span> to
                experience mental health disorders compared to the general
                adolescent population.
              </p>
              <p className="text-gray-700 text-sm italic">
                Office of Juvenile Justice and Delinquency Prevention (OJJDP)
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Fact 2 - 35%+ */}
          <div className="group relative overflow-hidden bg-gradient-to-r from-slate-50 to-purple-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
            <CardBackgroundDecoration variant={2} />
            <div className="relative z-10 font-bricolage-text">
              <div className="mb-6">
                <AnimatedNumber target={35} suffix="%+" delay={400} />
                <div className="w-20 h-1 bg-indigo-600 rounded-full mt-1.5 animate-[slideIn_1.4s_ease-out]" />
              </div>
              <p className="text-gray-900 text-lg leading-relaxed mb-4">
                Group-based programs that foster belonging and contribution{" "}
                <span className="font-bold">
                  increase pro-social behaviour by over 35%
                </span>
                .
              </p>
              <p className="text-gray-700 text-sm italic">
                UNICEF / Youth Development Research
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Fact 3 - 30–50% */}
          <div className="group relative overflow-hidden bg-gradient-to-r from-slate-50 to-violet-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
            <CardBackgroundDecoration variant={3} />
            <div className="relative z-10 font-bricolage-text">
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bricolage-display font-semibold text-gray-900 mb-2">
                  <span className="inline-block">30–50%</span>
                </div>
                <div className="w-20 h-1 bg-purple-600 rounded-full mt-1.5 animate-[slideIn_1.6s_ease-out]" />
              </div>
              <p className="text-gray-900 text-lg leading-relaxed mb-4">
                Trauma-informed interventions{" "}
                <span className="font-bold">
                  reduce behavioural incidents by 30–50%
                </span>
                .
              </p>
              <p className="text-gray-700 text-sm italic">
                National Institute of Justice (NIJ)
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 5rem;
          }
        }
      `}</style>
    </section>
  );
}
