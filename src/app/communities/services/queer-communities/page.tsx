import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import TherapeuticGoals from './components/TherapeuticGoals'
import ImpactStatistics from './components/ImpactStatistics'
import KeyHighlights from './components/KeyHighlights'
import { highlights } from './data/highlightsData'

export default function QueerCommunities() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection 
          title="Queer Communities"
          subtitle="Queer-affirmative, trauma-informed spaces for expression, healing, and pride"
          imageSrc="/communities/sub-services/lgbtq/hero/WhatsApp Image 2026-02-11 at 12.21.19.jpeg"
        />
        <ContentSection />
        <ImpactStatistics />
        <TherapeuticGoals />
        <KeyHighlights highlights={highlights} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
