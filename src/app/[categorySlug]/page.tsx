'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import { Gallery, SectionHeading, WhatWeDoPillarContent } from '@/components/sections'
import { HowWeDoIt, Modalities, WhyChooseUs, CorporateLogos } from '@/components/corporate'
import Image from 'next/image'
import { DynamicMedia } from '@/components/ui/DynamicMedia'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { ArrowUpRightIcon } from '@/components/icons/ArrowUpRightIcon'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Loader } from '@/components/ui/Loader'

interface Service {
  _id: string;
  title: string;
  description: string;
  image: any;
  slug: string;
  href?: string;
  showOnHome?: boolean;
}

interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: any;
  descriptionParagraphs: string[];
  whatWeDoSubtitle?: string;
  galleryImages?: any[];
  partnerTitle?: string;
  partnerSubtitle?: string;
  partnerImage?: any;
  howWeDoIt?: {
    isActive: boolean;
    title: string;
    subtitle: string;
    backgroundImage?: any;
    steps: Array<{ title: string; description: string }>;
  };
  modalities?: {
    isActive: boolean;
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string; icon?: any; color: string; practices: string[] }>;
  };
  whyChooseUs?: {
    isActive: boolean;
    title: string;
    subtitle: string;
    points: Array<{ title: string; description: string; image?: any }>;
  };
  services: Service[];
}

