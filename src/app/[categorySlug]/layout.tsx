import type { Metadata } from 'next'

type Props = {
  params: Promise<{ categorySlug: string }>
}

import { get } from '@/lib/api'

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { categorySlug: slug } = await params
  
  // Ignore static files like sw.js, favicon.ico, etc.
  if (slug.includes('.')) {
    return { title: 'Not Found' }
  }

  try {
    const data = await get<any>(`/v1/api/app/categories/slug/${slug}`, { next: { revalidate: 60 } });

    if (data?.seo) {
      const ogImage = typeof data.seo.ogImage === 'string' ? data.seo.ogImage : data.seo.ogImage?.url;
      return {
        title: data.seo.metaTitle || data.name,
        description: data.seo.metaDescription || '',
        keywords: data.seo.keywords ? data.seo.keywords.split(',').map((k: string) => k.trim()) : [],
        openGraph: {
          title: data.seo.metaTitle || data.name,
          description: data.seo.metaDescription,
          images: ogImage ? [{ url: ogImage }] : [],
        }
      }
    }
  } catch (error) {
    console.error(`Error fetching metadata for category ${slug}:`, error);
  }

  return {
    title: 'Category',
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
