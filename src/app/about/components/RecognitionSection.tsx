'use client'

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import SectionHeading from '@/components/sections/SectionHeading'

interface RecognitionSectionProps {
  title?: string;
  intro?: string;
  points?: string[];
  imageSrc?: string;
}

const DEFAULT_POINTS = [
  '<span class="font-semibold text-[#0047AB]">Karmaveer Chakra Award</span> by the International Confederation of NGOs (iCongo) and the United Nations.',
  '<span class="font-semibold text-[#0047AB]">Birla Steel Young Indian</span> for his work in the space of Mental Health &amp; Psychotherapy.',
  '<span class="font-semibold text-[#0047AB]">Global Goodwill Ambassador</span> from India by Global Goodwill Ambassadors Foundation (USA) for his Humanitarian Work in the space of Mental Health &amp; Psychotherapy.',
  '<span class="font-semibold text-[#0047AB]">Dr. APJ Abdul Kalam Bharat Puraskar</span> by Dr. APJ Abdul Kalam International Foundation, supported by the Maharashtra Chamber of Commerce, Industry &amp; Agriculture (MACCIA).',
  'Featured in <span class="font-semibold text-[#0047AB]">Bombay Times Voices of India Future 2026</span>.',
  '<span class="font-semibold text-[#0047AB]">Yuva Ratna Puraskar</span> instituted by Uprise India &amp; Indian School of Politics for Theatre &amp; Drama.',
  'Swadeshi India Runway Presents <span class="font-semibold text-[#0047AB]">India&apos;s Superstar Award</span> for Theatre &amp; Drama.',
  '<span class="font-semibold text-[#0047AB]">Pinnacle India Fame Award</span> for his work in the area of Corporates Learning &amp; Development.',
  '<span class="font-semibold text-[#0047AB]">Lion&apos;s Game Changer Award</span> for his Humanitarian Services &amp; Community Development Work.',
  'As a former Chemical Engineer, he has been awarded by Chemical Engineering Association (CheA), IIT Bombay, IIChE (Indian Institute of Chemical Engineers), IEEE (Institute of Electrical and Electronics Engineers) and has won gold medals at numerous national level symposiums for his research endeavours.',
  'He has been a recipient of <span class="font-semibold text-[#0047AB]">Outstanding Young Chemical Engineer of the Year</span> instituted by IIChE (Indian Institute of Chemical Engineers).',
  'He is also the recipient of <span class="font-semibold text-[#0047AB]">Maharashtra State Governor&apos;s Award</span>.'
];

function AnimatedListItem({ content, index }: { content: string, index: number }) {
  const animation = useScrollAnimation<HTMLLIElement>(0, 0.3, '-100px');

  return (
    <li
      ref={animation.ref}
      className={`flex items-start transition-all duration-1000 ease-out ${animation.isVisible
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
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </li>
  );
}

export default function RecognitionSection({ title, intro, points, imageSrc }: RecognitionSectionProps) {
  const awardsIntroText = useScrollAnimation<HTMLParagraphElement>(0, 0.3, '-100px');
  const awardsImageAnimation = useScrollAnimation<HTMLDivElement>(0, 0.5, '100px');

  const displayPoints = points && points.length > 0 ? points : DEFAULT_POINTS;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title={title || "Recognition & Milestones"} titleClassName="mb-12" />

        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 ${imageSrc ? 'lg:grid-cols-2' : ''} gap-8 items-center`}>
            {/* Awards Text */}
            <div className="prose prose-xl max-w-none">
              <p
                ref={awardsIntroText.ref}
                className={`text-gray-700 leading-relaxed mb-8 text-justify text-lg font-bricolage-text transition-all duration-1000 ease-out ${awardsIntroText.isVisible
                    ? 'opacity-100 translate-y-0 scale-100 visible'
                    : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
              >
                {intro || "He has been honoured with awards and accolades like:"}
              </p>

              <ul className="space-y-3 text-gray-700 leading-relaxed text-justify text-lg font-bricolage-text">
                {displayPoints.map((content, index) => (
                  <AnimatedListItem key={index} content={content} index={index} />
                ))}
              </ul>
            </div>

            {/* Awards Image */}
            {imageSrc && (
              <div
                ref={awardsImageAnimation.ref}
                className={`relative w-full aspect-[3/5] overflow-hidden rounded-lg shadow-lg transition-all duration-[1500ms] ${awardsImageAnimation.isVisible
                    ? 'opacity-100 translate-x-0 visible'
                    : 'opacity-0 translate-x-56 invisible'
                  }`}
                style={{ transitionTimingFunction: 'ease-out' }}
              >
                <Image
                  src={imageSrc}
                  alt={title || "Abhishek Banerji - Awards & Accolades"}
                  fill
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
