'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [settings, setSettings] = useState<any>({
    headerName: "Abhishek Banerji",
    footerText: "Transforming wellbeing and leadership through human-centred, strengths-based practice. Working across clinics, classrooms, corporates, and communities. Focused on practical impact, inclusive design, and sustainable change.",
    footerCopyrightText: "© 2026 Abhishek Banerji. All rights reserved.",
    footerImage: null,
    contact: {
      email: "abhishekbanerji04@gmail.com",
      phone: "+91 98209 98042",
      whatsappNumber: "+91 98209 98042",
      whatsappUrl: "https://wa.me/919820998042",
      location: "Mumbai"
    },
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/theabhishekbanerji/",
      instagram: "https://www.instagram.com/theabhishekbanerji"
    }
  })
  const sectionRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Fetch Global Settings
    import('@/lib/api').then(({ get }) => {
      get<any>('/v1/api/app/settings/global')
        .then(data => {
          if (data) {
            // Merge with defaults
            setSettings((prev: any) => ({
              headerName: data.headerName || prev.headerName,
              footerText: data.footerText || prev.footerText,
              footerCopyrightText: data.footerCopyrightText || prev.footerCopyrightText,
              footerImage: data.footerImage || prev.footerImage,
              contact: { ...prev.contact, ...data.contact },
              socialLinks: { ...prev.socialLinks, ...data.socialLinks }
            }))
          }
        })
        .catch(err => console.error("Error loading global settings in footer:", err))
    });
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate scroll progress when section is in view
      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)))
        setScrollProgress(progress)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          window.addEventListener('scroll', handleScroll, { passive: true })
          handleScroll() // Initial calculation
        } else {
          window.removeEventListener('scroll', handleScroll)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const currentFooterRef = footerRef.current
    if (currentFooterRef) {
      observer.observe(currentFooterRef)
    }

    return () => {
      if (currentFooterRef) {
        observer.unobserve(currentFooterRef)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [mounted])

  // Animation values based on scroll progress - only calculate when mounted
  const fadeOpacity = mounted ? Math.min(1, scrollProgress * 2) : 0
  const translateY = mounted ? (1 - scrollProgress) * 60 : 60

  // Title animation - earlier trigger
  const titleProgress = mounted ? Math.min(1, scrollProgress * 2.5) : 0
  const titleOpacity = mounted ? Math.min(1, titleProgress * 1.5) : 0
  const titleTranslateY = mounted ? (1 - titleProgress) * 40 : 40

  return (
    <footer ref={sectionRef} className="relative text-white py-12 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${settings.footerImage?.url || '/home/hero/footer/WhatsApp Image 2026-01-26 at 11.21.51.jpeg'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full h-full bg-black/60" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Main Footer Content */}
        <div
          ref={footerRef}
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: isVisible ? fadeOpacity : 0,
            transform: `translateY(${translateY}px)`
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* About Section */}
            <div className="lg:col-span-2">
              <div
                className="transition-all duration-1000 ease-out"
                style={{
                  opacity: isVisible ? titleOpacity : 0,
                  transform: `translateY(${titleTranslateY}px)`
                }}
              >
                <h3 className="text-2xl font-bold mb-4">{settings.headerName}</h3>
                <p className="text-white mb-6 leading-relaxed whitespace-pre-wrap">
                  {settings.footerText}
                </p>
                <div className="flex space-x-4">
                  {/* Social Links */}
                  <a
                    href={settings.socialLinks?.linkedin || "https://www.linkedin.com"}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href={settings.socialLinks?.instagram || "https://www.instagram.com"}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${settings.contact?.email}`}
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
                    aria-label="Email"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/corporate" className="text-white hover:text-white transition-colors duration-300">Corporates</Link></li>
                <li><Link href="/classrooms" className="text-white hover:text-white transition-colors duration-300">Classrooms</Link></li>
                <li><Link href="/clinical" className="text-white hover:text-white transition-colors duration-300">Clinical</Link></li>
                <li><Link href="/communities" className="text-white hover:text-white transition-colors duration-300">Communities</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white">{settings.contact?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <a href={settings.contact?.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-300">{settings.contact?.whatsappNumber || settings.contact?.phone}</a>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white">{settings.contact?.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white text-sm mb-4 md:mb-0">
                {settings.footerCopyrightText}
              </div>
              <div className="flex space-x-6 text-sm text-white">
                <a href="#privacy" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
