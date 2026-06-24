'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import { Gallery, SectionHeading, WhatWeDoPillarContent } from '@/components/sections'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowUpRightIcon } from '@/components/icons/ArrowUpRightIcon'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Classroom gallery images from /classroom/classroomGallery folder
const classroomGalleryImages = [
  { src: '/classroom/classroomGallery/WhatsApp Image 2026-01-19 at 08.51.14.jpeg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/WhatsApp Image 2026-01-19 at 08.52.01.jpeg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/1.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/2.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/3.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/4.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/5.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/6.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/7.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/8.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/8(1).jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/9.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/10.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/11.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/15.JPG', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/16.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/17.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/18.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/19.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
  { src: '/classroom/classroomGallery/20.jpg', alt: 'Classroom Learning Experience', size: 'medium' as const },
]

export default function Classrooms() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  
  const titleText = "Empowering students through transformative learning experiences"

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
            src="/classroom/hero/newClassroomHero.jpg"
            alt="Classroom Learning Environment"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 50%' }}
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
                Engaging, interactive, and experiential programs that foster critical thinking, creativity, and holistic development.
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* First Paragraph */}
              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                Education today must do more than transfer knowledge. It must help learners think critically, adapt to change, care for their mental wellbeing, and develop the human skills required to succeed in life and work. At the same time, educators need support, tools, and methodologies that respond to evolving classrooms and learner needs.
              </p>

              {/* Second Paragraph */}
              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                Our education programs are designed as experiential learning interventions for schools, colleges, and business schools. They complement academic curricula by strengthening future-ready skills, emotional resilience, and effective teaching practices through participation, reflection, and real-world application.
              </p>

              {/* Third Paragraph */}
              <p className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text">
                Grounded in learning sciences, psychology, and creative methodologies, our programs create engaging, safe, and impactful learning experiences - for students and educators alike. Whether preparing learners for an uncertain future, supporting mental wellbeing, or equipping teachers with modern pedagogical tools, our focus is on building capability that lasts beyond the program.
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
              subtitle="We create transformative learning experiences that empower students to reach their full potential. Our classroom programs focus on three key areas:"
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
            {/* Future Ready Skills - index 0: image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              {/* Image Side */}
              <div className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
                <Image
                  src="/classroom/whatWeDo/23 Future Ready.jpg"
                  alt="Future Ready Skills Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: '40% center' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="blue"
                  title="Future Ready Skills"
                  description="Preparing students for tomorrow&apos;s challenges with digital literacy, critical thinking, creativity, and adaptability skills that are essential for success in an ever-evolving world."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/classrooms/services/future-ready-skills"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-blue-600 border-2 border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Mental Health and Wellbeing - index 1: content left, image right */}
            <div className="flex flex-col md:flex-row-reverse group cursor-pointer">
              {/* Image Side */}
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '0.6s' }}
              >
                <Image
                  src="/classroom/whatWeDo/22 Mental Health.JPG"
                  alt="Mental Health and Wellbeing Programs"
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
                  title="Mental Health and Wellbeing"
                  description="Supporting student mental health through mindfulness practices, stress management techniques, emotional regulation, and creating safe spaces for open dialogue about mental wellbeing."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/classrooms/services/mental-health"
                    className="animate-what-we-do-cta inline-flex items-center gap-2 bg-white text-green-600 border-2 border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text"
                    style={{ animationDelay: '0.6s' }}
                  >
                    Learn More
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Teacher and Parent Training - index 2: image left, content right */}
            <div className="flex flex-col md:flex-row group cursor-pointer">
              {/* Image Side */}
              <div
                className="animate-what-we-do-image relative w-full md:w-1/2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl"
                style={{ animationDelay: '1.2s' }}
              >
                <Image
                  src="/classroom/whatWeDo/21_Teacher_Training.jpg"
                  alt="Teacher and Parent Training Programs"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <WhatWeDoPillarContent
                  hoverColor="purple"
                  title="Teacher and Parent Training"
                  description="Empowering educators with modern teaching methodologies, classroom management techniques, student engagement strategies, and professional development opportunities."
                />
                <div className="flex items-center justify-between">
                  <Link
                    href="/classrooms/services/teacher-training"
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
              subtitle="Schools, colleges, and business schools who partner with us to create meaningful, lasting change."
              subtitleClassName="mb-16"
            >
              Proud to <span className="text-[#0047AB]">work</span> with
            </SectionHeading>
            
            <div className="max-w-full mx-auto">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-6xl h-64 md:h-96 lg:h-[28rem]">
                  <Image
                    src="/home/logo/classrooms.png"
                    alt="Proud to work with – Classrooms"
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
        <Gallery images={classroomGalleryImages} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
