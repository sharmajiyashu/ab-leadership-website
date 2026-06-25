export const revalidate = 60;

import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import Image from 'next/image';
import Link from 'next/link';

import { Metadata } from 'next';

async function getBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function getBlogSettings() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/v1/api/app/settings/blog`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Failed to fetch blog settings:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings();
  if (!settings?.seo) return { title: 'Blogs | Abhishek Banerji' };

  return {
    title: settings.seo.metaTitle,
    description: settings.seo.metaDescription,
    keywords: settings.seo.keywords,
    openGraph: settings.seo.ogImage ? {
      images: [{ url: settings.seo.ogImage.url }]
    } : undefined
  };
}

export default async function BlogsPage() {
  const [blogs, settings] = await Promise.all([
    getBlogs(),
    getBlogSettings()
  ]);

  return (
    <BackgroundLayout>
      <Navbar />

      {/* Hero Section */}
      <section className="pb-16 pt-20">
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src={settings?.hero?.image?.url || "/images/IMG_0452.JPG"}
            alt="Abhishek Banerji - Blogs"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 50%' }}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-bricolage-display">
                {settings?.hero?.title || "Our Blog"}
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto px-4 font-bricolage-text">
                {settings?.hero?.subtitle || "Insights, stories, and thoughts on leadership, wellbeing, and transformative practices."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="py-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">

          {blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No posts yet</h3>
              <p className="text-gray-500">Check back later for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <Link key={blog._id} href={`/blogs/${blog.slug}`} className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative w-full h-56 overflow-hidden bg-gray-100">
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail.url}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-blue-600 font-semibold mb-3 tracking-wider uppercase">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors font-bricolage-display">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-6 font-bricolage-text flex-1">
                      {blog.excerpt || blog.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..."}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors mt-auto">
                      Read Article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </BackgroundLayout>
  );
}
