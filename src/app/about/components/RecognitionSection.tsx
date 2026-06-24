'use client'

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import SectionHeading from '@/components/sections/SectionHeading'

export default function RecognitionSection() {
  // Recognition intro text
  const awardsIntroText = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px');
  
  // Awards Image - slides in from right when 50% visible
  const awardsImageAnimation = useScrollAnimation<HTMLDivElement>(0, 0.5, '100px');
  
  // Create scroll animation hooks for each bullet point
  const bullet1 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet2 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet3 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet4 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet5 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet6 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet7 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet8 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet9 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet10 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet11 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');
  const bullet12 = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');

  const bulletAnimations = [
    bullet1, bullet2, bullet3, bullet4, bullet5, bullet6,
    bullet7, bullet8, bullet9, bullet10, bullet11, bullet12,
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Recognition & Milestones" titleClassName="mb-12" />
        
        <div className="max-w-7xl mx-auto">
          {/* Awards Content with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Awards Text */}
            <div className="prose prose-xl max-w-none">
              <p
                ref={awardsIntroText.ref}
                className={`text-gray-700 leading-relaxed mb-8 text-justify text-lg font-bricolage-text transition-all duration-1000 ease-out ${
                  awardsIntroText.isVisible
                    ? 'opacity-100 translate-y-0 scale-100 visible'
                    : 'opacity-0 translate-y-8 scale-95 invisible'
                }`}
              >
                He has been honoured with awards and accolades like:
              </p>
              
              <ul className="space-y-3 text-gray-700 leading-relaxed text-justify text-lg font-bricolage-text">
                {[
                  <>
                    <span className="font-semibold text-[#0047AB]">Karmaveer Chakra Award</span> by the
                    {' '}International Confederation of NGOs (iCongo) and the United Nations.
                  </>,
                  <>
                    <span className="font-semibold text-[#0047AB]">Birla Steel Young Indian</span> for his work in
                    {' '}the space of Mental Health &amp; Psychotherapy.
                  </>,
                  <>
                    <span className="font-semibold text-[#0047AB]">Global Goodwill Ambassador</span> from India by
                    {' '}Global Goodwill Ambassadors Foundation (USA) for his Humanitarian Work in the space of Mental
                    {' '}Health &amp; Psychotherapy.
                  </>,
                  <>
                    <span className="font-semibold text-[#0047AB]">Dr. APJ Abdul Kalam Bharat Puraskar</span> by
                    {' '}Dr. APJ Abdul Kalam International Foundation, supported by the Maharashtra Chamber of
                    {' '}Commerce, Industry &amp; Agriculture (MACCIA).
                  </>,
                  <>
                    Featured in{' '}
                    <span className="font-semibold text-[#0047AB]">
                      Bombay Times Voices of India Future 2026
                    </span>
                    .
                  </>,
                  <>
                    <span className="font-semibold text-[#0047AB]">Yuva Ratna Puraskar</span> instituted by Uprise
                    {' '}India &amp; Indian School of Politics for Theatre &amp; Drama.
                  </>,
                  <>
                    Swadeshi India Runway Presents{' '}
                    <span className="font-semibold text-[#0047AB]">India&apos;s Superstar Award</span>
                    {' '}for Theatre &amp; Drama.
                  </>,
                  <>
                    <span className="font-semibold text-[#0047AB]">Pinnacle India Fame Award</span> for his work in
                    {' '}the area of Corporates Learning &amp; Development.
                  </>,
                  <>
                    <span className="font-semibold text-[#0047AB]">Lion&apos;s Game Changer Award</span> for his
                    {' '}Humanitarian Services &amp; Community Development Work.
                  </>,
                  <>
                    As a former Chemical Engineer, he has been awarded by Chemical Engineering Association (CheA),
                    {' '}IIT Bombay, IIChE (Indian Institute of Chemical Engineers), IEEE (Institute of Electrical and
                    {' '}Electronics Engineers) and has won gold medals at numerous national level symposiums for his
                    {' '}research endeavours.
                  </>,
                  <>
                    He has been a recipient of{' '}
                    <span className="font-semibold text-[#0047AB]">
                      Outstanding Young Chemical Engineer of the Year
                    </span>
                    {' '}instituted by IIChE (Indian Institute of Chemical Engineers).
                  </>,
                  <>
                    He is also the recipient of{' '}
                    <span className="font-semibold text-[#0047AB]">Maharashtra State Governor&apos;s Award</span>.
                  </>,
                ].map((content, index) => (
                  <li
                    key={index}
                    ref={bulletAnimations[index].ref}
                    className={`flex items-start transition-all duration-1000 ease-out ${
                      bulletAnimations[index].isVisible
                        ? 'opacity-100 translate-y-0 scale-100 visible'
                        : 'opacity-0 translate-y-8 scale-95 invisible'
                    }`}
                  >
                    <span className="mt-2 mr-4 flex-shrink-0 inline-flex items-start" aria-hidden="true">
                      <Image
                        src="/aboutMe/Untitled design.svg"
                        alt=""
                        width={22}
                        height={22}
                      />
                    </span>
                    <span>{content}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Awards Image */}
            <div
              ref={awardsImageAnimation.ref}
              className={`relative w-full aspect-[3/5] overflow-hidden rounded-lg shadow-lg transition-all duration-[1500ms] ${
                awardsImageAnimation.isVisible
                  ? 'opacity-100 translate-x-0 visible'
                  : 'opacity-0 translate-x-56 invisible'
              }`}
              style={{
                transitionTimingFunction: 'ease-out',
              }}
            >
              <Image
                src="/aboutMe/IMG_2170.jpg"
                alt="Abhishek Banerji - Awards & Accolades"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
