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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [delay, threshold, rootMargin])

  return { ref, isVisible }
}
