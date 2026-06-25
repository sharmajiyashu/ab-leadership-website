import { Navbar, Footer } from '@/components/layout'
import { Hero, VideoSection, Services, Logos, SDGs } from '@/components/sections'

const backgroundImage = "/background.svg"

import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/homepage/settings`, { next: { revalidate: 60 } });
    if (!res.ok) return {};
    const { data } = await res.json();
    
    if (data?.seo) {
      const ogImage = typeof data.seo.ogImage === 'string' ? data.seo.ogImage : data.seo.ogImage?.url;
      return {
        title: data.seo.metaTitle || 'Abhishek Banerji',
        description: data.seo.metaDescription || '',
        keywords: data.seo.keywords ? data.seo.keywords.split(',').map((k: string) => k.trim()) : [],
        openGraph: {
          title: data.seo.metaTitle,
          description: data.seo.metaDescription,
          images: ogImage ? [{ url: ogImage }] : [],
        }
      }
    }
  } catch (error) {
    console.error("Error fetching homepage metadata:", error);
  }
  return {};
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="sticky top-0 h-screen w-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden
      />
      <div className="relative z-10 -mt-[100vh]">
        <Navbar />
        <main>
          <Hero />
          <VideoSection />
          <Services />
          <SDGs />
          <Logos />
        </main>
        <Footer />
      </div>
    </div>
  );
}
