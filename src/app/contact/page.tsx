import { Metadata } from 'next'
import ContactClient from './ContactClient'

async function getContactSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/contact/settings`, { 
      next: { revalidate: 60 } 
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch contact settings:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getContactSettings();
  if (!settings?.seo) return { title: 'Contact | Abhishek Banerji' };

  return {
    title: settings.seo.metaTitle,
    description: settings.seo.metaDescription,
    keywords: settings.seo.keywords,
    openGraph: settings.seo.ogImage ? {
      images: [{ url: settings.seo.ogImage.url }]
    } : undefined
  }
}

export default async function ContactPage() {
  const contactSettings = await getContactSettings();
  return <ContactClient initialContactSettings={contactSettings} />
}
