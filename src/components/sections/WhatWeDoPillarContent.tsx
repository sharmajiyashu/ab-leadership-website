import { ReactNode } from 'react'

export const whatWeDoPillarTitleClass =
  'what-we-do-pillar-title text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-bricolage-display'

export const whatWeDoPillarDescriptionClass =
  'text-base md:text-lg text-gray-600 leading-relaxed mb-6 line-clamp-4 font-bricolage-text'

const pillarHoverColorClass = {
  blue: 'group-hover:text-blue-600',
  green: 'group-hover:text-green-600',
  purple: 'group-hover:text-purple-600',
} as const

type WhatWeDoPillarContentProps = {
  title: ReactNode
  description: string
  hoverColor?: keyof typeof pillarHoverColorClass
  titleClassName?: string
  descriptionClassName?: string
}

export default function WhatWeDoPillarContent({
  title,
  description,
  hoverColor = 'blue',
  titleClassName = '',
  descriptionClassName = '',
}: WhatWeDoPillarContentProps) {
  return (
    <>
      <h3 className={`${whatWeDoPillarTitleClass} ${pillarHoverColorClass[hoverColor]} ${titleClassName}`}>
        {title}
      </h3>
      <p className={`${whatWeDoPillarDescriptionClass} ${descriptionClassName}`}>
        {description}
      </p>
    </>
  )
}
