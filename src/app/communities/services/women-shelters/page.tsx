import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticFocusAreas from './components/TherapeuticFocusAreas'
import ImpactStatistics from './components/ImpactStatistics'
import ProgramOfferings from './components/ProgramOfferings'
import { programs } from './data/programsData'

export default function WomenShelters() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Women in Shelters & Survivors of Gender-Based Violence"
          subtitle="For women in shelters and survivors of gender-based violence"
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
