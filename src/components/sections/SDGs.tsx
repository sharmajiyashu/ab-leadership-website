'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import { Loader } from '@/components/ui/Loader'

// Default SDG data with official colors, names, and image paths
const DEFAULT_SDG_DATA = [
  {
    id: 3,
    name: 'Good Health and Well-being',
    color: '#4C9F38',
    image: '/home/sdgs/SDG3.jpeg'
  },
  {
    id: 4,
    name: 'Quality Education',
    color: '#C5192D',
    image: '/home/sdgs/SDG4.jpeg'
  },
  {
    id: 5,
    name: 'Gender Equality',
    color: '#FF3A21',
    image: '/home/sdgs/SDG5.jpeg'
  },
  {
    id: 8,
    name: 'Decent Work and Economic Growth',
    color: '#A21942',
    image: '/home/sdgs/SDG8.jpeg'
  },
  {
    id: 10,
    name: 'Reduced Inequalities',
    color: '#DD1367',
    image: '/home/sdgs/SDG10.jpeg'
  },
  {
    id: 17,
    name: 'Partnerships for the Goals',
    color: '#19486A',
    image: '/home/sdgs/SDG17.jpeg'
  },
]

const SDGs = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [sdgContainer, setSdgContainer] = useState({
    title: "Sustainable Development Goals",
    description: "Our work is aligned with the United Nations Sustainable Development Goals, contributing to a more equitable, healthy, and sustainable world.",
    backgroundImage: "/home/sdgs/sdg-reel-aspect-ratio-1660-700.png"
  })
  const [goalsList, setGoalsList] = useState<any[]>(DEFAULT_SDG_DATA)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/v1/api/app/homepage/settings`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data?.sdgs) {
          const bgImg = res.data.sdgs.backgroundImage;
          const bgUrl = typeof bgImg === 'string' ? bgImg : bgImg?.url;

          setSdgContainer({
            title: res.data.sdgs.title || "Sustainable Development Goals",
            description: res.data.sdgs.description || "Our work is aligned with the United Nations Sustainable Development Goals...",
            backgroundImage: bgUrl || "/home/sdgs/sdg-reel-aspect-ratio-1660-700.png"
          })
          if (Array.isArray(res.data.sdgs.goals) && res.data.sdgs.goals.length > 0) {
            // Map backend goals to match keys or values
            const mapped = res.data.sdgs.goals.map((g: any, idx: number) => {
              const iconUrl = typeof g === 'string' ? g : (g?.url || g?.icon?.url);
              return {
                id: idx,
                name: `Goal ${idx + 1}`,
                color: "#1E3A8A",
                image: iconUrl || "/home/sdgs/SDG3.jpeg" // Fallback if no icon
              };
            })
            setGoalsList(mapped)
          }
        }
      })
      .catch(err => console.error("Error loading SDGs settings:", err))
      .finally(() => setIsLoading(false))
  }, [])
  const [isVisible, setIsVisible] = useState(false)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const cardsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate scroll progress when section is in view
      if (sectionTop < windowHeight * 1.2 && sectionTop > -sectionHeight) {
        const startPoint = windowHeight * 1.2
        const endPoint = -sectionHeight
        const progress = Math.max(0, Math.min(1, (startPoint - sectionTop) / (startPoint - endPoint)))
        setScrollProgress(progress)
        setMaxProgress(prev => Math.max(prev, progress))
      } else if (sectionTop >= windowHeight * 1.2) {
        if (maxProgress < 1) {
          setScrollProgress(0)
        }
      } else {
        setScrollProgress(1)
        setMaxProgress(1)
      }
    }

    // Observer for the entire section to trigger scroll listening
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll()
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
  const effectiveProgress = isSectionVisible ? Math.max(scrollProgress, maxProgress) : maxProgress

  // Separate animation for text
  const textProgress = Math.min(1, effectiveProgress * 2.5)
  const textOpacity = Math.min(1, textProgress * 1.5)
  const textTranslateY = (1 - textProgress) * 60
  const textScale = 0.95 + (textProgress * 0.05)

  if (isLoading) {
    return <Loader />
  }

  return (
    <section ref={sectionRef} className="relative pt-4 pb-4 px-4 md:px-0 overflow-hidden min-h-[584px] flex flex-col justify-center">
      {/* Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full z-0"
      >
        <div className="relative w-full h-full">
          {sdgContainer.backgroundImage && (
            <Image
              src={sdgContainer.backgroundImage}
              alt="SDG Background"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
        </div>
        {/* Black overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          ref={textRef}
          className="transition-all duration-700 ease-out mb-24"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            willChange: 'opacity, transform'
          }}
        >
          <SectionHeading
            variant="onDark"
            title={sdgContainer.title}
            subtitle={sdgContainer.description}
          />
        </div>

        <div ref={cardsRef} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 max-w-7xl mx-auto">
          {goalsList.map((sdg, index) => (
            <div
              key={sdg.id}
              className={`group relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-32'
                }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                transitionTimingFunction: isVisible ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out'
              }}
            >
              {/* SDG Image */}
              <div className="relative aspect-square w-full">
                {sdg.image && (
                  <Image
                    src={sdg.image}
                    alt={sdg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 14vw"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SDGs
