"use client"

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import ImpactFacts from './components/ImpactFacts'
import FlagshipPrograms from './components/FlagshipPrograms'
import { flagshipPrograms } from './data/programsData'

export default function MentalHealth() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection
          title="Mental Health & Wellbeing"
          subtitle="Supporting students to grow with balance, resilience, and care"
          imageSrc="/classroom/sub-services/mental-health/hero/22 Mental Health.JPG"
        />
        
        <ContentSection />
        
        <ImpactFacts />
        
        <FlagshipPrograms programs={flagshipPrograms} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
