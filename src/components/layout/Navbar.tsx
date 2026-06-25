'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Service {
  _id: string;
  title: string;
  slug: string;
  href?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  services: Service[];
}

const fallbackCategories: Category[] = [
  {
    _id: 'fallback-corporate',
    name: 'Corporates',
    slug: 'corporate',
    services: [
      { _id: '1', title: 'Leadership & Employee Development', slug: 'leadership' },
      { _id: '2', title: 'Wellness & Mental Health', slug: 'wellness' },
      { _id: '3', title: 'Culture & Organizational Development', slug: 'culture' }
    ]
  },
  {
    _id: 'fallback-classrooms',
    name: 'Classrooms',
    slug: 'classrooms',
    services: [
      { _id: '4', title: 'Future Ready Skills', slug: 'future-ready-skills' },
      { _id: '5', title: 'Mental Health and Wellbeing', slug: 'mental-health' },
      { _id: '6', title: 'Teacher and Parent Training', slug: 'teacher-training' }
    ]
  },
  {
    _id: 'fallback-communities',
    name: 'Communities',
    slug: 'communities',
    services: [
      { _id: '7', title: 'At-Risk Children and Adolescents', slug: 'orphanages' },
      { _id: '8', title: 'Senior Citizens', slug: 'senior-citizens' },
      { _id: '9', title: 'Queer Communities', slug: 'queer-communities' }
    ]
  },
  {
    _id: 'fallback-clinical',
    name: 'Clinics',
    slug: 'clinical',
    services: [
      { _id: '10', title: 'Children with Special Needs', slug: 'special-needs' },
      { _id: '11', title: 'Individuals in Psychiatric Care', slug: 'psychiatric-care' },
      { _id: '12', title: 'Older Adults & Geriatric Care', slug: 'geriatric' }
    ]
  }
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Dynamic categories state
  const [categories, setCategories] = useState<Category[]>(fallbackCategories)
  const [openDropdownSlug, setOpenDropdownSlug] = useState<string | null>(null)
  
  // Global settings state
  const [headerName, setHeaderName] = useState("Abhishek Banerji")
  
  const openTimeoutRefs = useRef<Record<string, NodeJS.Timeout>>({})
  const closeTimeoutRefs = useRef<Record<string, NodeJS.Timeout>>({})

  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isAboutPage = pathname.startsWith('/about')
  const isTheatrePage = pathname.startsWith('/theatre')
  const isBlogPage = pathname.startsWith('/blog')
  const isContactPage = pathname.startsWith('/contact')

  // Check if current path matches any category or sub-service
  const isCategoryActive = categories.some(cat => pathname.startsWith(`/${cat.slug}`))

  const shouldBeTransparent =
    isHomePage ||
    isAboutPage ||
    isCategoryActive ||
    isTheatrePage ||
    isBlogPage ||
    isContactPage

  // Mount check for portal (SSR safety)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch categories and settings dynamically
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    
    // Fetch Categories
    fetch(`${apiUrl}/v1/api/app/categories`)
      .then(res => res.json())
      .then(res => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data)
        }
      })
      .catch(err => console.error("Error loading navbar categories:", err))

    // Fetch Global Settings
    fetch(`${apiUrl}/v1/api/app/settings/global`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data?.headerName) {
          setHeaderName(res.data.headerName)
        }
      })
      .catch(err => console.error("Error loading global settings:", err))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Cleanup timeouts on unmount
  useEffect(() => {
    const refsOpen = openTimeoutRefs.current;
    const refsClose = closeTimeoutRefs.current;
    return () => {
      Object.values(refsOpen).forEach(clearTimeout)
      Object.values(refsClose).forEach(clearTimeout)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setOpenDropdownSlug(null)
    Object.values(openTimeoutRefs.current).forEach(clearTimeout)
    Object.values(closeTimeoutRefs.current).forEach(clearTimeout)
    openTimeoutRefs.current = {}
    closeTimeoutRefs.current = {}
  }

  const handleMouseEnter = (slug: string) => {
    if (closeTimeoutRefs.current[slug]) {
      clearTimeout(closeTimeoutRefs.current[slug])
      delete closeTimeoutRefs.current[slug]
    }
    
    // Clear other pending opens
    Object.keys(openTimeoutRefs.current).forEach(s => {
      if (s !== slug) {
        clearTimeout(openTimeoutRefs.current[s])
        delete openTimeoutRefs.current[s]
      }
    })

    openTimeoutRefs.current[slug] = setTimeout(() => {
      setOpenDropdownSlug(slug)
    }, 300)
  }

  const handleMouseLeave = (slug: string) => {
    if (openTimeoutRefs.current[slug]) {
      clearTimeout(openTimeoutRefs.current[slug])
      delete openTimeoutRefs.current[slug]
    }

    closeTimeoutRefs.current[slug] = setTimeout(() => {
      setOpenDropdownSlug(prev => (prev === slug ? null : prev))
    }, 200)
  }

  const isTransparent = shouldBeTransparent && !isScrolled
  const showBackgroundImage = shouldBeTransparent && !isTransparent
  const textColor = isTransparent ? 'text-white' : showBackgroundImage ? 'text-gray-900' : isScrolled ? 'text-white' : 'text-gray-900'
  const bgClass = isTransparent ? 'bg-transparent' : showBackgroundImage ? '' : isScrolled ? 'bg-black shadow-lg' : 'bg-white shadow-md'
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
              >
                Services
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className={`absolute left-0 mt-3 w-56 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-10`}>
                <div className="py-1.5">
                  {categories.map((category) => {
                    const isDropdownOpen = openDropdownSlug === category.slug;
                    return (
                      <div 
                        key={category._id}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(category.slug)}
                        onMouseLeave={() => handleMouseLeave(category.slug)}
                      >
                        <Link href={`/${category.slug}`} className={`flex items-center justify-between px-4 py-2.5 text-[15px] ${dropdownLinkText} ${linkHoverClass} transition-all duration-300 ease-out font-bricolage-text group/item leading-[1.7] cursor-pointer`}>
                          <span>{category.name}</span>
                          <span className={`ml-2 ${dropdownArrowColor} transition-colors duration-300`}>→</span>
                        </Link>
                        {isDropdownOpen && category.services && category.services.length > 0 && (
                          <div className={`absolute left-full top-0 ml-1 w-64 ${dropdownPanelClass} backdrop-blur-sm rounded-md shadow-sm border-l-2 z-20 opacity-0 animate-[fadeIn_0.25s_ease-out_0.05s_forwards]`}>
                            <div className="py-1.5">
                              {category.services.map((service) => (
                                <Link 
                                  key={service._id}
                                  href={service.href || `/${category.slug}/services/${service.slug}`} 
                                  className={`block px-4 py-2.5 text-[14px] ${dropdownSubLinkText} ${linkHoverClass} hover:border-gray-900 transition-all duration-300 ease-out font-bricolage-text leading-[1.7] border-l-2 border-transparent pl-5 cursor-pointer`}
                                >
                                  {service.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Center: name (absolutely centered in navbar) */}
          <div className="hidden lg:flex absolute left-1/2 top-0 h-16 lg:h-20 -translate-x-1/2 items-center justify-center pointer-events-none">
            <Link href="/" className={`pointer-events-auto ${textColor} px-3 xl:px-4 h-16 lg:h-20 flex items-center text-xl sm:text-2xl lg:text-3xl font-normal font-lovelace whitespace-nowrap cursor-pointer`}>
              {headerName}
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
                Services
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="pl-4 space-y-1">
                {categories.map((category) => {
                  const isMobileSubOpen = openDropdownSlug === category.slug;
                  return (
                    <div key={category._id}>
                      <div 
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-base font-medium ${dropdownLinkText} cursor-pointer ${linkHoverClass} rounded-md transition-all duration-300 ease-out`}
                        onClick={() => setOpenDropdownSlug(isMobileSubOpen ? null : category.slug)}
                      >
                        <span className="leading-[1.7]">{category.name}</span>
                        <span className={`ml-2 ${mobileArrowColor} transition-transform duration-300 ease-out ${isMobileSubOpen ? 'rotate-90' : ''}`}>→</span>
                      </div>
                      {isMobileSubOpen && category.services && category.services.length > 0 && (
                        <div className={`pl-4 space-y-0.5 mt-1 border-l-2 ${mobileSubBorder} ml-2`}>
                          {category.services.map((service) => (
                            <Link 
                              key={service._id}
                              href={service.href || `/${category.slug}/services/${service.slug}`} 
                              onClick={closeMenu} 
                              className={`block px-3 py-2 text-sm font-normal ${mobileSubLinkText} ${linkHoverClass} rounded-md transition-all duration-300 ease-out leading-[1.7] cursor-pointer`}
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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

  if (!mounted) return null
  
  return createPortal(navbarContent, document.body)
}

export default Navbar
