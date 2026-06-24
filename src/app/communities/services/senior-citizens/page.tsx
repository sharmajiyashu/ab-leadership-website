import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticFocusAreas from './components/TherapeuticFocusAreas'
import ImpactStatistics from './components/ImpactStatistics'
import ProgramOfferings from './components/ProgramOfferings'
import { programs } from './data/programsData'

export default function SeniorCitizens() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Senior Citizens"
          subtitle="Restoring connection, purpose, and joy through gentle creative engagement"
          imageSrc="/communities/sub-services/senior-citizens/hero/IMG_20180510_170416756.jpg"
        />
        <ContentSection />
        <ImpactStatistics />
        <TherapeuticFocusAreas />
        <ProgramOfferings programs={programs} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
