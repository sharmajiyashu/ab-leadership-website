'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SectionHeading from './SectionHeading'

interface GalleryImage {
  src: string
  alt: string
  size: 'small' | 'medium' | 'large' | 'wide'
}

interface GalleryProps {
  images?: GalleryImage[]
}

const Gallery = ({ images }: GalleryProps) => {
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    const currentRef = titleRef.current
    if (!currentRef) return

    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true)
          titleObserver.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    titleObserver.observe(currentRef)

    return () => {
      if (currentRef) {
        titleObserver.unobserve(currentRef)
      }
    }
  }, [mounted])

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

  // Default Corporates Gallery images (fallback if no images prop provided)
  const defaultGalleryImages: GalleryImage[] = [
    // All images are medium sized (square)
    { src: '/corporate/corporateGallery/1.JPG', alt: 'Corporates Workshop - Leadership Training', size: 'medium' },
    { src: '/corporate/corporateGallery/2.JPG', alt: 'Corporates Workshop - Team Building', size: 'medium' },
    { src: '/corporate/corporateGallery/3.jpg', alt: 'Corporates Workshop - Communication Skills', size: 'medium' },
    { src: '/corporate/corporateGallery/4.jpg', alt: 'Corporates Workshop - Employee Development', size: 'medium' },
    { src: '/corporate/corporateGallery/5.jpg', alt: 'Corporates Workshop - Wellness Session', size: 'medium' },
    { src: '/corporate/corporateGallery/6.jpg', alt: 'Corporates Workshop - Group Activity', size: 'medium' },
    
    { src: '/corporate/corporateGallery/7.jpg', alt: 'Corporates Workshop - Training Session', size: 'medium' },
    { src: '/corporate/corporateGallery/8.jpeg', alt: 'Corporates Workshop - Interactive Learning', size: 'medium' },
    { src: '/corporate/corporateGallery/9.jpg', alt: 'Corporates Workshop - Skill Development', size: 'medium' },
    { src: '/corporate/corporateGallery/10.jpg', alt: 'Corporates Workshop - Team Collaboration', size: 'medium' },
    { src: '/corporate/corporateGallery/11.JPG', alt: 'Corporates Workshop - Professional Development', size: 'medium' },
    { src: '/corporate/corporateGallery/12.JPG', alt: 'Corporates Workshop - Leadership Development', size: 'medium' },
    
    { src: '/corporate/corporateGallery/13.jpg', alt: 'Corporates Workshop - Employee Engagement', size: 'medium' },
    { src: '/corporate/corporateGallery/14.JPG', alt: 'Corporates Workshop - Training Program', size: 'medium' },
    { src: '/corporate/corporateGallery/15.JPG', alt: 'Corporates Workshop - Skill Building', size: 'medium' },
    { src: '/corporate/corporateGallery/16.jpg', alt: 'Corporates Workshop - Group Learning', size: 'medium' },
    { src: '/corporate/corporateGallery/17.jpg', alt: 'Corporates Workshop - Professional Growth', size: 'medium' },
    { src: '/corporate/corporateGallery/18.JPG', alt: 'Corporates Workshop - Team Development', size: 'medium' },
    
    { src: '/corporate/corporateGallery/19.JPG', alt: 'Corporates Workshop - Leadership Training', size: 'medium' },
    { src: '/corporate/corporateGallery/20.jpg', alt: 'Corporates Workshop - Employee Wellness', size: 'medium' },
    { src: '/corporate/corporateGallery/21.JPG', alt: 'Corporates Workshop - Communication Workshop', size: 'medium' },
    { src: '/corporate/corporateGallery/22.jpeg', alt: 'Corporates Workshop - Team Building Activity', size: 'medium' },
    { src: '/corporate/corporateGallery/23.JPG', alt: 'Corporates Workshop - Professional Skills', size: 'medium' },
    { src: '/corporate/corporateGallery/24.JPG', alt: 'Corporates Workshop - Group Training', size: 'medium' },
    
    { src: '/corporate/corporateGallery/25.JPG', alt: 'Corporates Workshop - Leadership Development', size: 'medium' },
    { src: '/corporate/corporateGallery/26.JPG', alt: 'Corporates Workshop - Employee Development', size: 'medium' },
    { src: '/corporate/corporateGallery/27.JPG', alt: 'Corporates Workshop - Team Collaboration', size: 'medium' },
    { src: '/corporate/corporateGallery/28.JPG', alt: 'Corporates Workshop - Professional Growth', size: 'medium' }
  ]

  const galleryImages = images || defaultGalleryImages

  // Function to get CSS Grid classes based on image size
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-2 row-span-2'
      case 'wide':
        return 'col-span-2 row-span-1'
      case 'small':
        return 'col-span-1 row-span-1'
      default: // medium
        return 'col-span-1 row-span-1'
    }
  }

  return (
    <section className="pb-6">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div 
          ref={titleRef}
          className="text-center"
        >
          <SectionHeading
            title="Gallery"
            className="pt-4"
            titleClassName={`mb-6 transition-all duration-1000 ease-out ${
              isTitleVisible
                ? 'opacity-100 translate-y-0 scale-100 visible'
                : 'opacity-0 translate-y-8 scale-95 invisible'
            }`}
          />
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
              maxWidth: '95vw', 
              maxHeight: '95vh',
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
              style={{ maxWidth: '95vw', maxHeight: '95vh', width: 'auto', height: 'auto' }}
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
    </section>
  )
}

export default Gallery
