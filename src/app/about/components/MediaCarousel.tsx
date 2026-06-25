'use client'

import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import SectionHeading from '@/components/sections/SectionHeading';

const DEFAULT_MEDIA_IMAGES = [
  '/aboutMe/media/1.jpg',
  '/aboutMe/media/2.jpg',
  '/aboutMe/media/3.jpg',
  '/aboutMe/media/4.jpg',
  '/aboutMe/media/5.jpg',
  '/aboutMe/media/6.jpg',
  '/aboutMe/media/7.jpg',
  '/aboutMe/media/8.jpg',
  '/aboutMe/media/8a.jpg',
  '/aboutMe/media/9.jpg',
  '/aboutMe/media/10.jpg',
  '/aboutMe/media/11.jpg',
  '/aboutMe/media/12.jpg',
  '/aboutMe/media/13.png',
  '/aboutMe/media/14.png',
  '/aboutMe/media/15.jpg',
  '/aboutMe/media/16.jpg',
  '/aboutMe/media/17.jpg',
  '/aboutMe/media/18.jpg',
  '/aboutMe/media/19.jpg',
  '/aboutMe/media/20.jpg',
  '/aboutMe/media/21.jpg',
  '/aboutMe/media/22.jpg',
  '/aboutMe/media/23.jpg',
  '/aboutMe/media/24.jpg',
  '/aboutMe/media/25.jpg',
  '/aboutMe/media/26.jpg',
  '/aboutMe/media/27.jpg',
  '/aboutMe/media/28.png',
];

const VISIBLE_COUNT = 4;

interface MediaCarouselProps {
  images?: string[];
}

export default function MediaCarousel({ images }: MediaCarouselProps) {
  if (!images || images.length === 0) return null;
  const carouselImages = images;
  const visibleCount = VISIBLE_COUNT;
  const totalImages = carouselImages.length;

  // Triple the images for seamless infinite loop
  const extendedImages = [...carouselImages, ...carouselImages, ...carouselImages];

  // Start at the middle set
  const [currentIndex, setCurrentIndex] = useState(totalImages);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, []);

  // Handle seamless loop reset
  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      // If we've scrolled past the last set, jump to the middle set
      if (currentIndex >= totalImages * 2) {
        setIsTransitioning(false);
        setCurrentIndex(totalImages);
      }
      // If we've scrolled before the first set, jump to the middle set
      else if (currentIndex < totalImages) {
        setIsTransitioning(false);
        setCurrentIndex(totalImages + (currentIndex % totalImages));
      }
    };

    const timeout = setTimeout(handleTransitionEnd, 700); // Match transition duration
    return () => clearTimeout(timeout);
  }, [currentIndex, totalImages, isTransitioning]);

  // Client-side mount detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle lightbox animation
  useEffect(() => {
    if (selectedImage !== null) {
      requestAnimationFrame(() => {
        setIsLightboxOpen(true);
      });
    } else {
      setIsLightboxOpen(false);
    }
  }, [selectedImage]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Calculate the slide percentage based on visible count
  const slidePercentage = 100 / visibleCount;

  // Get the actual image index for lightbox (maps extended index to original)
  const getOriginalIndex = (extendedIndex: number) => {
    return extendedIndex % totalImages;
  };

  return (
    <section className="pt-4 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading level="subsection" title="Media Coverage" titleClassName="mb-10" />

        <div
          className="max-w-[90rem] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel with arrows */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Navigation Arrow - Left */}
            <button
              onClick={prevSlide}
              className="group flex-shrink-0 bg-white hover:bg-[#0047AB] p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl border border-gray-200 hover:border-[#0047AB]"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Main Carousel Container */}
            <div className="flex-1 overflow-hidden rounded-xl py-6">
              <div
                ref={carouselRef}
                className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-out' : ''}`}
                style={{
                  transform: `translateX(-${currentIndex * slidePercentage}%)`,
                }}
              >
                {extendedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 px-2 md:px-3"
                    style={{ width: `${slidePercentage}%` }}
                  >
                    <div
                      className="group relative aspect-square overflow-hidden rounded-xl shadow-lg bg-neutral-100 cursor-pointer border border-gray-200 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:-translate-y-3 hover:shadow-2xl hover:z-10"
                      onClick={() => setSelectedImage(getOriginalIndex(index))}
                    >
                      <Image
                        src={image}
                        alt={`Media coverage ${getOriginalIndex(index) + 1}`}
                        fill
                        className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 45vw, 22vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrow - Right */}
            <button
              onClick={nextSlide}
              className="group flex-shrink-0 bg-white hover:bg-[#0047AB] p-3 md:p-4 rounded-full shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl border border-gray-200 hover:border-[#0047AB]"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalImages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(totalImages + index);
                }}
                className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getOriginalIndex(currentIndex) === index
                  ? 'bg-[#0047AB] w-10'
                  : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {mounted && selectedImage !== null && createPortal(
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLightboxOpen ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="fixed top-6 right-6 z-[1000] text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            style={{
              opacity: isLightboxOpen ? 1 : 0,
              transform: isLightboxOpen ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.3s ease-out 0.1s, transform 0.3s ease-out 0.1s'
            }}
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative flex items-center justify-center"
            style={{
              maxWidth: '95vw',
              maxHeight: '95vh',
              opacity: isLightboxOpen ? 1 : 0,
              transform: isLightboxOpen ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={carouselImages[selectedImage]}
              alt={`Media coverage ${selectedImage + 1}`}
              width={1600}
              height={1200}
              className="object-contain bg-white rounded-lg"
              style={{ maxWidth: '95vw', maxHeight: '95vh', width: 'auto', height: 'auto' }}
              priority
            />
          </div>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((selectedImage - 1 + carouselImages.length) % carouselImages.length);
            }}
            className="fixed left-6 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
            style={{
              opacity: isLightboxOpen ? 1 : 0,
              transform: isLightboxOpen ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)',
              transition: 'opacity 0.3s ease-out 0.15s, transform 0.3s ease-out 0.15s'
            }}
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((selectedImage + 1) % carouselImages.length);
            }}
            className="fixed right-6 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
            style={{
              opacity: isLightboxOpen ? 1 : 0,
              transform: isLightboxOpen ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)',
              transition: 'opacity 0.3s ease-out 0.15s, transform 0.3s ease-out 0.15s'
            }}
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>,
        document.body
      )}
    </section>
  );
}
