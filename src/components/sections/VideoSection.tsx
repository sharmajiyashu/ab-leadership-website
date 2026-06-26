'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Loader } from '@/components/ui/Loader'

const VideoSection = ({ initialData }: { initialData?: any }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [maxProgress, setMaxProgress] = useState(0)
  const videoRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate scroll progress when section is in view
      if (sectionTop < windowHeight * 1.2 && sectionTop > -sectionHeight) {
        // Start animation earlier - when section is 20% above viewport
        const startPoint = windowHeight * 1.2
        const endPoint = -sectionHeight
        const progress = Math.max(0, Math.min(1, (startPoint - sectionTop) / (startPoint - endPoint)))
        setScrollProgress(progress)
        setMaxProgress(prev => Math.max(prev, progress))
      } else if (sectionTop >= windowHeight * 1.2) {
        // Section hasn't reached viewport yet - only update if not already animated
        if (maxProgress < 1) {
          setScrollProgress(0)
        }
      } else {
        // Section has scrolled past
        setScrollProgress(1)
        setMaxProgress(1)
      }
    }

    // Observer for the entire section to trigger scroll listening
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
          // Start listening to scroll events when section is visible
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll() // Initial calculation
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

    // Observer for video visibility
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const currentSectionRef = sectionRef.current
    const currentVideoRef = videoRef.current
    const currentTextRef = textRef.current

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef)
    }

    if (currentTextRef) {
      textObserver.observe(currentTextRef)
    }

    if (currentVideoRef) {
      videoObserver.observe(currentVideoRef)
    }

    // Initial check and always listen to scroll
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (currentSectionRef) {
        sectionObserver.unobserve(currentSectionRef)
      }
      if (currentTextRef) {
        textObserver.unobserve(currentTextRef)
      }
      if (currentVideoRef) {
        videoObserver.unobserve(currentVideoRef)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [maxProgress])

  const [videoData, setVideoData] = useState<{
    title: string;
    description: string;
    videoUrl: string;
    paragraphs?: string[];
  }>(() => {
    if (initialData?.videoSection) {
      return {
        title: initialData.videoSection.title || "See Us In Action",
        description: initialData.videoSection.description || "Watch our introductory video feature.",
        videoUrl: initialData.videoSection.videoUrl || "https://www.youtube.com/watch?v=IKDfjU1huhI&t=103s",
        paragraphs: initialData.videoSection.paragraphs || []
      };
    }
    return {
      title: "See Us In Action",
      description: "Watch our introductory video feature.",
      videoUrl: "https://www.youtube.com/watch?v=IKDfjU1huhI&t=103s",
      paragraphs: []
    };
  })

  const paragraphs = Array.isArray(videoData.paragraphs) && videoData.paragraphs.length > 0
    ? videoData.paragraphs
    : [
      "Abhishek Banerji is a United Nations Karmaveer Chakra Award–winning psychologist, TEDX speaker, theatre artist and director, corporate wellbeing and leadership consultant, and former chemical engineer with deep multidisciplinary expertise. Rooted in a strengths-based, human-centred approach, he is also a DEIB (Diversity, Equity, Inclusion and Belonging) practitioner.",
      "A two-time gold medalist from the Tata Institute of Social Sciences (TISS), Mumbai and a UGC NET qualified visiting faculty there, his work sits at the intersection of mental health, leadership, education, and the performing arts.",
      "Over the past decade, he has co-created leadership and wellness interventions with Fortune 500 companies, educational institutions, NGOs, startups, and clinical settings, drawing on psychotherapeutic frameworks, behavioural science, inclusive design, and evidence-based practice.",
      "His work strengthens individual well-being, team effectiveness, leadership capability, and organisational culture. Guided by holistic, integrative wellness, Abhishek works across the four C's-Clinics, Classrooms, Corporates, and Communities, translating psychological insight into context-sensitive, practice-first interventions that move people from awareness to action."
    ];

  const midIndex = Math.ceil(paragraphs.length / 2);
  const leftParagraphs = paragraphs.slice(0, midIndex);
  const rightParagraphs = paragraphs.slice(midIndex);

  // Extract video ID and start time from YouTube URL
  const getYoutubeDetails = (url: string) => {
    if (!url) return { videoId: "IKDfjU1huhI", startTime: 103 };
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : "IKDfjU1huhI";

      let startTime = 0;
      // Handle timestamp search params like ?t=103 or &start=103
      if (url.includes("t=")) {
        const parts = url.split("t=");
        const tVal = parts[1]?.split("&")[0]?.split("s")[0];
        startTime = parseInt(tVal) || 0;
      } else if (url.includes("start=")) {
        const parts = url.split("start=");
        startTime = parseInt(parts[1]?.split("&")[0]) || 0;
      }
      return { videoId, startTime };
    } catch (e) {
      return { videoId: "IKDfjU1huhI", startTime: 103 };
    }
  }

  const { videoId, startTime } = getYoutubeDetails(videoData.videoUrl);

  // Calculate animation values based on scroll progress
  // Use max progress to ensure animation only happens once
  const effectiveProgress = isSectionVisible ? Math.max(scrollProgress, maxProgress) : maxProgress

  const fadeOpacity = Math.min(1, effectiveProgress * 2)
  const scaleValue = 1 + (effectiveProgress * 0.2)
  const translateY = (1 - effectiveProgress) * 50

  // Separate animation for text - earlier trigger and different easing
  const textProgress = Math.min(1, effectiveProgress * 2.5) // Faster text animation
  const textOpacity = Math.min(1, textProgress * 1.5)
  const textTranslateY = (1 - textProgress) * 60 // More dramatic text movement
  const textScale = 0.95 + (textProgress * 0.05) // Subtle scale effect for text



  return (
    <section ref={sectionRef} className="relative px-32 py-4">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Combined Text Section - Above Video */}
        <div
          ref={textRef}
          className="max-w-7xl mx-auto pb-8 transition-all duration-700 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px) scale(${textScale})`,
            willChange: 'opacity, transform'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {leftParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl leading-relaxed text-gray-800 font-normal text-justify font-bricolage-text"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {rightParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl leading-relaxed text-gray-800 font-normal text-justify font-bricolage-text"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* YouTube Video */}
        <div ref={videoRef} className="flex justify-center">
          <div
            className="w-full max-w-4xl pb-16 transition-all duration-700 ease-out"
            style={{
              opacity: fadeOpacity,
              transform: `translateY(${translateY * 0.5}px) scale(${scaleValue})`,
              willChange: 'opacity, transform'
            }}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
              {isVideoVisible ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startTime}&rel=0&modestbranding=1&playsinline=1&controls=1&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&color=white&theme=dark&widget_referrer=${typeof window !== 'undefined' ? window.location.origin : ''}&enablejsapi=0`}
                  title="TEDx Talk - Lethal Loyalty: What's Keeping You Safe might be Keeping You Stuck | ABHISHEK BANERJI"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">TEDx Talk</p>
                    <p className="text-sm text-gray-300">Loading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Know More Button */}
        <div className="flex justify-center pb-12">
          <Link
            href="/about"
            className="px-8 py-3 bg-gray-900 hover:bg-[#0047AB] text-white rounded-lg font-bold text-lg transition-colors duration-300 font-bricolage-text"
          >
            Know More
          </Link>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
