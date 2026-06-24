'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import { Gallery, SectionHeading, WhatWeDoPillarContent } from '@/components/sections'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowUpRightIcon } from '@/components/icons/ArrowUpRightIcon'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Clinical gallery images from /clinical/gallery folder
const clinicalGalleryImages = [
  { src: '/clinical/gallery/IMG_7382.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/IMG_7412.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/IMG_7443.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/1.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/2.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/3.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/4.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/5.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/6.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/7.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/8.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/9.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/10.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/11.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/12.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/13.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/14.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/15.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/16.PNG', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/17.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/18.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/19.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/20.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
  { src: '/clinical/gallery/21.jpg', alt: 'Clinical Arts-Based Therapy Session', size: 'medium' as const },
]

export default function Clinical() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const titleText = "Healing through the transformative power of the arts"

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

  const whatWeDoTitle = useScrollAnimation<HTMLHeadingElement>(0, 0.3, '-100px')
  const whatWeDoDescription = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')

  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[350px] md:h-[500px] lg:h-[700px] overflow-hidden">
          <Image
            src="/clinical/hero/IMG_2612.jpg"
            alt="Clinical Arts-Based Therapy Environment"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 55a%' }}
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
                className="text-xl md:text-2xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-2"
                style={{ opacity: subtitleOpacity }}
              >
                Evidence-based clinical arts-based therapy programs designed to support healing, growth, and emotional well-being across all ages.
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                Our clinical services integrate expressive arts modalities within established therapeutic frameworks to support emotional processing, trauma recovery, developmental needs, and mental health care across the lifespan. Arts-based therapy offers pathways to healing that complement verbal approaches, particularly when experiences are complex, overwhelming, or difficult to articulate.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                We work from the belief that creative expression can safely access emotional, cognitive, and somatic layers of experience - supporting regulation, insight, and integration. Our clinicians use visual arts, music, drama, movement, and storytelling as therapeutic tools within trauma-informed, developmentally appropriate, and ethically grounded practice.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                Each intervention is individualised and goal-oriented, shaped by clinical assessment, client needs, and ongoing evaluation. Whether supporting children with developmental differences, individuals navigating psychiatric conditions, or older adults facing cognitive and emotional transitions, our services prioritise dignity, safety, and measurable therapeutic outcomes.
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
              subtitle="Evidence-based clinical arts-based therapy programs designed to support healing and wellbeing across all ages. Our clinical services focus on three key areas:"
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
            {/* Children with Special Needs - image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              <div className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src="/clinical/sub-services/special-needs/hero/5.jpg"
                  alt="Children with Special Needs Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="blue"
                  title="Children with Special Needs"
                  description="Specialized therapeutic interventions for children and adolescents with autism, ADHD, learning disabilities, and developmental disorders using sensory-based creative activities."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/clinical/services/special-needs"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Individuals in Psychiatric Care - content left, image right */}
            <div className="flex flex-col md:flex-row-reverse group cursor-pointer">
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '0.6s' }}
              >
                <Image
                  src="/clinical/sub-services/psychiatric/hero/c80196e4-6266-11eb-8da7-ea4a7a3f2bd0_1611948077247.jpeg"
                  alt="Individuals in Psychiatric Care Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="green"
                  title="Individuals in Psychiatric Care"
                  description="Comprehensive mental health support for individuals dealing with mood disorders, anxiety, trauma, substance use recovery, and other psychiatric conditions through expressive arts therapy."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/clinical/services/psychiatric-care"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-green-600 border-2 border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                    style={{ animationDelay: '0.6s' }}
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Older Adults & Geriatric Population - image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '1.2s' }}
              >
                <Image
                  src="/clinical/sub-services/geriatric/hero/WhatsApp Image 2026-02-11 at 12.20.32.jpeg"
                  alt="Older Adults & Geriatric Population Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="purple"
                  title="Older Adults & Geriatric Care"
                  description="Compassionate therapeutic services for older adults and geriatric populations, focusing on memory enhancement, emotional well-being, and maintaining dignity through creative expression."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/clinical/services/geriatric"
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

        {/* Trusted By Section */}
        <section className="pt-16 pb-16">
          <div className="container mx-auto px-4">
            <SectionHeading
              className="pt-8"
              subtitle="Hospitals, clinics, and care institutions who partner with us to create meaningful, lasting change."
              subtitleClassName="mb-16"
            >
              Proud to <span className="text-[#0047AB]">work</span> with
            </SectionHeading>
            
            <div className="max-w-full mx-auto">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-6xl h-64 md:h-96 lg:h-[28rem]">
                  <Image
                    src="/home/logo/clinics.png"
                    alt="Proud to work with – Clinics"
                    fill
                    sizes="(min-width: 1024px) 960px, (min-width: 768px) 768px, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery images={clinicalGalleryImages} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
