import type { Metadata } from 'next'

type Props = {
  params: Promise<{ categorySlug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { categorySlug: slug } = await params
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/categories/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return {};
    const { data } = await res.json();

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
