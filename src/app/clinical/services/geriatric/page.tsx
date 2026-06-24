import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticGoals from './components/TherapeuticGoals'
import ImpactStatistics from './components/ImpactStatistics'
import ProgramOfferings from './components/ProgramOfferings'
import { therapeuticPrograms } from './data/programsData'

export default function Geriatric() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Older Adults & Geriatric Population"
          subtitle="Specialized therapeutic programs for older adults focusing on memory enhancement, emotional well-being, and maintaining dignity through creative expression"
          imageSrc="/clinical/sub-services/geriatric/hero/WhatsApp Image 2026-02-11 at 12.20.32.jpeg"
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
