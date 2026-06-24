'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import { Gallery, SectionHeading, WhatWeDoPillarContent } from '@/components/sections'
import { HowWeDoIt, Modalities, WhyChooseUs, CorporateLogos } from '@/components/corporate'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowUpRightIcon } from '@/components/icons/ArrowUpRightIcon'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Corporate() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const titleText = "We help teams work better, feel better, and grow together"

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
      }, 50) // 50ms per character

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
      // Hide cursor and show subtitle after a brief pause
      const timer = setTimeout(() => {
        setSubtitleOpacity(1)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isTypingComplete])

  // Description section paragraphs
  const descriptionParagraph1 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const descriptionParagraph2 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')

  // What do we do section
  const whatWeDoTitle = useScrollAnimation<HTMLHeadingElement>(0, 0.3, '-100px')
  const whatWeDoDescription = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')

  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[350px] md:h-[500px] lg:h-[700px] overflow-hidden">
          <Image
            src="/corporate/newCorporateHero.JPG"
            alt="Corporates Leadership - Creative Leadership Quote"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 10%' }}
            priority
          />
          {/* Semi-transparent black overlay */}
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
                className="text-xl md:text-2xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-2"                style={{ opacity: subtitleOpacity }}
              >
                ROI-driven experiential leadership, wellness, and culture programs designed for real workplace impact.
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* First Paragraph */}
              <p 
                ref={descriptionParagraph1.ref}
                className={`text-xl text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                  descriptionParagraph1.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100 visible' 
                    : 'opacity-0 translate-y-8 scale-95 invisible'
                }`}
              >
                Workplaces thrive when people feel valued, supported, and trusted to do their best work. When employees experience clarity, psychological safety, and care, collaboration improves and performance follows naturally.
              </p>

              {/* Second Paragraph */}
              <p 
                ref={descriptionParagraph2.ref}
                className={`text-xl text-gray-700 leading-relaxed text-justify font-bricolage-text transition-all duration-1000 ease-out ${
                  descriptionParagraph2.isVisible 
                    ? 'opacity-100 translate-y-0 scale-100 visible' 
                    : 'opacity-0 translate-y-8 scale-95 invisible'
                }`}
              >
                Our corporates programs strengthen these human foundations through experiential, participative learning that reflects real workplace challenges. We partner with organizations to understand their needs and design customized learning journeys that support individual growth, team connection, and healthy ways of working. Through practical tools, reflection, and shared experiences, we help leaders show up with presence, teams build resilience, and cultures evolve in inclusive and sustainable ways.
              </p>
            </div>
          </div>
        </section>

        {/* What do we do? Section */}
        <section className="py-16">
          <div className="text-center mb-12 px-4">
            <SectionHeading
              titleRef={whatWeDoTitle.ref}
              titleClassName={`mb-6 transition-all duration-1000 ease-out ${
                whatWeDoTitle.isVisible
                  ? 'opacity-100 translate-y-0 scale-100 visible'
                  : 'opacity-0 translate-y-8 scale-95 invisible'
              }`}
              subtitle="We help teams perform better, feel better, and work better together. Our corporates offerings sit in three pillars:"
              subtitleRef={whatWeDoDescription.ref}
              subtitleClassName={`transition-all duration-1000 ease-out ${
                whatWeDoDescription.isVisible
                  ? 'opacity-100 translate-y-0 scale-100 visible'
                  : 'opacity-0 translate-y-8 scale-95 invisible'
              }`}
            >
              What do <span className="text-[#0047AB]">we</span> do?
            </SectionHeading>
          </div>
          
          <div className="space-y-8 md:space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Leadership & Employee Development - image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              {/* Image Side */}
              <div className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src="/corporate/whatWeDo/33culture.jpg"
                  alt="Leadership & Employee Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="blue"
                  title="Leadership & Employee Development"
                  description="Build leadership capability that improves how managers lead, teams collaborate, and work gets executed in real organisational contexts, grounded in behavioural science and experiential learning."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/corporate/services/leadership"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Wellness & Mental Health - content left, image right */}
            <div className="flex flex-col md:flex-row-reverse group cursor-pointer">
              {/* Image Side */}
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '0.6s' }}
              >
                <Image
                  src="/corporate/whatWeDo/32 wellness.JPG"
                  alt="Wellness & Mental Health Intervention"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="green"
                  title="Wellness & Mental Health Intervention"
                  description="Workplace mental health programs that go beyond awareness to build resilience, focus, and emotional regulation, using habits that support employee wellbeing, engagement, and sustained performance."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/corporate/services/wellness"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-green-600 border-2 border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                    style={{ animationDelay: '0.6s' }}
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Culture & Organizational Development - image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              {/* Image Side */}
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '1.2s' }}
              >
                <Image
                  src="/corporate/whatWeDo/331culture.jpg"
                  alt="Culture & Organizational Development"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'left center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="purple"
                  title="Culture & Organizational Development"
                  description="Design people-centred systems that strengthen psychological safety, inclusive practices, and ways of working, enabling change, alignment, and sustained performance through everyday rituals and shared accountability."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/corporate/services/culture"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-purple-600 border-2 border-purple-500 hover:bg-purple-600 hover:text-white hover:border-purple-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                    style={{ animationDelay: '1.2s' }}
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Do It Section */}
        <HowWeDoIt />

        {/* Modalities Section */}
        <Modalities />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Trusted By Section */}
        <CorporateLogos />

        {/* Gallery Section */}
        <Gallery />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
