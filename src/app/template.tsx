'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // Reset animation when pathname changes
    setIsVisible(false)
    
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname, children])

  useEffect(() => {
    // Trigger animation on initial mount
    setIsVisible(true)
  }, [])

  return (
    <div
      className="transition-all duration-700 ease-out bg-white min-h-screen"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {displayChildren}
    </div>
  )
}

