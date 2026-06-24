import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticFocusAreas from './components/TherapeuticFocusAreas'
import ImpactStatistics from './components/ImpactStatistics'
import ProgramOfferings from './components/ProgramOfferings'
import { programs } from './data/programsData'

export default function JuvenileJustice() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Juvenile Justice & Child Protection Settings"
          subtitle="Pathways to healing, responsibility, and expression through arts-based rehabilitation"
          imageSrc="/images/IMG_2670.jpg"
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
