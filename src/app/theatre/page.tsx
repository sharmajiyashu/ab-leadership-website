import { Metadata } from 'next';
import TheatreClient from './TheatreClient';
import { get } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await get<any>('/v1/api/app/theatre/settings', { cache: 'no-store' });

    if (data?.seo) {
      const seo = data.seo;
      const ogImageUrl = typeof seo.ogImage === 'string' ? seo.ogImage : seo.ogImage?.url;

      return {
        title: seo.metaTitle || "Theatre & Performance Arts | Abhishek Banerji",
        description: seo.metaDescription || "Award-winning theatre artist bringing transformative storytelling and experimental theatre to life.",
        keywords: seo.keywords || "",
        openGraph: ogImageUrl ? {
          images: [{ url: ogImageUrl }]
        } : undefined
      };
    }
  } catch (error) {
    console.error("Error fetching theatre page SEO metadata:", error);
  }

  return {
    title: "Theatre & Performance Arts | Abhishek Banerji",
    description: "Award-winning theatre artist bringing transformative storytelling and experimental theatre to life."
  };
}

export default function Theatre() {
  return <TheatreClient />;
}
