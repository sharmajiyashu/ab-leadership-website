'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Loader } from '@/components/ui/Loader'

interface TheatreData {
  hero?: {
    title?: string;
    subtitle?: string;
    image?: any;
  };
  content?: {
    section1?: {
      text?: string;
      image?: any;
    };
    section2?: {
      text?: string;
      image?: any;
    };
  };
  gallery?: {
    images?: any[];
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: any;
  };
}

export default function TheatreClient() {
  const [data, setData] = useState<TheatreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('@/lib/api').then(({ get }) => {
      get<TheatreData>('/v1/api/app/theatre/settings')
        .then(data => {
          if (data) setData(data);
        })
        .catch(err => console.error("Error fetching theatre page data:", err))
        .finally(() => setIsLoading(false));
    });
  }, []);

  if (isLoading) {
    return (
      <BackgroundLayout>
        <Navbar />
        <Loader />
        <Footer />
      </BackgroundLayout>
    );
  }

  return <TheatreContent data={data || {}} />;
}

function TheatreContent({ data }: { data: TheatreData }) {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const titleText = data?.hero?.title || 'Theatre & Performance Arts';
  const subtitleText = data?.hero?.subtitle || '';
  const heroImage = data?.hero?.image?.url || data?.hero?.image || '/theatre/newHero.png';

  const sec1Text = data?.content?.section1?.text || '';
  const sec1Image = data?.content?.section1?.image?.url || data?.content?.section1?.image || '/theatre/content/theatreImage.jpeg';

  const sec2Text = data?.content?.section2?.text || '';
  const sec2Image = data?.content?.section2?.image?.url || data?.content?.section2?.image || '/theatre/content/IMG_0471 (1).JPG';

  const galleryImages = (data?.gallery?.images || []).map((img: any) => ({
    src: img.url || img,
    alt: 'Theatre Performance',
    size: 'medium'
  }));

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex < titleText.length) {
          setDisplayedText(titleText.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setIsTypingComplete(true)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }, 500)

    return () => clearTimeout(startDelay)
  }, [titleText])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        setSubtitleOpacity(1)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isTypingComplete])

  // Handle lightbox animation
  useEffect(() => {
    if (selectedImage !== null) {
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        setIsLightboxOpen(true)
      })
    } else {
      setIsLightboxOpen(false)
    }
  }, [selectedImage])

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }
    if (selectedImage !== null) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  useEffect(() => {
    if (!mounted) return

    const observers: IntersectionObserver[] = []

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => new Set(prev).add(index))
            observer.unobserve(ref)
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [mounted])

  // Content section animations - scroll-sensitive
  const contentParagraph1 = useScrollAnimation<HTMLDivElement>(0, 0.3, '-100px')
  const contentImage1 = useScrollAnimation<HTMLDivElement>(0, 0.2, '100px')
  const contentImage2 = useScrollAnimation<HTMLDivElement>(0, 0.2, '-100px')
  const contentParagraph3 = useScrollAnimation<HTMLDivElement>(0, 0.3, '-100px')

  // Function to get CSS Grid classes based on image size
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'wide':
        return 'col-span-2 row-span-1'
      default: // medium
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[350px] md:h-[500px] lg:h-[700px] overflow-hidden">
          <Image
            src={heroImage}
            alt="Theatre Hero"
            fill
            className="object-cover"
            style={{ objectPosition: 'center bottom' }}
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
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
                {subtitleText}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section - Alternating Text and Images */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section 1 - Text Left, Image Right */}
            {sec1Text && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div
                  ref={contentParagraph1.ref}
                  className={`space-y-6 transition-all duration-1000 ease-out ${contentParagraph1.isVisible
                    ? 'opacity-100 translate-y-0 scale-100 visible'
                    : 'opacity-0 translate-y-8 scale-95 invisible'
                    }`}
                  dangerouslySetInnerHTML={{ __html: sec1Text }}
                />
                {sec1Image && (
                  <div
                    ref={contentImage1.ref}
                    className={`relative w-full transition-all duration-[1500ms] ${contentImage1.isVisible
                      ? 'opacity-100 translate-x-0 visible'
                      : 'opacity-0 translate-x-56 invisible'
                      }`}
                    style={{ transitionTimingFunction: 'ease-out' }}
                  >
                    <Image
                      src={sec1Image}
                      alt="Theatre Performance"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Section 2 - Image Left, Text Right */}
            {sec2Text && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {sec2Image && (
                  <div
                    ref={contentImage2.ref}
                    className={`relative order-2 lg:order-1 w-full transition-all duration-[1500ms] ${contentImage2.isVisible
                      ? 'opacity-100 translate-x-0 visible'
                      : 'opacity-0 -translate-x-56 invisible'
                      }`}
                    style={{ transitionTimingFunction: 'ease-out' }}
                  >
                    <Image
                      src={sec2Image}
                      alt="Theatre Performance"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
                <div
                  ref={contentParagraph3.ref}
                  className={`space-y-6 order-1 lg:order-2 transition-all duration-1000 ease-out ${contentParagraph3.isVisible
                    ? 'opacity-100 translate-y-0 scale-100 visible'
                    : 'opacity-0 translate-y-8 scale-95 invisible'
                    }`}
                  dangerouslySetInnerHTML={{ __html: sec2Text }}
                />
              </div>
            )}
          </div>
        </section>

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800 py-16 font-bricolage-display">Gallery</h2>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[320px]">
                  {galleryImages.map((image, index) => {
                    const isVisible = visibleImages.has(index)
                    const directions = ['left', 'right', 'top', 'bottom'] as const
                    const direction = directions[index % 4]
                    const delay = (index % 6) * 0.1

                    const getInitialTransform = () => {
                      if (!mounted || isVisible) return 'translate(0, 0) scale(1)'
                      switch (direction) {
                        case 'left': return 'translateX(-100px) translateY(0) scale(0.8)'
                        case 'right': return 'translateX(100px) translateY(0) scale(0.8)'
                        case 'top': return 'translateX(0) translateY(-100px) scale(0.8)'
                        case 'bottom': return 'translateX(0) translateY(100px) scale(0.8)'
                        default: return 'translate(0, 0) scale(0.8)'
                      }
                    }

                    const getFinalTransform = () => 'translate(0, 0) scale(1)'

                    return (
                      <div
                        key={index}
                        ref={(el) => { imageRefs.current[index] = el }}
                        onClick={() => {
                          if (mounted && isVisible) setSelectedImage(index)
                        }}
                        className={`relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer ${getSizeClasses(image.size)}`}
                        style={{
                          opacity: mounted ? (isVisible ? 1 : 0) : 0,
                          transform: mounted ? (isVisible ? getFinalTransform() : getInitialTransform()) : 'translate(0, 0) scale(0.8)',
                          transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
                          pointerEvents: mounted && isVisible ? 'auto' : 'none',
                        }}
                      >
                        <div className="relative w-full h-full overflow-hidden pointer-events-none">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const container = target.closest('.relative') as HTMLElement;
                              if (container) container.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />

      {/* Lightbox Modal */}
      {mounted && selectedImage !== null && createPortal(
        <div
          className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
          style={{
            opacity: isLightboxOpen ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="fixed top-6 right-6 z-[1000] text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            style={{
              opacity: isLightboxOpen ? 1 : 0,
              transform: isLightboxOpen ? 'scale(1)' : 'scale(0.8)',
              transition: 'opacity 0.3s ease-out 0.1s, transform 0.3s ease-out 0.1s'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative flex items-center justify-center"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              opacity: isLightboxOpen ? 1 : 0,
              transform: isLightboxOpen ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              width={1600}
              height={1200}
              className="object-contain"
              style={{ maxWidth: '90vw', maxHeight: '90vh', width: 'auto', height: 'auto' }}
              priority
            />
          </div>

          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              className="fixed left-6 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
              style={{
                opacity: isLightboxOpen ? 1 : 0,
                transform: isLightboxOpen ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)',
                transition: 'opacity 0.3s ease-out 0.15s, transform 0.3s ease-out 0.15s'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {selectedImage < galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              className="fixed right-6 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-black/70 transition"
              style={{
                opacity: isLightboxOpen ? 1 : 0,
                transform: isLightboxOpen ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.8)',
                transition: 'opacity 0.3s ease-out 0.15s, transform 0.3s ease-out 0.15s'
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>,
        document.body
      )}
    </BackgroundLayout>
  );
}
