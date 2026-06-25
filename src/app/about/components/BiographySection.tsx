'use client'

import Image from 'next/image'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import SectionHeading from '@/components/sections/SectionHeading'
import { biographyParagraphs } from '../data/biographyContent';

interface BiographySectionProps {
  content?: string;
  imageSrc?: string;
}

export default function BiographySection({ content, imageSrc }: BiographySectionProps) {
  const imageAnimation = useScrollAnimation<HTMLDivElement>(0, 0.3, '-100px');
  const containerAnimation = useScrollAnimation<HTMLDivElement>(0, 0.3, '-100px');

  return (
    <section className="min-h-[600px]">
      <div className="container mx-auto pt-16 pb-8 px-4">
        <SectionHeading title="Biography" titleClassName="mb-12" />

        <div className="max-w-7xl mx-auto">
          <div className="prose prose-xl max-w-none">
            {imageSrc && (
              <div
                ref={imageAnimation.ref}
                className={`float-none md:float-left mx-auto md:mx-0 mb-6 md:mb-4 md:mr-8 w-64 sm:w-72 md:w-80 lg:w-96 shrink-0 transition-all duration-1000 ease-out ${imageAnimation.isVisible
                  ? 'opacity-100 translate-y-0 scale-100 visible'
                  : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={imageSrc}
                    alt="Abhishek Banerji"
                    fill
                    className="object-cover object-[center_15%]"
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                </div>
              </div>
            )}

            {content ? (
              <div
                ref={containerAnimation.ref}
                dangerouslySetInnerHTML={{ __html: content }}
                className={`text-gray-700 leading-relaxed text-justify text-lg font-bricolage-text space-y-6 transition-all duration-1000 ease-out ${containerAnimation.isVisible
                  ? 'opacity-100 translate-y-0 scale-100 visible'
                  : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
              />
            ) : (
              <div
                ref={containerAnimation.ref}
                className={`transition-all duration-1000 ease-out ${containerAnimation.isVisible
                  ? 'opacity-100 translate-y-0 scale-100 visible'
                  : 'opacity-0 translate-y-8 scale-95 invisible'
                  }`}
              >
                {biographyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 last:mb-0 text-gray-700 leading-relaxed text-justify text-lg font-bricolage-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <div className="clear-both" />
          </div>
        </div>
      </div>
    </section>
  );
}
