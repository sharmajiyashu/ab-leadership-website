'use client'

import { Navbar, Footer } from '@/components/layout'
import { Gallery, SectionHeading, WhatWeDoPillarContent } from '@/components/sections'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BackgroundLayout } from '@/components/layout'
import { ArrowUpRightIcon } from '@/components/icons/ArrowUpRightIcon'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Communities gallery images from /communities/communitiesGallery folder
const communitiesGalleryImages = [
  { src: '/communities/communitiesGallery/44824214_2012538998769428_2120735678307237888_n (1).jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_1331.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_20180510_170416756.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_20180510_181225943_BURST000_COVER_TOP.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_20180510_181345079~2.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_2455.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_5768.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7452.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7454.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7458.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7475.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7478.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7484.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7485.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG_7492.PNG', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG20180920212559.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/IMG20180920213156.jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/Spreading the joy of acting & theatre among the students of Father Agnels Ashram, Bandra. @letsu (1).jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/Spreading the joy of acting & theatre among the students of Father Agnels Ashram, Bandra. @letsu (5).jpg', alt: 'Community Programs', size: 'medium' as const },
  { src: '/communities/communitiesGallery/Spreading the joy of acting & theatre among the students of Father Agnels Ashram, Bandra. @letsu.jpg', alt: 'Community Programs', size: 'medium' as const },
]

export default function Communities() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const titleText = "Building stronger communities through creative expression"

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
            src="/communities/hero/IMG_5862.jpg"
            alt="Community Arts-Based Programs Environment"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 60%' }}
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
                Strengthening Communities Through Collective Creativity and Care
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                Our community programs combine creative expression with therapeutic modalities to support connection, healing, and social cohesion. The focus is on restoring voice, dignity, emotional regulation, and shared meaning within groups.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                We design community-based interventions that embed expressive arts, somatic practices, drama-based methods, storytelling, and group processes within trauma-informed and psychosocial frameworks. These approaches support emotional expression, relationship repair, and collective resilience.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                By engaging participants as active contributors and co-creators, our programs create safe, inclusive spaces for dialogue, reflection, and growth. Whether working with vulnerable populations, supporting recovery from adversity, or strengthening community bonds, our initiatives are designed to create meaningful, people-centered impact.
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
              subtitle="We create transformative community experiences that bring people together and strengthen social bonds. Our community programs focus on supporting vulnerable populations through three specialized areas:"
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
            {/* At-Risk Children and Adolescents - image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              {/* Image Side */}
              <div className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src="/communities/sub-services/orphanages/hero/44824214_2012538998769428_2120735678307237888_n (1).jpg"
                  alt="At-Risk Children and Adolescents Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: '1% center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="blue"
                  title="At-Risk Children and Adolescents"
                  description="Designed for children facing abandonment, instability, or early adversity - offering safety, expression, and a path toward healing through creative engagement."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/communities/services/orphanages"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Senior Citizens - content left, image right */}
            <div className="flex flex-col md:flex-row-reverse group cursor-pointer">
              {/* Image Side */}
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '0.6s' }}
              >
                <Image
                  src="/communities/sub-services/senior-citizens/hero/IMG_20180510_170416756.jpg"
                  alt="Senior Citizens Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="purple"
                  title="Senior Citizens"
                  description="Restoring connection, purpose, and joy through gentle creative engagement."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/communities/services/senior-citizens"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-purple-600 border-2 border-purple-500 hover:bg-purple-600 hover:text-white hover:border-purple-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                    style={{ animationDelay: '0.6s' }}
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Queer Communities - image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              {/* Image Side */}
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '1.2s' }}
              >
                <Image
                  src="/communities/sub-services/lgbtq/hero/WhatsApp Image 2026-02-11 at 12.21.19.jpeg"
                  alt="Queer Communities Programs"
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
                  title="Queer Communities"
                  description="Rooted in queer-affirmative, trauma-informed practices - supporting expression, healing, and pride through creative and embodied modalities."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/communities/services/queer-communities"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-green-600 border-2 border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
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
              subtitle="Community organisations and institutions who partner with us to create meaningful, lasting change."
              subtitleClassName="mb-16"
            >
              Proud to <span className="text-[#0047AB]">work</span> with
            </SectionHeading>
            
            <div className="max-w-full mx-auto">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-6xl h-64 md:h-96 lg:h-[28rem]">
                  <Image
                    src="/home/logo/communities.png"
                    alt="Proud to work with – Communities"
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
        <Gallery images={communitiesGalleryImages} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
