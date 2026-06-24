import { ReactNode, Ref } from 'react'

export const sectionHeadingTitleClass =
  'text-4xl md:text-5xl font-bold font-bricolage-display'

export const subsectionHeadingTitleClass =
  'text-3xl md:text-4xl font-bold font-bricolage-display'

export const subserviceHeadingTitleClass =
  'text-3xl md:text-4xl font-bold font-lovelace'

export const sectionHeadingSubtitleClass =
  'text-lg text-center max-w-3xl mx-auto leading-relaxed font-bricolage-text'

export const subserviceHeadingSubtitleClass =
  'text-base text-center max-w-3xl mx-auto leading-relaxed font-bricolage-text'

const headingTitleClassByLevel = {
  section: sectionHeadingTitleClass,
  subsection: subsectionHeadingTitleClass,
  subservice: subserviceHeadingTitleClass,
} as const

const headingTagByLevel = {
  section: 'h2',
  subsection: 'h3',
  subservice: 'h2',
} as const

const titleColorClass = {
  default: 'text-gray-800',
  brand: 'text-[#0047AB]',
  onDark: 'text-white',
} as const

const subtitleColorClass = {
  default: 'text-gray-600',
  brand: 'text-gray-600',
  onDark: 'text-white',
} as const

const onDarkTitleShadow = {
  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.3)',
}

const onDarkSubtitleShadow = {
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)',
}

type SectionHeadingProps = {
  title?: ReactNode
  children?: ReactNode
  subtitle?: string
  level?: keyof typeof headingTitleClassByLevel
  variant?: keyof typeof titleColorClass
  align?: 'center' | 'left'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  titleRef?: Ref<HTMLHeadingElement>
  subtitleRef?: Ref<HTMLParagraphElement>
}

export default function SectionHeading({
  title,
  children,
  subtitle,
  level = 'section',
  variant = 'default',
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  titleRef,
  subtitleRef,
}: SectionHeadingProps) {
  const headingContent = children ?? title
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const isOnDark = variant === 'onDark'
  const HeadingTag = headingTagByLevel[level]
  const titleClass = headingTitleClassByLevel[level]
  const subtitleClass = level === 'subservice' ? subserviceHeadingSubtitleClass : sectionHeadingSubtitleClass

  return (
    <div className={className}>
      <HeadingTag
        ref={titleRef}
        className={`${titleClass} ${titleColorClass[variant]} ${alignClass} mb-4 ${titleClassName}`}
        style={isOnDark ? onDarkTitleShadow : undefined}
      >
        {headingContent}
      </HeadingTag>
      {subtitle && (
        <p
          ref={subtitleRef}
          className={`${subtitleClass} ${subtitleColorClass[variant]} mb-4 ${subtitleClassName}`}
          style={isOnDark ? onDarkSubtitleShadow : undefined}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
