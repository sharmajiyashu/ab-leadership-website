'use client'

import Image from 'next/image'
import Slider from 'react-infinite-logo-slider'
import { useState, useEffect } from 'react'
const Hero = () => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const titleText = "Shaping Wellbeing & Leadership Journeys"

  useEffect(() => {
    // Start typewriter effect after a short delay
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
        <Image
          src="/home/hero/IMG_2190.JPG"
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
                className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle transition-opacity duration-100 ${
                  showCursor && !isTypingComplete ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </h1>
            <p 
              className="text-lg md:text-2xl lg:text-3xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-4"
              style={{ opacity: subtitleOpacity }}
            >
              Corporates · Classrooms · Communities · Clinics
            </p>
          </div>
        </div>
      </div>
      
      {/* Company Logos Section */}
      <div className="bg-transparent hero-logo-slider">
        <div className="max-w-full mx-auto bg-transparent">
          <h2 className="text-2xl font-bold text-gray-600 text-center pt-8 mb-6 font-bricolage-display">
            As Featured On
          </h2>
          <Slider
            width="300px"
            duration={40}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor="transparent"
          >
            {/* Company Logos */}
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/1.png"
                  alt="Company Logo 1"
                  width={300}
                  height={300}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/2.png"
                  alt="Company Logo 2"
                  width={300}
                  height={300}
                  className="w-96 h-96 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/3.png"
                  alt="Company Logo 3"
                  width={300}
                  height={300}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/4.png"
                  alt="Company Logo 4"
                  width={300}
                  height={300}
                  className="w-96 h-96 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/5.png"
                  alt="Company Logo 5"
                  width={300}
                  height={300}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/6.png"
                  alt="Company Logo 6"
                  width={400}
                  height={400}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/7.png"
                  alt="Company Logo 7"
                  width={400}
                  height={400}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/8.png"
                  alt="Company Logo 8"
                  width={400}
                  height={400}
                  className="w-96 h-96 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/9.png"
                  alt="Company Logo 9"
                  width={400}
                  height={300}
                  className="w-96 h-96 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/10.png"
                  alt="Company Logo 10"
                  width={400}
                  height={400}
                  className="w-96 h-96 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/11.png"
                  alt="Company Logo 11"
                  width={400}
                  height={400}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
            <Slider.Slide>
              <div className="flex items-center justify-center min-w-[300px] h-48 overflow-hidden">
                <Image
                  src="/home/heroLogos/12.png"
                  alt="Company Logo 12"
                  width={400}
                  height={400}
                  className="w-80 h-80 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                />
              </div>
            </Slider.Slide>
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Hero
