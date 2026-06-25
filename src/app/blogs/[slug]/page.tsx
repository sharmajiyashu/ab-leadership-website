import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';

import { get } from '@/lib/api';

async function getBlog(slug: string) {
  try {
    return await get<any>(`/v1/api/app/blogs/${slug}`, { next: { revalidate: 60 } });
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const unwrappedParams = await params;
  const blog = await getBlog(unwrappedParams.slug);
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: blog.seo?.metaTitle || `${blog.title} | Abhishek Banerji`,
    description: blog.seo?.metaDescription || blog.excerpt || blog.content.replace(/<[^>]+>/g, '').substring(0, 160),
    keywords: blog.seo?.keywords,
    openGraph: {
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt || blog.content.replace(/<[^>]+>/g, '').substring(0, 160),
      images: blog.seo?.ogImage ? [{ url: blog.seo.ogImage.url }] : blog.thumbnail ? [{ url: blog.thumbnail.url }] : undefined,
    }
  };
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = await params;
  const blog = await getBlog(unwrappedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <BackgroundLayout>
      <Navbar />

      <main className="py-24 min-h-screen">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back to blogs link */}
          <Link href="/blogs" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors group">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all blogs
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="text-sm text-gray-500 font-semibold mb-4 tracking-wider uppercase">
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-bricolage-display leading-tight mb-6">
              {blog.title}
            </h1>
            
            {blog.thumbnail && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image
                  src={blog.thumbnail.url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div 
            className="prose prose-lg md:prose-xl prose-blue max-w-none prose-img:rounded-xl prose-img:shadow-md font-bricolage-text"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Author/Share Footer (Optional) */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                    AB
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">Abhishek Banerji</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </BackgroundLayout>
  );
}