export default function CategoryDetailPage() {
  const params = useParams()
  const categorySlug = params.categorySlug as string

  const [category, setCategory] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)

  // Typewriter effect states
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [subtitleOpacity, setSubtitleOpacity] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Scroll animations
  const descParagraph1 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const descParagraph2 = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')
  const whatWeDoTitle = useScrollAnimation<HTMLHeadingElement>(0, 0.3, '-100px')
  const whatWeDoDescription = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px')

  useEffect(() => {
    if (!categorySlug) return
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    setLoading(true)
    fetch(`${apiUrl}/v1/api/app/categories/slug/${categorySlug}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setCategory(res.data)
        }
      })
      .catch(err => console.error("Error fetching category details:", err))
      .finally(() => setLoading(false))
  }, [categorySlug])

  // Typewriter effect when category changes
  useEffect(() => {
    if (!category) return

    setDisplayedText('')
    setIsTypingComplete(false)
    setSubtitleOpacity(0)

    const titleText = category.heroTitle || ""
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
      }, 40) // 40ms per character

      return () => clearInterval(typingInterval)
    }, 400)

    return () => clearTimeout(startDelay)
  }, [category])

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
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [isTypingComplete])

  if (loading) {
    return (
      <BackgroundLayout>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader />
        </div>
        <Footer />
      </BackgroundLayout>
    )
  }

  if (!category) {
    return (
      <BackgroundLayout>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
          <h1 className="text-4xl font-bold font-bricolage-display text-gray-900 mb-2">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you are looking for does not exist.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium">
            Go back home
          </Link>
        </div>
        <Footer />
      </BackgroundLayout>
    )
  }

  // Pillar colors/hover helpers matching original layout rules
  const getPillarStyles = (index: number) => {
    const styles = [
      { hoverColor: 'blue' as const, textColor: 'text-blue-600', borderHover: 'hover:border-blue-600', bgHover: 'hover:bg-blue-600' },
      { hoverColor: 'green' as const, textColor: 'text-green-600', borderHover: 'hover:border-green-600', bgHover: 'hover:bg-green-600' },
      { hoverColor: 'purple' as const, textColor: 'text-purple-600', borderHover: 'hover:border-purple-600', bgHover: 'hover:bg-purple-600' }
    ]
    return styles[index % styles.length]
  }

  // Default gallery mapping matching current static layouts if database returns empty
  const defaultGalleries: Record<string, Array<{ src: string, alt: string, size: 'medium' }>> = {
    classrooms: [
      { src: '/classroom/classroomGallery/1.jpg', alt: 'Classroom Learning Experience', size: 'medium' },
      { src: '/classroom/classroomGallery/2.JPG', alt: 'Classroom Learning Experience', size: 'medium' },
      { src: '/classroom/classroomGallery/3.jpg', alt: 'Classroom Learning Experience', size: 'medium' },
      { src: '/classroom/classroomGallery/4.JPG', alt: 'Classroom Learning Experience', size: 'medium' },
      { src: '/classroom/classroomGallery/5.jpg', alt: 'Classroom Learning Experience', size: 'medium' }
    ],
    clinical: [
      { src: '/clinical/gallery/1.jpg', alt: 'Clinical ABT Session', size: 'medium' },
      { src: '/clinical/gallery/2.jpg', alt: 'Clinical ABT Session', size: 'medium' },
      { src: '/clinical/gallery/3.jpg', alt: 'Clinical ABT Session', size: 'medium' }
    ],
    communities: [
      { src: '/communities/communitiesGallery/IMG_1331.jpg', alt: 'Community Programs', size: 'medium' },
      { src: '/communities/communitiesGallery/IMG_2455.jpg', alt: 'Community Programs', size: 'medium' },
      { src: '/communities/communitiesGallery/IMG_5768.jpg', alt: 'Community Programs', size: 'medium' }
    ]
  };

  const galleryImages = (category.galleryImages && category.galleryImages.length > 0)
    ? category.galleryImages.map(img => ({ src: img?.url || img, alt: `${category.name} Gallery Image`, size: 'medium' as const }))
    : defaultGalleries[category.slug] || [];

  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[350px] md:h-[500px] lg:h-[700px] overflow-hidden">
          {category.heroImage ? (
            <DynamicMedia
              media={category.heroImage}
              alt={`${category.name} Hero`}
              fill
              className="object-cover"
              style={{ objectPosition: 'center 40%' }}
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
          <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-5xl">
              <h1 className="text-4xl md:text-6xl font-bold font-bricolage-display">
                {displayedText}
                <span
                  className={`inline-block w-[3px] h-[1em] bg-white ml-1 align-middle transition-opacity duration-100 ${showCursor && !isTypingComplete ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </h1>
              <p
                className="text-xl md:text-2xl max-w-3xl mx-auto font-bricolage-text transition-opacity duration-1000 ease-in-out mt-3"
                style={{ opacity: subtitleOpacity }}
              >
                {category.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {category.descriptionParagraphs?.map((para, idx) => {
                return (
                  <p
                    key={idx}
                    className="text-lg text-gray-700 leading-relaxed text-justify font-bricolage-text"
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </div>
        </section>

        {/* What do we do? Section */}
        {category.services && category.services.filter(s => !s.showOnHome).length > 0 && (
          <section className="py-16">
            <div className="text-center mb-12 px-4">
              <SectionHeading
                titleClassName="mb-6 font-bricolage-display text-gray-900"
                subtitle={category.whatWeDoSubtitle || `Learn more about our services in ${category.name}`}
                subtitleClassName="font-bricolage-text text-gray-600"
              >
                What do <span className="text-[#0047AB]">we</span> do?
              </SectionHeading>
            </div>

            <div className="space-y-12 md:space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {category.services.filter(s => !s.showOnHome).map((service, index) => {
                const isEven = index % 2 === 0;
                const pillarStyles = getPillarStyles(index);

                // Button colors based on index matching the original designs
                const btnColors = [
                  "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600",
                  "text-green-600 border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600",
                  "text-purple-600 border-purple-500 hover:bg-purple-600 hover:text-white hover:border-purple-600"
                ];
                const btnClass = btnColors[index % btnColors.length];

                return (
                  <div
                    key={service._id}
                    className={`flex flex-col ${!isEven ? 'md:flex-row-reverse' : 'md:flex-row'} group cursor-pointer`}
                  >
                    {/* Image Side */}
                    <div className="animate-what-we-do-image relative w-full md:w-1/2 aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-2xl">
                      {service.image ? (
                        <DynamicMedia
                          media={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200" />
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <WhatWeDoPillarContent
                        hoverColor={pillarStyles.hoverColor}
                        title={service.title}
                        description={service.description}
                      />
                      <div className="flex items-center justify-between">
                        <Link
                          href={service.href || `/${category.slug}/services/${service.slug}`}
                          className={`animate-what-we-do-cta inline-flex items-center gap-2 bg-white ${btnClass} border-2 px-7 py-3.5 rounded-full text-base font-medium transition-colors font-bricolage-text`}
                        >
                          Learn More
                          <ArrowUpRightIcon className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Shared Category Modules */}
        {category.howWeDoIt?.isActive && <HowWeDoIt data={category.howWeDoIt} />}
        {category.modalities?.isActive && <Modalities data={category.modalities} />}
        {category.whyChooseUs?.isActive && <WhyChooseUs data={category.whyChooseUs} />}

        {/* Dynamic Partner Logos Section */}
        {category.partnerImage && (
          <section className="pt-8 pb-16">
            <div className="container mx-auto px-4">
              <SectionHeading
                className="pt-4"
                subtitle={category.partnerSubtitle || "Organisations who partner with us to create meaningful, lasting change."}
                titleClassName="font-bricolage-display text-gray-900"
                subtitleClassName="mb-16 font-bricolage-text text-gray-600"
              >
                {category.partnerTitle || "Proud to work with"}
              </SectionHeading>

              <div className="max-w-full mx-auto flex items-center justify-center">
                <div className="relative w-full max-w-6xl h-64 md:h-96 lg:h-[28rem]">
                  <DynamicMedia
                    media={category.partnerImage}
                    alt={category.partnerTitle || "Partner Logos"}
                    fill
                    sizes="(min-width: 1024px) 960px, (min-width: 768px) 768px, 100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Dynamic / Fallback Gallery Component */}
        {galleryImages.length > 0 && (
          <section className="py-16">
            <Gallery key={category.slug} images={galleryImages} />
          </section>
        )}
      </main>
      <Footer />
    </BackgroundLayout>
  )
}
