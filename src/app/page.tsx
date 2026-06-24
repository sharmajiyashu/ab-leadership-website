import { Navbar, Footer } from '@/components/layout'
import { Hero, VideoSection, Services, Logos, SDGs } from '@/components/sections'

const backgroundImage = "/background.svg"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div
        className="sticky top-0 h-screen w-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
        aria-hidden
      />
      <div className="relative z-10 -mt-[100vh]">
        <Navbar />
        <main>
          <Hero />
          <VideoSection />
          <Services />
          <SDGs />
          <Logos />
        </main>
        <Footer />
      </div>
    </div>
  );
}
