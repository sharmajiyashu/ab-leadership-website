import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { get } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await get<any>('/v1/api/app/about/settings', { cache: 'no-store' });
    
    if (data?.seo) {
      const seo = data.seo;
      const ogImageUrl = typeof seo.ogImage === 'string' ? seo.ogImage : seo.ogImage?.url;
      
      return {
        title: seo.metaTitle || "About | Abhishek Banerji",
        description: seo.metaDescription || "Learn more about Abhishek Banerji.",
        keywords: seo.keywords || "",
        openGraph: ogImageUrl ? {
          images: [{ url: ogImageUrl }]
        } : undefined
      };
    }
  } catch (error) {
    console.error("Error fetching about page SEO metadata:", error);
  }

  return {
    title: "About | Abhishek Banerji",
    description: "Learn more about Abhishek Banerji."
  };
}

export default function About() {
  return <AboutClient />;
}
