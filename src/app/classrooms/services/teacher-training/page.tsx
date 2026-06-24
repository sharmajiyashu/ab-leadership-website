"use client"

import { Navbar, Footer, BackgroundLayout } from '@/components/layout'
import HeroSection from './components/HeroSection'
import ContentSection from './components/ContentSection'
import ImpactFacts from './components/ImpactFacts'
import TeacherTrainingPrograms from './components/TeacherTrainingPrograms'
import { teacherTrainingPrograms } from './data/programsData'

export default function TeacherTraining() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection
          title="Teacher and Parent Training"
          subtitle="Helping teachers and parents nurture children with confidence, creativity, care, and impact."
          imageSrc="/classroom/sub-services/teacher-training/hero/21 Teacher Training.jpg"
        />
        
        <ContentSection />
        
        <ImpactFacts />
        
        <TeacherTrainingPrograms programs={teacherTrainingPrograms} />

      </main>
      <Footer />
    </BackgroundLayout>
  );
}
