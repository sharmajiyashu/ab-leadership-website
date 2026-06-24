import SectionHeading from '@/components/sections/SectionHeading'

export default function TherapeuticGoals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeading
            level="subservice"

            subtitle="Our specialized programs are designed to address the unique needs of individuals in psychiatric care through evidence-based therapeutic approaches"
          >
            <span className="text-[#0047AB]">Therapeutic</span> Goals
          </SectionHeading>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💙</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Emotional Awareness & Regulation</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Build the ability to recognize, tolerate, and regulate emotions safely, reducing overwhelm, reactivity, and emotional shutdown.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Psychological Safety & Stabilization</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Establish internal and external safety, grounding, and predictability to support stabilization before deeper therapeutic work.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧠</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Identity, Insight & Self-Understanding</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Support a coherent sense of self, increased self-awareness, and insight into thoughts, emotions, patterns, and triggers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">💪</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Adaptive Coping & Resilience</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Strengthen healthy coping strategies, distress tolerance, and resilience to manage symptoms, stressors, and setbacks.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🧘</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Body–Mind Integration</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Restore connection between bodily experience and emotional awareness, especially where dissociation, somatic distress, or trauma responses are present.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 font-bricolage-display">Relational Capacity & Social Connection</h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-bricolage-text">
              Improve trust, communication, boundaries, and the ability to engage in supportive relationships and community contexts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
