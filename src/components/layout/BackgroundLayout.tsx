import React from 'react'

type BackgroundLayoutProps = {
  children: React.ReactNode
  backgroundImage?: string
}

const DEFAULT_BACKGROUND_IMAGE = '/background.svg'

export default function BackgroundLayout({
  children,
  backgroundImage = DEFAULT_BACKGROUND_IMAGE,
}: BackgroundLayoutProps) {
  return (
    <div className="min-h-screen">
      <div
        className="sticky top-0 h-screen w-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden
      />
      <div className="relative z-10 -mt-[100vh]">
        {children}
      </div>
    </div>
  )
}

