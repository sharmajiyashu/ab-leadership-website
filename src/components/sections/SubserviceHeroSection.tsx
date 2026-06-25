'use client'

import { DynamicMedia } from '@/components/ui/DynamicMedia'
import { useState, useEffect } from 'react'

interface SubserviceHeroSectionProps {
  title: string;
  subtitle: string;
  media: any;
}

export default function SubserviceHeroSection({ title, subtitle, media }: SubserviceHeroSectionProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [subtitleOpacity, setSubtitleOpacity] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < title.length) {
          setDisplayedText(title.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [title]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        setSubtitleOpacity(1);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  return (
    <section className="relative w-full overflow-hidden h-[500px] md:h-[600px]">
      {media ? (
        <DynamicMedia
          media={media}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-900" />
      )}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center pt-20">
        <div className="text-center text-white px-4 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold font-bricolage-display">
            {displayedText}
            <span
              className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle transition-opacity duration-100 ${showCursor && !isTypingComplete ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-2"
            style={{ opacity: subtitleOpacity }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
