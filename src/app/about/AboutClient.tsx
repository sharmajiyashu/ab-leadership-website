'use client';

import { useState, useEffect } from 'react';
import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import { HeroSection, BiographySection, RecognitionSection, AwardsCarousel, MediaCarousel } from './components';
import { Loader } from '@/components/ui/Loader';

interface AboutData {
  hero: {
    image: any;
    alt: string;
  };
  biography: {
    content: string;
    image?: any;
  };
  recognition: {
    title: string;
    intro: string;
    points: string[];
    image: any;
  };
  awards: {
    images: any[];
  };
  mediaCoverage: {
    images: any[];
  };
}

export default function AboutClient() {
  const [data, setData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import('@/lib/api').then(({ get }) => {
      get<AboutData>('/v1/api/app/about/settings')
        .then(data => {
          if (data) setData(data);
        })
        .catch(err => console.error("Error fetching about page data:", err))
        .finally(() => setIsLoading(false));
    });
  }, []);

  if (isLoading) {
    return (
      <BackgroundLayout>
        <Navbar />
        <Loader />
        <Footer />
      </BackgroundLayout>
    );
  }

  // Fallback defaults if not set in admin panel
  const heroImage = data?.hero?.image?.url || data?.hero?.image;
  const heroAlt = data?.hero?.alt || "Abhishek Banerji - About Me Hero";
  const bioContent = data?.biography?.content;
  const bioImage = data?.biography?.image?.url || data?.biography?.image;
  const recTitle = data?.recognition?.title;
  const recIntro = data?.recognition?.intro;
  const recPoints = data?.recognition?.points;
  const recImage = data?.recognition?.image?.url || data?.recognition?.image;
  const awardsImages = data?.awards?.images?.map((img: any) => img.url || img) || [];
  const mediaImages = data?.mediaCoverage?.images?.map((img: any) => img.url || img) || [];

  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <HeroSection
          imageSrc={heroImage}
          imageAlt={heroAlt}
        />
        <BiographySection content={bioContent} imageSrc={bioImage} />
        <RecognitionSection 
          title={recTitle} 
          intro={recIntro} 
          points={recPoints} 
          imageSrc={recImage} 
        />
        <AwardsCarousel images={awardsImages} />
        <MediaCarousel images={mediaImages} />
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
