"use client"

import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import { SubserviceHeroSection } from '@/components/sections';
import ContentSection from './components/ContentSection';
import WellnessImpactFacts from './components/WellnessImpactFacts';
import FlagshipPrograms from './components/FlagshipPrograms';
import AdditionalPrograms from './components/AdditionalPrograms';
import { flagshipPrograms } from './data/programsData';

export default function Wellness() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <SubserviceHeroSection 
          title="Wellness & Mental Health"
          subtitle="Building resilience, balance, and sustainable wellbeing at work"
          imageSrc="/corporate/sub-services/wellness/hero/28.JPG"
        />
        
        <ContentSection />
        
        <WellnessImpactFacts />
        
        <FlagshipPrograms programs={flagshipPrograms} />
        
        <AdditionalPrograms />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
