import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticGoals from './components/TherapeuticGoals'
import ImpactStatistics from './components/ImpactStatistics'
import ProgramOfferings from './components/ProgramOfferings'
import { therapeuticPrograms } from './data/programsData'

export default function PsychiatricCare() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Individuals in Psychiatric Care"
          subtitle="Specialized therapeutic programs for individuals with mental health conditions, trauma, and psychiatric care needs"
          imageSrc="/clinical/sub-services/psychiatric/hero/c80196e4-6266-11eb-8da7-ea4a7a3f2bd0_1611948077247.jpeg"
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
