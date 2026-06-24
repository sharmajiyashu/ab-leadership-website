"use client"

import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import { SubserviceHeroSection } from '@/components/sections';
import ContentSection from './components/ContentSection';
import LeadershipImpactFacts from './components/LeadershipImpactFacts';
import FlagshipPrograms from './components/FlagshipPrograms';
import SupportingSkills from './components/SupportingSkills';
import { flagshipPrograms } from './data/programsData';

export default function Leadership() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <SubserviceHeroSection 
          title="Leadership & Employee Development"
          subtitle="Equip teams and managers with practical, people-first skills."
          imageSrc="/corporate/sub-services/leadership/hero/31leadership.JPG"
        />
        
        <ContentSection />
        
        <LeadershipImpactFacts />
        
        <FlagshipPrograms programs={flagshipPrograms} />
        
        <SupportingSkills />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
