import { Navbar, Footer, BackgroundLayout } from '@/components/layout'

export default function Blog() {
  return (
    <BackgroundLayout>
      <Navbar />
      <main>
        <section className="container mx-auto px-4 py-16 min-h-[500px] md:min-h-[650px] lg:min-h-[750px] flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 font-bricolage-display">
            Blog coming soon
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 font-bricolage-text">
              This is a placeholder for the Blog content. Articles, insights, thoughts, and writings by Abhishek Banerji on various topics will be published here.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
