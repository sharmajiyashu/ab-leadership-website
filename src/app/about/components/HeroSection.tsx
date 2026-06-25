'use client'

import Image from 'next/image';

interface HeroSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function HeroSection({ imageSrc, imageAlt }: HeroSectionProps) {
  if (!imageSrc) return null;

  return (
    <section className="relative w-full h-[400px] md:h-[550px] lg:h-[750px] overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt || "Hero Image"}
        fill
        className="object-cover"
        style={{ objectPosition: 'center 0%' }}
        priority
      />
      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
    </section>
  );
}
