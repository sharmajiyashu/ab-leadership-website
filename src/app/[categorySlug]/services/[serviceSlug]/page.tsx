'use client'

import { Navbar, Footer, BackgroundLayout } from '@/components/layout';
import { SubserviceHeroSection } from '@/components/sections';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader } from '@/components/ui/Loader';

interface ImpactFact {
  number: string;
  label: string;
  description: string;
}

interface FlagshipProgram {
  title: string;
  subtitle: string;
  duration: string;
  audience: string;
  description: string;
}

interface Skill {
  title: string;
  description: string;
}

interface ServiceData {
  _id: string;
  title: string;
  description: string;
  image?: any;
  slug: string;
  subtitle?: string;
  longDescription?: string;
  impactFacts?: ImpactFact[];
  flagshipPrograms?: FlagshipProgram[];
  skills?: Skill[];
}

export default function DynamicServicePage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.categorySlug as string;
  const serviceSlug = params.serviceSlug as string;

  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedProgramIdx, setExpandedProgramIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!serviceSlug) return;
    setLoading(true);
    import('@/lib/api').then(({ get }) => {
      get<ServiceData>(`/v1/api/app/services/slug/${serviceSlug}`)
        .then(data => {
          if (data) setService(data);
        })
        .catch(err => console.error("Error loading service page details:", err))
        .finally(() => setLoading(false));
    });
  }, [serviceSlug]);

  if (loading) {
    return (
      <BackgroundLayout>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader />
        </div>
        <Footer />
      </BackgroundLayout>
    );
  }

  if (!service) {
    return (
      <BackgroundLayout>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
          <h1 className="text-4xl font-bold font-bricolage-display text-gray-900 mb-2">Service Not Found</h1>
          <p className="text-gray-600 mb-6 font-bricolage-text">The service page you are looking for does not exist.</p>
          <Link href={`/${categorySlug}`} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium">
            Go back to category
          </Link>
        </div>
        <Footer />
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <Navbar />
      <main className="pb-20">
        <SubserviceHeroSection 
          title={service.title}
          subtitle={service.subtitle || service.description}
          media={service.image}
        />

        {/* Detailed Long Description */}
        {service.longDescription && (
          <section className="py-16 px-4 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold font-bricolage-display text-gray-900 mb-6">About the Program</h2>
              <div 
                className="text-lg text-gray-700 leading-relaxed font-bricolage-text space-y-6 whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: service.longDescription }}
              />
            </div>
          </section>
        )}

        {/* Impact Facts Stats Section */}
        {service.impactFacts && service.impactFacts.length > 0 && (
          <section className="py-16 bg-neutral-900 text-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-bricolage-display text-white">Our Impact in Numbers</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.impactFacts.map((fact, index) => (
                  <div key={index} className="text-center p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                    <div className="text-4xl md:text-5xl font-bold font-bricolage-display text-blue-400 mb-2">
                      {fact.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-200 mb-1">
                      {fact.label}
                    </div>
                    <p className="text-sm text-gray-400 font-bricolage-text">
                      {fact.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Flagship Programs Section */}
        {service.flagshipPrograms && service.flagshipPrograms.length > 0 && (
          <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-bricolage-display text-gray-900">Flagship Offerings</h2>
              <p className="text-gray-500 mt-2 font-bricolage-text">Click on any program card below to view detailed objectives and outline</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.flagshipPrograms.map((prog, index) => {
                const isExpanded = expandedProgramIdx === index;
                return (
                  <div 
                    key={index} 
                    onClick={() => setExpandedProgramIdx(isExpanded ? null : index)}
                    className={`cursor-pointer bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-[380px] relative overflow-hidden ${isExpanded ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                          {prog.duration}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {prog.audience}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-bricolage-display text-gray-900 mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-blue-500 font-semibold mb-3">
                        {prog.subtitle}
                      </p>
                      
                      <div className="text-sm text-gray-600 font-bricolage-text line-clamp-6 leading-relaxed">
                        {prog.description}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-semibold text-blue-600">
                      <span>{isExpanded ? 'Hide Details' : 'View Full Details'}</span>
                      <span>→</span>
                    </div>

                    {/* Detailed Overlay Modal when clicked */}
                    {isExpanded && (
                      <div 
                        className="absolute inset-0 bg-neutral-950 text-white p-6 z-20 overflow-y-auto animate-fade-in flex flex-col justify-between"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg font-bricolage-display text-blue-400">{prog.title}</h4>
                            <button 
                              onClick={() => setExpandedProgramIdx(null)}
                              className="text-white hover:text-gray-300 text-xl font-bold"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-xs text-gray-300 font-semibold mb-3 uppercase tracking-wider">
                            {prog.duration} • {prog.audience}
                          </p>
                          <p className="text-sm text-gray-200 leading-relaxed font-bricolage-text whitespace-pre-line">
                            {prog.description}
                          </p>
                        </div>
                        <button 
                          onClick={() => setExpandedProgramIdx(null)}
                          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-xl font-semibold w-full transition"
                        >
                          Close Details
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Supporting Skills Section */}
        {service.skills && service.skills.length > 0 && (
          <section className="py-16 px-4 bg-gray-50/60 border-t border-gray-150">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold font-bricolage-display text-gray-900">Supporting Skills & Themes Covered</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.skills.map((skill, index) => (
                  <div key={index} className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold font-bricolage-display text-gray-900 mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-bricolage-text leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navigation back */}
        <div className="text-center mt-12">
          <Link 
            href={`/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-blue-600 hover:underline font-semibold"
          >
            ← Back to {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} Landing
          </Link>
        </div>
      </main>
      <Footer />
    </BackgroundLayout>
  );
}
