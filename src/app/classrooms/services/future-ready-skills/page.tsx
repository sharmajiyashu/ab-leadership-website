"use client"

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import ImpactFacts from './components/ImpactFacts'
import FlagshipPrograms from './components/FlagshipPrograms'
import { flagshipPrograms } from './data/programsData'

export default function FutureReadySkills() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection
          title="Future Ready Skills"
          subtitle="Preparing students for tomorrow's challenges with essential skills for success in an ever-evolving world"
          imageSrc="/classroom/sub-services/future-ready/hero/3.jpg"
        />
        
        <ContentSection />
        
        <ImpactFacts />
        
        <FlagshipPrograms programs={flagshipPrograms} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
