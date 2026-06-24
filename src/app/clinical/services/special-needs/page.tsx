import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticGoals from './components/TherapeuticGoals'
import ImpactStatistics from './components/ImpactStatistics'
import ProgramOfferings from './components/ProgramOfferings'
import { therapeuticPrograms } from './data/programsData'

export default function SpecialNeeds() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Children with Special Needs"
          subtitle="Specialized therapeutic support for developmental growth and wellbeing"
          imageSrc="/clinical/sub-services/special-needs/hero/5.jpg"
        />
        <ContentSection />
        <ImpactStatistics />
        <TherapeuticGoals />
        <ProgramOfferings programs={therapeuticPrograms} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}