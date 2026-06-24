'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeading from './SectionHeading'

interface Feature {
  title: string
  description: string
  images: string[]
  alignment: 'left' | 'right'
  buttonText?: string
  buttonLink?: string
}

export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    fetch(`${apiUrl}/v1/api/app/homepage/settings`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data?.features)) {
          setFeatures(res.data.features)
        }
      })
      .catch(err => console.error("Error loading features:", err))
  }, [])

  useEffect(() => {
    if (features.length === 0) return

    const observers = features.map((_, index) => {
      const ref = sectionRefs.current[index]
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndices(prev => {
              const next = new Set(prev)
              next.add(index)
              return next
            })
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((obs, idx) => {
        const ref = sectionRefs.current[idx]
        if (obs && ref) obs.unobserve(ref)
      })
    }
  }, [features])

  if (features.length === 0) return null

  return (
    <section className="py-20 bg-neutral-50 overflow-hidden">
      <div className="container mx-auto px-4 space-y-28">
        {features.map((feature, idx) => {
          const isLeft = feature.alignment === 'left'
          const isVisible = visibleIndices.has(idx)

          return (
            <div
              key={idx}
              ref={el => { sectionRefs.current[idx] = el }}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Image Column */}
              <div 
                className={`w-full lg:w-1/2 order-2 ${
                  isLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="relative group">
                  {/* Outer glow/backdrop */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Grid or Single Image Wrapper */}
                  <div className="relative bg-white border border-neutral-200/60 p-3 rounded-2xl shadow-xl overflow-hidden">
                    {feature.images && feature.images.length > 1 ? (
                      <div className="grid grid-cols-2 gap-3 aspect-[4/3]">
                        {feature.images.slice(0, 4).map((img, imgIdx) => (
                          <div key={imgIdx} className="relative w-full h-full rounded-lg overflow-hidden bg-neutral-100">
                            <Image
                              src={img}
                              alt={`${feature.title} - image ${imgIdx + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-neutral-100">
                        <Image
                          src={feature.images?.[0] || '/background.svg'}
                          alt={feature.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Column */}
              <div 
                className={`w-full lg:w-1/2 order-1 ${
                  isLeft ? 'lg:order-2' : 'lg:order-1'
                } space-y-6`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-[10px] font-black tracking-wider uppercase text-blue-600 font-bricolage-text">
                    Featured Pillar
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight font-bricolage-display leading-[1.1]">
                  {feature.title}
                </h3>
                
                <p className="text-lg md:text-xl text-neutral-600 font-medium leading-relaxed font-bricolage-text">
                  {feature.description}
                </p>

                {feature.buttonLink && (
                  <div className="pt-4">
                    <Link
                      href={feature.buttonLink}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-900 hover:bg-[#0047AB] text-white text-base font-bold shadow-md shadow-gray-950/10 hover:shadow-lg hover:shadow-blue-600/10 transition-all active:scale-95 duration-300 font-bricolage-text"
                    >
                      {feature.buttonText || 'Learn More'}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
