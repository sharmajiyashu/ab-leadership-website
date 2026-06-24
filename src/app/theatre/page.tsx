'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Theatre() {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const titleText = 'Theatre & Performance Arts'

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
  }, [])

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

  // Theatre Gallery images - all medium sized
  const galleryImages = [
    { src: '/theatre/raunak theatre - Copy/1.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/2.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/3.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/4.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/5.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/6.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/7.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/8.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/9.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/10.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/11.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/12.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/13.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/14.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/15.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/16.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/17.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/18.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/19.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/20.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/21.jpeg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/22.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/23.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/24.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/25.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/26.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/27.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/28.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/29.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/30.png', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/31.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/32.jpeg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/33.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/34.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/35.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/36.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/37.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/38.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/39.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/40.JPG', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/41.jpg', alt: 'Theatre Performance', size: 'medium' },
    { src: '/theatre/raunak theatre - Copy/IMG_0464.JPG', alt: 'Theatre Performance', size: 'medium' },
  ]

  // Content section animations - scroll-sensitive
  const contentParagraph1 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const contentParagraph2 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const contentParagraph3 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const contentImage1 = useScrollAnimation<HTMLDivElement>(0, 0.2, '100px')
  const contentImage2 = useScrollAnimation<HTMLDivElement>(0, 0.2, '-100px')
  const contentParagraph4 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const contentParagraph5 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')

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
            src="/theatre/newHero.png"
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
                  className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle transition-opacity duration-100 ${
                    showCursor && !isTypingComplete ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </h1>
              <p
                className="text-xl md:text-2xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-2"
                style={{ opacity: subtitleOpacity }}
              >
                Award-winning theatre artist bringing transformative storytelling and experimental theatre to life
              </p>
            </div>
          </div>
        </section>

        {/* Content Section - Alternating Text and Images */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section 1 - Text Left, Image Right (Paragraphs 1-2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <p 
                  ref={contentParagraph1.ref}
                  className={`text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                    contentParagraph1.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100 visible' 
                      : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
                >
                  Abhishek&apos;s theatre practice is rooted in storytelling, embodiment, and lived human experience. Spanning <span className="font-semibold text-[#0047AB]">performance, direction, and design</span>, his work engages theatre not only as an artistic form, but also as a space for reflection, dialogue, and personal and collective meaning-making. This practice is shaped by his exploration of human behaviour, along with formal training in theatre and acting under <span className="font-semibold text-[#0047AB]">NSD and FTII practitioners</span> and directors, and mentorship from Anupam Kher&apos;s Actor Prepares, Barry John Acting Studio, and Mahesh Bhatt.
                </p>
                <p 
                  ref={contentParagraph2.ref}
                  className={`text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                    contentParagraph2.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100 visible' 
                      : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
                >
                  As a theatre artiste, he has performed in over <span className="font-semibold text-[#0047AB]">25 theatre productions</span>, along with staged readings, storytelling performances, and street plays. His performance work spans <span className="font-semibold text-[#0047AB]">English, Hindi, French, Marathi</span>, and multilingual productions across a wide range of genres and forms, including classical Indian plays, war drama, contemporary and comedic theatre, children&apos;s theatre, storytelling, passion plays, experimental and immersive theatre, absurd and existential work, mime, movement-based theatre, poetry in motion, and performance poetry.
                </p>
              </div>
              <div 
                ref={contentImage1.ref}
                className={`relative w-full transition-all duration-[1500ms] ${
                  contentImage1.isVisible 
                    ? 'opacity-100 translate-x-0 visible' 
                    : 'opacity-0 translate-x-56 invisible'
                }`}
                style={{
                  transitionTimingFunction: 'ease-out'
                }}
              >
                  <Image
                  src="/theatre/content/theatreImage.jpeg"
                  alt="Theatre Performance"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                  />
              </div>
            </div>

            {/* Section 2 - Image Left, Text Right (Paragraphs 3-5) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div 
                ref={contentImage2.ref}
                className={`relative order-2 lg:order-1 w-full transition-all duration-[1500ms] ${
                  contentImage2.isVisible 
                    ? 'opacity-100 translate-x-0 visible' 
                    : 'opacity-0 -translate-x-56 invisible'
                }`}
                style={{
                  transitionTimingFunction: 'ease-out'
                }}
              >
                  <Image
                  src="/theatre/content/IMG_0471 (1).JPG"
                  alt="Theatre Performance"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                  />
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <p 
                  ref={contentParagraph3.ref}
                  className={`text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                    contentParagraph3.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100 visible' 
                      : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
                >
                  Alongside performance, Abhishek has also directed and designed <span className="font-semibold text-[#0047AB]">commercial plays and socially engaged street theatre works</span>, bringing together narrative, movement, visual composition, and emotional rhythm to shape meaningful theatrical experiences. His work often uses theatre as a medium to engage with identity, emotional expression, social reflection, and the complexities of human relationships, creating spaces where stories can be felt, questioned, and <span className="font-semibold text-[#0047AB]">collectively experienced.</span>
                </p>
                <p 
                  ref={contentParagraph4.ref}
                  className={`text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                    contentParagraph4.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100 visible' 
                      : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
                >
                  His work has been showcased at major cultural platforms including the <span className="font-semibold text-[#0047AB]">Times of India Kala Ghoda Arts Festival</span>, the International Children&apos;s Theatre Festival, and the University of Mumbai&apos;s UDAAN Festival. He is also a recipient of the Swadeshi India Runway Award for Theatre and Drama. He has collaborated with organisations such as <span className="font-semibold text-[#0047AB]">Alliance Française de Bombay</span>, St. Andrew&apos;s Centre for Philosophy and Performing Arts, Metamorphosis Theatre Inc, Irani Cafe Entertainment, and Indriyaan Theatre Group.
                </p>
                <p 
                  ref={contentParagraph5.ref}
                  className={`text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                    contentParagraph5.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100 visible' 
                      : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
                >
                  He is the founder of <span className="font-semibold text-[#0047AB]">The Epiphany Arts Foundation</span>, an initiative that uses the performing arts as a space for storytelling, reflection, and creative exploration. The Foundation brings together artistes and audiences through theatre, embodied expression, and meaningful dialogue, encouraging people to connect with themselves, with others, and with the wider human experience.
                  </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            {/* Title */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-800 py-16 font-bricolage-display">Gallery</h2>
            </div>

            {/* Gallery Grid */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[320px]">
                {galleryImages.map((image, index) => {
                  const isVisible = visibleImages.has(index)
                  
                  // Determine animation direction based on index for variety
                  const directions = ['left', 'right', 'top', 'bottom'] as const
                  const direction = directions[index % 4]
                  
                  // Staggered delay for cascading effect
                  const delay = (index % 6) * 0.1
                  
                  // Get initial transform based on direction
                  const getInitialTransform = () => {
                    if (!mounted || isVisible) return 'translate(0, 0) scale(1)'
                    
                    switch (direction) {
                      case 'left':
                        return 'translateX(-100px) translateY(0) scale(0.8)'
                      case 'right':
                        return 'translateX(100px) translateY(0) scale(0.8)'
                      case 'top':
                        return 'translateX(0) translateY(-100px) scale(0.8)'
                      case 'bottom':
                        return 'translateX(0) translateY(100px) scale(0.8)'
                      default:
                        return 'translate(0, 0) scale(0.8)'
                    }
                  }
                  
                  const getFinalTransform = () => {
                    return 'translate(0, 0) scale(1)'
                  }

                  return (
                    <div 
                      key={index}
                      ref={(el) => {
                        imageRefs.current[index] = el
                      }}
                      onClick={() => {
                        if (mounted && isVisible) {
                          setSelectedImage(index)
                        }
                      }}
                      className={`relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer ${getSizeClasses(image.size)}`}
                      style={{
                        opacity: mounted ? (isVisible ? 1 : 0) : 0,
                        transform: mounted 
                          ? (isVisible ? getFinalTransform() : getInitialTransform())
                          : 'translate(0, 0) scale(0.8)',
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
                            // Hide the image container if image fails to load
                            const target = e.target as HTMLImageElement;
                            const container = target.closest('.relative') as HTMLElement;
                            if (container) {
                              container.style.display = 'none';
                            }
                          }}
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox Modal - Rendered via Portal to bypass transformed parent */}
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
              e.stopPropagation()
              setSelectedImage(null)
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

          {/* Image container - centered */}
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

          {/* Previous */}
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
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next */}
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
              aria-label="Next image"
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
