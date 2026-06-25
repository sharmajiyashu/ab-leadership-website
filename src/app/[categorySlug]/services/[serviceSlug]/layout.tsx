import type { Metadata } from 'next'

type Props = {
  params: Promise<{ serviceSlug: string }>
}

import { get } from '@/lib/api'

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { serviceSlug: slug } = await params
  try {
    const data = await get<any>(`/v1/api/app/services/slug/${slug}`, { next: { revalidate: 60 } });

    if (data?.seo) {
      const ogImage = typeof data.seo.ogImage === 'string' ? data.seo.ogImage : data.seo.ogImage?.url;
      return {
        title: data.seo.metaTitle || data.title,
        description: data.seo.metaDescription || '',
        keywords: data.seo.keywords ? data.seo.keywords.split(',').map((k: string) => k.trim()) : [],
        openGraph: {
          title: data.seo.metaTitle || data.title,
          description: data.seo.metaDescription,
          images: ogImage ? [{ url: ogImage }] : [],
        }
      }
    }
  } catch (error) {
    console.error(`Error fetching metadata for service ${slug}:`, error);
  }

  return {
    title: 'Service',
  }
}

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
