"use client"

import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import { SubserviceHeroSection } from '@/components/sections';
import ContentSection from './components/ContentSection';
import CultureImpactFacts from './components/CultureImpactFacts';
import FlagshipPrograms from './components/FlagshipPrograms';
import { flagshipPrograms } from './data/programsData';

export default function Culture() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <SubserviceHeroSection 
          title="Culture & Organizational Development"
          subtitle="Building environments where people thrive, collaborate, and perform at their best"
          imageSrc="/corporate/sub-services/culture/hero/IMG_1724.JPG"
        />
        
        <ContentSection />
        
        <CultureImpactFacts />
        
        <FlagshipPrograms programs={flagshipPrograms} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
