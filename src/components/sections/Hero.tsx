'use client'

import { DynamicMedia } from '@/components/ui/DynamicMedia'
import Image from 'next/image'
import Slider from 'react-infinite-logo-slider'
import { useState, useEffect } from 'react'
const Hero = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [heroData, setHeroData] = useState<{
    title: string;
    description: string;
    image: any;
    logosTitle: string;
    logos: string[];
  }>({
    title: "Shaping Wellbeing & Leadership Journeys",
    description: "Corporates · Classrooms · Communities · Clinics",
    image: "/home/hero/IMG_2190.JPG",
    logosTitle: "As Featured On",
    logos: []
  })

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/v1/api/app/homepage/settings`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          const heroImg = res.data.hero?.image;
          const heroUrl = typeof heroImg === 'string' ? heroImg : heroImg?.url;
          setHeroData({
            title: res.data.hero?.title || "Shaping Wellbeing & Leadership Journeys",
            description: res.data.hero?.description || "Corporates · Classrooms · Communities · Clinics",
            image: heroUrl || "/home/hero/IMG_2190.JPG",
            logosTitle: res.data.logosTitle || "As Featured On",
            logos: Array.isArray(res.data.logos) && res.data.logos.length > 0 
              ? res.data.logos.map((logo: any) => typeof logo === 'string' ? logo : logo?.url).filter(Boolean) 
              : []
          })
        }
      })
      .catch(err => console.error("Error fetching homepage settings:", err))
  }, [])

  const titleText = heroData.title

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText("")
    setIsTypingComplete(false)
    setSubtitleOpacity(0)

    const startDelay = setTimeout(() => {
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

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Fade in subtitle after typing is complete
  useEffect(() => {
    if (isTypingComplete) {
      const timer = setTimeout(() => {
        setSubtitleOpacity(1)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isTypingComplete])

  return (
    <section className="pb-4">
      {/* Full Width Image */}
      <div className="relative w-full h-[400px] md:h-[550px] lg:h-[750px] overflow-hidden">
        <DynamicMedia
          media={heroData.image}
          alt="Abhishek Banerji - Professional Portrait"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 50%' }}
          priority
        />
        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center pt-20">
          <div className="text-center text-white px-4 w-full">
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold font-bricolage-display whitespace-nowrap">
              {displayedText}
              <span
                className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle transition-opacity duration-100 ${showCursor && !isTypingComplete ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            </h1>
            <p
              className="text-lg md:text-2xl lg:text-3xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-4"
              style={{ opacity: subtitleOpacity }}
            >
              {heroData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Company Logos Section */}
      <div className="bg-transparent hero-logo-slider">
        <div className="max-w-full mx-auto bg-transparent">
          <h2 className="text-2xl font-bold text-gray-600 text-center pt-8 mb-6 font-bricolage-display">
            {heroData.logosTitle}
          </h2>
          <Slider
            width="300px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor="transparent"
          >
            {(heroData.logos.length > 0
              ? heroData.logos
              : Array.from({ length: 12 }, (_, i) => `/home/heroLogos/${i + 1}.png`)
            ).map((logo, index) => (
              <Slider.Slide key={index}>
                <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                  <DynamicMedia
                    media={logo}
                    alt={`Featured Logo ${index + 1}`}
                    width={300}
                    height={300}
                    className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                  />
                </div>
              </Slider.Slide>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Hero
