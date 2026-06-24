'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import SectionHeading from '@/components/sections/SectionHeading'

const CorporateLogos = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [isImageVisible, setIsImageVisible] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Title animation observer
    const currentRef = titleRef.current
    if (currentRef) {
      const titleObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsTitleVisible(true)
            titleObserver.unobserve(entry.target)
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-100px',
        }
      )

      titleObserver.observe(currentRef)

      return () => {
        if (currentRef) {
          titleObserver.unobserve(currentRef)
        }
      }
    }
  }, [])

  useEffect(() => {
    // Image animation observer
    const currentRef = imageRef.current
    if (currentRef) {
      const imageObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsImageVisible(true)
            imageObserver.unobserve(entry.target)
          }
        },
        {
          threshold: 0.3,
          rootMargin: '-100px',
        }
      )

      imageObserver.observe(currentRef)

      return () => {
        if (currentRef) {
          imageObserver.unobserve(currentRef)
        }
      }
    }
  }, [])

  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          className="pt-4"
          titleRef={titleRef}
          subtitle="Organisations who partner with us to create meaningful, lasting change."
          titleClassName={`transition-all duration-1000 ease-out ${
            isTitleVisible
              ? 'opacity-100 translate-y-0 scale-100 visible'
              : 'opacity-0 translate-y-8 scale-95 invisible'
          }`}
          subtitleClassName={`mb-16 transition-all duration-1000 ease-out ${
            isTitleVisible
              ? 'opacity-100 translate-y-0 scale-100 visible'
              : 'opacity-0 translate-y-8 scale-95 invisible'
          }`}
        >
          Proud to <span className="text-[#0047AB]">work</span> with
        </SectionHeading>
        
        <div className="max-w-full mx-auto">
          <div 
            ref={imageRef}
            className={`flex items-center justify-center transition-all duration-1000 ease-out ${
              isImageVisible 
                ? 'opacity-100 translate-y-0 scale-100 visible' 
                : 'opacity-0 translate-y-8 scale-95 invisible'
            }`}
          >
            <div className="relative w-full max-w-6xl h-64 md:h-96 lg:h-[28rem]">
              <Image
                src="/home/logo/corporates.png"
                alt="Proud to work with – Corporates"
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
  )
}

export default CorporateLogos
