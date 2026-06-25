import { Metadata } from 'next'
import ContactClient from './ContactClient'
import { get } from '@/lib/api'

async function getContactSettings() {
  try {
    return await get<any>('/v1/api/app/contact/settings', { 
      next: { revalidate: 60 } 
    });
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
