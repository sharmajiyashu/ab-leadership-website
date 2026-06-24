'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useState, type CSSProperties, type ReactNode } from 'react'
import {
  sectionHeadingSubtitleClass,
  sectionHeadingTitleClass,
} from '@/components/sections/SectionHeading'

const ease = [0.22, 1, 0.36, 1] as const

const modalityColumns = [
  {
    title: 'Coaching, Assessment & Organizational Psychology',
    description:
      'Supporting personal, professional, and workplace growth through coaching, assessments, facilitation, and organizational insight.',
    icon: '/corporate/modalities/icons/5.png',
    color: '#B693DB',
    items: [
      'Neuro Linguistic Programming (NLP)',
      'Emotional Intelligence Coaching',
      'Learning & Engaging Actively through Facilitation (LEAF)',
      'Psychometric Testing and Organizational Diagnostics',
      'Emotional Skills Assessment Process (ESAP)',
      'DEIB Practices',
      'Design Thinking',
    ],
  },
  {
    title: 'Counseling / Psychotherapy & Behavioural Sciences',
    description:
      'Evidence-informed therapeutic approaches that support emotional insight, healing, behaviour change, and self-understanding.',
    icon: '/corporate/modalities/icons/6.png',
    color: '#70B64C',
    items: [
      'Transactional Analysis (TA)',
      'Rational Emotive Cognitive Behaviour Therapy (RECBT)',
      'Dialectical Behaviour Therapy (DBT)',
      'Narrative Therapy',
      'Internal Family Systems (IFS)',
      'Queer Affirmative Counselling',
      'Trauma Informed Care',
      'Neuropsychology',
      'Acceptance & Commitment Therapy',
    ],
  },
  {
    title: 'Embodied / Somatic Body-Based Practices',
    description:
      'Body-based practices that use movement, breath, mindfulness, and nervous system regulation to support awareness and wellbeing.',
    icon: '/corporate/modalities/icons/7.png',
    color: '#69B4F5',
    items: [
      'Dance Movement Therapy',
      'Mindfulness Based Stress Reduction (MBSR)',
      'Yoga Philosophy & Hatha Yoga Practices',
      'Pranayama-based therapeutic breathing',
      'Breath & Nervous System Regulation Practices',
      'Emotional Freedom Techniques (EFT Tapping)',
    ],
  },
  {
    title: 'Expressive Arts & Gamified Modalities',
    description:
      'Creative, playful, and arts-based approaches that use expression, storytelling, movement, music, and games for reflection.',
    icon: '/corporate/modalities/icons/8.png',
    color: '#EE7C55',
    items: [
      'Drama Therapy',
      'Music Therapy',
      'Dance Movement Therapy',
      'Art / Visual Arts Therapy',
      'Poetry Therapy',
      'Bibliotherapy & Journaling',
      'Therapeutic Storytelling',
      'Play Therapy',
      'Therapeutic Clowning',
      'GOAL : Game Oriented Active Learning',
      'Nature-Based / Eco-Therapeutic Practices',
    ],
  },
] as const

const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
}

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease },
  },
}

function FloatingModalityIcon({ src, index }: { src: string; index: number }) {
  const prefersReducedMotion = useReducedMotion()
  const floatDuration = 3.2 + index * 0.35

  return (
    <div className="relative mb-2">
      <motion.div
        className="pointer-events-none absolute left-1/2 bottom-0 h-5 w-[72%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-lg"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.1, 1], opacity: [0.18, 0.3, 0.18] }
        }
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.2,
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.55, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          type: 'spring',
          stiffness: 180,
          damping: 16,
          delay: index * 0.12,
        }}
        className="relative"
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -12, 0],
                  rotateZ:
                    index % 2 === 0 ? [0, 2, 0, -2, 0] : [0, -2, 0, 2, 0],
                }
          }
          transition={{
            y: {
              duration: floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.2,
            },
            rotateZ: {
              duration: floatDuration * 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.15,
            },
          }}
          whileHover={
            prefersReducedMotion
              ? { scale: 1.04 }
              : {
                  y: -16,
                  scale: 1.1,
                  transition: { duration: 0.35, ease },
                }
          }
          className="relative cursor-default"
        >
          <Image
            src={src}
            alt=""
            width={152}
            height={152}
            className="h-[6.5rem] w-[6.5rem] shrink-0 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] sm:h-[7.5rem] sm:w-[7.5rem] md:h-[8.5rem] md:w-[8.5rem] md:drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)] lg:h-[9.5rem] lg:w-[9.5rem] lg:drop-shadow-[0_16px_32px_rgba(0,0,0,0.22)]"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function ModalityPracticesDropdown({
  items,
  color,
  index,
  idPrefix,
}: {
  items: readonly string[]
  color: string
  index: number
  idPrefix: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleId = `${idPrefix}-toggle-${index}`
  const listId = `${idPrefix}-practices-${index}`

  return (
    <div>
      <button
        type="button"
        id={toggleId}
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/70 px-4 py-2 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047AB]"
        aria-label="Toggle practices"
      >
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden
          className={`h-4 w-4 shrink-0 text-gray-800 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={listId}
            role="region"
            aria-labelledby={toggleId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.04 },
                },
              }}
              className="space-y-2.5 pt-4 text-left"
            >
              {items.map((item) => (
                <motion.li
                  key={item}
                  variants={listItemVariants}
                  className="relative pl-5 text-base leading-relaxed text-gray-700 font-bricolage-text md:text-lg before:absolute before:left-0 before:top-[0.55em] before:h-2 before:w-2 before:rounded-full before:bg-[var(--bullet-color)] before:content-['']"
                  style={{ '--bullet-color': color } as CSSProperties}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ModalitySectionHeader({
  title,
  subtitle,
}: {
  title: ReactNode
  subtitle?: string
}) {
  return (
    <motion.div
      variants={headerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={subtitle ? 'mb-12 text-center md:mb-14' : 'text-center'}
    >
      <motion.h2
        variants={fadeUpVariants}
        className={`${sectionHeadingTitleClass} text-gray-800`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUpVariants}
          className={`${sectionHeadingSubtitleClass} text-gray-600 mt-5 mb-0`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}

export default function Modalities() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto w-full max-w-[min(100%,100rem)]">
        <ModalitySectionHeader
          title={
            <>
              <span className="text-[#0047AB]">Modalities</span> and Approaches
            </>
          }
          subtitle="A multidisciplinary blend of psychology, coaching, expressive arts, and behavioural sciences to strengthen people, teams, and workplace culture."
        />

        <div className="mt-12 grid w-full grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-x-10 xl:gap-x-14">
          {modalityColumns.map((column, index) => (
            <motion.div
              key={column.title}
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.1 }}
              className="flex h-full flex-col items-center text-center"
            >
              <FloatingModalityIcon src={column.icon} index={index} />
              <h3 className="mt-6 max-w-[18rem] px-2 text-lg font-bold leading-snug text-gray-900 font-bricolage-display md:mt-7 md:max-w-[20rem] md:text-xl lg:max-w-[22rem] lg:text-2xl">
                {column.title}
              </h3>
              <div
                className="relative mt-6 flex w-full flex-col rounded-3xl p-6 shadow-sm md:mt-7 md:p-8"
                style={{
                  backgroundColor: `color-mix(in srgb, ${column.color} 22%, white)`,
                }}
              >
                <p className="mb-5 text-center text-sm leading-relaxed text-gray-700 font-bricolage-text md:text-base">
                  {column.description}
                </p>
                <ModalityPracticesDropdown
                  items={column.items}
                  color={column.color}
                  index={index}
                  idPrefix="modality"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
