'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/sections/SectionHeading'

const outcomeSteps = [
  {
    number: 'I',
    title: 'Orient',
    description: 'Align on business goals, success criteria, and what impact should look like.'
  },
  {
    number: 'II',
    title: 'Understand',
    description: 'Establish the baseline through a focused diagnostic and quick pulse.'
  },
  {
    number: 'III',
    title: 'Team-tune',
    description: 'Co-design the approach with stakeholders and refine for context and culture.'
  },
  {
    number: 'IV',
    title: 'Conduct',
    description: 'Deliver practice-first sessions that translate insight into action.'
  },
  {
    number: 'V',
    title: 'Operationalize',
    description: 'Embed ownership through clear roles, rituals, and everyday workflows.'
  },
  {
    number: 'VI',
    title: 'Micro-nudges',
    description: 'Sustain momentum with structured follow-through over 4–8 weeks.'
  },
  {
    number: 'VII',
    title: 'Evaluate & Evolve',
    description: 'Measure outcomes, learn what\'s working, and iterate for scale.'
  }
]

function VerticalRoad({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="absolute left-[56px] top-[32px] bottom-[40px] w-1 bg-white/30 overflow-hidden md:left-[40px] md:top-[36px] md:bottom-[44px]">
      <motion.div
        className="absolute top-0 left-0 w-1 bg-white origin-top"
        style={{ height }}
      />
    </div>
  )
}

function RoadStep({ step, index }: { step: { title: string; description: string }; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative pl-32 md:pl-28"
    >
      {/* Node */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{
          duration: 0.4,
          delay: index * 0.05 + 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="absolute left-8 top-0 h-16 w-16 rounded-full bg-white text-black text-3xl font-semibold flex items-center justify-center md:left-4 md:h-14 md:w-14 md:text-2xl"
      >
        {step.title.charAt(0).toUpperCase()}
      </motion.div>

      {/* Content */}
      <div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-2 tracking-tight font-bricolage-display" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          {step.title}
        </h3>
        <p className="text-base md:text-lg text-white leading-relaxed tracking-tight font-bricolage-text" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          {step.description}
        </p>
      </div>
    </motion.li>
  )
}

import { DynamicMedia } from '@/components/ui/DynamicMedia'

interface HowWeDoItProps {
  data?: {
    isActive: boolean;
    title: string;
    subtitle: string;
    backgroundImage?: any;
    steps: Array<{ title: string; description: string }>;
  }
}

const HowWeDoIt = ({ data }: HowWeDoItProps) => {
  const containerRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  const activeTitle = data?.title || "How we drive impact";
  const activeSubtitle = data?.subtitle || "Anchored in the OUTCOME framework, our delivery approach focuses on execution, adoption, and measurable impact.";
  const activeSteps = (data?.steps && data.steps.length > 0) ? data.steps : outcomeSteps;
  const activeBg = data?.backgroundImage || "/corporate/howWeDoIt/skyscraper-1149547_1280.jpg";

  return (
    <>
      {/* Header Section - Outside parallax, no background */}
      <section className="py-16 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <SectionHeading
              subtitle={activeSubtitle}
              subtitleClassName="max-w-4xl mb-0"
              titleClassName="mb-6"
            >
              {activeTitle}
            </SectionHeading>
          </div>
        </div>
      </section>

      {/* Parallax Section with Roadmap */}
      <section
        ref={containerRef}
        className="relative pt-16 pb-28 md:pt-12 md:pb-24 overflow-hidden"
      >
        {/* Background Image */}
        <motion.div
          ref={backgroundRef}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ y: backgroundY, scale: 1.1 }}
          >
            {typeof activeBg === 'string' ? (
              <Image
                src={activeBg}
                alt="Background"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <DynamicMedia
                media={activeBg}
                alt="Background"
                fill
                className="object-cover"
                priority
              />
            )}
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Roadmap Container */}
          <div className="max-w-6xl mx-auto relative">
            {/* Vertical Road */}
            <VerticalRoad containerRef={containerRef} />

            {/* Steps */}
            <ul className="space-y-24 relative md:space-y-20">
              {activeSteps.map((step, index) => (
                <RoadStep key={index} step={step} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowWeDoIt
