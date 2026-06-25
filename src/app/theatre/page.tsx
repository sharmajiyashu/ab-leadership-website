import { Metadata } from 'next';
import TheatreClient from './TheatreClient';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/theatre/settings`, { cache: 'no-store' });
    const json = await res.json();

    if (json.success && json.data?.seo) {
      const seo = json.data.seo;
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
