import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import ImpactStatistics from './components/ImpactStatistics'
import TherapeuticGoals from './components/TherapeuticGoals'
import ProgramOfferings from './components/ProgramOfferings'
import { programs } from './data/programsData'

export default function Orphanages() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="At-Risk Children and Adolescents"
          subtitle="Therapeutic Programs for Safety, Healing, and Healthy Development"
          imageSrc="/communities/sub-services/orphanages/hero/44824214_2012538998769428_2120735678307237888_n (1).jpg"
        />
        <ContentSection />
        <ImpactStatistics />
        <TherapeuticGoals />
        <ProgramOfferings programs={programs} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
