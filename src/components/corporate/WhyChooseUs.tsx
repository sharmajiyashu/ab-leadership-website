'use client'

import Image from 'next/image'
import SectionHeading from '@/components/sections/SectionHeading'

export default function WhyChooseUs() {
  const slides = [
    {
      id: 1,
      title: "Experiential Learning",
      description: "\"Learning by doing\" is at the heart of every engagement. Activities are hands-on, practical, and workplace-relevant  -  from role-plays and case simulations to immersive problem-solving.",
      image: "/corporate/whyChooseUs/Experiential Learning.JPG"
    },
    {
      id: 2,
      title: "Drama-Based Methods",
      description: "We use theatre techniques to help participants embody leadership, navigate interpersonal dynamics, and explore complex themes like conflict, power, and authenticity.",
      image: "/corporate/whyChooseUs/Drama-Based Methods.JPG"
    },
    {
      id: 3,
      title: "Creative Arts & Movement Workshops",
      description: "Drawing from expressive arts therapy and movement-based facilitation, these modules unlock emotional insight, promote body awareness, and build trust within teams.",
      image: "/corporate/whyChooseUs/Creative Arts & Movement Workshops.JPG"
    },
    {
      id: 4,
      title: "Games & Board Game Facilitation",
      description: "Strategic and reflective board games, custom-designed or curated, are used to simulate team dynamics, decision-making, and collaborative strategy.",
      image: "/corporate/whyChooseUs/Board Game Facilitation.JPG"
    },
    {
      id: 5,
      title: "Outbound & Adventure Learning",
      description: "Outdoor retreats and offsite experiential modules help teams break silos, build trust, and cultivate resilience through shared challenges and reflection.",
      image: "/corporate/whyChooseUs/Outbound & Adventure Learning .jpg"
    },
    {
      id: 6,
      title: "Co-Designed Solutions",
      description: "Every program is created in partnership with you  -  grounded in business context, cultural realities, and learning outcomes that matter.",
      image: "/corporate/whyChooseUs/Co-Designed Solutions.jpg"
    },
    {
      id: 7,
      title: "Outcome-Oriented",
      description: "Learning journeys include measurable pre-post shifts and tools to sustain momentum through micro nudges, rituals, and applied learning.",
      image: "/corporate/whyChooseUs/Outcome-Oriented.JPG"
    }
  ]

  const cardStickyOffsets = [
    'md:top-32',
    'md:top-40',
    'md:top-48',
    'md:top-56',
    'md:top-64',
    'md:top-72',
    'md:top-80',
  ]

  const cardTiltClasses = [
    'md:-rotate-2',
    'md:rotate-1',
    'md:-rotate-1',
    'md:rotate-2',
    'md:-rotate-3',
    'md:rotate-3',
  ]

  return (
    <section className="relative pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          {/* Left column: header (sticky, aligned with first card height) */}
          <div className="md:col-span-2 md:pr-6 md:sticky md:top-32 flex items-center h-[360px] md:h-[420px] lg:h-[480px]">
            <div className="w-full text-left">
              <div className="relative mb-4 md:mb-6">
                <div
                  className="pointer-events-none absolute left-0 top-0 bottom-0 w-1 rounded-full bg-[#0047AB]"
                  aria-hidden
                />
                <SectionHeading
                  align="left"
                  titleClassName="pl-7 md:pl-9 leading-[0.95] tracking-tight"
                  subtitle="A curated blend of immersive methods designed to shift mindsets, build skills, and create lasting change for your teams."
                  subtitleClassName="pl-7 md:pl-9 text-left max-w-none mb-0"
                >
                  <span className="block">Why</span>
                  <span className="block text-[#0047AB]">Choose</span>
                  <span className="block">Us?</span>
                </SectionHeading>
              </div>
            </div>
          </div>

          {/* Right column: stacked sticky cards with Polaroid frame */}
          <div className="md:col-span-3 space-y-10 pb-32">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`w-full h-[360px] md:h-[420px] lg:h-[480px] md:sticky ${
                  cardStickyOffsets[index] ?? 'md:top-80'
                } ${cardTiltClasses[index % cardTiltClasses.length]}`}
              >
                {/* Polaroid frame */}
                <div className="h-full bg-white shadow-2xl px-4 pt-4 pb-16 md:px-5 md:pt-5 md:pb-20 flex">
                  <div className="relative w-full h-full overflow-hidden">
                    {/* Background Image */}
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />

                    {/* Dark overlay for text readability */}
                    <div className="absolute inset-0 bg-black/60" />

                    {/* Text Overlay - title centered, description at bottom */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Centered title */}
                      <div className="flex-1 flex items-center justify-center px-6 md:px-8">
                        <div className="text-white max-w-xl text-center mx-auto font-lovelace">
                          <h3
                            className="text-2xl md:text-3xl font-bold"
                            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                          >
                            {slide.title}
                          </h3>
                        </div>
                      </div>
                      {/* Bottom description */}
                      <div className="w-full px-6 md:px-8 pb-6 md:pb-8">
                        <div className="text-white max-w-xl mx-auto font-lovelace">
                          <p
                            className="text-base md:text-lg leading-relaxed"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                          >
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}