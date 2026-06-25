import { Metadata } from 'next';
import AboutClient from './AboutClient';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/about/settings`, { cache: 'no-store' });
    const json = await res.json();
    
    if (json.success && json.data?.seo) {
      const seo = json.data.seo;
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
