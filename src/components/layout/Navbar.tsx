'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCorporateOpen, setIsCorporateOpen] = useState(false)
  const [isClassroomsOpen, setIsClassroomsOpen] = useState(false)
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false)
  const [isClinicalOpen, setIsClinicalOpen] = useState(false)
  const corporateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const classroomsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const communitiesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const clinicalTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const corporateCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const classroomsCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const communitiesCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const clinicalCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isAboutPage = pathname.startsWith('/about')
  const isCorporatePage = pathname.startsWith('/corporate')
  const isClassroomsPage = pathname.startsWith('/classrooms')
  const isClinicalPage = pathname.startsWith('/clinical')
  const isCommunitiesPage = pathname.startsWith('/communities')
  const isTheatrePage = pathname.startsWith('/theatre')
  const isBlogPage = pathname.startsWith('/blog')
  const isContactPage = pathname.startsWith('/contact')
  const shouldBeTransparent =
    isHomePage ||
    isAboutPage ||
    isCorporatePage ||
    isClassroomsPage ||
    isClinicalPage ||
    isCommunitiesPage ||
    isTheatrePage ||
    isBlogPage ||
    isContactPage

  // Mount check for portal (SSR safety)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      // Simple, reliable scroll detection: show navbar background after any scroll
      // This eliminates issues with hero height calculations and scroll containers
      setIsScrolled(scrollTop > 10)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (corporateTimeoutRef.current) clearTimeout(corporateTimeoutRef.current)
      if (classroomsTimeoutRef.current) clearTimeout(classroomsTimeoutRef.current)
      if (communitiesTimeoutRef.current) clearTimeout(communitiesTimeoutRef.current)
      if (clinicalTimeoutRef.current) clearTimeout(clinicalTimeoutRef.current)
      if (corporateCloseTimeoutRef.current) clearTimeout(corporateCloseTimeoutRef.current)
      if (classroomsCloseTimeoutRef.current) clearTimeout(classroomsCloseTimeoutRef.current)
      if (communitiesCloseTimeoutRef.current) clearTimeout(communitiesCloseTimeoutRef.current)
      if (clinicalCloseTimeoutRef.current) clearTimeout(clinicalCloseTimeoutRef.current)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setIsCorporateOpen(false)
    setIsClassroomsOpen(false)
    setIsCommunitiesOpen(false)
    setIsClinicalOpen(false)
    // Clear all timeouts (both open and close)
    if (corporateTimeoutRef.current) { clearTimeout(corporateTimeoutRef.current); corporateTimeoutRef.current = null }
    if (classroomsTimeoutRef.current) { clearTimeout(classroomsTimeoutRef.current); classroomsTimeoutRef.current = null }
    if (communitiesTimeoutRef.current) { clearTimeout(communitiesTimeoutRef.current); communitiesTimeoutRef.current = null }
    if (clinicalTimeoutRef.current) { clearTimeout(clinicalTimeoutRef.current); clinicalTimeoutRef.current = null }
    if (corporateCloseTimeoutRef.current) { clearTimeout(corporateCloseTimeoutRef.current); corporateCloseTimeoutRef.current = null }
    if (classroomsCloseTimeoutRef.current) { clearTimeout(classroomsCloseTimeoutRef.current); classroomsCloseTimeoutRef.current = null }
    if (communitiesCloseTimeoutRef.current) { clearTimeout(communitiesCloseTimeoutRef.current); communitiesCloseTimeoutRef.current = null }
    if (clinicalCloseTimeoutRef.current) { clearTimeout(clinicalCloseTimeoutRef.current); clinicalCloseTimeoutRef.current = null }
  }

  // Determine if navbar should be transparent
  // Always show background only after scrolling to ensure visibility
  const isTransparent = shouldBeTransparent && !isScrolled
  const showBackgroundImage = shouldBeTransparent && !isTransparent
  const textColor = isTransparent ? 'text-white' : showBackgroundImage ? 'text-gray-900' : isScrolled ? 'text-white' : 'text-gray-900'
  const bgClass = isTransparent ? 'bg-transparent' : showBackgroundImage ? '' : isScrolled ? 'bg-black shadow-lg' : 'bg-white shadow-md'
  // When at the top (transparent or background image), use a subtle translucent hover instead of solid black.
  const linkHoverClass = shouldBeTransparent ? 'hover:bg-black/10' : isScrolled ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'
  const dropdownPanelClass = showBackgroundImage ? 'bg-white/95 border-gray-200' : isScrolled ? 'bg-black/95 border-gray-700' : 'bg-white/95 border-gray-200'
  const dropdownLinkText = showBackgroundImage ? 'text-gray-700' : isScrolled ? 'text-white' : 'text-gray-700'
  const dropdownSubLinkText = showBackgroundImage ? 'text-gray-600' : isScrolled ? 'text-gray-300' : 'text-gray-600'
  const dropdownArrowColor = showBackgroundImage ? 'text-gray-400 group-hover/item:text-gray-900' : isScrolled ? 'text-gray-300 group-hover/item:text-black' : 'text-gray-400 group-hover/item:text-white'
  const mobileMenuPanelClass = showBackgroundImage ? 'bg-white/95 border-gray-200' : isScrolled ? 'bg-black border-gray-700' : 'bg-white border-gray-200'
  const mobileLinkText = showBackgroundImage ? 'text-gray-900' : isScrolled ? 'text-white' : 'text-gray-900'
  const mobileSubLinkText = showBackgroundImage ? 'text-gray-600' : isScrolled ? 'text-gray-300' : 'text-gray-600'
  const mobileSubBorder = showBackgroundImage ? 'border-gray-200/60' : isScrolled ? 'border-gray-600' : 'border-gray-200/60'
  const mobileArrowColor = showBackgroundImage ? 'text-gray-400' : isScrolled ? 'text-gray-300' : 'text-gray-400'

  const navbarContent = (
    <nav 
      className={`${bgClass} fixed inset-x-0 top-0 w-full z-[9999] transition-all duration-300`}
      style={showBackgroundImage ? {
        backgroundImage: 'url(/background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      } : undefined}
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative flex items-center h-16 lg:h-20 w-full">
          {/* Left: Home, About Me, Services */}
          <div className="hidden lg:flex flex-1 justify-start items-center gap-x-8 xl:gap-x-10">
            <Link href="/" className={`${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-lg xl:text-xl font-medium transition-colors font-bricolage-text whitespace-nowrap ${linkHoverClass} cursor-pointer`}>
              Home
            </Link>
            <Link href="/about" className={`${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-lg xl:text-xl font-medium transition-colors font-bricolage-text whitespace-nowrap ${linkHoverClass} cursor-pointer`}>
              About Me
            </Link>

            {/* Services (4Cs) Dropdown */}
              <div className="relative group">
                <div 
                  className={`${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-lg xl:text-xl font-medium transition-colors font-bricolage-text whitespace-nowrap ${linkHoverClass} cursor-pointer`}
                  onClick={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  Services
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`absolute left-0 mt-3 w-56 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-10`}>
                  <div className="py-1.5">
                    {/* Corporate with nested dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => {
                        // Clear close timeout if re-entering
                        if (corporateCloseTimeoutRef.current) {
                          clearTimeout(corporateCloseTimeoutRef.current)
                          corporateCloseTimeoutRef.current = null
                        }
                        // Clear other dropdowns immediately
                        setIsClassroomsOpen(false)
                        setIsCommunitiesOpen(false)
                        setIsClinicalOpen(false)
                        // Clear any existing open timeout
                        if (corporateTimeoutRef.current) {
                          clearTimeout(corporateTimeoutRef.current)
                        }
                        // Set new timeout - only opens if cursor stays for 400ms
                        corporateTimeoutRef.current = setTimeout(() => {
                          setIsCorporateOpen(true)
                        }, 400)
                      }}
                      onMouseLeave={() => {
                        // Clear open timeout if mouse leaves before delay completes
                        if (corporateTimeoutRef.current) {
                          clearTimeout(corporateTimeoutRef.current)
                          corporateTimeoutRef.current = null
                        }
                        // Add closing delay for better UX (200ms grace period)
                        corporateCloseTimeoutRef.current = setTimeout(() => {
                          setIsCorporateOpen(false)
                        }, 200)
                      }}
                    >
                      <Link href="/corporate" className={`flex items-center justify-between px-4 py-2.5 text-[15px] ${dropdownLinkText} ${linkHoverClass} transition-all duration-300 ease-out font-bricolage-text group/item leading-[1.7] cursor-pointer`}>
                        <span>Corporates</span>
                        <span className={`ml-2 ${dropdownArrowColor} transition-colors duration-300`}>→</span>
                      </Link>
                      {isCorporateOpen && (
                        <div className={`absolute left-full top-0 ml-1 w-64 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 z-20 opacity-0 animate-[fadeIn_0.25s_ease-out_0.05s_forwards]`}>
                          <div className="py-1.5">
                            <Link href="/corporate/services/leadership" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Leadership & Employee Development
                            </Link>
                            <Link href="/corporate/services/wellness" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Wellness & Mental Health
                            </Link>
                            <Link href="/corporate/services/culture" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Culture & Organizational Development
                    </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Classrooms with nested dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => {
                        // Clear close timeout if re-entering
                        if (classroomsCloseTimeoutRef.current) {
                          clearTimeout(classroomsCloseTimeoutRef.current)
                          classroomsCloseTimeoutRef.current = null
                        }
                        // Clear other dropdowns immediately
                        setIsCorporateOpen(false)
                        setIsCommunitiesOpen(false)
                        setIsClinicalOpen(false)
                        // Clear any existing open timeout
                        if (classroomsTimeoutRef.current) {
                          clearTimeout(classroomsTimeoutRef.current)
                        }
                        // Set new timeout - only opens if cursor stays for 400ms
                        classroomsTimeoutRef.current = setTimeout(() => {
                          setIsClassroomsOpen(true)
                        }, 400)
                      }}
                      onMouseLeave={() => {
                        // Clear open timeout if mouse leaves before delay completes
                        if (classroomsTimeoutRef.current) {
                          clearTimeout(classroomsTimeoutRef.current)
                          classroomsTimeoutRef.current = null
                        }
                        // Add closing delay for better UX (200ms grace period)
                        classroomsCloseTimeoutRef.current = setTimeout(() => {
                          setIsClassroomsOpen(false)
                        }, 200)
                      }}
                    >
                      <Link href="/classrooms" className={`flex items-center justify-between px-4 py-2.5 text-[15px] ${dropdownLinkText} ${linkHoverClass} transition-all duration-300 ease-out font-bricolage-text group/item leading-[1.7] cursor-pointer`}>
                        <span>Classrooms</span>
                        <span className={`ml-2 ${dropdownArrowColor} transition-colors duration-300`}>→</span>
                      </Link>
                      {isClassroomsOpen && (
                        <div className={`absolute left-full top-0 ml-1 w-64 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 z-20 opacity-0 animate-[fadeIn_0.25s_ease-out_0.05s_forwards]`}>
                          <div className="py-1.5">
                            <Link href="/classrooms/services/future-ready-skills" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Future Ready Skills
                            </Link>
                            <Link href="/classrooms/services/mental-health" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Mental Health and Wellbeing
                            </Link>
                            <Link href="/classrooms/services/teacher-training" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Teacher and Parent Training
                    </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Communities with nested dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => {
                        // Clear close timeout if re-entering
                        if (communitiesCloseTimeoutRef.current) {
                          clearTimeout(communitiesCloseTimeoutRef.current)
                          communitiesCloseTimeoutRef.current = null
                        }
                        // Clear other dropdowns immediately
                        setIsCorporateOpen(false)
                        setIsClassroomsOpen(false)
                        setIsClinicalOpen(false)
                        // Clear any existing open timeout
                        if (communitiesTimeoutRef.current) {
                          clearTimeout(communitiesTimeoutRef.current)
                        }
                        // Set new timeout - only opens if cursor stays for 400ms
                        communitiesTimeoutRef.current = setTimeout(() => {
                          setIsCommunitiesOpen(true)
                        }, 400)
                      }}
                      onMouseLeave={() => {
                        // Clear open timeout if mouse leaves before delay completes
                        if (communitiesTimeoutRef.current) {
                          clearTimeout(communitiesTimeoutRef.current)
                          communitiesTimeoutRef.current = null
                        }
                        // Add closing delay for better UX (200ms grace period)
                        communitiesCloseTimeoutRef.current = setTimeout(() => {
                          setIsCommunitiesOpen(false)
                        }, 200)
                      }}
                    >
                      <Link href="/communities" className={`flex items-center justify-between px-4 py-2.5 text-[15px] ${dropdownLinkText} ${linkHoverClass} transition-all duration-300 ease-out font-bricolage-text group/item leading-[1.7] cursor-pointer`}>
                        <span>Communities</span>
                        <span className={`ml-2 ${dropdownArrowColor} transition-colors duration-300`}>→</span>
                      </Link>
                      {isCommunitiesOpen && (
                        <div className={`absolute left-full top-0 ml-1 w-64 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 z-20 opacity-0 animate-[fadeIn_0.25s_ease-out_0.05s_forwards]`}>
                          <div className="py-1.5">
                            <Link href="/communities/services/orphanages" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              At-Risk Children and Adolescents
                            </Link>
                            <Link href="/communities/services/senior-citizens" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Senior Citizens
                            </Link>
                            <Link href="/communities/services/queer-communities" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Queer Communities
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Clinical with nested dropdown */}
                    <div 
                      className="relative"
                      onMouseEnter={() => {
                        // Clear close timeout if re-entering
                        if (clinicalCloseTimeoutRef.current) {
                          clearTimeout(clinicalCloseTimeoutRef.current)
                          clinicalCloseTimeoutRef.current = null
                        }
                        // Clear other dropdowns immediately
                        setIsCorporateOpen(false)
                        setIsClassroomsOpen(false)
                        setIsCommunitiesOpen(false)
                        // Clear any existing open timeout
                        if (clinicalTimeoutRef.current) {
                          clearTimeout(clinicalTimeoutRef.current)
                        }
                        // Set new timeout - only opens if cursor stays for 400ms
                        clinicalTimeoutRef.current = setTimeout(() => {
                          setIsClinicalOpen(true)
                        }, 400)
                      }}
                      onMouseLeave={() => {
                        // Clear open timeout if mouse leaves before delay completes
                        if (clinicalTimeoutRef.current) {
                          clearTimeout(clinicalTimeoutRef.current)
                          clinicalTimeoutRef.current = null
                        }
                        // Add closing delay for better UX (200ms grace period)
                        clinicalCloseTimeoutRef.current = setTimeout(() => {
                          setIsClinicalOpen(false)
                        }, 200)
                      }}
                    >
                      <Link href="/clinical" className={`flex items-center justify-between px-4 py-2.5 text-[15px] ${dropdownLinkText} ${linkHoverClass} transition-all duration-300 ease-out font-bricolage-text group/item leading-[1.7] cursor-pointer`}>
                        <span>Clinics</span>
                        <span className={`ml-2 ${dropdownArrowColor} transition-colors duration-300`}>→</span>
                      </Link>
                      {isClinicalOpen && (
                        <div className={`absolute left-full top-0 ml-1 w-64 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 z-20 opacity-0 animate-[fadeIn_0.25s_ease-out_0.05s_forwards]`}>
                          <div className="py-1.5">
                            <Link href="/clinical/services/special-needs" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Children with Special Needs
                            </Link>
                            <Link href="/clinical/services/psychiatric-care" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Individuals in Psychiatric Care
                            </Link>
                            <Link href="/clinical/services/geriatric" className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}>
                              Older Adults & Geriatric Care
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Center: name (absolutely centered in navbar) */}
          <div className="hidden lg:flex absolute left-1/2 top-0 h-16 lg:h-20 -translate-x-1/2 items-center justify-center pointer-events-none">
            <Link href="/" className={`pointer-events-auto ${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-xl sm:text-2xl lg:text-3xl font-normal font-lovelace whitespace-nowrap cursor-pointer`}>
              Abhishek Banerji
            </Link>
          </div>

          {/* Right: Theatre, Blog, Contact */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-x-8 xl:gap-x-10">
            <Link href="/theatre" className={`${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-lg xl:text-xl font-medium transition-colors font-bricolage-text whitespace-nowrap ${linkHoverClass} cursor-pointer`}>
              Theatre
            </Link>
            <Link href="/blog" className={`${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-lg xl:text-xl font-medium transition-colors font-bricolage-text whitespace-nowrap ${linkHoverClass} cursor-pointer`}>
              Blog
            </Link>
            <Link href="/contact" className={`${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-lg xl:text-xl font-medium transition-colors font-bricolage-text whitespace-nowrap ${linkHoverClass} cursor-pointer`}>
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex-1 flex justify-end">
            <button
              onClick={toggleMenu}
              className={`${textColor} focus:outline-none transition-colors cursor-pointer`}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden border-t ${isTransparent ? 'bg-white/95 backdrop-blur-sm border-gray-200' : mobileMenuPanelClass} max-h-[calc(100vh-4rem)] overflow-y-auto`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" onClick={closeMenu} className={`block px-3 py-2 text-lg font-medium ${mobileLinkText} ${linkHoverClass} rounded-md transition-colors cursor-pointer`}>
              Home
            </Link>
            
            <Link href="/about" onClick={closeMenu} className={`block px-3 py-2 text-lg font-medium ${mobileLinkText} ${linkHoverClass} rounded-md transition-colors cursor-pointer`}>
              About Me
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <div className={`flex items-center justify-between w-full px-3 py-2 text-lg font-medium ${mobileLinkText} cursor-default`}>
                Services (4Cs)
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="pl-4 space-y-1">
                {/* Corporate with nested dropdown */}
                <div>
                  <div 
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-base font-medium ${dropdownLinkText} cursor-pointer ${linkHoverClass} rounded-md transition-all duration-300 ease-out`}
                    onClick={() => setIsCorporateOpen(!isCorporateOpen)}
                  >
                    <span className="leading-[1.7]">Corporates</span>
                    <span className={`ml-2 ${mobileArrowColor} transition-transform duration-300 ease-out ${isCorporateOpen ? 'rotate-90' : ''}`}>→</span>
                  </div>
                  {isCorporateOpen && (
                    <div className={`pl-4 space-y-0.5 mt-1 border-l-2 ${mobileSubBorder} ml-2`}>
                      <Link href="/corporate/services/leadership" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Leadership & Employee Development
                      </Link>
                      <Link href="/corporate/services/wellness" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Wellness & Mental Health
                      </Link>
                      <Link href="/corporate/services/culture" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Culture & Organizational Development
                </Link>
                    </div>
                  )}
                </div>
                {/* Classrooms with nested dropdown */}
                <div>
                  <div 
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-base font-medium ${dropdownLinkText} cursor-pointer ${linkHoverClass} rounded-md transition-all duration-300 ease-out`}
                    onClick={() => setIsClassroomsOpen(!isClassroomsOpen)}
                  >
                    <span className="leading-[1.7]">Classrooms</span>
                    <span className={`ml-2 ${mobileArrowColor} transition-transform duration-300 ease-out ${isClassroomsOpen ? 'rotate-90' : ''}`}>→</span>
                  </div>
                  {isClassroomsOpen && (
                    <div className={`pl-4 space-y-0.5 mt-1 border-l-2 ${mobileSubBorder} ml-2`}>
                      <Link href="/future-ready-skills" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Future Ready Skills
                      </Link>
                      <Link href="/mental-health" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Mental Health and Wellbeing
                      </Link>
                      <Link href="/teacher-training" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Teacher and Parent Training
                </Link>
                    </div>
                  )}
                </div>
                {/* Communities with nested dropdown */}
                <div>
                  <div 
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-base font-medium ${dropdownLinkText} cursor-pointer ${linkHoverClass} rounded-md transition-all duration-300 ease-out`}
                    onClick={() => setIsCommunitiesOpen(!isCommunitiesOpen)}
                  >
                    <span className="leading-[1.7]">Communities</span>
                    <span className={`ml-2 ${mobileArrowColor} transition-transform duration-300 ease-out ${isCommunitiesOpen ? 'rotate-90' : ''}`}>→</span>
                  </div>
                  {isCommunitiesOpen && (
                    <div className={`pl-4 space-y-0.5 mt-1 border-l-2 ${mobileSubBorder} ml-2`}>
                      <Link href="/communities/services/orphanages" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        At-Risk Children and Adolescents
                      </Link>
                      <Link href="/communities/services/senior-citizens" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Senior Citizens
                      </Link>
                      <Link href="/communities/services/queer-communities" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Queer Communities
                      </Link>
                    </div>
                  )}
                </div>
                {/* Clinical with nested dropdown */}
                <div>
                  <div 
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-base font-medium ${dropdownLinkText} cursor-pointer ${linkHoverClass} rounded-md transition-all duration-300 ease-out`}
                    onClick={() => setIsClinicalOpen(!isClinicalOpen)}
                  >
                    <span className="leading-[1.7]">Clinics</span>
                    <span className={`ml-2 ${mobileArrowColor} transition-transform duration-300 ease-out ${isClinicalOpen ? 'rotate-90' : ''}`}>→</span>
                  </div>
                  {isClinicalOpen && (
                    <div className={`pl-4 space-y-0.5 mt-1 border-l-2 ${mobileSubBorder} ml-2`}>
                      <Link href="/clinical/services/special-needs" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Children with Special Needs
                      </Link>
                      <Link href="/clinical/services/psychiatric-care" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Individuals in Psychiatric Care
                      </Link>
                      <Link href="/clinical/services/geriatric" onClick={closeMenu} className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}>
                        Older Adults & Geriatric Care
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Link href="/theatre" onClick={closeMenu} className={`block px-3 py-2 text-lg font-medium ${mobileLinkText} ${linkHoverClass} rounded-md transition-colors cursor-pointer`}>
              Theatre
            </Link>

            <Link href="/blog" onClick={closeMenu} className={`block px-3 py-2 text-lg font-medium ${mobileLinkText} ${linkHoverClass} rounded-md transition-colors cursor-pointer`}>
              Blog
            </Link>

            <Link href="/contact" onClick={closeMenu} className={`block px-3 py-2 text-lg font-medium ${mobileLinkText} ${linkHoverClass} rounded-md transition-colors cursor-pointer`}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )

  // Render navbar via portal to document.body to escape transformed parent containers
  // This ensures fixed positioning works correctly even when parent has transform
  if (!mounted) return null
  
  return createPortal(navbarContent, document.body)
}

export default Navbar

