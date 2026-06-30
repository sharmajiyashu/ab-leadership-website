'use client'

import { useState, useEffect, useRef, RefObject } from 'react'

interface UseScrollAnimationReturn<T extends HTMLElement> {
  ref: RefObject<T | null>
  isVisible: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  delay = 0,
  threshold = 0.2,
  rootMargin = '-50px'
): UseScrollAnimationReturn<T> {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Mobile check - bypass animations for elements that might get stuck invisible
    if (window.innerWidth < 768) {
      setIsVisible(true)
      return
    }

    // Sanitize values for smoother desktop trigger
    const safeThreshold = Math.min(threshold, 0.1)
    const safeRootMargin = rootMargin.startsWith('-') ? '0px' : rootMargin

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: safeThreshold, rootMargin: safeRootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Scroll to bottom fallback - in case elements near the page end cannot be scrolled up enough
    const handleScrollFallback = () => {
      if (currentRef) {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
          setIsVisible(true)
          window.removeEventListener('scroll', handleScrollFallback)
        }
      }
    }

    window.addEventListener('scroll', handleScrollFallback, { passive: true })
    handleScrollFallback() // run check initially

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      window.removeEventListener('scroll', handleScrollFallback)
    }
  }, [delay, threshold, rootMargin])

  return { ref, isVisible }
}
