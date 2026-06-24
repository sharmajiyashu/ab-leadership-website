"use client"

import Image from 'next/image';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ArrowUpRightIcon } from '@/components/icons/ArrowUpRightIcon';
import { FlagshipProgram } from '../types';
import SectionHeading from '@/components/sections/SectionHeading';

interface FlagshipProgramsProps {
  programs: FlagshipProgram[];
}

function getFlipCardBodyText(program: FlagshipProgram): string {
  const paragraphs = program.description.split(/\n\n/).filter(Boolean);
  const parts = [...paragraphs];
  if (program.description2?.trim()) {
    parts.push(program.description2.trim());
  }
  return parts.join(' ');
}

const FLIP_CARD_TEXT_CLASS =
  'text-sm sm:text-base text-gray-900 leading-relaxed font-bricolage-text text-left [text-shadow:0_1px_2px_rgba(255,255,255,0.85)]';

function FlipCardBodyText({ text }: { text: string }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [lineClamp, setLineClamp] = useState(12);

  useLayoutEffect(() => {
    const area = areaRef.current;
    const textEl = textRef.current;
    if (!area || !textEl) return;

    const updateLineClamp = () => {
      const { lineHeight } = window.getComputedStyle(textEl);
      const parsedLineHeight = parseFloat(lineHeight);
      if (!parsedLineHeight) return;

      const lines = Math.max(1, Math.floor(area.clientHeight / parsedLineHeight));
      setLineClamp(lines);
    };

    updateLineClamp();

    const observer = new ResizeObserver(updateLineClamp);
    observer.observe(area);

    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={areaRef} className="min-h-0 overflow-hidden">
      <p
        ref={textRef}
        className={FLIP_CARD_TEXT_CLASS}
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: lineClamp,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default function FlagshipPrograms({ programs }: FlagshipProgramsProps) {
  const [fullWidthCard, setFullWidthCard] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const toggleCard = (cardId: number) => {
    if (fullWidthCard === cardId) {
      setIsAnimating(true);
      setTimeout(() => {
        setFullWidthCard(null);
        setIsAnimating(false);
      }, 300);
    } else {
      setFullWidthCard(cardId);
    }
  };

  const effectiveProgress = isSectionVisible ? Math.max(scrollProgress, maxProgress) : maxProgress;
  const textProgress = Math.min(1, effectiveProgress * 2.5);
  const textOpacity = Math.min(1, textProgress * 1.5);
  const textTranslateY = (1 - textProgress) * 60;
  const textScale = 0.95 + (textProgress * 0.05);

  const getFullWidthContent = (cardId: number) => {
    const program = programs.find(p => p.id === cardId);
    if (!program) return null;

    const descriptionParagraphs = program.description.split(/\n\n/).filter(Boolean);

    return (
      <>
        <SectionHeading
          level="subservice"
          title={program.title}
          align="left"
          titleClassName="mb-6 text-left"
        />
        <div className="prose prose-lg max-w-none space-y-6 font-bricolage-text">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
          {program.description2 && (
            <p className="text-lg text-gray-700 leading-relaxed">
              {program.description2}
            </p>
          )}

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 font-bricolage-display">
              Key Highlights
            </h3>
            <div className="space-y-6">
              {program.body.map((item, index) => (
                <div key={index}>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2 font-bricolage-display">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {program.benefits && program.benefits.length > 0 && (
            <div className="mt-10 pt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 font-bricolage-display">
                Employee & Organisational Benefits
              </h3>
              <ul className="space-y-4">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-3 text-xl">✔️</span>
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderGridCard = (program: FlagshipProgram) => {
    const bodyText = getFlipCardBodyText(program);
    return (
      <div className="group [perspective:1000px] rounded-3xl shadow-md overflow-hidden cursor-default h-full min-h-[280px] md:min-h-[300px]">
        <div
          className="relative h-full min-h-[280px] md:min-h-[300px] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl backface-hidden">
            <Image
              src={program.image || '/images/IMG_2670.jpg'}
              alt={program.title}
              fill
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-black/25"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-sm line-clamp-2 font-bricolage-display">
                {program.title}
              </h3>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-3xl backface-hidden [transform:rotateY(180deg)]">
            <Image
              src={program.image || '/images/IMG_2670.jpg'}
              alt=""
              fill
              className="object-cover rounded-3xl z-0"
              aria-hidden
            />
            <div className="absolute inset-3 sm:inset-4 md:inset-5 z-[2] grid min-h-0 grid-rows-[1fr_auto] rounded-2xl bg-cover bg-center bg-fixed p-3 sm:p-4 bg-[url('/background.svg')]">
              <FlipCardBodyText text={bodyText} />
              <div className="flex w-full shrink-0 justify-end pt-2 sm:pt-3">
                <button
                  type="button"
                  className="group animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-gray-800 border-2 border-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm font-medium transition-colors font-bricolage-text cursor-pointer"
                  aria-label="Learn more"
                  title="Learn more"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCard(program.id);
                  }}
                >
                  Learn More
                  <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridPrograms = programs.slice(0, 9);

  return (
    <section ref={sectionRef} className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-6">
          {fullWidthCard ? (
            <div className={`bg-white rounded-3xl shadow-xl overflow-hidden ${
              isAnimating ? 'animate-card-expand-out' : 'animate-card-expand-in'
            }`}>
              <div className="relative w-full h-96 md:h-[32rem] overflow-hidden">
                <Image
                  src={programs.find(p => p.id === fullWidthCard)?.image || '/images/IMG_2670.jpg'}
                  alt={programs.find(p => p.id === fullWidthCard)?.title || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <button
                    onClick={() => toggleCard(fullWidthCard)}
                    className="mb-6 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    ← Back to Programs
                  </button>
                  {getFullWidthContent(fullWidthCard)}
                </div>
              </div>
            </div>
          ) : (
            <div className={fullWidthCard === null && !isAnimating ? 'animate-grid-fade-in' : ''}>
              {/*
                3×3 grid (md+): row1 = cards 1–3, row2 = card4 | header | card5, row3 = cards 6–8.
                Row 4 centers card 9 in the middle column.
                Single-column order matches: cards 1–4, header, cards 5–8, card 9.
              */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 items-stretch">
                {gridPrograms[0] && (
                  <div key={gridPrograms[0].id} className="min-h-0">
                    {renderGridCard(gridPrograms[0])}
                  </div>
                )}
                {gridPrograms[1] && (
                  <div key={gridPrograms[1].id} className="min-h-0">
                    {renderGridCard(gridPrograms[1])}
                  </div>
                )}
                {gridPrograms[2] && (
                  <div key={gridPrograms[2].id} className="min-h-0">
                    {renderGridCard(gridPrograms[2])}
                  </div>
                )}
                {gridPrograms[3] && (
                  <div key={gridPrograms[3].id} className="min-h-0">
                    {renderGridCard(gridPrograms[3])}
                  </div>
                )}
                <div
                  ref={textRef}
                  className="relative isolate flex flex-col justify-center items-center text-center px-4 py-8 md:py-6 min-h-[200px] md:min-h-[300px] transition-all duration-700 ease-out"
                  style={{
                    opacity: textOpacity,
                    transform: `translateY(${textTranslateY}px) scale(${textScale})`,
                    willChange: 'opacity, transform'
                  }}
                >
                  <Image
                    src="/5.png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 80vw, 30vw"
                    className="object-contain object-center opacity-70 pointer-events-none -z-10"
                    aria-hidden
                  />
                  <SectionHeading
                    level="subservice"

                    subtitle="Comprehensive wellness programs designed to support mental health and wellbeing at work"
                    subtitleClassName="max-w-md mb-0"
                  >
                    Our <span className="text-[#0047AB]">Wellness</span> Programs
                  </SectionHeading>
                </div>
                {gridPrograms[4] && (
                  <div key={gridPrograms[4].id} className="min-h-0">
                    {renderGridCard(gridPrograms[4])}
                  </div>
                )}
                {gridPrograms[5] && (
                  <div key={gridPrograms[5].id} className="min-h-0">
                    {renderGridCard(gridPrograms[5])}
                  </div>
                )}
                {gridPrograms[6] && (
                  <div key={gridPrograms[6].id} className="min-h-0">
                    {renderGridCard(gridPrograms[6])}
                  </div>
                )}
                {gridPrograms[7] && (
                  <div key={gridPrograms[7].id} className="min-h-0">
                    {renderGridCard(gridPrograms[7])}
                  </div>
                )}
                {gridPrograms[8] && (
                  <div key={gridPrograms[8].id} className="min-h-0 md:col-start-2">
                    {renderGridCard(gridPrograms[8])}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
