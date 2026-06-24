'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import { HeroSection, BiographySection, RecognitionSection, AwardsCarousel, MediaCarousel } from './components';

export default function About() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection
          imageSrc="/aboutMe/WhatsApp-Image-2025-02-07-at-09.41.39.jpeg"
          imageAlt="Abhishek Banerji - About Me Hero"
        />
        <BiographySection />
        <RecognitionSection />
        <AwardsCarousel />
        <MediaCarousel />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
