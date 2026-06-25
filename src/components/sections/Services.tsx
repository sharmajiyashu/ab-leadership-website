'use client'

import { DynamicMedia } from '@/components/ui/DynamicMedia'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import SectionHeading from './SectionHeading'
import { Loader } from '@/components/ui/Loader'

const Services = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const cardsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const defaultServices = [
    {
      title: "Corporates",
      description: "ROI-driven experiential programs that help teams work better, feel better, and grow together through leadership and wellness.",
      image: "/corporate/newCorporateHero.JPG",
      href: "/corporate",
      objectPosition: "center 30%",
      titleColor: "#A3B6DC",
      buttonHoverColor: "#394E84"
    },
    {
      title: "Classrooms",
      description: "Experiential learning programs that empower students through transformative experiences, fostering critical thinking and creativity.",
      image: "/classroom/hero/newClassroomHero.jpg",
      href: "/classrooms",
      scale: 1.4,
      titleColor: "#FCD34D",
      buttonHoverColor: "#EAB308"
    },
    {
      title: "Communities",
      description: "Creative expression programs that build stronger communities through collective creativity, connection, and care.",
      image: "/communities/hero/IMG_5862.jpg",
      href: "/communities",
      objectPosition: "center 90%",
      scale: 1.4,
      translateY: -50,
      titleColor: "#6EE7B7",
      buttonHoverColor: "#22C55E"
    },
    {
      title: "Clinics",
      description: "Evidence-based arts-based therapy programs that support healing, growth, and emotional well-being across all ages.",
      image: "/clinical/hero/IMG_2612.jpg",
      href: "/clinical",
      objectPosition: "center 20%",
      scale: 1.15,
      titleColor: "#F9A8D4",
      buttonHoverColor: "#FB923C"
    }
  ]

  const [servicesList, setServicesList] = useState<any[]>(defaultServices)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/v1/api/app/services?showOnHome=true`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setServicesList(res.data)
        }
      })
      .catch(err => console.error("Error loading services:", err))
      .finally(() => setIsLoading(false))
  }, [])

  const services = servicesList;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate scroll progress when section is in view
      if (sectionTop < windowHeight * 1.2 && sectionTop > -sectionHeight) {
        // Start animation earlier - when section is 20% above viewport
        const startPoint = windowHeight * 1.2
        const endPoint = -sectionHeight
        const progress = Math.max(0, Math.min(1, (startPoint - sectionTop) / (startPoint - endPoint)))
        setScrollProgress(progress)
        setMaxProgress(prev => Math.max(prev, progress))
      } else if (sectionTop >= windowHeight * 1.2) {
        // Section hasn't reached viewport yet - only update if not already animated
        if (maxProgress < 1) {
          setScrollProgress(0)
        }
      } else {
        // Section has scrolled past
        setScrollProgress(1)
        setMaxProgress(1)
      }
    }

    // Observer for the entire section to trigger scroll listening
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
          // Start listening to scroll events when section is visible
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll() // Initial calculation
        }
      },
      { threshold: 0, rootMargin: '200px' }
    )

    // Observer for text section - trigger earlier
    const textObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll()
        }
      },
      { threshold: 0, rootMargin: '300px' }
    )

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2, rootMargin: '-100px' }
    )

    const currentSectionRef = sectionRef.current
    const currentTextRef = textRef.current
    const currentCardsRef = cardsRef.current

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef)
    }

    if (currentTextRef) {
      textObserver.observe(currentTextRef)
    }

    if (currentCardsRef) {
      observer.observe(currentCardsRef)
    }

    // Initial check and always listen to scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (currentSectionRef) {
        sectionObserver.unobserve(currentSectionRef)
      }
      if (currentTextRef) {
        textObserver.unobserve(currentTextRef)
      }
      if (currentCardsRef) {
        observer.unobserve(currentCardsRef)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [maxProgress])

  // Calculate animation values based on scroll progress
  // Use max progress to ensure animation only happens once
  const effectiveProgress = isSectionVisible ? Math.max(scrollProgress, maxProgress) : maxProgress

  // Separate animation for text - earlier trigger and different easing
  const textProgress = Math.min(1, effectiveProgress * 2.5) // Faster text animation
  const textOpacity = Math.min(1, textProgress * 1.5)
  const textTranslateY = (1 - textProgress) * 60 // More dramatic text movement
  const textScale = 0.95 + (textProgress * 0.05) // Subtle scale effect for text

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <section ref={sectionRef} className="pt-4 pb-20">
        <div className="container mx-auto px-4 md:px-0">
          <div
            ref={textRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px) scale(${textScale})`,
              willChange: 'opacity, transform'
            }}
          >
            <SectionHeading
              variant="brand"
              title="Services"
              subtitle="Guided by a philosophy of holistic and integrative wellness, we work across corporates, classrooms, communities, and clinics. Translating psychological insight into context-sensitive, practice-first interventions that move people from awareness to action."
              subtitleClassName="mb-16"
            />
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const categorySlug = service.categoryId?.slug;
              const targetHref = categorySlug
                ? (service.slug ? `/${categorySlug}/services/${service.slug}` : `/${categorySlug}`)
                : service.href;

              return (
                <Link
                  key={index}
                  href={targetHref}
                  className={`group relative h-[500px] overflow-hidden rounded-xl cursor-pointer block transition-all duration-1000 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-32'
                    }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 200}ms` : '0ms',
                    transitionTimingFunction: isVisible ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={service.scale ? {
                      transform: `scale(${service.scale})${service.translateY ? ` translateY(${service.translateY}px)` : ''}`
                    } : undefined}
                  >
                    <DynamicMedia
                      media={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: service.objectPosition || 'center'
                      }}
                    />
                  </div>

                  {/* Strong gradient overlay for text readability - always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

                  {/* Description and button - always visible */}
                  <div className="absolute bottom-0 left-0 right-0 z-10">
                    <div className="px-6 py-6">
                      <p className="text-gray-200 text-sm leading-relaxed mb-6 font-bricolage-text" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' }}>
                        {service.description}
                      </p>
                      <div
                        className="px-4 py-2 border text-white rounded-lg font-medium inline-block transition-all duration-300"
                        style={{
                          backgroundColor: hoveredIndex === index ? service.buttonHoverColor : 'transparent',
                          borderColor: hoveredIndex === index ? service.buttonHoverColor : 'white'
                        }}
                      >
                        Learn More
                      </div>
                    </div>
                  </div>

                  {/* Title - positioned above description */}
                  <div className="absolute bottom-0 left-0 right-0 -translate-y-36 z-20">
                    <div className="px-6 py-6">
                      <h3 className="text-3xl font-bold text-white font-bricolage-display" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)' }}>
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
