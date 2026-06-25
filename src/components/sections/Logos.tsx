'use client'

import { DynamicMedia } from '@/components/ui/DynamicMedia'
import { useEffect, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'

const DEFAULT_LOGO_TABS = [
  { id: 'corporates', label: 'Corporates', src: '/home/logo/corporates.png', alt: 'Proud to work with – Corporates' },
  { id: 'classrooms', label: 'Classrooms', src: '/home/logo/classrooms.png', alt: 'Proud to work with – Classrooms' },
  { id: 'communities', label: 'Communities', src: '/home/logo/communities.png', alt: 'Proud to work with – Communities' },
  { id: 'clinics', label: 'Clinics', src: '/home/logo/clinics.png', alt: 'Proud to work with – Clinics' },
]

const Logos = () => {
  const [partnersInfo, setPartnersInfo] = useState({
    title: "Proud to work with",
    description: "Organisations across corporates, classrooms, communities, and clinics who partner with us to create meaningful, lasting change."
  })
  const [logoTabs, setLogoTabs] = useState<any[]>(DEFAULT_LOGO_TABS)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    // Fetch homepage settings for title & description
    fetch(`${apiUrl}/v1/api/app/homepage/settings`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data?.partnersSection) {
          setPartnersInfo({
            title: res.data.partnersSection.title || "Proud to work with",
            description: res.data.partnersSection.description || "Organisations across corporates, classrooms, communities, and clinics who partner with us to create meaningful, lasting change."
          })
        }
      })
      .catch(err => console.error("Error loading partners info:", err));

    // Fetch categories for the logo tabs
    fetch(`${apiUrl}/v1/api/app/categories`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data)) {
          const activeCategories = res.data.filter((cat: any) => cat.showPartnerOnHome !== false && cat.partnerImage);
          if (activeCategories.length > 0) {
            const newTabs = activeCategories.map((cat: any) => {
              const partnerImg = cat.partnerImage;
              const partnerUrl = typeof partnerImg === 'string' ? partnerImg : partnerImg?.url;
              return {
                id: cat.slug,
                label: cat.name,
                src: partnerUrl,
                alt: cat.partnerTitle || `Proud to work with - ${cat.name}`
              };
            });
            setLogoTabs(newTabs);
          }
        }
      })
      .catch(err => console.error("Error loading categories for logos:", err));
  }, [])

  const LOGO_TABS = logoTabs;
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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

    const currentSectionRef = sectionRef.current
    const currentTextRef = textRef.current

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef)
    }

    if (currentTextRef) {
      textObserver.observe(currentTextRef)
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

  // Animation for image - similar to text
  const imageOpacity = Math.min(1, textProgress * 1.5)
  const imageTranslateY = (1 - textProgress) * 60
  const imageScale = 1.0 + (textProgress * 0.05) // Reduced scale for less zoom

  return (
    <section ref={sectionRef} className="pt-4 pb-12">
      <div className="container mx-auto px-4">
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
            className="pt-8"
            subtitle={partnersInfo.description}
            subtitleClassName="mb-16"
          >
            {partnersInfo.title}
          </SectionHeading>
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-10 mb-10 font-bricolage-display text-gray-800"
          role="tablist"
          aria-label="Logo categories"
        >
          {LOGO_TABS.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTabIndex === index}
              aria-controls="logos-panel"
              id={`logos-tab-${tab.id}`}
              className={`pb-1 text-base md:text-lg border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 ${activeTabIndex === index
                ? 'font-semibold text-gray-900 border-gray-800'
                : 'font-medium text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
                }`}
              onClick={() => setActiveTabIndex(index)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' && index > 0) setActiveTabIndex(index - 1)
                else if (e.key === 'ArrowRight' && index < LOGO_TABS.length - 1) setActiveTabIndex(index + 1)
                else if (e.key === 'Home') setActiveTabIndex(0)
                else if (e.key === 'End') setActiveTabIndex(LOGO_TABS.length - 1)
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-full mx-auto" id="logos-panel" role="tabpanel" aria-labelledby={`logos-tab-${LOGO_TABS[activeTabIndex].id}`}>
          <div
            ref={imageRef}
            className="flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              opacity: imageOpacity,
              transform: `translateY(${imageTranslateY}px) scale(${imageScale})`,
              willChange: 'opacity, transform'
            }}
          >
            <div className="relative w-full max-w-6xl h-64 md:h-96 lg:h-[28rem]">
              {LOGO_TABS.map((tab, index) => (
                <DynamicMedia
                  key={tab.id}
                  media={tab.src}
                  alt={tab.alt}
                  fill
                  sizes="(min-width: 1024px) 960px, (min-width: 768px) 768px, 100vw"
                  className={`object-contain transition-opacity duration-500 ${activeTabIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  priority={index === 0}
                  aria-hidden={activeTabIndex !== index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Logos
